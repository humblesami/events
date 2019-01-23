# -*- coding: utf-8 -*-
from datetime import datetime, timedelta

from odoo import models, fields, api, _
from odoo.addons.dn_base import dn_dt
from odoo.exceptions import ValidationError, UserError
from odoo.addons.dn_attendance import workhours
import math
class ScheduleInfo(models.Model):
    _name = "schedule.info"
    expected_check_in = fields.Float(string="Expected CheckIn")
    expected_check_out = fields.Float(string="Expected Checkout")
    break_start = fields.Float(string="Break Start")
    break_end = fields.Float(string="Break End")
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
    request_id = fields.Many2one("attendance.wizard","Request Id")
    attendance_id = fields.Many2one('attendance.daily', ondelete='cascade')
    _sql_constraints = [
        ('attendance_employee_id_punch_time', 'unique(employee_id,punch_time)',
         'Same employee can punch only once at at time'),
    ]

    def find_create_daily_attendance(self, vals):
        req_env = self.env
        employeeName = self.env['hr.employee'].search([('id', '=', vals['employee_id'])]).name
        filters = [('work_date', '=', vals['work_date']), ('employee_id', '=', vals['employee_id'])]
        daily_attendance_model = req_env['attendance.daily']
        daily_attendance_object = daily_attendance_model.search(filters, limit=1)
        prev_attendance_record = False
        next_attendance_record = False
        if daily_attendance_object:
            filters = [('attendance_id', '=', daily_attendance_object.id)]
            next_attendance_record = req_env['attendance.record'].search(
                [('attendance_id', '=', daily_attendance_object.id),
                 ('punch_time', '>', vals['punch_time'])])
            prev_attendance_record = req_env['attendance.record'].search(
                [('attendance_id', '=', daily_attendance_object.id),
                 ('punch_time', '<', vals['punch_time'])])

        else:
            daily_attendance_vals = {'employee_id': vals['employee_id'], 'work_date': vals['work_date'],
                                     'check_in': vals['punch_time']}
            daily_attendance_vals['name'] = vals['work_date'] + '-' + employeeName
            daily_attendance_object = daily_attendance_model.create(daily_attendance_vals)

        vals['punch_type'] = 'check_in'
        if prev_attendance_record and next_attendance_record:
            if prev_attendance_record[-1].punch_type == 'check_in':
                vals['punch_type'] = 'check_out'
            else:
                vals['punch_type'] = 'check_in'
            for data in next_attendance_record:
                if data.punch_type == 'check_in':
                    data.write({'punch_type': 'check_out'})
                else:
                    data.write({'punch_type': 'check_in'})
        elif prev_attendance_record:
            if prev_attendance_record[-1].punch_type == 'check_in':
                vals['punch_type'] = 'check_out'
            else:
                vals['punch_type'] = 'check_in'
        elif next_attendance_record:
            if next_attendance_record[-1].punch_type == 'check_in':
                vals['punch_type'] = 'check_in'
                next_attendance_record[-1].write({'punch_type': 'check_out'})

        vals['attendance_id'] = daily_attendance_object.id
        return vals, daily_attendance_object

    @api.model
    def create(self, vals):
        work_date = dn_dt.strdtTostrdate(vals['punch_time'])
        vals['work_date'] = work_date
        request_id =self.env['attendance.wizard'].search([('work_date','=',work_date)])
        create_uid = self.env['res.users'].search([('id', '=',self._uid )]).login
        if (request_id ):
            vals['request_id'] = request_id.id
        elif(create_uid == 'machine@odoohq.com'):
            a=1
        elif((request_id.id == False)  & (create_uid != 'machine@odoohq.com')):
            raise Warning('You cannot create a record with out a request from user for its review')
        vals, daily_attendance_object = self.find_create_daily_attendance(vals)
        res = super(AttendaceRecord, self).create(vals)
        if daily_attendance_object.processed > 0:
            daily_attendance_object.processed = daily_attendance_object.processed + 1
        return res

    @api.multi
    def write(self, vals):
        for obj in self:
            if vals.get('punch_time'):
                if self.punch_time != vals['punch_time'] and self.punch_time:
                    checkinTime = datetime.strptime(self.punch_time, "%Y-%m-%d %H:%M:%S") + timedelta(hours=5)
                    changedCheckinTime = datetime.strptime(vals['punch_time'], "%Y-%m-%d %H:%M:%S") + timedelta(hours=5)
                    checkinTimeStr = checkinTime.strftime("%Y-%m-%d %H:%M:%S")
                    changedCheckinTimeStr = changedCheckinTime.strftime("%Y-%m-%d %H:%M:%S")
                    attendanceLog_checkin = (" %s has changed the punch_time time of %s from %s to %s" % (
                        self.env.user.display_name, self.employee_id.display_name, checkinTimeStr,
                        changedCheckinTimeStr))
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
        validated_work_hours, late_minutes,expectedWorkMinutes = workhours.calc_work_hours(res, final_schedule)
        # vals = {'work_hours':validated_work_hours, 'late_minutes':late_minutes}
        daily_object.work_hour =validated_work_hours
        daily_object.late_minutes = math.floor(late_minutes)
        daily_object.expected_work_hour = math.floor(expectedWorkMinutes/60)
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


class AttendanceDaily(models.Model):
    _name = "attendance.daily"
    _inherit = ['mail.thread']
    name = fields.Char()
    employee_id = fields.Many2one('hr.employee')
    check_in = fields.Datetime()
    check_out = fields.Datetime()
    work_hour = fields.Float('Total Work Hours')
    late_minutes = fields.Float("Late Minutes")
    work_date = fields.Date(required=True)
    processed = fields.Integer(default=0)
    expected_work_hour = fields.Float("Expected Work Hours")
    attendance_record_ids = fields.One2many('attendance.record', 'attendance_id')
    request_data = fields.Many2one('schedule.info',string="Schedule")
    state = fields.Selection(
        [('draft', 'Draft'), ('confirm', 'In Review'),
         ('done', 'Done')],
        'Status', default='draft')
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
                res,finalScheule=obj.calculate_work_hours(daily_attendance_object)
                if self.request_data.id:
                    # updateSchedule = self.request_data.sudo().write(
                    #     {'expected_check_in': finalScheule.hour_from, 'expected_check_out': finalScheule.hour_to,
                    #      'break_start': finalScheule.break_start, 'break_end': finalScheule.break_end})
                    tempVal = 1

                else:
                    updateSchedule =  self.request_data.sudo().create({'expected_check_in':finalScheule.hour_from,'expected_check_out':finalScheule.hour_to,'break_start':finalScheule.break_start,'break_end':finalScheule.break_end})
                    self.request_data = updateSchedule.id
                updateAttendance = self.sudo().env['hr.attendance'].search(
                    ['&', ('work_date', '=', obj.work_date), ('employee_id', '=', obj.employee_id.id)])
                if updateAttendance.id:
                    updatedAttendanceWrite = updateAttendance.sudo().write(
                        {'worked_hours1': obj.work_hour,
                         'check_in': obj.check_in,
                         'check_out': obj.check_out, 'lateminutes': obj.late_minutes})
        return res

    @api.model
    def create_attendance(self):
        N = 1
        records = self.env['attendance.daily'].search([('processed', '=', 0)], limit=25)
        for values in records:
            tempEmployee = values['employee_id']
            attendanceLength = values.attendance_record_ids._ids.__len__()
            if attendanceLength % 2 == 0:
                finalId = values.attendance_record_ids._ids[attendanceLength - 1]
                attendnaceRecord = self.env['attendance.record'].search([('id', '=', finalId)]).punch_time
                res = values.write({'check_out': attendnaceRecord})
                values.processed = 1
            else:
                finalId = values.attendance_record_ids._ids[attendanceLength - 2]
                attendnaceRecord = self.env['attendance.record'].search([('id', '=', finalId)]).punch_time
                res = values.write({'check_out': attendnaceRecord})
                values.processed = 1
                # schedule_on_day = workhours.on_date_schedule(finalSchedule, work_date)
            finalResult = self.sudo().env['hr.attendance'].create(
                {'worked_hours1': values['work_hour'], 'employee_id': tempEmployee.id,
                 'check_in': values['check_in'], 'work_date': values['work_date'],
                 'check_out': values['check_out'], 'lateminutes': values['late_minutes']})

    def calculate_work_hours(self, daily_object):
        res, final_schedule = self.get_attendance_schedule_of_employee(daily_object)
        validated_work_hours, late_minutes,expectedWorkMinutes = workhours.calc_work_hours(res, final_schedule)
        daily_object.work_hour = validated_work_hours
        daily_object.late_minutes = math.floor(late_minutes)
        daily_object.expected_work_hour = math.floor(expectedWorkMinutes / 60)

        val = res['time_records'][-1].get('check_out')
        if val:
            daily_object.check_out = val

        return res,final_schedule

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




class AttendanceWizard(models.Model):
    _name = "attendance.wizard"

    message = fields.Char(string="Request body")
    work_date = fields.Date()
    employee_id = fields.Many2one("hr.employee")
    # 0
    @api.multi
    def send_request(self):

        self.ensure_one()
        data_id = self._context.get('current_id')
        check_state = self.env['attendance.daily'].search([('id', '=', data_id)])
        if check_state.state == 'confirm':
            wizard_deletion =self.unlink()
            raise Warning(_('This attendance is already in Review'))
        elif check_state.state == False:
            raise Warning(_('This Request was already generated'))
        self.write({"work_date": self._context['work_date'], "employee_id": check_state.employee_id.id})
        modeled = self._context.get('active_model')
        action_id = self.env['ir.model.data'].get_object_reference('dn_attendance', 'action_attendance_daily')
        base_url = self.sudo().env['ir.config_parameter'].get_param('web.base.url')
        email_from = self.env['res.users'].search([('id', '=', self._uid)]).email
        group_hr_admin_id = self.env['ir.model.data'].xmlid_to_res_id(
            'leave_management_custom.group_leave_custom_admin')
        hr_attendance_admin = self.get_users_from_group(group_hr_admin_id)
        url = base_url + "/web#id=%s&view_type=form&model=%s&action=%s" % (str(data_id), modeled, str(action_id[-1]))
        template = self.env.ref('dn_attendance.request_review_template')
        local_context = self.env.context.copy()
        local_context.update({
            'attendance_url': url,
            'message': self.message,
            'emailFrom': email_from,
            'name': self.env['res.users'].search([('id', '=', self._uid)]).name
        })
        for data in hr_attendance_admin:
            local_context.update({
                'emailTo': data
            })
            template.with_context(local_context).send_mail(self.id, force_send=True)


        super(AttendanceDaily, check_state.with_context(mail_create_nolog=True, mail_create_nosubscribe=True)).sudo().write(
            {'state': 'confirm'})

        return {
            'name': 'Message',
            'type': 'ir.actions.act_window_close',
            'view_mode': 'form',
            'res_model': 'attendance.wizard',
            'res.id': check_state.id,
            'target': 'current',
            'context': {'default_name': "Successfully Submitted."}
        }

    @api.multi
    def get_users_from_group(self, group_id):
        users_ids = []
        sql_query = """select uid from res_groups_users_rel where gid = %s"""
        params = (group_id,)
        self.env.cr.execute(sql_query, params)
        results = self.env.cr.fetchall()
        for users_id in results:
            mail_temp = self.env['res.users'].search([('id', '=', users_id[0])]).email
            if not mail_temp == False:
                users_ids.append(mail_temp)
        return users_ids

