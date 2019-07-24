
import json
from django.apps import apps
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from mainapp.rest_api import produce_result, produce_exception
from mainapp.ws_methods import check_auth_token

@csrf_exempt
@api_view(["GET", "POST"])
def get_details(request):
    try:
        kw = request.POST
        if not kw:
            kw = request.GET
        kw = json.loads(kw['input_data'])
        if not kw["params"]["token"]:
            uid = check_auth_token(request,kw)
            if not uid:
                return "Unauthorized"
        args = kw['args']
        params = kw['params']
        model = apps.get_model(args['app'], args['model'])
        res = model.get_detail(request, params)
        return produce_result(res, args)
    except:
        return produce_exception()

@csrf_exempt
@api_view(["GET", "POST"])
def save_sign_data(request):
    try:
        kw = request.POST
        if not kw:
            kw = request.GET
        kw = json.loads(kw['input_data'])
        args = kw['args']
        params = kw['params']
        model = apps.get_model(args['app'], args['model'])
        res = model.save_sign_data(request, params)
        return produce_result(res, args)
    except:
        return produce_exception()

@csrf_exempt
@api_view(["GET", "POST"])
def get_signature(request):
    try:
        kw = request.POST
        if not kw:
            kw = request.GET
        kw = json.loads(kw['input_data'])
        if not kw["params"]["token"]:
            uid = check_auth_token(request, kw)
            if not uid:
                return "Unauthorized"
        args = kw['args']
        params = kw['params']
        model = apps.get_model(args['app'], args['model'])
        res = model.get_signature(request, params)
        return produce_result(res, args)
    except:
        return produce_exception()

@csrf_exempt
@api_view(["GET", "POST"])
def save_signature(request):
    try:
        kw = request.POST
        if not kw:
            kw = request.GET
        kw = json.loads(kw['input_data'])
        if not kw["params"]["token"]:
            uid = check_auth_token(request, kw)
            if not uid:
                return "Unauthorized"
        args = kw['args']
        params = kw['params']
        model = apps.get_model(args['app'], args['model'])
        res = model.save_signature(request, params)
        return produce_result(res, args)
    except:
        return produce_exception()

@csrf_exempt
@api_view(["GET", "POST"])
def delete_signature(request):
    try:
        kw = request.POST
        if not kw:
            kw = request.GET
        kw = json.loads(kw['input_data'])
        args = kw['args']
        params = kw['params']
        model = apps.get_model(args['app'], args['model'])
        res = model.delete_signature(request, params)
        return produce_result(res, args)
    except:
        return produce_exception()