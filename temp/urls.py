from . import views
from django.urls import path

urlpatterns = [
    path('drive', views.gdrive, name='gdrive')
]