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


class OpStudentCourse(models.Model):
    _name = 'op.student.course'
    _description = 'Student Course Details'

    student_id = fields.Many2one('op.student', 'Student', ondelete="cascade")
    course_id = fields.Many2one('op.course', 'Course', required=True)
    batch_id = fields.Many2one('op.batch', 'Class', required=True)
    roll_number = fields.Char('Roll Number')
    subject_ids = fields.Many2many('op.subject', string='Subjects')

    _sql_constraints = [
        ('unique_name_roll_number_id',
         'unique(roll_number,course_id,batch_id,student_id)',
         'Roll Number & Student must be unique per Batch!'),
        ('unique_name_roll_number_course_id',
         'unique(roll_number,course_id,batch_id)',
         'Roll Number must be unique per Batch!'),
        ('unique_name_roll_number_student_id',
         'unique(student_id,course_id,batch_id)',
         'Student must be unique per Batch!'),
    ]

relation_list=[('spouse', 'Spouse'), ('family', 'Family'), ('friend', 'Friend'), ('other', 'Other')]
status_list=[('citizen', 'Citizen'), ('permanent', 'Permanent Resident'), ('student', 'Student F1'), ('other', 'Other')]

class OpStudent(models.Model):
    _name = 'op.student'
    _inherits = {'res.partner': 'partner_id'}

    middle_name = fields.Char('Middle Name', size=128)
    last_name = fields.Char('Last Name', size=128)
    birth_date = fields.Date('Birth Date')
    blood_group = fields.Selection(
        [('A+', 'A+ve'), ('B+', 'B+ve'), ('O+', 'O+ve'), ('AB+', 'AB+ve'),
         ('A-', 'A-ve'), ('B-', 'B-ve'), ('O-', 'O-ve'), ('AB-', 'AB-ve')],
        'Blood Group')
    gender = fields.Selection(
        [('m', 'Male'), ('f', 'Female'),
         ('o', 'Other')], 'Gender')
    nationality = fields.Many2one('res.country', 'Nationality')
    emergency_contact = fields.Many2one(
        'res.partner', 'Emergency Contact')
    visa_info = fields.Char('Visa Info', size=64)
    id_number = fields.Char('ID Card Number', size=64)
    already_partner = fields.Boolean('Already Partner')
    partner_id = fields.Many2one(
        'res.partner', 'Partner', required=True, ondelete="cascade")
    gr_no = fields.Char("GR Number", size=20)
    category_id = fields.Many2one('op.category', 'Category')
    course_detail_ids = fields.One2many('op.student.course', 'student_id',
                                        'Course Details')
    sec_lang = fields.Many2many('dn.lang', string='Secondary languages')
    sec_email = fields.Char('Secondary_Email', size=128)
    ssn = fields.Char('SSN', size=9)
    legal_status = fields.Selection(status_list, 'Legal Status in US')
    legal_status_text = fields.Char('Legal Status in US', size=128)
    cell_phone = fields.Char('Cell phone')
    home_phone = fields.Char('Home phone')

    emerg_title = fields.Many2one('res.partner.title', 'Title')
    emerg_middle_name = fields.Char('Middle Name', size=128)
    emerg_last_name = fields.Char('Last Name', size=128)
    emerg_email = fields.Char('Email', size=128)
    emerg_phone = fields.Char('Phone', size=128)
    emerg_relation = fields.Selection(relation_list,
        'Relationship')
    emerg_relation_text = fields.Char('Relationship', size=128)
    emerg_street = fields.Char('Street')
    emerg_street2 = fields.Char('Street2')
    emerg_zip = fields.Char('Zip', change_default=True)
    emerg_city = fields.Char('City')
    emerg_state_id = fields.Many2one("res.country.state", string='State')
    emerg_country_id = fields.Many2one('res.country', string='Country')


    @api.multi
    @api.constrains('birth_date')
    def _check_birthdate(self):
        for record in self:
            if record.birth_date > fields.Date.today():
                raise ValidationError(_(
                    "Birth Date can't be greater than current date!"))

    @api.onchange('emerg_relation')
    def on_change_relation(self):
        if self.emerg_relation != 'other' and self.emerg_relation != False:
            for a in relation_list:
                if a[0] == self.emerg_relation:
                    s=a[1]
                    self.emerg_relation_text = s
        else:
            self.emerg_relation_text = ''

    @api.onchange('legal_status')
    def on_change_legal_status(self):
        if self.legal_status != 'other' and self.legal_status != False:
            for a in status_list:
                if a[0] == self.legal_status:
                    s = a[1]
                    self.legal_status_text = s
        else:
            self.legal_status_text = ''
