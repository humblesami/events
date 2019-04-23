from django.db import models
from django.contrib.auth.models import User
from .user import *
from .committee import *

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=200)
    start_date = models.DateTimeField('start date')
    attendees = models.ManyToManyField(User)
    def __str__(self):
        return self.name

class News(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

    @classmethod
    def get_data(cls):
        return {'to_do_items': []}

class Topic(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name






