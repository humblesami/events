from django.contrib.auth import logout
from django.shortcuts import render
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

def reset_password(request, token):
    context = {}
    if not token:
        context['error'] = 'Invalid Token'
    user_token = PostUserToken.validate_token(token)
    if not user_token:
        context['error'] = 'Invalid Token'
    return render(request, 'password_reset.html', context)