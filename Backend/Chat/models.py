from django.db import models
from API.models import UserInfo

class Message(models.Model):
  sender = models.ForeignKey(UserInfo, related_name='sender', on_delete=models.CASCADE)
  receiver = models.ForeignKey(UserInfo, related_name='receiver', on_delete=models.CASCADE)
  content = models.TextField()
  time = models.DateTimeField(auto_now_add=True)
  is_read = models.BooleanField(default=False)


class Conversation(models.Model):
  participants = models.ManyToManyField(UserInfo)
  created_at = models.DateTimeField(auto_now_add=True)
  update_at = models.DateTimeField(auto_now_add=True)
  
class UserStatus(models.Model):
  user = models.OneToOneField(UserInfo, on_delete=models.CASCADE)
  is_online =models.BooleanField(default=False)
  last_activite = models.DateTimeField(auto_now_add=True)

  def __str__(self) -> str:
        return f"{self.user.username}, {self.is_online}"