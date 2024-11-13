from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


class MessageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def create(self, request):
        sender_id = request.data.get('sender_id')
        receiver_id = request.data.get('receiver_id')
        roomname = request.data.get('roomname')
        content = request.data.get('content')
        sender = get_object_or_404(UserInfo, id=sender_id)
        receiver = get_object_or_404(UserInfo, id=receiver_id)

        conversation, created = Conversation.objects.get_or_create(
            id=roomname
        )
        # print(conversation, created)
        if created:
            conversation.participants.add(sender, receiver)

        message = Message.objects.create(
            sender=sender, 
            receiver=receiver, 
            content=content, 
            conversation=conversation
        )
        return JsonResponse({"message": "Message envoyé et conversation mise à jour"}, status=status.HTTP_201_CREATED)


# class ConversationViewSet(viewsets.ModelViewSet):
#     queryset = Conversation.objects.all()
#     serializer_class = ConversationSerializer
#     permission_classes = [IsAuthenticated]

#     def create(self, request):
#         print("11111111");
#         participants_ids = request.data.get('participants')
#         roomname = request.data.get('roomname')

#         if not participants_ids or not roomname:
#             print("22222222");
#             return Response({"detail": "Participants and roomname are required."}, status=400)

#         # Check if a conversation with the same roomname and participants already exists
#         existing_conversation = Conversation.objects.filter(id=roomname, participants__id__in=participants_ids).distinct()
        
#         if existing_conversation.exists():
#             print("333333");
#             return Response({"detail": "Conversation with this roomname and participants already exists."}, status=200)

#         # Create a new conversation if it doesn't exist
#         print("44444444444");
#         conversation = Conversation.objects.create(id=roomname)
        
#         for user_id in participants_ids:
#             user = get_object_or_404(UserInfo, id=user_id)
#             conversation.participants.add(user)

#         return Response({"detail": "Conversation created successfully."}, status=201)
    
#     # def get_queryset(self):
#     #     roomname = self.request.query_params.get('roomname')
#     #     print("Roomname:", roomname)
        
#     #     if roomname:
#     #         conversation = Conversation.objects.filter(id=roomname).first()
#     #         print("Conversation:", conversation) 
        
#     #         if conversation:
#     #             messages = Message.objects.filter(conversation=conversation)
#     #             print("Messages:", messages)
#     #             return messages
#     #     return Message.objects.none()

#     # def list(self, request):
#     #     queryset = self.get_queryset()
#     #     serializer = self.get_serializer(queryset, many=True)
#     #     return Response(serializer.data, status=status.HTTP_200_OK)


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request):
        participants_ids = request.data.get('participants')
        roomname = request.data.get('roomname')
        print(roomname)

        if not participants_ids or not roomname:
            return Response({"detail": "Participants and roomname are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if a conversation with this roomname already exists
        conversation = Conversation.objects.filter(id=roomname).first()
        
        if conversation:
            return Response({"detail": "Conversation already exists.", "conversation_id": conversation.id}, status=status.HTTP_200_OK)
        
        # Create a new conversation if it doesn't exist
        conversation = Conversation.objects.create(id=roomname)

        for user_id in participants_ids:
            user = get_object_or_404(UserInfo, id=user_id)
            conversation.participants.add(user)

        return Response({"detail": "Conversation created successfully.", "conversation_id": conversation.id}, status=status.HTTP_201_CREATED)




  
class UserStatsViewSet(viewsets.ModelViewSet):
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
