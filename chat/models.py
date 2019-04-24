from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Message(models.Model):
    sender = models.IntegerField()
    to = models.IntegerField()
    content = models.TextField()
    read_status = models.BooleanField(default=False)

    @classmethod
    def get(cls, request, params):
        return {'error': 'Not implemented'}