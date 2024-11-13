from .views import *
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views


router = DefaultRouter()
router.register(r'messages', MessageViewSet)
# router.register(r'conversations', conversationviewset)
router.register(r'conversations', ConversationViewSet, basename='conversation')
router.register(r'userstats', UserStatsViewSet)
# router.register(r'createview', MessageCreateView)
# router.register(r'createview', MessageCreateView, basename='message-create')

urlpatterns = [
    path('', include(router.urls)),
    path('userstats/<int:pk>/status/', UserStatsViewSet.as_view({'get': 'status'}), name='userstats-status'),
]
