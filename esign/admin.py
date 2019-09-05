from django import forms
from django.contrib import admin
from .models import Signature, SignatureDoc
from mainapp.admin import BaseAdmin
from meetings.model_files.event import Event


class SignatureAdmin(BaseAdmin):
    list_display = ['user', 'document', 'signed_at']


class SignDocForm(forms.ModelForm):
    class Meta:
            model = SignatureDoc
            fields = ()
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['meeting'].queryset = Event.objects.filter(archived=False)


class SignDocAdmin(BaseAdmin):
    form = SignDocForm
    list_display = ('name', 'meeting', 'send_to_all','created_by')
    fields = [
        'attachment',
        'name',
        'cloud_url',
        'access_token',
        'binary_data',
        'file_name',
        'meeting',
        'respondents',
        'send_to_all',
        'open_date',
        'close_date',
    ]
    autocomplete_fields = ['respondents']
    change_form_template = 'admin/actions_change_form.html'
    class Media:
        js = ('admin/js/esign_doc.js',)
        css = {
            'all': ('admin/css/esign-doc.css',)
        }

    # def save_model(self, request, obj, form, change):
    #     super(SignDocAdmin, self).save_model(request, obj, form, change)


# class SignatureDocForm(FileForm):
#     change_form_template = 'admin/actions_change_form.html'
#     # def get_form(self, request, obj=None, **kwargs):
#     #     kwargs['fields'] = ['name', 'attachment']
#     #     # self.exclude = ('original_pdf','workflow_enabled')
#     #     form = super(SignatureDocForm, self).get_form(request, obj, **kwargs)
#     #     return form

admin.site.register(SignatureDoc, SignDocAdmin)
admin.site.register(Signature, SignatureAdmin)
