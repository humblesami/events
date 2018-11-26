import random

from odoo import models, fields, api

def getContractType(self):
    typ = self.env['hr.contract.type'].search([('name','=','Employee')])
    if(typ.id):
        return typ.id
    else:
        typ = self.env['hr.contract.type'].create({
            'name': 'Employee'
        })
        return typ.id

def generateSchedule(self,employee_id):
    self = self.with_context(current_user = employee_id)
    # self._context['current_user'] =  employee_id
    # ctx  = self._context
    resourceId =self.env['resource.calendar'].search([('name','=','Standard DigitalNet Schedule')]).id
    return  resourceId

def generateContract(self,contractType,scheduleId,employeeId):
    if employeeId.identification_id == False:
        employeeId.identification_id = random.randint(999,10000)
    completeContract = self.env['hr.contract'].create({
        'type_id' : contractType,
        'resource_calendar_id': scheduleId,
        'name' : employeeId.identification_id,
        'employee_id' : employeeId.id,
        'date_start' : fields.date.today(),
        'schedule_pay' : 'monthly',
        'state'  : 'open',
        'wage' : 0
    })
    return  completeContract

class UserView(models.Model):
    _inherits = {'res.users': 'user_id'}
    _inherit = 'dn.user'
    _name = 'e_payroll.users'

    x_is_second_user = fields.Boolean(string="Check User")
    address_id = fields.Many2one(
        'res.partner', 'Work Address')
    work_phone = fields.Char('Work Phone')
    mobile_phone = fields.Char('Work Mobile')
    work_email = fields.Char('Work Email')
    work_location = fields.Char('Work Location')
    # employee in company
    job_id = fields.Many2one('hr.job', 'Job Position')
    device_id = fields.Char(string='Biometric Device ID')
    department_id = fields.Many2one('hr.department', 'Department')
    bio = fields.Html("Bio")
    resume = fields.Binary("Resume")


    @api.model
    def search(self, args, offset=0, limit=0, order=None, count=False):
        if 'user_type' in self._context:
            type = self._context['user_type']
            if type == 'officer':
                args = [('groups_id', '=', self.env.ref("e_pay_roll.custom_group_e_payroll_officer").id)]
            elif type == 'manager':
                args = [('groups_id', '=', self.env.ref("e_pay_roll.custom_group_e_payroll_manager").id)]
            elif type == 'staff':
                args = [('groups_id', '=', self.env.ref("e_pay_roll.custom_group_e_payroll_staff").id)]
            elif type == 'admin':
                args = [('groups_id', '=', self.env.ref("e_pay_roll.custom_group_e_payroll_admin_e").id)]

        user = super(UserView, self).search(args, offset=0, limit=0, order=None, count=False)
        return user

    @api.model
    def create(self, vals):
        if self.env.user.has_group('e_pay_roll.custom_group_e_payroll_admin_e'):
            self = self.sudo()
        if vals.get('send_email') == False:
            self = self.with_context(no_reset_password=True)
        if self.env.user.has_group('e_pay_roll.custom_group_e_payroll_admin_e'):
            self = self.sudo()
        if 'user_type' in self._context:
            group_id=0
            action = self._context
            if 'mp_manager_menu' in self._context:
                group_id = self.env.ref('e_pay_roll.custom_group_e_payroll_manager').id
                vals['groups_id'] = [group_id]
            elif 'mp_officer_menu' in self._context:
                group_id = self.env.ref('e_pay_roll.custom_group_e_payroll_officer').id
                vals['groups_id'] = [group_id]
            elif 'mp_staff_menu' in self._context:
                group_id = self.env.ref('e_pay_roll.custom_group_e_payroll_staff').id
                vals['groups_id'] = [group_id]
            elif 'mp_admin_menu' in self._context:
                group_id = self.env.ref('e_pay_roll.custom_group_e_payroll_admin_e').id
                vals['groups_id'] = [group_id]
            else:
                group_id=self.groups_id

            vals['groups_id']=[group_id]
            # vals['login'] = vals['email']
            employee = super(UserView, self).create(vals)
            employee.user_id.partner_id.user_id = employee.user_id
            alpha = vals['login']
            tempEmployee = self.env['hr.employee'].search([('user_id','=', alpha)])
            if not tempEmployee:
                employeeContract =self.env['hr.employee'].create(
                    {'name': vals['name'], 'user_id': employee.user_id.id, 'work_email':alpha,'device_id':vals['device_id']})
            contractType = getContractType(self)
            scheduleId = generateSchedule(self, employeeContract.id)
            data = generateContract(self, contractType, scheduleId, employeeContract)
        else:
            employee = super(UserView, self).create(vals)
            employee.user_id.partner_id.user_id = employee.user_id
            tempEmployee = self.env['hr.employee'].search([('user_id', '=', vals['login'])])
            employeeContract = tempEmployee
            if not tempEmployee:
                if vals.get('device_id'):
                    employeeContract =  self.sudo().env['hr.employee'].create(
                    {'name': vals['name'],'user_id': employee.user_id.id,'work_email': vals['login'],'device_id':vals['device_id']})
                else:
                    employeeContract = self.sudo().env['hr.employee'].create({'name': vals['name'], 'user_id': employee.user_id.id, 'work_email': vals['login']})
            contractType = getContractType(self)
            scheduleId = generateSchedule(self,employeeContract.id)
            data = generateContract(self,contractType,scheduleId,employeeContract)
        return employee
    @api.multi
    def write(self, vals):
        emp =  super(UserView,self).write(vals)
        employeeWrite = self.env['hr.employee'].search([('user_id','=',self.user_id.id)])
        if vals.get('login'):
            employeeWrite.write({'work_email':vals['login']})
        if vals.get('name'):
            employeeWrite.write({'name':vals['name']})
        if vals.get('device_id'):
            employeeWrite.write({'device_id':vals['device_id']})
        return emp

