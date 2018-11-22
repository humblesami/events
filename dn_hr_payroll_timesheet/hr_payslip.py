    # -*- coding: utf-8 -*-
from odoo import models,fields, api,_
from datetime import datetime,timedelta
from datetime import time as datetime_time
import pytz
from dateutil import rrule
from odoo.exceptions import UserError, ValidationError
import calendar as newCalendar
from odoo.tools import DEFAULT_SERVER_DATETIME_FORMAT, float_utils




def to_tz(datetime, tz_name):
    tz = pytz.timezone(tz_name) if tz_name else pytz.UTC
    return pytz.UTC.localize(datetime.replace(tzinfo=None), is_dst=False).astimezone(tz).replace(tzinfo=None)

def to_naive_user_tz(datetime, record):
    tz_name = record._context.get('tz') or record.env.user.tz
    tz = tz_name and pytz.timezone(tz_name) or pytz.UTC
    return pytz.UTC.localize(datetime.replace(tzinfo=None), is_dst=False).astimezone(tz).replace(tzinfo=None)
def time_difference_function(self, max, min):
    delta = datetime.strptime(max, DEFAULT_SERVER_DATETIME_FORMAT) - datetime.strptime(min,
                                                                                           DEFAULT_SERVER_DATETIME_FORMAT)
    return delta

class Expected(models.Model):
   _inherit = 'hr.payslip.worked_days'
   expected_hours = fields.Float(string='Expected Hours')

class HrPayslip(models.Model):
    _inherit = 'hr.payslip'
    def _iter_work_intervals(self, start_dt, end_dt, resource_id, compute_leaves=True):
        """ Lists the current resource's work intervals between the two provided
        datetimes (inclusive) expressed in UTC, for each worked day. """
        if not end_dt:
            end_dt = datetime.datetime.combine(start_dt.date(), datetime.time.max)

        start_dt = to_naive_user_tz(start_dt, self.env.user)
        end_dt = to_naive_user_tz(end_dt, self.env.user)

        for day in rrule.rrule(rrule.DAILY,
                               dtstart=start_dt,
                               until=end_dt,
                               byweekday=self._get_weekdays()):
            start_time = datetime.time.min
            if day.date() == start_dt.date():
                start_time = start_dt.time()
            end_time = datetime.time.max
            if day.date() == end_dt.date() and end_dt.time() != datetime.time():
                end_time = end_dt.time()

            intervals = self._get_day_work_intervals(
                day.date(),
                start_time=start_time,
                end_time=end_time,
                compute_leaves=compute_leaves,
                resource_id=resource_id)
            if intervals:
                yield intervals

    def convert_string_date(self, floatMinValue, dayAlternateValue,monthvalue):
        timeHourDifference = 5
        minutes = int(round(floatMinValue * 60))
        val = "%02d:%02d" % divmod(minutes, 60)
        todayDateTimeObject = datetime.today()
        val = val.split(':')
        timeObject = todayDateTimeObject.replace(hour=int(val[0]) - timeHourDifference
                                                 , minute=int(val[1])
                                                 , second=0, microsecond=0
                                                 , day=int(dayAlternateValue),month=int(monthvalue))
        timeFormattedObject = timeObject.strftime("%Y-%m-%d %H:%M:%S")

        return timeFormattedObject

    @api.constrains('date_from', 'date_to')
    def _check_something(self):

        value = datetime.strptime(self.date_to, "%Y-%m-%d") - datetime.strptime(self.date_from, "%Y-%m-%d")
        if value.days > 31:
            raise ValidationError(
                "You can not get payslip above one month, you are trying to get payslip of %s" % value.days + " days")

    @api.constrains('date_from', 'date_to')
    def compare_dates(self):
        contract_date = datetime.strptime(self.contract_id.date_start, "%Y-%m-%d")
        date_from = datetime.strptime(self.date_from, "%Y-%m-%d")
        if date_from.month != contract_date.month:
            if date_from < contract_date:
                tempVal = contract_date.strftime("%Y-%m-%d")
                raise ValidationError(
                    "Your contract started from %s ,To calculate your payslip Please select date from which your contract started " % tempVal)


    @api.onchange('employee_id')
    def onchange_Employee(self):
        employee = self.employee_id
        date_from = self.date_from
        date_to = self.date_to
        contract_ids = []
        if not self.env.context.get('contract') or not self.contract_id:
            contract_ids = self.get_contract(employee, date_from, date_to)
            if not contract_ids:
                self.contract_id = contract_ids
                self.worked_days_line_ids = contract_ids
                return

    @api.constrains('contract_id')
    def check_contract_id(self):
        if not self.contract_id:
            raise ValidationError("Your Contract is not defined for Employee %s" % self.employee_id.display_name)


    @api.model
    @api.depends('date_from', 'date_to', 'date_start','date_end')
    def get_worked_day_lines(self, contracts, date_from, date_to):
        """
        @param contract: Browse record of contracts
        @return: returns a list of dict containing the input that should be applied for the given contract between date_from and date_to
        """
        res = []

        if(self.date_from and self.date_to):
            date_from = datetime.strptime(date_from, "%Y-%m-%d")
            date_to = datetime.strptime(date_to, "%Y-%m-%d")
            date_from = date_from.replace(day=1)

            date_to = date_to.replace(day=newCalendar.monthrange(date_to.year, date_to.month)[1])

            date_to = date_to.strftime("%Y-%m-%d")
            self.date_to = date_to
            date_from = date_from.strftime("%Y-%m-%d")
            self.date_from = date_from


        # fill only if the contract as a working schedule linked
        for contract in contracts.filtered(lambda contract: contract.resource_calendar_id):
            day_from = datetime.combine(fields.Date.from_string(date_from), datetime_time.min)
            day_to = datetime.combine(fields.Date.from_string(date_to), datetime_time.max)
            working_schedule = self.env['resource.calendar.attendance'].search(
                [('calendar_id', '=', contract.resource_calendar_id.id)],
                order='date_from')

            # working_schedule = working_schedule.sorted(key=lambda r: r['date_from'])
            mydict = {
                '0': 'Monday',
                '1': 'Tuesday',
                '2': 'Wednesday',
                '3': 'Thursday',
                '4': 'Friday',
                '5': 'Saturday',
                '6': 'Sunday'}
            workhours = 0
            calendar = contract.resource_calendar_id
            for day_intervals in calendar._iter_work_intervals(day_from, day_to, self.id):
                val = day_intervals[0].start_datetime.weekday()
                valday = day_intervals[0].start_datetime.day
                valMonth = day_intervals[0].start_datetime.month
                for day in working_schedule:

                    if (val==int(day.dayofweek)):
                        deltaBreak= timedelta(0,0)
                        if not (day.break_start==0 and day.break_end ==0):
                            expectedBreakStart = self.convert_string_date(day.break_start
                                                                      , valday, valMonth)
                            expectedBreakEnd = self.convert_string_date(day.break_end,
                                                                    valday, valMonth)
                            deltaBreak = datetime.strptime(expectedBreakEnd,
                                                       DEFAULT_SERVER_DATETIME_FORMAT) - datetime.strptime(expectedBreakStart, DEFAULT_SERVER_DATETIME_FORMAT)
                        expectedCheckOutTime = self.convert_string_date(day.hour_to, valday, valMonth)
                        expectedCheckInTime = self.convert_string_date(day.hour_from, valday, valMonth)
                        valuedifference = time_difference_function(self, expectedCheckOutTime,
                                                                   expectedCheckInTime) - deltaBreak
                        if(day.date_from and day.date_to):
                         lower = datetime.strptime(day.date_from, "%Y-%m-%d")
                         upper = datetime.strptime(day.date_to,"%Y-%m-%d")
                         tempday = day_intervals[0].start_datetime
                         tempday= tempday.replace(second=0,minute=0,hour=0)
                         if(tempday>=lower and tempday<=upper ):
                             workhours+=int(valuedifference.seconds)
                             break
                        else:
                            workhours += int(valuedifference.seconds)
                            break


                            # compute leave days
            temp = (workhours/3600)
            leaves = {}
            day_leave_intervals = contract.employee_id.iter_leaves(day_from, day_to,
                                                                   calendar=contract.resource_calendar_id)
            holidays = self.env['hr.holidays'].search(['&', ('state', '=', 'validate'),
                                                      ('type', '=', 'remove'),
                                                      ('employee_id','=',contract.employee_id.id),
                                                      ('date_only_from', '>=',str(day_from.date())),
                                                      ('date_only_to', '<=',str(day_to.date()))])
            leave_hour_total=0.0
            leave_day_total=0.0
            # for day_intervals in holiday:
            for holiday in holidays:
                # holiday = interval.id
                current_leave_struct = leaves.setdefault(holiday.holiday_status_id, {
                    'name': holiday.holiday_status_id.name,
                    'sequence': 5,
                    'code': holiday.holiday_status_id.name,
                    'number_of_days': 0.0,
                    'number_of_hours': 0.0,
                    'contract_id': contract.id,
                })


                holidayName = holiday.holiday_status_id.name
                if not (holidayName=='Unpaid'):

                    workvalue = 8
                    for day in working_schedule:
                        val = day_intervals[0].start_datetime.weekday()
                        valday = day_intervals[0].start_datetime.day
                        valMonth = day_intervals[0].start_datetime.month
                        if (val == int(day.dayofweek)):
                            deltaBreak = timedelta(0, 0)
                            if not (day.break_start == 0 and day.break_end == 0):
                                expectedBreakStart = self.convert_string_date(day.break_start
                                                                              , valday, valMonth)
                                expectedBreakEnd = self.convert_string_date(day.break_end,
                                                                            valday, valMonth)
                                deltaBreak = datetime.strptime(expectedBreakEnd,
                                                               DEFAULT_SERVER_DATETIME_FORMAT) - datetime.strptime(
                                    expectedBreakStart, DEFAULT_SERVER_DATETIME_FORMAT)
                            expectedCheckOutTime = self.convert_string_date(day.hour_to, valday, valMonth)
                            expectedCheckInTime = self.convert_string_date(day.hour_from, valday, valMonth)
                            valuedifference = time_difference_function(self, expectedCheckOutTime,
                                                                       expectedCheckInTime) - deltaBreak
                            if (day.date_from and day.date_to):
                                lower = datetime.strptime(day.date_from, "%Y-%m-%d")
                                upper = datetime.strptime(day.date_to, "%Y-%m-%d")
                                tempday = day_intervals[0].start_datetime
                                tempday = tempday.replace(second=0, minute=0, hour=0)
                                if (tempday >= lower and tempday <= upper):
                                    customworkhour = int(valuedifference.seconds)
                                    customworkhour = customworkhour/3600
                                else:
                                    customworkhour = int(valuedifference.seconds)
                                    customworkhour = customworkhour / 3600

                            else:
                                customworkhour = int(valuedifference.seconds)
                                customworkhour = customworkhour / 3600

                            temp_leave_hour_total = float(holiday.duration_temp)
                            temp_leave_hour_total = ((customworkhour)/(workvalue/temp_leave_hour_total))*holiday.number_of_days_temp
                            leave_hour_total += temp_leave_hour_total
                            current_leave_struct['number_of_hours'] += float(leave_hour_total)
                            current_leave_struct['number_of_days'] += holiday.number_of_days_temp
                            if (holiday.number_of_days_temp==0.5):
                                leave_day_total += 0.5
                            elif(holiday.number_of_days_temp==0.25):
                                leave_day_total += 0.25
                            else:
                                leave_day_total += holiday.number_of_days_temp
                            break
        # compute worked days

            work_data = contract.employee_id.get_work_days_data(day_from, day_to,
                                                                    calendar=contract.resource_calendar_id)

            work_data['days'] = work_data['days'] - leave_day_total
            attendances = self.env['hr.attendance'].search(['&',('employee_id','=',contract.employee_id.id),('check_in','>=',date_from),('check_out','<=',date_to)])
            # attendances = self.env['hr.attendance'].search([('employee_id', '=', contract.employee_id.id)])
            work = 0
            for rec in attendances:
               work += rec.worked_hours1
            attendances = {
                'name': _("Normal Working Days paid at 100%"),
                'sequence': 1,
                'code': 'WORK100',
                'number_of_days': work_data['days'],
                'number_of_hours': work,
                'expected_hours':temp,
                'contract_id': contract.id,
            }

            Leaves = {
                'name': _("Normal Leave Days paid at 100%"),
                'sequence': 2,
                'code': 'Leave',
                'number_of_days':leave_day_total,
                'number_of_hours': leave_hour_total,
                'contract_id': contract.id,
            }
            res.append(attendances)
            res.append(Leaves)
        return res
    @api.multi
    def unlink(self):
        return super(HrPayslip, self).unlink()
    @api.multi
    def action_payslip_done(self):
        self.compute_sheet()
        val = self.env['hr.payslip'].search(["&",('date_from', '=', self.date_from),("date_to",'=',self.date_to),
                                           ("state",'=',"done"),('employee_id','=',self.employee_id.id)])
        checkLengthValue = val.ids.__len__()
        if checkLengthValue == 0 :
            providentFundValue = self.contract_id.voluntary_provident_fund
            employeeName = self.contract_id.employee_id.display_name
            displayName=self.display_name
            employeeId=self.employee_id.id

            self.env['total.providents.fund'].create({'provident_fields': providentFundValue,"provident_employee":employeeName,'provident_month':displayName,'employee_id':employeeId})

        return self.write({'state': 'done'})


class HrPayslipRun(models.Model):
    _inherit = 'hr.payslip.run'

    @api.onchange('date_start','date_end')
    def onchange_date(self):
        if (self.date_start and self.date_end):
            date_from = datetime.strptime(self.date_start, "%Y-%m-%d")
            date_to = datetime.strptime(self.date_end, "%Y-%m-%d")
            date_from = date_from.replace(day=1)

            date_to = date_to.replace(day=newCalendar.monthrange(date_to.year, date_to.month)[1])

            date_to = date_to.strftime("%Y-%m-%d")
            self.date_start = date_from
            date_from = date_from.strftime("%Y-%m-%d")
            self.date_end = date_to
        else:
            return

class Rescz(models.Model):
    #incheriting model and adding fields in it which are to be used to cater breaks
    _inherit = 'resource.calendar'

    @api.multi
    def _get_leave_intervals(self, resource_id=None, start_datetime=None, end_datetime=None):
        """Get the leaves of the calendar. Leaves can be filtered on the resource,
        and on a start and end datetime.

        Leaves are encoded from a given timezone given by their tz field. COnverting
        them in naive user timezone require to use the leave timezone, not the current
        user timezone. For example people managing leaves could be from different
        timezones and the correct one is the one used when encoding them.

        :return list leaves: list of time intervals """
        self.ensure_one()
        if resource_id:
            domain = ['|', ('resource_id', '=', resource_id), ('resource_id', '=', False)]
        else:
            domain = [('resource_id', '=', False)]
        if start_datetime:
            # domain += [('date_to', '>', fields.Datetime.to_string(to_naive_utc(start_datetime, self.env.user)))]
            domain += [('date_to', '>', fields.Datetime.to_string(start_datetime + timedelta(days=-1)))]
        if end_datetime:
            # domain += [('date_from', '<', fields.Datetime.to_string(to_naive_utc(end_datetime, self.env.user)))]
            domain += [('date_from', '<', fields.Datetime.to_string(end_datetime + timedelta(days=1)))]
        leaves = self.env['resource.calendar.leaves'].search(domain + [('calendar_id', '=', self.id)] )

        filtered_leaves = self.env['resource.calendar.leaves']
        for leave in leaves:
            if start_datetime:
                leave_date_to = to_tz(fields.Datetime.from_string(leave.date_to), leave.tz)
                if not leave_date_to >= start_datetime:
                    continue
            if end_datetime:
                leave_date_from = to_tz(fields.Datetime.from_string(leave.date_from), leave.tz)
                if not leave_date_from <= end_datetime:
                    continue
            filtered_leaves += leave

        return [self._interval_new(
            to_tz(fields.Datetime.from_string(leave.date_from), leave.tz),
            to_tz(fields.Datetime.from_string(leave.date_to), leave.tz),
            {'leaves': leave}) for leave in filtered_leaves]