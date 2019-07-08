from django.contrib import admin
from .models import Folder, ResourceDocument
from documents.admin import FileForm
# Register your models here.

class FolderInline(admin.TabularInline):
    model = Folder
    show_change_link = True
    verbose_name = "Sub Folder"
    verbose_name_plural = "Sub Folders"
    extra = 1

class FileInline(admin.TabularInline):
    model = ResourceDocument
    autocomplete_fields = ['users']
    show_change_link = True
    exclude = ['pdf_doc','content', 'html', 'file_type']
    # readonly_fields = ('View',)
    extra = 1

class FolderAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {
            'fields': [
                'name',
            ]
        })
    ]
    readonly_fields = ['parent',]
    inlines = [FolderInline,FileInline]
    def get_queryset(self, request):
        qs = super(FolderAdmin, self).get_queryset(request)
        if request.path =='/admin/resources/folder/':
            qs = qs.filter(parent=None)
        return qs


class ResourceDocumentForm(FileForm):
    autocomplete_fields = ['users']
    def get_form(self, request, obj=None, **kwargs):
        form = super(ResourceDocumentForm, self).get_form(request, obj, **kwargs)
        return form

admin.site.register(Folder, FolderAdmin)
admin.site.register(ResourceDocument, ResourceDocumentForm)