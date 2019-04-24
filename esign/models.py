from django.db import models

# Create your models here.

class SignDocument(models.Model):
    name = models.CharField(max_length=200)

    @classmethod
    def get_token(cls, request, params):
        return {'error': 'Not implemented'}