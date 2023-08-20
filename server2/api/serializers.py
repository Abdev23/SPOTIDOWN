
from rest_framework import serializers

from .models import TAP, ART


class TAP_Serializer(serializers.ModelSerializer):
    artists = serializers.JSONField()
    added_at = serializers.DateField()

    class Meta:
        model = TAP
        fields = ('href', 'url', 'name', 'type', 'artists', 'duration', 'image_url', 'release_date', 'added_at')


class ART_Serializer(serializers.ModelSerializer):
    class Meta:
        model = ART
        fields = ('image_url', 'width', 'height')