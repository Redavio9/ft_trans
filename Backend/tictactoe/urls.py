from django.urls import path
from . import views

urlpatterns = [
    # path('pages/<str:page>', views.pages, name='pages'),
    # path('game/<str:match_key>/', views.game_page, name='game'),
    path('match/<str:match_key>/', views.MatchView.as_view(), name='match_view'),
    # path('create-match/', views.MatchView.as_view(),  name="create"),
    # path('create-match/<str:match_key>/', MatchView.as_view(), name='create-match-details'),
    path('join-match/<str:match_key>/', views.join_match, name='join_match'),
    # path('match/<str:match_key>/', views.match_page, name='match'),
    path('create-match/', views.create_match, name='create-match'),  # For POST requests
]
