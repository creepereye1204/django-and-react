from django.shortcuts import render
from rest_framework import generics

from .models import Room, Board
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

@api_view(['POST'])
def write(request, *args, **kwargs):
    try:
        title = request.data.get('title')
        content = request.data.get('content')
        Board.objects.create(title=title, content=content)
        return Response({'ok': '작성 성공'}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def read(request, *args, **kwargs):
    try:
        boards=Board.objects.all()
        serializer = BoardSerializer(boards, many=True)
        return Response(serializer)
    except Exception as e:
        return Response({'error': e.message}, status=500)