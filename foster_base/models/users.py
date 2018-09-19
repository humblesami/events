import string
import uuid
import random
from odoo import models, fields, api
from odoo.tools import pycompat


class FosterUsers(models.Model):
    _inherits = {'res.users': 'user_id'}
    _inherit = 'dn.user'
    _name = 'foster.users'

    work_phone = fields.Char("Work Phone")
    nick_name = fields.Char(string="Nick")
    website = fields.Char(string="Website")
    fax = fields.Char(string="Fax")
    user_id = fields.Many2one('res.users', string="Related User")
    mobile_phone = fields.Char(string="Cell Phone")
    send_email = fields.Boolean(string="Send Email")
    bio = fields.Html(string="Bio")
    resume = fields.Binary(string="Resume")
    token = fields.Char(string="Token", readonly=True)

    @api.model
    def search(self, args, offset=0, limit=0, order=None, count=False):
        if 'user_type' in self._context:
            type = self._context['user_type']
            if type == 'admin':
                args = [('groups_id', '=', self.env.ref("foster_base.group_foster_admin").id)]
            elif type == 'manager':
                args = [('groups_id', '=', self.env.ref("foster_base.group_foster_manager").id)]
            elif type == 'supervisor':
                args = [('groups_id', '=', self.env.ref("foster_base.group_foster_supervisor").id)]
            elif type == 'case_worker':
                args = [('groups_id', '=', self.env.ref("foster_base.group_case_worker").id)]
            elif type == 'family_resource':
                args = [('groups_id', '=', self.env.ref("foster_base.group_foster_family_resource").id)]

            user = super(FosterUsers, self).search(args, offset=0, limit=0, order=None, count=False)
            return user

    @api.model
    def create(self, vals):
        if self.env.user.has_group('foster_base.group_foster_admin'):
            self = self.sudo()
        if vals.get('send_email') == False:
            self = self.with_context(no_reset_password=True)
        if self.env.user.has_group('foster_base.group_foster_admin'):
            self = self.sudo()
        action = self._context
        if 'mp_manager_menu' in self._context:
            group_id = self.env.ref('foster_base.group_foster_manager').id
            vals['groups_id'] = [group_id]
        if 'mp_admin_menu' in self._context:
            group_id = self.env.ref('foster_base.group_foster_admin').id
            vals['groups_id'] = [group_id]
        if 'mp_supervisor_menu' in self._context:
            group_id = self.env.ref('foster_base.group_foster_supervisor').id
            vals['groups_id'] = [group_id]
        if 'mp_family_resource_menu' in self._context:
            group_id = self.env.ref('foster_base.group_foster_family_resource').id
            vals['groups_id'] = [group_id]
        if 'mp_case_worker_menu' in self._context:
            group_id = self.env.ref('foster_base.group_case_worker').id
            vals['groups_id'] = [group_id]
        a =  super(FosterUsers, self).create(vals)
        a.user_id.partner_id.user_id = a.user_id
        user = a.user_id
        a.email = a.login
        if vals['groups_id'][0]==26:
            token = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(20))
            menuId = self.env['ir.ui.menu'].search([('name', '=', 'Foster Parents')], limit=1)
            actionId = self.env['ir.actions.act_window'].search([('name', '=', 'Foster Parents')], limit=1)
            self = a.with_context(dbname=self._cr.dbname, action_id=actionId.id, menu_id=menuId.id, val=a.name,
                                        val2=a.email, token_id = token)
            temp = self.env.ref('foster_base.email_template_invite_foster')
            if temp:
                temp.sudo().with_context().send_mail(a.id, force_send=True)
            return a
        else:
            return a



    # def send_email_to_foster(self,a, uid):
    #     invitation_template = self.env.ref('foster_base.email_template_invite_foster')
    #     user = self.env['res.users'].search([('id', '=', uid)])
    #     email_values = {"recipient_ids": [(4, user.partner_id.id)]}
    #     invitation_template.send_mail(self.id, force_send=True, raise_exception=False, email_values=email_values)


    @api.multi
    def write(self, vals):
        is_admin = self.env.user.has_group('foster_base.group_foster_admin') or self.env.user.id == 1
        if is_admin:
            self = self.sudo()
        if 'groups_id' in vals:
            if not is_admin:
                raise FosterUsers("Unauthorized")

        employee = super(FosterUsers, self).write(vals)
        return employee

    @api.multi
    def unlink(self):
        for u in self:
            user = u.user_id
            employee = super(FosterUsers, u).unlink()
            if user:
                employee = user.unlink()
        return employee

