import json
from odoo import http
from odoo.addons.dn_base import ws_methods

class Oddochat(http.Controller):
    @http.route('/get-messages', type="http", csrf=False, auth='public', cors='*')
    def get(self, **kw):
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

    @http.route('/save-message', type="http", csrf=False, auth='public', cors='*')
    def set(self, **kw):
        try:
            values = json.loads(kw['user'])
            msg = values.get('msg')
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            sender = msg.get('sender')
            to = msg.get('to')
            content = msg.get('content')
            res = req_env['odoochat.messages'].create({'sender': sender, 'to': to, 'content': content})

            return ws_methods.http_response('', '1')
        except:
            return ws_methods.handle()