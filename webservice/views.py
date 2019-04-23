import json

from django.http import HttpResponse
from django.apps import apps

def index(request):
    try:
        kw = request.POST
        if not kw:
            request.GET
        kw = json.loads(kw['input_data'])
        args = kw['args']
        params = kw['params']
        model = apps.get_model(args['app'], args['model'])
        method_to_call = getattr(model, args['method'])
        res = method_to_call(request, params)
        res = json.dumps(res)
        return HttpResponse(res)
    except:
        res = {'error': 'Error in api'}
        res = json.dumps(res)
        return HttpResponse(res)