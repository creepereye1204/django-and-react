# myapp/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class DataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        # 받은 데이터를 처리하고 클라이언트에게 전송
        await self.send(text_data=json.dumps({
            'message': data['message']
        }))
