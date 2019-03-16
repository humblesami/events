import json
from odoo import http
from odoo.http import request
from odoo.addons.dn_base import ws_methods

class website_voting(http.Controller):

    @http.route(['/voting/submit'], type='http', csrf=False, auth='public', cors='*')
    def voting_answer(self, **kw):
        try:
            auth = kw.get('auth')
            if not auth:
                auth = kw
            uid = ws_methods.check_auth(auth)
            if not uid:
                return ws_methods.not_logged_in()
            if kw.get('data'):
                kw = kw.get('data')

            ws_methods.check_auth(kw)
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
            res = 'error'
            if current_voting_answer:
                current_voting_answer.write(vals)
                res = 'Corrected'
            else:
                votingAnswer.create(vals)
                res = 'Created'
            return ws_methods.http_response('', res)
        except:
            return ws_methods.handle()

        # Voting OverAll Results

    @http.route(['/voting/results'], type='http', csrf=False, auth='public', cors='*')
    def voting_result(self, **kw):
        try:
            auth = kw.get('auth')
            if not auth:
                auth = kw
            uid = ws_methods.check_auth(auth)
            if not uid:
                return ws_methods.not_logged_in()
            if kw.get('data'):
                kw = kw.get('data')

            voting_id = int(kw['voting_id'])
            voting_results = request.env['meeting_point.votinganswer'].search([('voting_id', '=', voting_id)])
            if not voting_results:
                return ws_methods.http_response('',{'message' :'No answers yet'})

            voting_object = request.env['meeting_point.voting'].search([('id', '=', voting_id)])
            votingType = voting_object.voting_type
            voting_answers = {}
            if votingType == 'voting':
                voting_answers = {'Yes': 0, 'No': 0, 'Abstain': 0}
            elif votingType == 'approval':
                voting_answers = {'Approve': 0, 'Reject': 0}


            for obj in voting_results:
                voting_answers[obj.user_answer] += 1
            res = {'total': len(voting_results), 'votingCount': voting_answers, 'my_answer' : voting_object.my_answer}
            return ws_methods.http_response('', res)
        except:
            return ws_methods.handle()

    # Voting Answer to User
    @http.route(['/votinganswer'], type='http', csrf=False, auth='public', cors='*')
    def user_voting_answer(self, **kw):
        uid = request.uid
        voting_id = int(kw['voting_id'])
        votingAnswer = request.env['meeting_point.votinganswer']
        current_voting_answer = votingAnswer.search([('voting_id', '=', voting_id), ('user_id', '=', uid)])
        if current_voting_answer:
            return current_voting_answer['user_answer']
        else:
            return ''

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
