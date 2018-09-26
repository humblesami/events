from odoo.exceptions import UserError
from odoo import api, fields, models, tools
from odoo.addons.auth_signup.models.res_partner import now

class partner(models.Model):
    _inherit = 'res.partner'
    is_committee=fields.Boolean(string="Is Committee")
    mp_user_id = fields.Many2one('meeting_point.users', string="Related MP.User")

class MPUser(models.Model):
    _inherits = {'res.users':'user_id'}
    _inherit = 'dn.user'
    _name= "meeting_point.users"
    _description = 'MeetingPoint Users'

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


    country_id = fields.Many2one('res.country', string='Nationality (Country)')
    birthday = fields.Date('Date of Birth')
    ssnid = fields.Char('SSN No', help='Social Security Number')
    sinid = fields.Char('SIN No', help='Social Insurance Number')
    identification_id = fields.Char(string='Identification No')
    companies = fields.Char(string="Company")
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
    department = fields.Char(string='Department')
    work_location = fields.Char('Work Location')
    job_title = fields.Char(string='Job Title')
    passport_id = fields.Char('Passport No')
    city = fields.Char(string="City")

# Director fields
    board_joing_date = fields.Datetime(string="Board Joing Date")
    admin_first_name = fields.Char(string="First Name")
    admin_last_name = fields.Char(string="Last Name")
    admin_nick_name = fields.Char(string="Nick")
    admin_cell_phone = fields.Char(string="Cell Phone")
    admin_email = fields.Char(string="Email")
    admin_work_phone = fields.Char(string="Work Phone")
    admin_fax = fields.Char(string="Fax")
    admin_image = fields.Binary(string="Picture")
    mail_to_assistant = fields.Boolean(string="Allow meeting invitations to assistant")
    uid = fields.Integer(compute='cal_uid')


    @api.multi
    def cal_uid(self):
        for u in self:
            u.uid = u.user_id.id

    @api.onchange('login')
    def on_change_login(self):
        if self.login and tools.single_email_re.match(self.login):
            self.email = self.login


    @api.model
    def create(self, values):
        if self.env.user.has_group('meeting_point.group_meeting_admin'):
            self = self.sudo()
        if values.get('send_email') == False:
            self = self.with_context(no_reset_password=True)
        if self.env.user.has_group('meeting_point.group_meeting_admin'):
            self = self.sudo()
        action = self._context
        if 'mp_director_menu' in self._context:
            group_id = self.env.ref('meeting_point.group_meeting_director').id
            values['groups_id'] = [group_id]
        if 'mp_staff_menu' in self._context:
            group_id = self.env.ref('meeting_point.group_meeting_staff').id
            values['groups_id'] = [group_id]
        if 'mp_admin_menu' in self._context:
            group_id = self.env.ref('meeting_point.group_meeting_admin').id
            values['groups_id'] = [group_id]
        employee = super(MPUser, self).create(values)
        employee.user_id.partner_id.user_id = employee.user_id
        employee.mp_user_id = employee.id
        #employee.email = employee.login
        return employee

    @api.multi
    def write(self, vals):
        is_admin = self.env.user.has_group('meeting_point.group_meeting_admin') or self.env.user.id == 1
        if is_admin:
            self = self.sudo()
        if 'groups_id' in vals:
            if not is_admin:
                raise UserError("Unauthorized")

        employee = super(MPUser, self).write(vals)
        return employee

    @api.multi
    def unlink(self):
        for u in self:
            user=u.user_id
            employee=super(MPUser, u).unlink()
            if user:
                employee=user.unlink()
        return employee


