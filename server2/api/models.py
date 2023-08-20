
from django.db import models


class TAP(models.Model):
    href = models.URLField()
    url = models.URLField()
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=50)
    artists = models.JSONField()
    duration = models.IntegerField()
    image_url = models.URLField()
    release_date = models.DateField()
    added_at = models.DateField()


class ART(models.Model):
    image_url = models.URLField()
    width = models.PositiveIntegerField()
    height = models.PositiveIntegerField()