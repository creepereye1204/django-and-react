
import json
import asyncio
import websockets
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



class DoodleToSketchConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        image_data = data['image']
        prompt = data['prompt']
        negative_prompt = data['negative_prompt']

        # Flask 서버와 WebSocket 연결
        async with websockets.connect('ws://localhost:20004/progress') as websocket:
            await websocket.send(json.dumps({
                'image': image_data,
                'prompt': prompt,
                'negative_prompt': negative_prompt
            }))

            while True:
                response = await websocket.recv()
                response_data = json.loads(response)

                if 'image' not in response_data:
                    await self.send(text_data=json.dumps({
                        'progress': response_data['progress']
                    }))
                else:
                    final_image = response_data['image']
                    await self.send(text_data=json.dumps({
                        'progress': 100,
                        'image': final_image
                    }))
                    break
