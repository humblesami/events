import os
import base64
import subprocess
from PyPDF2 import PdfFileReader
from fpdf import FPDF
from PIL import Image
from django.db import models
from mainapp import settings
from django.core.files import File as DjangoFile
from django.core.exceptions import ValidationError

def validate_file_extension(value):
    
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.pdf', '.odt', '.doc', '.docx', '.jpg', '.png', '.xlsx', '.xls', '.ppt', '.pptx']
    if not ext.lower() in valid_extensions:
        raise ValidationError(u'Unsupported file extension. Only pdf and microsoft office documents(odt, doc,docx,ppt.pptx,xls,xlsx) are allowed')

def text_extractor(f):
    pdf = PdfFileReader(f)
    number_of_pages = pdf.numPages
    n = 0
    text = ''
    while n != number_of_pages:
        page = pdf.getPage(n)
        text += page.extractText() + ' '
        n += 1
    return text

class File(models.Model):
    name = models.CharField(max_length=100)
    html = models.CharField(max_length=30, blank=True)
    content = models.CharField(max_length=30, blank=True)
    pdf_doc = models.FileField(upload_to='converted/', null=True)
    file_type = models.CharField(max_length=128, default='')
    attachment = models.FileField(upload_to='files/', null=True, validators=[validate_file_extension])

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        create = False
        if self.pk is None:
            create = True
        super(File, self).save(*args, **kwargs)
        if create and self.file_type != 'message':
            self.get_pdf()
            if self.html:
                self.content = self.html
            else:
                if not self.pdf_doc:
                    raise Exception('File conversion failed')
                if not self.pdf_doc.file:
                    raise Exception('File conversion failed.')
                self.content = text_extractor(self.pdf_doc)
            self.save()


    def get_pdf(self):
        tmp = self.attachment.url.split('.')
        ext = tmp[len(tmp) - 1]
        filename = self.attachment.name.replace("files/","").split(".")[0]
        pth = settings.BASE_DIR + self.attachment.url
        if ext in ('odt', 'doc','docx','ppt','pptx','pdf'):
            self.doc2pdf(pth,ext,filename)
        elif ext == "xls" or ext =="xlsx":
            self.excel2xhtml(pth,filename)
        elif ext in ['png','jpg','jpeg']:
            self.img2pdf(pth,filename)
        else:
            raise Exception('Invalid File Type')

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
            if ext != "pdf":
                res = open(converted_pth, 'rb')
            else:
                res = open(pth , 'rb')
            self.pdf_doc.save(filename+".pdf", DjangoFile(res))
            # self.original_pdf.save(filename+".pdf", DjangoFile(res))

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
            read = res.read()
            r=read.decode("utf-8")
            self.html = r

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
            # self.original_pdf.save(filename+".pdf", DjangoFile(res))
        except:
            raise

    @classmethod
    def get_binary(cls, request, params):
        file_id = int(params['id'])
        file_obj = File.objects.get(id=file_id)
        pdf_doc = file_obj.pdf_doc
        pdf_doc = pdf_doc.read()
        pdf_doc = base64.b64encode(pdf_doc)
        result = pdf_doc.decode('utf-8')
        breadcrumb = []
        if file_obj._state:
            if file_obj._state.fields_cache:
                for model_name in file_obj._state.fields_cache:
                    if file_obj._state.fields_cache[model_name]:
                        breadcrumb = file_obj._state.fields_cache[model_name].breadcrumb
        # result = base64.b64encode(file_obj.pdf_doc.read()).decode('utf-8')
        doc = {'id': file_id, "doc": result, 'doc_name': file_obj.name, 
        'type': file_obj.file_type, 'breadcrumb': breadcrumb}
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