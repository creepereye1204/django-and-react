from rest_framework import serializers

from .models import Board



class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ('board_id', 'thumbnail','title', 'content')

class BoardListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ('board_id', 'thumbnail','title')
