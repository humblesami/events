from django.contrib import admin
from .models import Folder, Files
# Register your models here.

class FolderInline(admin.TabularInline):
    model = Folder
    # show_change_link = True
    # readonly_fields = ('View',)
    extra = 3

class FolderAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {
            'fields': [
                'name',
                'parent_folder',
            ]
        })
    ]
    inlines = [FolderInline]

class FilesAdmin(admin.ModelAdmin):
    # list_display = ['user_answer', 'voting', 'user', 'signature_data']
    # list_filter = ['answer', 'user']
    # list_filter = ['partners']
    # search_fields = ['user_answer__name', 'voting__name', 'user__username']
    filter_horizontal = ('users',)

admin.site.register(Folder, FolderAdmin)
admin.site.register(Files, FilesAdmin)