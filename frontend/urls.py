from django.urls import path, re_path

from .views import index

urlpatterns = [
    re_path(r'^[^/]*$', index),  # 0개 이상의 문자로 이루어진 경로
]
