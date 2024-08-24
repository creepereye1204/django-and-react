import json
from channels.generic.websocket import AsyncWebsocketConsumer

class DataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()  # 클라이언트 연결 수락

    async def disconnect(self, close_code):
        pass  # 연결 종료 시 추가 처리 로직이 필요할 경우 여기에 작성

    async def receive(self, text_data):
        data = json.loads(text_data)  # 클라이언트로부터 받은 데이터 파싱
        # 받은 데이터를 처리하고 클라이언트에게 전송
        await self.send(text_data=json.dumps({
            'message': data['message']  # 받은 메시지를 그대로 클라이언트에게 전송
        }))
