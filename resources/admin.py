from django.contrib import admin
from .models import Folder, ResourceDocument
# Register your models here.

class FolderInline(admin.TabularInline):
    model = Folder
    show_change_link = True
    # readonly_fields = ('View',)
    extra = 0

class FileInline(admin.TabularInline):
    model = ResourceDocument
    autocomplete_fields = ['users']
    show_change_link = True
    exclude = ['pdf_doc','content', 'html', 'file_type']
    # readonly_fields = ('View',)
    extra = 0

class FolderAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {
            'fields': [
                'name',
            ]
        })
    ]
    readonly_fields = ['parent_folder',]
    inlines = [FolderInline,FileInline]
    def get_queryset(self, request):
        qs = super(FolderAdmin, self).get_queryset(request)
        if request.path =='/admin/resources/folder/':
            qs = qs.filter(parent_folder=None)
        return qs


class FilesAdmin(admin.ModelAdmin):
    # list_display = ['user_answer', 'voting', 'user', 'signature_data']
    # list_filter = ['answer', 'user']
    # list_filter = ['partners']
    # search_fields = ['user_answer__name', 'voting__name', 'user__username']
    filter_horizontal = ('users',)

admin.site.register(Folder, FolderAdmin)
admin.site.register(ResourceDocument, FilesAdmin)