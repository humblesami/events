from django.db import models
from django.db.models import Count
from authsignup.models import AuthUser
from meetings.user import Profile


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
        mp_users = Profile.objects.exclude(id=uid)
        unseenMessages = 0
        friendList = {}
        friendIds = []
        http_host = request.META.get('HTTP_HOST')
        if not http_host:
            http_host = ''
        for friendObj in mp_users:
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

            db_filters = ()
            friend['unseen'] = len(Message.objects.filter(sender=friendObj.id, read_status=False, to=uid))
            unseenMessages += friend['unseen']
            friendList[friend['id']] = friend
            friendIds.append(friend['id'])
        data = {'friends' : friendList, 'notifications': [], 'unseen': unseenMessages }
        return data