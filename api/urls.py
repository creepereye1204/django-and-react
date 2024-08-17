from django.urls import path

from .views import RoomView ,write, dashboard  # add views.py

urlpatterns = [
    path('home', RoomView.as_view()),  # /api/
    path('board/write', write),  # /api/dashboard
]
