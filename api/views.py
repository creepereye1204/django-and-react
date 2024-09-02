from django.shortcuts import render
from rest_framework import generics
from django.http import HttpResponse
from .models import Room, Board
from .serializers import RoomSerializer,BoardSerializer,BoardListSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import api_view
import psutil
import ollama
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.core.files.storage import FileSystemStorage
from functools import wraps
from PIL import Image
import pdfkit


import requests






class BoardListPagination(PageNumberPagination):
    page_size = 20  # 한 페이지당 항목 수
    page_size_query_param = 'page_size'  # 클라이언트가 페이지 크기를 지정할 수 있는 쿼리 매개변수
    max_page_size = 20  # 최대 페이지 크기



def get_bible(question):
    url = "http://localhost:5000/chat"
    data = {
        "question": question
    }

    response = requests.post(url, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        raise response.text




class IntegrityError(Exception):
    pass

def check_integrity(thumbnails):
    allowed_mime_types = ['image/jpeg', 'image/png', 'image/gif']  # 허용할 MIME 타입
    allowed_extensions = ['.jpg', '.jpeg', '.png', '.gif']  # 허용할 파일 확장자
    max_size = 5 * 1024 * 1024  # 5MB
    
    # 파일이 없거나 하나만 존재하는 경우만 허용
    if len(thumbnails) not in [0, 1]:  
        raise IntegrityError("파일이 없거나 하나의 파일만 선택하세요.")

    if len(thumbnails) == 1:
        thumbnail = thumbnails[0]
        image = Image.open(thumbnail)
        width, height = image.size
        # 파일 크기 검사
        if thumbnail.size > max_size:
            raise IntegrityError("파일 크기가 5MB를 초과할 수 없습니다.")
        
        # MIME 타입 검사
        if thumbnail.content_type not in allowed_mime_types:
            raise IntegrityError("허용되지 않는 이미지 형식입니다.")
            
        # 파일 확장자 검사
        if not any(thumbnail.name.lower().endswith(ext) for ext in allowed_extensions):
            raise IntegrityError("허용되지 않는 파일 확장자입니다.")
        
        # 이미지의 너비와 높이를 가져오는 함수 (예: Pillow 라이브러리 사용)
       
        
        

        # 이미지 유효성 검사
        if width is None or height is None or width < 1 or height < 1:
            raise IntegrityError("유효하지 않은 이미지입니다.")

def check_data(func):
    @wraps(func)
    def _wrapped_func(request, *args, **kwargs):
        thumbnails = request.FILES.getlist('thumbnail', None)
        
        try:
            check_integrity(thumbnails)
        except IntegrityError as e:  # IntegrityError를 처리
            return JsonResponse({"error": f"데이터 무결성 오류: {str(e)}"}, status=400)

        return func(request, *args, **kwargs)
    
    return _wrapped_func

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
# db=Bible()


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
@check_data
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
        paginator = BoardListPagination()
        boards = Board.objects.all()
        page_number = request.query_params.get('page_number', 1)  # 수정
        current_page = int(page_number)  # 예외 처리가 필요할 수 있음
        paginated_boards = paginator.paginate_queryset(boards, request)
        page_length = paginator.page.paginator.num_pages
        
        start_page = max(1, current_page - 2)
        end_page = min(current_page + 2, page_length)
        
        serializer = BoardListSerializer(paginated_boards, many=True)
        
        return Response({
            'board_list': serializer.data,
            'start_page': start_page,
            'end_page': end_page
        }, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)  # 예외 메시지 변환

        
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
def service(request):
    question = request.data.get('question', None)
    try:
        paragraph=get_bible(question)
    except Exception as e:
        return Response({'result': str(e)}, status=500)
    
    text = ollama.chat(model='priest_v3',messages=[
    {
        'role': 'user',
        'content': f"상황:'{question}',성경구절:'{paragraph}' , (한글로 대답)",
    },
    ])
    result=text['message']['content']
    return Response({'result': result}, status=200)

