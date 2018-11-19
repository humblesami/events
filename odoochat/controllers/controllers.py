import json
from odoo import http
from odoo.addons.dn_base import ws_methods

class Oddochat(http.Controller):
    @http.route('/get-messages', type="http", csrf=False, auth='public', cors='*')
    def get(self, **kw):
        values = kw
        uid = ws_methods.check_auth(values)
        if not uid:
            return ws_methods.not_logged_in()
        req_env = http.request.env

        sender = values.get('sender')
        to = values.get('to')

        filter = [('sender', '=', sender),('to', '=', to)]
        messages = req_env['odoochat.messages'].search(filter)
        props = ['sender', 'to', 'content', 'write_date']
        messages_obj = ws_methods.objects_list_to_json_list(messages, props)
        return ws_methods.http_response('', messages_obj)

    @http.route('/save-message', type="http", csrf=False, auth='public', cors='*')
    def set(self, **kw):
        values = kw
        uid = ws_methods.check_auth(values)
        if not uid:
            return ws_methods.not_logged_in()
        req_env = http.request.env

        sender = values.get('sender')
        to = values.get('to')
        content = values.get('content')
        msg = req_env['odoochat.messages'].create({'sender': sender, 'to': to, 'content': content})
        return ws_methods.http_response('', msg)