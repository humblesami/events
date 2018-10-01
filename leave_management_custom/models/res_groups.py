from odoo import models, fields, api

class Groups(models.Model):
    _inherit = 'res.groups'

    @api.model
    def create(self, values):
        action = self._context
        if 'params' in action:
            current_action_id = action['params']['action']
            action_id = self.env['ir.actions.actions'].search([('name', '=', 'Leave Roles')]).id
            if action_id == current_action_id:
                category_id = self.env['ir.module.category'].search([('name', '=', 'E-Leave')]).id
                values[u'category_id'] = category_id
        group = super(Groups, self).create(values)
        return group