import os
import sys
import traceback
import threading
from mainapp import settings
from PyPDF2 import PdfFileReader
from django.core.mail import send_mail
from restoken.models import PostUserToken
from django.contrib.auth.models import User
from django.template.loader import render_to_string


def produce_exception(msg=None):
    if not msg:
        eg = traceback.format_exception(*sys.exc_info())
        errorMessage = ''
        cnt = 0
        for er in eg:
            cnt += 1
            if not 'lib/python' in er:
                errorMessage += " " + er
    else:
        errorMessage = msg
    try:
        dir = os.path.dirname(os.path.realpath(__file__))
        ar = dir.split('/')
        ar = ar[:-1]
        dir = ('/').join(ar)
        with open(dir+'/error_log.txt', "a+") as f:
            f.write(errorMessage + '\n')
    except:
        try:
            dir = os.path.dirname(os.path.realpath(__file__))
            ar = dir.split('\\')
            ar = ar[:-1]
            dir = ('\\').join(ar)
            with open(dir + '\\error_log.txt', "a+") as f:
                f.write(errorMessage + '\n')
        except:
            eg = traceback.format_exception(*sys.exc_info())
            errorMessage = ''
            cnt = 0
            for er in eg:
                cnt += 1
                if not 'lib/python' in er:
                    errorMessage += " " + er
            return errorMessage


class EmailThread(threading.Thread):
    def __init__(self, thread_data):
        self.subject = thread_data['subject']
        self.user_ids = thread_data['audience']
        self.template_data = thread_data['template_data']
        self.template_name = thread_data['template_name']
        self.token_required = thread_data.get('token_required')
        self.token_info = thread_data['post_info']
        threading.Thread.__init__(self)

    def run (self):
        try:
            subject = self.subject
            for user_id in self.user_ids:
                self.token_info['user_id'] = user_id
                user = {}
                if self.token_required:
                    if self.token_required == 'remove':
                        user_token = PostUserToken.objects.filter(user_id=user_id, post_info__res_id=self.token_info['res_id'])
                        if user_token:
                            user = user_token[0].user
                            user_token.delete()
                        e = threading.Event()
                        e.wait(timeout=2)
                    else:    
                        user_token = PostUserToken.create_token(self.token_info)
                        e = threading.Event()
                        e.wait(timeout=2)
                        if user_token:
                            self.template_data['token'] = user_token.token
                            user = user_token.user
                        else:
                            html_message = render_to_string(self.template_name, {'error': 'Error in Generating Token.'})
                else:
                    user = User.objects.get(pk=user_id)
                    e = threading.Event()
                    e.wait(timeout=2)
                if user and user.email:
                    user_email = user.email
                    try:
                        if user.profile.mail_to_assistant:
                            assistant_email = user.profile.admin_email
                            if assistant_email:
                                html_message = render_to_string(self.template_name, self.template_data)
                                send_mail(self.subject, '', "sami@gmai.com", [assistant_email], html_message=html_message)
                    except:
                        pass
                    html_message = render_to_string(self.template_name, self.template_data)
                    send_mail(self.subject, '', "sami@gmai.com", [user_email], html_message=html_message)
                else:
                    produce_exception('User Not Found..!')
        except:
            produce_exception()


class ThreadEmail(threading.Thread):
    def __init__(self, thread_data):
        self.subject = thread_data['subject']
        self.emails = thread_data['emails']
        self.template_data = thread_data['template_data']
        self.template_name = thread_data['template_name']
        threading.Thread.__init__(self)

    def run (self):
        try:
            subject = self.subject
            html_message = render_to_string(self.template_name, self.template_data)
            send_mail(self.subject, '', "sami@gmai.com", self.emails, html_message=html_message)
        except:
            pass
            produce_exception('')


class DocumentThread(threading.Thread):
    def __init__(self, doc_obj):
        self.doc_obj = doc_obj
        threading.Thread.__init__(self)

    def run (self):
        try:
            self.get_pdf(self.doc_obj)
            if self.doc_obj.html:
                self.doc_obj.content = self.doc_obj.html
            else:
                if not self.doc_obj.pdf_doc:
                    produce_exception('File conversion failed')
                if not self.doc_obj.pdf_doc.file:
                    produce_exception('File conversion failed.')
                self.doc_obj.content = self.text_extractor(self.doc_obj.pdf_doc)
                self.doc_obj.uplaod_status = True
            self.doc_obj.save()
        except:
            produce_exception('')

    def get_pdf(self, doc):
        try:
            tmp = doc.attachment.url.split('.')
            ext = tmp[len(tmp) - 1]
            filename = doc.attachment.name.replace("files/","").split(".")[0]
            pth = settings.BASE_DIR + doc.attachment.url
            if ext in ('odt', 'doc','docx','ppt','pptx','pdf'):
                doc.doc2pdf(pth,ext,filename)
            elif ext == "xls" or ext =="xlsx":
                doc.excel2xhtml(pth,filename)
            elif ext in ['png','jpg','jpeg']:
                doc.img2pdf(pth,filename)
            else:
                produce_exception('Invalid File Type')
        except:
            produce_exception('')
    
    def text_extractor(self, f):
        try:    
            pdf = PdfFileReader(f)
            number_of_pages = pdf.numPages
            n = 0
            text = ''
            while n != number_of_pages:
                page = pdf.getPage(n)
                text += page.extractText() + ' '
                n += 1
            return text
        except:
            produce_exception('')