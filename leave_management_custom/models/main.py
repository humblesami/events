# -*- coding: utf-8 -*-

from odoo import models, fields, api


class leave_heirarchy(models.Model):
    _name = 'custom_leave_management.approvers'

    approval_rule_id = fields.Many2one('custom_leave_management.approval_rules', string="Approval Rule Id", readonly=True)
    group_id = fields.Many2one('res.groups', string='Group Name', domain=lambda self:self.filter_groups())
    sequence= fields.Integer(string="Sequence")

    @api.onchange('group_id')
    def filter_groups(self):
        domain = {'domain': {'group_id': [('category_id.name', '=', 'E-Leave')]}}
        return domain
    # domain_string=fields.Char(string="Domain", compute='compute_domain')

    # @api.onchange('sequence')
    # def onchange_sequence(self):
    #     context=self.approval_rule_id.approver_ids._context['approver_ids']
    #     if context:
    #         len=context.__len__()
    #     else:
    #         len=0
    #     self.sequence=len+1

    # @api.multi
    # def compute_domain(self):
    #     departmentId = self.approval_rule_id[0].department_id.id
    #     for rec in self:
    #         rec.domain_string = json.dumps([('department_id', '=', departmentId)])

class leave_approval_lists(models.Model):
    _name = 'custom_leave_management.approval_rules'

    approver_ids= fields.One2many('custom_leave_management.approvers','approval_rule_id', string="Approver(s)")
    name= fields.Char(string="Rule Name")
    # department_id=fields.Many2one('hr.department', string="Department")

    # @api.onchange('department_id')
    # def call_domain_function_approver(self):
    #     approver_env=self.env['custom_leave_management.approvers']
    #     return approver_env.onchange_department(self.department_id)

class approbation(models.Model):
    _name = 'custom_leave_management.approbation'

    approver= fields.Many2one('res.users', string="Approver" , readonly=True)
    date= fields.Datetime(string="Date" , readonly=True)
    leave=fields.Many2one('hr.holidays', string="Leave" , readonly=True)
    sequence= fields.Integer(string="Sequence" , readonly=True)
    state= fields.Selection([('approved','Approved'),('rejected','Rejected')], string="Status" , readonly=True)
    reason = fields.Char("Reason")

    # reason to refuse
    @api.multi
    def write(self, vals):

        return super(approbation, self).write(vals)