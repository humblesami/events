from odoo import models, fields, api
from odoo.addons.dn_base import ws_methods
from odoo.addons.http_routing.models.ir_http import slug

class Votinganswer(models.Model):
    _name = 'meeting_point.votinganswer'
    user_id = fields.Many2one('res.users')
    voting_id = fields.Many2one('meeting_point.voting')
    user_answer = fields.Char(string = 'Response')