from odoo import models, fields, api
from odoo.addons.dn_base import ws_methods
from odoo.exceptions import ValidationError
from werkzeug import urls
from odoo.addons.http_routing.models.ir_http import slug
from werkzeug import urls
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
    motion_first = fields.Many2one('res.users')
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



    def _compute_graphical_url(self):
        """ Computes a public URL for the survey """
        base_url = '/' if self.env.context.get('relative_url') else \
                   self.env['ir.config_parameter'].sudo().get_param('web.base.url')
        for voting in self:
            voting.graphical_view_url = urls.url_join(base_url, "/voting/graphical/%s" % (slug(voting)))

    @api.multi
    def action_result_voting(self):
        """ Open the website page with the survey results view """
        self.ensure_one()
        """ Computes a public URL for the survey """
        base_url = '/' if self.env.context.get('relative_url') else \
            self.env['ir.config_parameter'].sudo().get_param('web.base.url')
        result_url = urls.url_join(base_url, "voting/results/%s" % (slug(self)))
        return {
            'type': 'ir.actions.act_url',
            'name': "Results of the Voting",
            'target': 'self',
            'url': result_url
        }

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
        return res

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
            'url': self.with_context(relative_url=True) + trail
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