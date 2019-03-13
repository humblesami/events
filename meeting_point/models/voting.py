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
    voting_description = fields.Char(string='Voting Description')
    voting_type = fields.Selection([('voting', 'Voting'), ('approval', 'Approval')], string='Voting Type')
    voting_options = fields.Selection([('yes','Yes'), ('no', 'No'), ('abstain', 'Abstain')], string='Voting Options')
    approval_options = fields.Selection([('approve', 'Approve'), ('reject', 'Reject')], string='Approval Options')

    partner_ids = fields.Many2many('res.partner', 'voting_voting_res_partner_rel',
                                   string='Respondents',
                                   domain=lambda self: self.filter_attendees())
    audience = fields.Char(compute='_compute_audience')
    public_url_new = fields.Char("Public link", compute="_compute_voting_url")

    def _compute_voting_url(self):
        base_url = ws_methods.get_main_url()
        for voting in self:
            voting.public_url_new = base_url + "/voting/start/" + slug(voting)


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