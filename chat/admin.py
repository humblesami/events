from django.contrib import admin
from .models import ChatGroup

class ChatGroupForm(admin.ModelAdmin):
    list_display =('name','created_by')


admin.site.register(ChatGroup, ChatGroupForm)