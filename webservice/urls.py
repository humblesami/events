from . import views
from django.urls import path

urlpatterns = [
    path('endpoint', views.index, name='index'),
]
