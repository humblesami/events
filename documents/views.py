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
    ids = [] 
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
                # file_obj = File(name=file.name, attachment=file)
                # doc_set.append(file_obj)            
                with transaction.atomic():
                    created_file = obj.documents.create(name=file['name'], cloud_url=file['url'], file_name=file['file_name'])
                    ids.append(created_file.id)
        for key in request.FILES:
            files = request.FILES.getlist(key)            
            for file in files:
                # file_obj = File(name=file.name, attachment=file)
                # doc_set.append(file_obj)
                try:  
                    with transaction.atomic():
                        created_file = obj.documents.create(name=file.name, attachment=file)
                        ids.append(created_file.id)
                except:
                    pass
        # try:
        #     obj.documents = set(doc_set)
        #     obj.documents.save()
        # except:
        #     res = ws_methods.get_error_message()
        #     pass
        # obj.documents(doc_set).save()
    except:
        ids = ws_methods.get_error_message()
        pass
    return HttpResponse(ids)