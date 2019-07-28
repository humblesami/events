from django.contrib import admin
from documents.admin import FileForm
from esign.model_files.document import SignatureDoc, Signature


class SignatureAdmin(admin.ModelAdmin):
    list_display = ['user', 'document']


class SignatureDocForm(FileForm):
    def get_form(self, request, obj=None, **kwargs):
        kwargs['fields'] = ['name', 'attachment']
        # self.exclude = ('original_pdf','workflow_enabled')
        form = super(SignatureDocForm, self).get_form(request, obj, **kwargs)
        return form

admin.site.register(SignatureDoc, SignatureDocForm)
admin.site.register(Signature, SignatureAdmin)
