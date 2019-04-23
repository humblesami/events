from django.contrib import admin
from .file import File


class FileAdmin(admin.ModelAdmin):
    fields = ('name','attachment','pdf_doc')
    readonly_fields = ('pdf_doc',)


admin.site.register(File,FileAdmin)
