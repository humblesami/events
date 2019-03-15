

from odoo import models, fields


class Organization(models.Model):
    _name = 'op.organization'

    name = fields.Char('Name', size=256, required=True)
    code = fields.Char('Code', size=16, required=True)
    fax = fields.Char('Fax', size=16)
    phone = fields.Char('Phone', size=16)
    email = fields.Char('Email', size=16)
    website = fields.Char('Website', size=16)
    street = fields.Char('Street')
    street2 = fields.Char('Street2')
    zip = fields.Char('Zip', change_default=True)
    city = fields.Char('City')
    state_id = fields.Many2one("res.country.state", string='State')
    country_id = fields.Many2one('res.country', string='Country')
    branch_ids = fields.One2many('op.branch', 'organization_id', 'Locations')
    logo = fields.Binary(attachment=True,string="Logo",
                          help="This field holds the image used as image for the cateogry, limited to 1024x1024px.")


