from .views.password_views import *
from .views.profile_views import *
from .views.auth_views import *
from .views.game_views import *
from django.urls import path

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='registration'),
    path('callback', Authentication42View.as_view(), name='42_authentication'),
    path('login/', LoginConfirmationView.as_view(), name='login'),
    path('2fa/', TwoFactorAuthenticationView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('users/', GetAllUsersView.as_view(), name='all_users'),
    path('profile/', GetProfileView.as_view(), name='profile_owner'),
    path('profile/<str:username>/', GetProfileView.as_view(), name='user_profile'),
    path("password_updating/", PasswordUpdatingView.as_view(), name="password_update"),
    path("profile_updating/", ProfileUpdatingView.as_view(), name="profile_update"),
    path("email_verification/", EmailVerificationView.as_view(), name="email_verification"),
    path("password_resetting/", PasswordResettingView.as_view(), name="password_reset"),
    path("password_verification/", PasswordVerificationView.as_view(), name="password_verification"),
    path("password_confirmation/", PasswordConfirmationView.as_view(), name="password_confirmation"),
    path("friend_operations/", FriendOperationsView.as_view(), name="friendship"),
    path("friend_requests/", FriendRequestsView.as_view(), name="friendship_request"),
    path("friends/", FriendshipListView.as_view(), name="friendship_list"),
    path("game_recording/", GameResultRecordingView.as_view(), name="game_result"),
    path("game_stats/", GameStatsView.as_view(), name="game_stats"),
    path("user_games_history/", UserGameHistoryView.as_view(), name="game_history"),
    path("games_history/", UserGameHistoryView.as_view(), name="user_game_history"),
    path("game_stats_updating/", GameStateUpdatingView.as_view(), name="game_state"),
    path("sent_requests/", SentRequestsView.as_view(), name="sent_requests"),
]