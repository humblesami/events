import random
import string
from odoo import models, http
from odoo.addons.dn_base import ws_methods

class dn_auth_Http(models.AbstractModel):
    _inherit = 'ir.http'

    def session_info(self):
        request = http.request
        user = request.env.user
        spuser = request.env['dnspusers'].sudo().search([('user_id', '=', user.id)])
        if not spuser:
            spuser = request.env['dnspusers'].sudo().create({'user_id': user.id})
        base_url = ws_methods.get_main_url()
        user_info = super(dn_auth_Http, self).session_info()

        image_path1 = base_url + '/image/res.users/'
        if not spuser.auth_token:
            spuser.auth_token = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(10))
        image_path2 = '/image_small/' + request.session.db + '/' + spuser.auth_token
        if spuser:
            spuser.password = request.session.password
            spuser.login = request.session.login
            user_info['user'] = {
                'token':spuser.auth_token,
                'photo':image_path1 + str(user.id) + image_path2,
                'name':user.name,
                'id':user.id,
                'db':request.session.db
            }
        return user_info