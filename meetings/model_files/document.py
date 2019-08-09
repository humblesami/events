import io
import os
import uuid
import json
import base64
import datetime
from fpdf import FPDF

from .event import Event
from .topic import Topic
from .user import Profile
from random import randint
from django.db import models
from mainapp import ws_methods
from documents.file import File
from PIL import Image, ImageDraw
from django.db import transaction
from collections import OrderedDict
from mainapp.settings import MEDIA_ROOT
from restoken.models import PostUserToken
from mainapp.settings import server_base_url
from PyPDF2 import PdfFileWriter, PdfFileReader
from django.core.files import File as DjangoFile
from esign.model_files.document import SignatureDoc, Signature
from mainapp.ws_methods import queryset_to_list


class MeetingDocument(File):
    meeting = models.ForeignKey(Event, on_delete=models.CASCADE)

    @property
    def breadcrumb(self):
        event_obj = self.meeting
        data = []
        data = []
        if event_obj:
            if event_obj.exectime != 'ongoing':
                data.append({'title': event_obj.exectime, 'link': '/meetings/' + event_obj.exectime})

            data.append({'title': event_obj.name, 'link': '/meeting/' + str(event_obj.id)})
            return data

    def save(self, *args, **kwargs):
        if not self.file_type:
            self.file_type = 'meeting'
        super(MeetingDocument, self).save(*args, **kwargs)

    def notification_text(self):
        return ' document ' + self.name + ' in ' + self.meeting.notification_text()

    def get_audience(self):
        res = []
        for obj in self.meeting.attendees.all():
            res.append(obj.id)
        return res


    @classmethod
    def upload_meeting_documents(cls, request, params):
        attachments = params['attachments']
        meeting_id = params['meeting_id']
        meeting_docs = []
        with transaction.atomic():
            for attachment in attachments:
                file_name = attachment['name']
                doc_file = attachment['binary']
                doc_file = ws_methods.base64StringToFile(doc_file, file_name)
                try:
                    file_name = attachment['file_name']
                except:
                    pass
                meeting_doc = MeetingDocument(
                    meeting_id=meeting_id,
                    file_type='meeting',
                    name=file_name,
                    attachment=doc_file
                )
                meeting_doc.save()
                meeting_doc = ws_methods.obj_to_dict(meeting_doc, 
                fields=[
                    'id', 
                    'name', 
                    'content', 
                    'file_ptr_id', 
                    'file_type', 
                    'html',
                    'meeting_id',
                    'pdf_doc'
                    ])
                meeting_docs.append(meeting_doc)
        if meeting_docs:        
            return meeting_docs
        else:
            return 'Something went wrong while uploading meeting documents'


class AgendaDocument(File):
    agenda = models.ForeignKey(Topic, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.file_type:
            self.file_type = 'topic'
        super(AgendaDocument, self).save(*args, **kwargs)

    def notification_text(self):
        return ' document ' + self.name + ' in agenda topic '+self.agenda.name+ ' in ' + self.meeting.notification_text()

    @property
    def breadcrumb(self):
        topic_obj = self.agenda
        event_obj = topic_obj.event
        data = []
        if event_obj:
            if event_obj.exectime != 'ongoing':
                data.append({'title': event_obj.exectime, 'link': '/meetings/' + event_obj.exectime})
            data.append({'title': event_obj.name, 'link': '/meeting/' + str(event_obj.id)})
            if topic_obj:
                data.append({'title': topic_obj.name, 'link': '/topic/' + str(topic_obj.id)})
            return data
        

    def get_audience(self):
            res = []
            for obj in self.agenda.event.attendees.all():
                res.append(obj.id)
            return res

    
    @classmethod
    def upload_agenda_documents(cls, request, params):
        attachments = params['attachments']
        topic_id = params['topic_id']
        topic_docs = []
        with transaction.atomic():
            for attachment in attachments:
                file_name = attachment['name']
                doc_file = attachment['binary']
                doc_file = ws_methods.base64StringToFile(doc_file, file_name)
                try:
                    file_name = attachment['file_name']
                except:
                    pass
                topic_doc = AgendaDocument(
                    agenda_id=topic_id,
                    file_type='topic',
                    name=file_name,
                    attachment=doc_file
                )
                topic_doc.save()
                topic_doc = ws_methods.obj_to_dict(topic_doc, 
                fields=[
                    'id', 
                    'name', 
                    'content', 
                    'file_ptr_id', 
                    'file_type', 
                    'html',
                    'meeting_id',
                    'pdf_doc'
                    ])
                topic_docs.append(topic_doc)
        if topic_docs:        
            return topic_docs
        else:
            return 'Something went wrong while uploading agenda documents'


class SignDocument(SignatureDoc):
    send_to_all = models.BooleanField(blank=True, null=True)
    meeting = models.ForeignKey(Event, on_delete=models.CASCADE,blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.file_type:
            self.file_type = 'signature'
        super(SignDocument, self).save(*args, **kwargs)

    @property
    def breadcrumb(self):
        event_obj = self.meeting
        data = []
        if self.meeting:
            if event_obj.exectime != 'ongoing':
                data.append({'title': event_obj.exectime, 'link': '/meetings/' + event_obj.exectime})
            data.append({'title': event_obj.name, 'link': '/meeting/' + str(event_obj.id)})
            return data

    @classmethod
    def set_meeting_attachment(cls, request, params):
        meeting_id = params.get('meeting_id')
        document_id = params.get('document_id')
        send_to_all = params.get('send_to_all')
        res = 'done'
        sign_doc = SignDocument.objects.get(id=document_id)
        if not meeting_id:
            meeting_id = None
        else:
            meeting = Event.objects.get(id=meeting_id)
            res = Event.attendees_to_list(meeting.attendees.all())
        sign_doc.meeting_id = meeting_id
        sign_doc.send_to_all = send_to_all
        sign_doc.save()
        return res

    @classmethod
    def get_detail(cls, request, params):
        file_id = int(params['document_id'])
        token = params['token']
        user = request.user
        file_name = ''
        file_obj = None
        if token:
            post_info = {
                'id': params['document_id'],
                'model': 'SignatureDoc',
                'app': 'esign'
            }
            res = PostUserToken.validate_token_for_post(token, post_info)
            if type(res) is str:
                return res
            else:
                user = res.user

        if not user.id:
            return 'Unauthorized to get sign document'
        file_obj = cls.objects.get(id=file_id)
        file_name = file_obj.name
        users = Profile.objects.all()
        users = queryset_to_list(users,fields=['id','name'])
        meetings = Event.objects.filter(publish=True).exclude(archived=True)
        meetings = queryset_to_list(meetings,fields=['id','name'])
        meeting_id = False
        send_to_all = False

        if file_obj.meeting:
            meeting_id = file_obj.meeting.id
        if file_obj.send_to_all:
            send_to_all = file_obj.send_to_all

        doc_data = SignatureDoc.get_doc_data(request, file_obj, token)
        if type(doc_data) is str:
            return doc_data
        doc_data['doc_name'] = file_name
        doc_data["meetings"] = meetings
        doc_data["users"] = users
        doc_data["meeting_id"] = meeting_id
        doc_data["send_to_all"] = send_to_all
        return doc_data

    @classmethod
    def save_sign_data(cls, request, params):
        doc_id = int(params['document_id'])
        meeting_id = params['meeting_id']
        send_to_all = params['send_to_all']
        doc = cls.objects.filter(id=doc_id)[0]
        if send_to_all:
            doc.send_to_all=True
        if not send_to_all:
            doc.send_to_all=False
        if meeting_id:
            meeting_id = int(meeting_id)
            doc.meeting_id=meeting_id
        if not meeting_id:
            doc.meeting=None
        doc.save()
        signatures = json.loads(params['data'])
        user_ids = []
        if send_to_all:
            meeting = Event.objects.get(id=meeting_id)
            sign_top = 5
            c = 0
            for partner in meeting.attendees.all():
                user_ids.append(partner.id)
                if c == 0:
                    sign_left = 3
                if c == 1:
                    sign_left = 51
                obj = Signature(
                    document_id=doc.id,
                    user_id=partner.id,
                    type='signature',
                    left=sign_left,
                    top=sign_top,
                    height=40,
                    width =140,
                    zoom=300
                )
                obj.save()
                if c == 1:
                    c = 0
                    sign_top += 15
                    continue
                c += 1
            doc.add_pages_for_sign()
        else:
            user_ids = [sign["user_id"] for sign in signatures]
            user_ids = list(OrderedDict.fromkeys(user_ids))
            for u in user_ids:
                for sign in [x for x in signatures if x['user_id'] == u]:
                    obj = Signature(
                        document_id=sign['document_id'],
                        user_id=sign['user_id'],
                        email=sign['email'],
                        name =sign['name'],
                        field_name =sign['field_name'],
                        left =sign['left'], top = sign['top'],
                        page =sign['page'],
                        height=sign['height'], width = sign['width'],
                        zoom=sign['zoom'], type = sign['type']
                    )
                    obj.created_by_id = request.user.id
                    obj.save()
        template_data = {            
            'subject': params['subject'],
            'message': params['message'],
            'url': server_base_url + '/#/token-sign-doc/'+str(doc.id)+'/'
        }
        post_info = {}
        post_info['res_app'] = 'esign'
        post_info['res_model'] = 'SignatureDoc'
        post_info['res_id'] = doc.id
        template_name = 'esign/esign_request.html'
        email_data = {
            'subject': params['subject'],
            'audience': user_ids,
            'post_info': post_info,
            'template_data': template_data,
            'template_name': template_name,
            'token_required': True
        }
        ws_methods.send_email_on_creation(email_data)
        doc_data = SignatureDoc.get_doc_data(request,doc)
        return doc_data


    def add_pages_for_sign( self):
        if not self.original_pdf or not self.signature_set.all().exists():
            return
        pth = MEDIA_ROOT + "/" + self.original_pdf.name


        input = PdfFileReader(open(pth, "rb"))
        # Addition of code for orientation correction Asfand
        pageValue = input.getPage(0)
        pageOrientation = pageValue.get('/Rotate')
        page = input.getPage(0).mediaBox
        zAxis = page.getUpperRight_x()
        yAxis = page.getUpperLeft_x()
        width = int(zAxis - yAxis)

        height = int(page.getUpperRight_y() - page.getLowerRight_y())
        solution = [width, height]
        if width > height or pageOrientation == 90:
            if height > width:
                orientation = 'L'
            else:
                orientation = 'P'
        elif pageOrientation == 0 or pageOrientation == 180 or pageOrientation == None:
            if width > height:
                orientation = 'L'
            else:
                orientation = 'P'

        output = PdfFileWriter()
        count = 0
        pdf = FPDF(orientation, 'pt', solution)
        pdf.add_page(orientation=orientation)
        # Addition ended
        for page_number in range(input.getNumPages()):
            output.addPage(input.getPage(page_number))
        current_pg = input.getNumPages() + 1

        for sign in self.signature_set.all():
            count = count + 1
            sign.page = current_pg
            sign.save()
            if (count == 9):
                pdf.add_page(orientation=orientation)
                count = 0
                current_pg += 1

        signature_only_pdf_path = MEDIA_ROOT + "/files/signature-pdf-pages" + str(self.id) + ".pdf"
        pdf.output(signature_only_pdf_path, "F")

        pdf.close()

        signaturepdf = PdfFileReader(open(signature_only_pdf_path, "rb"))
        for page_number in range(signaturepdf.getNumPages()):
            output.addPage(signaturepdf.getPage(page_number))

        output_pdf_path = MEDIA_ROOT + "/files/sign-doc-output-pages" + str(self.id) + ".pdf"
        with open(output_pdf_path, "wb") as outputStream:
            output.write(outputStream)
        res = open(output_pdf_path, 'rb')
        self.pdf_doc.save(self.original_pdf.name, DjangoFile(res))
        self.original_pdf.save(self.original_pdf.name, DjangoFile(res))

