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

from odoo import models, fields, api
import datetime


class OpFaculty(models.Model):
    _inherit = 'op.faculty'

    session_ids = fields.One2many('op.session', 'faculty_id', 'Sessions')
    hours_per_year = fields.Float('Total hours per year')
    hours_per_week = fields.Float('Total hours per week', compute="_compute_week_hrs")
    available_times = fields.Many2many('op.available_times', string='Available Times')
    available_days = fields.Many2many('op.available_days', string='Available Days')
    pay_rate_hourly = fields.Float('Pay rate hourly')
    pay_rate_annually = fields.Float('Pay rate annually')

    filter_start = fields.Date('From')
    filter_end = fields.Date('To')
    total_sched_hrs1 = fields.Float('Total scheduled hours', compute="_compute_avail_hrs1")
    total_avail_hrs1 = fields.Float('Free hours', compute="_compute_avail_hrs1")
    availaible = fields.Char(compute='_compute_availaible', string='Availaibility')

    @api.multi
    def _compute_availaible(self):
        for record in self:
            str=""
            for a in record.available_times:
                d=calendar.day_abbr[int(a.day)]
                str+=d+":"+a.start+"-"+a.end+"'   '"
            record.availaible=str

    @api.multi
    def _compute_week_hrs(self):
        for rec in self:
            c=0
            for a in rec.available_times:
                h=int(a.end)-int(a.start)
                c=c+ h
            rec.hours_per_week=c

    @api.depends('filter_start','filter_end')
    @api.multi
    def _compute_avail_hrs1(self):
        for rec in self:
            if rec.filter_end and rec.filter_start:
                hours = rec.class_ids.calculate_hours(rec.filter_start, rec.filter_end,faculty=rec)
                rec.total_sched_hrs1 = hours["scheduled"]
                rec.total_avail_hrs1 = hours["available"]

                # sessions=rec.class_ids.create_sessions()
                # h=0
                # sessions=[s for s in sessions if s["start_datetime"]>=rec.filter_start and s["start_datetime"]<=rec.filter_end]
                # for s in sessions:
                #     a=(datetime.datetime.strptime(s["end_datetime"], "%Y-%m-%d %H:%M:%S") -
                #        datetime.datetime.strptime(s["start_datetime"], "%Y-%m-%d %H:%M:%S")).total_seconds()/3600
                #     h+=a
                #
                # start_date = datetime.datetime.strptime(rec.filter_start, '%Y-%m-%d')
                # end_date = datetime.datetime.strptime(rec.filter_end, '%Y-%m-%d')
                #
                # days = (end_date - start_date).days
                #
                # weeks = days / 7
                # # weeks = math.ceil(weeks / 0.5) * 0.5
                # total=rec.hours_per_week * weeks
                # available=total - h
                #
                # rec.total_sched_hrs1=h
                # rec.total_avail_hrs1 = available

