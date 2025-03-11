from django.db import models


class User(models.Model):
    user_id = models.CharField(primary_key=True, max_length=64)  # 기본키를 id로 설정
    password = models.CharField(max_length=64)
    email = models.EmailField(null=True, blank=True)
    join_at = models.DateTimeField(auto_now_add=True)
    is_banned = models.BooleanField(default=False)


class Board(models.Model):
    id = models.AutoField(primary_key=True)  # 기본키를 id로 설정
    user_id = models.CharField(max_length=64,default='c154447a12edeb3ef2978cfa799389ab089bec95f87e7d0ebfc136d865cf6427')
    title = models.CharField(max_length=100)
    content = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    thumbnail = models.ImageField(upload_to="images/", default="defaultThumbnail.png")

    def __str__(self):
        return f'[{self.id}] - {self.title} - {self.create_at.strftime("%Y-%m-%d %H:%M:%S")}'


# class Comment(models.Model):
#     comment_id = models.AutoField  # 기본키를 id로 설정
#     pass
