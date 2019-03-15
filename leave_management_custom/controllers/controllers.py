# -*- coding: utf-8 -*-
from odoo import http

# class LeaveManagementCustom(http.Controller):
#     @http.route('/leave_management_custom/leave_management_custom/', auth='none')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/leave_management_custom/leave_management_custom/objects/', auth='none')
#     def list(self, **kw):
#         return http.request.render('leave_management_custom.listing', {
#             'root': '/leave_management_custom/leave_management_custom',
#             'objects': http.request.env['leave_management_custom.leave_management_custom'].search([]),
#         })

#     @http.route('/leave_management_custom/leave_management_custom/objects/<model("leave_management_custom.leave_management_custom"):obj>/', auth='none')
#     def object(self, obj, **kw):
#         return http.request.render('leave_management_custom.object', {
#             'object': obj
#         })