from django.shortcuts import render


def gdrive(request):
    context = {}
    return render(request, 'google_picker.html', context)