from django.conf.urls import url
from django.urls import path,re_path

from .import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('',views.index,name='index'),
    path('rootq',views.root_query,name='RootQuery'),
    path('signup', views.Add_User,name='SignUp'),
    path('saveuser',views.signup,name='SaveUser'),
    path('login',views.LoginPage_view,name='LoginPage_view'),
    path('logout',views.logout_view, name='Logout'),
    path('change-password',views.Change_Password,name='ChangePassword'),
    path('update-password',views.UpdatePassword,name='UpdatePassword'),
    path('profile/edit',views.Edit_Profile,name='EditProfile'),
    path('UpdateProfile',views.UpdateProfile,name='UpdateProfile'),

    path('verifytoken',views.ConnectSocket,name='Socket'),
    path('messenger',views.Messenger,name='Messenger'),


    path('activate/<str:uidb64>/<str:token>', views.activate, name='activate'),
    path('LoginAuthentication/',views.Login_Authentication,name='LoginAuthentication'),
    path('RegenerateEmailCode/<user_id>',views.RegenerateEmailCodeBtn,name='RegenerateEmailCode'),
    path('ResolveComplain/<int:user_id>/',views.ResolveComplain,name='ResolveComplain'),
    path('RequestAdmintoRegenLink/<int:user_id>/',views.RequestAdminToRegenerateLink,name='RequestAdmintoRegenLink'),
    path('ChangePasswordandLogin/',views.LoginAfterChangePassword,name='ChangePasswordandLogin'),

    path('password_reset',auth_views.PasswordResetView.as_view(),name='password_reset'),
    path('password-reset/done/',auth_views.PasswordResetDoneView.as_view(),name='password_reset_done'),
    path('password-reset/confirm/<str:uidb64>/<str:token>',auth_views.PasswordResetConfirmView.as_view(),name='password_reset_confirm'),
    path('password-reset/complete',auth_views.PasswordResetCompleteView.as_view(),name='password_reset_complete'),

]