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
    voting_type_id = fields.Many2one('meeting_point.votingtype', string='Type', required=True, ondelete="cascade")
    partner_ids = fields.Many2many('res.partner',
                                   'voting_voting_res_partner_rel',
                                   string='Respondents',
                                   domain=lambda self: self.filter_attendees())
    my_status = fields.Char(compute='_compute_status')
    user_id = fields.Char(compute='_compute_user_id')
    document_ids = fields.One2many('meeting_point.votingdocument', 'voting_id', string="Document(s)")
    public_visibility = fields.Boolean(string="Results Visible To All")
    graphical_view_url = fields.Char("View Graphically", compute="_compute_graphical_url")
    topic_id = fields.Many2one('meeting_point.topic',string="Topic",ondelete='cascade')
    enable_discussion = fields.Boolean(string = 'Enable Discussion')
    signature_required = fields.Boolean()


    def get_name_audience(self):
        ids = []
        for partner in self.partner_ids:
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

    @api.onchange('meeting_id')
    def _change_meeting_id_value(self):
        if self.meeting_id:
            self.partner_ids = self.meeting_id.partner_ids
            self.open_date = self.meeting_id.start
            self.close_date = self.meeting_id.stop
        self.topic_id = False



    @api.onchange('partner_ids')
    def _change_partner_id_value(self):
        if self.partner_ids:
            if self.motion_first and self.motion_first.partner_id not in self.partner_ids:
                self.motion_first = False
            if self.motion_second and self.motion_second.partner_id not in self.partner_ids:
                self.motion_second = False
        else:
            self.motion_first = False
            self.motion_second = False
        self.topic_id = False

    @api.onchange('motion_first')
    def _change_motion_value1(self):
        selected_user = self.motion_first
        data = self.partner_ids
        if selected_user:
            data = data.filtered(lambda x: x.user_id != selected_user)
            return {'domain': {'motion_second': [('partner_id.id', 'in', data.ids)]}}

    @api.onchange('motion_second')
    def _change_motion_value2(self):
        selected_user = self.motion_second
        data = self.partner_ids
        if selected_user:
            data = data.filtered(lambda x: x.user_id != selected_user)
            return {'domain': {'motion_first': [('partner_id.id', 'in', data.ids)]}}


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
        template = self.env.ref('meeting_point.email_template_approval_modified')
        menuId = self.env['ir.ui.menu'].search([('name', '=', 'MeetVUE')], limit=1)
        actionId = self.env['ir.actions.act_window'].search([('name', '=', 'Voting')],
                                                                limit=1)
        base_url = ws_methods.get_main_url()
        data = super(Voting, self).create(values)
        result_url = base_url + "web#id=%s&view_type=form&model=meeting_point.voting&action=%s&menu_id=%s" % (data.id,actionId.id,menuId.id)
        self = self.with_context(url=result_url)
        # template.sudo().with_context().send_mail(self.id, force_send=True)
        respondents = values.get('partner_ids')
        if respondents:
            respondents = respondents[0]
            if respondents:
                respondents = respondents[2]
        if not respondents:
            respondents = []
        for partner_id in respondents:
            emailId = self.env['res.partner'].search([('id', '=', partner_id)]).email
            local_context = dict(self._context)
            local_context.update({
                'emailTo': emailId,
                'url':result_url
            })
                # template.with_context(local_context).send_mail(data.id, force_send=True)
        return data

    def write(self, vals):
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
        listeners = []
        for partner in self.partner_ids:
            if partner.user_id:
                listeners.append(partner.user_id.id)
        data = [{
            'name': 'to_do_item_updated',
            'audience': listeners,
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
            elif obj.topic_id:
                partnerValue = self.env['calendar.event'].search([('topic_ids', '=', obj.topic_id.id)]) .partner_ids
                if partner in partnerValue:
                    res = self.env['meeting_point.votinganswer'].search(
                        [('voting_id', '=', obj.id), ('user_id', '=', uid)])
                    if res:
                        obj.my_status = res.voting_option_id.name
                    else:
                        obj.my_status = 'pending'


    @api.multi
    def action_start_voting(self):
        self.ensure_one()
        # token = self.env.context.get('survey_token')
        # trail = "/%s" % token if token else ""
        # + trail
        base_url = ws_methods.get_main_url()
        result_url = base_url + "/voting/start/%s" % (slug(self))

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
    signature_data = fields.Binary(string="Signature")

    def create(self, vals):
        if self.voting_id.my_status == 'pending':
            raise ValidationError('Can not answer because not invited')
        return super(VotingAnswer, self).create(vals)


class VotingDocument(models.Model):
    _name = 'meeting_point.votingdocument'
    _inherit = 'dn_documents.allfiles'
    voting_id = fields.Many2one('meeting_point.voting', required=True, ondelete="cascade")