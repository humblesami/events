from odoo import api, models
from odoo.exceptions import UserError


class FosterReport(models.AbstractModel):
    _name = 'report.foster_base.foster_report_invoice'

    @api.model
    def get_report_values(self, docids, data):
        if not data.get('form'):
            raise UserError(("Form content is missing, this report cannot be printed."))

        foster_report = self.env['ir.actions.report']._get_report_from_name('foster_base.foster_report_invoice')

        applicants = self.env['foster.applicants'].browse(data['form']['foster_id'][0])
        return {
            'doc_ids': self.ids,
            'doc_model': foster_report.model,
            'docs': applicants,
        }