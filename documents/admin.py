from django import forms
from django.contrib import admin
from .annotation import *


class FileAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'upload_status', 'file_type', 'content', 'pdf_doc', 'upload_status', 'updated_by', 'html']


class FileModelForm(forms.ModelForm):
    class Meta:
        model = File
        fields = ['name','attachment']


admin.site.register(File, FileAdmin)
admin.site.register(Annotation)
admin.site.register(AnnotationDocument)
admin.site.register(RectangleAnnotation)
admin.site.register(Dimension)
admin.site.register(PointAnnotation)
admin.site.register(CommentAnnotation)
admin.site.register(DrawingAnnotation)
admin.site.register(Line)
