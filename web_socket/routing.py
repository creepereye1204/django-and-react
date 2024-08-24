from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('data', consumers.DataConsumer.as_asgi()),
]
