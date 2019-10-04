import io
import json
import os
import base64
import re
import subprocess
import urllib
from urllib.request import urlopen

from PIL import Image
from django.apps import apps
from django.core.files.temp import NamedTemporaryFile
from fpdf import FPDF
from PyPDF2 import PdfFileReader
from mainapp import settings, ws_methods

from django.db import models
from mainapp.models import CustomModel, FilesUpload
from django.core.files import File as DjangoFile
from django.core.exceptions import ValidationError
from django.db.models import Q


def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # [0] returns path+filename
    valid_extensions = ['.pdf', '.odt', '.doc', '.docx', '.xlsx', '.xls', '.ppt', '.pptx']
    if not ext.lower() in valid_extensions:
        raise ValidationError(
            u'Unsupported file extension. Only pdf and microsoft office documents(odt, doc,docx,ppt.pptx,xls,xlsx) are allowed')


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


class File(CustomModel, FilesUpload):
    name = models.CharField(max_length=100)
    html = models.CharField(max_length=30, blank=True)
    content = models.CharField(max_length=30, blank=True)
    pdf_doc = models.FileField(upload_to='converted/', null=True)
    file_type = models.CharField(max_length=128, default='')
    attachment = models.FileField(upload_to='files/', null=True, blank=True, validators=[validate_file_extension])
    upload_status = models.BooleanField(default=False)
    file_name = models.CharField(max_length=128, default='')
    cloud_url = models.CharField(max_length=512, null=True, blank=True)
    access_token = models.CharField(max_length=512, null=True, blank=True)

    def __str__(self):
        return self.name

    pending_tasks = 3

    def save(self, *args, **kwargs):
        try:
            creating = False
            if not self.pk:
                creating = True
            if self.pending_tasks == 3:
                if not creating:
                    if self.attachment != File.objects.get(pk=self.id).attachment:
                        self.pending_tasks = 2
                    else:
                        self.pending_tasks = 0

                file_data = None
                if self.cloud_url:
                    headers = {}
                    if self.access_token:
                        headers = {'Authorization': 'Bearer ' + self.access_token}
                    self.file_name = re.sub('[^0-9a-zA-Z\.]+', '_', self.file_name)
                    try:
                        request = urllib.request.Request(self.cloud_url, headers=headers)
                        url_opened = None
                        try:
                            url_opened = urlopen(request)
                        except Exception as ex:
                            try:
                                my_bytes_value = ws_methods.http(self.cloud_url, headers)
                                my_json = ws_methods.bytes_to_json(my_bytes_value)
                                my_json = my_json['error']
                                raise Exception(my_json)
                            except:
                                raise
                        file_content = url_opened.read()
                        file_temp = NamedTemporaryFile(delete=True)
                        file_temp.write(file_content)
                        file_temp.flush()
                        file_data = file_temp
                    except urllib.error.HTTPError as e:
                        msg = str(e.code) + e.reason
                        raise Exception(msg)

                    self.binary_data = ''
                    cloud_url = self.cloud_url
                    if 'https://www.googleapis.com' in cloud_url:
                        self.access_token = 'Google'
                    elif 'files.1drv.com' in cloud_url:
                        self.access_token = 'Onedrive'
                    elif 'https://dl.dropboxusercontent.com' in cloud_url:
                        self.access_token = 'Dropbox'
                    else:
                        self.access_token = 'Unknown Cloud'
                    self.pending_tasks = 2
                    self.cloud_url = ''
                    self.attachment.save(self.file_name, file_data)
                    return
                else:
                    self.access_token = 'Local'

                if file_data is None:
                    if not self.attachment:
                        raise ValidationError('No file provided')
                    else:
                        self.pending_tasks = 2

            super(File, self).save(*args, **kwargs)
            if self.pending_tasks == 2:
                if self.file_type != 'message':
                    self.pending_tasks = 1
                    self.get_pdf()
                    return
            if self.pending_tasks == 1:
                if self.html:
                    self.content = self.html
                else:
                    if not self.pdf_doc:
                        raise Exception('File conversion failed')
                    if not self.pdf_doc.file:
                        raise Exception('File conversion failed.')
                    try:
                        self.content = text_extractor(self.pdf_doc)
                    except:
                        raise Exception('unable to extract file content')
                self.pending_tasks = 0
                self.save()
            pass
        except:
            try:
                if creating and self.pk:
                    self.delete()
            except:
                pass
            res = ws_methods.get_error_message()
            raise Exception(res)

    def get_pdf(self):
        tmp = self.attachment.url.split('.')
        ext = tmp[len(tmp) - 1]
        filename = self.file_name
        pth = settings.BASE_DIR + self.attachment.url
        if ext in ('odt', 'doc', 'docx', 'ppt', 'pptx', 'pdf'):
            self.doc2pdf(pth, ext, filename)
        elif ext == "xls" or ext == "xlsx":
            self.excel2xhtml(pth, filename)
        elif ext in ['png', 'jpg', 'jpeg']:
            self.img2pdf(pth, filename)
        else:
            raise Exception('Invalid File Type')

    def exclude_extension(self, name):
        name = os.path.splitext(name)[0]
        return name

    def doc2pdf(self, pth, ext, filename):
        try:
            res_pdf_path = pth.replace("files", "converted")
            res_pdf_path = self.exclude_extension(res_pdf_path) + '.pdf'
            if ext == "pdf":
                res = open(pth, 'rb')
            else:
                subprocess.check_call(
                    ['/usr/bin/python3', '/usr/bin/unoconv', '-f', 'pdf',
                     '-o', res_pdf_path, '-d', 'document',
                     pth])
                res = open(res_pdf_path, 'rb')
            if ext != "pdf":
                res = open(res_pdf_path, 'rb')
            else:
                res = open(pth, 'rb')
            if filename.endswith('.pdf'):
                filename = filename + '.pdf'
            self.pdf_doc.save(filename, DjangoFile(res))
        except:
            raise

    def excel2xhtml(self, pth, filename):
        try:
            res_pdf_path = pth.replace("files", "converted")
            res_pdf_path = self.exclude_extension(res_pdf_path) + ".xhtml"
            subprocess.check_call(
                ['/usr/bin/python3', '/usr/bin/unoconv', '-f', 'xhtml',
                 '-o', res_pdf_path,
                 pth]
            )
            res = open(res_pdf_path, 'rb')
            self.pdf_doc.save(filename + ".xhtml", DjangoFile(res))
            read = res.read()
            r = read.decode("utf-8")
            self.html = r
        except:
            raise

    def img2pdf(self, pth, filename):
        try:
            res_pdf_path = pth.replace("files", "converted")
            im = Image.open(pth)
            width, height = im.size
            if height >= width:
                orientation = 'P'
                w = 210
                h = 297
            else:
                orientation = 'L'
                w = 297
                h = 210

            pdf = FPDF()
            pdf.add_page(orientation=orientation)
            pdf.image(pth, x=0, y=0, w=w, h=h)
            pdf.output(res_pdf_path, "F")
            res = open(res_pdf_path, 'rb')
            if not filename.endswith('.pdf'):
                filename = filename + '.pdf'
            self.pdf_doc.save(filename, DjangoFile(res))
        except:
            raise

    @classmethod
    def get_attachments(cls, request, params):
        parent_id = params.get('parent_id')
        parent_field = params.get('parent_field')
        model = apps.get_model(params['app'], params['model'])
        q_objects = Q()
        if parent_id:
            q_objects |= Q(**{parent_field: parent_id})

        kw = params.get('kw')
        if kw:
            docs = ws_methods.search_db({'kw': kw, 'search_models': {params['app']: [params['model']]}})
        else:
            docs = model.objects.filter(q_objects)
        docs = docs.values('id', 'name', 'access_token')
        documents = list(docs)
        return documents

    @classmethod
    def change_file_name(cls, request, params):
        doc_id = params['doc_id']
        name = params['name']
        file = File.objects.get(pk=doc_id)
        file.name = name
        file.save()
        return 'done'

    @classmethod
    def delete_file(csl, request, params):
        doc_id = params['doc_id']
        File.objects.get(pk=doc_id).delete()
        return 'done'

    @classmethod
    def get_file_data(cls, request, params):
        file_id = int(params['id'])
        file_obj = File.objects.get(id=file_id)
        url = file_obj.pdf_doc.url
        breadcrumb = []
        mention_list = []
        is_respondent = False
        file_type = file_obj.file_type
        if file_type == 'meeting':
            breadcrumb = file_obj.meetingdocument.breadcrumb
            mention_list = file_obj.meetingdocument.meeting.get_attendees()
            respondents = file_obj.meetingdocument.meeting.get_audience()
            if request.user.id in respondents:
                is_respondent = True
        elif file_type == 'topic':
            breadcrumb = file_obj.agendadocument.breadcrumb
            mention_list = file_obj.agendadocument.agenda.get_attendees()
            respondents = file_obj.agendadocument.topic.meeting.get_audience()
            if request.user.id in respondents:
                is_respondent = True
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
            'is_respondent': is_respondent,
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
        is_respondent = False
        file_type = file_obj.file_type
        if file_type == 'meeting':
            breadcrumb = file_obj.meetingdocument.breadcrumb
            mention_list = file_obj.meetingdocument.meeting.get_attendees()
            respondents = file_obj.meetingdocument.meeting.get_audience()
            if request.user.id in respondents:
                is_respondent = True
        elif file_type == 'topic':
            breadcrumb = file_obj.agendadocument.breadcrumb
            mention_list = file_obj.agendadocument.agenda.get_attendees()
            respondents = file_obj.agendadocument.topic.meeting.get_audience()
            if request.user.id in respondents:
                is_respondent = True
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
            'mention_list': mention_list,
            'is_respondent': is_respondent
        }
        return {'data': doc}