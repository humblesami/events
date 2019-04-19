from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(UserLog)
admin.site.register(RequestTable)
admin.site.register(UserPhone)
admin.site.register(UserInfo)