from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.

# Modele Joueur
class Player(models.Model):
    name = models.CharField(max_length=100)
    # email = models.EmailField(unique=True)
    # email = models.EmailField(unique=True, null=True, blank=True)

    def __str__(self):
        return self.name
    
# Modele Tournoi
class Tournament(models.Model):
    name = models.CharField(max_length=100)
    max_players = models.IntegerField(default=8)
    players = models.ManyToManyField(Player, through='TournamentPlayer')
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='waiting') # waiting, ongoing, finished
    current_round = models.IntegerField(default=1)

    def __str__(self):
        return self.name
    
# modele de la relation entre le Tournoi et le Joueur
class TournamentPlayer(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    # joined_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ('player', 'tournament')

    def clean(self):
        # Vérifier le nombre de joueurs déjà inscrits au tournoi
        if self.tournament.tournamentplayer_set.count() >= 8:
            raise ValidationError('Un tournoi ne peut pas avoir plus de 8 joueurs.')

    def save(self, *args, **kwargs):
        # Appeler la méthode clean avant de sauvegarder l'objet
        self.clean()
        super().save(*args, **kwargs)


# Modele Match
class Match(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    player1 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player1')
    player2 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player2')
    winner = models.ForeignKey(Player, null=True, blank=True, on_delete=models.CASCADE)
    round_number = models.IntegerField() # 1 = quart de finale, 2 = demi-finale, etc.
    played_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.player1} vs {self.player2} in {self.tournament}'