import os
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http.response import FileResponse, HttpResponse

from mainapp.settings import MEDIA_ROOT


@login_required()
def serve_protected_document(request,folder, file):
    # document = get_object_or_404(File, attachment="converted/" + file)

    path = MEDIA_ROOT + '/' + folder + '/' +file
    response = FileResponse(open(path,'rb'))
    # response["Content-Disposition"] = "attachment; filename=" + file

    return response