
from django.db import models
from documents.file import File
# from meetings.models import Event

class MeetingDocument(File):
    meeting = models.ForeignKey('meetings.Event', on_delete=models.CASCADE)

class AgendaDocument(File):

    agenda = models.ForeignKey('Topic', on_delete=models.CASCADE)