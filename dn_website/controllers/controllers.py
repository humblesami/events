# -*- coding: utf-8 -*-
from odoo import http
from werkzeug.utils import redirect
from odoo.addons.website.controllers.main import Website


class MyWebsite(Website):
    @http.route()
    def index(self):
        request = http.request
        if not request.session.uid:
            return redirect('/web/login')
        else:
            return redirect('/web')