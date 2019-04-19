from django.urls import path

from . import views


app_name = 'voting'
urlpatterns = [
    path('', views.index, name = 'index'),
    path('<int:voting_id>', views.detail, name = 'detail'),
    path('<int:voting_id>/answer', views.answer, name = 'answer'),
    path('signature/<str:res_model>/<int:res_id>', views.record_signature, name = 'signature'),        
]