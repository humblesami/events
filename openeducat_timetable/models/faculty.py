# -*- coding: utf-8 -*-
###############################################################################
#
#    Tech-Receptives Solutions Pvt. Ltd.
#    Copyright (C) 2009-TODAY Tech-Receptives(<http://www.techreceptives.com>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Lesser General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Lesser General Public License for more details.
#
#    You should have received a copy of the GNU Lesser General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
###############################################################################

from odoo import models, fields


class OpFaculty(models.Model):
    _inherit = 'op.faculty'

    session_ids = fields.One2many('op.session', 'faculty_id', 'Sessions')
    hours_per_year = fields.Float('Total hours per year')
    available_times = fields.Many2many('op.available_times', string='Available Times')
    available_days = fields.Many2many('op.available_days', string='Available Days')
    pay_rate_hourly = fields.Float('Pay rate hourly')
    pay_rate_annually = fields.Float('Pay rate annually')

