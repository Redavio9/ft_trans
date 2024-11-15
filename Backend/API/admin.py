from django.contrib import admin
from .models import *


admin.site.register(UserInfo)
admin.site.register(UserGameStats)
admin.site.register(GameResults)
admin.site.register(FriendRequests)
admin.site.register(FriendshipLists)
admin.site.register(Chats)
admin.site.register(Conversations)
admin.site.register(Notifications)
