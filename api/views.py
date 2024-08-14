from django.shortcuts import render
from rest_framework import generics

from .models import Room
from .serializers import RoomSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
import psutil
# Create your views here.


class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def post(self, request, *args, **kwargs):
        pass

@api_view(['GET'])
def dashboard(request):
    cpu = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory().percent
    hdd = psutil.disk_usage('/').percent  # 수정된 부분

    return Response({
        'cpu': cpu,
        'memory': memory,
        'hdd': hdd,
    })