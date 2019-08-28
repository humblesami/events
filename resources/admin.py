from django.contrib import admin
from documents.admin import FileAdmin
from .models import Folder, ResourceDocument
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
    extra = 0


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


class ResourceDocAdmin(FileAdmin):
    autocomplete_fields = ['users', 'folder']

admin.site.register(Folder, FolderAdmin)
admin.site.register(ResourceDocument, ResourceDocAdmin)