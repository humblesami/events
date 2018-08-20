# -*- coding: utf-8 -*-
from odoo import http

# class Foster-base(http.Controller):
#     @http.route('/foster-base/foster-base/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/foster-base/foster-base/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('foster-base.listing', {
#             'root': '/foster-base/foster-base',
#             'objects': http.request.env['foster-base.foster-base'].search([]),
#         })

#     @http.route('/foster-base/foster-base/objects/<model("foster-base.foster-base"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('foster-base.object', {
#             'object': obj
#         })