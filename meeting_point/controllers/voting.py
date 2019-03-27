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


            voting_id = int(kw['voting_id'])
            votingAnswer = request.env['meeting_point.votinganswer']
            vals = {
                'voting_option_id': kw['voting_option_id'],
            }
            res = 'error'
            current_voting_answer = votingAnswer.search([('voting_id', '=', voting_id), ('user_id', '=', uid)])
            if current_voting_answer:
                current_voting_answer.write(vals)
                res = 'Corrected'
            else:
                vals['voting_id'] = voting_id,
                vals['user_id'] = uid
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
            voting_object = request.env['meeting_point.voting'].search([('id', '=', voting_id)])
            if not voting_object:
                return ws_methods.http_response('No object found')

            votingType = voting_object.voting_type_id
            voting_options = votingType.voting_option_ids
            filters = [('voting_id', '=', voting_id), ('user_id', '=', uid)]
            filters.append('Hi')

            voting_answers = {}
            voting_options_array = []
            for option in voting_options:
                voting_options_array.append({'name':option.name,'id':option.id})
                filters[2] = ('voting_option_id','=',option.id)
                voting_answers[option.name] = request.env['meeting_point.votinganswer'].search_count(filters)

            res = { 'vote_options':voting_options_array, 'voting_answers': voting_answers, 'my_status' : voting_object.my_status}
            if voting_object.public_visibility:
                res['public'] = 1
            return ws_methods.http_response('', res)
        except:
            return ws_methods.handle()

    @http.route(['/voting/results_new/<model("meeting_point.voting"):voting>'], type='http', csrf=False, auth='public',
                cors='*')
    def voting_resultnew(self, voting, **kw):
        try:
            auth = kw.get('auth')
            if not auth:
                auth = kw
            uid = ws_methods.check_auth(auth)
            result_template = 'meeting_point.voting_result'
            answers = request.env['meeting_point.votinganswer'].search([('voting_id', '=', voting.id)])
            voting_type = voting.voting_type_id.display_name
            respondents = voting.partner_ids.ids
            response = []
            graphdata = [
                {
                    'label': 'Accept',
                    'count': 0,
                },
                {
                    'label': 'Reject',
                    'count': 0
                }
            ]
            for value in answers:
                response.append({'title': voting.name, 'text': value.voting_option_id.name, 'answer_id': value.id,
                                 'respondant': value.user_id.partner_id.name})
                if value.voting_option_id.name == 'Accept':
                    graphdata[0]['count'] += 1
                elif value.voting_option_id.name == 'Reject':
                    graphdata[1]['count'] += 1
                a = 1

            return request.render(result_template,
                                  {'voting': voting,
                                   'voting_dict': response,
                                   'graph_data': graphdata
                                   })

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


    @http.route(['/voting/graphical/<model("meeting_point.voting"):voting>'],
                type='http', auth='public', website=True)
    def start_graphical_view(self, voting, **post):
        data = {'voting': voting, 'page': None}
        page = request.render('meeting_point.voting_graphically', data)
        return page


    @http.route(['/voting/start/<model("meeting_point.voting"):voting>'],
                type='http', auth='public', website=True)
    def start_token_voting(self, voting, **post):
        data = {'voting': voting, 'page': None}
        # if voting.my_status == 'pending':
        page = request.render('meeting_point.voting_init', data)
        return page
        # else:
        #     return request.redirect('%s/vote-submitted/%d' %( ws_methods.get_main_url(), int(voting.id)))
        #     pass


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

    @http.route('/voting/details', type='http', auth='public', cors='*')
    def votingDetails(self, **kw):
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
            return ws_methods.http_response('', "hee")
        except:
            return ws_methods.handle()