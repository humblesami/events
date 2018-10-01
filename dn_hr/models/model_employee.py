# -*- coding: utf-8 -*-
import string
import random
from odoo import tools, _
from odoo import models, fields, api
from odoo.addons.dn_base import dn_dt
from odoo.exceptions import Warning as UserWarning, ValidationError


class Employee(models.Model):
    _inherit = 'hr.employee'
    _description = 'Employee'

    nick_name = fields.Char(string="Nick")
    website = fields.Char(string="Website")
    fax = fields.Char(string="Fax")
    send_email = fields.Boolean(string="Send Email")
    bio = fields.Html(string="Bio")
    resume = fields.Binary(string="Resume")
    groups_id = fields.Many2many('res.groups', string='Related Groups')
    device_id = fields.Char(string='Biometric Device ID')
    contract_id = fields.Many2one('hr.contract')

    _sql_constraints = [
        ('identification_id_unique', 'unique(identification_id)',
         'The Employee code must be unique'),
        ('punch_device_id_unique', 'unique(device_id)',
         'The employee number must be unique.'),
    ]

    @api.onchange('department_id')
    def filter_designation(self):
        tempDesignation = self.env['hr.job'].search([])
        if(self.department_id):
            tempDesignation =self.env['hr.job'].search([('department_id','=',self.department_id.id)])
        return {'domain':{'job_id':[('id','in',tempDesignation._ids)]}}
    @api.model
    def _generate_identification_id(self):
        """Generate a random employee identification number"""
        company = self.env.user.company_id
        employee_id = False
        if company.employee_id_gen_method == 'sequence':
            employee_id = company.employee_id_sequence.next_by_id()
        elif company.employee_id_gen_method == 'random':
            employee_id_random_digits = company.employee_id_random_digits
            tries = 0
            max_tries = 50
            while tries < max_tries:
                rnd = random.SystemRandom()
                employee_id = ''.join(rnd.choice(string.digits)
                                      for _ in
                                      xrange(employee_id_random_digits))
                if not self.search_count([('identification_id',
                                           '=',
                                           employee_id)]):
                    break
                tries += 1
            if tries == max_tries:
                raise UserWarning(_('Unable to generate an Employee ID number that \
                is unique.'))
        return employee_id



    @api.onchange('user_id')
    def _onchange_user(self):
        if self.user_id:
            self.update(self._sync_user(self.user_id))

    def _sync_user(self, user):
        return dict(
            name=user.name,
            image=user.image,
            work_email=user.email,
            groups_id = user.groups_id
        )


    @api.model
    def create(self, vals):
        if not vals.get('identification_id'):
            vals['identification_id'] = self._generate_identification_id()
        if not vals.get('user_id'):
            if vals.get('work_email'):
                user_id = self.sudo().env['res.users'].create({'name': vals['name'], 'login': vals['work_email'],'email': vals['work_email']})
                vals['user_id'] = user_id.id
                tools.image_resize_images(vals)
                if user_id.groups_id:
                    user_id.groups_id = False
                    employee_groups = self.env.ref('base.group_user')
                    user_id.write({'groups_id': [(4, employee_groups.id)]})
                    employee_groups.write({'implied_ids': [(4, user_id.id)]})
            else:
                vals['name'] = 'test'
        return super(Employee, self).create(vals)

    @api.multi
    def write(self, vals):
        if self.user_id.id:
            vals['work_email'] = self.user_id.login
            self.user_id.partner_id.email = self.user_id.login
            if 'groups_id' in vals:
                current_group_ids = vals['groups_id'][0][2]
            else:
                current_group_ids = self.user_id.groups_id.ids
            meeting_group_ids = self.env['res.groups'].search([('category_id.name', '=', 'E-Leave')]).ids
            group_ids=self.user_id.groups_id._ids
            temp_list=self.difference(meeting_group_ids,current_group_ids)
            if not current_group_ids:
                base_group=self.env['res.groups'].search([('name','=','E-Leave')]).id
                temp_list.append(base_group)
            for i in temp_list:
                if i in group_ids:
                    group_ids=self.difference(group_ids,[i])
            current_group_ids.extend(group_ids)
            current_group_ids=set(current_group_ids)
            user = self.sudo().env['res.users'].search([('id', '=', self.user_id.id)])
            super(Employee, self).write({'groups_id':current_group_ids})
            if 'groups_id' in vals:
                user.write({'groups_id':vals['groups_id']})
            vals['groups_id'] = current_group_ids
            employee = super(Employee, self).write(vals)
        else:
            employee = super(Employee, self).write(vals)
        return employee

    def difference(self, a, b):
        b=set(b)
        return [item for item in a if item not in b]

    @api.multi
    def unlink(self):
        if(self.user_id.id):
            user = self.sudo().env['res.users'].search([('id', '=', self.user_id.id)])
            user.env['ir.actions.actions'].clear_caches()
            user = self.sudo().env['res.users'].search([('id', '=', self.user_id.id)]).unlink()
        resources = self.mapped('resource_id')
        super(Employee, self).unlink()
        return resources.unlink()

    def get_active_schedule(self, work_date, employee_id):
        day = dn_dt.dayOfweek(work_date)
        day_number = dn_dt.downumber(day)

        contract = self.env['hr.contract'].sudo().search([('employee_id', '=', employee_id.id),('state', '=', 'open')], limit=1,
                                                         order='__last_update desc')
        if not contract:
            raise ValidationError('No Running Contract defined for' + employee_id.name)
        filters = [('calendar_id', '=', contract.resource_calendar_id.id), ('dayofweek', '=', day_number)]
        schedules = self.env['resource.calendar.attendance'].sudo().search(filters, order='__last_update desc')
        if not schedules:
            raise ValidationError('No schedule defined for'+employee_id.name+ 'for day '+day)
        final_schedule = False
        if len(schedules) > 1:
            for obj in schedules:
                if (obj.date_from):
                    if (work_date >= obj.date_from and work_date <= obj.date_to):
                        final_schedule = obj
                        break
                    else:
                        pass
                else:
                    final_schedule = obj
        else:
            final_schedule = schedules
        return final_schedule

    def on_date_schedule(schedule, work_date):
        schedule_on_day = {}

        schedule_on_day['check_in'] = work_date + ' ' + dn_dt.decimal2time(schedule.work_from) + ':00'
        schedule_on_day['break_start'] = work_date + ' ' + dn_dt.decimal2time(schedule.break_start) + ':00'
        schedule_on_day['break_end'] = work_date + ' ' + dn_dt.decimal2time(schedule.break_end) + ':00'
        schedule_on_day['check_out'] = work_date + ' ' + dn_dt.decimal2time(schedule.work_to) + ':00'
        return schedule_on_day



