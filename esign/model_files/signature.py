from django.db import models
from django.contrib.auth.models import User
from esign.model_files.document import SignatureDoc


class Signature(models.Model):
    name = models.CharField(max_length=200, blank=True)
    token = models.CharField(max_length=200, blank=True)
    email = models.CharField(max_length=200, blank=True)
    type = models.CharField(max_length=200, blank=True)
    field_name = models.CharField(max_length=200, blank=True)
    text = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to='profile/', blank=True, null=True)
    date = models.DateField(null=True, blank=True)

    document = models.ForeignKey(SignatureDoc, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)
    page = models.IntegerField(null=True, blank=True)
    left = models.FloatField(null=True, blank=True)
    top = models.FloatField(null=True, blank=True)
    zoom = models.FloatField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    width = models.FloatField(null=True, blank=True)




