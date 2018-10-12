# Copyright 2016-2017 LasLabs Inc.
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from odoo import http
from odoo.addons.dn_base import ws_methods
from odoo.http import request
from odoo.exceptions import ValidationError

from odoo.addons.website_form.controllers.main import WebsiteForm

import json


class Websitebase(WebsiteForm):

    @http.route('/website/recaptcha/',type='http',auth='public',methods=['POST'],website=True,multilang=False,csrf=False)
    def recaptcha_public(self):
        try:
            data= json.dumps({
            'site_key': request.env['ir.config_parameter'].sudo().get_param(
                'recaptcha.key.site'),
        })
            return ws_methods.http_response('', data)
        except ValidationError:
            return ws_methods.handle()

    @http.route('/website/verify',type='http',auth='public',methods=['POST'],multilang=False, csrf=False )
    def datz(self,**kwargs):
        """ Inject ReCaptcha validation into pre-existing data extraction """
        # res = super(WebsiteForm, self).extract_data(model, values)
        resp = kwargs['responseData']
        captcha_obj = request.env['website']
        ip_addr = request.httprequest.environ.get('HTTP_X_FORWARDED_FOR')
        if ip_addr:
            ip_addr = ip_addr.split(',')[0]
        else:
            ip_addr = request.httprequest.remote_addr
        try:
            # captcha_obj.action_validate(
            #     values.get(captcha_obj.RESPONSE_ATTR), ip_addr
            # )
            data = captcha_obj.check_recaptcha(resp)
            return ws_methods.http_response('', data)
        except ValidationError:
            return ws_methods.handle()
