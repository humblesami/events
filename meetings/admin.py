from django import forms
from documents.admin import FileForm
from esign.admin import SignatureDocForm
from meetings.model_files.committee import Committee
from django.contrib import admin
from django.utils.html import format_html
from django.utils.decorators import method_decorator
from meetings.model_files.document import MeetingDocument,AgendaDocument
from django.contrib.auth.forms import UserChangeForm
from django.utils.translation import gettext_lazy as _
from meetings.model_files.user import Profile,Admin,Director,Staff,MeetingGroup
from .models import Event, Topic, News, NewsVideo, NewsDocument, SignDocument
from django.contrib.admin.widgets import FilteredSelectMultiple
from django.views.decorators.debug import sensitive_post_parameters
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin, GroupAdmin
sensitive_post_parameters_m = method_decorator(sensitive_post_parameters())
import nested_admin
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError
from django.db import models
from django.forms import Textarea
from documents.file import File


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



class UserCreateForm(UserCreationForm):
    email = forms.EmailField(required=True)
    class Meta:
        model = Profile
        fields = ('username', 'password1', 'password2', 'email')

    class Media:
        js=('admin/js/jquery.min.js', 'admin/js/user_creation_password_validation.js',)
    
    def save(self, commit=True):
        user = super(UserCreateForm, self).save(commit=False)
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
        return user

    def clean_email(self):
        if Profile.objects.filter(email=self.cleaned_data['email']).exists():
            raise forms.ValidationError(u'This email already exists.')
            
        return self.cleaned_data['email']

class UserAdminForm(UserChangeForm):
    committees = forms.ModelMultipleChoiceField(queryset=Committee.objects.all(),required=False,widget=FilteredSelectMultiple(verbose_name=_('Committees'),is_stacked=False ))
    autocomplete_fields = ['committees']
    class Meta:
        model = Profile
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(UserAdminForm, self).__init__(*args, **kwargs)

        if self.instance and self.instance.pk:
            self.fields['committees'].initial = self.instance.committees.all()

    def save(self, commit=True):
        user = super(UserAdminForm, self).save(commit=False)

        if commit:
            user.save()

        if user.pk:
            # user.committees = self.cleaned_data['committees']
            user.committees.set(self.cleaned_data['committees'])
            self.save_m2m()

        return user


class UserAdmin(BaseUserAdmin):
    form = UserAdminForm
    add_form = UserCreateForm

    def admin_image_tag(self, obj):
        return format_html('<img class="admin_photo" style="width:150px;border-radius:92px" src="/media/%s" /><div><span class="btn btn-link administrator_image_upload">Edit</span></div>' % (obj.admin_image))

    admin_image_tag.short_description = 'Photo'
    readonly_fields = ('image_tag', 'admin_image_tag')

    list_display = ('username', 'name', 'email', 'first_name', 'last_name', 'is_active')
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'email', ),
        }),
    )
    fieldsets = (
        (None, {'fields': ('image_tag', 'image', 'is_active')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'mobile_phone', 'email', 'birth_date',
                                         'location',)}),
        (_('Bio'), {'fields': ('bio',)}),
        (_('Work info'), {'fields': ('company', 'job_title', 'department', 'work_phone', 'fax', 'website')}),
        (_('Board info'), {'fields': ('board_joining_date', 'term_start_date', 'term_end_date')}),
        (_('Diversity Information'),
         {
             'fields': (
                 'ethnicity', 'gender', 'veteran', 'disability'
             )
         }
         ),
        (_('Administrative Assistant'),
         {
             'fields': (
                 'admin_image_tag', 'admin_image', 'admin_first_name', 'admin_last_name',
                 'admin_nick_name', 'admin_cell_phone', 'admin_email', 'admin_work_phone',
                 'admin_fax'
             )
         }
         ),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(
                        attrs={'rows': 5,
                                'cols': 40,})},
    }
    change_form_template = "custom/profile_custom_change_form.html"



    def image_tag(self, obj):
        if obj.image:
            return format_html('<img class="user_photo" style="width:150px;border-radius:92px" src="/media/%s" /><div><span class="btn btn-link profile_image_upload">Edit</span></div>' % (obj.image))
    image_tag.short_description = 'Photo'


class AdminAdmin(UserAdmin):

    def get_queryset(self, request):
        qs = super(AdminAdmin, self).get_queryset(request)
        qs = qs.filter(groups__name__in=['Admin'])
        return qs


class DirectorAdmin(UserAdmin):
    add_form = UserCreateForm

    def get_queryset(self, request):
        qs = super(DirectorAdmin, self).get_queryset(request)
        qs = qs.filter(groups__name__in=['Director'])
        return qs


class StaffAdmin(UserAdmin):
    add_form = UserCreateForm

    def get_queryset(self, request):
        qs = super(StaffAdmin, self).get_queryset(request)
        qs = qs.filter(groups__name__in=['Staff'])
        return qs


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
admin.site.register(Admin,AdminAdmin)
admin.site.register(Director,DirectorAdmin)
admin.site.register(Staff,StaffAdmin)
admin.site.register(Profile,UserAdmin)
admin.site.register(MeetingGroup,MeetingGroupAdmin)
admin.site.register(Committee,CommitteeAdmin)
admin.site.register(SignDocument, SignDocumentForm)

admin.site.site_header = "BoardSheet"
