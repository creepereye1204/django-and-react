from django.urls import re_path
from .consumers import SketchToImageConsumer

websocket_urlpatterns = [
    re_path(r'ws/api/sketch-to-image', SketchToImageConsumer.as_asgi()),  # WebSocket URL
]
