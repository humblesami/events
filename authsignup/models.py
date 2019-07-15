from django.db import models
from mainapp import ws_methods
from django.contrib.auth.models import User
from mainapp.settings import server_base_url
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from meetings.model_files.user import Profile

# Create your models here.
class AuthUser(models.Model):
    @classmethod
    def login_user(cls, request, params):
        username = params['login']
        password = params['password']
        user = authenticate(request, username=username, password=password)        
        if user and user.id:
            name = ''
            try:
                name = Profile.objects.get(pk=user.id).name
            except:
                name = user.username
            tokens = Token.objects.filter(user=user)
            if user.has_perm('authtoken.add_token'):
                login(request, user)
                if len(tokens) > 0:
                    tokens[0].delete()
                token = Token.objects.create(user=user)
                user_groups = list(user.groups.all().values())
                return {'username': user.username, 'name': name, 'id': user.id, 'token': token.key, 'groups':user_groups }
            else:
                return {'error': 'Not authorized to have token'}
        else:
            return {'error': 'Invalid credentials'}

    @classmethod
    def logout_user(cls, request, params):
        logout(request)
        return {'error':'', 'data': 'ok'}

    @classmethod
    def reset_password(cls, request, params):
        try:
            user = User.objects.filter(email=params['email'])
            if not user:
                return 'User email not exists in system'
            else:
                user = user[0]
            thread_data = {}
            thread_data['subject'] = 'Password Rest'
            thread_data['audience'] = [user.id]
            thread_data['template_data'] = {
                'url': server_base_url+'/reset/password/'
            }
            thread_data['template_name'] = 'user/reset_password.html'
            thread_data['token_required'] = 1
            thread_data['post_info'] = {
                'res_app': 'meetings',
                'res_model': 'Profile',
                'res_id': user.id
            }
            ws_methods.send_email_on_creation(thread_data)
            return 'done'
        except:
            res = ws_methods.get_error_message()
            return res

    # @classmethod
    # def verify(cls, request, params):
    #     user = request.user
    #     if user.id:
    #         return { 'name' : user.username, 'id' : user.id }
    #     else:
    #         return {'error': 'Unauthorized user'}
