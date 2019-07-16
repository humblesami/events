import sys
import traceback
from django.db import models
from django.apps import apps
from datetime import datetime
from mainapp import ws_methods
from documents.file import File
from django.contrib import admin
from django.db import connection
from django.contrib.auth.models import User
from meetings.model_files.user import Profile, create_group


class PostAddress(models.Model):
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
        return self.post_address.res_app + '.' + self.post_address.res_model + '.' + str(
            self.post_address.res_id) + '--' + self.notification_type.name

    def get_meta(self, res_obj):
        #sender list would be same for all users/audience
        user_notifications = self.usernotification_set.filter(read=False, notification_id=self.id)
        senders_list = []
        for user_notification in user_notifications:
            sender = {
                'id': user_notification.sender.id,
                'name': user_notification.sender.name
            }
            if sender not in senders_list:
                senders_list.append(sender)

        notification_template = self.notification_type.template
        name_place = ''
        post_meta = None
        try:
            name_place = res_obj.notification_text()
            if hasattr(res_obj, 'get_meta'):
                post_meta = res_obj.get_meta()
        except:
            name_place = res_obj.name
        meta = {
            'senders': senders_list,
            'template': notification_template,
            'name_place': ' => ' + name_place,
            'info': post_meta
        }        
        return meta


    @classmethod
    def mark_read(cls, request, params):
        notification_id = params['notification_id']
        notification = Notification.objects.get(id=notification_id)
        address = notification.post_address
        notifications = address.notification_set.all()
        read_ids = []
        for obj1 in notifications:
            user_notifications = obj1.usernotification_set.filter(user_id=request.user.id, read=False, notification_id=obj1.id)
            for obj3 in user_notifications:
                obj3.read = True
                obj3.save()
                if not obj1.id in read_ids:
                    read_ids.append(obj1.id)
        return read_ids

    @classmethod
    def add_notification(cls, sender, params, event_data, mentioned_list=None):
        type_name = params['notification_type']
        file_type = params.get('file_type')
        res_model = params['res_model']
        res_app = params['res_app']
        res_id = params['res_id']

        post_address = cls.get_post_address(res_app, res_model, res_id)
        if mentioned_list:
            mention_notification_type = cls.get_notification_type('mention')
            mention_notification = cls.get_notification(mention_notification_type.id, post_address.id)

        notification_type = cls.get_notification_type(type_name)
        notification = cls.get_notification(notification_type.id, post_address.id)

        model = apps.get_model(res_app, res_model)
        obj_res = model.objects.get(pk=res_id)
        audience = None
        try:
            audience = obj_res.get_audience()
        except:
            return 'get audience not defined for ' + res_app + '.' + res_model
        if not audience:
            return 'No Audience'
        audience.remove(sender.id)
        senders_for_mention = {}
        if mentioned_list:
            for uid in mentioned_list:
                user_notification = UserNotification(notification_id=mention_notification.id, sender_id=sender.id, user_id=uid)
                user_notification.save()
                senders_for_mention[uid] = UserNotification.get_senders(cls, uid, mention_notification.id)
            
            audience = list(set(audience) - set(mentioned_list))
        senders_for_all = {}
        for uid in audience:
            user_notification = UserNotification(notification_id=notification.id, sender_id=sender.id, user_id=uid)
            user_notification.save()
            senders_for_all[uid] = UserNotification.get_senders(cls, uid, notification.id)

        meta = notification.get_meta(obj_res)
        text = ' ' + meta['template'] + ' ' + meta['name_place']
        if len(audience) > 0:
            client_object = {
                'id': notification.id,
                'body': text,
                'senders': senders_for_all,
                'notification_type': notification_type.name,
                'address': {
                    'res_id': post_address.res_id,
                    'res_model': post_address.res_model,
                    'res_app': post_address.res_app,
                    'info': meta['info']
                }
            }
            events = [
                {'name': 'notification_received', 'data': client_object, 'audience': audience},
            ]
            if mentioned_list:
                mention_meta = mention_notification.get_meta(obj_res)
                clone = client_object.copy()
                clone['id'] = mention_notification.id
                clone['audience'] = mentioned_list
                clone['senders'] = senders_for_mention
                clone['notification_type'] = mention_notification_type.name
                clone['body'] = ' ' + mention_meta['template'] + ' ' + mention_meta['name_place']
                events.append({'name': 'notification_received', 'data': clone, 'audience': mentioned_list})
                events.append({'name': event_data['name'], 'data': event_data['data'], 'audience': audience + mentioned_list})
            else:
                events.append({'name': event_data['name'], 'data': event_data['data'], 'audience': audience})
            res = ws_methods.emit_event(events)
        else:
            return 'No audience for the notification'
        return res

    @classmethod
    def get_notification_type(cls, name):
        notification_type = NotificationType.objects.filter(name=name)
        template = ''
        if name == 'comment':
            template = 'commented on'
        elif name == 'mention':
            template = 'mentioned you'
        else:
            template = name
        if not notification_type:
            notification_type = NotificationType(name=name, template=template)
            notification_type.save()
        else:
            notification_type = notification_type[0]
        return notification_type

    @classmethod
    def get_post_address(cls, res_app, res_model, res_id):
        post_address = PostAddress.objects.filter(res_app=res_app, res_model=res_model, res_id=res_id)
        if not post_address:
            post_address = PostAddress(res_app=res_app, res_model=res_model, res_id=res_id)            
            post_address.save()
        else:
            post_address = post_address[0]
        return post_address

    @classmethod
    def get_notification(cls, notification_type_id, post_address_id):
        notification = Notification.objects.filter(notification_type_id=notification_type_id,
                                                   post_address_id=post_address_id)
        if not notification:
            notification = Notification(notification_type_id=notification_type_id, post_address_id=post_address_id)
            notification.save()
        else:
            notification = notification[0]
        return notification


class UserNotification(models.Model):
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE)
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='User')
    read = models.BooleanField(default=False)

    def get_senders(self, user_id, notification_id):
        notification_senders = UserNotification.objects.filter(
            read=False, user_id=user_id, notification_id=notification_id
            ).values('sender__id', 'sender__name')
        count = notification_senders.count()
        notification_senders = notification_senders.distinct()
        senders = []
        for notification_sender in notification_senders:
            senders.append({
                'id': notification_sender['sender__id'], 
                'name': notification_sender['sender__name']
                })
        return senders, count
    
    @classmethod
    def mark_read_notification(cls, request, params):
        res_id = params['res_id']
        res_model = params['res_model']
        res_app = params['res_app']

        read_ids = []
        address = PostAddress.objects.filter(res_app=res_app, res_model=res_model, res_id=res_id)
        if address:
            address = address[0]
            notifications = address.notification_set.all()
            for obj1 in notifications:
                user_notifications = obj1.usernotification_set.filter(user_id=request.user.id,read=False,notification_id=obj1.id)
                for obj3 in user_notifications:
                    obj3.read = True
                    obj3.save()
                    if not obj1.id in read_ids:
                        read_ids.append(obj1.id)
        return read_ids

    @classmethod
    def get_my_notifications(cls, request, params):
        uid = request.user.id
        objects = {}
        notification_ids = []
        records = UserNotification.objects.filter(read=False, user_id=uid)

        not_found = {}
        for un in records:
            notification = un.notification
            if objects.get(notification.id):
                continue

            notification_ids.append(notification.id)
            notification_type = notification.notification_type.name

            address = notification.post_address
            model = apps.get_model(address.res_app, address.res_model)
            obj_res = model.objects.filter(pk=address.res_id)            
            if obj_res:
                obj_res = obj_res[0]
                meta = notification.get_meta(obj_res)
                senders_for_all = {}
                senders_for_all[request.user.id], count = UserNotification.get_senders(cls, uid, notification.id)
                text = ' ' + meta['template'] + ' ' + meta['name_place']
                client_object = {
                    'id': notification.id,
                    'count': count,
                    'body': text,
                    'senders': senders_for_all,
                    'notification_type': notification_type,
                    'address': {
                        'res_id': address.res_id,
                        'res_model': address.res_model,
                        'res_app': address.res_app,
                        'info': meta['info']
                    }
                }
                objects[notification.id] = client_object
            else:
                not_found[notification.id] = address.res_id
        array = []
        for key, item in objects.items():
            array.append(item)
        res = {'ids': notification_ids, 'list': array, 'objects': objects, 'not_found': not_found}
        return res


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

        read_ids = [] #UserNotification.mark_read_notification(request, params)
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
        mentioned_list = params.get('mentioned_list')
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
            comment.parent_id = params['parent_id']
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
        event_data = {'name': 'comment_received', 'data': comment, 'uid': request.user.id}
        Notification.add_notification(request.user, param, event_data, mentioned_list)
        return comment


class ChatGroup(models.Model):
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(User, related_name='chat_groups')
    active = models.BooleanField(default=True)
    create_time = models.DateTimeField(null=True, auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    @classmethod
    def create(cls, request, params):
        events = []
        audience = []
        uid = request.user.id
        me_added = False
        member_ids = []
        for obj in params.get('members'):
            member_ids.append(obj['id'])
            if uid != obj['id']:
                audience.append(obj['id'])
            else:
                me_added = True
        chat_group = ChatGroup(
            name=params['name'],
            created_by_id = uid
        )
        chat_group.save()
        if not me_added:
            member_ids.append(uid)
        chat_group.members.set(member_ids)
        chat_group.save()
        events.append({'name': 'chat_group_created', 'data': params, 'audience': audience})

        created_chat_group = {
            'name': params['name'],
            'id': chat_group.id,
            'members': params.get('members')
        }
        return { 'error': '', 'data': created_chat_group }

    @classmethod
    def get_messages(cls, request, params):
        chat_group_id = params.get('group_id')
        offset = 0
        messages = Message.objects.filter(chat_group_id=chat_group_id).order_by('-id')[offset: offset + 20][::-1]
        messages = Message.get_processed_messages(messages, request.user.id)
        return messages


class Message(models.Model):
    sender = models.IntegerField()
    to = models.IntegerField()
    body = models.TextField()
    read_status = models.BooleanField(default=False)
    create_date = models.DateTimeField(null=True, auto_now_add=True)
    chat_group = models.ForeignKey(ChatGroup, null=True, on_delete=models.CASCADE)

    @classmethod
    def get_processed_messages(cls, messages, uid):
        ar = []
        for obj in messages:
            if obj.sender != uid and not obj.read_status:
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
    def get_message_list(cls, uid, target_id, offset):
        uid = int(uid)
        target_id = int(target_id)
        user_ids = [target_id, uid]
        ar = []
        messages = Message.objects.filter(sender__in=user_ids, to__in=user_ids).order_by('-id')[offset: offset + 20][::-1]
        ar = cls.get_processed_messages(messages, uid)
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
    def mark_read_message(cls, request, params):
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
            'friends': [],
            'friendIds': [],
            'notifications': [],
            'unseen': 0,
            'committees': [],
            'meetings': [],
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
            committees = []
            meetings = []
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
            profile_object = Profile.objects.filter(pk=uid)
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
                    data['message'] = {'error': res}
                else:
                    data['message'] = {'error': 'Error in group creation'}
            req_user = {
                'id': uid,
                'name': profile_object.name,
                'photo': profile_object.image.url
            }
            committee_objects = profile_object.committees.all()
            for obj in committee_objects:
                committees.append({'id': obj.id, 'name': obj.name})
            meeting_objects = profile_object.meetings.all()
            for obj in meeting_objects:
                meetings.append({'id': obj.id, 'name': obj.name})
            for com in committee_objects:
                committees.append({'id': com.id, 'name': com.name})
            notifications = UserNotification.get_my_notifications(request, False)
            chat_groups = profile_object.chat_groups.filter(active=True)
            chat_groups_list = []
            for obj in chat_groups:
                unseen = len(Message.objects.filter(chat_group_id=obj.id, read_status=False))
                chat_group = {
                    'id':obj.id, 'name': obj.name, 'unseen': unseen,
                    'photo': '/static/assets/images/group.jpeg',
                    'members': [],
                    'is_group': True
                }
                chat_groups_list.append(chat_group)
            data = {
                'friends': friend_list,
                'friendIds': friend_ids,
                'notifications': notifications,
                'unseen': unseen_messages,
                'user': req_user,
                'committees': committees,
                'meetings': meetings,
                'chat_groups': chat_groups_list
            }
        except:
            eg = traceback.format_exception(*sys.exc_info())
            errorMessage = ''
            cnt = 0
            for er in eg:
                cnt += 1
                if not 'lib/python' in er:
                    errorMessage += " " + er
            data['message'] = {'error': errorMessage}
        return data


admin.site.register(Comment)
admin.site.register(ChatGroup)
admin.site.register(Message)
admin.site.register(Notification)
admin.site.register(NotificationType)
admin.site.register(MessageDocument)