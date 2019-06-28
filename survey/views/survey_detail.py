# -*- coding: utf-8 -*-

from django.conf import settings
from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic import View
from django.db.models import Count
from survey.forms import ResponseForm
from survey.models import Category, Survey, Answer
from ast import literal_eval
from restoken.models import PostUserToken

class SurveyDetail(View):
    def get(self, request, *args, **kwargs):
        address = request.path        
        address = address.split('/')
        token = ''
        if len(address) > 2:
            token = address[len(address)-1]
            if token:
                kwargs['token'] = token
        user = self.get_user(request, kwargs)
        if type(user) is str:
            return user
        survey = get_object_or_404(Survey, is_published=True, id=kwargs["id"])
        if survey.template is not None and len(survey.template) > 4:
            template_name = survey.template
        else:
            if survey.display_by_question:
                template_name = "survey/survey.html"
            else:
                template_name = "survey/public_survey.html"
        # if survey.need_logged_user and not request.user.is_authenticated:
        #     return redirect("%s?next=%s" % (settings.LOGIN_URL, request.path))
        categories = Category.objects.filter(survey=survey).order_by("order")
        form = ResponseForm(
            survey=survey, user=user, step=kwargs.get("step", 0)
        )
        questions = survey.questions.all()
        chart_data = []

        for question in questions:
            if question.type in ('radio', 'select-multiple'):
                choices = question.choices.split(',')
                if question.type == 'radio':
                    user_answers = list(
                        Answer.objects.values('body').filter(question_id=question.id).annotate(answer_count=Count('body'))
                    )
                else:
                    user_answers = []
                    multi_choices = Answer.objects.values('body').filter(question_id=question.id)
                    for multi_choice in multi_choices:
                        multi_choice = literal_eval(multi_choice['body'])
                        for multi in multi_choice:
                            user_answers.append({'body': multi, 'answer_count': 1})

                # literal_eval(user_answers[0]['body'])
                question_data = []
                for choice in choices:
                    question_data.append({'option_name': choice.strip(), 'option_result': 0, 'option_perc': 0})
                    for index, user_answer in enumerate(user_answers):
                        for singledata in question_data:
                            if user_answer['body'] == singledata['option_name']:
                                singledata['option_result'] = user_answer['answer_count'] + singledata['option_result']
                                del user_answers[index]
                chart_data.append({'question': question.text.strip(), 'question_data': question_data})

        context = {"response_form": form, "survey": survey, "categories": categories, 'chart_data': chart_data}

        return render(request, template_name, context)

    def get_user(self, request, kw=None):
        token = ''
        if request.GET:
            token = request.GET['token']
        if not token:
            if request.POST:
                token = request.POST['token']
        if kw and not token:
            token = kw['token']
        user = request.user
        if not user.id:
            if not token:
                return 'You are not authorized'
            else:
                user_token = PostUserToken.validate_token(token, 1)
                user = user_token.user
        if user and user.id:
            return user
        else:
            return 'You are not authorized'

    def post(self, request, *args, **kwargs):
        user = self.get_user(request)
        if type(user) is str:
            return user

        survey = get_object_or_404(Survey, is_published=True, id=kwargs["id"])
        if survey.need_logged_user and not user.is_authenticated:
            return redirect("%s?next=%s" % (settings.LOGIN_URL, request.path))
        categories = Category.objects.filter(survey=survey).order_by("order")
        form = ResponseForm(
            request.POST, survey=survey, user=user, step=kwargs.get("step", 0)
        )
        context = {"response_form": form, "survey": survey, "categories": categories}
        if form.is_valid():
            session_key = "survey_%s" % (kwargs["id"],)
            if session_key not in request.session:
                request.session[session_key] = {}
            for key, value in list(form.cleaned_data.items()):
                request.session[session_key][key] = value
                request.session.modified = True

            next_url = form.next_step_url()
            response = None
            if survey.display_by_question:
                if not form.has_next_step():
                    save_form = ResponseForm(
                        request.session[session_key], survey=survey, user=user
                    )
                    response = save_form.save()
            else:
                response = form.save()

            if next_url is not None:
                return redirect(next_url)
            else:
                del request.session[session_key]
                if response is None:
                    return redirect("/")
                else:
                    next_ = request.session.get("next", None)
                    if next_ is not None:
                        if "next" in request.session:
                            del request.session["next"]
                        return redirect(next_)
                    else:
                        return redirect(
                            "survey-confirmation", uuid=response.interview_uuid
                        )
        if survey.template is not None and len(survey.template) > 4:
            template_name = survey.template
        else:
            if survey.display_by_question:
                template_name = "survey/survey.html"
            else:
                template_name = "survey/one_page_survey.html"
        return render(request, template_name, context)