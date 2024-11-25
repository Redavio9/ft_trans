from django.urls import path
from . import views

urlpatterns = [
    path('match/<str:match_key>/', views.MatchView.as_view(), name='get_board'),
    path('join-match/<str:match_key>/', views.join_match, name='join_match'),
    path('create-match/', views.create_match, name='create-match'),  # For POST requests
    path('matches_statistics/', views.matches_statistics, name='matches_statistics'),
    path('match_history/<str:id>', views.match_history, name='match_history'),
]
