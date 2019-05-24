# -*- coding: utf-8 -*-
import datetime
from django.db import models
from django.db.models import Q
from django.urls import reverse
from mainapp import ws_methods
from django.utils.translation import ugettext_lazy as _


class Survey(models.Model):

    name = models.CharField(_("Name"), max_length=400)
    open_date = models.DateTimeField(default=datetime.datetime.now())
    close_date = models.DateTimeField(default=datetime.datetime.now())
    description = models.TextField(_("Description"))
    is_published = models.BooleanField(_("Publish"), default=False)
    need_logged_user = models.BooleanField(
        _("Only authenticated users can see it and answer it"), default=True)
    display_by_question = models.BooleanField(_("Display by question"), default=False)
    meeting = models.ForeignKey('meetings.Event', on_delete=models.CASCADE, null=True, blank=True)
    topic = models.ForeignKey('meetings.Topic', on_delete=models.CASCADE, null=True, blank=True)
    voting = models.ForeignKey('voting.Voting', on_delete=models.CASCADE, null=True, blank=True)
    template = models.CharField(_("Template"), max_length=255, null=True, blank=True)
    respondents = models.ManyToManyField('meetings.Profile', blank=True)

    class Meta(object):
        verbose_name = _("survey")
        verbose_name_plural = _("surveys")

    def __str__(self):
        return self.name

    def latest_answer_date(self):
        """ Return the latest answer date.

        Return None is there is no response. """
        min_ = None
        for response in self.responses.all():
            if min_ is None or min_ < response.updated:
                min_ = response.updated
        return min_

    def get_absolute_url(self):
        return reverse("survey-detail", kwargs={"id": self.pk})

    @classmethod
    def get_records(cls, request, params):
        surveys = []
        survey_obj = Survey.objects.filter()
        for survey in survey_obj:
            surveys.append({
                'id': survey.id,
                'name': survey.name,
                'description': survey.description
            })
        surveys_json = {'records': surveys, 'total': 0, 'count': 0}
        return surveys_json

    @classmethod
    def get_details(cls, request, params):
        survey_id = params.get('survey_id')
        if survey_id:
            survey_obj = Survey.objects.filter(pk=survey_id)
            # survey = ws_methods.obj_to_dict(survey_obj)
            survey = list(survey_obj)[0]
            questions = survey.questions.all()
            survey_questions = []
            for question in questions:
                question_dict = question.__dict__
                if question_dict['_state']:
                    del question_dict['_state']
                if question_dict['choices']:
                    question_dict['choices'] = question_dict['choices'].split(',')
                survey_questions.append(question_dict)
            survey = survey.__dict__
            if survey['_state']:
                del survey['_state']
            survey['questions'] = survey_questions
            survey['open_date'] = str(survey['open_date'])
            survey['close_date'] = str(survey['close_date'])
            return survey
        else:
            return 'Invalid Survey ID'

    @classmethod
    def get_pending_surveys(cls, uid):
        surveys = Survey.objects.filter(
            (Q(meeting__id__isnull=False) & Q(meeting__attendees__id=uid))
            |
            Q(respondents__id=uid),
            Q(close_date__gte=datetime.datetime.now())
        )
        pending_survey = []
        for survey in surveys:
            user_response = survey.questions.filter(answers__isnull=False, answers__response__user__id=uid)
            if len(user_response) > 0:
                my_status = 'done'
            # my_status = user_answer.user_answer.name
            else:
                my_status = 'pending'
                pending_survey.append({
                    'id': survey.id,
                    'title': survey.name,
                    'my_status': my_status
                })
        return pending_survey