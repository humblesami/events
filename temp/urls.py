from . import views
from django.urls import path

urlpatterns = [
    path('drive', views.gdrive, name='gdrive'),
    path('drop', views.dropbox, name='gdrive'),
    path('download', views.download, name='gdrive')
]