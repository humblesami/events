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

    @http.route(['/survey/meet/start/<model("survey.survey"):survey>',
                 '/survey/meet/start/<model("survey.survey"):survey>/<string:token>'],
                type='http', auth='public', website=True)
    def start_survey_new(self, survey, token=None, **post):
        UserInput = request.env['survey.user_input']

        # Test mode
        if token and token == "phantom":
            _logger.info("[survey] Phantom mode")
            user_input = UserInput.create({'survey_id': survey.id, 'test_entry': True})
            data = {'survey': survey, 'page': None, 'token': user_input.token}
            return request.render('meeting_point.survey_init_new', data)
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
            # return request.render('survey.survey_init', data)
            return request.render('meeting_point.survey_init_new', data)
        else:
            return request.redirect(ws_methods.get_main_url() + '/survey/meet/fill/%s/%s' % (survey.id, user_input.token))

    @http.route(['/survey/meet/prefill/<model("survey.survey"):survey>/<string:token>',
                 '/survey/meet/prefill/<model("survey.survey"):survey>/<string:token>/<model("survey.page"):page>'],
                type='http', auth='public', website=True)
    def prefillnew(self, survey, token, page=None, **post):
        UserInputLine = request.env['survey.user_input_line']
        ret = {}

        # Fetch previous answers
        if page:
            previous_answers = UserInputLine.sudo().search([('user_input_id.token', '=', token), ('page_id', '=', page.id)])
        else:
            previous_answers = UserInputLine.sudo().search([('user_input_id.token', '=', token)])

        # Return non empty answers in a JSON compatible format
        for answer in previous_answers:
            if not answer.skipped:
                answer_tag = '%s_%s_%s' % (answer.survey_id.id, answer.page_id.id, answer.question_id.id)
                answer_value = None
                if answer.answer_type == 'free_text':
                    answer_value = answer.value_free_text
                elif answer.answer_type == 'text' and answer.question_id.type == 'textbox':
                    answer_value = answer.value_text
                elif answer.answer_type == 'text' and answer.question_id.type != 'textbox':
                    # here come comment answers for matrices, simple choice and multiple choice
                    answer_tag = "%s_%s" % (answer_tag, 'comment')
                    answer_value = answer.value_text
                elif answer.answer_type == 'number':
                    answer_value = str(answer.value_number)
                elif answer.answer_type == 'date':
                    answer_value = answer.value_date
                elif answer.answer_type == 'suggestion' and not answer.value_suggested_row:
                    answer_value = answer.value_suggested.id
                elif answer.answer_type == 'suggestion' and answer.value_suggested_row:
                    answer_tag = "%s_%s" % (answer_tag, answer.value_suggested_row.id)
                    answer_value = answer.value_suggested.id
                if answer_value:
                    ret.setdefault(answer_tag, []).append(answer_value)
                else:
                    _logger.warning("[survey] No answer has been found for question %s marked as non skipped" % answer_tag)
        return json.dumps(ret)

    @http.route(['/survey/meet/fill/<model("survey.survey"):survey>/<string:token>',
                 '/survey/meet/fill/<model("survey.survey"):survey>/<string:token>/<string:prev>'],
                type='http', auth='public', website=True)
    def fill_survey_new(self, survey, token, prev=None, **post):
        '''Display and validates a survey'''
        Survey = request.env['survey.survey']
        UserInput = request.env['survey.user_input']

        # Controls if the survey can be displayed
        errpage = self._check_bad_cases(survey)
        if errpage:
            return errpage

        # Load the user_input
        try:
            user_input = UserInput.sudo().search([('token', '=', token)], limit=1)
        except IndexError:  # Invalid token
            return request.render("website.403")

        # Do not display expired survey (even if some pages have already been
        # displayed -- There's a time for everything!)
        errpage = self._check_deadline(user_input)
        if errpage:
            return errpage

        # Select the right page
        if user_input.state == 'new':  # First page
            page, page_nr, last = Survey.next_page(user_input, 0, go_back=False)
            data = {'survey': survey, 'page': page, 'page_nr': page_nr, 'token': user_input.token}
            if last:
                data.update({'last': True})
            return request.render('meeting_point.survey_new', data)
        elif user_input.state == 'done':  # Display success message
            return request.render('meeting_point.sfinishedmodified', {'survey': survey,
                                                               'token': token,
                                                               'user_input': user_input})
        elif user_input.state == 'skip':
            flag = (True if prev and prev == 'prev' else False)
            page, page_nr, last = Survey.next_page(user_input, user_input.last_displayed_page_id.id, go_back=flag)

            #special case if you click "previous" from the last page, then leave the survey, then reopen it from the URL, avoid crash
            if not page:
                page, page_nr, last = Survey.next_page(user_input, user_input.last_displayed_page_id.id, go_back=True)

            data = {'survey': survey, 'page': page, 'page_nr': page_nr, 'token': user_input.token}
            if last:
                data.update({'last': True})
            return request.render('meeting_point.survey_new', data)
        else:
            return request.render("website.403")

    @http.route(['/survey/meet/submit/<model("survey.survey"):survey>'], type='http', methods=['POST'], auth='public',
                website=True)
    def submit_new(self, survey, **post):
        _logger.debug('Incoming data: %s', post)
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
                request.env['survey.user_input_line'].sudo(user=user_id).save_lines(user_input.id, question, post,
                                                                                    answer_tag)

            go_back = post['button_submit'] == 'previous'
            next_page, _, last = request.env['survey.survey'].next_page(user_input, page_id, go_back=go_back)
            vals = {'last_displayed_page_id': page_id}
            if next_page is None and not go_back:
                vals.update({'state': 'done'})
            else:
                vals.update({'state': 'skip'})
            user_input.sudo(user=user_id).write(vals)
            ret['redirect'] = ws_methods.get_main_url() + '/survey/meet/fill/%s/%s' % (survey.id, post['token'])
            if go_back:
                ret['redirect'] += '/prev'
        return json.dumps(ret)

    @http.route(['/survey/meet/print/<model("survey.survey"):survey>',
                 '/survey/meet/print/<model("survey.survey"):survey>/<string:token>'],
                type='http', auth='public', website=True)
    def print_survey_new(self, survey, token=None, **post):
        '''Display an survey in printable view; if <token> is set, it will
        grab the answers of the user_input_id that has <token>.'''
        return request.render('meeting_point.survey_print_new',
                                      {'survey': survey,
                                       'token': token,
                                       'page_nr': 0,
                                       'quizz_correction': True if survey.quizz_mode and token else False})

    @http.route(['/survey/meet/results/<model("survey.survey"):survey>'],
                type='http', auth='user', website=True)
    def survey_reporting_new(self, survey, token=None, **post):
        '''Display survey Results & Statistics for given survey.'''
        result_template = 'meeting_point.resultnew'
        current_filters = []
        filter_display_data = []
        filter_finish = False

        if not survey.user_input_ids or not [input_id.id for input_id in survey.user_input_ids if
                                             input_id.state != 'new']:
            result_template = 'meeting_point.no_result_new'
        if 'finished' in post:
            post.pop('finished')
            filter_finish = True
        if post or filter_finish:
            filter_data = self.get_filter_data(post)
            current_filters = survey.filter_input_ids(filter_data, filter_finish)
            filter_display_data = survey.get_filter_display_data(filter_data)
        return request.render(result_template,
                              {'survey': survey,
                               'survey_dict': self.prepare_result_dict(survey, current_filters),
                               'page_range': self.page_range,
                               'current_filters': current_filters,
                               'filter_display_data': filter_display_data,
                               'filter_finish': filter_finish
                               })





    @http.route(['/survey/start/<model("survey.survey"):survey>/iframe/<string:token>/<string:db>'],
                type='http', auth='public', website=True)
    def start_survey(self, survey, token, db, **post):
        if token and db:
            uid = ws_methods.check_auth({'token':token, 'db': db})
        token = request.env.context.get('survey_token')
        UserInput = request.env['survey.user_input']
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
            return request.redirect(ws_methods.get_main_url() + '/survey/fill/%s/%s' % (survey.id, user_input.token))

    # AJAX submission of a page
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
            ret['redirect'] = ws_methods.get_main_url() + '/survey/fill/%s/%s' % (survey.id, post['token'])
            if go_back:
                ret['redirect'] += '/prev'
        return json.dumps(ret)