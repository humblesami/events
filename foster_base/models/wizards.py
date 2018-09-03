# -*- coding: utf-8 -*-

from odoo import api, fields, models


class FosterWizard(models.TransientModel):
    _name = "foster.wizards"
    _description = "Foster wizard"

    foster_id = fields.Many2one('foster.applicants', string='Applicant', required=True)

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
