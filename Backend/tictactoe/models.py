from django.core.exceptions import ValidationError
from django.db import models
from API.models import UserInfo

class Match(models.Model):
    match_key = models.CharField(max_length=10, unique=True, blank=True, null=True)
    player_x = models.ForeignKey(UserInfo, related_name='match_player_x', on_delete=models.CASCADE)
    player_o = models.ForeignKey(UserInfo, related_name='match_player_o', on_delete=models.CASCADE, null=True, blank=True)
    winner = models.ForeignKey(UserInfo, related_name='match_winner', on_delete=models.CASCADE, null=True, blank=True)
    loser = models.ForeignKey(UserInfo, related_name='match_loser', on_delete=models.CASCADE, null=True, blank=True)
    board = models.JSONField(default=dict)  # Stores the game board state
    current_turn = models.CharField(max_length=1, default='X')  # 'X' or 'O'
    created_at = models.DateTimeField(auto_now_add=True)
    isTerminated = models.BooleanField(default=False)
    def clean(self):
        # Prevent the same user from being both player_x and player_o
        if self.player_x == self.player_o:
            raise ValidationError("A user cannot play as both Player X and Player O.")

    def save(self, *args, **kwargs):
        # Call the clean method before saving
        self.clean()
        super().save(*args, **kwargs)

    def initialize_board(self):
        # Initialize the board with None
        self.board = [[None for _ in range(3)] for _ in range(3)]
    def __str__(self):
        return f"Match {self.id} - {self.player_x.username} vs {self.player_o.username if self.player_o else 'waiting'}"
