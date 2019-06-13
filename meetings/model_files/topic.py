from django.db import models
from meetings.model_files.event import Event
from mainapp import ws_methods


class Topic(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    lead = models.CharField(max_length=200, blank=True)
    duration = models.DurationField(blank=True, null=True)

    def __str__(self):
        return self.name

    @classmethod
    def get_details(cls, request, params):
        try:
            topic_id = params['id']
            topic_orm = Topic.objects.get(pk=topic_id)
            topic = ws_methods.obj_to_dict(topic_orm, fields=['id', 'name', 'lead', 'duration', 'event__exectime', 'event__name', 'event__id'])
            topic['duration'] = str(topic['duration'])
            meeting_docs = list(topic_orm.agendadocument_set.values())
            topic['docs'] = meeting_docs
            return topic
        except:
            return 'someting went wrong..!'
