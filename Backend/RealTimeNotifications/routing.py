from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/realtimenotifications/(?P<id>[\w-]+)/$', consumers.RealTimeNotificationsConsumer.as_asgi()),
]
