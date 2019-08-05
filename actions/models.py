from django.db import models
from meetings.model_files.event import Event

class Actions(models.Model):
    open_date = models.DateTimeField()
    close_date = models.DateTimeField()
    meeting = models.ForeignKey(Event, null=True, on_delete=models.CASCADE, blank=True, related_name='actions')

    def __str__(self):
        return self.meeting.name + '-Action'