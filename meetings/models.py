from django.db import models
from videos.models import Video
from .user import *
from .document import *
from django_countries.fields import CountryField
from django.utils import timezone
import datetime


# Create your models here.
class Event(models.Model):
    class Meta:
        verbose_name = "Meeting"
        verbose_name_plural = "Meetings"
    name = models.CharField(max_length=200)
    start_date = models.DateTimeField('start date', null=True)
    end_date = models.DateTimeField('end date', null=True)
    attendees = models.ManyToManyField(Profile)


    custom_message = models.CharField('Message', max_length=200, blank=True)
    street = models.CharField('Street', max_length=50, blank=True)
    description = models.TextField(blank=True)
    publish = models.BooleanField('Publish', default=False)
    country = CountryField(blank=True)
    state = models.CharField('State', max_length=200, blank=True)
    city = models.CharField('City', max_length=200, blank=True)
    archived = models.BooleanField('Archived', default=False)
    zip = models.CharField('Zip', max_length=500, blank=True)
    pin = models.CharField('Meeting PIN', max_length=50, blank=True)
    conference_bridge_number = models.CharField('Conference Bridge No.', max_length=200, blank=True)

    @property
    def exectime(self):
        current_date = timezone.now()
        if self.start_date >= current_date:
            return 'upcoming'
        elif self.end_date <= current_date:
            return 'completed'


    def _compute_address(self):
        val = ''
        if self.street:
            val = val + self.street + ', '
        if self.city:
            val = val + self.city + ', '
        if self.state:
            val = val + self.state + ', '
        if self.zip:
            val = val + self.zip + ', '
        if self.country:
            val = val + str(self.country.name)
        if val:
            last_character = val[len(val) - 1]
            if last_character == ' ':
                val = val.strip()
            if last_character == ',':
                val = val[:-1]
        val = val.strip()
        return val
    location = property(_compute_address)

    def __str__(self):
        return self.name

    @classmethod
    def respond_invitation(cls, request, params):
        return {'error': 'Not implemented'}

    @classmethod
    def get_details(cls, request, params):
        if params['id']:
            meeting_id = params['id']
            meeting_id = int(meeting_id)
            meeting_object_orm = Event.objects.get(pk=meeting_id)
            location = meeting_object_orm.location
            meeting_object = Event.objects.filter(pk=meeting_id).values()
            meeting_object = list(meeting_object)
            meeting_object = meeting_object[0]
            if not meeting_object:
                return ('', {'message': 'Meeting with id' + str(meeting_id) + ' exists no more'})

            meeting_object['start_date'] = str(meeting_object['start_date'])
            meeting_object['end_date'] = str(meeting_object['end_date'])
            meeting_object['start'] = meeting_object['start_date']
            meeting_object['stop'] = meeting_object['end_date']
            if location:
                meeting_object['location'] = location
            topics = list(meeting_object_orm.topic_set.values())
            for t in topics:
                t['duration'] = str(t['duration'])
            meeting_docs = list(meeting_object_orm.meetingdocument_set.values())
            sign_docs = []
            surveys = []
            votings = list(meeting_object_orm.voting_set.values())
            for voting in votings:
                voting['open_date'] = str(voting['open_date'])
                voting['close_date'] = str(voting['close_date'])

            attendees = list(meeting_object_orm.attendees.values())
            for attendee in attendees:
                if not attendee['name']:
                    if attendee['first_name'] or attendee['last_name']:
                        attendee['name'] = attendee['first_name'] + ' ' + attendee['last_name']
                    elif attendee['username']:
                        attendee['name'] = attendee['username']
                attendee['last_login'] = str(attendee['last_login'])
                attendee['date_joined'] = str(attendee['date_joined'])
                img = attendee['image']
                if img.find('media') == -1:
                    img = 'media/' + img
                    attendee['photo'] = img

            meeting_object['topics'] = topics
            meeting_object['meeting_docs'] = meeting_docs
            meeting_object['sign_docs'] = []
            meeting_object['surveys'] = []
            meeting_object['votings'] = votings
            meeting_object['attendees'] = attendees
            data = {"meeting": meeting_object, "next": 0, "prev": 0}

        return {'data': data}

    def get_meetings(meeting_type):
        if meeting_type == 'archived':
            meetings = Event.objects.filter(archived=True)
        else:
            meetings = Event.objects.all()
        meeting_list = []
        for meeting in meetings:
            if meeting.exectime == meeting_type:
                meeting_list.append(meeting)
        return meeting_list

    @classmethod
    def get_records(cls, request, params):
        meeting_type = params.get('meeting_type')
        meeting_list = cls.get_meetings(meeting_type)
        meetings = []
        if meeting_list:
            for meeting in meeting_list:
                location = meeting.location
                meeting_val = meeting.__dict__
                meeting_val['location'] = location
                meetings.append(meeting_val)
        else:
            return 'No meeting Found'
        if meetings:
            for meeting in meetings:
                if meeting['start_date']:
                    meeting['start_date'] = str(meeting['start_date'])
                    meeting['end_date'] = str(meeting['end_date'])
                    if meeting.get('_state'):
                        del meeting['_state']
            meetings = {'records': meetings, 'total': 0, 'count': 0}
            data = {'error': '', 'data': meetings}
        else:
            data = {'error': 'Meeting not found'}
        return data

class News(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

    @classmethod
    def get_data(cls, request, params):
        home_object = {}
        home_object['video_ids'] = []
        home_object['doc_ids'] = []
        home_object['to_do_items'] = {
            'pending_meetings': [],
            'pending_surveys': [],
            'pending_documents': [],
            'pending_votings': []
        }
        home_object['calendar'] = []
        news = News.objects.values()
        for nw in news:
            videos = Video.objects.filter(news_id=nw['id'])
            for video in videos:
                video.url = video.url.replace('/watch?v=', '/embed/')
                home_object['video_ids'].append({'name': video.name, 'url': video.url})
        return {'error': '', 'data': home_object}

class Topic(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    lead = models.CharField(max_length=200, blank=True)
    duration = models.DurationField(blank=True, null=True)
    def __str__(self):
        return self.name

    @classmethod
    def get_details(cls, request, params):
        return {'error': 'Not implemented'}
