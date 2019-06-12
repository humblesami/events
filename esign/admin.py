from django.contrib import admin
from documents.admin import FileForm
from esign.model_files.document import SignDocument


class SignDocumentForm(FileForm):
    def get_form(self, request, obj=None, **kwargs):
        self.exclude = ('original_pdf'',' 'Workflow_enabled')
        form = super(SignDocumentForm, self).get_form(request, obj, **kwargs)
        return form

admin.site.register(SignDocument, SignDocumentForm)
