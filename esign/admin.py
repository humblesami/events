from django import forms
from django.contrib import admin
from documents.admin import FileForm
from esign.model_files.document import SignatureDoc, Signature
from meetings.model_files.event import Event


class SignatureAdmin(admin.ModelAdmin):
    list_display = ['user', 'document', 'signed_at']


class SignDocumentForm(forms.ModelForm):
    class Meta:
            model = SignatureDoc
            fields = ()
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['meeting'].queryset = Event.objects.filter(publish=True, archived=False)


class AdminSignDoc(admin.ModelAdmin):

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            # Only set added_by during the first save.
            obj.created_by_id = request.user.id
        super().save_model(request, obj, form, change)

    form = SignDocumentForm
    list_display = ('name', 'meeting', 'send_to_all')
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

admin.site.register(SignatureDoc, AdminSignDoc)
admin.site.register(Signature, SignatureAdmin)
