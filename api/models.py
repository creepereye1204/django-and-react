from django.db import models

class User(models.Model):
    user_id = models.CharField(primary_key=True,max_length=13)  # 기본키를 id로 설정
    password = models.CharField(max_length=20)
    email=models.EmailField()
    join_at=models.DateTimeField(auto_now_add=True)
    is_banned = models.BooleanField(default=False)



class Board(models.Model):
    id = models.AutoField(primary_key=True)  # 기본키를 id로 설정
    title = models.CharField(max_length=100)
    content = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    thumbnail = models.ImageField(
        upload_to="images/", default="defaultThumbnail.png"
    )

    def __str__(self):
        return f'[{self.id}] - {self.title} - {self.create_at.strftime("%Y-%m-%d %H:%M:%S")}'
