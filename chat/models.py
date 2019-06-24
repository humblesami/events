import sys
import traceback
from django.db import models
from django.apps import apps
from datetime import datetime
from mainapp import ws_methods
from django.contrib import admin
from django.contrib.auth.models import User
from django.db import connection
from documents.file import File
from meetings.model_files.user import Profile, create_group


class PostAddress(models.Model):
    parent_post_id = models.IntegerField(null=True)
    res_app = models.CharField(max_length=128)
    res_model = models.CharField(max_length=128)
    res_id = models.IntegerField()

class NotificationType(models.Model):
    name = models.CharField(max_length=100, default='Unknown')
    template = models.CharField(max_length=256, default='')    

class Notification(models.Model):
    post_address = models.ForeignKey(PostAddress, on_delete=models.CASCADE, null=True)
    notification_type = models.ForeignKey(NotificationType, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.post_address.res_app+'.'+self.post_address.res_model+'.'+str(self.post_address.res_id)+'--'+self.notification_type.name


    def get_meta(self, res_obj):
        sender_notifications = self.sendernotification_set.all()
        senders_list = []
        for sender_notification in sender_notifications:
            senders_list.append(sender_notification.sender.name)

        notification_template = self.notification_type.template
        name_place = ''
        try:
            name_place = res_obj.notification_text()
        except:
            name_place = res_obj.name
        meta = {
            'senders': senders_list,
            'template': notification_template,
            'name_place': name_place
        }
        return meta

    @classmethod
    def add_notification(cls, sender, params, event_data, text=None):
        type_name = params['notification_type']
        parent_post_id = params.get('parent_post_id')
        res_model = params['res_model']
        res_app = params['res_app']
        res_id = params['res_id']

        post_address = cls.get_post_address(res_app, res_model, res_id, parent_post_id)
        notification_type = cls.get_notification_type(type_name)
        notification = cls.get_notification(notification_type.id,post_address.id)
        sender_notification = cls.get_sender_notification(notification.id, sender.id)

        model = apps.get_model(res_app, res_model)
        obj_res = model.objects.get(pk=res_id)
        audience = None
        try:
            audience = obj_res.get_audience()
        except:
            return 'get audience not defined for '+res_app+'.'+res_model
        if not audience:
            return 'No Audience'
        audience.remove(sender.id)
        for uid in audience:
            user_notification = UserNotification.objects.filter(sender_notification_id=sender_notification.id,user_id= uid)
            if not user_notification:
                user_notification = UserNotification(sender_notification_id=sender_notification.id,user_id= uid)
                user_notification.save()

        meta = notification.get_meta(obj_res)
        text = (' , ').join(meta['senders']) + ' '+meta['template'] + ' '+meta['name_place']
        if len(audience) > 0:
            client_object = {
                'id': notification.id,
                'body': text,
                'notification_type': notification_type.name,
                'address': {
                    'res_id': post_address.res_id,
                    'res_model': post_address.res_model,
                    'res_app': post_address.res_app,
                    'parent_post_id': post_address.parent_post_id
                }
            }
            events = [
                {'name': 'notification_received', 'data': client_object, 'audience': audience},
                {'name': event_data['name'], 'data': event_data['data'], 'audience': audience}
            ]
            res = ws_methods.emit_event(events)
        else:
            return 'No audience for the notification'
        return res

    @classmethod
    def get_my_notifications(cls, request, params):
        res = cls.getMyNotifications(request, params)
        return res

    @classmethod
    def get_notification_type(cls, name):
        notification_type = NotificationType.objects.filter(name=name)
        if not notification_type:
            notification_type = NotificationType(name=name, template=name)
            notification_type.save()
        else:
            notification_type = notification_type[0]
        return notification_type

    @classmethod
    def get_post_address(cls, res_app, res_model, res_id, parent_post_id=None):
        post_address = PostAddress.objects.filter(res_app=res_app, res_model=res_model, res_id=res_id)
        if not post_address:
            post_address = PostAddress(res_app=res_app, res_model=res_model, res_id=res_id)
            if parent_post_id:
                post_address.parent_post_id = parent_post_id
            post_address.save()
        else:
            post_address = post_address[0]
        return post_address

    @classmethod
    def get_notification(cls, notification_type_id,post_address_id):
        notification = Notification.objects.filter(notification_type_id=notification_type_id, post_address_id=post_address_id)
        if not notification:
            notification = Notification(notification_type_id=notification_type_id, post_address_id=post_address_id)
            notification.save()
        else:
            notification = notification[0]
        return notification

    @classmethod
    def get_sender_notification(cls, notification_id, sender_id):
        sender_notification = SenderNotification.objects.filter(notification_id=notification_id, sender_id=sender_id)
        if not sender_notification:
            sender_notification = SenderNotification(notification_id=notification_id, sender_id=sender_id)
            sender_notification.save()
        else:
            sender_notification = sender_notification[0]
        return sender_notification

    @classmethod
    def getMyNotifications(cls, request, params):
        uid = request.user.id
        objects = {}
        notification_ids = []
        records = UserNotification.objects.filter(read=False, user_id=uid)
        for un in records:
            sender_notification = un.sender_notification
            sender = sender_notification.sender
            notification = sender_notification.notification
            
            senders = {}
            if(objects.get(notification.id)):
                senders = objects[notification.id]['senders']
                if not senders.get(sender.id):
                    senders[sender.id] = { 'id': sender.id, 'name': sender.name}
                continue
            else:
                senders[sender.id] = { 'id': sender.id, 'name': sender.name}

            notification_ids.append(notification.id)
            notification_type = notification.notification_type.name
            address = notification.post_address
            model = apps.get_model(address.res_app, address.res_model)
            obj_res = model.objects.get(pk=address.res_id)
            meta = notification.get_meta(obj_res)
            text = (' , ').join(meta['senders']) + ' '+meta['template'] + ' '+meta['name_place']
            client_object = {
                'id': notification.id,                
                'senders': senders,
                'body': text,
                'notification_type': notification_type,
                'address': {
                    'res_id': address.res_id,
                    'res_model': address.res_model,
                    'res_app': address.res_app,
                }
            }
            objects[notification.id] = client_object
        array = []
        for key, item in objects.items():
            sender_array = []
            for sender in item['senders']:
                sender_array.append(sender)
            item['senders'] = {
                'objects': item['senders'],
                'list': sender_array
            }
            array.append(item)
        res = { 'ids': notification_ids, 'list': array, 'objects': objects}
        return res

class SenderNotification(models.Model):
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE)
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE)

class UserNotification(models.Model):
    read = models.BooleanField(default=False)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    sender_notification = models.ForeignKey(SenderNotification, on_delete=models.CASCADE)

    @classmethod
    def mark_read(cls, request, params):        
        res_id = params['res_id']
        res_model = params['res_model']
        res_app = params['res_app']
        address = PostAddress.objects.filter(res_app=res_app, res_model=res_model, res_id=res_id)
        if address:
            pass

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
        )
        
        res_id = params['res_id']
        res_model = params['res_model']
        res_app = params['res_app']

        read_ids = []
        address = PostAddress.objects.filter(res_app=res_app, res_model=res_model, res_id=res_id)
        if address:
            address = address[0]
            notifications = address.notification_set.all()
            for obj1 in notifications:
                sender_notifications = obj1.sendernotification_set.all()
                for obj2 in sender_notifications:
                    user_notifications = obj2.usernotification_set.filter(user_id=request.user.id)
                    for obj3 in user_notifications:
                        obj3.read = True
                        obj3.save()
                        read_ids.append(obj1.id)
        

        sql = "select un.id from chat_usernotification un "
        sql += " join chat_sendernotification sn on sn.id = un.sender_notification_id"
        sql += " join chat_notification n on sn.notification_id=n.id"
        sql += " join chat_postaddress pa on pa.id=n.post_address_id"
        sql += " where pa.res_app='meetings' and res_model='event' and res_id=1"
        # objs = UserNotification.objects.raw(sql) 
        
        # with connection.cursor() as cursor:
        #     cursor.execute(sql)
        #     row = cursor.fetchall()

        # sql1 = "update chat_usernotification set read=True where id in("+sql+")"

        # with connection.cursor() as cursor:
        #     cursor.execute(sql1)
        #     row = cursor.fetchone()

        # objs = UserNotification.objects.raw(sql)

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
        res = {'comments': comments, 'read_notification_ids': read_ids}
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
        param = params
        param['notification_type'] = 'comment'
        event_data = {'name': 'comment_received', 'data': comment, 'uid' : request.user.id}
        Notification.add_notification(request.user, param, event_data)
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
            res = False
            if not profile_object:
                profile_object = Profile(user_ptr=user_object, name=user_object.username)            
                profile_object.save()
                if user_object.is_superuser:
                    res = create_group(user_object, 'Admin')
                else:
                    res = create_group(user_object, 'Staff')
            else:
                profile_object = profile_object[0]
                res = None
                if not profile_object.groups.all():
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
