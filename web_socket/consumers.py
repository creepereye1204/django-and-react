
import json
import asyncio
import socketio
import websockets
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.generic.websocket import AsyncWebsocketConsumer
import socketio
import base64
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

class SketchToImageConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.flask_sio = socketio.AsyncClient()  # 비동기 클라이언트 인스턴스 생성

    async def connect(self):
        await self.accept()  # 클라이언트 연결 수락
        try:
            # Flask 서버에 연결
            await self.flask_sio.connect('http://localhost:20004')

            # Flask 서버와 연결이 완료된 후에 이벤트 핸들러 등록
            self.flask_sio.on('receive_message', self.handle_receive_message)

            # 이벤트 루프를 대기하여 메시지를 받을 수 있도록 유지
            await self.flask_sio.wait()
        except Exception as e:
            print(f'Error occurred while connecting to Flask server: {e}')
     
    async def disconnect(self, close_code): 
        await self.flask_sio.disconnect()  # Flask 서버 연결 종료

    async def receive(self, text_data):
        # 클라이언트로부터 받은 데이터
        data_from_django = json.loads(text_data)
        data_to_send = {
            'style': data_from_django['style'],
            'file': data_from_django['image'],
            'prompt': data_from_django['prompt'],
            'negative_prompt': data_from_django['negativePrompt'],
        }
        # Flask 서버에 데이터 전송
        await self.flask_sio.emit('upload_image', data_to_send)

    async def handle_receive_message(self, message):
        await self.send_to_client(message)  # 비동기적으로 클라이언트에게 메시지 전송

    async def send_to_client(self, message):
        await self.send(text_data=json.dumps({
            'message': message  # 받은 메시지를 클라이언트에게 전송
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
