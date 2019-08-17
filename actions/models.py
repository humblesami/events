from django.db import models
from meetings.model_files.event import Event
from django.utils.translation import ugettext_lazy as _

class Actions(models.Model):
    class Meta:
        abstract = True
    open_date = models.DateTimeField(default=None)
    close_date = models.DateTimeField(default=None)
    meeting = models.ForeignKey(Event, null=True, on_delete=models.CASCADE, blank=True)
    name = models.CharField(_("Name"), max_length=400)
    description = models.TextField(_("Description"), default='')
    respondents = models.ManyToManyField('meetings.Profile', blank=True)

    def __str__(self):
        return self.meeting.name + '-Action'


    def get_respondents(self):
        if self.meeting:
            return self.meeting.get_audience()
        else:
            res = []
            for obj in self.respondents.all():
                res.append(obj.id)
            return res