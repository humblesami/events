from odoo import models, fields, api
from odoo.exceptions import UserError, AccessError

class ruleModel(models.Model):
    _name = 'custom_leave_management.rule_authorization'

    def _default_model(self):
        model=self.env['ir.model'].search([('model','=','hr.holidays')])
        return model

    model_id=fields.Many2one('ir.model', string='Model', default=_default_model)
    rule_id=fields.Many2one('custom_leave_management.approval_rules',string='Rule Name')
    group_id = fields.Many2one('res.groups', string='Group Name', domain=lambda self:self.filter_groups())

    @api.multi
    def filter_groups(self):
        domain = [('category_id.name', '=', 'E-Leave')]
        return domain
