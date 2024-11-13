from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Player, Tournament, Match

class TournamentTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.player1 = Player.objects.create(name="Alice", email="alice@example.com")
        self.player2 = Player.objects.create(name="Bob", email="bob@example.com")
        self.tournament = Tournament.objects.create(name="Spring Championship", max_players=2)

def test_join_tournament(self):
    response = self.client.post(f'/tournaments/{self.tournament.id}/join/', {'player_id': self.player1.id})
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(self.tournament.players.count(), 1)

def test_start_tournament(self):
    # Joindre les joueurs
    self.client.post(f'/tournaments/{self.tournament.id}/join/', {'player_id': self.player1.id})
    self.client.post(f'/tournaments/{self.tournament.id}/join/', {'player_id': self.player2.id})
    
    # Démarrer le tournoi
    response = self.client.post(f'/tournaments/{self.tournament.id}/start_tournament/')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(self.tournament.status, 'ongoing')
    self.assertEqual(Match.objects.filter(tournament=self.tournament).count(), 1)

def test_generate_next_round(self):
    # Préparer le tournoi
    self.client.post(f'/tournaments/{self.tournament.id}/join/', {'player_id': self.player1.id})
    self.client.post(f'/tournaments/{self.tournament.id}/join/', {'player_id': self.player2.id})
    self.client.post(f'/tournaments/{self.tournament.id}/start_tournament/')
    
    # Définir le gagnant du premier match
    match = Match.objects.first()
    self.client.post(f'/matches/{match.id}/set_winner/', {'winner_id': self.player1.id})
    
    # Générer le tour suivant
    response = self.client.post(f'/tournaments/{self.tournament.id}/generate_next_round/')
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)  # Pas assez de joueurs pour un nouveau tour