from django.urls import path

from .views import RoomView ,write, dashboard,read_list,read ,login,update,service,download_pdf# add views.py



    

urlpatterns = [
    path('home', RoomView.as_view()),  # /api/
    path('login', login),
    path('service', service),  # /api/dashboard
    path('board', read_list),  # /api/dashboard
    path('board/write', write), 
    path('board/update', update),  # /api/update/id/title/content/thumbnail  # id, title, content, thumbnail 받아서 update
    path('board/read/<int:board_pk>', read, name='read'),  # 페이지 번호 추가
    path('board/download_pdf/<int:board_pk>', download_pdf),  # 페이지 번호 추가
]
