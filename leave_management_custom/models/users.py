from odoo import models, fields, api
from odoo import tools, _

# class Employee(models.Model):
#     _inherit = 'hr.employee'
#     _description = 'E-Leave'
#
#     fax = fields.Char(string="Fax")
#     user_id= fields.Many2one('res.users',string="Related User")
#     work_phone= fields.Char(string="Work Phone")
#     mobile_phone = fields.Char(string="Cell Phone")
#
#     department_id = fields.Many2one('hr.department', string='Department')
#     work_location = fields.Char('Work Location')
#     job_id = fields.Many2one('hr.job', string='Job Title')
#
#     @api.model
#     def create(self, vals):
#         employee = super(Employee, self).create(vals)
#         # employee_groups = self.env.ref('base.group_user')
#         # employee_groups.write({'employee': [(4, user.id)]})
#         return employee
#
#     @api.multi
#     def write(self, vals):
#         if 'groups_id' in vals:
#             current_group_ids=vals['groups_id'][0][2]
#             meeting_group_ids = self.env['res.groups'].search([('category_id.name', '=', 'E-Leave')]).ids
#             group_ids=self.user_id.groups_id.ids
#             temp_list=self.difference(meeting_group_ids,current_group_ids)
#             if not current_group_ids:
#                 base_group=self.env['res.groups'].search([('name','=','E-Leave')]).id
#                 temp_list.append(base_group)
#             for i in temp_list:
#                 if i in group_ids:
#                     group_ids=self.difference(group_ids,[i])
#             current_group_ids.extend(group_ids)
#         employee = super(Employee, self).write(vals)
#         return employee
#
#     def difference(self, a, b):
#         b=set(b)
#         return [item for item in a if item not in b]

class LeaveUserView(models.Model):
    _inherits = {'res.users': 'user_id'}
    _inherit = 'dn.user'
    _name = 'e_leave.users'

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
            if type == 'manager':
                args = [('groups_id', '=', self.env.ref("leave_management_custom.group_leave_custom_user_admin").id)]
            elif type == 'admin':
                args = [('groups_id', '=', self.env.ref("leave_management_custom.group_leave_custom_super_user").id)]
            elif type== 'staff':
                args = [('groups_id', '=', self.env.ref("leave_management_custom.group_leave_custom_user").id)]
            elif type == 'superadmin':
                args = [('groups_id', '=', self.env.ref("leave_management_custom.group_leave_custom_admin").id)]

        user = super(LeaveUserView, self).search(args, offset=0, limit=0, order=None, count=False)
        return user

    @api.model
    def create(self, vals):
        if self.env.user.has_group('leave_management_custom.group_leave_custom_admin'):
            self = self.sudo()
        if vals.get('send_email') == False:
            self = self.with_context(no_reset_password=True)
        if self.env.user.has_group('leave_management_custom.group_leave_custom_admin'):
            self = self.sudo()
        if 'user_type' in self._context:
            group_id=0
            if 'lv_manager_menu' in self._context:
                group_id=self.env.ref("leave_management_custom.group_leave_custom_super_user").id
                vals['groups_id'] = [group_id]
            elif 'lv_officer_menu' in self._context:
                group_id = self.env.ref("leave_management_custom.group_leave_custom_user_admin").id
                vals['groups_id'] = [group_id]
            elif 'lv_staff_menu' in self._context:
                group_id = self.env.ref("leave_management_custom.group_leave_custom_user").id
                vals['groups_id'] = [group_id]
            elif 'lv_admin_menu' in self._context:
                group_id = self.env.ref("leave_management_custom.group_leave_custom_admin").id
                vals['groups_id'] = [group_id]

            else:
                group_id=self.groups_id

            vals['groups_id']=[group_id]
            employee = super(LeaveUserView, self).create(vals)
            employee.user_id.partner_id.user_id = employee.user_id
            searchEmployee = self.env['hr.employee'].search([('user_id','=',vals['login'])])
            if not searchEmployee:
                self.sudo().env['hr.employee'].create(
                    {'name': vals['name'], 'work_email': vals['login'], 'user_id': employee.user_id.id,'device_id':vals['device_id']})
            return employee
        else:
            employee = super(LeaveUserView, self).create(vals)
            employee.user_id.partner_id.user_id = employee.user_id
            searchEmployee = self.env['hr.employee'].search([('user_id', '=', vals['login'])])
            if not searchEmployee:
                if vals.get('device_id'):
                    self.sudo().env['hr.employee'].create(
                        {'name': vals['name'], 'user_id': employee.user_id.id, 'work_email': vals['login'],
                         'device_id': vals['device_id']})
                else:
                    self.sudo().env['hr.employee'].create(
                        {'name': vals['name'], 'user_id': employee.user_id.id, 'work_email': vals['login']})

            return employee

    @api.multi
    def write(self, vals):
        emp = super(LeaveUserView,self).write(vals)
        updateEmploye = self.env['hr.employee'].search([('user_id', '=', self.user_id.id)])
        if vals.get('login'):
            updateEmploye.write({'work_email':vals['login']})
        if vals.get('name'):
            updateEmploye.write({'name':vals['name']})
        if vals.get('device_id'):
            updateEmploye.write({'device_id':vals['device_id']})

        return emp
