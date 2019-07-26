from django.contrib.auth import logout
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

from restoken.models import PostUserToken

def login(request, next=None):
    context = {}
    return render(request, 'login.html', context)

def logout_user(request):
    logout(request)
    return render(request, 'login.html', {})

def forgot_password(request):
    context = {}
    return render(request, 'password_reset.html', context)

def verify_code(request):
    context = {}
    return render(request, 'verify_code.html', context)

@csrf_exempt
@api_view(["GET", "POST"])
def verify_token(request):
    return HttpResponse('done')

def reset_password(request, token):
    context = {}
    if not token:
        context['error'] = 'Invalid Token'
    user_token = PostUserToken.validate_token(token)
    if not user_token:
        context['error'] = 'Invalid Token'
    return render(request, 'password_reset.html', context)