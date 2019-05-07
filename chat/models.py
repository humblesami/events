from datetime import datetime

from django.apps import apps
from django.contrib import admin
from django.db import models

from mainapp import ws_methods
from meetings.user import Profile, create_group
from django.contrib.auth.models import User as user_model, User


class NotificationType(models.Model):
    res_app = models.CharField(max_length=128)
    res_model = models.CharField(max_length=128)
    template = models.CharField(max_length=256)
    parent = models.ForeignKey('self', null=True, on_delete=models.CASCADE)

class Notification(models.Model):
    res_id = models.IntegerField()
    parent = models.ForeignKey('self', null=True, on_delete=models.CASCADE)
    notification_type = models.ForeignKey(NotificationType, on_delete=models.CASCADE)
    content = models.CharField(max_length=512)

    @classmethod
    def getMyNotifications(cls, request, params):
        uid = request.user.id
        app_name = params.get('res_app')
        model_name = params.get('res_model')
        res_id = params.get('res_id')
        sql = 'select distinct '
        sql += ' res_app, res_model, n.content, res_id, n.id, counter '
        sql += ' ,nt.action_id'
        sql += ' from'
        sql += ' chat_notification n '
        sql += ' join chat_notification_type nt on nt.id=n.notification_type_id'
        sql += ' join chat_notification_counter c on c.notification_id=n.id'
        sql += ' where counter>0 and n.parent_id is null and user_id='+str(uid)
        if app_name:
            sql += " and res_app='"+app_name+"'"
        if model_name:
            sql += " and res_model='"+model_name+"'"
        if res_id:
            sql += " and res_id="+str(res_id)
        res = ws_methods.execute_read(sql)
        return res

    @classmethod
    def getNotificationCount(cls, request, params):
        uid = request.user.id
        app_name = params.get('res_app')
        model_name = params.get('res_model')
        res_id = params.get('res_id')
        sql = 'select counter from '
        sql += ' notification n '
        sql += ' join notification_counter c on c.notification_id=n.id'
        sql += ' where counter>0 and user_id='+str(uid)
        if app_name:
            sql += " and res_app='" + app_name + "'"
        if model_name:
            sql += " and res_model='" + model_name + "'"
        if res_id:
            sql += " and res_id=" + str(res_id)
        res = ws_methods.execute_read(sql)
        if len(res) > 0:
            res = res[0]['counter']
        else:
            res = 0
        return res

    @classmethod
    def getMyNotificationsOnRecord(cls, request, params):
        uid = request.user.id
        app_name = params.get('res_app')
        model_name = params.get('res_model')
        res_id = params.get('res_id')
        sql = 'select res_app, res_model, n.content, res_id, n.id, counter from '
        sql += ' notification n'
        sql += ' join notification nt on nt.id=n.notification_type_id'
        sql += ' join notification_counter c on c.notification_id=n.id'
        sql += ' where counter>0 and user_id='+str(uid)
        if app_name:
            sql += " and res_app='" + app_name + "'"
        if model_name:
            sql += " and res_model='" + model_name + "'"
        if res_id:
            sql += " and res_id=" + str(res_id)
        res = ws_methods.execute_read(sql)
        return res

    @classmethod
    def add_notification(cls, params, event_data):
        model = apps.get_model(params['res_app'], params['res_model'])
        obj_res = model.objects.get(pk=params['res_id'])
        audience = obj_res.get_audience()

        parent_object = params.get('parent')
        if parent_object:
            notification_values1 = {
                'res_model': parent_object['res_model'],
                'res_id': parent_object['res_id'],
                'res_app': parent_object['res_app'],
                'content': 'Fake cont',
            }
            audience = obj_res.get_audience()
            parent_notification = cls.add_notification_item(notification_values1, audience)
            params['parent_id'] = parent_notification.id
            del params['parent']

        notification = cls.add_notification_item(params, audience)
        events = [
            {'name': 'notification_received', 'data': notification, 'audience': audience},
            {'name': event_data['name'], 'data': event_data['data'], 'audience': audience}
        ]
        res = ws_methods.emit_event(events)
        return res

    @classmethod
    def add_notification_item(cls, notification_values, audience):
        content = 'Fakeo'
        res_model = notification_values['res_model']
        res_id = notification_values['res_id']
        res_app = notification_values['res_app']
        res_id = int(res_id)

        notification_type = NotificationType.objects.filter(res_app=res_app, res_model=res_model)
        if len(notification_type) == 0:
            notification_type = NotificationType(res_app=res_app, res_model=res_model)
            notification_type.save()
        else:
            notification_type = notification_type[0]


        notification = Notification.objects.filter(notification_type_id=notification_type.id, res_id=res_id)
        if not notification:
            notification = Notification(
                res_id=res_id,
                notification_type_id=notification_type.id
            )
            notification.save()
        else:
            notification = notification[0]
        a = 1
        for uid in audience:
            notification_counter = NotificationCounter.objects.filter(
                user_id=uid,notification_id=notification.id)
            if len(notification_counter) > 0:
                notification_counter = notification_counter[0]
                notification_counter.counter += 1
                notification_counter.save()
            else:
                notification_counter = NotificationCounter(
                    counter=1,
                    user_id=uid,
                    notification_id=notification.id
                )
                notification_counter.save()
        notification = notification.__dict__
        del notification['_state']
        return notification

    @classmethod
    def update_counter(cls, request, params):

        uid = request.user.id
        res_id = params.get('res_id')
        res_app = params.get('res_app')
        res_model = params.get('res_model')
        notification = Notification.objects.filter(res_app=res_app,res_model=res_model, res_id=res_id)
        notification = notification[0]
        notification_counter = NotificationCounter.objects.filter(user_id=uid,notification_id=notification.id)
        if len(notification_counter) != 1:
            return 'Invalid notification '+str(notification.id)+' for uid '+str(uid)
        counter = notification_counter.counter
        notification_counter.counter = 0
        notification_counter.save()

        if notification.parent:
            notification = notification.parent
            notification_counter = NotificationCounter.objects.filter(
                user_id=uid,
                notification_id=notification.id
            )
            notification_counter.counter -= counter
            notification_counter.save()
        return 'done'

class NotificationCounter(models.Model):
    _name = 'notification.counter'
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    counter = models.IntegerField(default = 0)

class Comment(models.Model):
    res_id = models.IntegerField()
    res_app = models.CharField(max_length=128)
    res_model = models.CharField(max_length=128)
    subtype_id = models.IntegerField()
    body = models.TextField()
    parent = models.ForeignKey('self', null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    create_date = models.DateTimeField(null=True)

    @classmethod
    def get_comments(cls, request, params):
        res = cls.objects.filter(
            res_app=params['res_app'],
            res_model=params['res_model'],
            res_id=params['res_id'],
            subtype_id=params['subtype_id'],
        ).order_by('id')
        try:

            parents = {

            }
            comments = []
            for obj in res:
                comment = obj.__dict__
                del comment['_state']
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
        except:
            res = []
        return res

    @classmethod
    def add(cls, request, params):
        comment = Comment(
            res_app=params['res_app'],
            res_model=params['res_model'],
            res_id=params['res_id'],
            subtype_id=params['subtype_id'],
            body=params['body'],
            user_id=request.user.id,
            create_date=datetime.now()
        )
        if params.get('parent_id'):
            comment.parent_id=params['parent_id']
        comment.save()
        comment = comment.__dict__
        del comment['_state']
        event_data = {'name': 'comment_received', 'data': comment}
        Notification.add_notification(params, event_data)
        return 'done'

admin.site.register(Comment)

class Message(models.Model):
    sender = models.IntegerField()
    to = models.IntegerField()
    content = models.TextField()
    read_status = models.BooleanField(default=False)

    @classmethod
    def get(cls, request, params):
        return {'error': 'Not implemented'}

class AuthUserChat(models.Model):
    @classmethod
    def verify_chat_user(cls, request, params):
        uid = params['id']
        uid = int(uid)
        mp_users = Profile.objects.filter()
        unseenMessages = 0
        friendList = {}
        friendIds = []
        http_host = request.META.get('HTTP_HOST')
        req_user = False
        if not http_host:
            http_host = ''
        for friendObj in mp_users:
            if friendObj.pk != uid:
                friend = {
                    'id': friendObj.id,
                    'name': friendObj.fullname(),
                    'photo': http_host+friendObj.image.url
                }
                # if friendObj.has_group('meeting_point.group_meeting_staff') or friendObj.has_group(
                #         'meeting_point.group_meeting_admin'):
                #     friend['type'] = 'staff'
                # else:
                #     friend['type'] = 'director'
                friend['unseen'] = len(Message.objects.filter(sender=friendObj.id, read_status=False, to=uid))
                unseenMessages += friend['unseen']
                friendList[friend['id']] = friend
                friendIds.append(friend['id'])
            else:
                req_user = {
                    'id': uid,
                    'name': friendObj.fullname(),
                    'photo': http_host + friendObj.image.url
                }
        if not req_user:
            user_object = user_model.objects.get(pk=uid)
            if user_object.is_superuser:
                profile_object = Profile(user_ptr=user_object, name=user_object.username)
                profile_object.save()
                create_group(user_object, 'Admin')
                req_user = {
                    'id': uid,
                    'name': profile_object.name,
                    'photo': http_host + profile_object.image.url
                }
        if not req_user:
            return "user does not exist"
        data = {
            'friends' : friendList,
            'friendIds': friendIds ,
            'notifications': [],
            'unseen': unseenMessages,
            'user': req_user
        }
        return data