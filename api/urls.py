from django.urls import path

from .views import RoomView ,write, dashboard,read_list,read ,login # add views.py



    

urlpatterns = [
    path('home', RoomView.as_view()),  # /api/
    path('login', login),
    path('board', read_list),  # /api/dashboard
    path('board/write', write),  # /api/dashboard
    path('board/read/<int:board_pk>', read, name='read'),  # 페이지 번호 추가
]
