
from django.urls import path

from . import views

app_name = 'api'

urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('tap/', views.api_tap, name='api-tap'),
    path('art/', views.api_art, name='api-art'),
]