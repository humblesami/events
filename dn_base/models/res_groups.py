from odoo import api, models, _, fields

class Groups(models.Model):
    _inherit = 'res.groups'

    @api.model
    def create(self, values):
        # self = self.sudo()
        parent = super(Groups, self)
        group = parent.create(values)
        # self._update_user_groups()
        # self.env['ir.values'].clear_caches()
        return group

    @api.multi
    def write(self, values):
        # self = self.sudo()
        parent = super(Groups, self)
        res = parent.write(values)
        # self._update_user_groups()
        # self.env['ir.values'].clear_caches()
        return res

    @api.multi
    def unlink(self):
        # self = self.sudo()
        res = super(Groups, self).unlink()
        # self._update_user_groups()
        # self.env['ir.values'].clear_caches()
        return res

    def check_menue(self):
        action = self._context
        if 'module_name' in self._context:
            type=self._context['module_name']
            models = self.env['ir.model'].search([('model', 'like', type)])
            values = []
            for mod in models:
                values.append(
                    {u'model_id': mod.id, u'perm_read': False, u'name': u'Leave Access', u'perm_unlink': False,
                     u'perm_write': False, u'perm_create': False})
            return values
        else:
            return []

    user_model_ids = fields.Many2many("ir.model", string="User Model(s)")
    model_access = fields.One2many('ir.model.access', 'group_id', string='Access Controls', copy=True,
                                   default=check_menue)

    # def _update_user_groups(self):
    #
    #     if not self._context.get('install_mode'):
    #
    #         if self._context.get('install_mode'):
    #             user_context = self.env['res.users'].context_get()
    #             self = self.with_context(**user_context)
    #
    #         view = self.env.ref('meeting_point.mp_user_groups_view', raise_if_not_found=False)
    #         if view and view.exists() and view._name == 'ir.ui.view':
    #             group_no_one = view.env.ref('base.group_no_one')
    #             xml1, xml2 = [], []
    #             xml1.append(E.separator(string=_('Application'), groups="base.group_no_one", colspan="2"))
    #             for app, kind, gs in self.get_groups_by_application():
    #                 # hide groups in categories 'Hidden' and 'Extra' (except for group_no_one)
    #                 attrs = {}
    #                 if kind == 'selection' or not app.name or app.xml_id in (
    #                 'base.module_category_hidden', 'base.module_category_extra', 'base.module_category_usability'):
    #                     attrs['groups'] = 'base.group_no_one'
    #
    #                 # if kind == 'selection':
    #                 #     # application name with a selection field
    #                 #     field_name = name_selection_groups(gs.ids)
    #                 #     xml1.append(E.field(name=field_name, **attrs))
    #                 #     xml1.append(E.newline())
    #                 # else:
    #                 if app.xml_id=='meeting_point.module_category_meeting':
    #                     # application separator with boolean fields
    #                     app_name = app.name or _('Other')
    #                     xml2.append(E.separator(string=app_name, colspan="4", **attrs))
    #                     for g in gs:
    #                         field_name = name_boolean_group(g.id)
    #                         if g == group_no_one:
    #                             # make the group_no_one invisible in the form view
    #                             xml2.append(E.field(name=field_name, invisible="1", **attrs))
    #                         else:
    #                             xml2.append(E.field(name=field_name, **attrs))
    #
    #             xml2.append({'class': "o_label_nowrap"})
    #             xml = E.field(E.group(*(xml1), col="2"), E.group(*(xml2), col="4"), name="groups_id",
    #                           position="replace")
    #             xml.addprevious(etree.Comment("GENERATED AUTOMATICALLY BY GROUPS"))
    #             xml_content = etree.tostring(xml, pretty_print=True, encoding="unicode")
    #             view.with_context(lang=None).sudo().write({'arch': xml_content, 'arch_fs': False})
