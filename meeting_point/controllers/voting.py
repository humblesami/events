import logging
from odoo.http import request
from odoo import http ,SUPERUSER_ID
from odoo.addons.dn_base import ws_methods
from odoo.addons.survey.controllers.main import WebsiteSurvey
from odoo.addons.http_routing.models.ir_http import slug
_logger = logging.getLogger(__name__)
import werkzeug
from datetime import datetime
class website_voting(http.Controller):
    @http.route(['/voting/start/<model("meeting_point.voting"):voting>'],
                type='http', auth='public', website=True)
    def start_token_voting(self, voting, **post):
        data = {'voting': voting, 'page': None}
        if voting.my_status == 'pending':
            page = request.render('meeting_point.voting_init', data)
            return page
        else:
            return request.redirect('%s/vote-submitted/%d' %( ws_methods.get_main_url(), int(voting.id)))
            pass


    @http.route(['/vote-submitted/<int:voting_id>'],
                type='http', auth='public', website=True)
    def vote_submitted(self, voting_id, **kw):
        # voting_id = int(voting_id)
        votinganswer = request.env['meeting_point.votinganswer'].search([('voting_id', '=', voting_id)])
        data = {'votinganswer' : votinganswer, 'page': None}
        page = request.render('meeting_point.vote_submitted', data)
        return page
    # voting display

    # @http.route(['/vote/fill/<string:voting>'],
    #             type='http', auth='public', website=True)
    # def fill1_vote(self, voting, **post):
    #     # data = {'voting': voting}
    #     return request.render('meeting_point.voting', voting)

    @http.route(['/vote/fill/<model("meeting_point.voting"):voting>'],
                type='http', auth='public', website=True)
    def fill_vote(self, voting, **post):
        data = {'voting': voting}
        page = request.render('meeting_point.voting', data)
        return  page

    # Voting Answer
    @http.route(['/voting/submit'],
                type='http', auth='public', website=True)
    def voting_answer(self, **kw):
        votingAnswer = request.env['meeting_point.votinganswer']
        # votingAnswer.user_answer = kw['user_answer']
        # votingAnswer.voting_id =kw['voting_id']
        data = votingAnswer.create({
            'user_answer':kw['user_answer'],
            'voting_id':kw['voting_id'],
            'user_id':request.uid
        })
        return 'Submitted'# request.render('meeting_point.answerpage', data)
