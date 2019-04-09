import werkzeug

from odoo import http
from odoo.addons.dn_base import dn_dt
from odoo.addons.dn_base import ws_methods


class Attendance(http.Controller):

    @http.route('/upload-attendance', type="http", auth='public', csrf=False, cors='*')
    def userAttendance_http(self, **kw):
        try:
            input_data = kw['input_data']
            import json
            input_data = json.loads(input_data)
            return self.userAttendance(input_data)
        except:
            return ws_methods.handle()

    @http.route('/upload-attendance-json', type="json", auth='public', csrf=False, cors='*')
    def userAttendance_json(self, **kw):
        try:
            reqBody = http.request.jsonrequest
            return self.userAttendance(reqBody)
        except:
            return ws_methods.handle()

    def userAttendance(self, vals):
        cursor = http.request.cr
        try:
            if 'token' in vals:
                uid = ws_methods.check_auth(vals)
            else:
                uid = http.request.session.authenticate(vals['db'], vals['login'], vals['password'])
            if not uid:
                ws_methods.http_response('Not logged in')
            if 'data' in vals:
                reqBody = vals['data']
            # if vals['login'] == 'machine@odoohq.com':
            #     req_env = http.request.env
            req_env = http.request.env
            cursor.autocommit(False)
            for tr in enumerate(reqBody):
                rec = tr[1]
                time_record = dn_dt.strTodt(rec['DateTimeRecord'])
                time_record = dn_dt.addInterval(time_record, 'h' , -5)
                time_record_str = dn_dt.dtTostr(time_record)

                employee = req_env['hr.employee'].sudo().search([('device_id', '=', rec['PersonId'])])
                if not employee:
                    employee = req_env['hr.employee'].sudo().create({'name': 'emp-'+str(rec['PersonId']), 'device_id': rec['PersonId']})
                work_date = dn_dt.dtTodatestr(time_record)
                vals = {'punch_time': time_record_str, 'employee_id': employee.id, 'work_date': work_date}
                employeeCheck   =  req_env['attendance.record'].sudo().search(
                    ['&', ('punch_time', '=', time_record_str), ('employee_id', '=', employee.id),
                     ('work_date', '=', work_date)])
                if employeeCheck.id:
                    continue
                else:
                    res = req_env['attendance.record'].sudo().create(vals)
            cursor.commit()
            return ws_methods.http_response('', {'message': 'success'})
        except:
            cursor.rollback()
            return ws_methods.handle()

    def get_work_date(self, dt, day_start_time):
        #day_start_time = '07:00:00'
        day_start_dt = dn_dt.embedTime(dt, day_start_time)
        if dt < day_start_dt:
            dt = dn_dt.addInterval('d', -1)
        date_str = dn_dt.dtTodatestr(dt)
        return date_str

    @http.route('/testvalues', type="http", auth='public', csrf=False, cors='*')
    def change_namedd(self, **kw):
        try:
            return werkzeug.utils.redirect('/testvalues1')
            work_date = '2018-08-06'
            employee_id = '1'
            timerecords = [{'check_in':'2018-08-06 08:32:03', 'check_out':'2018-08-06 10:32:03'},
                            {'check_in':'2018-08-06 11:32:03', 'check_out':'2018-08-06 15:32:03'},
                            {'check_in':'2018-08-06 17:32:03', 'check_out':'2018-08-06 19:32:03'},
                            {'check_in':'2018-08-06 19:52:03','check_out':False}]
            attendanceId = 6
            vals = http.request.env['hr.attendance'].sudo().create({'employee_id':employee_id,'check_in':timerecords[0]['check_in']})
            return 'hello'
            LengthofRecords = timerecords.__len__()
            if LengthofRecords > 0:
                tempCheckIn =timerecords[0]['check_in']
                if timerecords[LengthofRecords-1]['check_out'] == False:
                    tempCheckOut  = timerecords[LengthofRecords-2]['check_out']
                else:
                    tempCheckOut = timerecords[LengthofRecords - 1]['check_out']
                reqEnv = http.request.env
                workHours,lateminutes= self.calc_work(work_date, int(employee_id), timerecords)
                lateminutes = float(lateminutes)/3600
                workHours = float(workHours)/3600
                daily_attendance_model = reqEnv['attendance.daily']
                if workHours > 0:
                    reqEnv = http.request.env
                    dailyAttendance = reqEnv['attendance.daily'].sudo().search([('id', '=', attendanceId)], limit=1)
                    alpha = dailyAttendance.sudo().write({ 'work_date': work_date,'lateMinutes':lateminutes,'check_out':tempCheckOut,'work_hour':workHours})
                    return work_date
                else:
                    return work_date
        except:
            return  ws_methods.handle()


    @http.route('/testvalues1', type="http", auth='public', csrf=False, cors='*')
    def change_namedd1(self, **kw):
        try:
            return "HEllo"
        except:
            return  ws_methods.handle()