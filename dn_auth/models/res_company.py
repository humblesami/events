from odoo import models, fields, api

class logininfo(models.Model):
    _name = 'login.info'
    user_id = fields.Many2one('res.users')
    browser = fields.Char()
    version = fields.Integer()
    ip = fields.Char()
    location = fields.Char()
    platform = fields.Char()
    session = fields.Char()
    email = fields.Char(related='user_id.login')

class ResCompany(models.Model):
    _inherit = 'res.company'
    password_length = fields.Integer(
        'Characters',
        default=6,
        help='Minimum number of characters',
    )
    password_lower = fields.Integer(
        'Lowercase',
        default=1,
        help='Require number of lowercase letters',
    )
    password_upper = fields.Integer(
        'Uppercase',
        default=1,
        help='Require number of uppercase letters',
    )
    password_numeric = fields.Integer(
        'Numeric',
        default=1,
        help='Require number of numeric digits',
    )
    password_special = fields.Integer(
        'Special',
        default=1,
        help='Require number of unique special characters',
    )