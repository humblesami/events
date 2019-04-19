from django.db import models
from .user import *
from .committee import *

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=200)
    start_date = models.DateTimeField('start date')


class Topic(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)






