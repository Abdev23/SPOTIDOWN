
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import TAP, ART
from .serializers import TAP_Serializer, ART_Serializer


""" def api_root(request):
    return JsonResponse({'message': 'Hello from 🚀 Django server!'})


def api_tap(request):
  if request.method == 'POST':
    TAP = request.POST.get('TAP')
    print('Received TAP from frontend:', TAP)

    feedback = {'dur': 4000}
    return JsonResponse(feedback)


def api_art(request):
  if request.method == 'POST':
    ART = request.POST.get('ART')
    print('Received ART from frontend:', ART)

    feedback = {'dur': 3000}
    return JsonResponse(feedback) """
  


@api_view(['GET'])
def api_root(request):
  return JsonResponse({'message': 'Hello from 🚀 Django server!'})

@api_view(['POST'])
def api_tap(request):
  if request.method == 'POST':
    TAP = request.data
    print('Received TAP from frontend:', TAP)

    feedback = {'dur': 4000}
    return JsonResponse(feedback)


@api_view(['POST'])
def api_art(request):
  if request.method == 'POST':
    ART = request.data
    print('Received ART from frontend:', ART)

    feedback = {'dur': 3000}
    return JsonResponse(feedback)