# -*- coding: utf-8 -*-

from odoo import api, fields, models


class FosterWizard(models.TransientModel):
    _name = "foster.wizards"
    _description = "Foster wizard"

    foster_id = fields.Many2many('foster.applicants', string='Applicant', required=True)
    allUser = fields.Boolean('All Applicants')

    @api.onchange('allUser')
    def alluser(self):
        val = self.allUser
        if (val):
            user_ids = self.env['foster.applicants'].sudo().search([])
            self.foster_id= user_ids
        else:
            self.foster_id = []

    @api.multi
    def check_report(self):
        data = {}
        data['form'] = self.read(['foster_id'])[0]
        return self._print_report(data)

    def _print_report(self, data):
        data['form'].update(self.read(['foster_id'])[0])
        self.ensure_one()
        [data] = self.read()
        departments = self.env['foster.applicants'].browse(data['foster_id'])
        datas = {
            'ids': [],
            'model': 'foster.applicants',
            'form': data
        }
        return self.env.ref('foster_base.foster_report').with_context(
            from_transient_model=True).report_action(departments,data=datas)

class ChildPlacementWizard(models.TransientModel):
    _name = "child.placement.wizards"
    _description = "Child Placement Wizard"

    child_id = fields.Many2many("foster.child", string='Child', required=True)
    allUser = fields.Boolean('All Children')

    @api.onchange('allUser')
    def alluser(self):
        val = self.allUser
        if (val):
            user_ids = self.env['foster.child'].sudo().search([])
            self.child_id = user_ids
        else:
            self.child_id = []

    @api.multi
    def check_report(self):
        data = {}
        data['form'] = self.read(['child_id'])[0]
        return self._print_report(data)

    def _print_report(self, data):
        data['form'].update(self.read(['child_id'])[0])
        self.ensure_one()
        [data] = self.read()
        departments = self.env['foster.child'].browse(data['child_id'])
        datas = {
            'ids': [],
            'model': 'foster.child',
            'form': data
        }
        return self.env.ref('foster_base.child_report').with_context(
            from_transient_model=True).report_action(departments,data=datas)