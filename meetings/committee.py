from django.db import models
from django.utils.translation import gettext, gettext_lazy as _
from .user import Profile

class Committee(models.Model):
    name = models.CharField(_('name'), max_length=150)
    users = models.ManyToManyField( Profile,blank=True,related_name="committees")

    @classmethod
    def get_detail(cls, request, params):
        return {'error': 'Not implemented'}

    def __str__(self):
        return self.name
