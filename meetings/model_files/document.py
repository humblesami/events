from .event import Event
from .topic import Topic
from django.db import models
from mainapp import ws_methods
from documents.file import File
from django.db import transaction
from meetings.model_files.user import Profile
from mainapp.ws_methods import queryset_to_list
from django.core.files import File as DjangoFile
from esign.model_files.document import SignatureDoc, Signature


class MeetingDocument(File):
    meeting = models.ForeignKey(Event, on_delete=models.CASCADE)

    @property
    def breadcrumb(self):
        event_obj = self.meeting
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

    @classmethod
    def get_detail(cls, request, params):
        file_id = int(params['document_id'])
        token = params['token']
        file_name = ''
        if token:
            signature = Signature.objects.filter(token=token)
            if not signature.exists():
                return "Invalid Token"
            file_obj = cls.objects.filter(id=file_id)[0]
            file_name = file_obj.name
        else:
            file_obj = cls.objects.filter(id=file_id)[0]
            file_name = file_obj.name
        users = Profile.objects.all()
        users = queryset_to_list(users, fields=['id', 'name'])
        meetings = Event.objects.all()
        meetings = queryset_to_list(meetings, fields=['id', 'name'],
                                    related={'attendees': {'fields': ['id', 'username']}})
        meeting_id = False
        send_to_all = False

        if file_obj.meeting:
            meeting_id = file_obj.meeting.id
        if file_obj.send_to_all:
            send_to_all = file_obj.send_to_all

        doc_data = cls.get_doc_data(request, file_obj, token)
        doc_data['doc_name'] = file_name
        doc_data["meetings"] = meetings
        doc_data["users"] = users
        doc_data["meeting_id"] = meeting_id
        doc_data["send_to_all"] = send_to_all
        return doc_data


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
    
    def embed_signatures(self):
        file = self.original_pdf
        signed_doc = self.get_signed_doc(file, self.signature_set.all())
        self.pdf_doc.save(self.original_pdf.name, DjangoFile(signed_doc), self.send_to_all)
    
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
    def get_records(cls, request, params):
        docs = SignDocument.objects.filter()
        total_cnt = docs.count()
        current_cnt = total_cnt
        docs = queryset_to_list(
            docs,fields=['name','id']
        )
        result = {'records': docs, 'total': total_cnt, 'count': current_cnt}
        return result