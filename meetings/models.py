import datetime
from django.db import models
from documents.file import File
from django.utils import timezone
from meetings.user import Profile
from voting.models import Voting
from django_countries.fields import CountryField


# Create your models here.
class Event(models.Model):
    class Meta:
        verbose_name = "Meeting"
        verbose_name_plural = "Meetings"
    name = models.CharField(max_length=200)
    start_date = models.DateTimeField(null=True)
    end_date = models.DateTimeField(null=True)
    attendees = models.ManyToManyField(Profile)


    custom_message = models.CharField('Message', max_length=200, blank=True)
    street = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    publish = models.BooleanField(default=False)
    country = CountryField(blank=True)
    state = models.CharField('State', max_length=200, blank=True)
    city = models.CharField(max_length=200, blank=True)
    archived = models.BooleanField(default=False)
    zip = models.CharField(max_length=10, blank=True)
    pin = models.CharField('Meeting PIN', max_length=50, blank=True)
    conference_bridge_number = models.CharField('Conference Bridge No.', max_length=200, blank=True)

    @property
    def exectime(self):
        current_date = timezone.now()
        if self.start_date >= current_date:
            return 'upcoming'
        elif self.end_date <= current_date:
            return 'completed'
        elif self.start_date >= current_date and self.end_date >= current_date:
            return 'ongoing'


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
    def get_upcoming_public_events(cls):
        public_events = Event.objects.filter(archived=False, publish=True, end_date__gt=datetime.datetime.now())
        public_events = list(public_events.values())
        calendar_events = []
        for event in public_events:
            event['country'] = str(event['country'].name)
            event['start_date'] = str(event['start_date'])
            event['end_date'] = str(event['end_date'])
            event['start'] = event['start_date']
            event['stop'] = event['end_date']
            if event['attendees']:
                del event['attendees']
            calendar_events.append(event)
        return calendar_events

    @classmethod
    def get_pending_meetings(cls, uid):
        meetings = Event.objects.filter(attendees__id__contains=[uid], publish=True,
                                                end_date__gte=datetime.datetime.now())
        pending_meetings = []
        pending_meetings = list(meetings.values())
        for meeting in pending_meetings:
            meeting['start_date'] = str(meeting['start_date'])
            meeting['end_date'] = str(meeting['end_date'])
            meeting['start'] = meeting['start_date']
            meeting['stop'] = meeting['end_date']
            pending_meetings.append(meeting)
        return  pending_meetings

    @classmethod
    def respond_invitation(cls, request, params):
        return {'error': 'Not implemented'}

    @classmethod
    def get_details(cls, request, params):
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
            if attendee['date_joined']:
                attendee['date_joined'] = str(attendee['date_joined'])
            if attendee['birth_date']:
                attendee['birth_date'] = str(attendee['birth_date'])
            if attendee['board_joining_date']:
                attendee['board_joining_date'] = str(attendee['board_joining_date'])
            if attendee['term_start_date']:
                attendee['term_start_date'] = str(attendee['term_start_date'])
            if attendee['term_end_date']:
                attendee['term_end_date'] = str(attendee['term_end_date'])
            if attendee['last_login']:
                attendee['last_login'] = str(attendee['last_login'])
            attendee['photo'] = attendee['image']

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
    description = models.TextField(default='None')
    photo = models.ImageField(upload_to='home/', default='profile/ETjUSr1v2n.png')

    def __str__(self):
        return self.name

    @classmethod
    def get_data(cls, request, params):
        uid = request.user.id
        home_object = {}
        news = News.objects.get(pk=1).values()
        for obj in news:
            home_object['news'] = {
                'id': obj['id'],
                'description': obj['description'],
                'photo': obj['photo'],
                'name': obj['name'],
            }
            videos = NewsVideo.objects.filter(news_id=obj['id'])
            news_videos = []
            for video in videos:
                video.url = video.url.replace('/watch?v=', '/embed/')
                news_videos.append({'name': video.name, 'url': video.url})
            home_object['video_ids'] = news_videos

            docs = NewsDocument.objects.filter(news_id=obj['id'])
            news_docs = []
            for doc in docs:
                news_docs.append({'name': doc.name, 'id': doc.id})
            home_object['doc_ids'] = news_docs
            break
        home_object['to_do_items'] = {
            'pending_meetings':  Event.get_pending_meetings(uid),
            'pending_surveys': Voting.get_todo_votings(uid),
            'pending_documents': [],
            'pending_votings': []
        }
        home_object['calendar'] = Event.get_upcoming_public_events()
        return {'error': '', 'data': home_object}

class NewsDocument(File):
    news = models.ForeignKey(News, on_delete=models.CASCADE)

class NewsVideo(models.Model):
    name = models.CharField('Video Title', max_length=200)
    url = models.CharField('Video Link', max_length=500)
    news = models.ForeignKey(News, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name

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
