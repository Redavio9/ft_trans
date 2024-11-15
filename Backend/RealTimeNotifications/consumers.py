from channels.generic.websocket import AsyncWebsocketConsumer
import json

# Connected users like that {user: channel_name, user: channel_name, ...}
connections = {}


class RealTimeNotificationsConsumer(AsyncWebsocketConsumer):
    # get the username from the url
    async def connect(self):
        user = self.scope['url_route']['kwargs']['id']
        if user not in connections:
            connections[user] = self.channel_name
        await self.accept()
        message = {
            'message': {
                'type': 'online',
                'users': list(connections.keys())
            }
        }
        await self.send(text_data=json.dumps(message))
        
    
    async def disconnect(self, close_code):
        user = self.scope['url_route']['kwargs']['id']
        if user in connections:
            del connections[user]
    
    async def receive(self, text_data):
        user = self.scope['user']
        text_data_json = json.loads(text_data)
        type = text_data_json['type']
        message = text_data_json['message']
        # if type is friend_request, get the reveiver and send the message to him
        receiver = message['receiver']
        if receiver in connections:
            await self.channel_layer.send(
                connections[receiver],
                {
                    'type': 'send_message',
                    'message': {'type': type, 'message': message}
                }
            )


    async def send_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))
