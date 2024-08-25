
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
import json
import socketio
from channels.generic.websocket import AsyncWebsocketConsumer

# Flask-SocketIO 클라이언트 인스턴스 생성
flask_sio = socketio.Client()

class DataConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.tasks = []  # 태스크를 저장할 리스트

    async def connect(self):
        await self.accept()  # 클라이언트 연결 수락

        # Flask 서버에 연결
        flask_sio.connect('http://localhost:20004')

        # Flask 서버와 연결이 완료된 후에 이벤트 핸들러 등록
        flask_sio.on('receive_message', self.handle_receive_message)

    async def disconnect(self, close_code):
        flask_sio.disconnect()  # Flask 서버 연결 종료
        await self.cancel_tasks()  # 연결 종료 시 모든 태스크 취소

    async def receive(self, text_data):
        # 클라이언트로부터 받은 데이터
        data = json.loads(text_data)

        # Flask 서버에 데이터 전송
        flask_sio.emit('send_message', data)

    def handle_receive_message(self, message):
        # Flask 서버로부터 받은 데이터 처리
        task = asyncio.create_task(self.send_to_client(message))
        self.tasks.append(task)  # 생성된 태스크를 리스트에 추가

    async def send_to_client(self, message):
        # 클라이언트에게 메시지 전송
        await self.send(text_data=json.dumps({
            'message': message  # 받은 메시지를 클라이언트에게 전송
        }))
        self.tasks.remove(asyncio.current_task())  # 완료된 태스크 제거

    async def cancel_tasks(self):
        # 모든 태스크 취소
        for task in self.tasks:
            task.cancel()
        self.tasks.clear()  # 태스크 리스트 초기화





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
