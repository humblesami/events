"""mainapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import path

from django.conf.urls import include,url
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path

from mainapp import views
from .import rest_api

urlpatterns = [
    url(r'', include('ngapp.urls')),
    url(r'^admin/', admin.site.urls, name='admin'),
    path('rest/public', rest_api.public, name = 'public'),
    path('rest/secure', rest_api.secure, name = 'secure'),
    path('rest/secure1', rest_api.session, name = 'session'),
    path('rest/search', rest_api.search_ws, name = 'search_ws'),
    path('rest/search1', rest_api.search_session, name = 'search_session'),

    url(r'^voting/', include('voting.urls')),
    url(r'^esign/', include('esign.urls')),
    path('media/<str:folder>/<str:file>/', views.serve_protected_document, name='serve_protected_document'),
    url(r'^survey/', include('survey.urls')),

]\
              # + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = 'BoardSheet'
admin.site.site_title = "BoardSheet"
admin.site.index_title = "Welcome to BoardSheet"
