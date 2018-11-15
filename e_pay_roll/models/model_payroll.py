# -*- coding: utf-8 -*-
import sys
from datetime import datetime,timedelta
from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
from odoo.tools import DEFAULT_SERVER_DATETIME_FORMAT


class EmployeeField(models.Model):
    _inherit = 'hr.contract'
    employee_id = fields.Many2one('hr.employee', string='Employee',required=True)
    working_days = fields.Float(String='Working Days/month',default='22')
    tempCheck = fields.Float(String = 'CheckValue')
    working_hours = fields.Float(String='Working Hours/month',default='8')
    rate_hour = fields.Float(String='Rate/hour',compute='_compute_rate')
    taxrate = fields.Float(String='Tax Deduction',compute='_compute_tax_rate')
    contractcopy = fields.Many2many(comodel_name="ir.attachment",relation="m2m_ir_contract_rel",
                                 column1 = "m2m_id",column2 = "attachment_id",
                                                    string = "Contract Copy")





    @api.depends('wage')
    @api.multi
    def _compute_tax_rate(self):
        rate = self.wage * 12
        tempRate = 0
        if rate > 400000 and rate <=800000:
            tempRate = 1000
        elif rate >800000 and rate <=1200000:
            tempRate = 2000
        elif rate >1200000 and rate <=2400000:
            alpha =  (5*(rate - 1200000))/100
            if alpha <2000:
                tempRate = 2000
            else:
                tempRate = alpha
        elif rate >2400000 and rate <= 4800000:
            alpha = (10 * (rate - 2400000)) / 100
            tempRate = 60000 + alpha
        elif rate >4800000:
            alpha = (15 * (rate - 4800000)) / 100
            tempRate = 300000 + alpha
        else:
            tempRate = 0
        tempRate = tempRate/12
        self.taxrate = round(tempRate)
        self.voluntary_provident_fund =  0.05*self.wage
    @api.depends('working_hours','working_days')
    @api.multi
    def _compute_rate(self):
        rate = self.working_days*self.working_hours
        self.rate_hour = self.wage/rate
class epayroll(models.Model):
    #incheriting model and adding fields in it which are to be used to cater breaks
    _inherit = 'resource.calendar.attendance'
    break_start = fields.Float(string="Break Start")
    break_end = fields.Float(string="Break End")
    # thresholdValue = fields.Float(string="Threshold Time Value",help='Time less than this value is considered in the previous day',default=8 )

class payAttendance(models.Model):
    _inherit = "hr.attendance"
    worked_hours1 = fields.Float(string="Total Hours Worked")
    breakStart = fields.Datetime(string="Break Start")
    breakEnd = fields.Datetime(string="Break End")
    lateminutes = fields.Float(string="Late Minutes")
    check_in = fields.Datetime(string="Check In",required=False)
    check_out = fields.Datetime(string="Check Out")
    dateValue = fields.Date(string='Date')
    TotalLeaves = fields.Float(string='Total Leaves',compute='_compute_leaves')
    sickLeaves = fields.Float(string='Sick Leaves',compute='_compute_leaves')
    work_date = fields.Date()
    _sql_constraints = [
        ('attendance_employee_id_work_date', 'unique(employee_id,work_date)',
         'The employee can have only one attendance record per day.'),
    ]

    @api.constrains('check_in', 'check_out')
    def _check_validity_check_in_check_out(self):
        do_nothing = 1

    @api.constrains('check_in', 'check_out', 'employee_id')
    def _check_validity(self):
        do_nothing = 1

    @api.multi
    def _compute_leaves(self):
        val=0
        val = self.env['hr.holidays.status'].search([])


        for data in self:
            holidays = self.env['hr.holidays'].search([
                ('employee_id', '=', data.employee_id.id),
                ('state', 'in', ['confirm', 'validate1', 'validate']),
                ('holiday_status_id', 'in', val.ids)
            ])
            data_days = val.get_days(data.employee_id.id)

            for holiday_status in val:
                if holiday_status.display_name =='Sick Leaves' :
                    result = data_days.get(holiday_status.id, {})
                    holiday_status.max_leaves = result.get('max_leaves', 0)
                    holiday_status.leaves_taken = result.get('leaves_taken', 0)
                    sickleavecounter = result.get('remaining_leaves', 0)
                    holiday_status.virtual_remaining_leaves = result.get('virtual_remaining_leaves', 0)

            count = 0
            for value in data_days:
              count +=  data_days[value]['remaining_leaves']
            va = data.employee_id.id
            data.TotalLeaves = count
            if(sickleavecounter):
                data.sickLeaves = sickleavecounter

    def calc_worked_hours(self, vals):
        try:
            # making list of days
            mydict = {
            '0': 'Monday',
            '1': 'Tuesday',
            '2': 'Wednesday',
            '3': 'Thursday',
            '4': 'Friday',
            '5': 'Saturday',
            '6': 'Sunday'}
            #Getting the Day for the checkout and looking its value in the list
            if(vals['check_out']):
                today_day = datetime.strptime(vals['check_out'], '%Y-%m-%d %H:%M:%S')
            else:
                today_day = datetime.strptime(vals['check_in'], '%Y-%m-%d %H:%M:%S')
            tempday = today_day
            tempday = tempday.replace(second=0,minute=0,hour=0)
            checkinDate = today_day.strftime("%d")
            today_day = today_day.strftime("%A")
            checkInMonth =  tempday.strftime("%m")
            dayAlternateValue = list(mydict.keys())[list(mydict.values()).index(today_day)]

            #Getting the Value for the contract which is assigned to the employee
            contract = self.env['hr.contract'].search([('employee_id', '=', self.employee_id.id)], limit=1)

            # if not(contract.id):
            #     raise ValidationError("No running contract defined.Kindly define it in the contract of employee.")
            #Getting the working schedule for the specific employee on that specific working day
            working_schedule = self.env['resource.calendar.attendance'].search(['&',('calendar_id', '=', contract.resource_calendar_id.id),('dayofweek','=',dayAlternateValue)],order='__last_update')
            tempSchedule=[]
            tempWorkingSchedule=False
            #checking if there is date mentioned for the schedule.
            for val in working_schedule:
                if not (val.date_from):
                    tempSchedule.append(val)
                if(val.date_from):
                    lower=datetime.strptime(val.date_from,"%Y-%m-%d")
                    upper = datetime.strptime(val.date_to, "%Y-%m-%d")
                    if(tempday>=lower and tempday<=upper ):
                        tempWorkingSchedule= val
            if(tempWorkingSchedule):
                working_schedule = tempWorkingSchedule
            else:
                working_schedule = tempSchedule[0]
            if not working_schedule:
                return False


            deltaBreak = datetime(1, 1, 1, 0, 0)
            #Converting check in and checkout time from schedule in proper format
            if(working_schedule.hour_to and working_schedule.hour_from):
                expectedCheckOutTime = self.convert_string_date(working_schedule.hour_to,checkinDate,checkInMonth)
                expectedCheckInTime = self.convert_string_date(working_schedule.hour_from,checkinDate,checkInMonth)
            else:
                tempdayValue = datetime(1, 1, 1, 0, 0)
                expectedCheckOutTime = self.convert_string_date(tempdayValue,checkinDate,checkInMonth)
                expectedCheckInTime = self.convert_string_date(tempdayValue,checkinDate,checkInMonth)
            #calculating the break difference defined in the schedule
            mji=0
            expectedBreakEnd = '0'
            expectedBreakStart= '0'
            if not (working_schedule.break_end == 0 and working_schedule.break_start ==0):
                expectedBreakStart = self.convert_string_date(working_schedule.break_start
                                                              ,checkinDate,checkInMonth)
                expectedBreakEnd = self.convert_string_date(working_schedule.break_end,
                                                            checkinDate,checkInMonth)
                deltaBreak = datetime.strptime(expectedBreakEnd,
                                               DEFAULT_SERVER_DATETIME_FORMAT) - datetime.strptime(
                expectedBreakStart, DEFAULT_SERVER_DATETIME_FORMAT)
                if(self.check_out):
                     if(self.check_out>expectedBreakStart and self.check_out<expectedBreakEnd):
                        deltaBreak = datetime.strptime(vals['check_out'],
                                                       DEFAULT_SERVER_DATETIME_FORMAT) - datetime.strptime(expectedBreakStart, DEFAULT_SERVER_DATETIME_FORMAT)

            if(deltaBreak):
                mji  = deltaBreak
            deltaConverter = datetime(1, 1, 1, 0, 0)
            lateMinutes = datetime(1, 1, 1, 0, 0)
            temp = vals['check_out']
            if (temp < expectedCheckOutTime and temp < expectedBreakStart):
                temp = vals['check_out']
                lateMinutes = self.time_difference_function(expectedCheckOutTime, temp) - deltaBreak
            elif(temp< expectedCheckOutTime and temp > expectedBreakEnd):
                lateMinutes = self.time_difference_function(expectedCheckOutTime, temp)
            elif (temp >= expectedBreakStart and temp <= expectedBreakEnd):
                lateMinutes = self.time_difference_function(expectedCheckOutTime, expectedBreakEnd)
            else:
                lateMinutes = lateMinutes - deltaConverter
            if (vals['check_in'] > expectedCheckInTime and vals['check_in'] >= expectedBreakEnd):
                lateMinutes = lateMinutes + self.time_difference_function(vals['check_in'], expectedCheckInTime) - deltaBreak
            elif (vals['check_in'] > expectedCheckInTime and vals['check_in'] <= expectedBreakStart):
                lateMinutes = lateMinutes + self.time_difference_function(vals['check_in'], expectedCheckInTime)
            elif (vals['check_in'] > expectedCheckInTime and vals['check_in'] > expectedBreakStart and vals['check_in'] < expectedBreakEnd):
                lateMinutes = lateMinutes + self.time_difference_function(expectedBreakStart, expectedCheckInTime)
            # calculating the difference
            delta = datetime.strptime(expectedCheckOutTime, DEFAULT_SERVER_DATETIME_FORMAT) - datetime.strptime(
                 expectedCheckInTime, DEFAULT_SERVER_DATETIME_FORMAT)
            delta = delta - mji
            lateMinutes = timedelta(0, lateMinutes.seconds)
            if (vals['check_in'] > expectedBreakEnd):
                delta = delta - lateMinutes
            else:
                # delta = delta - mji - lateMinutes
                delta = delta  - lateMinutes

            x = delta.total_seconds() / 3600.0
            if vals['check_in'] > expectedCheckOutTime and vals['check_out'] > expectedCheckOutTime:
                x = 0
            z = lateMinutes.total_seconds() / 3600.0

            if expectedBreakEnd == '0':
                timeObject = tempday
                timeObject = timeObject.replace(hour=0
                                                , minute=0
                                                , second=0, microsecond=0)
                expectedBreakEnd = timeObject

            if expectedBreakStart == '0':
                timeObject = tempday
                timeObject = timeObject.replace(hour=0
                                                    , minute=0
                                                    , second=0, microsecond=0)
                expectedBreakStart = timeObject
            arayData= {'lateminutes':z,
                'workhours':x,
                'breakstart':expectedBreakStart,
                'breakend':expectedBreakEnd,
                'dateValue':tempday.date()
                }
            return arayData

        except:
            raise ValidationError(sys.exc_info())

    def convert_date(self, x):
        orig_date = x
        orig_date = str(orig_date)
        d = datetime.strptime(orig_date, '%Y-%m-%d %H:%M:%S')
        return d

    # created a function to convert string float value in to Datetime Object with proper format.
    # so that the format remains the same through out the program
    def convert_string_date(self, floatMinValue, dayAlternateValue,monthvalue):
        timeHourDifference = 5
        minutes = int(round(floatMinValue * 60))
        val = "%02d:%02d" % divmod(minutes, 60)
        todayDateTimeObject = datetime.today()
        val = val.split(':')
        timeObject = todayDateTimeObject.replace(hour=int(val[0]) - timeHourDifference
                                                 , minute=int(val[1])
                                                 ,second=0, microsecond=0
                                                 , day=int(dayAlternateValue),month=int(monthvalue))
        timeFormattedObject = timeObject.strftime("%Y-%m-%d %H:%M:%S")

        return timeFormattedObject

    # Creating a function to calculate the max and minimum time according to server datetime format.
    def time_difference_function(self, max, min):
        delta = datetime.strptime(max,DEFAULT_SERVER_DATETIME_FORMAT) - datetime.strptime(min, DEFAULT_SERVER_DATETIME_FORMAT)
        return delta

    # Attendance Log
class HRAttendancelog(models.Model):
    _name = "attendance.log"

    changeInAttendance = fields.Char(string="Attendance Change")
    employee_id = fields.Many2one("hr.employee", string="Employee", readonly=True)
    @api.model
    def create(self, vals):
        return super(HRAttendancelog, self).create(vals)

class Provident_Funds(models.Model):
    _name = 'total.providents.fund'


    provident_fields = fields.Float(string="Total Provident Fund", readonly=True)
    provident_employee = fields.Char(string="Employee", readonly=True)
    provident_month = fields.Char(string="Month", readonly=True)
    user_id = fields.Many2one("res.user",string="User", readonly=True)
    employee_id = fields.Many2one("hr.employee" , string="Employee", readonly=True)




    @api.model
    def create(self, vals):
        return super(Provident_Funds, self).create(vals)
class Resourcetemp(models.Model):
    #incheriting model and adding fields in it which are to be used to cater breaks
    _inherit = 'resource.calendar'
    # thresholdtempValue = fields.Float(string="Time Value",
    #                               help='Time less than this value is considered in the previous day', default=8)

    def _get_default_attendance_ids(self):
        return [
            (0, 0, {'name': _('Monday'), 'dayofweek': '0', 'hour_from': 11, 'hour_to': 20,'break_start':'15','break_end':'16','thresholdValue':'7'}),
            (0, 0, {'name': _('Tuesday '), 'dayofweek': '1', 'hour_from': 11, 'hour_to': 20,'break_start':'15','break_end':'16','thresholdValue':'7'}),
            (0, 0, {'name': _('Wednesday'), 'dayofweek': '2', 'hour_from': 11, 'hour_to': 20,'break_start':'15','break_end':'16','thresholdValue':'7'}),
            (0, 0, {'name': _('Thursday'), 'dayofweek': '3', 'hour_from': 11, 'hour_to': 20,'break_start':'15','break_end':'16','thresholdValue':'7'}),
            (0, 0, {'name': _('Friday'), 'dayofweek': '4', 'hour_from': 11, 'hour_to': 20,'break_start':'15','break_end':'16','thresholdValue':'7'})
        ]

    attendance_ids = fields.One2many(
        'resource.calendar.attendance', 'calendar_id', 'Working Time',
        copy=True, default=_get_default_attendance_ids)
    # @api.onchange('thresholdtempValue')
    # def valueChange(self):
    #     val = self.thresholdtempValue
    #     for loop in self.attendance_ids:
    #         loop.thresholdValue = val




    @api.model
    def default_get(self, fields):
        res = super(Resourcetemp, self).default_get(fields)
        if 'current_user' in self._context:
            if self._context['current_user'] != False:
                val = self.env['hr.employee'].search([('id','=',self._context['current_user'])])
                res['name']= _('Working Hours of %s') % val.name
        return res

