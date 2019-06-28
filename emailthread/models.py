import threading
from time import sleep
from django.db import models
from threading import Thread
from mainapp.ws_methods import send_email
from restoken.models import PostUserToken
from django.template.loader import render_to_string


class EmailThread(threading.Thread):
    def __init__(self, thread_data):
        self.subject = thread_data['subject']
        self.user_ids = thread_data['audience']
        self.template_data = thread_data['template_data']
        self.template_name = thread_data['template_name']
        self.token_required = thread_data['token_required']
        self.params = thread_data['params']
        threading.Thread.__init__(self)

    def run (self):
        subject = self.subject
        for user_id in self.user_ids:
            self.params['user_id'] = user_id
            user_token = PostUserToken.create_token(self.params)
            e = threading.Event()
            e.wait(timeout=2)
            if user_token:
                self.template_data['token'] = user_token.token
            else:
                html_message = render_to_string(self.template_name, {'error': 'Error in Generating Token.'})
            user_email = []
            user_email = user_token.user.email
            html_message = render_to_string(self.template_name, self.template_data)
            send_email(self.subject, html_message, [user_email])