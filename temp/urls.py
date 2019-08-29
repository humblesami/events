from . import views
from django.urls import path

urlpatterns = [
    path('cloud', views.cloud, name='cloud'),

    path('gdrive', views.gdrive, name='drive'),
    path('onedrive', views.onedrive, name='drive'),

    path('drop', views.dropbox, name='drive'),
    path('dropbox-authorize', views.dropbox_authorize, name='drive'),
    path('dropbox-callback', views.dropbox_callback, name='drive'),


    path('download', views.download, name='drive')
]