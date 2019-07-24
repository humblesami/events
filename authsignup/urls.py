from . import views
from django.urls import path

urlpatterns = [
    path('reset/password/<str:token>', views.reset_password, name='password_reset'),
    path('login', views.login, name='login'),
    path('forgot-password', views.forgot_password, name='forgot_password'),
]
