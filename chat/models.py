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
        mp_users = Profile.objects.filter()
        unseenMessages = 0
        friendList = {}
        friendIds = []
        http_host = request.META.get('HTTP_HOST')
        req_user = {}
        if not http_host:
            http_host = ''
        for friendObj in mp_users:
            if friendObj.id != uid:
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
                req_user =  {
                    'id': friendObj.id,
                    'name': friendObj.fullname(),
                    'photo': http_host+friendObj.image.url
                }
        data = {'friends' : friendList, 'notifications': [], 'unseen': unseenMessages, 'user': req_user }
        return data