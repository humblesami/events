from . import views
from django.urls import path

urlpatterns = [
    path('drive', views.gdrive, name='gdrive'),
    path('drop', views.dropbox, name='gdrive'),
    path('onedrive', views.onedrive, name='onedrive'),
    path('download', views.download, name='gdrive')
]