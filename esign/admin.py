from django.contrib import admin
from documents.admin import FileAdmin
from esign.model_files.document import SignDocument


class SignDocumentForm(FileAdmin):
    def get_form(self, request, obj=None, **kwargs):
        self.exclude = ('original_pdf'',' 'Workflow_enabled')
        form = super(SignDocumentForm, self).get_form(request, obj, **kwargs)
        return form

admin.site.register(SignDocument, SignDocumentForm)
