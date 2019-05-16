from . import views
from django.urls import path,include

urlpatterns = [
    path('get_details', views.get_details, name='get_details'),
    path('save_sign_data', views.save_sign_data, name='save_sign_data'),
    path('get_signature', views.get_signature, name='get_signature'),
    path('save_signature', views.save_signature, name='save_signature'),
    path('delete_signature', views.delete_signature, name='delete_signature'),
]
