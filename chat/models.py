from django.db import models
from django.apps import apps
from datetime import datetime
from mainapp import ws_methods
from django.contrib import admin
from meetings.user import Profile, create_group
from django.contrib.auth.models import User as user_model, User


class NotificationType(models.Model):
    res_app = models.CharField(max_length=128)
    res_model = models.CharField(max_length=128)
    res_type = models.CharField(max_length=64)
    template = models.CharField(max_length=256)


class Notification(models.Model):
    res_id = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    counter = models.IntegerField(default=1)
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
                    note = 'You have ' + str(obj.counter) + ' new '+note
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
    def add_notification(cls, params, event_data):

        res_model = params['res_model']
        res_app = params['res_app']
        res_id = params['res_id']
        res_id = int(res_id)

        model = apps.get_model(res_app, res_model)
        obj_res = model.objects.get(pk=res_id)
        audience = obj_res.get_audience()
        if not audience:
            return 'No Audience'

        res_type = params.get('res_type')
        if not res_type:
            res_type = 'comment'

        template = params.get('template')
        if not template:
            template = ' comment(s) '

        notification_type = NotificationType.objects.filter(
            res_app=res_app, res_model=res_model, res_type=res_type
        )
        if not notification_type:
            notification_type = NotificationType(
                res_app=res_app, res_model=res_model,
                res_type=res_type, template=template
            )
            notification_type.save()
        else:
            notification_type = notification_type[0]

        for uid in audience:
            notification = Notification.objects.filter(
                notification_type_id=notification_type.id,
                res_id=res_id,user_id=uid
            )
            if not notification:
                notification = Notification(
                    res_id=res_id,
                    user_id=uid,
                    notification_type_id=notification_type.id
                )
                notification.save()
            else:
                notification = notification[0]
                notification.counter += 1
                notification.save()

        if len(audience) > 0:
            note = notification_type.template
            note = {
                'res_id': res_id,
                'res_model': res_model,
                'res_app': res_app,
                'res_type': res_type,
                'body': note
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
        a =1


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
        notifications = Notification.getMyNotifications(request, False)
        data = {
            'friends' : friendList,
            'friendIds': friendIds ,
            'notifications': notifications,
            'unseen': unseenMessages,
            'user': req_user
        }
        return data


admin.site.register(Comment)
admin.site.register(Message)
admin.site.register(Notification)
admin.site.register(NotificationType)