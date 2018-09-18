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
import math

from odoo import models, fields, api, _
import calendar
import datetime
import pytz
import time

from odoo.exceptions import ValidationError

class OpClass(models.Model):
    _inherit = 'op.batch'

    session_ids = fields.One2many('op.session', 'batch_id', 'Sessions')
    avail_hrs_week = fields.Float('Available hours per week', compute="_compute_avail_hrs")
    total_sched_hrs = fields.Float('Total scheduled hours', compute="_compute_avail_hrs")
    total_avail_hrs = fields.Float('Free hours', compute="_compute_avail_hrs")
    total_sched_hrs_room = fields.Float('Total scheduled hours', compute="_compute_avail_hrs1")
    total_avail_hrs_room = fields.Float('Free hours', compute="_compute_avail_hrs1")
    class_ids = fields.Many2many('op.batch', string='Scheduled classes',compute="_compute_sched_classes")
    faculty_ids = fields.Many2many('op.faculty', string='Faculty availability', compute="_compute_sched_classes")



    @api.multi
    @api.depends('course_id')
    def _compute_sched_classes(self):
        for rec in self:
            if rec.course_id:
                tchrs=self.env['op.faculty'].search([('faculty_course_ids', '=', rec.course_id.id)])
                rec.faculty_ids = tchrs
                faculty_ids=tchrs.ids
                rec.class_ids=self.env['op.batch'].search([('faculty_id','in',faculty_ids)])


    @api.multi
    def _compute_avail_hrs(self):
        for rec in self:

            hours = rec.faculty_id.class_ids.calculate_hours(rec.class_start,rec.class_end,faculty=rec.faculty_id)
            rec.total_sched_hrs = hours["scheduled"]
            rec.total_avail_hrs = hours["available"]

    @api.multi
    def _compute_avail_hrs1(self):
        for rec in self:

            hours = rec.room_id.class_ids.calculate_hours(rec.class_start,rec.class_end,room=True)
            rec.total_sched_hrs_room = hours["scheduled"]
            rec.total_avail_hrs_room = hours["available"]




    @api.multi
    def action_create_timetable(self):
        for c in self:
            strt_time = str(datetime.timedelta(hours=c.start)).rsplit(':', 1)[0] + ":00"
            end_time = str(datetime.timedelta(hours=c.end)).rsplit(':', 1)[0] + ":00"
            h1 = int(strt_time.split(":")[0])
            h2 = int(end_time.split(":")[0])
            students=self.env['op.admission'].search([('batch_id','=',c.id),('state','=','done')])

            days=[]
            for d in c.days:
                days.append(int(d.day))
            for term in c.term_ids:
                start_date = datetime.datetime.strptime(
                    term.start_date, '%Y-%m-%d')
                end_date = datetime.datetime.strptime(term.end_date, '%Y-%m-%d')

                for n in range((end_date - start_date).days + 1):
                    curr_date = start_date + datetime.timedelta(n)
                    curr_day = curr_date.weekday()
                    temp0=curr_date.strftime('%Y-%m-%d')
                    if term.break_start and term.break_end:
                        if temp0>=term.break_start and temp0<=term.break_end:
                            continue

                    temp_date1 = datetime.datetime.strptime(temp0+' '+ strt_time, '%Y-%m-%d %H:%M:%S')
                    local_tz = pytz.timezone(
                        self.env.user.partner_id.tz or 'GMT')
                    # local_tz = pytz.UTC
                    local_dt = local_tz.localize(temp_date1, is_dst=None)
                    utc_dt = local_dt.astimezone(pytz.utc)
                    utc_dt = utc_dt.strftime("%Y-%m-%d %H:%M:%S")
                    curr_start_date = datetime.datetime.strptime(
                        utc_dt, "%Y-%m-%d %H:%M:%S")

                    temp_date2 = datetime.datetime.strptime(curr_date.strftime('%Y-%m-%d ') +
                                                            end_time, '%Y-%m-%d %H:%M:%S')

                    local_dt = local_tz.localize(temp_date2, is_dst=None)
                    utc_dt = local_dt.astimezone(pytz.utc)
                    utc_dt = utc_dt.strftime("%Y-%m-%d %H:%M:%S")
                    curr_end_date = datetime.datetime.strptime(
                        utc_dt, "%Y-%m-%d %H:%M:%S")


                    if curr_day in days:
                        available = False

                        for a in c.faculty_id.available_times:
                            if int(a.day) == curr_day and h1 >= int(a.start) and h2 <= int(a.end):
                                available = True
                                break
                        if available:
                            st_arr = []
                            for s in students:
                                obj = (0, 0, {'student_id': s.student_id.id,'attendance_date':temp0})
                                st_arr.append(obj)
                            self.env['op.session'].create({
                                'faculty_id': c.faculty_id.id,
                                # 'subject_id': line.subject_id.id,
                                'course_id': c.course_id.id,
                                'batch_id': c.id,
                                # 'timing_id': line.timing_id.id,
                                # 'classroom_id': line.classroom_id.id,
                                'start_datetime':
                                    curr_start_date.strftime("%Y-%m-%d %H:%M:%S"),
                                'end_datetime':
                                    curr_end_date.strftime("%Y-%m-%d %H:%M:%S"),
                                'type': calendar.day_name[curr_day],
                                'attendance_line': st_arr,
                            })
                        else:
                            raise ValidationError(_("%s not available at selected time %s to %s." % (
                                c.faculty_id.name, temp_date1.strftime("%Y-%m-%d %H:%M:%S"),
                                temp_date2.strftime("%Y-%m-%d %H:%M:%S"))))

        return {'type': 'ir.actions.act_window_close'}

    @api.multi
    def calculate_hours(self,start,end,terms=False,local=False,faculty=False,room=False,withBreaks=False):
        sessions=[]
        for c in self:
            strt_time = str(datetime.timedelta(hours=c.start)).rsplit(':', 1)[0] + ":00"
            end_time = str(datetime.timedelta(hours=c.end)).rsplit(':', 1)[0] + ":00"
            h1 = int(strt_time.split(":")[0])
            h2 = int(end_time.split(":")[0])

            days = []
            for d in c.days:
                days.append(int(d.day))
            for term in c.term_ids:
                start_date = datetime.datetime.strptime(
                    term.start_date, '%Y-%m-%d')
                end_date = datetime.datetime.strptime(term.end_date, '%Y-%m-%d')

                for n in range((end_date - start_date).days + 1):
                    curr_date = start_date + datetime.timedelta(n)
                    curr_day = curr_date.weekday()
                    temp0 = curr_date.strftime('%Y-%m-%d')
                    if term.break_start and term.break_end:
                        if temp0 >= term.break_start and temp0 <= term.break_end:
                            continue

                    temp_date1 = datetime.datetime.strptime(temp0 + ' ' + strt_time, '%Y-%m-%d %H:%M:%S')
                    local_tz = pytz.timezone(
                        self.env.user.partner_id.tz or 'GMT')
                    # local_tz = pytz.UTC
                    local_dt = local_tz.localize(temp_date1, is_dst=None)
                    utc_dt = local_dt.astimezone(pytz.utc)
                    utc_dt = utc_dt.strftime("%Y-%m-%d %H:%M:%S")
                    curr_start_date = datetime.datetime.strptime(
                        utc_dt, "%Y-%m-%d %H:%M:%S")

                    temp_date2 = datetime.datetime.strptime(curr_date.strftime('%Y-%m-%d ') +
                                                            end_time, '%Y-%m-%d %H:%M:%S')

                    local_dt = local_tz.localize(temp_date2, is_dst=None)
                    utc_dt = local_dt.astimezone(pytz.utc)
                    utc_dt = utc_dt.strftime("%Y-%m-%d %H:%M:%S")
                    curr_end_date = datetime.datetime.strptime(
                        utc_dt, "%Y-%m-%d %H:%M:%S")
                    if local:
                        curr_start_date=temp_date1
                        curr_end_date=temp_date2

                    if curr_day in days:
                        available = False

                        # for a in c.faculty_id.available_times:
                        #     if int(a.day) == curr_day and h1 >= int(a.start) and h2 <= int(a.end):
                        #         available = True
                        #         break
                        # if available:
                        sessions.append({
                            'faculty_id': c.faculty_id.id,
                            # 'subject_id': line.subject_id.id,
                            'course_id': c.course_id.id,
                            'batch_id': c.id,
                            # 'timing_id': line.timing_id.id,
                            # 'classroom_id': line.classroom_id.id,
                            'start_datetime':
                                curr_start_date.strftime("%Y-%m-%d %H:%M:%S"),
                            'end_datetime':
                                curr_end_date.strftime("%Y-%m-%d %H:%M:%S"),
                            'type': calendar.day_name[curr_day],
                        })

                        # else:
                        #     raise ValidationError(_("%s not available at selected time %s to %s." % (
                        #         c.faculty_id.name, temp_date1.strftime("%Y-%m-%d %H:%M:%S"),
                        #         temp_date2.strftime("%Y-%m-%d %H:%M:%S"))))
        scheduled = 0
        if terms:
            sessions1=[]
            daygenerator=[]
            for term in terms:
                temp=[]
                start_date = datetime.datetime.strptime(term.start_date, '%Y-%m-%d')
                end_date = datetime.datetime.strptime(term.end_date, '%Y-%m-%d')
                if withBreaks:
                    temp = [s for s in sessions if
                            s["start_datetime"] >= term.start_date and s["start_datetime"] <= term.end_date ]
                    daygenerator1 = [start_date + datetime.timedelta(x) for x in range((end_date - start_date).days + 1)]
                else:
                    if term.break_start and term.break_end:
                        temp = [s for s in sessions if (s["start_datetime"] >= term.start_date and s["start_datetime"] <= term.end_date) and not (s["start_datetime"] >= term.break_start and s["start_datetime"] <= term.break_end)]
                        daygenerator1 = [start_date + datetime.timedelta(x) for x in range((end_date - start_date).days + 1) if
                                        not ((start_date + datetime.timedelta(x)).strftime('%Y-%m-%d') >= term.break_start and
                                             (start_date + datetime.timedelta(x)).strftime('%Y-%m-%d') <= term.break_end)]
                    else:
                        temp = [s for s in sessions if
                                s["start_datetime"] >= term.start_date and s["start_datetime"] <= term.end_date]
                        daygenerator1 = [start_date + datetime.timedelta(x) for x in
                                        range((end_date - start_date).days + 1)]
                sessions1.extend(temp)
                daygenerator.extend(daygenerator1)
        else:
            start_date = datetime.datetime.strptime(start, '%Y-%m-%d')
            end_date = datetime.datetime.strptime(end, '%Y-%m-%d')
            daygenerator = [start_date + datetime.timedelta(x ) for x in range((end_date - start_date).days+1)]

            sessions1 = [s for s in sessions if
                         s["start_datetime"] >= start and s["start_datetime"] <= end]
        for s in sessions1:
            a = (datetime.datetime.strptime(s["end_datetime"], "%Y-%m-%d %H:%M:%S")-
                 datetime.datetime.strptime(s["start_datetime"], "%Y-%m-%d %H:%M:%S")).total_seconds() / 3600
            scheduled += a


        total = 0
        if faculty:
            for day in daygenerator:
                for a in faculty.available_times:
                    if int(a.day) == day.weekday():
                        total+=int(a.end) - int(a.start)
        if room:
            days = sum(1 for day in daygenerator if day.weekday() < 5)
            total = 12*days
        available = total - scheduled


        return {"scheduled":scheduled,"available":available,"total":total,'sessions':sessions1}

    @api.multi
    def calculate_hours_from_obj(self, start, end, terms=False, local=False,obj=False, faculty=False, room=False, withBreaks=False):
        sessions = []
        strt_time = str(datetime.timedelta(hours=obj["start"])).rsplit(':', 1)[0] + ":00"
        end_time = str(datetime.timedelta(hours=obj["end"])).rsplit(':', 1)[0] + ":00"
        h1 = int(strt_time.split(":")[0])
        h2 = int(end_time.split(":")[0])

        days = []
        for d in obj["days"]:
            days.append(int(d.day))
        for term in obj["term_ids"]:
            start_date = datetime.datetime.strptime(
                term.start_date, '%Y-%m-%d')
            end_date = datetime.datetime.strptime(term.end_date, '%Y-%m-%d')

            for n in range((end_date - start_date).days + 1):
                curr_date = start_date + datetime.timedelta(n)
                curr_day = curr_date.weekday()
                temp0 = curr_date.strftime('%Y-%m-%d')
                if term.break_start and term.break_end:
                    if temp0 >= term.break_start and temp0 <= term.break_end:
                        continue

                temp_date1 = datetime.datetime.strptime(temp0 + ' ' + strt_time, '%Y-%m-%d %H:%M:%S')
                local_tz = pytz.timezone(
                    self.env.user.partner_id.tz or 'GMT')
                # local_tz = pytz.UTC
                local_dt = local_tz.localize(temp_date1, is_dst=None)
                utc_dt = local_dt.astimezone(pytz.utc)
                utc_dt = utc_dt.strftime("%Y-%m-%d %H:%M:%S")
                curr_start_date = datetime.datetime.strptime(
                    utc_dt, "%Y-%m-%d %H:%M:%S")

                temp_date2 = datetime.datetime.strptime(curr_date.strftime('%Y-%m-%d ') +
                                                        end_time, '%Y-%m-%d %H:%M:%S')

                local_dt = local_tz.localize(temp_date2, is_dst=None)
                utc_dt = local_dt.astimezone(pytz.utc)
                utc_dt = utc_dt.strftime("%Y-%m-%d %H:%M:%S")
                curr_end_date = datetime.datetime.strptime(
                    utc_dt, "%Y-%m-%d %H:%M:%S")
                if local:
                    curr_start_date = temp_date1
                    curr_end_date = temp_date2

                if curr_day in days:
                    available = False
                    sessions.append({
                        # 'faculty_id': obj.faculty_id.id,
                        # 'subject_id': line.subject_id.id,
                        # 'course_id': obj.course_id.id,
                        # 'batch_id': obj.id,
                        # 'timing_id': line.timing_id.id,
                        # 'classroom_id': line.classroom_id.id,
                        'start_datetime':
                            curr_start_date.strftime("%Y-%m-%d %H:%M:%S"),
                        'end_datetime':
                            curr_end_date.strftime("%Y-%m-%d %H:%M:%S"),
                        'type': calendar.day_name[curr_day],
                    })

          
        scheduled = 0
        if terms:
            sessions1 = []
            daygenerator = []
            for term in terms:
                temp = []
                start_date = datetime.datetime.strptime(term.start_date, '%Y-%m-%d')
                end_date = datetime.datetime.strptime(term.end_date, '%Y-%m-%d')
                if withBreaks:
                    temp = [s for s in sessions if
                            s["start_datetime"] >= term.start_date and s["start_datetime"] <= term.end_date]
                    daygenerator1 = [start_date + datetime.timedelta(x) for x in
                                     range((end_date - start_date).days + 1)]
                else:
                    if term.break_start and term.break_end:
                        temp = [s for s in sessions if (s["start_datetime"] >= term.start_date and s[
                            "start_datetime"] <= term.end_date) and not (
                                    s["start_datetime"] >= term.break_start and s[
                                "start_datetime"] <= term.break_end)]
                        daygenerator1 = [start_date + datetime.timedelta(x) for x in
                                         range((end_date - start_date).days + 1) if
                                         not ((start_date + datetime.timedelta(x)).strftime(
                                             '%Y-%m-%d') >= term.break_start and
                                              (start_date + datetime.timedelta(x)).strftime(
                                                  '%Y-%m-%d') <= term.break_end)]
                    else:
                        temp = [s for s in sessions if
                                s["start_datetime"] >= term.start_date and s["start_datetime"] <= term.end_date]
                        daygenerator1 = [start_date + datetime.timedelta(x) for x in
                                         range((end_date - start_date).days + 1)]
                sessions1.extend(temp)
                daygenerator.extend(daygenerator1)
        else:
            start_date = datetime.datetime.strptime(start, '%Y-%m-%d')
            end_date = datetime.datetime.strptime(end, '%Y-%m-%d')
            daygenerator = [start_date + datetime.timedelta(x) for x in range((end_date - start_date).days + 1)]

            sessions1 = [s for s in sessions if
                         s["start_datetime"] >= start and s["start_datetime"] <= end]
        for s in sessions1:
            a = (datetime.datetime.strptime(s["end_datetime"], "%Y-%m-%d %H:%M:%S") -
                 datetime.datetime.strptime(s["start_datetime"], "%Y-%m-%d %H:%M:%S")).total_seconds() / 3600
            scheduled += a


        return {"scheduled": scheduled}











            #     for line in session.time_table_lines:
            #         if int(line.day) == curr_date.weekday():
            #             hour = line.timing_id.hour
            #             if line.timing_id.am_pm == 'pm' and int(hour) != 12\
            #
            #
            #
            #
            #
            #
            #                     :
            #                 hour = int(hour) + 12
            #             per_time = '%s:%s:00' % (hour, line.timing_id.minute)
            #             final_date = datetime.datetime.strptime(
            #                 curr_date.strftime('%Y-%m-%d ') +
            #                 per_time, '%Y-%m-%d %H:%M:%S')
            #             local_tz = pytz.timezone(
            #                 self.env.user.partner_id.tz or 'GMT')
            #             local_dt = local_tz.localize(final_date, is_dst=None)
            #             utc_dt = local_dt.astimezone(pytz.utc)
            #             utc_dt = utc_dt.strftime("%Y-%m-%d %H:%M:%S")
            #             curr_start_date = datetime.datetime.strptime(
            #                 utc_dt, "%Y-%m-%d %H:%M:%S")
            #             curr_end_date = curr_start_date + datetime.timedelta(
            #                 hours=line.timing_id.duration)
            #             h1 = final_date.hour
            #             t = final_date + datetime.timedelta(
            #                 hours=line.timing_id.duration)
            #             h2 = t.hour
            #             available = False
            #
            #             for a in line.faculty_id.available_times:
            #                 day = int(line.day)
            #                 if int(a.day) == day and h1 >= int(a.start) and h2 <= int(a.end):
            #                     available = True
            #                     break
            #             if available:
            #                 self.env['op.session'].create({
            #                     'faculty_id': line.faculty_id.id,
            #                     'subject_id': line.subject_id.id,
            #                     'course_id': session.course_id.id,
            #                     'batch_id': session.batch_id.id,
            #                     'timing_id': line.timing_id.id,
            #                     'classroom_id': line.classroom_id.id,
            #                     'start_datetime':
            #                         curr_start_date.strftime("%Y-%m-%d %H:%M:%S"),
            #                     'end_datetime':
            #                         curr_end_date.strftime("%Y-%m-%d %H:%M:%S"),
            #                     'type': calendar.day_name[int(line.day)],
            #                 })
            #             else:
            #                 raise ValidationError(_("%s not available at selected time %s to %s." % (
            #                     line.faculty_id.name, final_date.strftime("%Y-%m-%d %H:%M:%S"),
            #                     t.strftime("%Y-%m-%d %H:%M:%S"))))
            # return {'type': 'ir.actions.act_window_close'}




