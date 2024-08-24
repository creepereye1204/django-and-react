from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'data/$', consumers.DataConsumer.as_asgi()),  # 'data/' 경로를 정규 표현식으로 수정
]
