import json
from odoo import http
from odoo.http import request
from odoo.addons.dn_base import ws_methods

class website_voting(http.Controller):

    @http.route(['/voting/get_signature'], type='http', csrf=False, auth='public', cors='*')
    def get_signature(self, **kw):
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
            signature = ''
            votingAnswer = request.env['meeting_point.votinganswer']
            res = 'error'
            votingAnswer = votingAnswer.search([('voting_id', '=', voting_id), ('user_id', '=', uid)])

            if votingAnswer.signature_data:
                signature = votingAnswer.signature_data
                signature = signature.decode('utf-8')
            else:
                user = request.env['meeting_point.users'].search([('user_id', '=', uid)])
                signature = user.signature_img
                if signature:
                    signature = signature.decode('utf-8')

            signature_data = {'signature_data' : signature}
            return ws_methods.http_response('', signature_data)
        except:
            return ws_methods.handle()

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

            vals = {}
            voting_id = int(kw['voting_id'])
            voting_object = request.env['meeting_point.voting'].search([('id', '=', voting_id)])
            if voting_object.signature_required:
                vals['signature_data'] = kw['signature_data']
            votingAnswer = request.env['meeting_point.votinganswer']
            vals['voting_option_id'] = kw['voting_option_id']
            res = 'error'
            current_voting_answer = votingAnswer.search([('voting_id', '=', voting_id), ('user_id', '=', uid)])
            if current_voting_answer:
                current_voting_answer.write(vals)
                voting_object._compute_signature()
                res = 'Update'
            else:
                vals['voting_id'] = voting_id,
                vals['user_id'] = uid
                votingAnswer.create(vals)
                res = 'Create'
            if voting_object.signature_required:
                return ws_methods.http_response('', {'voting_option_id' : kw['voting_option_id'], 'operation': res, 'signature_data': kw['signature_data']})
            else:
                return ws_methods.http_response('', {'voting_option_id': kw['voting_option_id'], 'operation': res})
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
            filters = [('voting_id', '=', voting_id), ('user_id', '=', uid), (1, '=', 1)]

            voting_answers = {}
            voting_options_array = []
            for option in voting_options:
                voting_options_array.append({'name': option.name, 'id': option.id})
                filters[len(filters) - 1] = ('voting_option_id', '=', option.id)
                voting_answers[option.name] = request.env['meeting_point.votinganswer'].search_count(filters)

            res = {
                'vote_options': voting_options_array,
                'voting_answers': voting_answers,
                'my_status': voting_object.my_status
            }
            if voting_object.public_visibility:
                res['public'] = 1
            if voting_object.signature_required:
                res['signature_required'] = 1
            if voting_object.enable_discussion:
                res['discussion_enabled'] = 1
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

    @http.route([
        '/voting/graphical/<model("meeting_point.voting"):voting_object>',
        '/voting/graphical/<model("meeting_point.voting"):voting_object>/<string:uid>/<string:token>/<string:db>'
    ],
        type='http', auth='public', website=True)
    def start_graphical_view(self, voting_object, uid=None, token=None, db=None, **post):

        try:
            auth = {'token': token, 'db': db, 'uid': uid}
            uid = ws_methods.check_auth(auth)
            if not uid:
                return ws_methods.not_logged_in()

            if uid != 1 and not request.env.user.has_group('meeting_point.admin'):
                if not voting_object.public_visibility:
                    return request.render('meeting_point.no_access_to_view', {})
                else:
                    allowed = self.check_partner(voting_object, uid)
                    if not allowed:
                        return request.render('meeting_point.no_access_to_view', {})

            if not voting_object:
                return ws_methods.http_response('No object found')

            voting_id = voting_object.id
            voting_type = voting_object.voting_type_id

            voting_options = voting_type.voting_option_ids

            voting_answers = []
            total_count = 0
            filters = [('voting_id', '=', voting_id), ('voting_option_id', '=', False)]
            for option in voting_options:
                filters[len(filters) - 1] = ('voting_option_id', '=', option.id)
                count = request.env['meeting_point.votinganswer'].search_count(filters)
                answer = {'text': option.name, 'count': count, 'answer_id': 1}
                voting_answers.append(answer)
                total_count += count

            expected_no_answers = len(voting_object.partner_ids)
            pending_count = expected_no_answers - total_count

            pending_answers = {'text': 'Pending', 'count': pending_count, 'answer_id': 1}
            # voting_answers.append(pending_answers)

            answers_str = json.dumps(voting_answers)
            dict1 = {
                'page_ids': [
                    {
                        'question_ids': [
                            {
                                'question': voting_object.name,
                                'input_summary': {
                                    'total_inputs': len(voting_options),
                                    'answered': total_count,
                                    'skipped': pending_count
                                },
                                'prepare_result': {
                                    'answers': voting_answers,
                                    'comments': []
                                },
                                'graph_data': answers_str
                            }
                        ]
                    }
                ]
            }

            results = {
                'voting': voting_object,
                'voting_dict': dict1,
                'page': None,
            }

            a = 1
            return request.render('meeting_point.voting_approval_graphically', results)
        except:
            return request.render('meeting_point.voting_graphically', {})


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
            req_env = http.request.env
            voting_id = int(kw['id'])
            filters = [('id', '=', voting_id)]
            voting_obj_orm = req_env['meeting_point.voting'].search(filters)

            if uid != 1 and not request.env.user.has_group('meeting_point.admin'):
                allowed = self.check_partner(voting_obj_orm, uid)
                if not allowed:
                    data = {"message": 'You are not Authorized to Access this Page!'}
                    return ws_methods.http_response('', data)

            props = ['id', 'name', 'meeting_id', 'open_date', 'close_date',
                     'description', 'my_status', 'public_visibility', 'graphical_view_url', 'meeting_id',
                     'enable_discussion', 'signature_required', 'signature_data'
                     ]
            voting_object = ws_methods.object_to_json_object(voting_obj_orm, props)
            voting_object['voting_docs'] = ws_methods.objects_list_to_json_list(voting_obj_orm.document_ids, ['id', 'name'])
            voting_object['voting_type'] = ws_methods.objects_list_to_json_list(voting_obj_orm.voting_type_id, ['id', 'name'])
            voting_object['meeting'] = ws_methods.object_to_json_object(voting_obj_orm.meeting_id,
                                                                                ['id', 'name'])
            voting_object['topic'] = ws_methods.object_to_json_object(voting_obj_orm.topic_id,
                                                                                ['id', 'name'])
            voting_object['motion_first'] = {'id': voting_obj_orm.motion_first.partner_id.mp_user_id.id, 'name': voting_obj_orm.motion_first.name}
            voting_object['motion_second'] = {'id': voting_obj_orm.motion_second.partner_id.mp_user_id.id, 'name': voting_obj_orm.motion_second.name}
            # voting_object['Respondents'] = ws_methods.objects_list_to_json_list(voting_obj_orm.partner_ids, ['id', 'name'])
            if voting_object['voting_type']:
                voting_options = req_env['meeting_point.votingoption'].search([('voting_type_id', '=', voting_object['voting_type'][0]['id'])])
                voting_object['voting_options'] = []
                for option in voting_options:
                    voting_object['voting_options'].append({'id': option.id, 'name': option.name})
            data = {"voting": voting_object}
            return ws_methods.http_response('', data)
        except:
            return ws_methods.handle()

    def check_partner(self, voting_obj_orm, uid):
        allowed = False
        if voting_obj_orm.partner_ids:
            for partner in voting_obj_orm.partner_ids:
                if partner.user_id.id == uid:
                    allowed = True
        return allowed