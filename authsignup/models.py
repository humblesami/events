import json

from django.db import models
from mainapp import ws_methods
from django.contrib.auth.models import User
from mainapp.settings import server_base_url
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from meetings.model_files.user import Profile
from restoken.models import PostUserToken


from mainapp.settings import AUTH_SERVER_URL

# Create your models here.
class AuthUser(models.Model):
    @classmethod
    def login_user(cls, request, params):
        username = params.get('login')
        password = params.get('password')
        auth_code = params.get('auth_code')
        user = None
        if auth_code:
            uuid = request.session.get('uuid')
            if not uuid:
                return {'error': 'No request id found'}
            url = AUTH_SERVER_URL + '/auth-code/verify?code=' + auth_code + '&uuid=' + uuid
            res = ws_methods.http_request(url)
            if res != 'ok':
                return {'error': res}
            user = request.user
        else:
            user = authenticate(request, username=username, password=password)
            if user and user.id:
                user = Profile.objects.get(pk=user.id)
            else:
                return 'Invalid credentials'

            auth_type = None
            if user.two_factor_auth:
                auth_type = user.get_two_factor_auth_display()
            if auth_type:
                referer_address = request.META['HTTP_REFERER']
                if not referer_address.endswith('localhost:4200/'):
                    auth_type = auth_type.lower()
                    auth_data = '&address='
                    if auth_type == 'phone':
                        if not user.mobile_phone:
                            return 'User phone does not exist to send code, please ask admin to set it for you'
                        auth_data = 'auth_type='+ auth_type + auth_data + user.mobile_phone
                    else:
                        if not user.email:
                            return 'User email does not exist to send code, please ask admin to set it for you'
                        auth_data = 'auth_type='+ auth_type + auth_data + user.email
                    url = AUTH_SERVER_URL + '/auth-code/generate?' + auth_data
                    res = ws_methods.http_request(url)
                    try:
                        res = json.loads(res)
                        request.session['uuid'] = res['uuid']
                        request.session['username'] = user.username
                        return 'done'
                    except:
                        return res
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
        return {'error': '', 'data': 'ok'}

    @classmethod
    def change_password(cls, request, params):
        old_password = params['old']
        new_password = params['new']

        username = request.user.username
        user = authenticate(request, username=username, password=old_password)
        if user and user.id:
            user = request.user
            user.set_password(new_password)
            user.save()
            return 'done'
        else:
            return 'Wrong old password'

    @classmethod
    def set_password(cls, request, params):
        password = params['password']
        token = params['token']
        user_token = PostUserToken.validate_token(token)
        if user_token:
            user = user_token.user
            user.set_password(password)
            user.email_verfied = True
            user.save()
            return 'done'
        else:
            if request.user.id:
                user = request.user
                user.set_password(password)
                user.save()
                return 'done'
            else:
                return 'Something Wents Wrong'

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
                'url': server_base_url + '/#/set-password/'
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