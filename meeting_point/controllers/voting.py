import json
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

    # Voting Answer Submission
    @http.route(['/voting/submit'],
                type='http', auth='public', website=True)
    def voting_answer(self, **kw):
        uid = request.uid
        voting_id = int(kw['voting_id'])
        votingAnswer = request.env['meeting_point.votinganswer']
        # votingAnswer.user_answer = kw['user_answer']
        # votingAnswer.voting_id =kw['voting_id']
        current_voting_answer = votingAnswer.search([('voting_id', '=', voting_id), ('user_id', '=', uid)])
        vals = {
            'user_answer': kw['user_answer'],
            'voting_id': voting_id,
            'user_id': uid
        }
        if current_voting_answer:
            res = current_voting_answer.write(vals)
            return 'Corrected'
        else:
            res = votingAnswer.create(vals)
            return 'Create'



    # Voting Answer to User
    @http.route(['/votinganswer'], type='http', auth='public', website=True)
    def user_voting_answer(self, **kw):
        uid = request.uid
        voting_id = int(kw['voting_id'])
        votingAnswer = request.env['meeting_point.votinganswer']
        current_voting_answer = votingAnswer.search([('voting_id', '=', voting_id), ('user_id', '=', uid)])
        if current_voting_answer:
            return current_voting_answer['user_answer']
        else:
            return ''

        # Voting OverAll Results

    @http.route(['/voting/results'], type='http', auth='public', website=True)
    def voting_result(self, **kw):
        voting_id = int(kw['voting_id'])
        uid = request.uid
        voting_results = request.env['meeting_point.votinganswer'].search([('voting_id', '=', voting_id)])

        votingType = request.env['meeting_point.voting'].search([('id','=',voting_id)]).voting_type
        votingAnswer = {}
        if votingType == 'voting':
            votingAnswer={'yes':0,'no':0,'abstain':0}
        elif votingType == 'approval':
            votingAnswer={'approved':0,'reject':0}
        else :
            a = 0
        if len(votingAnswer)> 0:
            for val in voting_results:
                if val.user_answer in votingAnswer:
                    votingAnswer[val.user_answer] +=1
                else :
                    pass
        res = {'total': len(voting_results),
               'votingCount' : votingAnswer
               }
        json.dumps(res)
        return res