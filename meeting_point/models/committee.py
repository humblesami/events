from odoo import models, fields, api
from odoo.addons.dn_base import ws_methods

class Committee(models.Model):
    _name = 'meeting_point.committee'
    _inherits = {'res.partner': 'partner_id'}

    partner_id = fields.Many2one('res.partner')
    summary=fields.Html(string="Summary")
    members_html = fields.Char(compute='_members_html', string="members")
    # name = fields.Char(string='Name', required=True)
    user_ids=fields.Many2many('meeting_point.users',string="Members",domain=lambda self:self.filter_attendees())
    allUser = fields.Boolean('All Users')
    @api.model
    def create(self, vals):
        committee = super(Committee, self).create(vals)
        committee.partner_id.is_committee=True
        return committee

    @api.multi
    def filter_attendees(self):
        category_id = self.env['ir.module.category'].sudo().search([('name', '=', 'MeetingPoint')]).id
        domain = [('user_id.groups_id.category_id', '=', category_id)]
        return domain

    @api.multi
    def _members_html(self):
        base_url = ws_methods.get_main_url()
        for c in self:
            html = '<div class="members">'
            if c.user_ids:
                for u in c.user_ids:
                    html += '<div class="member" style="background-image:url(%s/web/image?model=meeting_point.users&amp;field=image_medium&amp;id=%s)" title="%s"></div>'%(base_url,u.id,u.name)
                c.members_html =html+'</div>'
            else:
                c.members_html = ''

    @api.onchange('allUser')
    def alluser(self):
        val = self.allUser
        if(val):
            user_ids = self.env['meeting_point.users'].sudo().search([('user_id','!=',1)])
            self.user_ids = user_ids
        else:
            self.user_ids = []

    @api.multi
    def unlink(self):
        partner=self.partner_id
        return partner.unlink()