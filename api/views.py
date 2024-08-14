from django.shortcuts import render
from rest_framework import generics

from .models import Room
from .serializers import RoomSerializer

import psutil
# Create your views here.


class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def post(self, request, *args, **kwargs):
        pass

def dashboard(request):
    if request.method =='GET':
        cpu = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory().percent
        hdd = psutil.hdd().usage / psutil.hdd().total * 100
        return cpu, memory, hdd