from django.contrib.auth.models import AbstractUser
from django.db import models

class UserInfo(AbstractUser):

    user_GENDER = [
        ('M', 'M'),
        ('F', 'F'),
        ('N', 'N'),
    ]

    avatar = models.ImageField(upload_to = 'avatars/', null = True, blank = True)
    gender = models.CharField(max_length=2, choices = user_GENDER, null = True, default = 'N')
    is_verified = models.BooleanField(default = False, null = False)
    two_fa = models.BooleanField(default = False, null = False)
    otp_code = models.CharField(max_length = 6, null = True, blank = True)
    otp_time = models.DateTimeField(blank = True, null = True)
    password = models.CharField(max_length = 128, null = True, blank = True)

    class Meta:
        
        db_table = 'UserInfo'
        verbose_name = 'UserInfo'
        verbose_name_plural = 'UserInfo'
    
    USERNAME_FIELD = "username"
    read_only_fields = ['id']
    constraints = [
        models.UniqueConstraint(fields = ['email'], name = 'unique_email')
    ]
    def __str__(self) -> str:
        return f"{self.username}"
    
    def get_full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"
    
    def get_total_friends(self) -> int:
        return FriendshipLists.objects.filter(user = self).count()

class UserGameStats(models.Model):

    RANK_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Amateur', 'Amateur'),
        ('Semi-Pro', 'Semi-Pro'),
        ('Pro', 'Pro'),
        ('World Class', 'World Class'),
        ('Legendary', 'Legendary'),
        ('Ultimate', 'Ultimate'),
    ]

    user_id = models.ForeignKey(UserInfo, on_delete = models.CASCADE, null = False, related_name = 'game_stats')
    level = models.IntegerField(default = 0, null = False)
    rank = models.CharField(max_length = 20, choices = RANK_CHOICES, default = 'Beginner', null = False)
    won_games = models.IntegerField(default = 0, null = False)
    lost_games = models.IntegerField(default = 0, null = False)
    draw_games = models.IntegerField(default = 0, null = False)
    won_tournaments = models.IntegerField(default = 0, null = False)
    total_tournaments = models.IntegerField(default = 0, null = False)
    experience_points = models.IntegerField(default = 0, null = False)

    class Meta:
        
        db_table = 'UserGameStats'
        verbose_name = 'UserGameStats'
        verbose_name_plural = 'UserGameStats'
    
    def __str__(self) -> str:
        return f"{self.user_id.username}"
    
    def get_win_rate(self) -> float:
        total_games = self.won_games + self.lost_games + self.draw_games
        if total_games == 0:
            return 0
        return format((self.won_games / total_games) * 100, '.2f')
    
    def get_draw_rate(self) -> float:
        total_games = self.won_games + self.lost_games + self.draw_games
        if total_games == 0:
            return 0
        return format((self.draw_games / total_games) * 100, '.2f')
    
    def get_loss_rate(self) -> float:
        total_games = self.won_games + self.lost_games + self.draw_games
        if total_games == 0:
            return 0
        return format((self.lost_games / total_games) * 100, '.2f')
    
    def get_total_games_played(self) -> int:
        return self.won_games + self.lost_games + self.draw_games


class GameResults(models.Model):

    player_1 = models.ForeignKey(UserInfo, on_delete = models.CASCADE, null = False, related_name = 'winner')
    player_2 = models.ForeignKey(UserInfo, on_delete = models.CASCADE, null = False, related_name = 'loser')
    score_1 = models.IntegerField(default = 0, null = False)
    score_2 = models.IntegerField(default = 0, null = False)
    game_date = models.DateTimeField(auto_now_add = True)
    is_draw = models.BooleanField(default = False, null = False)
    game_id = models.AutoField(primary_key = True)

    class Meta:
        
        db_table = 'GameResults'
        verbose_name = 'GameResults'
        verbose_name_plural = 'GameResults'
        indexes = [
            models.Index(fields = ['player_1', 'player_2'])
        ]
    
    def __str__(self) -> str:
        return f"{self.player_1.username}, {self.player_2.username}"

class FriendRequests(models.Model):

    REQUEST_STATUS = {
        ('P', 'P'),
        ('A', 'A'),
        ('D', 'D'),
        ('U', 'U'),
    }

    sender = models.ForeignKey(UserInfo, on_delete = models.CASCADE, null = False, related_name = 'sent_requests')
    receiver = models.ForeignKey(UserInfo, on_delete = models.CASCADE, null = False, related_name = 'friend_requests')
    request_status = models.CharField(max_length = 20, choices = REQUEST_STATUS, default = 'Pending', null = False)
    friend_request_id = models.AutoField(primary_key = True)
    request_date = models.DateTimeField(auto_now_add = True)

    class Meta:
            
            db_table = 'FriendRequests'
            verbose_name = 'FriendRequests'
            verbose_name_plural = 'FriendRequests'

            indexes = [
                models.Index(fields = ['sender', 'receiver'])
            ]
    
    def __str__(self) -> str:
        return f"{self.sender.username}, {self.receiver.username}"

class FriendshipLists(models.Model):

    user = models.ForeignKey(UserInfo, on_delete = models.CASCADE, null = False, related_name = 'friends')
    friend = models.ForeignKey(UserInfo, on_delete = models.CASCADE, null = False, related_name = 'users')
    friendship_date = models.DateTimeField(auto_now_add = True)
    friendship_id = models.AutoField(primary_key = True)

    class Meta:
        
        db_table = 'FriendshipList'
        verbose_name = 'FriendshipList'
        verbose_name_plural = 'FriendshipList'
        unique_together = ('user', 'friend')

        indexes = [
            models.Index(fields = ['user', 'friend'])
        ]
    
    def __str__(self):
        return f"{self.user.username}, {self.friend.username}"

class Chats(models.Model):

    CHAT_STATUS = [
        ('chatted', 'chatted'),
        ('not_chatted', 'not_chatted'),
    ]
    user_1_id = models.ForeignKey(UserInfo, on_delete = models.CASCADE, null = False, related_name = 'user_1_instance')
    user_2_id = models.ForeignKey(UserInfo, on_delete = models.CASCADE, null = False, related_name = 'user_2_instance')
    chat_status = models.CharField(max_length = 20, choices = CHAT_STATUS, default = 'not_chatted', null = False)
    chat_id = models.AutoField(primary_key = True)

    class Meta:
        
        db_table = 'Chat'
        verbose_name = 'Chat'
        verbose_name_plural = 'Chat'
        unique_together = ('user_1_id', 'user_2_id')

        indexes = [
            models.Index(fields = ['user_1_id', 'user_2_id'])
        ]
    
    def __str__(self) -> str:
        return f"{self.user_1_id.username},{self.user_2_id.username}"
    
    def create_conversation(self, sender_id: int, receiver_id: int, message_content: str) -> 'Conversation':
        if self.chat_status == 'not_chatted':
            self.chat_status = 'chatted'
            self.save()
            return Conversations.objects.create(sender_id = sender_id, receiver_id = receiver_id, message_content = message_content)



class Conversations(models.Model):
    sender_id = models.ForeignKey(UserInfo, on_delete = models.CASCADE, null = False, related_name = 'message_sender')
    receiver_id = models.ForeignKey(UserInfo, on_delete = models.CASCADE, null = False, related_name = 'message_receiver')
    message_content = models.TextField(null = False)
    message_date = models.DateTimeField(auto_now_add = True)
    message_id = models.AutoField(primary_key = True)

    class Meta:
        
        db_table = 'Conversation'
        verbose_name = 'Conversation'
        verbose_name_plural = 'Conversation'
        indexes = [
            models.Index(fields = ['sender_id', 'receiver_id'])
        ]
    
    def __str__(self) -> str:
        return f"{self.sender_id.username}, {self.receiver_id.username}"

class Notifications(models.Model):

    NOTIFICATION_TYPE = [
        ('Friend Request', 'Friend Request'),
        ('Game Request', 'Game Request'),
        ('Game Result', 'Game Result'),
        ('Chat', 'Chat'),
        ('Tournament', 'Tournament'),
    ]

    user_id = models.ForeignKey(UserInfo, on_delete = models.CASCADE, null = False, related_name = 'user_notification')
    notification_type = models.CharField(max_length = 20, choices = NOTIFICATION_TYPE, null = False)
    notification_content = models.TextField(null = False)
    notification_date = models.DateTimeField(auto_now_add = True)
    notification_id = models.AutoField(primary_key = True)
    notification_is_read = models.BooleanField(default = False, null = False)

    class Meta:
        
        db_table = 'Notification'
        verbose_name = 'Notification'
        verbose_name_plural = 'Notification'
    
    def __str__(self) -> str:
        return f"{self.user_id.username}"
