# myapp/views.py
from django.shortcuts import render

def index(request):
    return render(request, 'web_socket/index.html')
