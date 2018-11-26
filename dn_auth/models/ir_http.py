import odoo
from odoo import models, http

class Http(models.AbstractModel):
    _inherit = 'ir.http'

    def session_info(self):
        request = http.request
        user = request.env.user
        spuser = False
        try:
            spuser = request.env['dnspusers'].sudo().search([('user_id', '=', user.id)])
        except:
            a = 1
        display_switch_company_menu = user.has_group('base.group_multi_company') and len(user.company_ids) > 1
        version_info = odoo.service.common.exp_version()
        user_info = {
            "session_id": request.session.sid,
            "uid": request.session.uid,
            "is_system": request.env.user._is_system(),
            "is_superuser": request.env.user._is_superuser(),
            "user_context": request.session.get_context() if request.session.uid else {},
            "db": request.session.db,
            "server_version": version_info.get('server_version'),
            "server_version_info": version_info.get('server_version_info'),
            "name": user.name,
            "username": user.login,
            "company_id": request.env.user.company_id.id if request.session.uid else None,
            "partner_id": request.env.user.partner_id.id if request.session.uid and request.env.user.partner_id else None,
            "user_companies": {'current_company': (user.company_id.id, user.company_id.name),
                               'allowed_companies': [(comp.id, comp.name) for comp in
                                                     user.company_ids]} if display_switch_company_menu else False,
            "currencies": self.get_currencies(),
            "web.base.url": self.env['ir.config_parameter'].sudo().get_param('web.base.url', default=''),
        }
        if spuser and spuser.auth_token:
            spuser.password = request.session.password
            spuser.login = request.session.login
            user_info['token'] = spuser.auth_token
        return user_info