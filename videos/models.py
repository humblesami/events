from django.db import models
# from meetings.models import News

# Create your models here.
class Video(models.Model):
    name = models.CharField('Video Title', max_length=200)
    url = models.CharField('Video Link', max_length=500)
    news = models.ForeignKey('meetings.News', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name