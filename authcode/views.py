import json

from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.crypto import get_random_string
from django.http import HttpResponse

from mainapp.settings import server_base_url
from .models import TwoFactorAuthenticate

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

    thread_data = {}
    thread_data['subject'] = 'Two Factor varification'
    thread_data['template_data'] = {
        'code': code
    }
    thread_data['template_name'] = 'code_verification.html'
    html_message = render_to_string(thread_data['template_name'], thread_data['template_data'])
    send_mail(thread_data['subject'], '', "sami@gmai.com", [email], html_message=html_message)
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

