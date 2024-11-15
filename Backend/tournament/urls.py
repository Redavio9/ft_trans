from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlayerViewSet, TournamentViewSet, MatchViewSet

# Créer un routeur DRF
router = DefaultRouter()

# Enregistrer les viewsets avec le routeur
router.register(r'players', PlayerViewSet, basename='player')
router.register(r'tournaments', TournamentViewSet, basename='tournament')
router.register(r'matches', MatchViewSet, basename='match')

# Inclure les routes dans les URLs de l'application
urlpatterns = [
    path('', include(router.urls)),  # Cela inclut toutes les routes générées par le routeur
]
