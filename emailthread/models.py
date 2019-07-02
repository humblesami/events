import sys
import traceback
import threading
from time import sleep
from django.db import models
from threading import Thread
from django.core.mail import send_mail
from meetings.model_files.user import Profile
from restoken.models import PostUserToken
from django.template.loader import render_to_string

def produce_exception(msg):
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
    with open('error_log.txt', "a+") as f:
        f.write(errorMessage + '\n')



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
                    user = Profile.objects.get(pk=user_id)
                    e = threading.Event()
                    e.wait(timeout=2)
                if user and user.email:
                    user_email = user.email
                    html_message = render_to_string(self.template_name, self.template_data)
                    send_mail(self.subject, '', "sami@gmai.com", [user_email], html_message=html_message)
                else:
                    produce_exception('User Not Found..!')
        except:
            produce_exception('')