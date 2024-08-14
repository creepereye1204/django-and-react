from django.urls import path

from .views import RoomView ,dashboard

urlpatterns = [
    path('home', RoomView.as_view()),  # /api/
    path('dashboard', dashboard),  # /api/
]
