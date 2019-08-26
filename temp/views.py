import json
import sys

import requests
from django.shortcuts import render


def gdrive(request):
    context = {}
    return render(request, 'google_picker.html', context)

def download(request):
    context = {}
    try:
        file_id = request.GET['file_id']
        oauthToken = request.GET['auth_token']
        req_url = "https://www.googleapis.com/drive/v3/files/" + file_id + "?alt=media"
        headers = {
            'Authorization': "Bearer " + oauthToken
        }
        response = requests.get(req_url, headers=headers)

        with open('gdrivefile', "wb") as f:
            f.write(response.content)
        context = 'done'
    except:
        err = sys.exc_info()
        context = {'error': 'Error '+ err}
    if context !=' done':
        try:
            context = json.dumps(context)
        except:
            context = 'Unknown Error'
    return context


