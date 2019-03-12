import json
import logging
from odoo.http import request
from odoo import http ,SUPERUSER_ID
from odoo.addons.dn_base import ws_methods
from odoo.addons.survey.controllers.main import WebsiteSurvey
_logger = logging.getLogger(__name__)
import werkzeug
from datetime import datetime
class website_survey(WebsiteSurvey):
    def _check_bad_cases(self, survey, token=None):
        # In case of bad survey, redirect to surveys list
        if not survey.sudo().exists():
            return werkzeug.utils.redirect("/survey/")

        # In case of auth required, block public user
        if survey.auth_required and request.env.user == request.website.user_id:
            return request.render("survey.auth_required", {'survey': survey, 'token': token})

        # In case of non open surveys
        if survey.stage_id.closed:
            return request.render("survey.notopen")

        # If there is no pages
        if not survey.page_ids:
            return request.render("survey.nopages", {'survey': survey})

        # Everything seems to be ok
        return None

    def _check_deadline(self, user_input):
        '''Prevent opening of the survey if the deadline has turned out

        ! This will NOT disallow access to users who have already partially filled the survey !'''
        deadline = user_input.deadline
        if deadline:
            dt_deadline = fields.Datetime.from_string(deadline)
            dt_now = datetime.now()
            if dt_now > dt_deadline:  # survey is not open anymore
                return request.render("survey.notopen")
        return None

    @http.route('/survey-questions', type="http", csrf=False, auth='none', cors='*')
    def get_survey_http(self, **kw):
        return self.get_survey_questions(kw)

    @http.route('/survey-questions-json', type="json", csrf=False, auth='none', cors='*')
    def get_survey_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.get_survey_questions(req_body)

    def get_survey_questions(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            if 'data' in values:
                values = values['data']
            survey_id = int(values['survey_id'])
            survey = request.env['survey.survey'].search([('id', '=', survey_id)])
            user_status = survey.user_status(uid)
            if user_status != "pending":
                return ws_methods.http_response(user_status)
            #page_id = survey.page_ids[0].id

            questions = request.env['survey.question'].search([('survey_id', '=', survey_id)])
            if not questions:
                title = survey.title
                if not title:
                    title = survey.name
                if not title:
                    title = 'unnamed'
                return ws_methods.http_response("Survey "+title+"-"+survey_id+" has no questions")

            props = ['id','question','type']
            res_questions = ws_methods.objects_list_to_json_list(questions, props)
            props = ['id', 'meeting_id.id', 'meeting_id.name', 'title']
            survey_object = ws_methods.object_to_json_object(survey[0], props)
            i = 0
            for q in questions:
                valid_answers = []
                if q.labels_ids:
                    for ans in q.labels_ids:
                        valid_answers.append({'id': ans.id, 'val': ans.value })
                res_questions[i]['valid_answers'] = valid_answers
                i = i + 1
            survey_object['questions'] = res_questions
            return ws_methods.http_response('', survey_object)
        except:
            return ws_methods.handle()

    @http.route('/survey-details', type="http", csrf=False, auth='none', cors='*')
    def get_survey_http(self, **kw):
        try:
            uid = ws_methods.check_auth(kw)
            if not uid:
                return ws_methods.not_logged_in()
            survey_id = kw.get('survey_id')
            survey_id = int(survey_id)
            survey = request.env['survey.survey'].search([('id','=', survey_id)])
            data = { 'url': survey.url}
            if '/start/' in data['url']:
                data['url'] +='/iframe/' + kw.get('token') + '/' + kw.get('db')
            if survey.meeting_id:
                data['meeting_name'] = survey.meeting_id.name
                data['meeting_id'] = survey.meeting_id.id
            return ws_methods.http_response('', data)
        except:
            ws_methods.handle()

    @http.route('/survey-user-response', type="http", csrf=False, auth='none', cors='*')
    def submit_dn_survey_http(self, **kw):
        try:
            questions = kw.get('questions')
            if not questions:
                ws_methods.http_response('No answers provided')
            kw['questions'] = json.loads(questions)
        except:
            return ws_methods.handle()
        return self.submit_dn_survey(kw)

    @http.route('/survey-user-response-json', type="json", csrf=False, auth='none', cors='*')
    def submit_dn_survey_json(self, **kw):
        kw = request.jsonrequest
        return self.submit_dn_survey(kw)

    def submit_dn_survey(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            if 'data' in values:
                values = values['data']
            survey_id = int(values['survey_id'])
            survey = request.env['survey.survey'].search([('id', '=', survey_id)])
            questions = request.env['survey.question'].search([('survey_id', '=', survey_id)])
            if not questions:
                title = survey.title
                if not title:
                    title = survey.name
                if not title:
                    title = 'unnamed'
                return ws_methods.http_response("Survey "+title+"-"+survey_id+" has no questions")
            user_response = values['questions']
            if not user_response:
                return ws_methods.http_response("No answers provided to submit")
            user_status = survey.user_status(uid)
            if user_status != "pending":
                return ws_methods.http_response(user_status)
            page_id = survey.page_ids[0].id
            user_input = request.env['survey.user_input'].create({'survey_id': survey_id, 'test_entry': True})
            post = {'button_submit': 'finish', 'token': user_input.token, 'page_id': page_id}


            for q in user_response:
                q_key = str(survey_id) + '_' + str(page_id) + '_' + str(q['id'])
                if 'answer' in q:
                    post[q_key] = str(q['answer'])
            # Answer validation
            errors = {}
            for question in questions:
                answer_tag = "%s_%s_%s" % (survey.id, page_id, question.id)
                errors.update(question.validate_question(post, answer_tag))

            ret = {}
            if len(errors):
                # Return errors messages to webpage
                ret['errors'] = errors
            else:
                user_id = request.env.user.id

                for question in questions:
                    answer_tag = "%s_%s_%s" % (survey.id, page_id, question.id)
                    request.env['survey.user_input_line'].sudo(user=user_id).save_lines(user_input.id, question, post, answer_tag)

                go_back = post['button_submit'] == 'previous'
                next_page, _, last = request.env['survey.survey'].next_page(user_input, page_id, go_back=go_back)
                vals = {'last_displayed_page_id': page_id}
                if next_page is None and not go_back:
                    vals.update({'state': 'done'})
                else:
                    vals.update({'state': 'skip'})
                user_input.sudo(user=user_id).write(vals)

            return ws_methods.http_response('', 'success')
        except:
            return ws_methods.handle()


    @http.route(['/survey/start/<model("survey.survey"):survey>',
                 '/survey/start/<model("survey.survey"):survey>/<string:token>',
                 '/survey/start/<model("survey.survey"):survey>/iframe/<string:auth_token>/<string:db>'],
                type='http', auth='public', website=True)
    def start_survey(self, survey, token=None, auth_token=None, db=None, **post):
        UserInput = request.env['survey.user_input']
        if auth_token and db:
            ws_methods.check_auth({'token':auth_token, 'db': db})
        if token and token == "phantom":
            _logger.info("[survey] Phantom mode")
            user_input = UserInput.create({'survey_id': survey.id, 'test_entry': True})
            data = {'survey': survey, 'page': None, 'token': user_input.token}
            return request.render('survey.survey_init', data)
        # END Test mode

        # Controls if the survey can be displayed
        errpage = self._check_bad_cases(survey, token=token)
        if errpage:
            return errpage

        # Manual surveying
        if not token:
            vals = {'survey_id': survey.id}
            if request.website.user_id != request.env.user:
                vals['partner_id'] = request.env.user.partner_id.id
            user_input = UserInput.create(vals)
        else:
            user_input = UserInput.sudo().search([('token', '=', token)], limit=1)
            if not user_input:
                return request.render("website.403")

        # Do not open expired survey
        errpage = self._check_deadline(user_input)
        if errpage:
            return errpage

        # Select the right page
        if user_input.state == 'new':  # Intro page
            data = {'survey': survey, 'page': None, 'token': user_input.token}
            return request.render('survey.survey_init', data)
        else:
            return request.redirect('%s/survey/fill/%s/%s' % ( ws_methods.get_main_url(), survey.id, user_input.token))


    @http.route(['/survey/submit/<model("survey.survey"):survey>'], type='http', methods=['POST'], auth='public', website=True)
    def submit(self, survey, **post):
        page_id = int(post['page_id'])
        questions = request.env['survey.question'].search([('page_id', '=', page_id)])

        # Answer validation
        errors = {}
        for question in questions:
            answer_tag = "%s_%s_%s" % (survey.id, page_id, question.id)
            errors.update(question.validate_question(post, answer_tag))

        ret = {}
        if len(errors):
            # Return errors messages to webpage
            ret['errors'] = errors
        else:
            # Store answers into database
            try:
                user_input = request.env['survey.user_input'].sudo().search([('token', '=', post['token'])], limit=1)
            except KeyError:  # Invalid token
                return request.render("website.403")
            user_id = request.env.user.id if user_input.type != 'link' else SUPERUSER_ID

            for question in questions:
                answer_tag = "%s_%s_%s" % (survey.id, page_id, question.id)
                request.env['survey.user_input_line'].sudo(user=user_id).save_lines(user_input.id, question, post, answer_tag)

            go_back = post['button_submit'] == 'previous'
            next_page, _, last = request.env['survey.survey'].next_page(user_input, page_id, go_back=go_back)
            vals = {'last_displayed_page_id': page_id}
            if next_page is None and not go_back:
                vals.update({'state': 'done'})
            else:
                vals.update({'state': 'skip'})
            user_input.sudo(user=user_id).write(vals)
            ret['redirect'] = '%s/survey/fill/%s/%s' % (ws_methods.get_main_url(), survey.id, post['token'])
            if go_back:
                ret['redirect'] += ws_methods.get_main_url() + '/prev'
        return json.dumps(ret)

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