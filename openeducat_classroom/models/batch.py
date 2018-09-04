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


class OpBatch(models.Model):
    _inherit = 'op.batch'

    room_id = fields.Many2one('op.classroom', 'Classroom')

    _sql_constraints = [
        ('unique_batch_room',
         'unique(room_id)', 'Classroom should be unique per branch!')]

    @api.model
    def create(self, vals):
        r = super(OpBatch, self).create(vals)
        if r.room_id:
            r.room_id.batch_id = r.id
            r.room_id.course_id = r.course_id
            r.room_id.branch_id = r.branch_id
        return r

    @api.multi
    def write(self, vals):
        if "room_id" in vals and self.room_id:
            self.room_id.batch_id=False
            self.room_id.course_id = False
        r = super(OpBatch, self).write(vals)
        if "room_id" in vals and self.room_id:
            self.room_id.batch_id = self.id
            self.room_id.course_id = self.course_id
            self.room_id.branch_id = self.branch_id
        return r


