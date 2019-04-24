from django.db import models

# Create your models here.

class Folder(models.Model):
    name = models.CharField(max_length = 200)

    @classmethod
    def get_details(cls, request, params):
        return {'error': 'Not implemented'}
    @classmethod
    def get_records(cls, request, params):
        return {'error': 'Not implemented'}