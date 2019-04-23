from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout

# Create your models here.
class AuthUser(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    @classmethod
    def login_user(cls, request, params):
        username = params['login']
        password = params['password']
        user = authenticate(request, username=username, password=password)
        if user and user.id:
            return {'name': user.username, 'id': user.id}
        else:
            return {'error': 'Invalid credentials'}

    @classmethod
    def logout_user(cls, request, params):
        logout(request)
        return {'error':'', 'data': 'ok'}

    @classmethod
    def verify(cls, request, params):
        user = request.user
        if user.id:
            return { 'name' : user.username, 'id' : user.id }
        else:
            return {'error': 'Unauthorized user'}