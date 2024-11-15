import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from API.models import UserInfo
from .models import UserStatus
from asgiref.sync import sync_to_async

import logging
logger = logging.getLogger(__name__)

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        logger.info("Connecting to WebSocket")
        user = self.scope['user']
        user_id = self.scope['url_route']['kwargs']['user_id']
        user =  await sync_to_async(UserInfo.objects.get)(id=user_id)
        self.room_name = f'room{user_id}'
        self.room_group_name = f'chat_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        user = await database_sync_to_async(UserInfo.objects.get)(id=user_id)
        print(user)
        await self.update_user_status(user, True)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'user_status_update',
                'user_id': user.id,
                'is_online': True
            }
        )
    async def receive(self, text_data):
        print(json.loads(text_data))
    async def disconnect(self, close_code):
        logger.info("Disconnecting from WebSocket")
        user_id = self.scope['url_route']['kwargs']['user_id']
        user = await database_sync_to_async(UserInfo.objects.get)(id=user_id)
        await self.update_user_status(user, False)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'user_status_update',
                'user_id': user.id,
                'is_online': False
            }
        )
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    @database_sync_to_async
    def update_user_status(self, user, is_online):
        UserStatus.objects.update_or_create(user=user, defaults={'is_online': is_online})

    async def user_status_update(self, event):
        logger.info(f"Received user_status_update: {event}")
        print('user_status_update called')
        
        user_id = event['user_id']
        is_online = event['is_online']
        await self.send(text_data=json.dumps({
            'type': 'user_status',
            'user_id': user_id,
            'is_online': is_online
        }))

class MsgConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # print(self.scope)
        logger.info("Connecting to WebSocket")
        user = self.scope['user']
        room_name = self.scope['url_route']['kwargs']['room_name']
        print(room_name)
        self.room_name = f'room{room_name}'
        self.room_group_name = f'chat_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
    

    async def receive(self, text_data):
        print("Received message:", text_data)
        data = json.loads(text_data)
        message = data['message']
        id = data['user_id']

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'id' : id
            }
        )

    async def chat_message(self, event):
        message = event['message']
        id = event['id']
        await self.send(text_data=json.dumps({
            'message': message,
            'id' : id
        }))
