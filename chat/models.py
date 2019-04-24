from django.db import models
from django.contrib.auth.models import User
from authsignup.models import AuthUser

# Create your models here.
class Message(models.Model):
    sender = models.IntegerField()
    to = models.IntegerField()
    content = models.TextField()
    read_status = models.BooleanField(default=False)

    @classmethod
    def get(cls, request, params):
        return {'error': 'Not implemented'}


class AuthUserChat(AuthUser):
    class Meta:
        proxy = True
    @classmethod
    def get_data(cls, request, params):
        data = User.objects.exclude(id=params['id']).values('id', 'username')
        data = {'friends' : list(data), 'notifications': [] }
        return data