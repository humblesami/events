from django.db import models
from meetings.model_files.event import Event
from django.utils.translation import ugettext_lazy as _

class Actions(models.Model):
    open_date = models.DateTimeField()
    close_date = models.DateTimeField()
    meeting = models.ForeignKey(Event, null=True, on_delete=models.CASCADE, blank=True, related_name='actions')
    name = models.CharField(_("Name"), max_length=400)
    description = models.TextField(_("Description"))
    respondents = models.ManyToManyField('meetings.Profile', blank=True)

    def __str__(self):
        return self.meeting.name + '-Action'