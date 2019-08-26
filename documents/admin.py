from django import forms
from django.contrib import admin
from .annotation import *


class FileForm(admin.ModelAdmin):

    def get_form(self, request, obj=None, **kwargs):
        self.exclude = ('html', 'uplaod_status', 'file_type', 'content', 'original_pdf', 'pdf_doc', 'upload_status', 'created_at', 'created_by')
        form = super(FileForm, self).get_form(request, obj, **kwargs)
        return form

class FileModelForm(forms.ModelForm):
    class Meta:
        model = File
        fields = ['name','attachment']

admin.site.register(File,FileForm)
admin.site.register(Annotation)
admin.site.register(AnnotationDocument)
admin.site.register(RectangleAnnotation)
admin.site.register(Dimension)
admin.site.register(PointAnnotation)
admin.site.register(CommentAnnotation)
admin.site.register(DrawingAnnotation)
admin.site.register(Line)
