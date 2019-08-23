from django.shortcuts import render


def gdrive(request):
    context = {}
    return render(request, 'a.html', context)