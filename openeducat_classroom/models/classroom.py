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

from odoo import models, fields, api,_
from odoo.exceptions import ValidationError
import datetime


class OpClassroom(models.Model):
    _name = 'op.classroom'

    name = fields.Char('Name', size=16, required=True)
    code = fields.Char('Room no', size=16 )
    room_no = fields.Integer(string='Room no',default="")
    floor = fields.Integer(string='Floor')
    course_id = fields.Many2one('op.course', 'Course')
    batch_id = fields.Many2one('op.batch', 'Class')
    branch_id = fields.Many2one('op.branch', 'Branch')
    smart_room = fields.Selection([('no', 'No'), ('yes', 'Yes')], 'Smart Room')
    capacity = fields.Integer(string='No of Person')
    allocated = fields.Char('Allocated rooms', related='branch_id.allocated')
    facilities = fields.One2many(
        'op.facility.line', 'classroom_id', string='Facility Lines')
    asset_line = fields.One2many('op.asset', 'asset_id', 'Asset')
    class_ids = fields.One2many('op.batch', 'room_id', 'Classes')


    _sql_constraints = [
        ('unique_classroom_code',
         'unique(code)', 'Code should be unique per classroom!'),
        ('unique_classroom_room',
         'unique(room_no,branch_id)', 'Room no should be unique per Branch!')
    ]

    @api.onchange('course_id')
    def onchange_course(self):
        self.batch_id = False

    @api.onchange('batch_id')
    def onchange_batch(self):
        self.branch_id = self.batch_id.branch_id

    @api.multi
    @api.constrains('room_no')
    def check_rom(self):
        for record in self:
            a=record.allocated.split("/")
            if int(a[0]) == int(a[1]):
                raise ValidationError(_("All classrooms are allocated"))

    @api.multi
    def name_get(self):
        if self.env.context.get('terms', False):
            terms=self.env['op.term'].browse(self.env.context["terms"][0][2])
            location=self.env.context["location"]
            class_id = self.env.context["class_id"]
            days = self.env['op.days'].browse(self.env.context["days"][0][2])
            start = self.env.context["start"]
            end = self.env.context["end"]
            req_hours = self.env.context["total_instr_hrs"]

            if not terms or not location or not days or not start or not end:
                raise ValidationError(_("Enter Location and terms."))

            rooms=[]
            days1 = []
            for d in days:
                days1.append(int(d.day))
            for t in self.env['op.classroom'].search([('branch_id','=',location)]):
                if class_id:
                    hours = t.class_ids.filtered(lambda x: x.id!=class_id).calculate_hours(False, False, terms=terms, room=True,local=True)
                else:
                    hours = t.class_ids.calculate_hours(False, False, terms=terms, room=True,local=True)
                available_hrs = hours["available"]
                if req_hours > available_hrs:
                    continue

                sessions = hours["sessions"]
                avail = True
                for s in sessions:
                    st = datetime.datetime.strptime(s["start_datetime"], "%Y-%m-%d %H:%M:%S")
                    en = datetime.datetime.strptime(s["end_datetime"], "%Y-%m-%d %H:%M:%S")
                    day = st.weekday()
                    st = st.hour + st.minute / 60.0
                    en = en.hour + en.minute / 60.0
                    x = start
                    y = end

                    if day in days1:
                        if x >= st and x < en or y > st and y <= en:
                            avail = False
                            break
                if not avail:
                    continue
                rooms.append((t.id,t.name+"(available hours:"+str(hours["available"])+")"))
            return rooms

        return super(OpClassroom, self).name_get()


