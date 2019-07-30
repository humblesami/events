import json
from signalwire.rest import Client as signalwire_client
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
        send_sms(code)
        auth_code_object = TwoFactorAuthenticate(code=code, uuid=uuid, phone=address, auth_type=auth_type)
        auth_code_object.save()
    
    context = {
        'uuid': uuid,
        'status': 'ok',
        }

    context = json.dumps(context)
    return HttpResponse(context)

def send_sms(code):
    client = signalwire_client("485323ec-133a-4f88-929f-afd8f7bd71af","PT92c704ccd2e86c3e93bfd8c8a32f7e63c7bb19fac091e61e" , signalwire_space_url= 'digitalnet.signalwire.com')    
    message = client.messages.create(
                              from_='+12029168484',
                              body= code ,
                              to='+12029168484'
                          )
    return(message.Status.SENT)

def verify_code(request):
    req = request.GET
    code = req['code']
    uuid = req['uuid']
    context = 'Invalid code'
    found = TwoFactorAuthenticate.objects.filter(code=code, uuid=uuid)
    if found:
        context = 'ok'
    return HttpResponse(context)

