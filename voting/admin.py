from django.contrib import admin
from django.db.models import Count
from .models import *


class ChoiceInline(admin.TabularInline):
    model = VotingChoice
    extra = 3


class VotingTypeAdmin(admin.ModelAdmin):
    list_display = ['name']
    inlines = [ChoiceInline]
    list_filter = ['name']
    search_fields = ['name']
    

class VotingDocInline(admin.TabularInline):
    model = VotingDocument
    exclude=('html','content','original_pdf','pdf_doc', 'file_type')
    # readonly_fields = ('View',)
    # show_change_link = True
    extra = 0


class VotingAdmin(admin.ModelAdmin):
    inlines = [VotingDocInline,]
    autocomplete_fields = ['respondents']
    filter_horizontal = ('respondents',)
    change_form_template = 'custom/change_form.html'

    def get_form(self, request, obj=None, **kwargs):
        self.exclude = ("my_status",)
        form = super(VotingAdmin, self).get_form(request, obj, **kwargs)
        return form

    def change_view(self, request, object_id, form_url='', extra_context=None):
        if self.has_change_permission(request):
            extra_context = extra_context or {}
            voting_id = request.resolver_match.kwargs['object_id']
            if voting_id:
                
                voting_choices = list(VotingChoice.objects.filter(voting_type = Voting.objects.get(pk=voting_id).voting_type.id))
                extra_context['option_data']=[]
                extra_context['option_results'] = []
                for option in voting_choices:
                    extra_context['option_data'].append({'id': option.id, 'name': option.name})
                    extra_context['option_results'].append({'option_name': option.name, 'option_result': 0, 'option_perc': 0})

                voting_results = list(VotingAnswer.objects.values('user_answer__name').annotate(answer_count=Count('user_answer')).filter(voting_id = voting_id))
                if voting_results:
                    total = 0
                    for result in voting_results:
                        total += result['answer_count']
                    for result in voting_results:
                        for extra_result in extra_context['option_results']:
                            if extra_result['option_name'] == result['user_answer__name']:
                                extra_result['option_result'] = result['answer_count']
                                extra_result['option_perc'] = round(((result['answer_count']/ total)*100),2)
                        # extra_context['option_results'].append({'option_name': result['answer__name'], 'option_result': result['answer_count'],
                        # 'option_perc': round(((result['answer_count']/ total)*100),2)})
                
                user_answer = VotingAnswer.objects.filter(voting_id=voting_id, user_id = request.user.id)
                # if not user_answer:

                return super(VotingAdmin, self).change_view(
                    request, object_id, form_url, extra_context=extra_context,)
                # else:
                #     return super(VotingAdmin, self).change_view(
                # request, object_id, form_url, extra_context=extra_context,)     
            else:
                return super(VotingAdmin, self).change_view(
                request, object_id, form_url, extra_context=extra_context,)
        else:
            extra_context = extra_context or {}
            return super(VotingAdmin, self).change_view(
                request, object_id, form_url, extra_context=extra_context,)


class VotingAnswerAdmin(admin.ModelAdmin):
    list_display = ['user_answer', 'voting', 'user', 'signature_data']
    # list_filter = ['answer', 'user']
    list_filter = ['user']
    search_fields = ['user_answer__name', 'voting__name', 'user__username']


admin.site.register(Voting, VotingAdmin)
admin.site.register(VotingType, VotingTypeAdmin)
admin.site.register(VotingAnswer, VotingAnswerAdmin)
