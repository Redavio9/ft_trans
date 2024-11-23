import json
import math
import random
import time
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer

games = []

Games = {}

class GameConsumer(AsyncWebsocketConsumer):
    users = [] 

    Ball = {
        'x': 950 / 2,
        'y': 500 / 2,
        'radius': 10,
        'speed': 1.00,
        'velocityX': 5,
        'velocityY': 5,
        'color': '#EEEEEE'
    }

    # Define the LeftPlayer object
    LeftPlayer = {
        'x': 0,
        'y': 500 / 2 - 150 / 2,
        'width': 15,
        'height': 150,
        'color': 'red',
        'score': 0
    }

    # Define the RightPlayer object
    RightPlayer = {
        'x': 950 - 15,
        'y': 500 / 2 - 150 / 2,
        'width': 15,
        'height': 150,
        'color': 'red',
        'score': 0
    }

    async def connect(self):
        await self.accept()
        self.append_user()
        # send channel name to the client
        await self.send(text_data=json.dumps({
            'type': 'channel_name',
            'channel_name': self.channel_name,
        }))

    async def disconnect(self, close_code):
        # remove user from the users list
        for user in self.users:
            if self.channel_name in user:
                self.users.remove(user)
                break
        print(self.channel_name, " disconnected " + str(len(self.users)))

    async def receive(self, text_data):
        message = json.loads(text_data)
        # send message to all users
        await self.handleMessage(message)

    async def send_group_message(self, gameName, message):
        await self.channel_layer.group_send(
            gameName,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps(message))

    # function to append user to the users list
    def append_user(self):
        self.users.append({self.channel_name: {'obj': self, 'userInfo': None } })
        print(self.channel_name, " connected " + str(len(self.users)))
    
    async def launchGame(self, gameName):
        for game in games:
            if game['name'] == gameName:
                await self.channel_layer.group_add(gameName, game['users'][0])
                await self.channel_layer.group_add(gameName, game['users'][1])
                firstUser = None
                secondUser = None
                direction = random.choice(['left', 'right'])
                for user in self.users:
                    if game['users'][0] in user:
                        firstUser = user[game['users'][0]]['userInfo']
                        firstUser['direction'] = direction
                    elif game['users'][1] in user:
                        secondUser = user[game['users'][1]]['userInfo']
                        if direction == 'left':
                            secondUser['direction'] = 'right'
                        else:
                            secondUser['direction'] = 'left'
                await self.send_group_message(gameName, {
                    'type': 'game_start',
                    'message': {
                        'firstUser': firstUser,
                        'secondUser': secondUser,
                        'roomName': gameName
                    }
                })
                return

    async def game_start(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'type': 'game_start',
            'message': message
        }))

    # function to get group name
    def getGroupName(self, game):
        print(game)
        user1Id = game['users'][0].split('_')[1]
        return game['users'][0] + game['users'][1]
        
    # function to handle join players
    async def handleJoin(self, message):
        # set user info to user object
        for user in self.users:
            if self.channel_name in user:
                user[self.channel_name]['userInfo'] = message['user']
                print(user[self.channel_name]['userInfo'])
                break
        
        # join user to the game
        for game in games:
            if game['free'] == True:
                # check first one is still connected
                for user in self.users:
                    if game['users'][0] in user:
                        game['users'].append(self.channel_name)
                        game['free'] = False
                        # game['name'] = self.getGroupName(game)
                        game['name'] = game['users'][0].split('!')[1] + game['users'][1].split('!')[1]
                        await self.launchGame(game['name'])
                        return

        # create new game
        games.append({'users': [self.channel_name], 'free': True, 'name': ''})
    
    # function to handle user messages
    async def handleMessage(self, message):
        messageType = message['type']

        if messageType == 'join':
            await self.handleJoin(message)
        elif (messageType == 'game_update'):
            await self.update(message)
        elif (messageType == 'move_player'):
            if (message['direction'] == 'left'):
                self.LeftPlayer['y'] = message['y']
            else:
                self.RightPlayer['y'] = message['y']
            self.update(message)
    
    
    canvas = {
        'width': 950,
        'height': 500
    }

    SPEED = 0.01
    BALL_START_SPEED = 0.05
    WINNING_SCORE = 3
    BALL_MAX_SPEED = 5

    async def update(self, message):

        # Calculate the new position
        new_x = self.Ball['x'] + self.Ball['velocityX'] * self.Ball['speed']
        new_y = self.Ball['y'] + self.Ball['velocityY'] * self.Ball['speed']

        # Check for collisions with top and bottom walls
        if new_y + self.Ball['radius'] > self.canvas['height'] or new_y - self.Ball['radius'] < 0:
            self.Ball['velocityY'] = -self.Ball['velocityY']
            new_y = self.Ball['y'] + self.Ball['velocityY'] * self.Ball['speed']  # Recalculate new_y

        # Determine which player to check for collision
        player = self.LeftPlayer if new_x < self.canvas['width'] / 2 else self.RightPlayer

        # Check for collision with player paddle
        if self.line_rect(self.Ball['x'], self.Ball['y'], new_x, new_y, 
                    player['x'], player['y'], player['width'], player['height']):
            
            # Collision occurred, handle it
            collide_point = self.Ball['y'] - (player['y'] + player['height'] / 2)
            collide_point = collide_point / (player['height'] / 2)

            angle_rad = collide_point * math.pi / 4

            direction = 1 if self.Ball['x'] < self.canvas['width'] / 2 else -1

            self.Ball['velocityX'] = direction * self.Ball['speed'] * math.cos(angle_rad) * 8
            self.Ball['velocityY'] = self.Ball['speed'] * math.sin(angle_rad) * 8
            
            if self.Ball['speed'] < self.BALL_MAX_SPEED:
                self.Ball['speed'] += self.SPEED

            # Update new_x and new_y based on new velocities
            new_x = self.Ball['x'] + self.Ball['velocityX']
            new_y = self.Ball['y'] + self.Ball['velocityY']

        # Update ball position
        self.Ball['x'] = new_x
        self.Ball['y'] = new_y

        # Check for scoring
        if self.Ball['x'] - self.Ball['radius'] < 0:
            if self.RightPlayer['score'] == self.WINNING_SCORE - 1:
                self.RightPlayer['score'] += 1
                await self.send_group_message(message['roomName'], {
                    'type': 'game_over',
                    'message': {
                        'winner': 'Right Player'
                    }
                })
                return
            self.RightPlayer['score'] += 1
            await self.reset_ball(self.Ball, message)
        elif self.Ball['x'] + self.Ball['radius'] > self.canvas['width']:
            if self.LeftPlayer['score'] == self.WINNING_SCORE - 1:
                self.LeftPlayer['score'] += 1
                await self.send_group_message(message['roomName'], {
                    'type': 'game_over',
                    'message': {
                        'winner': 'Left Player'
                    }
                })
                return
            self.LeftPlayer['score'] += 1
            await self.reset_ball(self.Ball, message)
        await self.send_group_message(message['roomName'], {
            'type': 'game_update',
            'message': {
                'ball': self.Ball,
                'leftPlayer': self.LeftPlayer,
                'rightPlayer': self.RightPlayer
            }
        })

    def line_rect(self, x1, y1, x2, y2, rx, ry, rw, rh):
        # Check if the line has hit any of the rectangle's sides
        # uses the line_line function (assumed to be defined elsewhere)
        left = self.line_line(x1, y1, x2, y2, rx, ry, rx, ry + rh)
        right = self.line_line(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh)
        top = self.line_line(x1, y1, x2, y2, rx, ry, rx + rw, ry)
        bottom = self.line_line(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh)

        # If ANY of the above are true, the line has hit the rectangle
        if left or right or top or bottom:
            return True
        return False
    
    def line_line(self, x1, y1, x2, y2, x3, y3, x4, y4):
        # Calculate the direction of the lines
        denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
        
        # Check if lines are parallel (denominator == 0)
        if denominator == 0:
            return False
        
        u_a = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
        u_b = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

        # If uA and uB are between 0-1, lines are colliding
        if 0 <= u_a <= 1 and 0 <= u_b <= 1:
            return True
        return False
    
    async def reset_ball(self, Ball, message):
        Ball['x'] = self.canvas['width'] / 2
        Ball['y'] = self.canvas['height'] / 2
        Ball['velocityX'] = -Ball['velocityX']
        Ball['velocityY'] = -Ball['velocityY']
        Ball['speed'] = 0

        # time.sleep(3)
        Ball['speed'] = self.BALL_START_SPEED
        await self.send_group_message(message['roomName'], {
            'type': 'game_update',
            'message': {
                'ball': Ball,
                'leftPlayer': message['leftPlayer'],
                'rightPlayer': message['rightPlayer']
            }
        })

class PlayConsumer(AsyncWebsocketConsumer):
    canvas = {
        'width': 950,
        'height': 500
    }
    BallTmp = {
        'x': 950 / 2,
        'y': 500 / 2,
        'radius': 10,
        'speed': 1,
        'velocityX': 5,
        'velocityY': 5,
        'color': '#EEEEEE'
    }

    # Define the LeftPlayer object
    LeftPlayerTmp = {
        'x': 0,
        'y': 500 / 2 - 150 / 2,
        'width': 15,
        'height': 150,
        'color': 'red',
        'score': 0
    }

    # Define the RightPlayer object
    RightPlayerTmp = {
        'x': 950 - 15,
        'y': 500 / 2 - 150 / 2,
        'width': 15,
        'height': 150,
        'color': 'red',
        'score': 0
    }

    SPEED = 0.01
    WINNING_SCORE = 3
    BALL_MAX_SPEED = 5

    async def connect(self):
        # get the roomName from the url
        self.room_name = self.scope['url_route']['kwargs']['room_name']

        # add the channel name to the Games dictionary
        if self.room_name not in Games:
            Games[self.room_name] = [self.channel_name]
        else:
            Games[self.room_name].append(self.channel_name)

        # add the channel to the group
        await self.channel_layer.group_add(
            self.room_name,
            self.channel_name
        )

        # accept the connection
        await self.accept()

        # check if the room has 2 players, if so, then start the game function every 0.1 seconds without block the main thread
        if len(Games[self.room_name]) == 2:
            # set the game status to True, so the game function will run
            self.gameStatus = True

            # start the game function in a new thread
            Games[self.room_name].append({'Ball': self.BallTmp, 'LeftPlayer': self.LeftPlayerTmp, 'RightPlayer': self.RightPlayerTmp})
            # print Games ball and players
            print(Games[self.room_name][-1]['Ball'])
            await self.send_group_message(self.room_name, {
                'type': 'game_start',
            })
        
    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        message = json.loads(text_data)
        if message['type'] == 'game_update':
            await self.game(message)
        elif message['type'] == 'move_player':
            await self.move_player(message)

    async def send_group_message(self, gameName, message):
        await self.channel_layer.group_send(
            gameName,
            {
                'type': 'chat_message',
                'message': message
            }
        )
    
    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps(message))

    
    def run_async_game(self):
        asyncio.run(self.game())
    
    async def game(self, message):
        Ball = message['ball']
        LeftPlayer = message['leftPlayer']
        RightPlayer = message['rightPlayer']
        
        new_x = Ball['x'] + Ball['velocityX'] * Ball['speed']
        new_y = Ball['y'] + Ball['velocityY'] * Ball['speed']

        # Check for collisions with top and bottom walls
        if new_y + Ball['radius'] > self.canvas['height'] or new_y - Ball['radius'] < 0:
            Ball['velocityY'] = -Ball['velocityY']
            new_y = Ball['y'] + Ball['velocityY'] * Ball['speed']  # Recalculate new_y

        # Determine which player to check for collision
        player = LeftPlayer if new_x < self.canvas['width'] / 2 else RightPlayer

        # Check for collision with player paddle
        if self.line_rect(Ball['x'], Ball['y'], new_x, new_y, 
                    player['x'], player['y'], player['width'], player['height']):
            
            # Collision occurred, handle it
            collide_point = Ball['y'] - (player['y'] + player['height'] / 2)
            collide_point = collide_point / (player['height'] / 2)

            angle_rad = collide_point * math.pi / 4

            direction = 1 if Ball['x'] < self.canvas['width'] / 2 else -1

            Ball['velocityX'] = direction * Ball['speed'] * math.cos(angle_rad) * 8
            Ball['velocityY'] = Ball['speed'] * math.sin(angle_rad) * 8
            
            if Ball['speed'] < self.BALL_MAX_SPEED:
                Ball['speed'] += self.SPEED

            # Update new_x and new_y based on new velocities
            new_x = Ball['x'] + Ball['velocityX']
            new_y = Ball['y'] + Ball['velocityY']

        # Update ball position
        Ball['x'] = new_x
        Ball['y'] = new_y

        # Check for scoring
        if Ball['x'] - Ball['radius'] < 0:
            if RightPlayer['score'] == self.WINNING_SCORE - 1:
                RightPlayer['score'] += 1
                await self.send_group_message(message['roomName'], {
                    'type': 'game_over',
                    'winner': 'right'
                })
                # del Games[message['roomName']]
                # remove the channel from the group and from the Games dictionary
                return
            RightPlayer['score'] += 1
            Ball['speed'] = 1
            await self.send_group_message(message['roomName'], {
                'type': 'reset_ball',
                'ball': Ball,
                'leftPlayer': LeftPlayer,
                'rightPlayer': RightPlayer
            })
            return 
        elif Ball['x'] + Ball['radius'] > self.canvas['width']:
            if LeftPlayer['score'] == self.WINNING_SCORE - 1:
                LeftPlayer['score'] += 1
                await self.send_group_message(message['roomName'], {
                    'type': 'game_over',
                    'winner': 'left'
                })
                return
            LeftPlayer['score'] += 1
            Ball['speed'] = 1
            await self.send_group_message(message['roomName'], {
                'type': 'reset_ball',
                'ball': Ball,
                'leftPlayer': LeftPlayer,
                'rightPlayer': RightPlayer
            })
            return
        await self.send_group_message(message['roomName'], {
            'type': 'game_update',
            'ball': Ball,
            'leftPlayer': LeftPlayer,
            'rightPlayer': RightPlayer
        })

    def line_rect(self, x1, y1, x2, y2, rx, ry, rw, rh):
        # Check if the line has hit any of the rectangle's sides
        # uses the line_line function (assumed to be defined elsewhere)
        left = self.line_line(x1, y1, x2, y2, rx, ry, rx, ry + rh)
        right = self.line_line(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh)
        top = self.line_line(x1, y1, x2, y2, rx, ry, rx + rw, ry)
        bottom = self.line_line(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh)

        # If ANY of the above are true, the line has hit the rectangle
        if left or right or top or bottom:
            return True
        return False
        
    def line_line(self, x1, y1, x2, y2, x3, y3, x4, y4):
        # Calculate the direction of the lines
        denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
        
        # Check if lines are parallel (denominator == 0)
        if denominator == 0:
            return False
        
        u_a = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
        u_b = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

        # If uA and uB are between 0-1, lines are colliding
        if 0 <= u_a <= 1 and 0 <= u_b <= 1:
            return True
        return False
    
        


