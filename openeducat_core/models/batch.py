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

import pytz

from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
import math
import datetime



class OpBatch(models.Model):
    _name = 'op.batch'

    code = fields.Char('Code', size=16, required=True)
    name = fields.Char('Name', size=32, required=True)
    start_date = fields.Date('Admissions Start')
    end_date = fields.Date('Admissions End')
    class_start = fields.Date('Class Start',compute="_compute_dt")
    class_end = fields.Date('Class End',compute="_compute_dt")
    product_id = fields.Many2one(
        'product.product', 'Fee',
        domain=[('type', '=', 'service')], track_visibility='onchange')

    course_id = fields.Many2one('op.course', 'Course', required=True)
    section_id = fields.Many2one('op.section', 'Section', required=True)
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
    @api.depends('start','end','days','term_ids')
    def _compute_classhrs(self):
        for c in self:
            if c.start and c.end and c.days and c.term_ids:
                days=len(c.days)
                d = c.end - c.start
                h = d * days
                # hours=c.calculate_hours(c.class_start,c.class_end)
                hours = c.calculate_hours(False,False,terms=c.term_ids)

                c.classhrs_week = h
                # c.total_instr_hrs = h * c.weeks
                c.total_instr_hrs = hours["scheduled"]
                c.total_prep_hrs = c.prephrs_week * c.weeks
                c.total_hrs = c.total_instr_hrs + c.total_prep_hrs + c.dev_hrs

    @api.multi
    def _compute_dt(self):
        for c in self:
            if c.term_ids:
                c.class_start=c.term_ids[0].start_date
                c.class_end = c.term_ids[-1].end_date



    @api.multi
    @api.constrains('start_date', 'end_date','start','end')
    def check_dates(self):
        for c in self:
            start_date = fields.Date.from_string(c.start_date)
            end_date = fields.Date.from_string(c.end_date)
            if c.start_date and c.end_date:
                if start_date > end_date:
                    raise ValidationError(_("End Date cannot be set before \
                    Start Date."))

            faculty_id = c.faculty_id
            strt_time = str(datetime.timedelta(hours=c.start)).rsplit(':', 1)[0] + ":00"
            end_time = str(datetime.timedelta(hours=c.end)).rsplit(':', 1)[0] + ":00"
            h1 = int(strt_time.split(":")[0])
            h2 = int(end_time.split(":")[0])

            days = []
            for d in c.days:
                days.append(int(d.day))

            for d in c.days:
                available = False

                for a in c.faculty_id.available_times:
                    if int(a.day) == int(d.day) and h1 >= int(a.start) and h2 <= int(a.end):
                        available = True
                        break
                if not available:
                    raise ValidationError(_("%s not available at selected time %s to %s on %s." % (
                        c.faculty_id.name, str(h1),str(h2),calendar.day_name[int(d.day)])))

            hours = c.faculty_id.class_ids.filtered(lambda x: x.id!=c.id).calculate_hours(False,False,faculty=c.faculty_id,terms=c.term_ids,local=True)
            available_hrs=hours["available"]
            if c.total_instr_hrs >available_hrs:
                raise ValidationError(_("Required faculty hours:%s Available hours:%s" % (
                    str(c.total_instr_hrs), str(available_hrs))))
            sessions=hours["sessions"]
            for s in sessions:
                start=datetime.datetime.strptime(s["start_datetime"], "%Y-%m-%d %H:%M:%S")
                end = datetime.datetime.strptime(s["end_datetime"], "%Y-%m-%d %H:%M:%S")
                day = start.weekday()
                start = start.hour + start.minute/60.0
                end = end.hour + end.minute / 60.0
                x=c.start
                y=c.end

                if day in days:
                    if x>=start and x<end or y>start and y<=end:
                        raise ValidationError(_("Another class during:%s to %s" % (
                            str(h1), str(h2))))




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


class OpSection(models.Model):
    _name = 'op.section'

    name = fields.Char('Name', size=32, required=True)
    course_id = fields.Many2one('op.course', 'Course', required=True)
    time = fields.Selection(
        [('mor', 'Morning'), ('eve', 'Evening')], 'Mor/Eve')