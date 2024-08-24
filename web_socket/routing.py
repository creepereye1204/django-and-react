from django.urls import re_path
from consumers import DataConsumer

websocket_urlpatterns = [
    path('ws/data/', DataConsumer.as_asgi()),  # WebSocket URL
]


