from django.shortcuts import render
from rest_framework import generics

from .models import Room, Board
from .serializers import RoomSerializer,BoardSerializer
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
        thumbnail = request.data.get('thumbnail',None)
        if thumbnail:
            Board.objects.create(title=title, content=content, thumbnail=thumbnail)
        else:
            Board.objects.create(title=title, content=content)
        return Response({'ok': '작성 성공'}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def read(request, board_pk, *args, **kwargs):
    try:
        # 특정 번호(pk)의 게시물 가져오기
        board = Board.objects.get(pk=board_pk)
        serializer = BoardSerializer(board)  # 단일 객체에 대한 시리얼라이저 사용
        
        return Response(serializer.data, status=200)
    except Board.DoesNotExist:
        return Response({'error': 'Board not found'}, status=404)  # 게시물이 없는 경우
    except Exception as e:
        return Response({'error': str(e)}, status=500)  # 기타 오류 처리


@api_view(['GET'])
def read_list(request, *args, **kwargs):
    try:
        boards=Board.objects.all()
        serializer = BoardSerializer(boards, many=True)
        return Response(serializer.data, status=200)
    except Exception as e:
        return Response({'error': e.message}, status=500)
    
    
    
@api_view(['POST'])
def login(request, *args, **kwargs):
    request_secret_key = request.data.get('passwd', None)
    if request_secret_key== 'smalllab':

        
        
        return Response({'ok': '작성 성공'}, status=200)
    else:
        
        return Response({'error': 'ㄴㄴ 아님'}, status=200)  # 비��번호가 ����� 경우
