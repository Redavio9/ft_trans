from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from django.views import View
from .models import Match
import random
import string

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
    def get(self, request, match_key):
        try:
            match = Match.objects.get(match_key=match_key)
            return JsonResponse({'board': match.board, 'current_turn': match.current_turn, 'winner': match.winner})
        except Match.DoesNotExist:
            return JsonResponse({'error': 'Match not found'}, status=404)

# @api_view(['GET'])
# def matches_statistics(request):
    # wins
    # lost
    # draw
