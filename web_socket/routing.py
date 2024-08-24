from django.urls import re_path
from .consumers import DataConsumer

websocket_urlpatterns = [
    re_path(r'ws/data/$', DataConsumer.as_asgi()),  # WebSocket URL
]
