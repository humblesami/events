import json
from odoo import http
from odoo.http import request
from odoo.addons.dn_base import ws_methods

class Oddochat(http.Controller):

    @http.route('/active-user-messages-json', type="json", csrf=False, auth='public', cors='*')
    def getActiveUserMessage_json_request(self, **kw):
        kw = request.jsonrequest
        res = getActiveUserMessage(kw)
        return res['data']

    @http.route('/active-user-messages', type="http", csrf=False, auth='public', cors='*')
    def getActiveUserMessage_http_request(self, **kw):
        res = getActiveUserMessage(kw)
        return res['data']

    @http.route('/set-message-status', type="http", csrf=False, auth='public', cors='*')
    def setMessageStatus(self, **kw):
        try:
            uid = ws_methods.check_auth(kw)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            message_id = kw.get('message_id')
            filters = [('id', '=', message_id)]
            res = req_env['odoochat.messages'].sudo().search(filters).write({'read_status': True})
            return ws_methods.http_response('', 'ok')
        except:
            return ws_methods.handle()

    @http.route('/save-message', type="json", csrf=False, auth='public', cors='*')
    def set(self):
        try:
            kw = request.jsonrequest
            auth = kw.get('auth')
            if not auth:
                auth = kw
            uid = ws_methods.check_auth(auth)
            if not uid:
                return ws_methods.not_logged_in()
            values = kw.get('req_data')
            if not values:
                values = kw
            res = save_messages(values)
            return res['data']
        except:
            return ws_methods.handle()

def save_messages(values):
    try:
        req_env = http.request.env
        sender = values.get('sender')
        to = values.get('to')
        content = values.get('content')
        message = req_env['odoochat.messages'].sudo().create({'sender': sender, 'to': to, 'content': content})
        props = ['content', 'id', 'create_date', 'read_status', 'sender', 'to']
        message = ws_methods.object_to_json_object(message, props)
        res = ws_methods.http_response('', message)
        res = {
            'events': [
                {'data': res, 'event': 'message', 'audience': [message['to']]}
            ],
            'data': res
        }
        return res
    except:
        return ws_methods.handle()

def getActiveUserMessage(kw):
    try:
        if (kw.get('user')):
            kw = json.loads(kw.get('user'))
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
        res = ws_methods.http_response('', messages_obj)
        res = {
            'events': [
                {'data': res, 'event': 'allMessages', 'audience': [sender]}
            ],
            'data': res
        }
        return res
    except:
        return ws_methods.handle()