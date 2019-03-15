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
from datetime import datetime,timedelta
import time

from odoo import models, api, _


class ReportTimeTableTeacherGenerate(models.AbstractModel):
    _name = 'report.openeducat_timetable.report_timetable_teacher_generate'

    def get_full_name(self, data):
        faculty_name = self.env['op.faculty'].browse(data['faculty_id'][0])
        return ' '.join([faculty_name.name,
                         faculty_name.middle_name or '',
                         faculty_name.last_name])

    def sort_tt(self, data_list):
        main_list = []
        f = []
        for d in data_list:
            if d['period'] not in f:
                f.append(d['period'])
                main_list.append({
                    'name': d['period'],
                    'line': {d['day']: d},
                    'peropd_time': ' To '.join([d['start_datetime'],
                                                d['end_datetime']])
                })
            else:
                for m in main_list:
                    if m['name'] == d['period']:
                        m['line'][d['day']] = d
        return main_list

    def get_heading(self):

        dayofWeek = [_(calendar.day_name[0]),
                     _(calendar.day_name[1]),
                     _(calendar.day_name[2]),
                     _(calendar.day_name[3]),
                     _(calendar.day_name[4]),
                     _(calendar.day_name[5]),
                     _(calendar.day_name[6])]
        return dayofWeek

    def get_object(self, data):

        data_list = []
        for timetable_obj in self.env['op.session'].browse(
                data['teacher_time_table_ids']):
            oldDate = datetime.strptime(
                timetable_obj.start_datetime, "%Y-%m-%d %H:%M:%S")
            day = datetime.weekday(oldDate)
            timing = str(timedelta(hours=timetable_obj.batch_id.start)).rsplit(':', 1)[0] + '-' + \
                     str(timedelta(hours=timetable_obj.batch_id.end)).rsplit(':', 1)[0]


            timetable_data = {
                'period': timing,
                'sequence': timetable_obj.timing_id.sequence,
                'start_datetime': str(datetime.strptime(
                timetable_obj.start_datetime, "%Y-%m-%d %H:%M:%S").date()),
                'day': str(day),
                'course': timetable_obj.course_id.name + '|' + timetable_obj.batch_id.name,
            }
            data_list.append(timetable_data)

        # ttdl = sorted(data_list, key=lambda k: k['sequence'])
        # final_list = self.sort_tt(ttdl)

        # n = len(self.env['op.batch'].browse(data['batch_id'][0]).days)
        # rows = 40
        # pg = []
        res = []
        # res.append(data_list)
        length = len(data_list)
        i = 0
        while i < length:
            mon=tue=wed=thu=fri=sat=sun=False
            t = [x for x in data_list if x["day"] == '0']
            if t:
                mon=t[0]
                data_list.remove(t[0])
                i+=1
            t = [x for x in data_list if x["day"] == '1']
            if t:
                tue = t[0]
                data_list.remove(t[0])
                i += 1
            t = [x for x in data_list if x["day"] == '2']
            if t:
                wed = t[0]
                data_list.remove(t[0])
                i += 1
            t = [x for x in data_list if x["day"] == '3']
            if t:
                thu = t[0]
                data_list.remove(t[0])
                i += 1
            t = [x for x in data_list if x["day"] == '4']
            if t:
                fri = t[0]
                data_list.remove(t[0])
                i += 1
            t = [x for x in data_list if x["day"] == '5']
            if t:
                sat = t[0]
                data_list.remove(t[0])
                i += 1
            t = [x for x in data_list if x["day"] == '6']
            if t:
                sun = t[0]
                data_list.remove(t[0])
                i += 1
            obj = {"mon":mon,"tue":tue,"wed":wed,"thu":thu,"fri":fri,"sat":sat,"sun":sun}
            res.append(obj)

        return res

    @api.model
    def get_report_values(self, docids, data=None):
        model = self.env.context.get('active_model')
        docs = self.env[model].browse(self.env.context.get('active_id'))
        docargs = {
            'doc_ids': self.ids,
            'doc_model': model,
            'docs': docs,
            'data': data,
            'time': time,
            'get_object': self.get_object,
            'get_heading': self.get_heading,
            'get_full_name': self.get_full_name,
        }
        return docargs
