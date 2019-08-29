import os
import sys
import json
import requests
from django.shortcuts import render
from django.http import HttpResponse

from mainapp.settings import MEDIA_ROOT


def gdrive(request):
    context = {}
    return render(request, 'google_picker.html', context)

def onedrive(request):
    context = {}
    return render(request, 'onedrive.html', context)

def dropbox_authorize(request):
    context = {}
    return render(request, 'dropbox-authorize.html', context)

def dropbox_callback(request):
    context = {}
    return render(request, 'dropbox-callback.html', context)

def dropbox(request):
    context = {}
    return render(request, 'dropbox.html', context)

def cloud(request):
    context = {}
    return render(request, 'cloud.html', context)

def download(request):
    context = {}
    try:
        file_name = request.GET['file_name']
        auth_token = request.GET['auth_token']
        file_url = requests.GET['file_url']
        headers = {
            'Authorization': "Bearer " + auth_token
        }
        response = requests.get(file_url, headers=headers)
        file_path = MEDIA_ROOT + "/attachments"
        if not os.path.exists(file_path):
            os.makedirs(file_path)
        file_path = file_path + "/"+file_name
        with open(file_path, "wb") as f:
            res = f.write(response.content)
            print('done')
        context = "done"
    except:
        err = str(sys.exc_info())
        context = {'error': 'Error '+ err}
    if context != 'done':
        try:
            context = json.dumps(context)
        except:
            context = 'Unknown Error'
    return HttpResponse(context)