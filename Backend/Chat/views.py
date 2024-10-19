from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from django.http import JsonResponse
from rest_framework.decorators import action



class messageviewset(viewsets.ModelViewSet):
  queryset = Message.objects.all()
  serializer_class = MessageSerializer
  
class conversationviewset(viewsets.ModelViewSet):
  queryset = Conversation.objects.all()
  serializer_class = ConversationSerializer
  
class userstatsviewset(viewsets.ModelViewSet):
  queryset = UserStatus.objects.all()
  serializer_class = UserStatusSerializer
  
  @action(detail=True, methods=['GET'])
  def status(self, request, pk=None):
      try:
        user_status = UserStatus.objects.get(user_id=pk)
        serializer = self.get_serializer(user_status)
        return JsonResponse(serializer.data)
      except UserStatus.DoesNotExist:
        return JsonResponse({"detail": "UserStatus not found."}, status=404)