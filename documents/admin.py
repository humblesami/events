from django.contrib import admin
from .file import File
from .annotation import *


class FileAdmin(admin.ModelAdmin):

    def get_form(self, request, obj=None, **kwargs):
        self.exclude = ('html', 'file_type', 'content', 'original_pdf', 'pdf_doc')
        form = super(FileAdmin, self).get_form(request, obj, **kwargs)
        return form

admin.site.register(File,FileAdmin)
admin.site.register(Annotation)
admin.site.register(AnnotationDocument)
admin.site.register(RectangleAnnotation)
admin.site.register(Dimensions)
admin.site.register(PointAnnotation)
admin.site.register(CommentAnnotation)
admin.site.register(DrawingAnnotation)
admin.site.register(Line)
