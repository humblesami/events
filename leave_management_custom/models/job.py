import json

from odoo import models, fields, api
from odoo import tools, _
from odoo.osv import expression


class Job(models.Model):
    _inherit = "hr.job"
    _rec_name = 'full_name'

    group_id=fields.Many2one("res.groups", string="Role", domain=lambda self:self.role_domain())
    full_name = fields.Char(compute='_compute_full_name', string='Job Title', search='_search_full_name')

    @api.multi
    def role_domain(self):
        category_id = self.env['ir.module.category'].search([('name', '=', 'E-Leave Management')]).id
        # res['domain'] = {'group_id': [('category_id', '=', category_id)]}
        return [('category_id', '=', category_id)]

    @api.depends('department_id.name', 'name')
    def _compute_full_name(self):
        # Important: value must be stored in environment of group, not group1!
        for job, job1 in zip(self, self.sudo()):
            if job1.department_id:
                job.full_name = '%s / %s' % (job1.department_id.name, job1.name)
            else:
                job.full_name = job1.name


    def _search_full_name(self, operator, operand):
        lst = True
        if isinstance(operand, bool):
            domains = [[('name', operator, operand)], [('department_id.name', operator, operand)]]
            if operator in expression.NEGATIVE_TERM_OPERATORS == (not operand):
                return expression.AND(domains)
            else:
                return expression.OR(domains)
        if isinstance(operand, basestring):
            lst = False
            operand = [operand]
        where = []
        for group in operand:
            values = filter(bool, group.split('/'))
            group_name = values.pop().strip()
            category_name = values and '/'.join(values).strip() or group_name
            group_domain = [('name', operator, lst and [group_name] or group_name)]
            category_domain = [('department_id.name', operator, lst and [category_name] or category_name)]
            if operator in expression.NEGATIVE_TERM_OPERATORS and not values:
                category_domain = expression.OR([category_domain, [('department_id', '=', False)]])
            if (operator in expression.NEGATIVE_TERM_OPERATORS) == (not values):
                sub_where = expression.AND([group_domain, category_domain])
            else:
                sub_where = expression.OR([group_domain, category_domain])
            if operator in expression.NEGATIVE_TERM_OPERATORS:
                where = expression.AND([where, sub_where])
            else:
                where = expression.OR([where, sub_where])
        return where


    @api.model
    def search(self, args, offset=0, limit=None, order=None, count=False):
        # add explicit ordering if search is sorted on full_name
        if order and order.startswith('full_name'):
            groups = super(Job, self).search(args)
            groups = groups.sorted('full_name', reverse=order.endswith('DESC'))
            groups = groups[offset:offset+limit] if limit else groups[offset:]
            return len(groups) if count else groups.ids
        return super(Job, self).search(args, offset=offset, limit=limit, order=order, count=count)

