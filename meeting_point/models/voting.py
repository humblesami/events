from odoo import models, fields, api
from odoo.addons.dn_base import ws_methods
from odoo.exceptions import ValidationError
from odoo.addons.http_routing.models.ir_http import slug

class VotingType(models.Model):
    _name = 'meeting_point.votingtype'
    name = fields.Char(string='Voting Type')
    voting_option_ids = fields.One2many('meeting_point.votingoption', 'voting_type_id')
    _sql_constraints = [
        ('voting_option_unique', 'unique (name)', "Voting Type already exists !"),
    ]

class VotingChoice(models.Model):
    _name = 'meeting_point.votingoption'
    name = fields.Char(string='Choice')
    voting_type_id = fields.Many2one('meeting_point.votingtype', required=True, ondelete="restrict")
    _sql_constraints = [
        ('voting_option_unique', 'unique (name, voting_type_id)', "Option already exists !"),
    ]


class Voting(models.Model):
    _name = 'meeting_point.voting'
    name = fields.Char(string='Title', required=True)
    meeting_id = fields.Many2one('calendar.event',string="Meeting", ondelete='cascade')
    motion_first = fields.Many2one('res.users' )
    motion_second = fields.Many2one('res.users')
    open_date = fields.Datetime(string='Open Date')
    close_date = fields.Datetime(string='Close Date')
    description = fields.Html(string='Voting Description')
    voting_type_id = fields.Many2one('meeting_point.votingtype', required=True, ondelete="cascade")
    partner_ids = fields.Many2many('res.partner',
                                   'voting_voting_res_partner_rel',
                                   string='Respondents',
                                   domain=lambda self: self.filter_attendees())
    audience = fields.Char(compute='_compute_audience')
    my_status = fields.Char(compute='_compute_status')
    user_id = fields.Char(compute='_compute_user_id')
    document_ids = fields.One2many('meeting_point.votingdocument', 'voting_id', string="Document(s)")
    public_visibility = fields.Boolean(string="Results Visible To All")
    graphical_view_url = fields.Char("View Graphically", compute="_compute_graphical_url")
    topic_id_new = fields.Many2one('meeting_point.topic',string="Topic",ondelete='cascade')
    respondent_id = fields.Many2many('res.partner','user_voting_res_partner_rel',
                                   string='Respondents',
                                   domain=lambda self: self.filter_attendees())
    topic_id_alternate = fields.Many2one('meeting_point.topic',string="Topic",ondelete='cascade')
    enable_discussion = fields.Boolean(string = 'Enable Discussion')
    signature_required = fields.Boolean()

    def get_name_audience(self):
        ids = []
        my_audience = self.partner_ids
        if self.topic_id_alternate:
            my_audience = self.topic_id_alternate.meeting_id.partner_ids
        elif self.meeting_id:
            my_audience = self.meeting_id.partner_ids
        for partner in my_audience:
            if partner.id != self.env.user.partner_id.id:
                ids.append(partner.user_id.id)
        res = {'name':  self.voting_type_id.name+'-'+self.name, 'audience': ids}
        return res

    @api.multi
    def open_same_window(self):
        return {
            'type': 'ir.actions.act_window',
            # 'name': 'Assign Signatures',
            # 'view_id': view_id,
            'view_mode': 'form',
            'res_model': self._name,
            'res_id': self.id,
            'target': 'current',
        }

    @api.onchange('partner_ids')
    def _change_field_value(self):
        user_id = []
        remain = []
        for partner in self.partner_ids:
            if (partner.is_committee):
                temp = self.env['meeting_point.committee'].search([('partner_id', '=', partner.id)])
                for val in temp.user_ids._ids:
                    tempValueForPartner = self.env['meeting_point.users'].search(
                        [('id', '=', val)]).user_id.partner_id.id
                    user_id.append(tempValueForPartner)
            else:
                user_id.append(partner.id)
        temp_attendee = list(set(user_id))
        self.partner_ids = self.env['res.partner'].browse(temp_attendee)
        self.respondent_id = self.env['res.partner'].browse(temp_attendee)
        if not self.motion_first.partner_id.id in self.respondent_id.ids:
            self.motion_first = False
        if not self.motion_second.partner_id.id in self.respondent_id.ids:
            self.motion_second = False

        if len(self.partner_ids) > 0:
            self.audience = "partners"
        else:
            self.audience = False

    @api.onchange('meeting_id')
    def _change_meeting_value(self):
        user_id=[]
        for partner in self.meeting_id.partner_ids:
            user_id.append(partner.id)
        temp_attendee = list(set(user_id))
        self.respondent_id = self.env['res.partner'].browse(temp_attendee)
        if not self.motion_first.partner_id.id in self.respondent_id.ids:
            self.motion_first = False
        if not self.motion_second.partner_id.id in self.respondent_id.ids:
            self.motion_second = False
        self.topic_id_new = False
    def _compute_graphical_url(self):
        """ Computes a public URL for the survey """
        base_url = ws_methods.get_main_url()
        for voting in self:
            voting.graphical_view_url = base_url + "/voting/graphical/%s" % (slug(voting))

    @api.multi
    def action_result_voting(self):
        """ Open the website page with the survey results view """
        self.ensure_one()
        """ Computes a public URL for the survey """
        base_url = ws_methods.get_main_url()
        result_url = base_url + "voting/results_new/%s" % (slug(self))
        return {
            'type': 'ir.actions.act_url',
            'name': "Results of the Voting",
            'target': 'self',
            'url': result_url
        }

    @api.model
    def create(self, values):
        if values.get('topic_id_new'):
            values['topic_id_alternate'] = values['topic_id_new']
            del values["meeting_id"]
            del values['topic_id_new']
        template = self.env.ref('meeting_point.email_template_approval_modified')
        menuId = self.env['ir.ui.menu'].search([('name', '=', 'MeetVUE')], limit=1)
        actionId = self.env['ir.actions.act_window'].search([('name', '=', 'Voting')],
                                                                limit=1)
        base_url = ws_methods.get_main_url()
        data = super(Voting, self).create(values)
        result_url = base_url + "web#id=%s&view_type=form&model=meeting_point.voting&action=%s&menu_id=%s" % (data.id,actionId.id,menuId.id)
        self = self.with_context(url=result_url)
        # template.sudo().with_context().send_mail(self.id, force_send=True)
        if values['partner_ids'][0][2].__len__() != 0:
            for partner_id in values['partner_ids'][0][2]:
                emailId = self.env['res.partner'].search([('id', '=', partner_id)]).email
                local_context = dict(self._context)
                local_context.update({
                    'emailTo': emailId,
                    'url':result_url
                })
                # template.with_context(local_context).send_mail(data.id, force_send=True)
        return data

    def write(self, vals):
        if vals.get('meeting_id') :
            if vals.get('topic_id_new'):
                del vals["meeting_id"]
                vals['topic_id_alternate'] = vals['topic_id_new']
                del vals['topic_id_new']
            else:
                if self.topic_id_alternate:
                    vals['topic_id_alternate'] = None
        elif vals.get('topic_id_new'):
            vals['topic_id_alternate'] = vals['topic_id_new']
            del vals['topic_id_new']
            if self.meeting_id:
                vals['meeting_id'] = None
        elif vals.get('partner_ids'):
            if self.meeting_id:
                vals['meeting_id'] = None
            if self.topic_id_alternate:
                vals['topic_id_alternate'] = None
        partener_ids_beofre = False
        if vals.get('partner_ids'):
            partener_ids_beofre = self.partner_ids
        res = super(Voting, self).write(vals)
        if partener_ids_beofre:
            partener_ids_after = self.partner_ids
            to_exclude = []
            for old_partner in partener_ids_beofre:
                found = False
                for partner in partener_ids_after:
                    if partner.id == old_partner.id:
                        found = True
                        break
                if not found:
                    to_exclude.append(old_partner.user_id.id)
            records = self.env['meeting_point.votinganswer'].search([('voting_id', '=', self.id), ('user_id', 'in', to_exclude)])
            for rec in records:
                rec.unlink()

        self.emit_data_update(vals)
        return res



    def emit_data_update(self, vals):
        audience = []
        for partner in self.respondent_id:
            if partner.user_id:
                audience.append(partner.user_id.id)
        data = [{
            'name': 'to_do_item_updated',
            'audience': audience,
            'data': {
                'id': self.id
            }
        }]
        ws_methods.emit_event(data)

    @api.multi
    def has_attachments(self):
        for topic in self:
            if topic.document_ids:
                topic.attachments = '<span class="fa fa-2x fa-file-text" />'


    @api.multi
    def _compute_user_id(self):
        self.user_id=str(self._uid)

    @api.multi
    def _compute_status(self):
        uid = self._uid
        partner = self.env.user.partner_id
        for obj in self:
            if partner in obj.partner_ids:
                res = self.env['meeting_point.votinganswer'].search([('voting_id','=', obj.id),('user_id', '=', uid)])
                if res:
                    obj.my_status = res.voting_option_id.name
                else:
                    obj.my_status = 'pending'
            elif partner in obj.meeting_id.partner_ids:
                res = self.env['meeting_point.votinganswer'].search([('voting_id', '=', obj.id), ('user_id', '=', uid)])
                if res:
                    obj.my_status = res.voting_option_id.name
                else:
                    obj.my_status = 'pending'
            elif obj.topic_id_alternate:
                partnerValue = self.env['calendar.event'].search([('topic_ids', '=', obj.topic_id_alternate.id)]) .partner_ids
                if partner in partnerValue:
                    res = self.env['meeting_point.votinganswer'].search(
                        [('voting_id', '=', obj.id), ('user_id', '=', uid)])
                    if res:
                        obj.my_status = res.voting_option_id.name
                    else:
                        obj.my_status = 'pending'

    @api.multi
    def _compute_audience(self):
        for ad in self:
            if ad.partner_ids:
                ad.audience = "partners"
            else:
                ad.audience = False


    @api.multi
    def action_start_voting(self):
        self.ensure_one()
        # token = self.env.context.get('survey_token')
        # trail = "/%s" % token if token else ""
        # + trail
        base_url = '/' if self.env.context.get('relative_url') else \
            self.env['ir.config_parameter'].sudo().get_param('web.base.url')
        result_url = urls.url_join(base_url, "/voting/start/%s" % (slug(self)))

        return {
            'type': 'ir.actions.act_url',
            'name': "Start Voting",
            'target': 'self',
            'url': result_url
        }

    @api.multi
    def filter_attendees(self):
        category_id = self.env['ir.module.category'].sudo().search([('name', '=', 'MeetingPoint')]).id
        domain = ['|', ('user_id.groups_id.category_id', '=', category_id), ('is_committee', '=', True)]
        return domain

class VotingAnswer(models.Model):
    _name = 'meeting_point.votinganswer'
    user_id = fields.Many2one('res.users',required=True, ondelete="cascade")
    voting_id = fields.Many2one('meeting_point.voting',required=True, ondelete="cascade")
    voting_option_id = fields.Many2one('meeting_point.votingoption', required=True, ondelete="cascade")
    def create(self, vals):
        if self.voting_id.my_status == 'pending':
            raise ValidationError('Can not answer because not invited')
        return super(VotingAnswer, self).create(vals)


class VotingDocument(models.Model):
    _name = 'meeting_point.votingdocument'
    _inherit = 'dn_documents.allfiles'
    voting_id = fields.Many2one('meeting_point.voting', required=True, ondelete="cascade")