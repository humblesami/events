# -*- coding: utf-8 -*-

from odoo import api, fields, models


class hrattendanceWizard(models.TransientModel):
    _name = "hrattendance.wizard"
    _description = "Attendance wizard"

    employee_id = fields.Many2one('hr.employee', string='Employee', required=True)
    date_from = fields.Datetime(string='Start Date',required=True)
    date_to = fields.Datetime(string='End Date')

    @api.multi
    def check_report(self):
        data = {}
        data['form'] = self.read(['employee_id', 'date_from', 'date_to'])[0]
        return self._print_report(data)

    def _print_report(self, data):
        data['form'].update(self.read(['employee_id', 'date_from', 'date_to'])[0])
        self.ensure_one()
        [data] = self.read()
        departments = self.env['hr.employee'].browse(data['employee_id'])
        datas = {
            'ids': [],
            'model': 'hr.employee',
            'form': data
        }
        return self.env.ref('e_pay_roll.action_report_hrattendance').with_context(
            from_transient_model=True).report_action(departments,data=datas)
