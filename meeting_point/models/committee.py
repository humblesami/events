from odoo import models, fields, api

class Committee(models.Model):
    _name = 'meeting_point.committee'
    _inherits = {'res.partner': 'partner_id'}

    partner_id = fields.Many2one('res.partner')
    summary=fields.Html(string="Summary")
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