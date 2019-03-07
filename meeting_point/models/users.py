import werkzeug
from odoo.exceptions import UserError
from odoo import api, fields, models, tools
from odoo.addons.dn_base import ws_methods

class partner(models.Model):
    _inherit = 'res.partner'
    is_committee=fields.Boolean(string="Is Committee")
    mp_user_id = fields.Many2one('meeting_point.users', string="Related MP.User")


    @api.multi
    def _compute_signup_url(self):
        """ proxy for function field towards actual implementation """
        result = self._get_signup_url_for_action_custom()
        for partner in self:
            partner.signup_url = result.get(partner.id, False)
    @api.multi
    def _get_signup_url_for_action_custom(self, action=None, view_type=None, menu_id=None, res_id=None, model=None):
        """ generate a signup url for the given partner ids and action, possibly overriding
            the url state components (menu_id, id, view_type) """

        res = dict.fromkeys(self.ids, False)
        base_url = ws_methods.get_main_url()
        for partner in self:
            # when required, make sure the partner has a valid signup token
            if self.env.context.get('signup_valid') and not partner.user_ids:
                partner.signup_prepare()

            route = 'login'
            # the parameters to encode for the query
            query = dict(db=self.env.cr.dbname)
            signup_type = self.env.context.get('signup_force_type_in_url', partner.signup_type or '')
            if signup_type:
                route = 'reset_password' if signup_type == 'reset' else signup_type

            if partner.signup_token and signup_type:
                query['token'] = partner.signup_token
            elif partner.user_ids:
                query['login'] = partner.user_ids[0].login
            else:
                continue  # no signup token, no user, thus no signup url!

            fragment = dict()
            base = '/web#'
            if action == '/mail/view':
                base = '/mail/view?'
            elif action:
                fragment['action'] = action
            if view_type:
                fragment['view_type'] = view_type
            if menu_id:
                fragment['menu_id'] = menu_id
            if model:
                fragment['model'] = model
            if res_id:
                fragment['res_id'] = res_id

            if fragment:
                query['redirect'] = base + werkzeug.urls.url_encode(fragment)
            groupCheck = self.env['res.users'].search([('partner_id', '=', partner.id)]).has_group('meeting_point.group_meeting_director')
            if groupCheck:
                route = 'set-password'
                base_url = 'https://meetvue.com'
                res[partner.id] = werkzeug.urls.url_join(base_url,
                                        "/%s?%s" % (route, werkzeug.urls.url_encode(query)))
            else :
                res[partner.id] = werkzeug.urls.url_join(base_url,
                                                         "/web/%s?%s" % (route, werkzeug.urls.url_encode(query)))
        return res

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
        ('other', 'Other'),
        ('decline','I decline to answer')
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

    #extra reporting fields
    ethinicity = fields.Selection([

        ('hispanic','Hispanic or Latino'),
        ('american indian','American Indian or Alaskan Native'),
        ('asian','Asian'),
        ('nativeHawaian','Native Hawaiian or Other Native Pacific Islander'),
        ('africanamerican','Black or African American'),
        ('white','White'),
        ('more','Two or more races'),
        ('decline','I decline to answer')
    ])
    veteran = fields.Selection([
        ('yes','Yes'),
        ('no','No'),
        ('decline','I decline to answer')
    ])
    disability = fields.Selection([
        ('yes','Yes'),
        ('no','No'),
        ('decline','I decline to answer')
    ])

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
    term_start_date = fields.Date(string="Term Start Date")
    term_end_date = fields.Date(string="Term End Date")
    signature_img = fields.Binary(string="Signature")

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


