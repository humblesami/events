import json
import base64
from django.apps import apps
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from mainapp.rest_api import produce_result, produce_exception
from mainapp.ws_methods import check_auth_token, queryset_to_list
from restoken.models import PostUserToken
from meetings.model_files.user import Profile
from meetings.model_files.event import Event
from meetings.model_files.document import SignDocument

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


def sign_doc_public(request, token):
    context = {}
    if token:
        user_token = PostUserToken.validate_token(token)
        if not user_token:
            context['error'] = 'Invalid Token'
        else:
            context['doc_id'] = user_token.post_info.res_id
            context['success'] = 'Please Sign Here...'

            file_obj = SignDocument.objects.filter(id=user_token.post_info.res_id)[0]
            file_name = file_obj.name
            users = Profile.objects.all()
            users = queryset_to_list(users,fields=['id','name'])
            meetings = Event.objects.all()
            meetings = queryset_to_list(meetings,fields=['id','name'],related={'attendees':{'fields':['id','username']}})
            meeting_id = False
            send_to_all = False
            if file_obj.meeting:
                meeting_id = file_obj.meeting.id
            if file_obj.send_to_all:
                send_to_all = file_obj.send_to_all

            pdf_url = file_obj.pdf_doc.url
            # pdf_doc = file_obj.pdf_doc.read()
            # pdf_doc = base64.b64encode(pdf_doc)
            # pdf_doc = pdf_doc.decode('utf-8')

            signatures = file_obj.signature_set.all()
            signatures = queryset_to_list(signatures,fields=['user__id','user__username','id','type','page','field_name','zoom','width','height','top','left','image'])
            uid = False
            for s in signatures:
                signed = False
                my_record = False
                s["name"]=s["user__username"]
                if s["image"]:
                    signed = True
                # if token:
                #     if (uid == s["user__id"] and s["user__id"]) or token == s["token"]:
                #         my_record = True
                # else:
                if (request.user.id == s["user__id"]):
                    my_record = True
                s["signed"] = signed
                s["my_record"] = my_record
            doc_data =  {"pdf_url":pdf_url,"doc_data":signatures}            
            context['data'] = json.dumps(doc_data)
    return render(request, 'sign_doc_public.html', context)


def submit_sign(request, token):

    return 'hello'