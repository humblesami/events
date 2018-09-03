# -*- coding: utf-8 -*-
from odoo import http

# class FosterManagement(http.Controller):
#     @http.route('/foster_management/foster_management/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/foster_management/foster_management/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('foster_management.listing', {
#             'root': '/foster_management/foster_management',
#             'objects': http.request.env['foster_management.foster_management'].search([]),
#         })

#     @http.route('/foster_management/foster_management/objects/<model("foster_management.foster_management"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('foster_management.object', {
#             'object': obj
#         })