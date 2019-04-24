import json
import sys
import traceback
from django.apps import apps
from django.http import HttpResponse
from django.contrib.auth import authenticate, login

def index(request):
    try:
        if not request.user.id:
            res = {'error': 'Unauthorized user'}
            return res
            # user = authenticate(request, username='fazi', password='123')
            # if not user:
            #     res = {'error': 'Unauthorized user'}
            #     res = json.dumps(res)
            #     return HttpResponse(res)
            # login(request, user)
        kw = request.POST
        if not kw:
            kw = request.GET
        kw = json.loads(kw['input_data'])
        args = kw['args']
        params = kw['params']
        model = apps.get_model(args['app'], args['model'])
        method_to_call = getattr(model, args['method'])
        res = method_to_call(request, params)
        res = json.dumps(res)
        return HttpResponse(res)
    except:
        eg = traceback.format_exception(*sys.exc_info())
        errorMessage = ''
        for er in eg:
            errorMessage += " " + er
        res = {'error' : errorMessage}
        res = json.dumps(res)
        return HttpResponse(res)

def public(request):
    try:
        kw = request.POST
        if not kw:
            kw = request.GET
        kw = json.loads(kw['input_data'])
        args = kw['args']
        params = kw['params']
        model = apps.get_model(args['app'], args['model'])
        method_to_call = getattr(model, args['method'])
        res = method_to_call(request, params)
        if type(res) is not object:
            res = {'error': '', 'data': res}
        else:
            if not res.get('error') and not res.get('data'):
                res = {'error': '', 'data': res}
        res = json.dumps(res)
        return HttpResponse(res)
    except:
        eg = traceback.format_exception(*sys.exc_info())
        errorMessage = ''
        for er in eg:
            errorMessage += " " + er
        res = {'error' : errorMessage}
        res = json.dumps(res)
        return HttpResponse(res)