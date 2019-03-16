from odoo import models, fields, api
from odoo.addons.dn_base import ws_methods
from odoo.addons.http_routing.models.ir_http import slug

class Voting(models.Model):
    _name = 'meeting_point.voting'
    name = fields.Char(string='Title')
    meeting_id = fields.Many2one('calendar.event',string="Meeting", ondelete='cascade')
    motion_first = fields.Many2one('res.users')
    motion_second = fields.Many2one('res.users')
    open_date = fields.Datetime(string='Open Date')
    close_date = fields.Datetime(string='Close Date')
    description = fields.Html(string='Voting Description')
    voting_type = fields.Selection([('voting', 'Voting'), ('approval', 'Approval')], string='Voting Type')

    partner_ids = fields.Many2many('res.partner', 'voting_voting_res_partner_rel',
                                   string='Respondents',
                                   domain=lambda self: self.filter_attendees())
    audience = fields.Char(compute='_compute_audience')
    my_status = fields.Char(compute='_compute_status')
    my_answer = fields.Char(compute='_compute_answer')
    user_id = fields.Char(compute='_compute_user_id')
    document_ids = fields.One2many('meeting_point.votingdocument', 'voting_id', string="Document(s)")
    public_visibility = fields.Boolean()

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
        for obj in self:
            res = self.env['meeting_point.votinganswer'].search([('voting_id','=', obj.id),('user_id', '=', obj._uid)])
            if res:
                obj.my_status = 'completed'
            else:
                obj.my_status = 'pending'

    @api.multi
    def _compute_answer(self):
        for obj in self:
            res = self.env['meeting_point.votinganswer'].search(
                [('voting_id', '=', obj.id), ('user_id', '=', self._uid)])
            if res:
                obj.my_answer = res.user_answer
            else:
                obj.my_answer = 'Pending'


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
        token = self.env.context.get('survey_token')
        trail = "/%s" % token if token else ""
        return {
            'type': 'ir.actions.act_url',
            'name': "Start Voting",
            'target': 'self',
            'url': self.with_context(relative_url=True).public_url_new + trail
        }



    @api.multi
    def filter_attendees(self):
        category_id = self.env['ir.module.category'].sudo().search([('name', '=', 'MeetingPoint')]).id
        domain = ['|', ('user_id.groups_id.category_id', '=', category_id), ('is_committee', '=', True)]
        return domain






class Votinganswer(models.Model):
    _name = 'meeting_point.votinganswer'
    user_id = fields.Many2one('res.users')
    voting_id = fields.Many2one('meeting_point.voting')
    user_answer = fields.Char(string = 'Response')


class VotingDocument(models.Model):
    _name = 'meeting_point.votingdocument'
    _inherit = 'dn_documents.allfiles'
    voting_id = fields.Many2one('meeting_point.voting', string='Voting Document')