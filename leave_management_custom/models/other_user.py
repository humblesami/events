from odoo import models, fields, api
from odoo import tools, _

class OtherUser(models.Model):
    _name = "custom_leave_management.other_users"


    image=fields.Binary("Image")
    name= fields.Char("Name")
    login= fields.Char("Email")
    nick_name = fields.Char(string="Nick")
    website = fields.Char(string="Website")
    fax = fields.Char(string="Fax")
    user_id= fields.Many2one('res.users',string="Related User")
    work_phone= fields.Char(string="Work Phone")
    mobile_phone = fields.Char(string="Cell Phone")
    send_email = fields.Boolean(string="Send Email")
    bio = fields.Html(string="Bio")
    resume = fields.Binary(string="Resume")
    committee_ids = fields.Many2many("meeting_point.committee", string="Committees")
    groups_id= fields.Many2many('res.groups',string="Related Group")

    country_id = fields.Many2one('res.country', string='Nationality (Country)')
    birthday = fields.Date('Date of Birth')
    ssnid = fields.Char('SSN No', help='Social Security Number')
    sinid = fields.Char('SIN No', help='Social Insurance Number')
    identification_id = fields.Char(string='Identification No')
    gender = fields.Selection([
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other')
    ])
    marital = fields.Selection([
        ('single', 'Single'),
        ('married', 'Married'),
        ('widower', 'Widower'),
        ('divorced', 'Divorced')
    ], string='Marital Status')
    department_id = fields.Many2one('hr.department', string='Department')
    work_location = fields.Char('Work Location')
    job_id = fields.Many2one('hr.job', string='Job Title')
    passport_id = fields.Char('Passport No')
    city = fields.Char(string="City")

    @api.model
    def create(self, vals):
        vals['groups_id']=[[6,False,vals['groups_id']]]
        employee = super(OtherUser, self).create(vals)
        return employee

    @api.multi
    def write(self, vals):
        if 'groups_id' in vals:
            action = self._context
            if 'params' in action:
                current_action_id = action['params']['action']
                action_id = self.env.ref('leave_management_custom.action_custom_leave_other_users').id
                if action_id == current_action_id:
                    current_group_ids = vals['groups_id'][0][2]
                    meeting_group_ids = self.env['res.groups'].search([('category_id.name', '=', 'E-Leave')]).ids
                    group_ids = self.user_id.groups_id.ids
                    temp_list = self.difference(meeting_group_ids, current_group_ids)
                    if not current_group_ids:
                        base_group = self.env['res.groups'].search([('name', '=', 'E-Leave')]).id
                        temp_list.append(base_group)
                    for i in temp_list:
                        if i in group_ids:
                            group_ids = self.difference(group_ids, [i])
                    current_group_ids.extend(group_ids)
                    self.user_id.write(vals)
                else:
                    vals['groups_id'] = [[6, False, vals['groups_id']]]
        employee = super(OtherUser, self).write(vals)
        return employee

    def difference(self, a, b):
        b = set(b)
        return [item for item in a if item not in b]