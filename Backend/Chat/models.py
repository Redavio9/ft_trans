from django.db import models
from API.models import UserInfo


class Conversation(models.Model):
    roomname = models.CharField(max_length=500)
    participants = models.ManyToManyField(UserInfo)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return f"Conversation entre {', '.join([participant.username for participant in self.participants.all()])}"

    def get_messages(self):
        return self.messages

class Message(models.Model):
    sender = models.ForeignKey(UserInfo, related_name='sender', on_delete=models.CASCADE)
    receiver = models.ForeignKey(UserInfo, related_name='receiver', on_delete=models.CASCADE)
    content = models.TextField()
    time = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE)



  
class UserStatus(models.Model):
  user = models.OneToOneField(UserInfo, on_delete=models.CASCADE)
  is_online =models.BooleanField(default=False)
  last_activite = models.DateTimeField(auto_now_add=True)

  def __str__(self) -> str:
        return f"{self.user.username}, {self.is_online}"
