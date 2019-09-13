from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from mainapp import ws_methods
from django.db import transaction
from meetings.model_files.user import Profile
from documents.file import File
import json


@csrf_exempt
@api_view(["GET", "POST"])
def upload_files(request):   
    docs = []
    try:
        req = request.POST
        res_app = req['res_app']
        res_model = req['res_model']
        res_id = req['res_id']
        model = ws_methods.get_model(res_app, res_model)
        obj = model.objects.get(pk=res_id)
        cloud_data = req.get('cloud_data')
        if cloud_data:
            cloud_data = json.loads(cloud_data)            
            for file in cloud_data:
                with transaction.atomic():
                    created_file = obj.documents.create(name=file['name'], cloud_url=file['url'], file_name=file['file_name'])
                    docs.append({'id':created_file.id, 'name': file['name'], 'access_token': created_file.access_token})
        for key in request.FILES:
            files = request.FILES.getlist(key)            
            for file in files:
                with transaction.atomic():
                    created_file = obj.documents.create(name=file.name, attachment=file)
                    docs.append({'id':created_file.id, 'name': file.name, 'access_token': "Local"})

        docs = json.dumps(docs)
    except:
        docs = ws_methods.get_error_message()
    return HttpResponse(docs)