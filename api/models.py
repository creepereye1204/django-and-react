from django.db import models


class User(models.Model):
    user_id = models.CharField(primary_key=True, max_length=64)  # 기본키를 id로 설정
    password = models.CharField(max_length=64)
    email = models.EmailField(null=True, blank=True)
    join_at = models.DateTimeField(auto_now_add=True)
    is_banned = models.BooleanField(default=False)


class Board(models.Model):
    board_id = models.AutoField(primary_key=True)  # 기본키를 id로 설정
    user_id = models.CharField(max_length=64,default='c154447a12edeb3ef2978cfa799389ab089bec95f87e7d0ebfc136d865cf6427')
    title = models.CharField(max_length=100)
    content = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    thumbnail = models.ImageField(upload_to="images/", default="defaultThumbnail.png")

    def __str__(self):
        return f'[{self.board_id}] - {self.title} - {self.create_at.strftime("%Y-%m-%d %H:%M:%S")}'



class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)  # 기본키를 id로 설정
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)  # User 모델을 참조해야 함
    board_id = models.ForeignKey(Board, on_delete=models.CASCADE)  # Board 모델을 참조
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)  # 'create_at' -> 'created_at'
    
    def __str__(self):
        return f'[{self.comment_id}] - {self.content} - {self.created_at.strftime("%Y-%m-%d %H:%M:%S")}'
