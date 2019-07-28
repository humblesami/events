from django.contrib import admin
from restoken.models import PostUserToken


class TokenAdmin(admin.ModelAdmin):
    list_display = ('post_info', 'user', 'token')

admin.site.register(PostUserToken, TokenAdmin)