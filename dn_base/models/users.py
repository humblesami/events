from odoo import models, api, fields
from odoo.exceptions import UserError, _logger
from odoo.addons.auth_signup.models.res_partner import now

class Users(models.Model):
    _inherit = 'res.users'

    own_profile = fields.Char(string="Show button", compute="_compute_own_profile")

    def _compute_own_profile(self):
        for user in self:
            if self.env.user.id== user.user_id.id:
                user.own_profile=True

    @api.model
    def create(self, vals):
        if "creating_child" in self._context:
            user = self.env['res.users'].search([('login', '=', vals['login'])])
            return user
        else:
    # /////////////////IF CREATING FROM BASE USER MENU///////////////////////
            user = super(Users, self).create(vals)
            values = self._remove_reified_groups(vals)
            if 'groups_id' in values:
                for v in values['groups_id']:
                    if type(v)==tuple:
                        if len(v) == 2 and v[0] == 4:
                            group_id = v[1]
                        else:
                            continue
                        user_model_ids = self.env['res.groups'].search(
                            [('id', '=', group_id)]).user_model_ids.ids
                        if not user_model_ids:
                            continue
                        for g in user_model_ids:
                            model = self.env['ir.model'].search([('id', '=', g)])
                            employee = self.env[model.model].search([('login', '=', vals['login'])])
                            if not employee:
                                self.env[model.model].with_context({"creating_child": True}).create(
                                    {'image': vals['image'],
                                     'login': vals['login'], 'name': vals['name'],
                                     'groups_id': [group_id]})

# /////////////////////IF CREATING FROM DN MENUES/////////////////////////////////
            if "dn_system_users_menu" in self._context:
                if 'groups_id' in vals:
                    selected_group_id = vals['groups_id'][0][2]
                    selected_group = self.env['res.groups'].search([('id', '=', selected_group_id[0])])
                    user_model_ids = selected_group.user_model_ids.ids

                    for g in user_model_ids:
                        model = self.env['ir.model'].search([('id', '=', g)])
                        usr = self.env[model.model].search([('user_id', '=', self.id)])
                        if not usr:
                            self.env[model.model].with_context({"creating_child": True}).create({'image': vals['image'],
                                                                                                 'login': vals['login'],
                                                                                                 'name': vals['name']})

            return user

    @api.multi
    def write(self, vals):
        values = self._remove_reified_groups(vals)

        context = self._context
        params = context.get('params')
        action=False
        if params:
            action = params.get('action')
        if action:
 # /////////////////IF WRITING FROM BASE USER MENU///////////////////////
            action_id = self.env.ref('base.action_res_users').id
            if action_id == action:
                if 'groups_id' in values:
                    remove_category_group_list = [] #Type Cast [category_id,group_id]
                    remove_category_list=[]
                    for v in values['groups_id']:
                        if v[0] == 4:
                            group_id = v[1]
                            user_model_ids = self.env['res.groups'].search([('id', '=', group_id)]).user_model_ids.ids
                            # model = self.env['ir.model'].search([('name', '=', group_category.name)])
                            if not user_model_ids:
                                continue
                            for g in user_model_ids:
                                model = self.env['ir.model'].search([('id', '=', g)])
                                employee = self.env[model.model].search([('user_id', '=', self.id)])
                                if not employee:
                                    self.env[model.model].with_context({"creating_child":True}).create({'image': self.image,
                                                                                                            'login': self.login, 'name': self.name,
                                                                                                            'groups_id': [group_id]})
                        if v[0]==3:
                            group_id=v[1]
                            group = self.env['res.groups'].search([('id', '=', group_id)])
                            for implied_id in group.implied_ids.ids:
                                values['groups_id'].append((3, implied_id))
                            if not group.category_id.id in remove_category_list:
                                remove_category_list.append(group.category_id.id)
                            remove_category_group_list.append([group.category_id.id,group_id])

 # /////////////////IF WRITING FROM DN USER MENUES///////////////////////
            if "dn_users_menu" in self._context:
                if 'groups_id' in vals:

                    selected_group_id = vals['groups_id'][0][2]
                    selected_group = self.env['res.groups'].search([('id', '=', selected_group_id[0])])
                    user_model_ids = selected_group.user_model_ids.ids

                    for g in user_model_ids:
                        model = self.env['ir.model'].search([('id', '=', g)])
                        usr = self.env[model.model].search([('user_id', '=', self.id)])
                        if not usr:
                            self.env[model.model].with_context({"creating_child": True}).create({'image': self.image,
                                                                                                 'login': self.login,
                                                                                                 'name': self.name})

                    remove_groups = self.env['res.groups'].search(
                        [('category_id', '=', selected_group.category_id.id)])
                    remove_group_ids = remove_groups.ids
                    for g in remove_groups:
                        for implied_id in g.implied_ids.ids:
                            remove_group_ids.append(implied_id)
                    current_group_ids = self.groups_id.ids
                    current_group_ids = set(current_group_ids) - set(remove_group_ids)
                    selected_group_id.extend(current_group_ids)


        user = super(Users, self).write(values)
        return user

    @api.multi
    def action_reset_password(self):
        """ create signup token for each user, and send their signup url by email """
        # prepare reset password signup
        create_mode = bool(self.env.context.get('create_user'))

        # no time limit for initial invitation, only for reset password
        expiration = False if create_mode else now(days=+1)

        self.mapped('partner_id').signup_prepare(signup_type="reset", expiration=expiration)

        # send email to users with their signup url
        template = False
        if create_mode:
            try:
                template = self.env.ref('dn_base.set_password_email_custom', raise_if_not_found=False)
            except ValueError:
                pass
        if not template:
            template = self.env.ref('dn_base.custom_reset_password_email')
        assert template._name == 'mail.template'

        for user in self:
            if not user.email:
                raise UserError("Cannot send email: user %s has no email address."+ user.name)
            template.with_context(lang=user.lang).send_mail(user.id, force_send=True, raise_exception=True)

class Additional_User_Fields(models.Model):
    _name = "dnspusers"

    user_id = fields.Many2one('res.users', string="User")
    auth_token = fields.Char("Authentication Token")
    login = fields.Char()
    password = fields.Char()
    signature = fields.Binary(string="Signature")

    _sql_constraints = [
    ('user_id_uniq', 'unique (user_id)', "User already exists !"),
    ]

    @api.multi
    def write(self, vals):
        sp_user = super(Additional_User_Fields, self).write(vals)
        return sp_user

class DNuser(models.Model):
    _name= "dn.user"
    _description = 'DN Users'

    def change_password_wizard(self):
        self = self.with_context(active_model='res.users', active_ids=[self.user_id.id])
        return {
            'type': 'ir.actions.act_window',
            'name': 'Change Password',
            'view_mode': 'form',
            'view_type': "form",
            'src_model': "res.users",
            'res_model': 'change.password.wizard',
            'context': self._context,
            'target': 'new',
        }

    @api.multi
    def action_reset_password(self):
        self=self.user_id
        """ create signup token for each user, and send their signup url by email """
        # prepare reset password signup
        create_mode = bool(self.env.context.get('create_user'))

        # no time limit for initial invitation, only for reset password
        expiration = False if create_mode else now(days=+1)

        self.mapped('partner_id').signup_prepare(signup_type="reset", expiration=expiration)

        # send email to users with their signup url
        template = False
        if create_mode:
            try:
                template = self.env.ref('dn_base.set_password_email_custom', raise_if_not_found=False)
            except ValueError:
                pass
        if not template:
            template = self.env.ref('dn_base.custom_reset_password_email')
        assert template._name == 'mail.template'

        for user in self:
            if not user.email:
                raise UserError("Cannot send email: user %s has no email address." % user.name)
            template.with_context(lang=user.lang).send_mail(user.id, force_send=True, raise_exception=True)
            _logger.info("Password reset email sent for user <%s> to <%s>", user.login, user.email)

    @api.multi
    def preference_change_password(self):
        return {
            'type': 'ir.actions.client',
            'tag': 'change_password',
            'target': 'new',
        }