# myapp/routing.py
from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/data/', consumers.DataConsumer.as_asgi()),
]
