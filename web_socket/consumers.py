
import json
import asyncio
import socketio
import websockets
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.generic.websocket import AsyncWebsocketConsumer
import socketio

import json
from channels.generic.websocket import AsyncWebsocketConsumer
import socketio
image_path = '/home/apps/my_wiki/web_socket/img.png'  # 여기에 실제 이미지 파일 경로를 입력하세요.

with open(image_path, 'rb') as image_file:
    image_data = image_file.read()
# Flask-SocketIO 클라이언트 인스턴스 생성
sio = socketio.Client()

class DataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()  # 클라이언트 연결 수락
        sio.connect('http://localhost:20004')  # Flask 서버에 연결

    async def disconnect(self, close_code):
        sio.disconnect()  # Flask 서버 연결 종료

    async def receive(self, text_data):
        
        sio.emit('send_message', 'sss')  # Flask 서버에 데이터 전송
        sio.wait()
    async def handle_datas(self, data):
        # Flask 서버로부터 받은 데이터 처리
        await self.send(text_data=json.dumps({
            'message': data['message']  # 받은 메시지를 클라이언트에게 전송
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
