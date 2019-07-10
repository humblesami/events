from . import views
from django.urls import path,include

urlpatterns = [
    path('reset/password/<str:token>', views.reset_password, name = 'password_reset'),
]
