# -*- coding: utf-8 -*-
from odoo import http

# class Chatting(http.Controller):
#     @http.route('/chatting/chatting/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/chatting/chatting/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('chatting.listing', {
#             'root': '/chatting/chatting',
#             'objects': http.request.env['chatting.chatting'].search([]),
#         })

#     @http.route('/chatting/chatting/objects/<model("chatting.chatting"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('chatting.object', {
#             'object': obj
#         })