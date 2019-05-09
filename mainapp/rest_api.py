from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, authentication_classes, permission_classes

import json
import sys
import traceback
from django.apps import apps
from django.http import HttpResponse

public_methods = {
    'authsignup':{
        'AuthUser':{
            'login_user': 1
        }
    }
}

@csrf_exempt
def public(request):
    try:
        kw = request.POST
        res = 'Unknown'
        if not kw:
            kw = request.GET
        kw = json.loads(kw['input_data'])
        args = kw['args']
        try:
            res = public_methods[args['app']]
            res = res[args['model']]
            res = res[args['method']]
        except:
            res = 'Invalid method call'
            return produce_result(res, args)
        params = kw['params']
        model = apps.get_model(args['app'], args['model'])
        method_to_call = getattr(model, args['method'])
        res = method_to_call(request, params)
        return produce_result(res, args)
    except:
        eg = traceback.format_exception(*sys.exc_info())
        errorMessage = ''
        for er in eg:
            errorMessage += " " + er
        res = {'error' : errorMessage}
        res = json.dumps(res)
        return HttpResponse(res)


@csrf_exempt
@api_view(["GET", "POST"])
def secure(request):
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
        return produce_result(res, args)
    except:
        eg = traceback.format_exception(*sys.exc_info())
        errorMessage = ''
        for er in eg:
            errorMessage += " " + er
        res = {'error' : errorMessage}
        res = json.dumps(res)
        return HttpResponse(res)


def session(request):
    try:
        kw = request.POST
        if not kw:
            kw = request.GET

        kw = json.loads(kw['input_data'])
        args = kw['args']
        params = kw['params']

        if not request.user.id:
            res = {'error': 'Invalid user'}
            return produce_result(res, args)

        model = apps.get_model(args['app'], args['model'])
        method_to_call = getattr(model, args['method'])
        res = method_to_call(request, params)
        return produce_result(res, args)
    except:
        eg = traceback.format_exception(*sys.exc_info())
        errorMessage = ''
        for er in eg:
            errorMessage += " " + er
        res = {'error' : errorMessage}
        res = json.dumps(res)
        return HttpResponse(res)

def produce_result(res, args=None):
    if type(res) == dict:
        if 'error' not in res:
            if 'data' in res:
                res = res.get('data')
                res['error'] = ''
            else:
                res = {'data' : res, 'error': ''}
    elif type(res) == str:
        if res == 'done':
            res = {'error': res, 'data': 'done'}
        else:
            res = {'error': res}
    elif isinstance(res, list):
        res = {'error': '', 'data': res}
    else:
        if args:
            args = ' in ' + args['app'] + '.' + args['model'] + '.' + args['method']
        else:
            args = ''
        res = {'error': ' Invalid result type'+args}
    res = json.dumps(res)
    return HttpResponse(res)