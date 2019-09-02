import datetime

import pytz
from django.db import models
from meetings.model_files.event import Event
from django.utils.translation import ugettext_lazy as _
from mainapp.models import CustomModel

class Actions(CustomModel):
    class Meta:
        abstract = True
    open_date = models.DateTimeField(default=None)
    close_date = models.DateTimeField(default=None)
    meeting = models.ForeignKey(Event, null=True, on_delete=models.CASCADE, blank=True)
    name = models.CharField(_("Name"), max_length=400)
    description = models.TextField(_("Description"), default='')
    respondents = models.ManyToManyField('meetings.Profile', blank=True)

    def save(self, *args, **kwargs):
        super(Actions, self).save(*args, **kwargs)

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
    
    def get_audience(self):
        audience = []
        for obj in self.respondents.all().values('id'):
            audience.append(obj['id'])
        return list(dict.fromkeys(audience))

    @classmethod
    def gt_my_open_actions(self, query_result, user, home_page=None):
        exclude_ids = []
        if not home_page:
            groups = user.groups.all().values('name')
            for group in groups:
                if group['name'] in ['Admin', 'Staff']:
                    return query_result
        uid = user.id
        for action in query_result:
            audience = action.get_audience()
            is_respondent = uid in audience
            if not is_respondent:
                exclude_ids.append(action.id)
                continue
            is_open = True
            utc = pytz.UTC
            now = datetime.datetime.now().replace(tzinfo=utc)
            action.close_date = action.close_date.replace(tzinfo=utc)
            if action.open_date > now:
                is_open = False
            elif action.close_date <= now:
                is_open = False
            if not is_open:
                exclude_ids.append(action.id)
        query_result = query_result.exclude(id__in=exclude_ids)
        return query_result