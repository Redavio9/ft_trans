from django.apps import AppConfig


class TictactoeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tictactoe'

    # def ready(self):
        # from .models import Match
