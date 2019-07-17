# -*- coding: utf-8 -*-
import datetime
from django.db import models
from ast import literal_eval
from django.db.models import Q
from django.urls import reverse
from django.db.models import Count
from mainapp import ws_methods
from mainapp.settings import server_base_url
from django.db.models.signals import m2m_changed
from django.utils.translation import ugettext_lazy as _


class Survey(models.Model):

    name = models.CharField(_("Name"), max_length=400)
    open_date = models.DateTimeField(auto_now_add=True)
    close_date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(_("Description"))
    is_published = models.BooleanField(_("Publish"), default=False)
    need_logged_user = models.BooleanField(
        _("Only authenticated users can see it and answer it"), default=True)
    display_by_question = models.BooleanField(_("Display by question"), default=False)
    meeting = models.ForeignKey('meetings.Event', on_delete=models.CASCADE, null=True, blank=True)
    topic = models.ForeignKey('meetings.Topic', on_delete=models.CASCADE, null=True, blank=True)
    # voting = models.ForeignKey('voting.Voting', on_delete=models.CASCADE, null=True, blank=True)
    template = models.CharField(_("Template"), max_length=255, null=True, blank=True)
    respondents = models.ManyToManyField('meetings.Profile', blank=True)

    class Meta(object):
        verbose_name = _("survey")
        verbose_name_plural = _("surveys")


    previous_respondents = []


    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        try:
            new_added_respondets = []
            create = False
            if self.pk is not None:
                if self.meeting:
                    new_added_respondets, removed_respondents = self.get_updated_audience()
                elif len(self.respondents.all()) == 0:
                    new_added_respondets, self.previous_respondents = self.get_updated_audience()
            else:
                create = True
            super(Survey, self).save(*args, **kwargs)
            if create:
                new_added_respondets = self.get_audience()
            
            if new_added_respondets:
                self.send_email_on_save(new_added_respondets)
        except:
            raise
    
    def get_audience(self):
        res = []
        if self.meeting:
            for obj in self.meeting.attendees.all():
                res.append(obj.profile.id)
        else:
            for obj in self.respondents.all():
                res.append(obj.profile.id)
        return res


    def get_updated_audience(self):
        new_added_respondets = []
        removed_respondents = []
        survey_obj = Survey.objects.get(pk=self.id)
        if survey_obj.meeting and self.meeting:
            new_added_respondets = list(set(self.meeting.get_audience()) - set(survey_obj.meeting.get_audience()))
            removed_respondents = list(set(survey_obj.meeting.get_audience()) - set(self.meeting.get_audience()))
        elif survey_obj.respondents and self.meeting:
            new_added_respondets = list(set(self.meeting.get_audience()) - set(survey_obj.get_audience()))
            removed_respondents = list(set(survey_obj.get_audience()) - set(self.meeting.get_audience()))
        elif survey_obj.respondents and self.respondents:
            new_added_respondets = list(set(self.get_audience()) - set(survey_obj.get_audience()))
            removed_respondents = list(set(survey_obj.get_audience()) - set(self.get_audience()))
        elif survey_obj.meeting and self.respondents:
            new_added_respondets = list(set(self.get_audience()) - set(survey_obj.meeting.get_audience()))
            removed_respondents = list(set(survey_obj.meeting.get_audience()) - set(self.get_audience()))
        return new_added_respondets, removed_respondents


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
        # res = {
        #     'app': cls._meta.app_label,
        #     'model': cls._meta.model_name,
        #     'user': request.user,
        #     'permissions': ['view'],
        # }
        # has_permission = ws_methods.has_permission(res)
        surveys = []
        uid = request.user.id
        groups = request.user.groups.values('name')
        results_visibility = False
        for group in groups:
            if group['name'] in ['Admin', 'Staff']:
                results_visibility = True
        if results_visibility:
            survey_obj = Survey.objects.all()
        else:
            survey_obj = Survey.objects.filter(
                (Q(meeting__id__isnull=False) & Q(meeting__attendees__id=uid))
                    |
                    (Q(topic__id__isnull=False) & Q(topic__event__attendees__id=uid))
                    |
                    Q(respondents__id=uid))
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
        uid = request.user.id
        survey_id = params.get('survey_id')
        if survey_id:
            groups = request.user.groups.values('name')
            results_visibility = False
            for group in groups:
                if group['name'] in ['Admin', 'Staff']:
                    results_visibility = True
            if results_visibility:
                survey_obj = Survey.objects.filter(pk=survey_id)
            else:
                survey_obj = Survey.objects.filter(
                    (Q(meeting__id__isnull=False) & Q(meeting__attendees__id=uid))
                    |
                    (Q(topic__id__isnull=False) & Q(topic__event__attendees__id=uid))
                    |
                    Q(respondents__id=uid),pk=survey_id)
            # survey = ws_methods.obj_to_dict(survey_obj)
            if not survey_obj:
                return 'Survey not Found...'
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
            is_respondent = request.user.id in survey.get_audience()
            survey = survey.__dict__
            if survey['_state']:
                del survey['_state']
            survey['questions'] = survey_questions
            survey['open_date'] = str(survey['open_date'])
            survey['close_date'] = str(survey['close_date'])
            survey['is_respondent'] = is_respondent
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

    @classmethod
    def get_results(cls, request, params):
        try:
            survey_id = params['survey_id']
            uid = request.user.id
            groups = request.user.groups.values('name')
            results_visibility = False
            for group in groups:
                if group['name'] in ['Admin', 'Staff']:
                    results_visibility = True
            if results_visibility:
                survey = Survey.objects.filter(pk=survey_id)
            else:
                survey = Survey.objects.filter(
                    (Q(meeting__id__isnull=False) & Q(meeting__attendees__id=uid))
                    |
                    (Q(topic__id__isnull=False) & Q(topic__event__attendees__id=uid))
                    |
                    Q(respondents__id=uid), pk=survey_id)
            if survey:
                survey = survey[0]
                survey_results = {
                    'id': survey.id,
                    'name': survey.name,
                    'questions': [],
                    'progess_data': []
                }
                questions = survey.questions.all()
                for question in questions:
                    question_choices = []
                    user_answers = []
                    if question.type in ('radio', 'select-multiple'):
                        question_choices = question.choices.split(',')
                    answers = list(question.answers.values('body', 'response__user__username').annotate(answer_count=Count('body')))
                    for answer in answers:
                        user_answer = answer['body']
                        if question.type == 'select-multiple':
                            user_answer = literal_eval(user_answer)
                        user_answers.append({
                            'answers': user_answer,
                            'user_name': answer['response__user__username']
                        })
                    question_data = []
                    chart_data = []
                    for choice in question_choices:
                        question_data.append({'option_name': choice.strip(), 'option_result': 0, 'option_perc': 0})
                    for index, user_answer in enumerate(answers):
                        if question.type == 'select-multiple':
                            user_answer = literal_eval(user_answer['body'])
                            for user_ans in user_answer:
                                for singledata in question_data:
                                    if user_ans == singledata['option_name'].lower():
                                        singledata['option_result'] += 1
                                        break
                        else:
                            for singledata in question_data:
                                if user_answer['body'] == singledata['option_name']:
                                    singledata['option_result'] = user_answer['answer_count'] + singledata[
                                        'option_result']
                    progress_data = []
                    respondents = 0
                    if survey.meeting:
                        respondents = len(survey.meeting.attendees.all())

                    if len(survey.respondents.all()):
                        respondents = len(survey.respondents.all())

                    if survey.topic:
                        respondents = len(survey.topic.event.attendees.all())

                    # if survey.voting:
                    #     respondents = len(survey.voting.respondents.all())
                    #     if not respondents:
                    #         respondents = len(survey.voting.meeting.attendees.all())

                    if survey.responses:
                        responses = len(survey.responses.all())

                    progress_data.append({
                        'option_name': 'Response Required',
                        'option_result': respondents - responses
                    })
                    progress_data.append({
                        'option_name': 'Responsed',
                        'option_result': responses
                    })
                    survey_results['questions'].append({
                        'id': question.id,
                        'name': question.text,
                        'choices': question_choices,
                        'user_answers': user_answers,
                        'chart_data': question_data
                    })
                    survey_results['progress_data'] = progress_data
                return survey_results
            else:
                return 'There is not survey against this id'
        except:
            return 'Something went wrong while getting survey results.'
        pass
    

    def send_email_on_save(self, audience, action=None):
        token_required = False
        template_data = {            
            'id': self.id, 
            'name': self.name,
            'server_base_url': server_base_url                
        }
        post_info = {}
        post_info['res_app'] = self._meta.app_label
        post_info['res_model'] = self._meta.model_name
        post_info['res_id'] = self.id
        if action:
            template_name = 'survey/removed_from_survey_email.html'
            token_required = 'remove'
        else:
            template_name = 'survey/survey_creation_email.html'
            token_required = True
        email_data = {
            'subject': self.name,
            'audience': audience,
            'post_info': post_info,
            'template_data': template_data,
            'template_name': template_name,
            'token_required': token_required
        }
        ws_methods.send_email_on_creation(email_data)



def respondent_saved(sender, instance, action, pk_set, **kwargs):
    if action == 'post_remove':
        removed_respondents = list(pk_set)
        instance.send_email_on_save(removed_respondents, 'removed')
    if action == "post_add":
        new_added_respondets = list(pk_set)
        if instance.previous_respondents:
            removed_respondents = list(set(instance.previous_respondents) - set(new_added_respondets))
            new_added_respondets = list(set(new_added_respondets) - set(instance.previous_respondents))
            if new_added_respondets:
                instance.send_email_on_save(new_added_respondets)
            if removed_respondents:
                instance.send_email_on_save(removed_respondents, 'removed')
        else:
            instance.send_email_on_save(new_added_respondets)
m2m_changed.connect(respondent_saved, sender=Survey.respondents.through)