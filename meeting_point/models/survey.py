from odoo.http import request
from odoo import models, fields, api
from odoo.addons.dn_base import ws_methods
from odoo.addons.http_routing.models.ir_http import slug


class Survey(models.Model):
    _inherit = ['survey.survey']#,'dn.seen']

    meeting_id = fields.Many2one('calendar.event',string="Meeting", ondelete='cascade')
    date = fields.Datetime(string="Meeting Date")
    name = fields.Char()
    my_status = fields.Char(string="Status",compute="_compute_status")
    #seen_by_me = fields.Integer(compute='_compute_seen_by_me',default=0)
    partner_ids = fields.Many2many('res.partner', 'survey_survey_res_partner_rel',
                                   string='Respondents',
                                   domain=lambda self: self.filter_attendees())
    audience = fields.Char(compute='_compute_audience')
    url = fields.Char(compute='_compute_url')
    base_url = fields.Char(compute = '_compute_base_url')


    def _compute_survey_url(self):
        """ Computes a public URL for the survey """
        base_url = ws_methods.get_main_url()
        for survey in self:
            survey.public_url = "%s/survey/start/%s" % (base_url, slug(survey))
            survey.print_url = "%s/survey/print/%s" % (base_url, slug(survey))
            survey.result_url = "%s/survey/results/%s" % (base_url, slug(survey))
            survey.public_url_html = '<a href="%s">%s</a>' % (survey.public_url, "Click here to start survey")

    @api.multi
    def _compute_base_url(self):
        for obj in self:
            obj.base_url = ws_methods.get_main_url()

    @api.multi
    def _compute_audience(self):
        for ad in self:
            if ad.partner_ids:
                ad.audience = "partners"
            else:
                ad.audience = False

    def get_audience(self):
        ids = []
        if self.meeting_id:
            for partner in self.meeting_id.partner_ids:
                if partner.id != self.env.user.partner_id.id:
                    ids.append(partner.user_id.id)
        else:
            for partner in self.partner_ids:
                if partner.id != self.env.user.partner_id.id:
                    ids.append(partner.user_id.id)
        return ids

    def _compute_url(self):
        for survey in self:
            try:
                if survey.my_status != 'not invited':
                    base_url = ws_methods.get_main_url()
                    if survey.my_status == 'done':
                        survey.url = base_url + "/survey/results/" + slug(survey)
                    elif survey.my_status == 'pending':
                        survey.url = base_url + "/survey/start/" + slug(survey)
            except:
                a = 1

    @api.multi
    def filter_attendees(self):
        category_id = self.env['ir.module.category'].sudo().search([('name', '=', 'MeetingPoint')]).id
        domain=['|',('user_id.groups_id.category_id','=',category_id),('is_committee','=',True)]
        return domain

    @api.onchange('partner_ids')
    def _change_field_value(self):
        user_id = []
        remain = []
        for partner in self.partner_ids:
            if (partner.is_committee):
                temp = self.env['meeting_point.committee'].search([('partner_id', '=', partner.id)])
                for val in temp.user_ids._ids:
                    tempValueForPartner=self.env['meeting_point.users'].search([('id','=',val)]).user_id.partner_id.id
                    user_id.append(tempValueForPartner)
            else :
                 user_id.append(partner.id)
        temp_attendee = list(set(user_id))
        self.partner_ids = self.env['res.partner'].browse(temp_attendee)
        if len(self.partner_ids) > 0:
            self.audience = "partners"
        else:
            self.audience = False

    @api.multi
    def _compute_seen_by_me(self):
        try:
            uid = self.env.uid
            res_model = self._name
            seen_model = self.env['dn.seen']
            for obj in self:
                if obj.create_uid.id == uid:
                    obj.seen_by_me = 1
                    continue
                res_id = obj.id
                filters = [('create_uid', '=', uid), ('res_model', '=', res_model), ('res_id', '=', res_id)]
                res = seen_model.search(filters)
                if res:
                    obj.seen_by_me = 1
        except:
            a = 1

    def user_status(self, uid):
        partner = self.env['res.users'].search([('id','=', uid)]).partner_id
        if self.meeting_id:
            if not self.meeting_id.publish:
                return 'not published'
            if partner not in self.meeting_id.partner_ids:
                return 'not invited'
        elif partner not in self.partner_ids:
            return 'not invited'

        any_question = False
        for page in self.page_ids:
            for question in page.question_ids:
                any_question = True
                for input in question.user_input_line_ids:
                    if input.create_uid == request.env.user:
                        return "done"
                        break
        if not any_question:
            return 'done'
        return "pending"

    def _compute_status(self):
        uid = self.env.user.id
        for survey in self:
            survey.my_status = survey.user_status(uid)
            a = 1

    def emit_meeting_update(self, survey):
        attendees = []
        if survey.meeting_id:
            attendees_list = survey.meeting_id.partner_ids
        else:
            attendees_list = survey.partner_ids

        for partner in attendees_list:
            if partner.user_id:
                attendees.append(partner.user_id.id)
        data = [{
            'name': 'to_do_item_updated',
            'data': {
                'id': survey.id,
                'attendees': attendees
            }
        }]
        ws_methods.emit_event(data)

    @api.model
    def create(self, values):
        title = values.get('title')
        if title:
            values['name'] = title
        else:
            name = values.get('name')
            if name:
                values['title'] = name
        res = super(Survey, self).create(values)
        self.emit_meeting_update(res)
        return res

    #
    @api.multi
    def write(self, values):

        title = values.get('title')
        if title:
            values['name'] = title
        else:
            name = values.get('name')
            if name:
                values['title'] = name
        res = super(Survey, self).write(values)

        self.emit_meeting_update(self)
        return True

class SurveyUserInputLine(models.Model):
    _inherit = ['survey.user_input_line']

    @api.model
    def create(self, vals):
        value_suggested = vals.get('value_suggested')
        if value_suggested:
            vals.update({'quizz_mark': self._get_mark(value_suggested)})
        data = self.search([('survey_id', '=', 10), ['write_uid', '=', self._uid]])
        if data:
            return ('The answer must be in the right type')
        return super(SurveyUserInputLine, self).create(vals)
