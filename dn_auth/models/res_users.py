import re
import werkzeug
from datetime import datetime
from odoo.addons.dn_auth import dn_auth_vars
from odoo import api, fields, models, _, http
from odoo.exceptions import UserError, AccessDenied


def verify_user(db, sid, uid, req_url):
    if req_url == '/longpolling/poll' or req_url == '/web/login':
        return "ok"

    if not uid:
        return "not logged in"

    if uid==1:
        return "ok"

    last_user = dn_auth_vars.last_user
    time_now = datetime.now()
    if uid == last_user['id']:
        time_difference = time_now - last_user['time']
        if time_difference.seconds < 100:
            last_user = {'time': time_now, 'id': uid}
            dn_auth_vars.last_user = last_user
            return "ok"
    else:
        last_user['id'] = uid

    if dn_auth_vars.dn_sessions and dn_auth_vars.dn_sessions[db]:
        d = 1
    else:
        return "connect again please"

    uuid = 'u' + str(uid)
    session_array = dn_auth_vars.dn_sessions
    if db in session_array and uuid in session_array[db]:
        user_session = session_array[db][uuid]
        if 'sid' not in user_session:
            return "Missing Session Id"
        elif user_session['sid'] != sid:
            return "Invalid Session Id"
        else:
            allowed_secods = 1200
            last_activity = user_session['last_activity']
            time_difference = time_now - last_activity
            if uid !=1 and time_difference.seconds > allowed_secods:
                allowed_minutes = str(allowed_secods / 60)
                return "inactive for more than "+allowed_minutes+ " minutes"
            else:
                user_session['last_activity'] = time_now
                last_user = {'time': time_now, 'id': uid}
                dn_auth_vars.last_user = last_user
                session_array[db][uuid] = user_session
                dn_auth_vars.dn_sessions = session_array
                return "ok"
    else:
        return "db connection expired"

# class IrHttp(models.AbstractModel):
#     _inherit = 'ir.http'
#
#     @classmethod
#     def _authenticate(cls, auth_method='user'):
#         try:
#             request = http.request
#             if request.session.uid:
#                 try:
#                     request.session.check_security()
#                     req_url = request.httprequest.path
#                     sid = request.session.sid
#                     uid = request.session.uid
#                     db = request.db
#                     res = verify_user(db, sid, uid, req_url)
#                     if res != "ok":
#                         if request.session and request.session.uid:
#                             request.session.logout(keep_db=True)
#                         raise http.SessionExpiredException()
#                 except (AccessDenied, http.SessionExpiredException):
#                     raise
#             if request.uid is None:
#                 getattr(cls, "_auth_method_%s" % auth_method)()
#         except (AccessDenied, http.SessionExpiredException, werkzeug.exceptions.HTTPException):
#             if request.session and request.session.uid:
#                 request.session.logout(keep_db=True)
#             raise http.SessionExpiredException()
#         return auth_method

class ResUsers(models.Model):
    _inherit = 'res.users'

    password_write_date = fields.Datetime(
        'Last password update',
        default=fields.Datetime.now,
        readonly=True,
    )

    @api.model
    def signup(self, values, token=None):
        """ signup a user, to either:
            - create a new user (no token), or
            - create a user for a partner (with token, but no user for partner), or
            - change the password of a user (with token, and existing user).
            :param values: a dictionary with field values that are written on user
            :param token: signup token (optional)
            :return: (dbname, login, password) for the signed up user
        """
        if token:
            # signup with a token: find the corresponding partner id
            partner = self.env['res.partner']._signup_retrieve_partner(token, check_validity=True, raise_exception=True)
            # invalidate signup token

            partner_user = partner.user_ids and partner.user_ids[0] or False

            # avoid overwriting existing (presumably correct) values with geolocation data
            if partner.country_id or partner.zip or partner.city:
                values.pop('city', None)
                values.pop('country_id', None)
            if partner.lang:
                values.pop('lang', None)

            if partner_user:
                # user exists, modify it according to values
                values.pop('login', None)
                values.pop('name', None)
                partner_user.write(values)
                return (self.env.cr.dbname, partner_user.login, values.get('password'))
            else:
                # user does not exist: sign up invited user
                values.update({
                    'name': partner.name,
                    'partner_id': partner.id,
                    'email': values.get('email') or values.get('login'),
                })
                if partner.company_id:
                    values['company_id'] = partner.company_id.id
                    values['company_ids'] = [(6, 0, [partner.company_id.id])]
                self._signup_create_user(values)
        else:
            # no token, sign up an external user
            values['email'] = values.get('email') or values.get('login')
            self._signup_create_user(values)

        return (self.env.cr.dbname, values.get('login'), values.get('password'))
    @api.model
    def create(self, vals):
        if vals.get('password'):
            self._check_password_rules(vals['password'])
        vals['password_write_date'] = fields.Datetime.now()
        return super(ResUsers, self).create(vals)

    @api.multi
    def write(self, vals):
        if vals.get('password'):
            self._check_password_rules(vals['password'])
            vals['password_write_date'] = fields.Datetime.now()
        Tempvalue = False
        if self.partner_id.signup_token:
            partner = self.env['res.partner']._signup_retrieve_partner(self.partner_id.signup_token, check_validity=True,raise_exception=True)
            Tempvalue = True
        checkValue = super(ResUsers, self).write(vals)
        if checkValue & Tempvalue:
            partner.write({'signup_token': False, 'signup_type': False, 'signup_expiration': False})
        return checkValue

    @api.multi
    def password_match_message(self):
        self.ensure_one()
        company_id = self.company_id
        message = []
        if company_id.password_lower:
            message.append(' ' + 'Lowercase letter (At least ' + str(
                company_id.password_lower) + ' character)')
        if company_id.password_upper:
            message.append(' ' + 'Uppercase letter (At least ' + str(
                company_id.password_upper) + ' character)')
        if company_id.password_numeric:
            message.append(' ' + 'Numeric digit (At least ' + str(
                company_id.password_numeric) + ' character)')
        if company_id.password_special:
            message.append(' ' + 'Special character (At least ' + str(
                company_id.password_special) + ' character)')
        if message:
            message = [_('Must contain the following:')] + message
        if company_id.password_length:
            message = ['Password must be %d characters or more.' %
                       company_id.password_length
                       ] + message
        return ''.join(message)

    @api.multi
    def _check_password_rules(self, password):
        get_param = self.env['ir.config_parameter'].sudo().get_param
        apply_password = get_param('dn_auth.password_rules')
        # setting_model = self.env['res.config.settings']
        # settings = setting_model.get_values()
        # apply_password = settings.apply_password_rules
        if apply_password != "apply":
            return True
        self.ensure_one()
        if not password:
            message = self.password_match_message()
            raise UserError(message)
        company_id = self.company_id
        password_regex = [
            '^',
            '(?=.*?[a-z]){' + str(company_id.password_lower) + ',}',
            '(?=.*?[A-Z]){' + str(company_id.password_upper) + ',}',
            '(?=.*?\\d){' + str(company_id.password_numeric) + ',}',
            r'(?=.*?[\W_]){' + str(company_id.password_special) + ',}',
            '.{%d,}$' % int(company_id.password_length),
        ]
        if not re.search(''.join(password_regex), password):
            message = self.password_match_message()
            raise UserError(message)
        return True

class Settings(models.Model):
    _name = 'dn_auth.settings'
    apply_password_rules = fields.Boolean()

class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'
    apply_password_rules = fields.Char(string='Password Rules')

    @api.model
    def get_values(self):
        res = super(ResConfigSettings, self).get_values()
        get_param = self.env['ir.config_parameter'].sudo().get_param
        password_rules = get_param('dn_auth.password_rules')
        res.update(
            apply_password_rules = password_rules
        )
        return res

    @api.multi
    def set_values(self):
        super(ResConfigSettings, self).set_values()
        set_param = self.env['ir.config_parameter'].sudo().set_param
        password_rules = self.apply_password_rules
        set_param('dn_auth.password_rules', password_rules)
        a = 1