# -*- coding: utf-8 -*-
from odoo import http

# class DnLeaves(http.Controller):
#     @http.route('/dn_leaves/dn_leaves/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/dn_leaves/dn_leaves/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('dn_leaves.listing', {
#             'root': '/dn_leaves/dn_leaves',
#             'objects': http.request.env['dn_leaves.dn_leaves'].search([]),
#         })

#     @http.route('/dn_leaves/dn_leaves/objects/<model("dn_leaves.dn_leaves"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('dn_leaves.object', {
#             'object': obj
#         })