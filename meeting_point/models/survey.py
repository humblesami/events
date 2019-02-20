import uuid
from werkzeug import urls
from odoo.http import request
from odoo import models, fields, api, http
from odoo.exceptions import ValidationError, UserError
from odoo.addons.http_routing.models.ir_http import slug
from odoo.addons.dn_base import ws_methods


class Survey(models.Model):
    _inherit = ['survey.survey']#,'dn.seen']

    meeting_id=fields.Many2one('calendar.event',string="Meeting", ondelete='cascade')
    date=fields.Datetime(string="Meeting Date")
    name = fields.Char()
    survey_type=fields.Selection([(1,'Survey'),(2,'Approval')],string="Survey Type")
    question_ids=fields.One2many('survey.question','survey_id_custom',string="Question(s)")
    my_status=fields.Char(string="Status",compute="_compute_status")
    #seen_by_me = fields.Integer(compute='_compute_seen_by_me',default=0)
    partner_ids = fields.Many2many('res.partner', 'survey_survey_res_partner_rel',
                                   string='Respondents',
                                   domain=lambda self: self.filter_attendees())
    audience = fields.Char(compute='_compute_audience')
    title = fields.Char()

    @api.multi
    def _compute_audience(self):
        for ad in self:
            if ad.partner_ids:
                ad.audience = "partners"
            else:
                ad.audience = False

    def _compute_survey_url(self):

        """ Computes a public URL for the survey """
        base_url = http.request.httprequest.host_url
        base_url = base_url[:-1]
        base_url = '/' if self.env.context.get('relative_url') else \
                   base_url
        for survey in self:
            try:
                survey_id = int(survey.id)
                survey.public_url = urls.url_join(base_url, "survey/start/%s" % (slug(survey)))
                survey.print_url = urls.url_join(base_url, "survey/print/%s" % (slug(survey)))
                survey.result_url = urls.url_join(base_url, "survey/results/%s" % (slug(survey)))
                survey.public_url_html = '<a href="%s">%s</a>' % (survey.public_url, _("Click here to start survey"))
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
        TempAttendee=list(set(user_id))
        self.partner_ids=self.env['res.partner'].browse(TempAttendee)
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
        partner = self.env['res.users'].search([('id','=',uid)]).partner_id
        if not self.question_ids:
            return "done"

        if self.meeting_id:
            if not self.meeting_id.publish:
                return 'not published'
            if partner not in self.meeting_id.partner_ids:
                return 'not invited'
        elif partner not in self.partner_ids:
            return 'not invited'

        for q in self.question_ids:
            for i in q.user_input_line_ids:
                if i.create_uid == request.env.user:
                    return "done"
                    break
        return "pending"

    def _compute_status(self):
        partner = self.env.user.partner_id
        for survey in self:
            survey.my_status="not invited"
            if not survey.question_ids:
                survey.my_status = "done"
                continue

            if survey.meeting_id:
                if not survey.meeting_id.publish or partner not in survey.meeting_id.partner_ids:
                    continue
            elif partner not in survey.partner_ids:
                continue

            survey.my_status = "pending"

            responded = False

            for q in survey.question_ids:
                for i in q.user_input_line_ids:
                    if i.create_uid == request.env.user:
                        responded = True
                        break
                if responded:
                    break
            if responded:
                survey.my_status = "done"

    def emit_meeting_update(self, survey):
        attendees = []
        attendees_list = []
        if survey.meeting_id:
            attendees_list = survey.meeting_id.partner_ids
        else:
            attendees_list = survey.partner_ids

        for partner in attendees_list:
            if partner.user_id:
                attendees.append(partner.user_id.id)
        data = {
            'name': 'to_do_item_updated',
            'data': {
                'id': survey.id,
                'attendees': attendees
            }
        }
        ws_methods.emit_event(data)

    @api.model
    def create(self, values):
        questions = values.get('question_ids')
        if not questions:
            raise ValidationError("Please provide questions to add survey")
        if len(questions) == 0:
            raise ValidationError("Please provide questions to add survey")
        title = values.get('title')
        if title:
            values['name'] = title
        else:
            name = values.get('name')
            if name:
                values['title'] = name
        res = super(Survey, self).create(values)
        page_env = self.env['survey.page']
        vals = {'title': res.title, 'survey_id': res.id, 'question_ids': res.question_ids, 'sequence': 1}
        page=page_env.create(vals)
        for q in res.question_ids:
            q.write({'page_id': page.id})
        self.emit_meeting_update(res)
        return res

    #
    @api.multi
    def write(self, values):
        questions = values['question_ids']
        if len(questions) == 0:
            raise ValidationError("Survey can not not exist without questions")
        title = values.get('title')
        if title:
            values['name'] = title
        else:
            name = values.get('name')
            if name:
                values['title'] = name
        res = super(Survey, self).write(values)
        if not res:
            return False
        if 'question_ids' in values:
            question_model = self.env['survey.question']
            page = self.env['survey.page'].search([('survey_id', '=', self.id)])
            for q in self.question_ids:
                question = question_model.search([('id', '=',q.id)])
                question.write({'page_id': page.id})
        return True

class SurveyQuestion(models.Model):
    _inherit = 'survey.question'

    survey_id_custom=fields.Many2one('survey.survey',string="Survey")
    page_id = fields.Many2one('survey.page', string='Survey page',
                              ondelete='cascade', required=False, default=lambda self: self.env.context.get('page_id'))
    type = fields.Selection([
            ('free_text', 'Multiple Lines Text Box'),
            # ('textbox', 'Single Line Text Box'),
            ('numerical_box', 'Numerical Value'),
            ('date', 'Date'),
            ('simple_choice', 'Multiple choice: only one answer')
            # ('multiple_choice', 'Multiple choice: multiple answers allowed')
            # ('matrix', 'Matrix')
    ], string='Type of Question', default='free_text', required=True)

    @api.onchange('question')
    def temp(self):
        if not self.question:
            if self.survey_id_custom.survey_type == 2:
                self.labels_ids = [{"sequence":0,"value": "Yes"}, {"sequence":1,"value": "No"}]


    @api.model
    def _get_type(self):
        vals = []
        if str(self.survey_id_custom.survey_type) == 2:
            vals.extend([('simple_choice', 'Multiple choice: only one answer')])
        else:
            vals.extend([('free_text', 'Multiple Lines Text Box'),
                         ('textbox', 'Single Line Text Box'),
                         ('numerical_box', 'Numerical Value'),
                         ('datetime', 'Date and Time'),
                         ('multiple_choice', 'Multiple choice: multiple answers allowed'),
                         ('matrix', 'Matrix')])

        return vals

    @api.model
    def create(self, vals):
        res= super(SurveyQuestion, self).create(vals)
        if res.type == "simple_choice" or res.type == "multiple_choice":
            if res.labels_ids.__len__() < 2:
                raise UserError("Enter two or more answers for multiple choice question")
        survey_parent= res.survey_id_custom
        page=0
        # surveyTemp = self.env['survey.survey'].search([['id','=',survey_parent]])
        for p in survey_parent.page_ids:
            page=p.id
            res.write({'page_id':page})
        return res


class SurveyUserInput(models.Model):

    _inherit = 'survey.user_input'
    token = fields.Char('Identification token', required=True, copy=False)
    _sql_constraints = [
        ('unique_token', 'UNIQUE (token)', 'A token must be unique!'),
        ('deadline_in_the_past', 'CHECK (deadline >= date_create)', 'The deadline cannot be in the past')
    ]

    @api.model
    def create(self, vals):
        obj = {}
        if 'angular' in vals:
            vals['token'] = str(uuid.uuid4())
            vals['partner_id'] = self.env.user.partner_id.id
            if 'survey_id' not in vals:
                raise ValidationError('No Survey Related')
            obj = self.env['survey.user_input' ].search([('survey_id','=',vals['survey_id']),('partner_id','=', vals['partner_id'])])
            if not obj:
                obj = super(SurveyUserInput, self).create(vals)
        else:
            obj = super(SurveyUserInput, self).create(vals)
        return obj