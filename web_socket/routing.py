from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'^$', consumers.DataConsumer.as_asgi()),  # 빈 경로를 지정
]
