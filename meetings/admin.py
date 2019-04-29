from django import forms
from django.contrib.admin.widgets import FilteredSelectMultiple
from django.utils.html import format_html
from django.contrib import admin
from django.utils.translation import gettext, gettext_lazy as _
from .models import Event,Topic, News
from .user import Profile,User as u,Admin,Director,Staff,Group
from .committee import Committee
from .document import MeetingDocument,AgendaDocument

from django.views.decorators.debug import sensitive_post_parameters
from django.utils.decorators import method_decorator
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
sensitive_post_parameters_m = method_decorator(sensitive_post_parameters())

class TopicInline(admin.TabularInline):
    model = Topic
    # show_change_link = True
    readonly_fields = ('Attachments','Edit')
    extra = 0

    def Edit(self, obj):
        html=""
        if obj.id:
            html = '<a class="related-widget-wrapper-link change-related" href="/admin/meetings/topic/%s/change">Edit</a>' % (obj.id)
        return format_html(html)
    def Attachments(self, obj):
        html = "<div>"
        for d in obj.agendadocument_set.all():
            if d.pdf_doc:
                html += '<a title="%s" class="fa  fa-lg fa-file related-widget-wrapper-link change-related" href="%s"></a>' %(d.name,d.pdf_doc.url)
        html += '</div>'

        return format_html(html)

class MeetingDocInline(admin.TabularInline):
    model = MeetingDocument
    exclude=('html','content','original_pdf','pdf_doc')
    readonly_fields = ('View',)
    # show_change_link = True
    extra = 0

    def View(self,obj):
        html = '<a class="fa fa-lg fa-file related-widget-wrapper-link change-related" href="%s"></a>' %(obj.pdf_doc.url)
        return format_html(html)

    def Edit(self,obj):
        html = '<a href="/admin/meetings/meetingdocument/%s/change">Edit</a>' %(obj.id)
        return format_html(html)
class AgendaDocInline(MeetingDocInline):
    model = AgendaDocument
    # exclude = ('html', 'content', 'original_pdf', 'pdf_doc')
    # readonly_fields = ('View',)
    # show_change_link = True
    # extra = 0
    #
    # def View(self, obj):
    #     html = '<a class="fa fa-lg fa-file related-widget-wrapper-link change-related" href="%s"></a>' % (
    #         obj.pdf_doc.url)
    #     return format_html(html)
    #


class EventAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': [
            'name',
            'start_date',
            'attendees',
            'docs',
            'address',
            'street',
            'description'
            ]})
    ]
    filter_horizontal = ('attendees',)
    # autocomplete_fields = ('attendees',)

    inlines = [TopicInline,MeetingDocInline]
    readonly_fields = ('docs',)

    def docs(self, obj):
        html = "<div>"
        for d in obj.meetingdocument_set.all():
            if d.pdf_doc:
                html += '<a title="%s" class="fa fa-4x fa-lg fa-file related-widget-wrapper-link change-related" href="%s"></a>' %(d.name,d.pdf_doc.url)
        html += '</div>'

        return format_html(html)

class TopicAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['name',]})
    ]

    # readonly_fields = ('docs',)
    # show_change_link = True
    inlines = [AgendaDocInline,]

    def docs(self, obj):
        html = "<div>"
        for d in obj.agendadocument_set.all():
            if d.pdf_doc:
                html += '<a title="%s" class="fa fa-4x fa-lg fa-file related-widget-wrapper-link change-related" href="%s"></a>' %(d.name,d.pdf_doc.url)
        html += '</div>'

        return format_html(html)

class UserAdminForm(forms.ModelForm):
    committees = forms.ModelMultipleChoiceField(queryset=Committee.objects.all(),required=False,widget=FilteredSelectMultiple(verbose_name=_('Committees'),is_stacked=False ))

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

class ProfileInline(admin.StackedInline):
    form = UserAdminForm
    model = Profile
    # verbose_name = "Phone"
    verbose_name_plural = ""
    insert_after = 'email'

    fieldsets = (
        (None, {'fields': ( 'image_tag','image','bio','location','birth_date','nick_name',
        'job_title','department','work_phone','mobile_phone','website','fax',
        'board_joining_date','term_start_date','term_end_date','committees','resume')}),
        (_('Diversity Information'), {'fields': ('ethinicity','gender','veteran','disability')}),
        (_('Administrative Assistant'), {'fields': ('admin_image_html','admin_image','admin_first_name','admin_last_name','admin_nick_name',
        'admin_cell_phone','admin_email','admin_work_phone','admin_fax','mail_to_assistant')}),
    )

    readonly_fields = ('image_tag','admin_image_html')

    def image_tag(self,obj):
        if obj.image:
            return format_html('<img style="width:150px;border-radius:92px" src="/media/%s" />' % (obj.image))
    image_tag.short_description = ''
    def admin_image_html(self,obj):
        return format_html('<img style="width:150px;border-radius:92px" src="/media/%s" />' % (obj.admin_image))
    admin_image_html.short_description = ''




class UserAdmin(BaseUserAdmin):
    change_form_template = 'custom/change_form.html'
    pass
class ProfileAdmin(admin.ModelAdmin):
    form = UserAdminForm
    pass

class AdminAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password','is_active')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    def get_queryset(self, request):
        qs = super(AdminAdmin, self).get_queryset(request)
        qs = qs.filter(groups__name__in=['Admin'])
        return qs

class DirectorAdmin(UserAdmin):
    inlines = [ProfileInline] 
    fieldsets = (
        (None, {'fields': ('username', 'password','is_active')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    def get_queryset(self, request):
        qs = super(DirectorAdmin, self).get_queryset(request)
        qs = qs.filter(groups__name__in=['Director'])
        return qs

class StaffAdmin(UserAdmin):
    inlines = [ProfileInline] 
    fieldsets = (
        (None, {'fields': ('username', 'password','is_active')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    def get_queryset(self, request):
        qs = super(StaffAdmin, self).get_queryset(request)
        qs = qs.filter(groups__name__in=['Staff'])
        return qs
   


class GroupAdmin(admin.ModelAdmin):

    def get_queryset(self, request):
        qs = super(GroupAdmin, self).get_queryset(request)
        qs = qs.filter(groupextend__app_label = "meetings")

        return qs

    def save_model(self, request, obj, form, change):
        a=1
        super(GroupAdmin, self).save_model(request, obj, form, change)

class CommitteeAdmin(admin.ModelAdmin):
    filter_horizontal = ('users',)
    fields=('name','members','users')
    list_display=('name','members')
    
    readonly_fields = ('members',)

    def members(self,obj):
        html="<div>"
        for u in obj.users.all():
            if u.image:
                html+='<img title="%s" style="width:50px;border-radius:92px" src="/media/%s" />' % (u.user.username,u.image)
        html+='</div>'


        return format_html(html)
    # members.short_description = ''
    
       
       


admin.site.register(Event,EventAdmin)
admin.site.register(News)
admin.site.register(Topic,TopicAdmin)
admin.site.register(MeetingDocument)
admin.site.register(AgendaDocument)
admin.site.register(u,UserAdmin)
admin.site.register(Admin,AdminAdmin)
admin.site.register(Director,DirectorAdmin)
admin.site.register(Staff,StaffAdmin)
admin.site.register(Group,GroupAdmin)
admin.site.register(Committee,CommitteeAdmin)
# admin.site.register(Profile,ProfileAdmin)

admin.site.site_header = "MeetVUE"