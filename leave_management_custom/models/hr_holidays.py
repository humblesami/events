import logging
from datetime import datetime

import numpy as np
from dateutil import relativedelta

from odoo import api, fields, models
from odoo.exceptions import UserError

_logger = logging.getLogger(__name__)
#
#

HOURS_PER_DAY = 8
class Holidays(models.Model):
    _inherit = "hr.holidays"

    date_only_from = fields.Date('Start Date', readonly=True, index=True, copy=False,
                                states={'draft': [('readonly', False)], 'confirm': [('readonly', False)]},
                                track_visibility='onchange')
    date_only_to = fields.Date('End Date', readonly=True, copy=False,
                              states={'draft': [('readonly', False)], 'confirm': [('readonly', False)]},
                              track_visibility='onchange')
    duration_temp = fields.Selection([('2','Quarter Day'),('4','Half Day'),('8','Full Day')],default='8')
    auto_approve = fields.Boolean(string="Admin Approval", default="False")

    @api.onchange('date_only_from','date_only_to','duration_temp','date_from','date_to')
    def _onchange_duration_to(self):
        date_from = False
        if(self.date_only_from):
            date_from = datetime.strptime(self.date_only_from, "%Y-%m-%d")
        date_to =False
        if(self.date_only_to):
            date_to = datetime.strptime(self.date_only_to, "%Y-%m-%d")

        # Compute and update the number of days
        if (date_to and date_from):
            self.date_from = date_from
            self.date_to = date_to
            tempValue = 0
            if(date_to.day-date_from.day==0 and date_to.month-date_from.month==0):
                tempValue = int(self.duration_temp)/HOURS_PER_DAY
            else:
                self.duration_temp = '8'
                days = int(np.busday_count(date_from, date_to))
                tempValue = float((int(self.duration_temp)/HOURS_PER_DAY)*(days+1))

            self.number_of_days_temp = tempValue

            # super(superHolidays, self)._onchange_date_to(self)
        else:
            self.number_of_days_temp = 0


    def _default_approver(self):
        action_list=[]
        action = self._context
        if 'params' in action:
            current_action_id = action['params']['action']
            action_id1 = self.env.ref('leave_management_custom.custom_open_ask_holidays').id
            action_id2 = self.env.ref('leave_management_custom.custom_open_allocation_holidays').id
            action_list.append(action_id1)
            action_list.append(action_id2)
            if current_action_id in action_list:
                current_user = self.env.user
                model_id = self.env['ir.model'].search([('model', '=', 'hr.holidays')]).id
                for g in current_user.groups_id:
                    rule_id = self.env['custom_leave_management.rule_authorization'].search(
                        [('model_id', '=', model_id), ('group_id', '=', g.id)]).rule_id.id
                    if rule_id:
                        obj = self.env['custom_leave_management.approval_rules'].search([('id', '=', rule_id)], limit=1)
                        if obj.approver_ids:
                            val = obj.approver_ids[0].group_id
                            return obj.approver_ids[0].group_id.id

    pending_approver = fields.Many2one('res.groups', string="Pending Approver", readonly=True,
                                       default=_default_approver)
    current_user_is_approver = fields.Boolean(string='Current user is approver',
                                              compute='_compute_current_user_is_approver')
    approbation = fields.One2many('custom_leave_management.approbation', 'leave', string="Approbation")
    approval_rule = fields.Many2one('custom_leave_management.approval_rules', string="Approval Rule")
    secondary_user = fields.Boolean(string="Check User")

    @api.one
    @api.depends('pending_approver')
    def _compute_current_user_is_approver(self):
        currentGroup = self.env.user.groups_id
        approvers_list=[]
        model_id = self.env['ir.model'].search([('model', '=', 'hr.holidays')]).id
        for g in currentGroup:
            if self.pending_approver == g:
                self.current_user_is_approver = True
                return
            else:
                self.current_user_is_approver = False



    @api.multi
    def action_approve(self):
        for leave in self:
            currentGroup = self.env.user.groups_id
            # change for email sending on approval of mail.
            template = self.env.ref('leave_management_custom.approval_email')
            self.env['mail.template'].browse(template.id).send_mail(self.id, force_send=True)
            if leave.pending_approver in currentGroup:
                user = False
                if user:
                    now = fields.datetime.utcnow()
                    createDate = datetime.strptime(self.create_date, '%Y-%m-%d %H:%M:%S')

                    updateDate = datetime.strptime(self.write_date, '%Y-%m-%d %H:%M:%S')
                    if updateDate > createDate:
                        start = updateDate
                    else:
                        start = createDate
                    #end = datetime.datetime.strptime(now, '%Y-%m-%d %H:%M:%S')
                    diff = relativedelta(now, start)
                    hours = diff.hours
                    days = diff.days
                    mints = diff.minutes
                    if mints <= 5:
                        raise UserError(("You will be authorized after 1 minute"))
                is_last_approbation = False
                sequence = 0
                next_approver = None
                for approver in leave.approval_rule.approver_ids:
                    sequence = sequence + 1
                    if leave.pending_approver.id == approver.group_id.id:
                        if sequence == len(leave.approval_rule.approver_ids):
                            is_last_approbation = True
                        else:
                            next_approver = leave.approval_rule.approver_ids[sequence].group_id
                if is_last_approbation:
                    super(Holidays, self).action_approve()
                    leave.action_myvalidate()
                else:
                    leave.write({'pending_approver': next_approver.id})
                    # users = self.pending_approver.users
                    # for user in users:
                    #     menuId = self.env['ir.ui.menu'].search([('name', '=', 'Quatation')], limit=1)
                    #     actionId = self.env['ir.actions.act_window'].search([('name', '=', 'Quotations')],
                    #                                                         limit=1)
                    #     self = self.with_context(dbname=self._cr.dbname, action_id=actionId.id, menu_id=menuId.id,
                    #                              val=user.name, val2=user.email)
                    #     temp = self.env.ref('custom_leave_management.leave_order_template')
                    #     if temp:
                    #         temp.sudo().with_context().send_mail(self.id, force_send=True)
                    self.env['custom_leave_management.approbation'].create(
                        {'leave': leave.id, 'approver': self.env.uid, 'sequence': sequence,
                         'date': fields.Datetime.now(), 'state': 'approved'})

            else:
                raise UserError(("You are now unauthorized to perform this action"))
            return True

    @api.multi
    def action_myvalidate(self):
        self.write({'pending_approver': None})
        for leave in self:
            self.env['custom_leave_management.approbation'].create(
                {'leave': leave.id, 'approver': self.env.uid, 'date': fields.Datetime.now(),
                 'state': 'approved'})

    # created a wizard by zartash (20-03-2018)
    @api.multi
    def action_refuse(self):
        for leave in self:
            currentGroup = self.env.user.groups_id
            # val =self.env['res.users'].browse(self._uid)
            # self.email = val.email
            template = self.env.ref('leave_management_custom.refusal_email')
            self.env['mail.template'].browse(template.id).send_mail(self.id,force_send=True)

            if leave.pending_approver in currentGroup:
                super(Holidays, self).action_refuse()
                leave.write({'pending_approver': None})
                val = self.env['custom_leave_management.approbation'].create(
                    {'leave': leave.id, 'approver': self.env.uid, 'sequence': 3,
                     'date': fields.Datetime.now(), 'state': 'rejected'})
                return  {

                    'name': 'Purchase Wizard ',
                    'res_model': 'custom_leave_management.approbation',
                    'res_id': val.id,
                    'view_mode': 'form',
                    'target': 'current',
                    'type': 'ir.actions.act_window',
                    # ir.actions.act_window_close
                    'context': {'form_view_initial_mode': 'edit', 'force_detailed_view': 'true'},


                }


            else:
                raise UserError(("You are now unauthorized to perform this action"))

    # refusal action for leave cancellation request
    @api.multi
    def action_refuse_admin(self):
        for leave in self:
            flag = 0
            currentGroup = self.env.user.groups_id
            a = leave.pending_approver
            pending_approver=self.env['res.groups'].search([('name', '=', 'Admin')])
            for val in pending_approver:
                if val in currentGroup:
                    super(Holidays, self).action_refuse()
                    leave.write({'pending_approver': None})
                    self.env['custom_leave_management.approbation'].create(
                        {'leave': leave.id, 'approver': self.env.uid, 'sequence': 3,
                         'date': fields.Datetime.now(), 'state': 'rejected'})
                    flag = 0
                    break
                else:
                    flag = 1
            if flag == 1:
                raise UserError(("You are now unauthorized to perform this action"))


    @api.multi
    def action_draft(self):
        obj = super(Holidays, self).action_draft()
        self.pending_approver = self.approval_rule.approver_ids[0].group_id
        return obj

    @api.model
    def create(self, vals):
        currentGroup = self.env.user.groups_id
        alpha =  vals.get('auto_approve')
        model_id = self.env['ir.model'].search([('model', '=', 'hr.holidays')]).id
        for g in currentGroup:
            rule_id=self.env['custom_leave_management.rule_authorization'].search([('model_id','=',model_id),('group_id','=',g.id)]).rule_id.id
            if rule_id:
                vals["approval_rule"] = rule_id
                break
        if not rule_id and (alpha == 'False' or alpha == None):
            raise UserError(("You are unauthorized to perform this action"))
        leave = super(Holidays, self).create(vals)
        return leave
    @api.model
    def search(self, args, offset=0, limit=0, order=None, count=False):
        current_user = self.env.user
        group_id = self.env.ref('leave_management_custom.group_leave_custom_user').id
        user_login = current_user.login
        if group_id in current_user.groups_id.ids:
            employee = self.env['hr.employee'].search([('work_email', '=', user_login)])
            if not employee:
                raise UserError(("You are unauthorized to perform this action as you are not an Employee. "
                                 "Please contact your administrator for further details"))
            myargs = [('user_id', '=', self.env.user.id)]
            args.extend(myargs)

        if args[0] == ['type', '=', 'my_leaves']:
            myargs = [('type', '=', 'remove'), ('user_id', '=', self.env.user.id)]
            if len(args) == 1:
                args = myargs
            else:
                del args[0]
                args.extend(myargs)
        if args[0] == ['type', '=', 'my_allocation']:
            myargs = [('type', '=', 'add'), ('user_id', '=', self.env.user.id)]
            if len(args) == 1:
                args = myargs
            else:
                del args[0]
                args.extend(myargs)
        if args[0] == ['type', '=', 'to_approve_leave']:
            myargs = [('type', '=', 'remove'),('pending_approver', 'in', current_user.groups_id.ids)]
            if len(args) == 1:
                args = myargs
            else:
                del args[0]
                args.extend(myargs)
        if args[0] == ['type', '=', 'to_approve_allocation']:
            myargs = [('type', '=', 'add'), ('pending_approver', 'in', current_user.groups_id.ids)]
            if len(args) == 1:
                args = myargs
            else:
                del args[0]
                args.extend(myargs)


        leaves = super(Holidays, self).search(args, offset=0, limit=0, order=None, count=False)
        return leaves