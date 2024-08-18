from django.urls import path

from .views import index

urlpatterns = [
    path('', index),  # /api/
    path('about', index),  # /api/home
]
