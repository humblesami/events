# -*- coding: utf-8 -*-

from odoo import api, exceptions, fields, models
import datetime


def get_years():
    year_list = []
    for i in range(2016, 2050):
        year_list.append((i, str(i)))
    return year_list


class bulkLeavesAllocation(models.Model):
    _name = 'hr.allocate_holiday'
    holiday_status_id = fields.Many2one("hr.holidays.status", string="Leave Type", required=True)
    type = fields.Selection([
        ('add', 'Allocation Request')
    ], string='Request Type', required=True, readonly=True, default='add',
        help="Choose 'Allocation Request' if you want to increase the number of leaves available for someone")
    employee_ids = fields.Many2many('hr.employee', string='Impacted Employees',
                                    required=True, ondelete='cascade')
    company_ids = fields.Many2many('res.company', string='Companies')
    department_ids = fields.Many2many('hr.department', string='Departments')
    fields.Many2many('hr')
    number_of_days = fields.Float('Number of Days', store=True)
    year = fields.Selection(get_years(), string='Year', default=datetime.datetime.now().year)
    state = fields.Selection([
        ('draft', 'Draft'),
        ('done', 'Done'),
    ], default='draft')

    @api.onchange('company_ids', 'department_ids')
    def _onchange_function(self):
        domain = []
        if self.company_ids:
            domain.append(('company_id', 'in', self.company_ids.ids))
        if self.department_ids:
            domain.append(('department_id', 'in', self.department_ids.ids))
        if domain:
            employees = self.env['hr.employee'].search(domain)

            self.employee_ids = employees.ids
        else:
            self.employee_ids = False

    @api.multi
    def allocate_leaves(self):
        """
        This method will create a leave for all selected employees
        """
        self.ensure_one()

        self.allocate_employee_leaves(self.employee_ids)
        self.state = 'done'

    @api.multi
    def allocate_employee_leaves(self, employee_ids):

        self.ensure_one()

        HRHolidays = self.env['hr.holidays']

        if not self.holiday_status_id:
            raise exceptions.ValidationError(
                'No Leave Type has been configured')

        values = {
            'type': 'add',
            'holiday_type': 'employee',
            'holiday_status_id': self.holiday_status_id.id,
            'number_of_days_temp': self.number_of_days,
            'auto_approve': 'True',
            'state': 'confirm',
            'year': self.year,
            'is_batch': True,
        }

        context = {
            'mail_create_nosubscribe': True,
            'mail_create_nolog': True,
            'mail_notrack': True,
            'tracking_disable': True
        }

        # add the employee in case we generate for newcomers
        self.employee_ids += employee_ids

        for employee in employee_ids:
            values['employee_id'] = employee.id
            try:
                leave = HRHolidays.sudo().with_context(context).create(values)
                leave.with_context(context).action_validate()
            except exceptions.ValidationError as e:
                raise exceptions.ValidationError(
                    'The leave entries could not be generated as the '
                    'following error occurred:\n\n%s: %s'
                    % (employee.name, e.name))

    @api.multi
    def remove_allocation(self):
        """
        This method will remove the leave and its related
        analytic entries for all impacted employees
        """
        self.ensure_one()

        if self.state != 'done':
            raise exceptions.ValidationError('You can only delete a allocated leave '
                                             '"done"')

        holiday_ids = self.env['hr.holidays'].search(
            [('holiday_status_id', '=', self.holiday_status_id.id),
             ('year', '=', self.year),
             ('number_of_days', '=', self.number_of_days),
             ('employee_id', 'in', self.employee_ids.ids)])

        if self.env.user.has_group('base.group_system') \
                or self.env.user.has_group('hr.group_hr_manager'):
            holiday_ids.sudo().write({'state': 'draft'})
            holiday_ids.sudo().unlink()
        else:
            raise exceptions.ValidationError(
                'You do not have the rights to delete leave entries')

        self.state = 'draft'


class holidayStatus(models.Model):
    _inherit = "hr.holidays.status"

    @api.multi
    def get_days(self, employee_id):
        # need to use `dict` constructor to create a dict per id
        result = dict(
            (id, dict(max_leaves=0, leaves_taken=0, remaining_leaves=0, virtual_remaining_leaves=0)) for id in self.ids)

        holidays = self.env['hr.holidays'].search([
            ('employee_id', '=', employee_id),
            ('state', 'in', ['confirm', 'validate1', 'validate']),
            ('year', '=', str(datetime.datetime.now().year)),
            ('holiday_status_id', 'in', self.ids)
        ])

        for holiday in holidays:
            status_dict = result[holiday.holiday_status_id.id]
            if holiday.type == 'add':
                if holiday.state == 'validate':
                    # note: add only validated allocation even for the virtual
                    # count; otherwise pending then refused allocation allow
                    # the employee to create more leaves than possible
                    status_dict['virtual_remaining_leaves'] += holiday.number_of_days_temp
                    status_dict['max_leaves'] += holiday.number_of_days_temp
                    status_dict['remaining_leaves'] += holiday.number_of_days_temp
            elif holiday.type == 'remove':  # number of days is negative
                status_dict['virtual_remaining_leaves'] -= holiday.number_of_days_temp
                if holiday.state == 'validate':
                    status_dict['leaves_taken'] += holiday.number_of_days_temp
                    status_dict['remaining_leaves'] -= holiday.number_of_days_temp
        return result
