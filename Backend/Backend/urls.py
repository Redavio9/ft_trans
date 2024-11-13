
from django.contrib import admin
from django.urls import path, include
from API.views import *
from django.conf import settings
from django.conf.urls.static import static
from django_prometheus import exports

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('API.urls')),
    path('chat/', include('Chat.urls')),
    path('metrics/', exports.ExportToDjangoView),
    path('tournament/', include('tournament.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)