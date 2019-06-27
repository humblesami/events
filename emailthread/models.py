import threading
from time import sleep
from django.db import models
from threading import Thread
from mainapp.ws_methods import send_email
from restoken.models import PostUserToken
from django.template.loader import render_to_string


class EmailThread(threading.Thread):
    def __init__(self, subject, user_ids, data_for_template, template_name, token_required, params):
        self.subject = subject
        self.user_ids = user_ids
        self.data_for_template = data_for_template
        self.template_name = template_name
        self.token_required = token_required
        self.params = params
        threading.Thread.__init__(self)

    def run (self):
        subject = self.subject
        for user_id in self.user_ids:
            self.params['user_id'] = user_id
            user_token = PostUserToken.create_token(self.params)
            e = threading.Event()
            e.wait(timeout=2)
            if user_token:
                self.data_for_template['token'] = user_token.token
            else:
                html_message = render_to_string(self.template_name, {'error': 'Error in Generating Token.'})
            user_email = []
            user_email = user_token.user.email
            html_message = render_to_string(self.template_name, self.data_for_template)
            send_email(self.subject, html_message, [user_email])