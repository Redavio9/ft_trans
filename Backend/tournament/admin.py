from django.contrib import admin
from .models import Player, Tournament, Match, TournamentPlayer

admin.site.register(Player)
admin.site.register(Tournament)
admin.site.register(Match)
admin.site.register(TournamentPlayer)
