from django.db import models
from meetings.user import Profile, create_group
from django.contrib.auth.models import User as user_model

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
        data = {'friends' : friendList, 'notifications': [], 'unseen': unseenMessages, 'user': req_user }
        return data