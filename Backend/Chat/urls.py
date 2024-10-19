from .views import *
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views


router = DefaultRouter()
router.register(r'messages', messageviewset)
router.register(r'conversations', conversationviewset)
router.register(r'userstats', userstatsviewset)


urlpatterns = [
    path('', include(router.urls)),
    path('userstats/<int:pk>/status/', userstatsviewset.as_view({'get': 'status'}), name='userstats-status'),
]
