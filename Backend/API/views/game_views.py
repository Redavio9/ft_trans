
from ..serializers.game_serializer import GameStatsSerializer
from ..models import UserInfo, UserGameStats, GameResults
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import ValidationError
from rest_framework.response import Response
from rest_framework.request import Request
from ..serializers.game_serializer import *
from rest_framework.views import APIView
from rest_framework import status
from django.db.models import Q


class GameResultRecordingView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> Response:

        try:
            player_1 = UserInfo.objects.get(username = request.data['winner'])
            player_2 = UserInfo.objects.get(username = request.data['loser'])
        except UserInfo.DoesNotExist:
            return Response({
                'message': 'One or more players do not exist'
            }, status = status.HTTP_400_BAD_REQUEST)

        data = {
            'player_1': player_1.pk,
            'player_2': player_2.pk,
            'score_1': request.data['winner_score'],
            'score_2': request.data['loser_score'],
        }
        serializer = GameResultRecordingSerializer(data=data)

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({
                'error': e.detail
            },
            status = status.HTTP_400_BAD_REQUEST)
        
        serializer.save()

        return Response({
            'message': 'Game result was recorded successfully'
        }, status = status.HTTP_200_OK)

class GameStatsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:

        user = request.user
        
        try:
            stats = UserGameStats.objects.get(user_id = user)
        except UserGameStats.DoesNotExist:
            return Response({
                'message': 'No game stats found'
            }, status = status.HTTP_200_OK)

        serializer = GameStatsSerializer(stats)
        return Response({
            'message': 'Game stats retrieved successfully',
            'states': serializer.data
        },
        status = status.HTTP_200_OK)
    

class UserGameHistoryView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:

        user = request.user

        try:
            game_history = GameResults.objects.filter(Q(player_1 = user) | Q(player_2 = user)).order_by('-game_date')[:5]
            if not game_history:
                raise GameResults.DoesNotExist
        except GameResults.DoesNotExist:
            return Response({
                'message': 'No game history found'
            }, status = status.HTTP_200_OK)

        serializer = UserGameHistorySerializer(game_history, many = True)
        return Response({
            'message': 'Game history retrieved successfully',
            'game_history': serializer.data
        }, status = status.HTTP_200_OK)

class GameHistoryView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request: Request) -> Response:

        try:
            game_history = GameResults.objects.all()
            for i in game_history:
                print(i.player_1)
            if not game_history:
                raise GameResults.DoesNotExist
        except GameResults.DoesNotExist:
            return Response({
                'message': 'No game history found'
            }, status = status.HTTP_404_NOT_FOUND)
        
        serializer = UserGameHistorySerializer(game_history, many = True)
        return Response({
            'message': 'Game history retrieved successfully',
            'game_history': serializer.data
        }, status = status.HTTP_200_OK)

class GameStateUpdatingView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request: Request) -> Response:

        user = request.user

        try:
            stats = UserGameStats.objects.get(user_id = user)
        except UserGameStats.DoesNotExist:
            return Response({
                'message': 'No game stats found'
            }, status = status.HTTP_404_NOT_FOUND)

        serializer = GameStateUpdatingSerializer(stats, data = request.data, partial = True)

        try:
            serializer.is_valid(raise_exception = True)
        except ValidationError as e:
            return Response({
                'error': e.detail
            },
            status = status.HTTP_400_BAD_REQUEST)
        
        serializer.save()

        return Response({
            'message': 'Game stats updated successfully',
            'states': serializer.data
        }, status = status.HTTP_200_OK)