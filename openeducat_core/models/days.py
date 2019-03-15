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
import calendar

from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class Days(models.Model):
    _name = 'op.days'
    _description = 'Days'

    name = fields.Char(compute='_compute_name', string='Name', store=True)
    day = fields.Selection(
        [('0', 'Monday'), ('1', 'Tuesday'), ('2', 'Wednesday'), ('3', 'Thursday'), ('4', 'Friday'),
         ('5', 'Saturday'), ('6', 'Sunday')], 'Day', required=True)


    @api.multi
    @api.depends('day')
    def _compute_name(self):
        for rec in self:
            if rec.day:
                rec.name = calendar.day_name[int(rec.day)]
