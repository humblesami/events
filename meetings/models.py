from django.db import models
from django.contrib.auth.models import User
from videos.models import Video
from .user import *


# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=200)
    start_date = models.DateTimeField('start date')
    attendees = models.ManyToManyField(User)
    def __str__(self):
        return self.name

    @classmethod
    def respond_invitation(cls, request, params):
        return {'error': 'Not implemented'}
    
    @classmethod
    def get_records(cls, request, params):
        return {'error': 'Not implemented'}

class News(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

    @classmethod
    def get_data(cls, request, params):
        home_object= {}
        home_object['video_ids']=[]
        home_object['doc_ids'] = []
        home_object['to_do_items'] = {
            'pending_meetings':[],
            'pending_surveys':[],
            'pending_documents':[],
            'pending_votings':[]
        }
        home_object['calendar'] = []
        news = News.objects.values()
        for nw in news:
            videos = Video.objects.filter(news_id = nw['id'])
            for video in videos:
                video.url = video.url.replace('/watch?v=', '/embed/')
                home_object['video_ids'].append({'name': video.name, 'url': video.url})
        return {'error': '', 'data': home_object}

class Topic(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

    @classmethod
    def get_details(cls, request, params):
        return {'error': 'Not implemented'}
