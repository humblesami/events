# -*- coding: utf-8 -*-
##############################################################################
# For copyright and license notices, see __openerp__.py file in root directory
##############################################################################

from openerp import fields, models
import requests
import json


class website(models.Model):
    _inherit = 'website'
    recaptcha_site_key = fields.Char(
        string='ReCaptcha Site Key',
        default="6LcwRnQUAAAAAES18xnqMsTI9yvoDkxGFrI0kvnE")
    recaptcha_private_key = fields.Char(
        string='ReCaptcha Private Key',
        default="6LcwRnQUAAAAAD4tC_Pw9Qv2AWDMgN9eicrHKZLz")

    def check_recaptcha(self, response):
        ICP = self.env['ir.config_parameter'].sudo()
        secret_key = ICP.get_param('recaptcha.key.secret')
        get_res = {'secret': secret_key, 'response': response}
        try:
            response = requests.get(
                'https://www.google.com/recaptcha/api/siteverify', params=get_res)
        except Exception, e:
            assert 0, ('Invalid Data!, %s' % (e))
        res_con = json.loads(response.content)
        if res_con.has_key('success') and res_con['success']:
            return True
        return False


class website_config_settings(models.TransientModel):
    _inherit = 'res.config.settings'

    recaptcha_site_key = fields.Char(
        string='ReCaptcha Site Key', related=['website_id', 'recaptcha_site_key'])
    recaptcha_private_key = fields.Char(
        string='ReCaptcha Private Key', related=['website_id', 'recaptcha_private_key'])
