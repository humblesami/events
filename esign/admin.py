from django import forms
from django.contrib import admin
from documents.admin import FileAdmin
from esign.model_files.document import SignatureDoc, Signature
from mainapp.admin import BaseAdmin
from meetings.model_files.event import Event


class SignatureAdmin(BaseAdmin):
    list_display = ['user', 'document', 'signed_at']


class SignDocumentForm(forms.ModelForm):
    class Meta:
            model = SignatureDoc
            fields = ()
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['meeting'].queryset = Event.objects.filter(archived=False)


class SignDocAdmin(admin.ModelAdmin):
    form = SignDocumentForm
    list_display = ('name', 'meeting', 'send_to_all','created_by')
    fields = [
        'name',
        'meeting',
        'respondents',
        'send_to_all',
        'open_date',
        'close_date',
        'attachment',
    ]
    autocomplete_fields = ['respondents']
    change_form_template = 'admin/actions_change_form.html'
    class Media:
        js = ('admin/js/meeting_sign_doc.js',)


# class SignatureDocForm(FileForm):
#     change_form_template = 'admin/actions_change_form.html'
#     # def get_form(self, request, obj=None, **kwargs):
#     #     kwargs['fields'] = ['name', 'attachment']
#     #     # self.exclude = ('original_pdf','workflow_enabled')
#     #     form = super(SignatureDocForm, self).get_form(request, obj, **kwargs)
#     #     return form

admin.site.register(SignatureDoc, SignDocAdmin)
admin.site.register(Signature, SignatureAdmin)
