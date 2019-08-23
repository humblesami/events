from django.contrib import admin
from .models import Folder, ResourceDocument
from documents.admin import FileForm
import nested_admin

class FolderInline(nested_admin.NestedStackedInline):
    model = Folder
    show_change_link = True
    verbose_name = "Sub Folder"
    verbose_name_plural = "Sub Folders"
    extra = 1

class FileInline(nested_admin.NestedStackedInline):
    model = ResourceDocument
    autocomplete_fields = ['users']
    show_change_link = True
    exclude = ('html', 'content', 'original_pdf', 'pdf_doc', 'file_type', 'uplaod_status', 'created_at', 'created_by')
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
    search_fields = ['name']
    readonly_fields = ['parent',]
    inlines = [FileInline, FolderInline]
    def get_queryset(self, request):
        qs = super(FolderAdmin, self).get_queryset(request)
        if request.path =='/admin/resources/folder/':
            qs = qs.filter(parent=None)
        return qs


class ResourceDocumentForm(FileForm):
    autocomplete_fields = ['users', 'folder']
    def get_form(self, request, obj=None, **kwargs):
        form = super(ResourceDocumentForm, self).get_form(request, obj, **kwargs)
        return form

admin.site.register(Folder, FolderAdmin)
admin.site.register(ResourceDocument, ResourceDocumentForm)