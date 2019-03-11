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
    # url = fields.Char(compute='_compute_url')
    public_url_new = fields.Char("Public link", compute="_compute_voting_url")
    # result_url_new = fields.Char("Results link", compute="_compute_voting_url")

    def _compute_voting_url(self):
        """ Computes a public URL for the survey """
        base_url = ws_methods.get_main_url()
        for voting in self:
            voting.public_url_new = base_url + "/voting/start/" + slug(voting)
            # survey.print_url = base_url + "/survey/print/" + slug(survey)
            # survey.result_url = base_url + "/survey/results/" + slug(survey)
            #
            # survey.public_url_new = base_url + "/survey/meet/start/" + slug(survey)
            # survey.result_url_new = base_url + "/survey/meet/results/" + slug(survey)
            # survey.print_url_new = base_url + "/survey/meet/print/" + slug(survey)
            # survey.public_url_html = '<a href="%s">%s</a>' % (survey.public_url, "Click here to start survey")


    @api.multi
    def _compute_audience(self):
        for ad in self:
            if ad.partner_ids:
                ad.audience = "partners"
            else:
                ad.audience = False


    @api.multi
    def action_start_voting(self):
        """ Open the website page with the survey form """
        self.ensure_one()
        token = self.env.context.get('survey_token')
        trail = "/%s" % token if token else ""
        return {
            'type': 'ir.actions.act_url',
            'name': "Start Voting",
            'target': 'self',
            'url': self.with_context(relative_url=True).public_url_new + trail
        }

    def _compute_url(self):
        for voting in self:
            try:
                if voting.my_status != 'not invited':
                    base_url = ws_methods.get_main_url()
                    if voting.my_status == 'done':
                        voting.url = base_url + "/survey/results/" + slug(voting)
                    elif voting.my_status == 'pending':
                        voting.url = base_url + "/survey/start/" + slug(voting)
            except:
                a = 1

    @api.multi
    def filter_attendees(self):
        category_id = self.env['ir.module.category'].sudo().search([('name', '=', 'MeetingPoint')]).id
        domain = ['|', ('user_id.groups_id.category_id', '=', category_id), ('is_committee', '=', True)]
        return domain

class Votinganswer(models.Model):
    _name = 'meeting_point.voting.answer'
    voting_id = fields.Many2one('meeting_point.voting')
    answerid = fields.Char(string = 'Response')



