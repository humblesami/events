from django.db import models
from mainapp import ws_methods
from mainapp.positional import PositionalSortMixIn
from meetings.model_files.event import Event
from mainapp.models import CustomModel


class Topic(PositionalSortMixIn, CustomModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    lead = models.CharField(max_length=200, blank=True)
    duration = models.DurationField(null=True)
    position = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name

    
    def get_attendees(self):
        attendees_list = []
        attendees_list = self.event.get_attendees()
        return attendees_list


    @classmethod
    def get_details(cls, request, params):
        try:
            topic_id = params['id']
            topic_orm = Topic.objects.get(pk=topic_id)
            topic = ws_methods.obj_to_dict(topic_orm, fields=['id', 'name', 'lead', 'duration', 'event__exectime', 'event__name', 'event__id'])
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