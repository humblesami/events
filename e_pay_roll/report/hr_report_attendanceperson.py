# -*- coding: utf-8 -*-

import time
from datetime import timedelta
from odoo import api, fields,models,_
from dateutil.relativedelta import relativedelta
from dateutil.parser import parse
from odoo.exceptions import UserError
import calendar

class ReportSalesperson(models.AbstractModel):
    _name = 'report.e_pay_roll.report_attendanceperson'

    def _get_header_info(self, start_date,finaldate):
        st_date = fields.Date.from_string(start_date)
        if finaldate:
           end_date = finaldate
        else :
            end_date = fields.Date.to_string(st_date + relativedelta(days=29))

        return {
            'start_date': fields.Date.to_string(st_date),
            'end_date': end_date,
        }

    def _get_employee_Attendance(self, employee_id):

        holidays = self.env['hr.attendance'].search([('employee_id', '=', employee_id)])

        return {
            'start_date': holidays,

        }
    def _get_leaves_summary(self, start_date,final_date, empid):
        res = []
        count = 0

        start_date = fields.Date.from_string(start_date)
        if final_date:
            final_date = fields.Date.from_string(final_date)
            end_date = final_date
        else:
            end_date = start_date + relativedelta(days=30)
        tempvalue = end_date - start_date
        val = tempvalue.days+1
        for index in range(0, val):
            current = start_date + timedelta(index)
            res.append({'day': current.day, 'working_hour': '','lateminutes':'','color': ''})
            if self._date_is_day_off(current) :
                res[index]['working_hour'] = ''
                res[index]['lateminutes'] = ''
                res[index]['color'] = '#ababab'
        # count and get leave summary details.

        holidays = self.env['hr.attendance'].search([
            ('employee_id', '=', empid),
             ('check_in', '<=', str(end_date)),
            ('check_in', '>=', str(start_date))
        ])
        countLate=0
        tempLateMinutes=0

        for holiday in holidays:
            # Convert date to user timezone, otherwise the report will not be consistent with the
            # value displayed in the interface.
            date_from = fields.Datetime.from_string(holiday.check_in)
            date_from = fields.Datetime.context_timestamp(holiday, date_from).date()

            if holiday.check_out == False:
                holiday.check_out = holiday.check_in
            date_to = fields.Datetime.from_string(holiday.check_out)
            date_to = fields.Datetime.context_timestamp(holiday, date_to).date()

            if date_to > end_date:
                next(holiday)
            elif date_from < start_date:
                next(holiday)

            for index in range(0, ((date_to - date_from).days + 1)):
                if date_from >= start_date and date_from <= end_date:
                    g = float("{0:.2f}".format(holiday.worked_hours1))
                    tempLateMinutes = float("{0:.2f}".format(holiday.lateminutes))
                    res[(date_from-start_date).days]['working_hour'] = g
                    res[(date_from - start_date).days]['lateminutes'] = tempLateMinutes
                date_from += timedelta(1)
            count +=g
            countLate+=abs(tempLateMinutes)
            countLate = float("{0:.2f}".format(countLate))


        self.sum = count
        self.latesum = countLate
        holidays = self.env['hr.holidays'].search([
            ('employee_id', '=', empid), ('state', 'in', ['validate']),
            ('type', '=', 'remove'), ('date_from', '<=', str(end_date)),
            ('date_to', '>=', str(start_date))
        ])
        count = 0
        for holiday in holidays:
            # Convert date to user timezone, otherwise the report will not be consistent with the
            # value displayed in the interface.
            date_from = fields.Datetime.from_string(holiday.date_from)
            date_from = fields.Datetime.context_timestamp(holiday, date_from).date()
            date_to = fields.Datetime.from_string(holiday.date_to)
            date_to = fields.Datetime.context_timestamp(holiday, date_to).date()
            for index in range(0, ((date_to - date_from).days + 1)):
                if date_from >= start_date and date_from <= end_date:
                    res[(date_from-start_date).days]['color'] = holiday.holiday_status_id.color_name
                date_from += timedelta(1)
            count += abs(holiday.number_of_days)
        self.leavedays = count


        return res
    def _get_data_from_report(self, data):
        res = []
        Employee = self.env['hr.employee']

        if 'employee_id' in data:
            res.append({'data': []})
            z = self.env['hr.employee'].search([('id', '=', data['employee_id'][0])])
            for emp in Employee.search([('id', '=', data['employee_id'][0])]):
                # v=emp.name
                # z=self._get_leaves_summary(data['date_from'], emp.id)
                res[0]['data'].append({
                    'emp': emp.name,
                    'display': self._get_leaves_summary(data['date_from'],data['date_to'], emp.id),
                    'sum': self.sum,
                    'latesum':self.latesum,
                    'leavedays':self.leavedays
                })
        return res

    def _get_months(self, start_date,final_date):
        # it works for geting month name between two dates.
        res = []
        start_date = fields.Date.from_string(start_date)
        if final_date:
            end_date = fields.Date.from_string(final_date)
        else:
            end_date = start_date + relativedelta(days=29)
        # end_date = fields.Date.from_string(end_date)

        while start_date <= end_date:
            last_date = start_date + relativedelta(day=1, months=+1, days=-1)
            if last_date > end_date:
                last_date = end_date
            month_days = (last_date - start_date).days + 1
            res.append({'month_name': start_date.strftime('%B'), 'days': month_days})
            start_date += relativedelta(day=1, months=+1)
        return res

    def _date_is_day_off(self, date):
        return date.weekday() in (calendar.SATURDAY, calendar.SUNDAY,)

    def _get_day(self, start_date,end_date):
        res = []
        start_date = fields.Date.from_string(start_date)
        end_date = fields.Date.from_string(end_date)
        if end_date:
            end_date = end_date
        else:
            end_date = start_date + relativedelta(days=30)
        val = end_date - start_date
        val = val.days+1
        for x in range(0, val):
            color = '#ababab' if self._date_is_day_off(start_date) else ''
            res.append({'day_str': start_date.strftime('%a'), 'day': start_date.day , 'color': color})
            start_date = start_date + relativedelta(days=1)
        return res

    def _get_holidays_status(self):
        res = []
        for holiday in self.env['hr.holidays.status'].search([]):
            res.append({'color': holiday.color_name, 'name': holiday.name})
        return res
    @api.model
    def get_report_values(self, docids, data=None):
        if not data.get('form'):
            raise UserError(_("Form content is missing, this report cannot be printed."))

        holidays_report = self.env['ir.actions.report']._get_report_from_name('e_pay_roll.report_attendanceperson')


        holidays = self.env['hr.attendance'].browse(self.ids)
        return {
            'doc_ids': self.ids,
            'doc_model': holidays_report.model,
            'docs': holidays,
            'get_header_info': self._get_header_info(data['form']['date_from'],data['form']['date_to']),
            '_get_employee_Attendance':self._get_employee_Attendance(data['form']['employee_id'][0]),
            'get_day': self._get_day(data['form']['date_from'],data['form']['date_to']),
            'get_months': self._get_months(data['form']['date_from'],data['form']['date_to']),
            'get_data_from_report': self._get_data_from_report(data['form']),
            'get_holidays_status': self._get_holidays_status(),

        }
