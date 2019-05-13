import base64
import subprocess

from django.core.files import File as DjangoFile

# import pdftotext
from PIL import Image
from django.db import models
from fpdf import FPDF

from mainapp import settings


class File(models.Model):
    name = models.CharField(max_length=30)
    html = models.CharField(max_length=30, blank=True)
    content = models.CharField(max_length=30, blank=True)
    attachment = models.FileField(upload_to='files/')
    pdf_doc = models.FileField(upload_to='converted/')
    original_pdf = models.FileField(upload_to='original/')
    file_type = models.CharField(max_length=128, default='')

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        create = False
        if self.pk is None:
            create = True
        super(File, self).save(*args, **kwargs)
        if create:
            self.get_pdf()
            pass
        else:
            pass



    def get_pdf(self):
        tmp = self.attachment.url.split('.')
        ext = tmp[len(tmp) - 1]
        filename = self.attachment.name.replace("files/","").split(".")[0]

        pth = settings.BASE_DIR + self.attachment.url
        if ext == "doc" or ext == "docx" or  ext == "ppt" or ext == "pptx" or ext == "pdf":
            self.doc2pdf(pth,ext,filename)
        elif ext == "xls" or ext =="xlsx":
            self.excel2xhtml(pth,filename)
        elif ext in ['png','jpg','jpeg']:
            self.img2pdf(pth,filename)
        else:
            raise

    def doc2pdf(self, pth,ext,filename):
        try:
            converted_pth = pth.replace("files","converted")
            converted_pth = converted_pth.split(".")[0] + ".pdf"
            if ext == "pdf":
                res = open(pth, 'rb')
            else:
                subprocess.check_call(
                    ['/usr/bin/python3', '/usr/bin/unoconv', '-f', 'pdf',
                     '-o', converted_pth, '-d', 'document',
                     pth])
                res = open(converted_pth, 'rb')
            # content=""
            # pdf = pdftotext.PDF(res)
            # for pag in pdf:
            #     content += pag
            if ext != "pdf":
                res = open(converted_pth, 'rb')
            else:
                res = open(pth , 'rb')
            self.pdf_doc.save(filename+".pdf", DjangoFile(res))
            self.original_pdf.save(filename+".pdf", DjangoFile(res))

        except:
            raise

    def excel2xhtml(self, pth,filename):
        try:
            converted_pth = pth.replace("files", "converted")
            converted_pth = converted_pth.split(".")[0] + ".xhtml"
            subprocess.check_call(
                ['/usr/bin/python3', '/usr/bin/unoconv', '-f', 'xhtml',
                 '-o', converted_pth,
                 pth ])
            res = open(converted_pth, 'rb')
            self.pdf_doc.save(filename + ".xhtml", DjangoFile(res))
            # read = res.read()
            # r=read.decode("utf-8")
            # self.html = r

        except:
            raise

    def img2pdf(self,pth,filename):
        try:
            converted_pth = pth.replace("files", "converted")
            im = Image.open(pth)
            width, height = im.size
            if height >= width:
                orientation = 'P'
                w=210
                h=297
            else:
                orientation = 'L'
                w = 297
                h = 210

            pdf = FPDF()
            pdf.add_page(orientation=orientation)
            pdf.image(pth,x=0,y=0,w=w,h=h)
            pdf.output(converted_pth, "F")
            res = open(converted_pth, 'rb')
            self.pdf_doc.save(filename+".pdf", DjangoFile(res))
            self.original_pdf.save(filename+".pdf", DjangoFile(res))
        except:
            raise

    @classmethod
    def get_binary(cls, request, params):
        if params['id']:
            file_id = int(params['id'])
            file_obj = File.objects.filter(id=file_id)[0]
            pdf_doc = file_obj.pdf_doc
            pdf_doc = pdf_doc.read()
            pdf_doc = base64.b64encode(pdf_doc)
            result = pdf_doc.decode('utf-8')
            # result = base64.b64encode(file_obj.pdf_doc.read()).decode('utf-8')
            doc = {'id': file_id, "doc": result, 'doc_nget-attendeesame': file_obj.name, 'type': ''}
            return {'data': doc}


#
#
# converted = False
#             if file.pdf_doc:
#                 converted = file['pdf_doc'].decode('utf-8')
#             doc = {'id': doc_id, "doc": converted, 'doc_nget-attendeesame': file['name'], 'type': doc_type}
#             if file.html:
#                 doc['doc'] = file['html']
#                 doc['excel'] = 1
#
#             if doc_type == 'resource':
#                 props = ['parent_folder.name', 'parent_folder.id']
#             elif doc_type == 'meeting':
#                 attendeesList = file['meeting_id']['attendee_ids']
#                 for obj in attendeesList:
#                     attendees.append({"name":obj['display_name'],"id":obj['id']})
#                 props = ['meeting_id.name', 'meeting_id.id']
#             elif doc_type == 'topic':
#                 attendeesList = file['topic_id']['meeting_id']['attendee_ids']
#                 for obj in attendeesList:
#                     attendees.append({"name": obj['display_name'], "id": obj['id']})
#                 props = ['topic_id.name', 'topic_id.id']
#             elif doc_type == 'signature':
#                 props = ['meeting_id.name', 'meeting_id.id', 'mp_signature_status']
#             elif doc_type == 'home':
#                 props = ['name']
#             elif doc_type == 'voting':
#                 attendeesList = file['voting_id']['partner_ids']
#                 for obj in attendeesList:
#                     attendees.append({"name":obj['display_name'],"id":obj['id']})
#                 props = ['voting_id.name', 'voting_id.id']
#             else:
#                 return ws_methods.http_response('Invalid document type ' + doc_type)
#
#             obj = ws_methods.object_to_json_object(file, props)
#             for ke in obj:
#                 doc[ke] = obj[ke]
#             doc['uid'] = uid
#             doc['model'] = model_name
#             doc['attendees'] = attendees
#             res = ws_methods.http_response('', doc)
#             return res