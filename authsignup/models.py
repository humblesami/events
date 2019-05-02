from django.db import models
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout

# Create your models here.
class AuthUser(models.Model):
    @classmethod
    def login_user(cls, request, params):
        username = params['login']
        password = params['password']
        user = authenticate(request, username=username, password=password)
        if not user:
            return {'error': 'Invalid credentials'}
        login(request, user)
        if user and user.id:
            tokens = Token.objects.filter(user=user)
            if user.has_perm('authtoken.add_token'):
                if len(tokens) > 0:
                    tokens[0].delete()
                token = Token.objects.create(user=user)
                return {'name': user.username, 'id': user.id, 'token': token.key }
            else:
                return {'error': 'Not authorized to have token'}
        else:
            return {'error': 'Invalid credentials'}

    @classmethod
    def logout_user(cls, request, params):
        logout(request)
        return {'error':'', 'data': 'ok'}

    # @classmethod
    # def verify(cls, request, params):
    #     user = request.user
    #     if user.id:
    #         return { 'name' : user.username, 'id' : user.id }
    #     else:
    #         return {'error': 'Unauthorized user'}