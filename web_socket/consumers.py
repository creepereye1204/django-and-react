
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

# Flask-SocketIO 클라이언트 인스턴스 생성
flask_sio = socketio.Client()

import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
import socketio

# Flask-SocketIO 클라이언트 인스턴스 생성
import json
import socketio
from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
import requests

def get_bible(question):
    url = "http://localhost:5000/chat"
    data = {
        "question": question
    }

    response = requests.post(url, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        raise response.text

import ollama
# # Flask-SocketIO 클라이언트 인스턴스 생성
# class SketchToImageConsumer(AsyncWebsocketConsumer):
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.flask_sio = socketio.Client()

#     async def connect(self):
#         await self.accept()
#         try:
#             self.flask_sio.connect('http://localhost:20004')
#             self.flask_sio.on('datas', self.handle_receive_message)
#         except Exception as e:
#             print(f'에러남: {e}')
#             await self.close()

#     async def disconnect(self, close_code):
#         self.flask_sio.disconnect()

#     async def receive(self, text_data):
#         data_from_django = json.loads(text_data)
#         self.flask_sio.emit('upload_image', {
#             'style': data_from_django['style'],
#             'file': data_from_django['image'],
#             'prompt': data_from_django['prompt'],
#             'negative_prompt': data_from_django['negativePrompt'],
#         })

#     async def handle_receive_message(self, message):
#         await self.send_to_client(message)

#     async def send_to_client(self, message):
#         await self.send(text_data=json.dumps({'message': message}))






class SketchToImageConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        
        super().__init__(*args, **kwargs)
        self.flask_sio = socketio.Client()
        self.tasks = []  # 태스크를 저장할 리스트

    async def connect(self):
        await self.accept()  # 클라이언트 연결 수락
        try:
            # Flask 서버에 연결
            self.flask_sio.connect('http://localhost:5001')

            # Flask 서버와 연결이 완료된 후에 이벤트 핸들러 등록
            self.flask_sio.on('datas', self.handle_receive_message) # 받으려는 이벤트의 이름을 등록해야함!!!!!!
        except Exception as e:
            print(f'Error occurred while connecting to Flask server: {e}')
     
    async def disconnect(self, close_code): 
        self.flask_sio.disconnect()  # Flask 서버 연결 종료
        await self.cancel_tasks()  # 연결 종료 시 모든 태스크 취소

    async def receive(self, text_data):
        # 클라이언트로부터 받은 데이터
        data_from_django = json.loads(text_data)
        data_from_django={
            'style':data_from_django['style'],
            'file': data_from_django['image'],
            'prompt':data_from_django['prompt'],
            'negative_prompt': data_from_django['negativePrompt'],
        }
        # Flask 서버에 데이터 전송
        self.flask_sio.emit('upload_image', data_from_django)

    def handle_receive_message(self, message):
   
        asyncio.run(self.send_to_client(message))  # 비동기적으로 클라이언트에게 메시지 전송

    async def send_to_client(self, message):
        await self.send(text_data=json.dumps({
            'message': message  # 받은 메시지를 클라이언트에게 전송
        }))
         # 현재 태스크를 안전하게 제거
        current_task = asyncio.current_task()
        if current_task in self.tasks:
            self.tasks.remove(current_task)  # 완료된 태스크 제거 # 완료된 태스크 제거

    async def cancel_tasks(self):
        # 모든 태스크 취소
        for task in self.tasks:
            task.cancel()
        self.tasks.clear()
        
        



class BibleBot(AsyncWebsocketConsumer):
    

    async def connect(self):
        await self.accept()
        
     
    async def disconnect(self, close_code): 
        await self.cancel_tasks() 
        

    async def receive(self, text_data):
        import time
        data = json.loads(text_data)
        question = data.get('message')
        

        try:
            
            paragraph=get_bible(question)
            
            stream=ollama.chat(model='priest_v3',stream=True,messages=[
            {
                'role': 'user',
                'content': f"상황:'{question}',성경구절:'{paragraph}' , (한글로 대답)",
            },
            ])
            for text in stream:
                await self.send(text_data=json.dumps({
                    'message': text['message']['content']
                }))
                await time.sleep(0.1)
                
                
                
             
        except Exception as e:
                await self.send(text_data=json.dumps({
                'message': f'에러 발생: {str(e)}'
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
