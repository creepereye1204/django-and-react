import random
import string

from django.db import models


class Board(models.Model):

    title = models.CharField(max_length=100)
    content = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    thumbnail = models.ImageField(
        upload_to="images/", default="defaultThumbnail.png")

    def __str__(self):
        return f'[{self.pk}] - {self.title} - {self.create_at.strftime("%Y-%m-%d %H:%M:%S")}'
