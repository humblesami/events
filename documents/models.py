from django.db import models
from  .file import *
# Create your models here.

class Document(models.Model):
    name = models.CharField(max_length=200)

    @classmethod
    def get_binary(cls, request, params):
        return {'error': 'Not implemented'}