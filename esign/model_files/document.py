import base64
import io

from django.db import models

# Create your models here.
from documents.file import File
from django.core.files import File as DjangoFile

from mainapp.ws_methods import queryset_to_list


class SignDocument(File):
    workflow_enabled = models.BooleanField(blank=True, null=True)
    original_pdf = models.FileField(upload_to='original/')

    # my_signature_status
    # pending_signatures

    def save(self, *args, **kwargs):
        create = False
        if self.pk is None:
            create = True
        super(SignDocument, self).save(*args, **kwargs)
        if create:
            self.original_pdf = self.pdf_doc
            pass
        else:
            pass

    @classmethod
    def save_doc(cls, request, params):
        file_data = params['file']

        format, binary = file_data.split(';base64,')
        binary_data = io.BytesIO(base64.b64decode(binary))
        jango_file = DjangoFile(binary_data)

        new_file = cls(name=params["name"])

        new_file.attachment.save(params["name"], jango_file)
        new_file.save()



        docs = cls.objects.filter()
        total_cnt = docs.count()
        current_cnt = total_cnt
        docs = queryset_to_list(
            docs, fields=['name', 'id']
        )
        result = {'records': docs, 'total': total_cnt, 'count': current_cnt}
        return result

    @classmethod
    def get_token(cls, request, params):
        return {'error': 'Not implemented'}