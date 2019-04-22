from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, get_user_model, update_session_auth_hash, logout

# Create your models here.
class AuthUser(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)