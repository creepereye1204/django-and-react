from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path('data/', consumers.DataConsumer.as_asgi()),
]
