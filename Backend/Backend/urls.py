from django.contrib import admin
from django.urls import path, include
from API.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('API.urls')),
    path('chat/', include('Chat.urls')),
    path('', include('django_prometheus.urls')),
]
