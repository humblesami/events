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


class DualAuth(models.Model):
    uuid = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


# Create your models here.
class AuthUser(models.Model):

    @classmethod
    def do_login(cls, request, user, name, referer_address):
        login(request, user)
        token = Token.objects.filter(user=user)
        if token:
            token = token[0]

        if 'localhost' in referer_address:
            if not token:
                token = Token.objects.create(user=user)
        else:
            token.delete()
            token = Token.objects.create(user=user)

        user_groups = list(user.groups.all().values())
        user_data = {'username': user.username, 'name': name, 'id': user.id, 'token': token.key, 'groups':user_groups }
        try:
            user_data['photo'] = user.image.url
            user_data['user_photo'] = user_data['photo']
        except:
            pass
        return user_data

    @classmethod
    def login_user(cls, request, params):
        username = params.get('login')
        password = params.get('password')
        auth_code = params.get('auth_code')
        referer_address = request.META['HTTP_REFERER']
        user = None
        if auth_code:
            uuid = params.get('uuid')
            res = cls.verify_code(uuid, auth_code)
            if type(res) is str:
                return res
            user = res
        else:
            user = authenticate(request, username=username, password=password)
            if user and user.id:
                profile = Profile.objects.filter(pk=user.id)
                if (not profile) and user.is_superuser:
                    login(request, user)
                    profile = Profile(user_ptr=user, email=user.email, password=password, username = user.username, is_superuser = user.is_superuser)
                    profile.save()
                else:
                    profile = profile[0]
                user = profile
            else:
                return 'Invalid credentials'

            auth_type = None
            if user.two_factor_auth:
                auth_type = user.get_two_factor_auth_display()
            if auth_type:
                if not referer_address.endswith('localhost:4200/'):
                    auth_type = auth_type.lower()
                    address_to_send_code = ''
                    if auth_type == 'phone':
                        if not user.mobile_phone:
                            return 'User phone does not exist to send code, please ask admin to set it for you'
                        address_to_send_code = user.mobile_phone
                    else:
                        if not user.email:
                            return 'User email does not exist to send code, please ask admin to set it for you'
                        address_to_send_code = user.email
                    res = cls.send_verification_code(auth_type, address_to_send_code, user.id)
                    return res
        if user and user.id:
            name = ''
            try:
                name = Profile.objects.get(pk=user.id).fullname()
            except:
                if user.first_name:
                    name = user.first_name
                if user.last_name:
                    name += user.last_name
                if not name:
                    name = user.username
            return cls.do_login(request, user, name, referer_address)
        else:
            return {'error': 'Invalid credentials'}

    @classmethod
    def send_verification_code(cls, auth_type, address_to_send_code, user_id):
        if not address_to_send_code:
            return 'No address given to send code'
        auth_data = 'auth_type=' + auth_type + '&address=' + address_to_send_code
        url = AUTH_SERVER_URL + '/auth-code/generate?' + auth_data
        res = ws_methods.http_request(url)
        try:
            res = json.loads(res)
        except:
            return res
        res['address'] = address_to_send_code[:2] + '****' + address_to_send_code[-2:]
        res['auth_type'] = auth_type
        dual_auth = DualAuth(
            user_id=user_id,
            uuid=res['uuid']
        )
        dual_auth.save()
        return res

    @classmethod
    def verify_code(cls, uuid, auth_code):
        if not uuid:
            return {'error': 'No request id found'}
        url = AUTH_SERVER_URL + '/auth-code/verify?code=' + auth_code + '&uuid=' + uuid
        res = ws_methods.http_request(url)
        if res != 'ok':
            return res
        dual_auth = DualAuth.objects.get(uuid=uuid)
        user = dual_auth.user
        return user

    @classmethod
    def authenticate_mobile(cls, request, params):
        auth_code = params['verification_code']
        uuid = params['uuid']
        res = cls.verify_code(uuid, auth_code)
        if type(res) is str:
            return res
        user = Profile.objects.get(pk=res.id)
        if user:
            user.mobile_verified = True
        return 'done'

    @classmethod
    def send_mobile_verfication_code(cls, request, params):
        user = request.user
        user = Profile.objects.get(pk=user.id)
        mobile_phone = params['mobile_phone']
        if mobile_phone:
            user.mobile_phone = mobile_phone
            user.save()
            auth_type = 'phone'
            auth_type = auth_type.lower()
            address_to_send_code = mobile_phone
            user_id = user.id
            res = cls.send_verification_code(auth_type, address_to_send_code, user_id)
            return res
        else:
            return 'Please provide mobile number.'

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
        user_token = PostUserToken.validate_token(token,1)
        if user_token:
            user = user_token.user
            request.user = user
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
                'url': server_base_url + '/user/reset-password/'
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