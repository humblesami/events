import os
import base64
import subprocess

from PIL import Image
from fpdf import FPDF
from PyPDF2 import PdfFileReader
from mainapp import settings, ws_methods

from django.db import models
from mainapp.models import CustomModel
from django.core.files import File as DjangoFile
from django.core.exceptions import ValidationError



def validate_file_extension(value):
    
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.pdf', '.odt', '.doc', '.docx', '.xlsx', '.xls', '.ppt', '.pptx']
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

class File(CustomModel):
    name = models.CharField(max_length=100)
    html = models.CharField(max_length=30, blank=True)
    content = models.CharField(max_length=30, blank=True)
    pdf_doc = models.FileField(upload_to='converted/', null=True)
    file_type = models.CharField(max_length=128, default='')
    attachment = models.FileField(upload_to='files/', null=True, validators=[validate_file_extension])    
    upload_status = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        try:
            create = False
            old_doc = None
            file_changed = False
            if self.pk is None:
                create = True
                if self.attachment:
                    file_changed = True
            else:
                old_doc = File.objects.get(pk=self.pk).attachment
                if old_doc != self.attachment:
                    file_changed = True
            super(File, self).save(*args, **kwargs)
            if file_changed and self.file_type != 'message':
                self.process_doc()
                pass
                # if self.file_type != 'esign':
                #     ws_methods.document_thread(self)
                # else:
                #     self.process_doc()
        except:
            res = ws_methods.get_error_message()
            a = 1


    def process_doc(self):
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
    def get_file_data(cls, request, params):
        file_id = int(params['id'])
        file_obj = File.objects.get(id=file_id)
        url = file_obj.pdf_doc.url
        breadcrumb = []
        mention_list = []
        file_type = file_obj.file_type
        if file_type == 'meeting':
            breadcrumb = file_obj.meetingdocument.breadcrumb
            mention_list = file_obj.meetingdocument.meeting.get_attendees()
        elif file_type == 'topic':
            breadcrumb = file_obj.agendadocument.breadcrumb
            mention_list = file_obj.agendadocument.agenda.get_attendees()
        elif file_type == 'voting':
            breadcrumb = file_obj.votingdocument.breadcrumb
        elif file_type == 'resource':
            breadcrumb = file_obj.resourcedocument.breadcrumb
        elif file_type == 'home':
            breadcrumb = file_obj.newsdocument.breadcrumb
        elif file_type == 'resume':
            breadcrumb.append({'title': 'Profiles', 'link': '/profiles/directors'})
            profile_obj = file_obj.profile
            groups = list(profile_obj.groups.all())
            if groups:
                group = groups[0]
                group_name = ''
                if group.name != 'Staff':
                    group_name = group.name + 's'
                else:
                    group_name = group.name
                breadcrumb.append({'title': group_name, 'link': '/profiles/' + group_name.lower()})
            breadcrumb.append({'title': profile_obj.name, 'link': '/' + group.name.lower() + '/' + str(profile_obj.id)})

        doc = {
            'id': file_id,
            "url": url,
            'doc_name': file_obj.name,
            'breadcrumb': breadcrumb,
            'mention_list': mention_list
        }
        return {'data': doc}

    @classmethod
    def get_binary(cls, request, params):
        file_id = int(params['id'])
        file_obj = File.objects.get(id=file_id)
        pdf_doc = file_obj.pdf_doc
        pdf_doc = pdf_doc.read()
        pdf_doc = base64.b64encode(pdf_doc)
        result = pdf_doc.decode('utf-8')
        breadcrumb = []
        mention_list = []
        file_type = file_obj.file_type
        if file_type == 'meeting':
            breadcrumb = file_obj.meetingdocument.breadcrumb
            mention_list = file_obj.meetingdocument.meeting.get_attendees()
        elif file_type == 'topic':
            breadcrumb = file_obj.agendadocument.breadcrumb
            mention_list = file_obj.agendadocument.agenda.get_attendees()
        elif file_type == 'voting':
            breadcrumb = file_obj.votingdocument.breadcrumb
        elif file_type == 'resource':
            breadcrumb = file_obj.resourcedocument.breadcrumb
        elif file_type == 'home':
            breadcrumb = file_obj.newsdocument.breadcrumb
        elif file_type == 'resume':
            breadcrumb.append({'title': 'Profiles', 'link': '/profiles/directors'})
            profile_obj = file_obj.profile
            groups = list(profile_obj.groups.all())
            if groups:
                group = groups[0]
                group_name = ''
                if group.name != 'Staff':
                    group_name = group.name + 's'
                else:
                    group_name = group.name
                breadcrumb.append({'title': group_name, 'link': '/profiles/' + group_name.lower()})
            breadcrumb.append({'title': profile_obj.name, 'link': '/' + group.name.lower() + '/' + str(profile_obj.id)})
        doc = {
            'id': file_id, 
            "doc": result, 
            'doc_name': file_obj.name, 
            'type': file_obj.file_type,
            'breadcrumb': breadcrumb,
            'mention_list': mention_list
        }
        return {'data': doc}
