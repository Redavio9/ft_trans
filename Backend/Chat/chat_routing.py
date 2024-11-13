from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/is_online/(?P<user_id>\w+)/$', consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/Chat/(?P<room_name>\w+)/$', consumers.MsgConsumer.as_asgi()),
]
