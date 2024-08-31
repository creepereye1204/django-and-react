from django.urls import re_path
from .consumers import SketchToImageConsumer,BibleBot

websocket_urlpatterns = [
    re_path(r'ws/api/sketch-to-image', SketchToImageConsumer.as_asgi()),  # WebSocket URL
    re_path(r'ws/api/bible-bot', BibleBot.as_asgi()),  # WebSocket URL
]
