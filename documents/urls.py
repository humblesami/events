from django.urls import path

from . import views


app_name = 'documents'
urlpatterns = [
    path('docs/upload-files', views.upload_files, name = 'index'),
    path('docs/upload-single-file', views.upload_single_file, name = 'index'),
]