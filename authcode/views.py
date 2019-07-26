import json

from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.crypto import get_random_string
from django.http import HttpResponse

from mainapp.settings import server_base_url
from .models import TwoFactorAuthenticate, ThreadEmail

def generate_code(request):

    req = request.GET
    email = req.get('email')
    if email:
        auth_type = 'email'
    phone = req.get('phone')
    if phone:
        auth_type = 'phone'
    if not auth_type:
        return HttpResponse('Invalid auth type')
    code = get_random_string(length=6)
    uuid = get_random_string(length=10)

    creattoken = TwoFactorAuthenticate(code=code, uuid=uuid, email=email, phone=phone, auth_type=auth_type)
    creattoken.save()

    email_data = {}
    email_data['subject'] = 'Two Factor varification'
    email_data['template_data'] = {
        'code': code
    }
    email_data['emails'] = [email]
    email_data['template_name'] = 'code_verification.html'
    ThreadEmail(email_data).start()
    context = {
        'uuid': uuid,
        'status': 'ok',
    }
    context = json.dumps(context)
    return HttpResponse(context)

def verify_code(request):
    req = request.GET
    code = req['code']
    uuid = req['uuid']
    context = 'Invalid code'
    found = TwoFactorAuthenticate.objects.filter(code=code, uuid=uuid)
    if found:
        context = 'ok'
    return HttpResponse(context)

