from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from django.views import View
from .models import Match
import random
import string
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def join_match(request, match_key):
    if request.method == 'POST':
        # join_key = request.POST.get('joinKey', '')
        player_o = request.user

        try:
            # match = get_object_or_404(Match, match_key=join_key)
            match = Match.objects.get(match_key=match_key)
            if match.player_o:
                return JsonResponse({'status': 'error', 'message': 'Match already has two players'}, status=400)
            if match.player_x == player_o:
                return JsonResponse({'status': 'error', 'message': 'You cannot join your own match'}, status=400)
            match.player_o = player_o
            match.save()
            return JsonResponse({'status': 'success', 'match_key': match.match_key})
        except Match.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Match not found'}, status=400)
    # else:
    #     return JsonResponse({'status': 'error', 'message': '1337!!'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

@api_view(['POST'])
def create_match(request):
    if request.method == 'POST':
        match_key = ''
        player_x = request.user
        try:
            if not match_key:
                match_key = ''.join(random.choices(string.ascii_letters + string.digits, k=6))

            match = Match.objects.create(match_key=match_key, player_x=player_x, board={})
            match.initialize_board()
            match.save()
            return JsonResponse({'status': 'success', 'match_key': match_key})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    # else:
    #     JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)

class MatchView(View):
    permission_classes = [IsAuthenticated]
    def get(self, request, match_key):
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'User is not authenticated'}, status=401)
        try:
            match = Match.objects.get(match_key=match_key)
            return JsonResponse({'board': match.board, 'current_turn': match.current_turn, 'winner': match.winner})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)


@api_view(['GET'])
def matches_statistics(request):
    # Win count for the player (e.g., Player X)
    permission_classes = [IsAuthenticated]
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)
    try:

        player = request.user
        # Loss count for the player (e.g., Player X)
        win_count = Match.objects.filter(winner=player).count()

        loss_count = Match.objects.filter(loser=player).count()
        # Draw count (matches where the player participated, but no winner)
        draw_count = Match.objects.filter(Q(player_x=player) | Q(player_o=player)).filter(winner__isnull=True).count()
        # Total games played by the player (either player_x or player_o)
        total_games_played = Match.objects.filter(Q(player_x=player) | Q(player_o=player)).count()

        return JsonResponse({
            'win_count': win_count,
            'loss_count': loss_count,
            'draw_count': draw_count,
            'total_games_played': total_games_played
        })
    except Exception as e:
        return JsonResponse({'error': f'Exception: {str(e)}'}, status=400)

@api_view(['GET'])
def match_history(request, id):
    # Win count for the player (e.g., Player X)
    permission_classes = [IsAuthenticated]
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)
    try:
        # player = request.user
        matches = Match.objects.filter(Q(player_x=id) | Q(player_o=id)).values()

        return JsonResponse({'status': 'success', 'matches': list(matches)})
    except Exception as e:
        return JsonResponse({'error': f'Exception: {str(e)}'}, status=400)
