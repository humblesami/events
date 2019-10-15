from django.db import models
from mainapp import ws_methods
from mainapp.positional import PositionalSortMixIn
from meetings.model_files.event import Event
from mainapp.models import CustomModel
from documents.file import File
from django.db import transaction
from django.utils.dateparse import parse_duration


class Topic(PositionalSortMixIn, CustomModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description=models.TextField(blank=True, null=True)
    lead = models.CharField(max_length=200, blank=True)
    duration = models.DurationField(null=True)
    position = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name

    @classmethod
    def save_agenda_topic(cls, request, params):
        meeting_id = params['meeting_id'];
        name = params['name']
        description = params.get('description')
        lead = params.get('lead')
        duration = params.get('duration')
        if duration:
            duration = parse_duration(duration)
        topic = Topic(event_id = meeting_id, name=name, description=description,lead=lead,duration=duration)
        topic.save()
        agenda_docs = params.get('agenda_docs')
        agenda_doc_model = ws_methods.get_model('meetings', 'AgendaDocument')
        for agenda_doc in agenda_docs:
            with transaction.atomic():
                doc = File.objects.get(pk=agenda_doc['id'])
                a_doc = agenda_doc_model(agenda_id=topic.id)
                a_doc = ws_methods.duplicate_file(a_doc, doc, file_type='topic')
                a_doc.save()
        data = {
            'id': topic.id,
            'name': topic.name,
            'description': topic.description,
            'lead': topic.lead,
            'duration': str(topic.duration),
            'docs':list(topic.documents.values())
        }
        return data
    

    @classmethod
    def delete_agenda_topic(cls, request, params):
        topic_id = params['topic_id']
        topic = Topic.objects.get(pk=topic_id)
        topic.delete()
        return 'done'


    @classmethod
    def update_agenda_topic(cls, request, params):
        topic_id = params['topic_id']
        topic = Topic.objects.get(pk=topic_id)
        for key in params:
            if key != "agenda_docs" and key != "meeting_id":
                setattr(topic,key,params[key])
        topic.save()
        agenda_docs = params.get('agenda_docs')
        agenda_doc_model = ws_methods.get_model('meetings', 'AgendaDocument')
        for agenda_doc in agenda_docs:
            with transaction.atomic():
                doc = File.objects.get(pk=agenda_doc['id'])
                a_doc = agenda_doc_model(agenda_id=topic.id)
                a_doc = ws_methods.duplicate_file(a_doc, doc, file_type='topic')
                a_doc.save()
        data = {
            'id': topic.id,
            'name': topic.name,
            'description': topic.description,
            'lead': topic.lead,
            'duration': str(topic.duration),
            'docs':list(topic.documents.values())
        }
        return data

    def get_attendees(self):
        attendees_list = []
        attendees_list = self.event.get_attendees()
        return attendees_list


    @classmethod
    def get_details(cls, request, params):
        try:
            topic_id = params['id']
            topic_orm = Topic.objects.get(pk=topic_id)
            topic = ws_methods.obj_to_dict(topic_orm, fields=['id', 'name', 'lead', 'description', 'duration', 'event__exectime', 'event__name', 'event__id'])
            topic['duration'] = str(topic['duration'])
            topic_docs = list(topic_orm.documents.values())
            meeting_type = ''
            try:
                meeting_type = topic_orm.event.exectime
            except:
                pass
            topic['meeting_type'] = meeting_type
            topic['docs'] = topic_docs
            return topic
        except:
            return 'someting went wrong..!'

    @classmethod
    def get_meeting_topics(cls, reques, params):
        meeting_id = params['meeting_id']
        model = params.get('model')
        object_id = params.get('object_id')
        topics = []
        selected_topic_id = 0
        if model and object_id:
            model_obj = ''
            if model == 'voting':
                model_obj = ws_methods.get_model('voting', 'voting')
                voting_obj = model_obj.objects.filter(pk=object_id, meeting_id=meeting_id).values('topic__id')
                if voting_obj:
                    voting_obj = voting_obj[0]
                    selected_topic_id = voting_obj['topic__id']
            if model == 'survey':
                model_obj = ws_methods.get_model('survey', 'survey')
                suvey_obj = model_obj.objects.filter(pk=object_id, meeting_id=meeting_id).values('topic__id')
                if suvey_obj:
                    suvey_obj = suvey_obj[0]
                    selected_topic_id = suvey_obj['topic__id']

        topic_obj = Topic.objects.filter(event_id=meeting_id).values('id', 'name')
        for topic in topic_obj:
            if selected_topic_id:
                if selected_topic_id == topic['id']:
                    topic = {'id': topic['id'], 'name': topic['name'], 'selected': True}
                else:
                    topic = {'id': topic['id'], 'name': topic['name'], 'selected': False}
            else:
                topic = {'id': topic['id'], 'name': topic['name'], 'selected': False}
            topics.append(topic)
        return {'topics': topics, 'selected': selected_topic_id}