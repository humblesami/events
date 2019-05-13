from meetings.model_files.document import MeetingDocument
from  .file import *
from .annotation import *
# Create your models here.

class Document(models.Model):
    name = models.CharField(max_length=200)

    @classmethod
    def get_binary(cls, request, params):
        a= File.objects.filter(id=5)[0]
        b = MeetingDocument.objects.filter(id=5)[0]
        return {'error': 'Not implemented'}