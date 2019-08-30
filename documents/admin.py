from django.contrib import admin
from mainapp.admin import BaseAdmin, BaseInlineAdmin
from .annotation import *


class FileAdmin(BaseAdmin):
    list_display = ['id', 'name', 'upload_status', 'file_type', 'content', 'pdf_doc', 'upload_status', 'updated_by', 'html']
    exclude = ('created_at', 'created_by', 'updated_at', 'updated_by', 'file_type', 'content', 'pdf_doc', 'upload_status', 'html')


class FileInlineAdmin(BaseInlineAdmin):
    extra = 0
    exclude = ('created_at', 'created_by', 'updated_at', 'updated_by', 'file_type', 'content', 'pdf_doc', 'upload_status', 'html')
    template = 'admin/stacked.html'


admin.site.register(File, FileAdmin)
admin.site.register(Annotation)
admin.site.register(AnnotationDocument)
admin.site.register(RectangleAnnotation)
admin.site.register(Dimension)
admin.site.register(PointAnnotation)
admin.site.register(CommentAnnotation)
admin.site.register(DrawingAnnotation)
admin.site.register(Line)
