
import json
import datetime
from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
from odoo.http import request


class Forecast(models.Model):
    _name = 'op.forecast'

    name = fields.Char(required=True)
    course_id = fields.Many2one('op.course', 'Course')
    term_fees = fields.One2many('op.term_fee','forecast_id', string='Terms fee')
    fee = fields.Float("Morning fee")
    fee_evening = fields.Float("Evening fee")

    @api.onchange('term_fees')
    def onchange1(self):
        self.fee = False
        self.fee_evening = False

    @api.onchange('fee','fee_evening')
    def onchange2(self):
        self.term_fees = False



class TermFee(models.Model):
    _name = 'op.term_fee'

    name = fields.Char(required=True)
    fee = fields.Float("Morning fee")
    fee_evening = fields.Float("Evening fee")
    term = fields.Integer('Term')
    forecast_id = fields.Many2one('op.forecast', 'Forecast')

    @api.multi
    @api.constrains('term')
    def _check_term(self):
        for record in self:
            if record.term == 0:
                raise ValidationError(_(
                    "Enter valid term no"))


class ProjectedClass(models.Model):
    _name = 'op.projected_class'

    name = fields.Char(required=True)
    fee = fields.Float("Fee")
    students = fields.Integer('Students')
    total_fee = fields.Float("Total Fee")
    forecast_id = fields.Many2one('op.forecast', 'Forecast')
    term1 = fields.Float("Term1")
    term2 = fields.Float("Term2")
    term3 = fields.Float("Term3")
    term4 = fields.Float("Term4")
    term5 = fields.Float("Term5")

