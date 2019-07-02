import datetime
from django.db import models
from mainapp import ws_methods
from django.utils import timezone
from mainapp.settings import server_base_url
from meetings.model_files.user import Profile
from django_countries.fields import CountryField
from django.db.models.signals import m2m_changed
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
    video_call_link = models.CharField(max_length=200, null=True, blank=True)


    def __str__(self):
        return self.name


    def notification_text(self):
        return ' meeting ' + self.name[0: 20] +'...'

    def get_audience(self):
        res = []
        for obj in self.attendees.all():
            res.append(obj.id)
        return res
    
    
    def get_attendees(self):
        attendees_list = []
        attendees = self.attendees.all()
        for attendee in attendees:
            group_name = ''
            attendee_groups = attendee.groups.all()
            if attendee_groups:
                group_name = attendee_groups[0].name.lower()
                attendees_list.append({'id': attendee.id, 'name': attendee.name, 'group': group_name})
        return attendees_list

    
    @property
    def exectime(self):
        current_date = timezone.now()
        if not self.publish:
            return 'draft'
        if self.start_date >= current_date:
            return 'upcoming'
        elif self.end_date <= current_date:
            return 'completed'
        elif self.start_date <= current_date and self.end_date >= current_date:
            return 'ongoing'

    def _compute_duration(self):
        val = self.end_date - self.start_date
        seconds = val.total_seconds()
        hours = seconds / 3600
        hours = int(hours)

        rem_seconds = seconds % 3600
        minutes = rem_seconds / 60
        minutes = int(minutes)

        if hours < 10:
            hours = '0' + str(hours)
        else:
            hours = str(hours)
        if minutes < 10:
            minutes = '0'+str(minutes)
        else:
            minutes = str(minutes)
        val = hours + ':' + minutes
        return val
    duration = property(_compute_duration)

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

        pending_meetings = cls.get_meeting_summaries(meetings, uid)
        return pending_meetings

    @classmethod
    def respond_invitation(cls, request, params):
        meeting_id = params['meeting_id']
        user_response = params['response']
        user_id = 0
        if request.user.id:
            user_id = request.user.id
        else:
            user_id = params['user_id']
        invitation_response = Invitation_Response.objects.filter(event_id = meeting_id, attendee_id = user_id)
        if invitation_response:
            invitation_response = invitation_response[0]
            invitation_response.state = user_response
            invitation_response.save()
        else:
            invitation_response = Invitation_Response(state= user_response, event_id = meeting_id, attendee_id = user_id)
            invitation_response.save()
        return 'done'

    @classmethod
    def get_details(cls, request, params):
        meeting_id = params['id']
        user_id = request.user.id
        meeting_id = int(meeting_id)
        meeting_object_orm = Event.objects.get(pk=meeting_id)
        meeting_object = Event.objects.filter(pk=meeting_id).values()
        meeting_object = list(meeting_object)
        meeting_object = meeting_object[0]
        if not meeting_object:
            return ('', {'message': 'Meeting with id' + str(meeting_id) + ' exists no more'})

        location = meeting_object_orm.location
        duration = meeting_object_orm.duration
        meeting_object['location'] = location
        meeting_object['duration'] = duration

        meeting_object['street'] = meeting_object_orm.street
        meeting_object['city'] = meeting_object_orm.city
        meeting_object['state'] = meeting_object_orm.state
        meeting_object['zip'] = meeting_object_orm.zip
        meeting_object['country'] = meeting_object_orm.country.name

        meeting_object['start_date'] = str(meeting_object['start_date'])
        meeting_object['end_date'] = str(meeting_object['end_date'])
        meeting_object['start'] = meeting_object['start_date']
        meeting_object['stop'] = meeting_object['end_date']
        meeting_object['exectime'] = meeting_object_orm.exectime

        attendance_status = cls.get_attendance_status(meeting_id, user_id)
        meeting_object['attendee_status'] = attendance_status

        topic_orm = list(meeting_object_orm.topic_set.all())
        topics = []
        topic = {}
        for t in topic_orm:
            topic = ws_methods.obj_to_dict(t)
            topic['duration'] = str(topic['duration'])
            topic['docs'] = list(t.agendadocument_set.values())
            topics.append(topic)
        meeting_docs = list(meeting_object_orm.meetingdocument_set.values())
        votings = list(meeting_object_orm.voting_set.values())
        for voting in votings:
            voting['open_date'] = str(voting['open_date'])
            voting['close_date'] = str(voting['close_date'])
        """attendee needs fix"""
        attendees = []
        meeting_attendees = ws_methods.get_user_info( meeting_object_orm.attendees.all())
        for attendee_obj in meeting_attendees:
            attendee_obj['attendance_status'] = cls.get_attendance_status(meeting_id, attendee_obj['id'])
            attendees.append(attendee_obj)
        meeting_object['topics'] = topics
        meeting_object['meeting_docs'] = meeting_docs
        sign_docs =  meeting_object_orm.signdocument_set.all()
        sign_docs = ws_methods.queryset_to_list(sign_docs, fields=['id','pdf_doc','name'])
        meeting_object['sign_docs'] = sign_docs
        surveys = meeting_object_orm.survey_set.all()
        surveys = ws_methods.queryset_to_list(surveys, fields=['id', 'name'],
        related = {
            'responses': {'fields': ['id', 'user']}
        }
       )
        meeting_object['surveys'] = surveys
        for survey in surveys:
            if not survey['responses']:
                survey['my_status'] = 'pending'
            for response in survey['responses']:
                if response['user'] == user_id:
                    survey['my_status'] = 'done'
                else:
                    survey['my_status'] = 'pending'
            del survey['responses']
        meeting_object['votings'] = votings
        meeting_object['attendees'] = attendees
        data = {"meeting": meeting_object, "next": 0, "prev": 0}

        return {'data': data}

    @classmethod
    def get_meetings(cls, meeting_type):
        if meeting_type == 'archived':
            meetings = Event.objects.filter(archived=True, publish=True)
        elif meeting_type == 'draft':
            meetings = Event.objects.filter(publish=False)
        else:
            meetings = Event.objects.filter(publish=True)
        meeting_list = []
        for meeting in meetings:
            if meeting_type == 'upcoming':
                if meeting.exectime in (meeting_type, 'ongoing'):
                    meeting_list.append(meeting)
            elif meeting_type == 'draft':
                meeting_list.append(meeting)
            elif meeting.exectime == meeting_type:
                meeting_list.append(meeting)
        return meeting_list

    @classmethod
    def get_attendance_status(cls, meeting_id, uid):
        invitation_response = Invitation_Response.objects.filter(event_id=meeting_id, attendee_id=uid)
        attendance_status = 'needsAction'
        if invitation_response:
            attendance_status = list(invitation_response)[0].state
        return attendance_status

    @classmethod
    def meeting_summary(cls, request, params):
        
        meeting = {}
        uid = request.user.id
        meeting_id = int(params['id'])
        meeting_obj = Event.objects.get(pk=meeting_id)
        meeting['id'] = meeting_obj.id
        meeting['name'] = meeting_obj.name
        meeting['start_date'] = str(meeting_obj.start_date)
        meeting['end_date'] = str(meeting_obj.end_date)
        meeting['start'] = str(meeting_obj.start_date)
        meeting['stop'] = str(meeting_obj.end_date)
        meeting['location'] = meeting_obj.location

        attendance_status = cls.get_attendance_status(meeting_id, uid)
        meeting['attendee_status'] = attendance_status
        my_event = meeting_obj.attendees.filter(pk=request.user.id)
        if my_event:
            meeting['my_event'] = 1

        return meeting
    
    @classmethod
    def get_meeting_summaries(cls, meetings, uid):
        res_meetings = []
        for meeting_obj in meetings:
            meeting = {}
            meeting_id = meeting_obj.id
            meeting['id'] = meeting_obj.id
            meeting['name'] = meeting_obj.name
            meeting['start_date'] = str(meeting_obj.start_date)
            meeting['end_date'] = str(meeting_obj.end_date)
            meeting['start'] = str(meeting_obj.start_date)
            meeting['stop'] = str(meeting_obj.end_date)
            meeting['location'] = meeting_obj.location

            attendance_status = cls.get_attendance_status(meeting_id, uid)
            meeting['attendee_status'] = attendance_status

            res_meetings.append(meeting)
        return res_meetings

    @classmethod
    def get_records(cls, request, params):
        meeting_type = params.get('meeting_type')
        meeting_list = cls.get_meetings(meeting_type)
        meetings = cls.get_meeting_summaries(meeting_list, request.user.id)
        meetings = {'records': meetings, 'total': 0, 'count': 0}
        data = {'error': '', 'data': meetings}
        return data
    

    def response_invitation_email(self, audience, action=None):
        state_selection = []
        for state in STATE_SELECTION:
            if state[0] != 'needsAction':
                if state[0] != 'tentative':
                    state_selection.append({'name': state[1], 'value': state[0]})
                else:
                    state_selection.append({'name': 'Tentative', 'value': state[0]})
        template_data = {            
            'id': self.id, 
            'name': self.name,
            'response_invitations': state_selection,
            'server_base_url': server_base_url                
        }
        post_info = {}
        post_info['res_app'] = self._meta.app_label
        post_info['res_model'] = self._meta.model_name
        post_info['res_id'] = self.id
        if action:
            template_name = 'event/removed_from_meeting_email.html'
            token_required = 'remove'
        else:
            template_name = 'event/response_invitation_email.html'
            token_required = True
        email_data = {
            'subject': self.name,
            'audience': audience,
            'post_info': post_info,
            'template_data': template_data,
            'template_name': template_name,
            'token_required': token_required
        }
        ws_methods.send_email_on_creation(email_data)


def attendees_saved(sender, instance, action, pk_set, **kwargs):
    if action == 'post_remove':
        removed_respondents = list(pk_set)
        instance.response_invitation_email(removed_respondents, 'removed')
    if action == "post_add":
        new_added_respondets = list(pk_set)
        if new_added_respondets:
            instance.response_invitation_email(new_added_respondets)
m2m_changed.connect(attendees_saved, sender=Event.attendees.through)


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
