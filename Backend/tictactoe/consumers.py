import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async

class TicTacToeConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        from .models import Match
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'tictactoe_{self.room_name}'
        self.status = "waiting"

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Get the match object
        self.match = await self.get_match_count()
        # print("N of matches : ", self.match, " matches id = ", self.room_name)
        if (self.match == 2):
            self.status = "start"
        await self.accept()
        
    @sync_to_async
    def get_match_count(self):
        from .models import Match
        target = Match.objects.get(match_key=self.room_name)
        if (target.player_o is not None and target.player_x is not None):
            return 2
        else:
            return 1

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try:
            # Get the match object
            self.match = await self.get_match_count()
            if (self.match == 2):
                self.status = "start"
            else:
                return
            text_data_json = json.loads(text_data)
            move = int(text_data_json['move'])
            user = int(text_data_json['user'])
            match = await self.get_match()
            event = {
                'player': match.current_turn,
                'user': user,
                'move': move
            }
            error = await self.validate_move(event)
            if error:
                await self.send(text_data=json.dumps(error))
                return

            turn  = match.current_turn
            await self.save_move(match, move, turn)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'player_move',
                    'move': move,
                    'user': user,
                    'player': turn,
                    'winner': self.check_winner(match.board),
                    'status': self.status
                }
            )
            
        except KeyError as e:
            print(f"KeyError: {e} - Invalid message format")
            await self.close()  # Optionally close the connection
        except Exception as e:
            print(f"Unexpected error: {e}")
            await self.close()  # Optionally close the connection

    async def send_board_state(self, match):
        # Send the current board state to the user
        await self.send(text_data=json.dumps({
            'board': match.board,
            'message': 'Current board state loaded',
            'status': self.status
        }))
    
    async def player_move(self, event):
        move = event['move']
        player = event['player']
        winner = event['winner']
        user_ = event['user']

        # Send move to WebSocket
        await self.send(text_data=json.dumps({
            'move': move,
            'player': player,
            'winner': winner,
            'user': user_,
            'status': self.status
        }))

    @sync_to_async
    def get_match(self):
        from .models import Match
        return Match.objects.get(match_key=self.room_name)

    @sync_to_async
    def save_move(self, match, move, player):
        row, col = self.index_to_position(move)  # Convert flat index to (row, col)

        if match.board[row][col] is None:
            match.board[row][col] = player  # 'X' or 'O'
            match.current_turn = 'O' if match.current_turn == 'X' else 'X'  # Switch turn

            # save move to the database
            winner = self.check_winner(match.board)
            if winner and winner != 'Draw':
                match.winner = match.player_x if winner == 'X' else match.player_o
                match.loser = match.player_o if winner == 'X' else match.player_x
            match.save()

    @sync_to_async
    def save_winner(self, match, winner):
        if winner:
            match.winner = match.player_x if winner == 'X' else match.player_o
        match.save()

    async def save_winner(self, winner):
        match = await self.get_match()
        match.winner = winner
        match.save()

    def index_to_position(self, index):
        return divmod(index, 3)  # Converts index into (row, column)
    
    def check_winner(self, board):
        # Define all possible winning combinations
        winning_combinations = [
            # Horizontal combinations
            [(0, 0), (0, 1), (0, 2)],
            [(1, 0), (1, 1), (1, 2)],
            [(2, 0), (2, 1), (2, 2)],

            # Vertical combinations
            [(0, 0), (1, 0), (2, 0)],
            [(0, 1), (1, 1), (2, 1)],
            [(0, 2), (1, 2), (2, 2)],

            # Diagonal combinations
            [(0, 0), (1, 1), (2, 2)],
            [(0, 2), (1, 1), (2, 0)]
        ]

        # Check all winning combinations
        for combo in winning_combinations:
            a, b, c = combo
            if board[a[0]][a[1]] is not None and board[a[0]][a[1]] == board[b[0]][b[1]] == board[c[0]][c[1]]:
                # Return the winner ('X' or 'O')
                self.save_winner(board[a[0]][a[1]])
                return board[a[0]][a[1]]

        # Check if the board is full (draw)
        if all(cell is not None for row in board for cell in row):
            return 'Draw'

        # No winner yet
        return None

    async def game_over(self, event):
        winner = event['winner']
        move = event['move']
        player = event['player']

        await self.send(text_data=json.dumps({
            'move': move,
            'player': player,
            'winner': winner,
            'message': 'Game over',
            'status': self.status
        }))
    
    @sync_to_async
    def validate_move(self, event):
        from .models import Match
        try:
            # Fetch match asynchronously
            match = Match.objects.get(match_key=self.room_name)
            player = event['player']
            user = event['user']
            move = event['move']

            # Debugging: Print values to ensure correctness

            # Check if it's the player's turn
            if user:
                if match.current_turn == 'X' and match.player_x.id != user:
                    print("match.current_turn == 'X' and match.player_x != player")
                    return {
                        'move': move,
                        'player': player,
                        'user': self.scope["user"].id,
                        'error': 'It is not your turn',
                        'status': self.status
                    }
                if match.current_turn == 'O' and match.player_o.id != user:
                    print("match.current_turn == 'O' and match.player_o != player")
                    return {
                        'move': move,
                        'player': player,
                        'user': self.scope["user"].id,
                        'error': 'It is not your turn',
                        'status': self.status
                    }
            # Return None if no errors
            return None
        except Match.DoesNotExist:
            # Handle case where match does not exist
            return {
                'error': 'Match does not exist'
            }

class WaitingPageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # from .models import Match
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'tictactoe_{self.room_name}'
        self.status = "waiting"

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Get the match object
        await self.accept()
        self.match = await self.get_match_count()
        print("N of matches : ", self.match, " matches id = ", self.room_name)
        if (self.match == 2):
            await self.send(text_data=json.dumps({
                'type': 'game_start'
            }))
        self.status = "start"
    
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    @sync_to_async
    def get_match_count(self):
        from .models import Match
        target = Match.objects.get(match_key=self.room_name)
        if (target.player_o is not None and target.player_x is not None):
            return 2
        else:
            return 1
