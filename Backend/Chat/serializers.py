from rest_framework import serializers
from .models import *
from API.models import UserInfo
from API.serializers import UserSerializer

class MessageSerializer(serializers.ModelSerializer):
  sender = UserSerializer(read_only=True)
  receiver = UserSerializer(read_only=True)
  
  class Meta:
    model = Message
    fields = ('id', 'sender', 'receiver', 'content', 'time', 'is_read')
    
class ConversationSerializer(serializers.ModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=UserInfo.objects.all()
    )
  
    class Meta:
        model = Conversation
        fields = ('id', 'participants', 'created_at', 'update_at')

class UserStatusSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  class Meta:
    model = UserStatus
    fields = ('id', 'user', 'is_online', 'last_activite')