from django.contrib import admin
from .file import File
from .annotation import *


class FileAdmin(admin.ModelAdmin):
    fields = ('name','attachment','pdf_doc')
    readonly_fields = ('pdf_doc',)


admin.site.register(File,FileAdmin)
admin.site.register(Annotation)
admin.site.register(AnnotationDocument)
admin.site.register(RectangleAnnotation)
admin.site.register(Dimensions)
admin.site.register(PointAnnotation)
admin.site.register(CommentAnnotation)
admin.site.register(DrawingAnnotation)
admin.site.register(Line)
