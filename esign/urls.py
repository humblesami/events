from . import views
from django.urls import path,include

urlpatterns = [
    path('get_details', views.get_details, name='get_details'),
    path('get_details_public', views.get_details_public, name='get_details_public'),
    path('save_sign_data', views.save_sign_data, name='save_sign_data'),
    path('save_sign_data_public', views.save_sign_data_public, name='save_sign_data'),
    path('get_signature', views.get_signature, name='get_signature'),
    path('get_signature_public', views.get_signature_public, name='get_signature'),
    path('save_signature', views.save_signature, name='save_signature'),
    path('save_signature_public', views.save_signature_public, name='save_signature'),
    path('delete_signature', views.delete_signature, name='delete_signature'),
    path('sign-doc/<str:token>', views.sign_doc_public, name='sign_doc_public'),
]
