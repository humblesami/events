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
        if user and user.id:
            tokens = Token.objects.filter(user=user)
            if user.has_perm('authtoken.add_token'):
                login(request, user)
                if len(tokens) > 0:
                    tokens[0].delete()
                token = Token.objects.create(user=user)
                user_groups = list(user.groups.all().values())
                return {'name': user.username, 'id': user.id, 'token': token.key, 'groups':user_groups }
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