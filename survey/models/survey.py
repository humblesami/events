# -*- coding: utf-8 -*-

from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _


class Survey(models.Model):

    name = models.CharField(_("Name"), max_length=400)
    description = models.TextField(_("Description"))
    is_published = models.BooleanField(_("Users can see it and answer it"), default=False)
    need_logged_user = models.BooleanField(
        _("Only authenticated users can see it and answer it"), default=True)
    display_by_question = models.BooleanField(_("Display by question"))
    template = models.CharField(_("Template"), max_length=255, null=True, blank=True)

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
            return survey
        else:
            return 'Invalid Survey ID'