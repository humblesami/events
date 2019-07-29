from django import forms
from django.contrib import admin
from documents.admin import FileForm
from esign.admin import SignatureDocForm
from django.utils.html import format_html
from django.contrib.auth.admin import GroupAdmin
from django.utils.decorators import method_decorator
from meetings.model_files.committee import Committee
from meetings.model_files.user import Profile,MeetingGroup
from django.views.decorators.debug import sensitive_post_parameters
from meetings.model_files.document import MeetingDocument,AgendaDocument
from .models import Event, Topic, News, NewsVideo, NewsDocument, SignDocument

sensitive_post_parameters_m = method_decorator(sensitive_post_parameters())
import nested_admin


class TopicAdmin(admin.ModelAdmin):
    search_fields = ['name']

class TopicDocInline(nested_admin.NestedTabularInline):
    model = AgendaDocument
    exclude = ('html', 'content', 'original_pdf', 'pdf_doc', 'file_type')
    extra = 1


class TopicInline(nested_admin.NestedTabularInline):
    model = Topic
    inlines = [TopicDocInline]
    extra = 1

class MeetingDocInline(nested_admin.NestedTabularInline):
    model = MeetingDocument
    exclude = ('html', 'content', 'original_pdf', 'pdf_doc', 'file_type')
    extra = 1

class EventAdmin(nested_admin.NestedModelAdmin):
    fieldsets = [
        (None, {
            'fields': [
                'name',
                'start_date',
                'end_date',
                'attendees',
                'description',
                'pin',
                'conference_bridge_number',
                'video_call_link',
                'country',
                'state',
                'zip',
                'city',
                'street',
            ]
        })
    ]
    search_fields = ['name']
    autocomplete_fields = ['attendees']
    # autocomplete_fields = ('attendees',)

    inlines = [TopicInline, MeetingDocInline]
    # extra = 1
    readonly_fields = ('docs',)
    change_form_template = 'custom/event_custom_change_form.html'
    

    def docs(self, obj):
        html = "<div>"
        for d in obj.meetingdocument_set.all():
            if d.pdf_doc:
                html += '<a title="%s" class="fa fa-4x fa-lg fa-file related-widget-wrapper-link change-related" href="%s"></a>' %(d.name,d.pdf_doc.url)
        html += '</div>'

        return format_html(html)


class UserAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    email = forms.EmailField(required=True)
    fields = ('email', 'first_name', 'last_name', 'mobile_phone', 'groups')

    class Media:
        js=('admin/js/set_group_in_user_creation.js',)

    def clean_email(self):
        if Profile.objects.filter(email=self.cleaned_data['email']).exists():
            raise forms.ValidationError(u'This email already exists.')
            
        return self.cleaned_data['email']


class MeetingGroupAdmin(GroupAdmin):

    def get_queryset(self, request):
        # qs = super(GroupAdmin, self).get_queryset(request)
        # qs = qs.filter(meetinggroup__app_label = "meetings")
        qs = MeetingGroup.objects.filter()
        return qs

    def save_model(self, request, obj, form, change):        
        super(MeetingGroupAdmin, self).save_model(request, obj, form, change)


class CommitteeAdmin(admin.ModelAdmin):
    autocomplete_fields = ['users']
    filter_horizontal = ('users',)
    fields= ('name', 'description', 'members', 'users')
    list_display= ('name', 'members')
    search_fields=('name',)
    readonly_fields = ('members',)

    def members(self,obj):
        html = '<div>'
        for u in obj.users.all():
            if u.image:
                html += '<img title="%s" style="width:50px;border-radius:92px" src="/media/%s" />' % (u.username,u.image)
        html += '</div>'
        return format_html(html)
    # members.short_description = ''


class NewsVideoInline(admin.TabularInline):
    model = NewsVideo
    extra = 1


class NewsDocumentInline(admin.TabularInline):
    model = NewsDocument
    exclude = ('html', 'content', 'original_pdf', 'pdf_doc', 'file_type')
    extra = 1


class NewsAdmin(admin.ModelAdmin):
    inlines = [NewsVideoInline, NewsDocumentInline, ]


class MeetingDocumentForm(FileForm):
    pass


class SignDocumentForm(SignatureDocForm):
    def get_form(self, request, obj=None, **kwargs):
        form = super(SignDocumentForm, self).get_form(request, obj, **kwargs)
        return form


admin.site.register(News, NewsAdmin)
admin.site.register(Event,EventAdmin)
admin.site.register(Topic,TopicAdmin)
admin.site.register(MeetingDocument, MeetingDocumentForm)
admin.site.register(AgendaDocument)
admin.site.register(Profile,UserAdmin)
admin.site.register(MeetingGroup,MeetingGroupAdmin)
admin.site.register(Committee,CommitteeAdmin)
admin.site.register(SignDocument, SignDocumentForm)
admin.site.site_header = "BoardSheet"
