# -*- coding: utf-8 -*-
import base64

from odoo import http
from odoo.addons.simple_htr.src import recognize
from odoo.addons.dn_base import ws_methods

from odoo.http import request


class simplehtr(http.Controller):

    @http.route(['/simplehtr/page'],
                type="http", auth="public", website=True, csrf=True)
    def page(self,**kwargs):

        return request.render('simple_htr.simple_htr_page')

    @http.route('/simplehtr/gettext',csrf=False, auth='none')
    def get_text(self,**kw):
        # pth = __file__.split("controllers")[0] +'controllers/'
        # t=recognize.getTextIcr(pth)
        # print(t)

        try:
            t=''
            if kw["type"]=='icr':
                t = recognize.getTextIcr(kw["dataURL"])
            elif kw["type"]=='ocr':
                t = recognize.getTextOcr(kw["dataURL"])

            return ws_methods.http_response('',{"text":t})
        except:
            return ws_methods.handle()
