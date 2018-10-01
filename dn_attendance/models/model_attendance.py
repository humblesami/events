# -*- coding: utf-8 -*-
from datetime import datetime, timedelta

from odoo import models, fields, api
from odoo.addons.dn_base import dn_dt
from odoo.exceptions import ValidationError
from odoo.addons.dn_attendance import workhours

class AttendaceRecord(models.Model):
    _name = 'attendance.record'
    _rec_name = 'employee_id'
    employee_id = fields.Many2one("hr.employee", required=True)
    punch_time = fields.Datetime(required=True)
    punch_type = fields.Selection([
        ('check_in', 'check_in'),
        ('check_out', 'check_out')
        ])
    work_date = fields.Date()
    attendance_id = fields.Many2one('attendance.daily', ondelete='cascade')
    _sql_constraints = [
        ('attendance_employee_id_punch_time', 'unique(employee_id,punch_time)',
         'Same employee can punch only once at at time'),
    ]

    def find_create_daily_attendance(self, vals):
        req_env = self.env
        employeeName = self.env['hr.employee'].search([('id','=',vals['employee_id'])]).name
        filters = [('work_date', '=', vals['work_date']), ('employee_id', '=', vals['employee_id'])]
        daily_attendance_model = req_env['attendance.daily']
        daily_attendance_object = daily_attendance_model.search(filters, limit=1)
        prev_attendance_record = False
        if daily_attendance_object:
            filters = [('attendance_id', '=', daily_attendance_object.id)]
            prev_attendance_record = req_env['attendance.record'].search(filters, limit=1)
        else:
            daily_attendance_vals = {'employee_id': vals['employee_id'], 'work_date': vals['work_date'],'check_in':vals['punch_time']}
            daily_attendance_vals['name'] = vals['work_date'] + '-'+employeeName
            daily_attendance_object = daily_attendance_model.create(daily_attendance_vals)

        vals['punch_type'] = 'check_in'
        if prev_attendance_record:
            if prev_attendance_record.punch_type == 'check_in':
                vals['punch_type'] = 'check_out'
            else:
                vals['punch_type'] = 'check_in'

        vals['attendance_id'] = daily_attendance_object.id
        return vals, daily_attendance_object

    @api.model
    def create(self, vals):
        work_date = dn_dt.strdtTostrdate(vals['punch_time'])
        vals['work_date'] = work_date
        vals, daily_attendance_object = self.find_create_daily_attendance(vals)
        res = super(AttendaceRecord, self).create(vals)
        if daily_attendance_object.processed > 0:
            daily_attendance_object.processed = daily_attendance_object.processed+1
        return res

    @api.multi
    def write(self, vals):
        for obj in self:
            if self.punch_time != vals['punch_time'] and self.punch_time:
                checkinTime = datetime.strptime(self.punch_time, "%Y-%m-%d %H:%M:%S") + timedelta(hours=5)
                changedCheckinTime = datetime.strptime(vals['punch_time'], "%Y-%m-%d %H:%M:%S") + timedelta(hours=5)
                checkinTimeStr = checkinTime.strftime("%Y-%m-%d %H:%M:%S")
                changedCheckinTimeStr = changedCheckinTime.strftime("%Y-%m-%d %H:%M:%S")
                attendanceLog_checkin = (" %s has changed the punch_time time of %s from %s to %s" % (
                                self.env.user.display_name, self.employee_id.display_name, checkinTimeStr, changedCheckinTimeStr))
                self.env['attendance.log'].create(
                    {'changeInAttendance': attendanceLog_checkin, 'employee_id': self.employee_id.id})
            res = super(AttendaceRecord, obj).write(vals)
            daily_attendance_object = obj.attendance_id
            if vals.get('employee_id') or vals.get('work_date'):
                raise ValidationError("Only time records are allowed to be modified")
            if daily_attendance_object.processed > 0:
                daily_attendance_object.processed = daily_attendance_object.processed + 1
        return res

    def calculate_work_hours(self, daily_object):
        res, final_schedule = self.get_attendance_schedule_of_employee(daily_object)
        validated_work_hours, late_minutes = workhours.calc_work_hours(res, final_schedule)
        #vals = {'work_hours':validated_work_hours, 'late_minutes':late_minutes}
        daily_object.work_hour = validated_work_hours
        daily_object.late_minutes = late_minutes
        return res

    def get_attendance_schedule_of_employee(self, daily_object):
        objects = self.env['attendance.record'].search([('attendance_id', '=', daily_object.id)], order='punch_time')
        i = 0
        records = []
        check_in = False
        for obj in objects:
            if i == 0:
                check_in = obj['punch_time']
                i = 1
            else:
                records.append({'check_in' : check_in, 'check_out': obj['punch_time']})
                i = 0
        res = {'employee_id' : daily_object.employee_id, 'work_date' : daily_object.work_date,'time_records' : records}
        final_schedule = self.env['hr.employee'].get_active_schedule(daily_object.work_date,daily_object.employee_id)
        return res, final_schedule

    def get_entries_all_employees_one_day(self, work_date):
        objects = self.env['daily.attendance'].search([('work_date', '=', work_date)])
        for obj in objects:
            self.calculate_work_hours(obj)
        return True

class AttendanceDaily(models.Model):
    _name = "attendance.daily"
    name = fields.Char()
    employee_id = fields.Many2one('hr.employee')
    check_in = fields.Datetime()
    check_out = fields.Datetime()
    work_hour = fields.Float('Total Work Hour')
    late_minutes = fields.Float("Late Minutes")
    work_date = fields.Date(required=True)
    processed = fields.Integer(default=0)
    attendance_record_ids = fields.One2many('attendance.record', 'attendance_id')
    _sql_constraints = [
        ('attendance_employee_id_work_date', 'unique(employee_id,work_date)',
         'The employee can have only one attendance record per day.'),
    ]



    @api.multi
    def write(self, vals):
        calc = True
        for obj in self:
            for key in vals:
                if key != 'processed':
                    calc = False
            res = super(AttendanceDaily, obj).write(vals)
            daily_attendance_object = obj
            if vals.get('employee_id') or vals.get('work_date'):
                raise ValidationError("Only time records are allowed to be modified")
            if calc:
                obj.calculate_work_hours(daily_attendance_object)
                updateAttendance = self.sudo().env['hr.attendance'].search(['&',('work_date','=',obj.work_date),('employee_id','=',obj.employee_id.id)])
                if updateAttendance.id:
                    updatedAttendanceWrite = updateAttendance.sudo().write(
                        {'worked_hours1': obj.work_hour,
                         'check_in': obj.check_in,
                         'check_out':obj.check_out, 'lateminutes': obj.late_minutes})
        return res

    @api.model
    def create_attendance(self):
        N = 1
        date_N_days_ago = datetime.now() - timedelta(days=N)
        date_N_days_ago = date_N_days_ago.date()
        # '&', ('work_date', '=', date_N_days_ago),
        records = self.env['attendance.daily'].search([('processed','=',0)])
        for values in records:
            tempEmployee = values['employee_id']
            attendanceLength = values.attendance_record_ids._ids.__len__()
            if attendanceLength%2 == 0:
                finalId = values.attendance_record_ids._ids[attendanceLength-1]
                attendnaceRecord = self.env['attendance.record'].search([('id', '=', finalId)]).punch_time
                res = values.write({'check_out': attendnaceRecord})
                values.processed = 1
            else:
                finalId = values.attendance_record_ids._ids[attendanceLength - 2]
                attendnaceRecord = self.env['attendance.record'].search([('id','=',finalId)]).punch_time
                res = values.write({'check_out': attendnaceRecord})
                values.processed = 1
            finalResult = self.sudo().env['hr.attendance'].create(
                       {'worked_hours1': values['work_hour'], 'employee_id': tempEmployee.id,
                          'check_in': values['check_in'], 'work_date': values['work_date'],
                          'check_out': values['check_out'], 'lateminutes': values['late_minutes']})

    def calculate_work_hours(self, daily_object):
        res, final_schedule = self.get_attendance_schedule_of_employee(daily_object)
        validated_work_hours, late_minutes = workhours.calc_work_hours(res, final_schedule)

        daily_object.work_hour = validated_work_hours
        daily_object.late_minutes = late_minutes
        return res

    def get_attendance_schedule_of_employee(self, daily_object):
        objects = self.env['attendance.record'].search([('attendance_id', '=', daily_object.id)], order='punch_time')
        i = 0
        records = []
        check_in = False
        for obj in objects:
            if i == 0:
                check_in = obj['punch_time']
                i = 1
            else:
                records.append({'check_in': check_in, 'check_out': obj['punch_time']})
                i = 0
        res = {'employee_id': daily_object.employee_id, 'work_date': daily_object.work_date, 'time_records': records}
        final_schedule = self.env['hr.employee'].get_active_schedule(daily_object.work_date, daily_object.employee_id)
        return res, final_schedule

    def get_entries_all_employees_one_day(self, work_date):
        objects = self.env['daily.attendance'].search([('work_date', '=', work_date)])
        for obj in objects:
            self.calculate_work_hours(obj)
        return True