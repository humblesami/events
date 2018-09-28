import json

from odoo import http
from odoo.http import request
from odoo.addons.dn_base import ws_methods
from odoo.addons.survey.controllers.main import WebsiteSurvey

class website_survey(WebsiteSurvey):

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
            page_id = survey.page_ids[0].id
            questions = request.env['survey.question'].search([('survey_id', '=', survey_id)])
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
            ws_methods.handle()

    @http.route('/survey-user-response', type="http", csrf=False, auth='none', cors='*')
    def submit_dn_survey_http(self, **kw):
        try:
            questions = kw.get('questions')
            if not questions:
                ws_methods.http_response('No answers provided')
            kw['questions'] = json.loads(questions)
        except:
            ws_methods.handle()
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
            survey_id = values['survey_id']
            survey = request.env['survey.survey'].search([('id', '=', survey_id)])
            page_id = survey.page_ids[0].id
            user_input = request.env['survey.user_input'].create({'survey_id': survey_id, 'test_entry': True})
            post = {'button_submit': 'finish', 'token': user_input.token, 'page_id': page_id}
            questions = values['questions']
            for q in questions:
                q_key = str(survey_id) + '_' + str(page_id) + '_' + str(q['id'])
                if 'answer' in q:
                    post[q_key] = str(q['answer'])

            questions = request.env['survey.question'].search([('survey_id', '=', survey_id)])
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
            ws_methods.handle()