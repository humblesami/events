

from odoo import models, fields, api


class Branch(models.Model):
    _name = 'op.branch'

    name = fields.Char('Name', size=256, required=True)
    code = fields.Char('Code', size=16, required=True)
    organization_id = fields.Many2one(
        'op.organization', 'Education Center', required=True, ondelete="cascade")
    street = fields.Char('Street')
    street2 = fields.Char('Street2')
    zip = fields.Char('Zip', change_default=True)
    city = fields.Char('City')
    state_id = fields.Many2one("res.country.state", string='State')
    country_id = fields.Many2one('res.country', string='Country')
    fax = fields.Char('Fax', size=16)
    phone = fields.Char('Phone', size=16)
    email = fields.Char('Email', size=16)
    website = fields.Char('Website', size=16)
    rooms = fields.Integer('Rooms')
    capacity = fields.Integer('Capacity')
    allocated = fields.Char('Allocated rooms',compute="_compute_rooms")

    @api.multi
    def _compute_rooms(self):
        for b in self:
            a = self.env['op.classroom'].sudo().search([('branch_id','=',b.id),('batch_id','!=',False)])
            b.allocated = str(len(a)) +"/" + str(b.rooms)

    @api.multi
    def name_get(self):
        '''Method to display name and code'''
        return [(rec.id,rec.name + '(' + rec.organization_id.name+')') for rec in self]


