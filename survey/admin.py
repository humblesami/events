# -*- coding: utf-8 -*-
from django.contrib import admin
from django import forms
from survey.models import Answer, Category, Question, Response, Survey
from meetings.model_files.event import Event
from .actions import make_published
from django.db import models
from django.forms import Textarea
import nested_admin


class QuestionInline(nested_admin.NestedStackedInline):
    model = Question
    exclude = ['order', 'category', 'required', ]
    ordering = ["category", ]
    extra = 1
    formfield_overrides = {
        models.TextField: {'widget': Textarea(
                        attrs={'rows': 3,
                                'cols': 40,})},
    }


class CategoryInline(nested_admin.NestedStackedInline):
    model = Category
    exclude = ['order', ]
    extra = 1

class SurveyForm(forms.ModelForm):
        class Meta:
            model = Survey
            fields = ()
        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self.fields['meeting'].queryset = Event.objects.filter(publish=True, archived=False)

class SurveyAdmin(admin.ModelAdmin):
    form = SurveyForm
    list_display = ("name", "is_published", "need_logged_user")
    list_filter = ("is_published", "need_logged_user")
    autocomplete_fields = ['respondents']
    filter_horizontal = ('respondents',)
    inlines = [QuestionInline]
    actions = [make_published]
    fieldsets = [
        (None, {
            'fields': [
                'name',
                'description',
                'is_published',
                'meeting',
                'topic',
                'respondents',
                'open_date',
                'close_date'
                ]})]
    formfield_overrides = {
        models.TextField: {'widget': Textarea(
                        attrs={'rows': 4,
                                'cols': 40,})},
    }
    change_form_template = "survey_custom_change_form.html"

    def get_form(self, request, obj=None, **kwargs):
        self.exclude = ("template","need_logged_user","display_by_question", )
        form = super(SurveyAdmin, self).get_form(request, obj, **kwargs)
        return form


class AnswerBaseInline(admin.StackedInline):
    fields = ("question", "body")
    readonly_fields = ("question",)
    extra = 1
    model = Answer


class ResponseAdmin(admin.ModelAdmin):
    list_display = ("interview_uuid", "survey", "created", "user")
    list_filter = ("survey", "created")
    date_hierarchy = "created"
    inlines = [AnswerBaseInline]
    # specifies the order as well as which fields to act on
    readonly_fields = ("survey", "created", "updated", "interview_uuid", "user")


# admin.site.register(Question, QuestionInline)
# admin.site.register(Category, CategoryInline)
admin.site.register(Survey, SurveyAdmin)
admin.site.register(Response, ResponseAdmin)
