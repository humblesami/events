from django.http import HttpResponse
from django.shortcuts import render
from mainapp import ws_methods

def index(request):
    user = request.user
    context = {'user': None}
    if user and user.id:
        user = { 'name': ws_methods.get_user_name(user), 'id' : user.id}
        context = {'user': user}
    return render(request, 'index.html', context)