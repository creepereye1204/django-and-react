from django.contrib import admin
from .models import Board, User, Comment

# Register your models here.
admin.site.register(Board)
admin.site.register(User)
admin.site.register(Comment)
