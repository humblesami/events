import json
from odoo import http
from odoo.http import request
from odoo.addons.dn_base import ws_methods

class Oddochat(http.Controller):

    @http.route('/active-user-messages', type="http", csrf=False, auth='public', cors='*')
    def getActiveUserMessage(self, **kw):
        try:
            uid = ws_methods.check_auth(kw)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env

            sender = uid
            to = kw.get('target_id')

            filters = [('sender','=',to), ('to','=',sender)]
            req_env['odoochat.messages'].sudo().search(filters).write({'read_status':True})

            db_filters = [('sender', 'in', [sender, to]), ('to', 'in', [to, sender])]
            count = req_env['odoochat.messages'].search_count(db_filters)
            offset = count - 20
            if offset < 1:
                offset = 1
            messages = req_env['odoochat.messages'].search(db_filters, offset=offset)
            props = ['sender', 'to', 'content', 'create_date']
            messages_obj = ws_methods.objects_list_to_json_list(messages, props)
            return ws_methods.http_response('', messages_obj)
        except:
            return ws_methods.handle()

    @http.route('/set-message-status', type="http", csrf=False, auth='public', cors='*')
    def setMessageStatus(self, **kw):
        try:
            uid = ws_methods.check_auth(kw)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            message_id = kw.get('message_id')
            filters = [('id', '=', message_id)]
            req_env['odoochat.messages'].sudo().search(filters).write({'read_status': True})
            return ws_methods.http_response('', 'ok')
        except:
            return ws_methods.handle()

    @http.route('/get-messages', type="http", csrf=False, auth='public', cors='*')
    def getFiteredMessages(self, **kw):
        try:
            values = json.loads(kw['user'])
            filter = values.get('filter')
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env

            sender = filter.get('sender')
            to = filter.get('to')

            db_filters = [('sender', 'in', [sender,to]),('to', 'in', [to,sender])]
            messages = req_env['odoochat.messages'].search(db_filters)
            props = ['sender', 'to', 'content']
            messages_obj = ws_methods.objects_list_to_json_list(messages, props)
            return ws_methods.http_response('', messages_obj)
        except:
            return ws_methods.handle()

    @http.route('/save-message', type="json", csrf=False, auth='public', cors='*')
    def set(self):
        try:
            values = request.jsonrequest
            req_env = http.request.env
            sender = values.get('sender')
            to = values.get('to')
            content = values.get('content')
            message = req_env['odoochat.messages'].sudo().create({'sender': sender, 'to': to, 'content': content})
            return ws_methods.http_response('',  message.id)
        except:
            return ws_methods.handle()