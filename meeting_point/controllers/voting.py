import logging
from odoo.http import request
from odoo import http ,SUPERUSER_ID
from odoo.addons.dn_base import ws_methods
from odoo.addons.survey.controllers.main import WebsiteSurvey
_logger = logging.getLogger(__name__)
import werkzeug
from datetime import datetime
class website_voting(http.Controller):
    @http.route(['/voting/start/<model("meeting_point.voting"):voting>'],
                type='http', auth='public', website=True)
    def start_token_voting(self, voting, **post):
        data = {'voting': voting, 'page': None}
        return request.render('meeting_point.voting_init', data)

    # voting display
    @http.route(['/vote/fill/<model("meeting_point.voting"):voting>/<string:token>'],
                type='http', auth='public', website=True)
    def fill_vote(self, voting, token, **post):
        data = {'voting': voting, 'page': 1, 'token': token}
        return request.render('meeting_point.voting', data)


    # Voting Answer
    @http.route(['/voting/answer/<model("meeting_point.votinganswer"):answer>/<string:token>'],
                type='http', auth='public', website=True)
    def voting_answer(self, answer, **kw):
        data = {'answer': answer, 'page': None}
        return 'Submitted'# request.render('meeting_point.answerpage', data)
