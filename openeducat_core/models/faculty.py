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

from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
import datetime


class OpFaculty(models.Model):
    _name = 'op.faculty'
    _inherits = {'res.partner': 'partner_id'}

    partner_id = fields.Many2one(
        'res.partner', 'Partner', required=True, ondelete="cascade")
    middle_name = fields.Char('Middle Name', size=128)
    last_name = fields.Char('Last Name', size=128, required=True)
    birth_date = fields.Date('Birth Date', required=True)
    blood_group = fields.Selection(
        [('A+', 'A+ve'), ('B+', 'B+ve'), ('O+', 'O+ve'), ('AB+', 'AB+ve'),
         ('A-', 'A-ve'), ('B-', 'B-ve'), ('O-', 'O-ve'), ('AB-', 'AB-ve')],
        'Blood Group')
    gender = fields.Selection(
        [('male', 'Male'), ('female', 'Female')], 'Gender', required=True)
    nationality = fields.Many2one('res.country', 'Nationality')
    emergency_contact = fields.Many2one(
        'res.partner', 'Emergency Contact')
    visa_info = fields.Char('Visa Info', size=64)
    id_number = fields.Char('ID Card Number', size=64)
    login = fields.Char(
        'Login', related='partner_id.user_id.login', readonly=1)
    last_login = fields.Datetime(
        'Latest Connection', related='partner_id.user_id.login_date',
        readonly=1)
    faculty_subject_ids = fields.Many2many('op.subject', string='Subject(s)')
    faculty_course_ids = fields.Many2many('op.course', string='Course(s)')
    emp_id = fields.Many2one('hr.employee', 'Employee')
    class_ids = fields.One2many('op.batch', 'faculty_id', 'Classes')


    @api.multi
    @api.constrains('birth_date')
    def _check_birthdate(self):
        for record in self:
            if record.birth_date > fields.Date.today():
                raise ValidationError(_(
                    "Birth Date can't be greater than current date!"))

    @api.multi
    def create_employee(self):
        for record in self:
            vals = {
                'name': record.name + ' ' + (record.middle_name or '') +
                ' ' + record.last_name,
                'country_id': record.nationality.id,
                'gender': record.gender,
                'address_home_id': record.partner_id.id
            }
            emp_id = self.env['hr.employee'].create(vals)
            record.write({'emp_id': emp_id.id})
            record.partner_id.write({'supplier': True, 'employee': True})

    # @api.model
    # def name_search(self, name, args=None, operator='ilike', limit=100):
    #     if self.env.context.get('filter_teachers', False):
    #
    #         batches = self.env['op.faculty'].search([])
    #         return batches.name_get()
    #     return super(OpFaculty, self).name_search(
    #         name, args, operator=operator, limit=limit)

    @api.multi
    def name_get(self):
        if self.env.context.get('filter_teachers', False):
            terms=self.env['op.term'].browse(self.env.context["filter_teachers"][0][2])
            course=self.env.context["course"]
            class_id = self.env.context["class_id"]
            days = self.env['op.days'].browse(self.env.context["days"][0][2])
            start = self.env.context["start"]
            end = self.env.context["end"]
            req_hours=self.env.context["total_instr_hrs"]

            if not terms or not course or not days or not start or not end:
                raise ValidationError(_("Enter course,terms,days and timing."))

            teachers=[]
            days1 = []
            for d in days:
                days1.append(int(d.day))
            for t in self.env['op.faculty'].search([('faculty_course_ids','in',course)]):
                for d in days:
                    available = False

                    for a in t.available_times:
                        if int(a.day) == int(d.day) and start >= int(a.start) and end <= int(a.end):
                            available = True
                            break
                    if not available:
                        break
                if not available:
                    continue

                if class_id:
                    hours = t.class_ids.filtered(lambda x: x.id!=class_id).calculate_hours(False, False, terms=terms,local=True)
                else:
                    hours=t.class_ids.calculate_hours(False,False,terms=terms,local=True)
                available_hrs = hours["available"]
                if req_hours > available_hrs:
                    continue

                sessions = hours["sessions"]
                avail=True
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
                            avail=False
                            break
                if not avail:
                    continue
                teachers.append((t.id,t.name+"(available hours:"+str(hours["available"])+")"))
            return teachers

        return super(OpFaculty, self).name_get()