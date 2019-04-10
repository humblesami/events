import json
from odoo import http
from odoo.http import request
from odoo.addons.dn_base import ws_methods
from odoo.addons.survey.controllers.main import WebsiteSurvey

class website_survey(WebsiteSurvey):

    @http.route('/survey-details', type="http", csrf=False, auth='public', cors='*')
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
            if not survey.name:
                data['survey_name'] = 'Unnamed'
            else:
                data['survey_name'] = survey.name
            return ws_methods.http_response('', data)
        except:
            ws_methods.handle()

    @http.route(['/survey/start/<model("survey.survey"):survey>',
                 '/survey/start/<model("survey.survey"):survey>/<string:token>',
                 '/survey/start/<model("survey.survey"):survey>/iframe/<string:auth_token>/<string:db>'],
                type='http', auth='public', website=True)
    def start_survey(self, survey, token=None, auth_token=None, db=None, **post):
        UserInput = request.env['survey.user_input']
        if auth_token and db:
            ws_methods.check_auth({'token':auth_token, 'db': db})
        if token and token == "phantom":
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
            # return request.render("website.403")
            vals = {'survey_id': survey.id}
            if request.website.user_id != request.env.user:
                user_input = UserInput.sudo().search(['&',('partner_id', '=', request.env.user.partner_id.id),('survey_id','=',survey.id)], limit=1)
                if not user_input:
                    user_input = UserInput.create(vals)
            else:
                return request.render("website.403")
            #     vals['partner_id'] = request.env.user.partner_id.id
            # user_input = UserInput.create(vals)
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

    @http.route('/voting-submit', type="http", csrf=False, auth='public', cors='*')
    def submit_dn_survey_http(self, **kw):
        try:
            questions = kw.get('questions')
            if not questions:
                ws_methods.http_response('No answers provided')
            kw['questions'] = json.loads(questions)
        except:
            return ws_methods.handle()
        return self.submit_dn_survey(kw)

    @http.route('/voting-submit-json', type="json", csrf=False, auth='public', cors='*')
    def submit_dn_survey_json(self, **kw):
        kw = request.jsonrequest
        return self.submit_dn_survey(kw)

    def submit_voting(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            if 'data' in values:
                values = values['data']
            return ws_methods.http_response('', 'success')
        except:
            return ws_methods.handle()