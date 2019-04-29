from django.db import models

# Create your models here.

class Folder(models.Model):
    name = models.CharField(max_length = 200)

    def __str__(self):
        return self.name
    @classmethod
    def get_details(cls, request, params):
        return {'error': 'Not implemented'}
    @classmethod
    def get_records(cls, request, params):
        folder = Folder.objects.values('name', 'id')
        folder = list(folder)
        current_cnt = len(folder)
        folderObject = {'records':folder, 'total':current_cnt, 'count':current_cnt}
        return folderObject
        