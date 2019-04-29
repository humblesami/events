from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

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

def public(request):
    args = {}
    kw = {}
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
    args = {}
    kw = {}
    try:
        if not request.user.id:
            res = {'error': 'Unauthorized user'}
            res = json.dumps(res)
            return HttpResponse(res)
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


def produce_result(res, args):
    if res:
        if type(res) == dict:
            if 'error' not in res:
                if 'data' in res:
                    res = res.get('data')
                    res['error'] = ''
                else:
                    res = {'data' : res, 'error': ''}
        elif type(res) == str:
            res = {'error': res}
        elif isinstance(res, list):
            res = {'error': '', 'data': res}
        else:
            res = {'error': ' Invalid result type in ' + args['app'] + '.' + args['model'] + '.' + args['method']}
    else:
        res = {'error': 'Invalid response from ' + args['app'] + '.' + args['model'] + '.' + args['method']}
    res = json.dumps(res)
    return HttpResponse(res)