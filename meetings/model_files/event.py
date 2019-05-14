import datetime
from django.db import models
from mainapp import ws_methods
from django.utils import timezone
from meetings.model_files.user import Profile
from django_countries.fields import CountryField
from django.utils.translation import gettext_lazy as _

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
    country = CountryField(blank=True, null=True)
    state = models.CharField(max_length=200, blank=True, null=True)
    city = models.CharField(max_length=200, blank=True, null=True)
    archived = models.BooleanField(default=False)
    zip = models.CharField(max_length=10, blank=True)
    pin = models.CharField('Meeting PIN', max_length=50, blank=True, null=True)
    conference_bridge_number = models.CharField('Conference Bridge No.', max_length=200, null=True, blank=True)

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
    def get_upcoming_public_events(cls, user_id):
        public_events = Event.objects.filter(archived=False, publish=True, end_date__gt=datetime.datetime.now())
        calendar_events = []
        for event in public_events:
            event.start_date = str(event.start_date)
            event.end_date = str(event.end_date)
            event.country = str(event.country.name)
            event.start = event.start_date
            event.stop = event.end_date
            my_event = event.attendees.filter(pk = user_id)
            if my_event:
                event.my_event = 1
            event = event.__dict__
            if event['_state']:
                del event['_state']
            calendar_events.append(event)
        return calendar_events

    @classmethod
    def get_pending_meetings(cls, uid):
        meetings = Event.objects.filter(attendees__id=uid, publish=True,
                                                end_date__gte=datetime.datetime.now())

        meetings = ws_methods.queryset_to_list(meetings, fields=[
            'id',
            'name',
            'start_date',
            'end_date',
            'pin',
            'start_date',
            'start_date',
        ])
        pending_meetings = []
        for meeting in meetings:
            meeting_id = meeting['id']
            invitation_response = Invitation_Response.objects.filter(event_id = meeting_id, attendee_id = uid)
            user_response = 'needsAction'
            if invitation_response:
                user_response =list(invitation_response)[0].state
            meeting['start_date'] = str(meeting['start_date'])
            meeting['end_date'] = str(meeting['end_date'])
            meeting['start'] = meeting['start_date']
            meeting['stop'] = meeting['end_date']
            meeting['attendee_status'] = user_response
            pending_meetings.append(meeting)
        return pending_meetings

    @classmethod
    def respond_invitation(cls, request, params):
        meeting_id = params.get('meeting_id')
        user_response = params.get('response')
        user_id = request.user.id
        try:
            invitation_response = Invitation_Response.objects.get(event_id = meeting_id, attendee_id = user_id)
            invitation_response.state = user_response
            invitation_response.save()
        except:
            invitation_response = Invitation_Response(state= user_response, event_id = meeting_id, attendee_id = user_id)
            invitation_response.save()
        return 'done'

    @classmethod
    def get_details(cls, request, params):
        meeting_id = params['id']
        user_id = request.user.id
        meeting_id = int(meeting_id)
        meeting_object_orm = Event.objects.get(pk=meeting_id)
        invitation_response = list(meeting_object_orm.invitation_response_set.filter(attendee_id=request.user.id))
        if invitation_response:
            attendee_status = invitation_response[0].state
        else:
            attendee_status = 'needsAction'
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
        meeting_object['attendee_status'] = attendee_status
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
        """attendee needs fix"""
        attendees = []
        meeting_attendees = meeting_object_orm.attendees.all()
        for attendee_obj in meeting_attendees:
            attendee = {}
            attendee['name'] = attendee_obj.fullname()
            attendee['photo'] = attendee_obj.image.url
            attendees.append(attendee)
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
                invitatino_response = meeting.invitation_response_set.filter(attendee_id=request.user.id)
                if invitatino_response:
                    attndee_status = invitatino_response[0].state
                else:
                    attndee_status = 'needsAction'
                meeting_val = meeting.__dict__
                meeting_val['location'] = location
                meeting_val['attendee_status'] = attndee_status
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

    @classmethod
    def meeting_summary(cls, request, params):
        meeting_id = params.get('id')
        user_id = request.user.id
        meeting_obj = Event.objects.get(pk= meeting_id)
        if not meeting_obj:
            return 'Invalid meeting id requested'
        invitation_response = meeting_obj.invitation_response_set.filter(attendee_id = user_id)
        if invitation_response:
            attendee_status = invitation_response[0].state
        else:
            attendee_status = 'needsAction'
        location = meeting_obj.location
        my_event =  meeting_obj.attendees.filter(pk=user_id)
        if my_event:
            my_event = 1

        meeting = meeting_obj.__dict__
        meeting['start_date'] = str(meeting['start_date'])
        meeting['end_date'] = str(meeting['end_date'])
        meeting['start'] = meeting['start_date']
        meeting['stop'] = meeting['end_date']
        meeting['location'] = location
        meeting['attendee_status'] = attendee_status
        meeting['my_event'] = my_event
        if meeting['_state']:
            del meeting['_state']
        return {'data': meeting}


STATE_SELECTION = (
    ('needsAction', _("Needs Action")),
    ('tentative', _("Uncertain")),
    ('declined', _("Declined")),
    ('accepted', _("Accepted")),
)


class Invitation_Response(models.Model):
    state = models.CharField(max_length=20,choices=STATE_SELECTION, blank=True, null=True)
    attendee = models.ForeignKey(Profile, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    pass