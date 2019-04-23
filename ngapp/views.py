from mainapp import ws_methods
from django.shortcuts import render

def index(request):
    user = request.user
    context = {'uid': None}
    if user and user.id:
        context = {
            'uid' : user.id,
            'name': ws_methods.get_user_name(user),
            'id' : user.id,
        }
    return render(request, 'index.html', context)