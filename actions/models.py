from django.db import models

class Actions(models.Model):
    open_date = models.DateTimeField()
    close_date = models.DateTimeField()