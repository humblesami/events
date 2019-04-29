from django.db import models
from django.contrib.auth.models import User
from videos.models import Video
from .user import *
from .document import *
from django_countries.fields import CountryField


# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=200)
    start_date = models.DateTimeField('start date')
    attendees = models.ManyToManyField(User)
    
    address =models.CharField('Address', max_length=200, default=None, null=True)
    customMessage = models.CharField('Message', max_length=200, default=None, null=True)
    street = models.CharField('Street', max_length=50, default=None, null=True)
    description = models.TextField(default=None, null=True)
    publish = models.BooleanField('Publish', default=None, null=True)
    # country = CountryField()
    city = models.CharField('City', max_length=200, null=True)
    archived = models.BooleanField('Archived', default=None, null=True)
    zip = models.CharField('Zip', max_length=500, default=None, null=True)
    pin = models.CharField('Meeting PIN', max_length=50, default=None, null=True)
    conference_bridge_number = models.CharField('Conference Bridge No.', max_length=200, default=None, null=True)
    end_call = models.BooleanField('End-Call On Moderator Left', default=None, null=True)
    password = models.CharField('Password', max_length=50, default=None, null=True)
    exectime = models.DurationField(default=None, null=True)



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
