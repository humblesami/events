from . import views
from django.urls import path

urlpatterns = [
    path('secure', views.index, name='index'),
    path('public', views.public, name='public'),
]
