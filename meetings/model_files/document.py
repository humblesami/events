
from django.db import models
from documents.file import File
from .event import Event
from .topic import Topic


class MeetingDocument(File):
    meeting = models.ForeignKey(Event, on_delete=models.CASCADE)

class AgendaDocument(File):

    agenda = models.ForeignKey(Topic, on_delete=models.CASCADE)