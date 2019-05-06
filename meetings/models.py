from django.db import models
from videos.models import Video
from .user import *
from .document import *
from django_countries.fields import CountryField


# Create your models here.
class Event(models.Model):
    class Meta:
        verbose_name = "Meeting"
        verbose_name_plural = "Meetings"
    name = models.CharField(max_length=200)
    start_date = models.DateTimeField('start date')
    end_date = models.DateTimeField('end date')
    attendees = models.ManyToManyField(Profile)
    
    
    custom_message = models.CharField('Message', max_length=200, blank=True)
    street = models.CharField('Street', max_length=50, blank=True)
    description = models.TextField(blank=True)
    publish = models.BooleanField('Publish', default=False)
    country = CountryField( blank=True)
    state = models.CharField('State', max_length=200, blank=True)
    city = models.CharField('City', max_length=200, blank=True)
    archived = models.BooleanField('Archived', default=False)
    zip = models.CharField('Zip', max_length=500, blank=True)
    pin = models.CharField('Meeting PIN', max_length=50, blank=True)
    conference_bridge_number = models.CharField('Conference Bridge No.', max_length=200, blank=True)
    exectime = models.CharField(max_length=50, blank=True)



    # pin = fields.Char(string="Meeting PIN")
    # conference_bridge_number = fields.Char(string="Conference Bridge No.")
    # video_call_link = fields.Char()
    # end_call = fields.Boolean(string="End-Call On Moderator Left")
    # password = fields.Char()
    # moderator = fields.Integer()

    # exectime = fields.Char(compute="_compute_archive")
    # im_attendee = fields.Char(compute='look_if_invited')
    # is_active_yet = fields.Char(compute="_compute_meeting_status")
    # conference_status = fields.Char(compute='is_video_active')
    # voting_ids = fields.One2many('meeting_point.voting','meeting_id',string="Approval/Voting" , compute='has_votings_meeting')
    # actions = fields.Html(compute='has_votings', string="Actions(s)")
    # country = fields.Many2one('res.country', string="Country", default=_defualt_country)
    # country_state = fields.Many2one('res.country.state',string="State")#, domain=lambda self:self.filter_states())
    # company = fields.Char(string="Company")
    # location = fields.Char(string="Location",compute = "_compute_address")
    # city = fields.Char(string="City")
    # document_ids = fields.One2many('meeting_point.document','meeting_id',string="Document(s) To Sign")
    # doc_ids = fields.One2many('meeting_point.doc', 'meeting_id', string="Meeting Document(s)")
    # zip = fields.Char(string="Zip")
    # #seen_by_me = fields.Integer(compute='_compute_seen_by_me', default=0)
    # survey_ids = fields.One2many('survey.survey','meeting_id',string="Survey")
    # partner_ids = fields.Many2many('res.partner', 'calendar_event_res_partner_rel', string='Attendees',
    #                                states={'done': [('readonly', True)]}, default=_default_partners,
    #                                domain=lambda self:self.filter_attendees(), ondelete="cascade")
    # archived = fields.Boolean(string="Archived")
    # #message_ids = fields.One2many("mail.message",'res_id',write=['meeting_point.director'])

    
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

            meeting_object = Event.objects.filter(pk=meeting_id).values()
            meeting_object = list(meeting_object)
            meeting_object = meeting_object[0]
            if not meeting_object:
                return ('', {'message': 'Meeting with id' + str(meeting_id) + ' exists no more'})

            meeting_object['start_date'] = str(meeting_object['start_date'])
            meeting_object['end_date'] = str(meeting_object['end_date'])
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
                attendee['last_login'] = str(attendee['last_login'])
                attendee['date_joined'] = str(attendee['date_joined'])

            meeting_object['topics'] = topics
            meeting_object['meeting_docs'] = meeting_docs
            meeting_object['sign_docs'] = []
            meeting_object['surveys'] = []
            meeting_object['votings']= votings
            meeting_object['attendees'] = attendees
            data = {"meeting": meeting_object, "next": 0, "prev": 0}

        return {'data': data}

#     meeting = req_env['calendar.event'].search(filters)
#     if not meeting:
#         return ws_methods.http_response('', {'message': 'Meeting with id' + str(id) + ' exists no more'})
#     if not meeting.publish:
#         return ws_methods.http_response('', {'message': 'Meeting has been unpublished'})
#     props = ['id', 'start_datetime', 'stop_datetime', 'conference_status', 'duration', 'zip', 'video_call_link',
#              'conference_bridge_number', 'pin', 'exectime', 'location',
#              'description', 'name', 'attendee_status']
#     meeting_object = ws_methods.object_to_json_object(meeting, props)
#     try:
#         duration = float(meeting_object['duration'])
#         meeting_object['duration'] = dn_dt.hours_to_hoursNminutes(duration)
#     except:
#         a = 1
#     topics_arr = []
#     for topic in meeting.topic_ids:
#         obj = ws_methods.object_to_json_object(topic, ['lead', 'name', 'duration', 'content', 'id'])
#         try:
#             if obj['duration']:
#                 duration = float(obj['duration'])
#                 obj['duration'] = dn_dt.hours_to_hoursNminutes(duration)
#         except:
#             topic_dur = str(obj['duration'])
#             ws_methods.handle_silently(topic_dur + "could not be converted")
#             a = 1
#         obj["docs"] = ws_methods.objects_list_to_json_list(topic.document_ids, ['id', 'name'])
#         topics_arr.append(obj)
#     meeting_object['topics'] = topics_arr
#     meeting_object['meeting_docs'] = ws_methods.objects_list_to_json_list(meeting.doc_ids, ['id', 'name'])
#     docs_to_sign = []
#     props = ['id', 'name', 'mp_signature_status']
#     for sign_doc in meeting.document_ids:
#         sign = sign_doc.signature_ids.filtered(lambda r: r.user_id.id == uid)
#         if sign:
#             doc_to_add = ws_methods.object_to_json_object(sign_doc, props)
#             docs_to_sign.append(doc_to_add)
#
#     meeting_object['sign_docs'] = docs_to_sign
#     surveys = meeting.survey_ids
#     meeting_object['surveys'] = ws_methods.objects_list_to_json_list(surveys, ['id', 'title', 'my_status'])
#
#     votings = meeting.voting_ids
#     meeting_object['votings'] = ws_methods.objects_list_to_json_list(votings, ['id', 'name', 'my_status'])
#
#     attendees = meeting.attendee_ids
#     attendees = attendees.filtered(lambda p: p.partner_id.id != 3)
#     props = ['attendance', 'state', 'response_by']
#     meeting_object['attendees'] = ws_methods.objects_list_to_json_list(attendees, props)
#     cnt = 0
#     for attendee_object in attendees:
#         attendee = meeting_object['attendees'][cnt]
#         attendee_user = attendee_object.partner_id.user_id
#         attendee['photo'] = ws_methods.mfile_url('res.users', 'image_small', attendee_user.id, 'image')
#         attendee['uid'] = attendee_user.id
#         ourd = dict((x, y) for x, y in attendee_object.STATE_SELECTION)
#         attendee['state'] = ourd[attendee_object['state']]
#         attendee['name'] = attendee_user.name
#         cnt += 1
#     id = int(values['id'])
#     filters = []
#     if 'meeting_type' in values:
#         if values['meeting_type'] == 'completed':
#             filters.append(('publish', '=', True))
#             filters.append(('stop', '<', date_value))
#         elif values['meeting_type'] == 'archived':
#             filters.append(('archived', '=', True))
#         elif values['meeting_type'] == 'upcoming':
#             filters.append(('publish', '=', True))
#             filters.append(('stop', '>=', date_value))
#     filters.append(('id', '<', id))
#     prev = req_env['calendar.event'].search(filters, limit=1, order='id desc')
#     if len(prev) > 0:
#         prev = prev[0]
#     if len(filters) > 0:
#         filters[len(filters) - 1] = ('id', '>', id)
#     else:
#         filters = [('id', '>', id)]
#     next = req_env['calendar.event'].search(filters, limit=1, order='id')
#     if len(next) > 0:
#         next = next[0]
#     meeting_object['model'] = "calendar.event"
#     meeting_object['start'] = meeting_object['start_datetime']
#     meeting_object['stop'] = meeting_object['stop_datetime']
#     data = {"meeting": meeting_object, "next": next.id, "prev": prev.id}
#     filters = [('res_model', '=', 'calendar.event'), ('res_id', '=', meeting_object['id'])]
#     rec = req_env['notification'].search(filters)
#     filters = [('notification_id', '=', rec.id), ('user_id', '=', uid)]
#     rec = req_env['notification.counter'].search(filters)
#     if rec:
#         rec.counter = 0
#     return ws_methods.http_response('', data)
#
# except:
# return ws_methods.handle()

    @classmethod
    def get_records(cls, request, params):
        meetings = Event.objects.values()
        meetings = list(meetings)
        if meetings:
            for meeting in meetings:
                if meeting['start_date']:
                    meeting['start_date'] = str(meeting['start_date'])
                    meeting['end_date'] = str(meeting['end_date'])
            meetings = {'records': meetings, 'total': 0, 'count': 0}
            data = {'error': '', 'data': meetings}
        else:
            data = {'error': 'Something Wrong in Meeting'}
        return data

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
    lead = models.CharField(max_length=200,blank=True)
    duration = models.DurationField(blank=True,null=True)
    def __str__(self):
        return self.name

    @classmethod
    def get_details(cls, request, params):
        return {'error': 'Not implemented'}
