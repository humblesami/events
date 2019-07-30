import json

from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.crypto import get_random_string
from django.http import HttpResponse

from mainapp.settings import server_base_url
from .models import TwoFactorAuthenticate, ThreadEmail

def generate_code(request):

    req = request.GET
    address = req.get('address')
    auth_type = req.get('auth_type')

    if not auth_type:
        return HttpResponse('Invalid auth type')

    code = get_random_string(length=6)
    uuid = get_random_string(length=10)

    if auth_type == 'email':
        if not address:
            return HttpResponse('Invalid email address in profile')
        auth_code_object = TwoFactorAuthenticate(code=code, uuid=uuid, email=address, auth_type=auth_type)
        auth_code_object.save()

        email_data = {}
        email_data['subject'] = 'Two Factor varification'
        email_data['template_data'] = {
            'code': code
        }
        email_data['emails'] = [address]
        email_data['template_name'] = 'code_verification.html'
        ThreadEmail(email_data).start()
    elif auth_type == 'phone':
        try:
            send_sms(address)
        except:
            pass
        code = '123'
        auth_code_object = TwoFactorAuthenticate(code=code, uuid=uuid, phone=address, auth_type=auth_type)
        auth_code_object.save()
    context = {
        'uuid': uuid,
        'status': 'ok',
    }
    context = json.dumps(context)
    return HttpResponse(context)

def send_sms(address):
    return ''

def verify_code(request):
    req = request.GET
    code = req['code']
    uuid = req['uuid']
    context = 'Invalid code'
    found = TwoFactorAuthenticate.objects.filter(code=code, uuid=uuid)
    if found:
        context = 'ok'
    return HttpResponse(context)

