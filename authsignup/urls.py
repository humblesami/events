from . import views
from django.urls import path

urlpatterns = [
    path('login', views.login, name='login'),
    path('logout', views.logout_user, name='logout'),
    path('verify-token', views.verify_token, name='verify_token'),
    path('verify-auth-code', views.verify_code, name='verify_code'),
    path('forgot-password', views.forgot_password, name='forgot_password'),
    path('reset-password/<str:token>', views.reset_password, name='password_reset'),
]
