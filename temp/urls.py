from . import views
from django.urls import path

urlpatterns = [
    path('drive', views.gdrive, name='drive'),
    path('dropbox-authorize', views.dropbox_authorize, name='drive'),
    path('dropbox-callback', views.dropbox_callback, name='drive'),
    path('drop', views.dropbox, name='drive'),
    path('onedrive', views.onedrive, name='drive'),
    path('download', views.download, name='drive')
]