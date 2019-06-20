import sys
import base64
import traceback
from django.db import models
from django.apps import apps
from datetime import datetime
from mainapp import ws_methods
from django.contrib import admin
from django.contrib.auth.models import User

from documents.file import File
from meetings.model_files.user import Profile, create_group


class NotificationType(models.Model):
    res_app = models.CharField(max_length=128)
    res_model = models.CharField(max_length=128)
    res_type = models.CharField(max_length=64)
    template = models.CharField(max_length=256)


class Notification(models.Model):
    res_id = models.IntegerField()
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    counter = models.IntegerField(default=1)
    text = models.CharField(max_length=100, default='')
    notification_type = models.ForeignKey(NotificationType, on_delete=models.CASCADE)

    @classmethod
    def getMyNotifications(cls, request, params):
        uid = request.user.id
        res = []
        records = Notification.objects.filter(counter__gt=0,user_id=uid)
        if records:
            for obj in records:
                nt = obj.notification_type
                note = nt.template
                if obj.counter > 1:
                    note = obj.text
                note = {
                    'res_id': obj.res_id,
                    'res_model': nt.res_model,
                    'res_app': nt.res_app,
                    'res_type': nt.res_type,
                    'body': note
                }
                res.append(note)
        return res

    @classmethod
    def add_notification(cls, params, event_data, text=None):

        res_model = params['res_model']
        res_app = params['res_app']
        res_id = params['res_id']
        res_id = int(res_id)

        model = apps.get_model(res_app, res_model)
        obj_res = model.objects.get(pk=res_id)
        sender_id = event_data.get('uid')
       
        audience = obj_res.get_audience()

        if not audience:
            return 'No Audience'

        res_type = params.get('res_type')
        if not res_type:
            res_type = 'comment'

        notification_type = NotificationType.objects.filter(
            res_app=res_app, res_model=res_model, res_type=res_type
        )
        if not notification_type:
            notification_type = NotificationType(
                res_app=res_app, res_model=res_model,
                res_type=res_type
            )
            notification_type.save()
        else:
            notification_type = notification_type[0]

        if sender_id in audience:
            audience.remove(sender_id)
        for uid in audience:
            notification = Notification.objects.filter(
                notification_type_id=notification_type.id,
                res_id=res_id,user_id=uid
            )
            if not notification:
                notification = Notification(
                    res_id=res_id,
                    user_id=uid,
                    text=text,
                    notification_type_id=notification_type.id
                )
                notification.save()
            else:
                notification = notification[0]
                notification.counter += 1
                notification.save()

        if len(audience) > 0:
            note = text
            note = {
                'res_id': res_id,
                'res_model': res_model,
                'res_app': res_app,
                'res_type': res_type,
                'body': note,
                'counter':1
            }
            events = [
                {'name': 'notification_received', 'data': note, 'audience': audience},
                {'name': event_data['name'], 'data': event_data['data'], 'audience': audience}
            ]
            res = ws_methods.emit_event(events)
        else:
            return 'No audience for the notification'
        return res

    @classmethod
    def update_counter(cls, request, params):
        uid = request.user.id
        res_model = params['res_model']
        res_app = params['res_app']
        res_id = params['res_id']
        res_id = int(res_id)

        notification_type = NotificationType.objects.filter(
            res_app=res_app, res_model=res_model
        )

        for nt in notification_type:
            notification = Notification.objects.filter(
                notification_type_id=nt.id,
                res_id=res_id, user_id=uid
            )
            if len(notification) > 0:
                notification = notification[0]
                notification.counter = 0
                notification.save()
                break
        return 'done'


class Comment(models.Model):
    res_id = models.IntegerField()
    res_app = models.CharField(max_length=128)
    res_model = models.CharField(max_length=128)
    subtype_id = models.IntegerField()
    body = models.TextField()
    parent = models.ForeignKey('self', null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    create_date = models.DateTimeField(null=True, auto_now_add=True)

    @classmethod
    def get_comments(cls, request, params):
        res = cls.objects.filter(
            res_app=params['res_app'],
            res_model=params['res_model'],
            res_id=params['res_id'],
            subtype_id=params['subtype_id'],
        ).order_by('id')
        
        parents = {

        }
        comments = []
        for obj in res:
            user = obj.user
            comment = obj.__dict__
            del comment['_state']
            comment['user'] = {
                'id': user.id,
                'photo': user.image.url,
                'name': user.name
            }
            comment['create_date'] = str(comment['create_date'])
            comment['children'] = []
            parents[comment['id']] = comment
            pk = comment['parent_id']
            if not pk:
                parents[pk] = comment
                comments.append(comment)
            else:
                parents[pk]['children'].append(comment)
        comments.reverse()
        res = comments
        return res

    @classmethod
    def add(cls, request, params):
        profile = Profile()
        user = Profile.objects.get(pk=request.user.id)
        comment = Comment(
            res_app=params['res_app'],
            res_model=params['res_model'],
            res_id=params['res_id'],
            subtype_id=params['subtype_id'],
            body=params['body'],
            user_id=user.id,
            create_date=datetime.now()
        )
        if params.get('parent_id'):
            comment.parent_id=params['parent_id']
        comment.save()
        comment = comment.__dict__
        comment['user'] = {
            'id': user.id,
            'photo': user.image.url,
            'name': user.name
        }
        del comment['_state']
        comment['create_date'] = str(datetime.now())
        comment['children'] = []
        event_data = {'name': 'comment_received', 'data': comment, 'uid' : request.user.id}
        Notification.add_notification(params, event_data)
        return comment


class Message(models.Model):
    sender = models.IntegerField()
    to = models.IntegerField()
    body = models.TextField()
    read_status = models.BooleanField(default=False)
    create_date = models.DateTimeField(null=True, auto_now_add=True)

    @classmethod
    def get_message_list(cls, uid, target_id, offset):
        uid = int(uid)
        target_id = int(target_id)
        user_ids = [target_id, uid]
        ar = []
        messages = Message.objects.filter(sender__in=user_ids, to__in=user_ids).order_by('-id')[offset: offset + 20][::-1]
        for obj in messages:
            if obj.to == uid and not obj.read_status:
                obj.read_status = True
                obj.save()
            dict_obj = {
                'id': obj.id,
                'body': obj.body,
                'to': obj.to,
                'sender': obj.sender,
                'create_date': str(obj.create_date),
                'attachments': []
            }
            for att in MessageDocument.objects.filter(message_id=obj.id):
                dict_obj['attachments'].append({
                    'name': att.name,
                    'url': att.attachment.url
                })
            ar.append(dict_obj)
        return ar

    @classmethod
    def get_friend_messages(cls, request, params):
        uid = request.user.id
        target_id = params['target_id']
        data = cls.get_message_list(uid, target_id, 0)
        return data

    @classmethod
    def get_old_messages(cls, request, params):
        uid = request.user.id
        target_id = params['target_id']
        offset = params['offset']
        data = cls.get_message_list(uid, target_id, offset)
        return data

    @classmethod
    def send(cls, request, params):
        uid = request.user.id
        target_id = params['to']
        body = params['body']
        message = Message(to=target_id, sender=uid, body=body, create_date=datetime.now())
        message.save()
        attachment_urls = []
        attachments = params.get('attachments')
        if attachments:
            for attachment in attachments:
                file_name = attachment['name']
                doc = MessageDocument(
                    message_id=message.id,
                    file_type='message',
                    name=file_name
                )

                image_data = attachment['binary']
                image_data = ws_methods.base64StringToFile(image_data, file_name)

                doc.attachment.save(file_name, image_data, save=True)
                attachment_urls.append({
                    'name': file_name,
                    'url': doc.attachment.url
                })

        message = message.__dict__
        message['attachments'] = attachment_urls
        message['create_date'] = str(datetime.now())

        del message['_state']
        message['uuid'] = params['uuid']
        events = [
            {'name': 'chat_message_received', 'data': message, 'audience': [target_id]}
        ]
        res = ws_methods.emit_event(events)
        if res == 'done':
            return message
        else:
            return res

    @classmethod
    def mark_read(cls, request, params):
        message_id = params['message_id']
        message = Message.objects.get(pk=message_id)
        message.read_status = True
        message.save()
        return 'done'


class MessageDocument(File):
    message = models.ForeignKey(Message, on_delete=models.CASCADE)


class AuthUserChat(models.Model):
    @classmethod
    def verify_chat_user(cls, request, params):
        data = {
            'friends' : [],
            'friendIds': [],
            'notifications': [],
            'unseen': 0,
            'user': {
                'id': request.user.id,
                'name': 'Anonymous',
                'photo': 'https://theareligroup.com/wp-content/uploads/2016/03/user-experiance-icon.png',
            }
        }
        try:
            uid = params['id']
            uid = int(uid)
            mp_users = Profile.objects.filter()
            unseen_messages = 0
            friend_list = {}
            friend_ids = []
            for friendObj in mp_users:
                if friendObj.pk != uid:
                    id = friendObj.id
                    name = friendObj.fullname()
                    photo = friendObj.image.url
                    unseen = len(Message.objects.filter(sender=friendObj.id, read_status=False, to=uid))
                    unseen_messages += unseen
                    friend = {
                        'id': id,
                        'unseen': unseen,
                        'name': name,
                        'photo': photo
                    }
                    friend_list[id] = friend
                    friend_ids.append(id)                
            
            user_object = User.objects.get(pk=uid)
            profile_object = Profile.objects.filter(pk = uid)
            if not profile_object:
                profile_object = Profile(user_ptr=user_object, name=user_object.username)            
                profile_object.save()
                if user_object.is_superuser:
                    create_group(user_object, 'Admin')
                else:
                    create_group(user_object, 'Staff')
            else:
                profile_object = profile_object[0]
                res = None
                if not profile_object.groups.constrained_target:
                    if profile_object.is_superuser:
                        res = create_group(user_object, 'Admin')
                    else:
                        res = create_group(user_object, 'Director')
                    if res != 'done':
                        if res:
                            data['message'] = {'error': res }
                        else:
                            data['message'] = {'error': 'Error in group creation' }
            req_user = {
                'id': uid,
                'name': profile_object.name,
                'photo': profile_object.image.url
            }
            notifications = Notification.getMyNotifications(request, False)
            data = {
                'friends' : friend_list,
                'friendIds': friend_ids ,
                'notifications': notifications,
                'unseen': unseen_messages,
                'user': req_user
            }
        except:
            eg = traceback.format_exception(*sys.exc_info())
            errorMessage = ''
            cnt = 0
            for er in eg:
                cnt += 1
                if not 'lib/python' in er:
                    errorMessage += " " + er
            data['message'] = {'error': errorMessage }
        return data


admin.site.register(Comment)
admin.site.register(Message)
admin.site.register(Notification)
admin.site.register(NotificationType)
admin.site.register(MessageDocument)