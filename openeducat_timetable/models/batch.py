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
import calendar
import datetime
import pytz
import time

from odoo.exceptions import ValidationError

class OpClass(models.Model):
    _inherit = 'op.batch'

    @api.multi
    def action_create_timetable(self):
        for c in self:
            strt_time = str(datetime.timedelta(hours=c.start)).rsplit(':', 1)[0] + ":00"
            end_time = str(datetime.timedelta(hours=c.end)).rsplit(':', 1)[0] + ":00"
            h1 = int(strt_time.split(":")[0])
            h2 = int(end_time.split(":")[0])
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

                    temp_date1 = datetime.datetime.strptime(curr_date.strftime('%Y-%m-%d ') +
                        strt_time, '%Y-%m-%d %H:%M:%S')
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
                            })
                        else:
                            raise ValidationError(_("%s not available at selected time %s to %s." % (
                                c.faculty_id.name, temp_date1.strftime("%Y-%m-%d %H:%M:%S"),
                                temp_date2.strftime("%Y-%m-%d %H:%M:%S"))))

        return {'type': 'ir.actions.act_window_close'}









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




