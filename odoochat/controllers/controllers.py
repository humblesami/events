import json
from odoo import http
from odoo.http import request
from odoo.addons.dn_base import ws_methods

class Oddochat(http.Controller):

    @http.route('/active-user-messages-json', type="json", csrf=False, auth='public', cors='*')
    def getActiveUserMessage_json_request(self, **kw):
        kw = request.jsonrequest
        res = getActiveUserMessage(kw)
        return res

    @http.route('/active-user-messages', type="http", csrf=False, auth='public', cors='*')
    def getActiveUserMessage_http_request(self, **kw):
        res = getActiveUserMessage(kw)
        return res

    @http.route('/set_message_status', type="http", csrf=False, auth='public', cors='*')
    def set_message_status(self, **kw):
        try:
            if (kw.get('user')):
                kw = json.loads(kw.get('user'))
            uid = ws_methods.check_auth(kw)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            message_id = kw.get('message_id')
            filters = [('id', '=', message_id)]
            req_env['odoochat.message'].sudo().search(filters).write({'read_status': True})
            return ws_methods.http_response('', 'done')
        except:
            ws_methods.handle()




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
        offset = kw.get('offset')

        filters = [('sender','=',to), ('to','=',sender)]
        req_env['odoochat.message'].sudo().search(filters).write({'read_status':True})

        db_filters = [('sender', 'in', [sender, to]), ('to', 'in', [to, sender])]
        count = req_env['odoochat.message'].search_count(db_filters)
        if not offset:
            offset = 20
        elif int(offset) < count:
            offset = int(offset)
        else:
            return ws_methods.http_response('', {})
        offset = count - offset
        if offset < 0:
            offset = 0
        messages = req_env['odoochat.message'].search(db_filters, offset=offset, limit=20)
        props = ['sender', 'to', 'content', 'create_date']
        messages_obj = ws_methods.objects_list_to_json_list(messages, props)
        res = ws_methods.http_response('', messages_obj)
        return res
    except:
        return ws_methods.handle()