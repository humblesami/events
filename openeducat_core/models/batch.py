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
import math
import datetime



class OpBatch(models.Model):
    _name = 'op.batch'

    code = fields.Char('Code', size=16, required=True)
    name = fields.Char('Name', size=32, required=True)
    start_date = fields.Date(
        'Start Date')
    end_date = fields.Date('End Date')
    course_id = fields.Many2one('op.course', 'Course', required=True)
    branch_id = fields.Many2one('op.branch', 'Location(Education Center)', required=True)
    funded_by = fields.Selection(
        [('donations', 'Donations'), ('grant', 'Grant'), ('self', 'Self Pay')], 'Funded by')
    faculty_id = fields.Many2one('op.faculty', 'Instructor', required=True)
    term_ids = fields.Many2many('op.term',string='Terms')
    days = fields.Many2many('op.days',string='Days')
    start = fields.Float('Start time')
    end = fields.Float('End time')
    no_of_students = fields.Integer('No of students')
    max_students = fields.Integer('Max students')
    classhrs_week = fields.Float('Class hours per week',compute="_compute_classhrs")
    prephrs_week = fields.Float('Preparation hours per week')
    weekly_fte = fields.Float('Weekly fte needed')
    dev_hrs = fields.Float('Professional development and Supervision hours')
    job_search_hrs = fields.Float('Job search hours')
    weeks = fields.Integer('Total weeks',compute="_compute_weeks")
    cycles = fields.Integer('Total cycles',compute="_compute_cycles")
    total_hrs = fields.Float('Total hours',compute="_compute_classhrs")
    total_instr_hrs = fields.Float('Total instructional hours',compute="_compute_classhrs")
    total_prep_hrs = fields.Float('Total preparation hours',compute="_compute_classhrs")
    total_dev_hrs = fields.Float('Total development hours')
    fte_hrs_employed = fields.Float('FTE hours employed')
    fte = fields.Float('FTE')

    _sql_constraints = [
        ('unique_batch_code',
         'unique(code,branch_id)', 'Code should be unique per branch!')]

    @api.multi
    def _compute_cycles(self):
        for c in self:
            c.cycles = len(c.term_ids)

    @api.multi
    def _compute_weeks(self):
        for c in self:
            days=0
            for t in c.term_ids:
                start_date = datetime.datetime.strptime(t.start_date, '%Y-%m-%d')
                end_date = datetime.datetime.strptime(t.end_date, '%Y-%m-%d')

                days = days + (end_date-start_date).days
                if t.break_start and t.break_end:
                    start_break = datetime.datetime.strptime(t.break_start, '%Y-%m-%d')
                    end_break = datetime.datetime.strptime(t.break_end, '%Y-%m-%d')
                    minus = (end_break-start_break).days
                    days = days - minus
            weeks = days/7
            weeks=math.ceil(weeks/0.5) * 0.5
            c.weeks = weeks

    @api.multi
    def _compute_classhrs(self):
        for c in self:
            days=len(c.days)
            d = c.end - c.start
            h = d * days

            c.classhrs_week = h
            c.total_instr_hrs = h * c.weeks
            c.total_prep_hrs = c.prephrs_week * c.weeks
            c.total_hrs = c.total_instr_hrs + c.total_prep_hrs + c.dev_hrs


    @api.multi
    @api.constrains('start_date', 'end_date')
    def check_dates(self):
        for record in self:
            start_date = fields.Date.from_string(record.start_date)
            end_date = fields.Date.from_string(record.end_date)
            if start_date > end_date:
                raise ValidationError(_("End Date cannot be set before \
                Start Date."))

    @api.model
    def name_search(self, name, args=None, operator='ilike', limit=100):
        if self.env.context.get('get_parent_batch', False):
            lst = []
            lst.append(self.env.context.get('course_id'))
            courses = self.env['op.course'].browse(lst)
            while courses.parent_id:
                lst.append(courses.parent_id.id)
                courses = courses.parent_id
            batches = self.env['op.batch'].search([('course_id', 'in', lst)])
            return batches.name_get()
        return super(OpBatch, self).name_search(
            name, args, operator=operator, limit=limit)
