from django.shortcuts import render
from rest_framework import generics

from .models import Room, Board
from .serializers import RoomSerializer,BoardSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
import psutil
import ollama

class Bible():
    def __init__(self,path:str="biblebot/",table:str='blible_counseling'):
        import chromadb
        import os
        from chromadb.db.base import UniqueConstraintError
        from chromadb.utils import embedding_functions
        
        if not os.path.exists(path):
            os.makedirs(path, exist_ok=True)
            print(f"Directory '{path}' created successfully.")

         
        
        client = chromadb.PersistentClient(path=path)
        em = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="Huffon/sentence-klue-roberta-base")
        try:
            self.collection = client.create_collection(name=table, embedding_function=em)
        except UniqueConstraintError: 
            self.collection = client.get_collection(name=table, embedding_function=em)
            
    def get(self,question:str,k:int)->list[str]:
        
        results=self.collection.query(query_texts=[question],n_results=k)
        return results


    def add(self,key:str=None,question:str=None,answer=None):

        self.collection.add(
        documents=[question],
        metadatas=[answer],
        ids=[key],
        )
db=Bible()


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
        response_data = serializer.data
        response_data['admin'] = request.session.get('is_admin',False)  # 로그인 여부
        return Response(response_data, status=200)
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

        request.session['is_admin'] = True
        
        return Response({'ok': True}, status=200)
    else:
        request.session['is_admin'] = False
        return Response({'ok': False}, status=400)


@api_view(['POST'])
def update(request, *args, **kwargs):
    
    try:
        id = request.data.get('id')
        title = request.data.get('title')
        content = request.data.get('content')
        thumbnail = request.data.get('thumbnail',None)
        
        board = Board.objects.get(pk=id)
        
        board.title = title
        board.content = content
        
        
        
        
        if thumbnail:
            board.thumbnail = thumbnail
        else:
            board.thumbnail='defaultThumbnail.png'
        
        board.save()
        return Response({'ok': '작성 성공'}, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    

@api_view(['POST'])
def service(request, *args, **kwargs):
    question = request.data.get('question', None)
    paragraph=db.get(question=question,k=1)['metadatas'][0][0]['격언']
    text = ollama.chat(model='priest_v3',messages=[
    {
        'role': 'user',
        'content': f"상황:'{question}',성경구절:'{paragraph}' , (한글로 대답)",
    },
    ])
    result=text['message']['content']
    return Response({'result': result}, status=200)
    