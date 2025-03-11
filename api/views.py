# Django 및 REST Framework 관련 임포트
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination

# 모델 및 직렬화기 임포트
from .util import convert_to_sha256
from .models import Board, User
from .serializers import BoardSerializer, BoardListSerializer

# 뷰 관련 임포트
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.files.storage import FileSystemStorage

# 외부 라이브러리 임포트
import psutil
import ollama
import logging
import requests
from PIL import Image
import pdfkit
from functools import wraps

logger = logging.getLogger("django")


def test_logging():
    logger.debug("디버그 메시지")
    logger.info("정보 메시지")
    logger.warning("경고 메시지")


class BoardListPagination(PageNumberPagination):
    page_size = 10  # 한 페이지당 항목 수
    page_size_query_param = "page_size"  # 클라이언트가 페이지 크기를 지정할 수 있는 쿼리 매개변수
    max_page_size = 10  # 최대 페이지 크기


def get_bible(question):
    url = "http://localhost:5000/chat"
    data = {"question": question}

    response = requests.post(url, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        raise response.text


class IntegrityError(Exception):
    pass


def check_integrity(thumbnails):
    allowed_mime_types = ["image/jpeg",
                          "image/png", "image/gif"]  # 허용할 MIME 타입
    allowed_extensions = [".jpg", ".jpeg", ".png", ".gif"]  # 허용할 파일 확장자
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
        thumbnails = request.FILES.getlist("thumbnail", None)

        try:
            check_integrity(thumbnails)
        except IntegrityError as e:  # IntegrityError를 처리
            return JsonResponse({"error": f"데이터 무결성 오류: {str(e)}"}, status=400)

        return func(request, *args, **kwargs)

    return _wrapped_func


class Bible:
    def __init__(self, path: str = "biblebot/", table: str = "blible_counseling"):
        import chromadb
        import os
        from chromadb.db.base import UniqueConstraintError
        from chromadb.utils import embedding_functions

        if not os.path.exists(path):
            os.makedirs(path, exist_ok=True)
            print(f"Directory '{path}' created successfully.")

        client = chromadb.PersistentClient(path=path)
        em = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="Huffon/sentence-klue-roberta-base"
        )
        try:
            self.collection = client.create_collection(
                name=table, embedding_function=em)
        except UniqueConstraintError:
            self.collection = client.get_collection(
                name=table, embedding_function=em)

    def get(self, question: str, k: int) -> list[str]:

        results = self.collection.query(query_texts=[question], n_results=k)
        return results

    def add(self, key: str = None, question: str = None, answer=None):

        self.collection.add(
            documents=[question],
            metadatas=[answer],
            ids=[key],
        )


# db=Bible()


@api_view(["GET"])
def dashboard(request):
    cpu = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory().percent
    hdd = psutil.disk_usage("/").percent  # 수정된 부분

    return Response(
        {
            "cpu": cpu,
            "memory": memory,
            "hdd": hdd,
        }
    )


@api_view(["POST"])
@check_data
def write(request, *args, **kwargs):
    try:
        title = request.data.get("title")
        content = request.data.get("content")
        thumbnail = request.data.get("thumbnail", None)
        if thumbnail:
            Board.objects.create(
                title=title, content=content, thumbnail=thumbnail)
        else:
            Board.objects.create(title=title, content=content)
        return Response({"ok": "작성 성공"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["GET"])
def read(request, board_pk, *args, **kwargs):
    try:
        board = Board.objects.get(pk=board_pk)
        serializer = BoardSerializer(board)  # 단일 객체에 대한 시리얼라이저 사용
        response_data = serializer.data
        response_data["author"] = request.session.get(
            "user_id", None) 
        return Response(response_data, status=200)
    except Board.DoesNotExist:
        return Response({"error": "Board not found"}, status=404)  # 게시물이 없는 경우
    except Exception as e:
        return Response({"error": str(e)}, status=500)  # 기타 오류 처리


@api_view(["GET"])
def read_list(request, *args, **kwargs):
    try:
        paginator = BoardListPagination()
        boards = Board.objects.all()
        paginated_boards = paginator.paginate_queryset(boards, request)

        serializer = BoardListSerializer(paginated_boards, many=True)

        return paginator.get_paginated_response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)  # 예외 메시지 변환

    except Exception as e:
        return Response({"error": e.message}, status=500)


# @api_view(['POST'])
# def login(request, *args, **kwargs):
#     request_secret_key = request.data.get('passwd', None)
#     if request_secret_key == 'smalllab':

#         request.session['is_admin'] = True

#         return Response({'ok': True}, status=200)
#     else:
#         request.session['is_admin'] = False
#         return Response({'ok': False}, status=400)


@api_view(["POST"])
def update(request, *args, **kwargs):

    try:
        id = request.data.get("id")
        title = request.data.get("title")
        content = request.data.get("content")
        thumbnail = request.data.get("thumbnail", None)
        default_thumbnail = request.data.get("default_thumbnail", -1)
        board = Board.objects.get(pk=id)

        board.title = title
        board.content = content

        if int(default_thumbnail) > 0:

            board.thumbnail = "defaultThumbnail.png"
        elif thumbnail:
            board.thumbnail = thumbnail
        board.save()

        return Response({"ok": "수정 성공"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
def service(request):
    question = request.data.get("question", None)
    try:
        paragraph = get_bible(question)
    except Exception as e:
        return Response({"result": str(e)}, status=500)

    text = ollama.chat(
        model="ollama3",
        messages=[
            {
                "role": "user",
                "content": f"상황:'{question}',:'{paragraph}' , (한글로 대답)",
            },
        ],
    )
    result = text["message"]["content"]
    return Response({"result": result}, status=200)


@api_view(["DELETE"])
def delete_board(request):
    try:
        board_id = request.data.get("board_id", "no_id")
        if board_id.isdigit():
            pass
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
def login(request):
    try:
        user_id = request.data.get("user_id", None)
        password = request.data.get("password", None)

        if user_id and password:
            try:
                user_id = convert_to_sha256(user_id)
                password = convert_to_sha256(password)
                user = User.objects.get(user_id=user_id)

                # 여기서 비밀번호를 확인해야 합니다
                if user.password == password:  # 비밀번호 확인 예시
                    if user.is_banned:
                        return Response({"error": "User is banned"}, status=403)
                    request.session["user_id"] = user_id
                    return Response({"ok": True}, status=200)
                else:
                    return Response({"error": "Invalid password"}, status=400)

            except:
                return Response({"error": "User does not exist"}, status=404)

        return Response({"error": "Missing user_id or password"}, status=400)

    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
def signup(request):
    try:
        user_id = request.data.get("user_id", None)
        password = request.data.get("password", None)
        email = request.data.get("email", None)
        if user_id and password:
            try:

                user_id = convert_to_sha256(user_id)

                if User.objects.filter(user_id=user_id).exists():
                    return Response({"error": "Aleady exists user_id"}, status=200)

                else:
                    password = convert_to_sha256(password)
                    user = User(user_id=user_id,
                                password=password, email=email)
                    user.save()
                    request.session["user_id"] = user_id
                    return Response({"ok": True}, status=200)

            except:
                return Response({"error": str(e)}, status=500)

        return Response({"error": "Missing user_id or password"}, status=400)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
