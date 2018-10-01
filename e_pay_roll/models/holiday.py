# from datetime import datetime,timedelta
#
# import math
# HOURS_PER_DAY = 8
# from odoo import models, fields, api, _
# from odoo.tools import DEFAULT_SERVER_DATETIME_FORMAT
# class superHolidays(models.Model):
#     _inherit = 'hr.holidays'
#     date_only_from = fields.Date('Start Date', readonly=True, index=True, copy=False,
#                                 states={'draft': [('readonly', False)], 'confirm': [('readonly', False)]},
#                                 track_visibility='onchange')
#     date_only_to = fields.Date('End Date', readonly=True, copy=False,
#                               states={'draft': [('readonly', False)], 'confirm': [('readonly', False)]},
#                               track_visibility='onchange')
#     duration_temp = fields.Selection([('2','Quarter Day'),('4','Half Day'),('8','Full Day')],default='2')
#
#     @api.onchange('date_only_from','date_only_to','duration_temp')
#     def _onchange_duration_to(self):
#         date_from = datetime.strptime(self.date_only_from, "%Y-%m-%d")
#         date_to = datetime.strptime(self.date_only_to, "%Y-%m-%d")
#
#         # Compute and update the number of days
#         if (date_to and date_from):
#             if(date_to.day-date_from.day==0):
#                 self.number_of_days_temp = int(self.duration_temp)/HOURS_PER_DAY
#             else:
#                 self.duration_temp = '8'
#                 self.number_of_days_temp = str((int(self.duration_temp)/HOURS_PER_DAY)*((date_to.day-date_from.day)+1))
#             self.date_from = date_from
#             self.date_to = date_to
#             # super(superHolidays, self)._onchange_date_to(self)
#         else:
#             self.number_of_days_temp = 0
#
#
#             # def convert_string_date(self, floatMinValue, dayAlternateValue):
#     #     timeHourDifference = 5
#     #     minutes = int(round(floatMinValue * 60))
#     #     val = "%02d:%02d" % divmod(minutes, 60)
#     #     todayDateTimeObject = datetime.today()
#     #     val = val.split(':')
#     #     timeObject = todayDateTimeObject.replace(hour=int(val[0]) - timeHourDifference
#     #                                              , minute=int(val[1])
#     #                                              , second=0, microsecond=0
#     #                                              , day=int(dayAlternateValue))
#     #     timeFormattedObject = timeObject.strftime("%Y-%m-%d %H:%M:%S")
#     #
#     #     return timeFormattedObject
#     #
#     # def _get_number_of_days(self, date_from, date_to, employee_id):
#     #     from_dt = fields.Datetime.from_string(date_from)
#     #     to_dt = fields.Datetime.from_string(date_to)
#     #     if employee_id:
#     #         mydict = {
#     #             '0': 'Monday',
#     #             '1': 'Tuesday',
#     #             '2': 'Wednesday',
#     #             '3': 'Thursday',
#     #             '4': 'Friday',
#     #             '5': 'Saturday',
#     #             '6': 'Sunday'}
#     #         today_day = from_dt.strftime("%A")
#     #         checkinDate = from_dt.strftime("%d")
#     #         dayAlternateValue = list(mydict.keys())[list(mydict.values()).index(today_day)]
#     #         contract = self.env['hr.contract'].search([('employee_id', '=', employee_id)], limit=1)
#     #         working_schedule = self.env['resource.calendar.attendance'].search(
#     #             ['&', ('calendar_id', '=', contract.resource_calendar_id.id), ('dayofweek', '=', dayAlternateValue)],
#     #             limit=1)
#     #         if (working_schedule.hour_to and working_schedule.hour_from):
#     #             expectedCheckOutTime = datetime.strptime(self.convert_string_date(working_schedule.hour_to, checkinDate),"%Y-%m-%d %H:%M:%S")
#     #             expectedCheckInTime = datetime.strptime(self.convert_string_date(working_schedule.hour_from, checkinDate),"%Y-%m-%d %H:%M:%S")
#     #         if (working_schedule.break_end and working_schedule.break_start):
#     #             expectedBreakStart = datetime.strptime(self.convert_string_date(working_schedule.break_start
#     #                                                           , checkinDate),"%Y-%m-%d %H:%M:%S")
#     #             expectedBreakEnd =datetime.strptime( self.convert_string_date(working_schedule.break_end,
#     #                                                         checkinDate),"%Y-%m-%d %H:%M:%S")
#     #             worktime=
#     #         if(from_dt.day==to_dt.day):
#     #             if(from_dt.hour<expectedCheckInTime.hour and to_dt.hour<expectedBreakStart.hour):
#     #                 work = to_dt-expectedCheckInTime
#     #             elif(from_dt.hour<=expectedCheckInTime.hour and to_dt.hour>=expectedBreakStart.hour and to_dt.hour<expectedBreakEnd.hour):
#     #                 work =
#     #
#     #
#     #
#     #         employee = self.env['hr.employee'].browse(employee_id)
#     #         val= employee.get_work_days_count(from_dt, to_dt)
#     #         k=7
#     #         return  val
#     #     time_delta = to_dt - from_dt
#     #     return math.ceil(time_delta.days + float(time_delta.seconds) / 86400)
#     # @api.onchange('date_from')
#     # def _onchange_date_from(self):
#     #     date_from = self.date_from
#     #     date_to = self.date_to
#     # # No date_to set so far: automatically compute one 8 hours later
#     #     if date_from and not date_to:
#     #         date_to_with_delta = fields.Datetime.from_string(date_from) + timedelta(hours=HOURS_PER_DAY)
#     #         self.date_to = str(date_to_with_delta)
#     #
#     # # Compute and update the number of days
#     #     if (date_to and date_from) and (date_from <= date_to):
#     #         self.number_of_days_temp = self._get_number_of_days(date_from, date_to, self.employee_id.id)
#     #         super(superHolidays,self)._onchange_date_from(self)
#     #     else:
#     #         self.number_of_days_temp = 0
#     #
#     # @api.onchange('date_to')
#     # def _onchange_date_to(self):
#     #     date_from = self.date_from
#     #     date_to = self.date_to
#     #
#     # # Compute and update the number of days
#     #     if (date_to and date_from) and (date_from <= date_to):
#     #         self.number_of_days_temp = self._get_number_of_days(date_from, date_to, self.employee_id.id)
#     #         # super(superHolidays, self)._onchange_date_to(self)
#     #     else:
#     #         self.number_of_days_temp = 0
#
#
#
#
#
#
#
