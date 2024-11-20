# routing.py
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/tictactoe/(?P<room_name>\w+)/$', consumers.TicTacToeConsumer.as_asgi()),
]

# # tictactoe/routing.py
# from django.urls import re_path
# from . import consumers

# websocket_urlpatterns = [
#     re_path(r'ws/tictactoe/GameRoom/(?P<game_id>\w+)/$', consumers.TicTacToeConsumer.as_asgi()),
# ]
