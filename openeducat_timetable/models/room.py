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

from odoo import models, fields, api
import datetime


class OpFaculty(models.Model):
    _inherit = 'op.classroom'


    filter_start = fields.Date('From')
    filter_end = fields.Date('To')
    total_sched_hrs = fields.Float('Total scheduled hours', compute="_compute_avail_hrs")
    total_avail_hrs = fields.Float('Free hours', compute="_compute_avail_hrs")


    @api.depends('filter_start','filter_end')
    @api.multi
    def _compute_avail_hrs(self):
        for rec in self:
            if rec.filter_end and rec.filter_start:
                hours = rec.class_ids.calculate_hours(rec.filter_start, rec.filter_end,room=True)
                rec.total_sched_hrs = hours["scheduled"]
                rec.total_avail_hrs = hours["available"]



