from django.shortcuts import render
from restoken.models import PostUserToken

def reset_password(request, token):
    context = {}
    if not token:
        context['error'] = 'Invalid Token'
    user_token = PostUserToken.validate_token(token)
    if not user_token:
        context['error'] = 'Invalid Token'
    return render(request, 'reset_password.html', context)