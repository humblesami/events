from odoo import models, fields, api

class Groups(models.Model):
    _inherit = 'res.groups'

    @api.model
    def create(self, values):
        # action = self._context
        if 'mp_groups' in self._context:
            category_id = self.env.ref('foster-base.module_category_foster').id
            values[u'category_id'] = category_id
        user = super(Groups, self).create(values)
        return user