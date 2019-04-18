import json
from odoo import http
from odoo.http import request
from odoo.addons.dn_base import ws_methods
from odoo.exceptions import ValidationError
from odoo.addons.dn_auth.controllers.ctl_auth import auth

class OdooChatAuth(auth):

    def get_user_data(self, values):
        res = super(OdooChatAuth, self).get_user_data(values)

        req_env = http.request.env
        uid = req_env.user.id
        method_to_call = getattr(req_env['notification'], 'getMyNotifications')
        notificationList = method_to_call(values)

        friendIds = []
        friendList = {}
        unseenMessages = 0

        web_url = ws_methods.get_main_url()
        image_path1 = web_url + '/image/res.users/'
        image_path2 = '/image_small/' + values['db'] + '/' + values['token']

        filters = [('name', '=', 'MeetingPoint')]
        meeting_group = request.env['res.groups'].search(filters)
        filters = [('groups_id', 'in', [meeting_group.id]), ('active', '=', True), ('id', '!=', uid)]
        mp_users = request.env['res.users'].search(filters)
        for friendObj in mp_users:
            friend = {
                'id': friendObj.id,
                'name': friendObj.name,
                'photo': image_path1 + str(friendObj.id) + image_path2
            }
            if friendObj.has_group('meeting_point.group_meeting_staff') or friendObj.has_group(
                    'meeting_point.group_meeting_admin'):
                friend['type'] = 'staff'
            else:
                friend['type'] = 'director'

            db_filters = [('sender', '=', friend['id']), ('to', '=', uid), ('read_status', '=', False)]
            friend['unseen'] = req_env['odoochat.message'].search_count(db_filters)
            unseenMessages += friend['unseen']
            friendList[friend['id']] = friend
            friendIds.append(friend['id'])

        user_data = {'notifications': notificationList, 'friends': friendList, 'friendIds': friendIds,
                     'unseen': unseenMessages, 'user': res['user']}
        res = user_data
        if not values.get('on_restart'):
            data_for_socket = [{'name': 'add_user_in_list', 'audience': friendIds, 'data': user_data}]
            res = ws_methods.emit_event(data_for_socket)
            if res != 'done':
                raise ValidationError(res)
            else:
                res = values
        return res

class OdooChat(http.Controller):

    @http.route('/messege_request', type='http', csrf=False, auth='public', cors='*')
    def messege_request(self, **kw):
        try:
            kw = json.loads(kw['data'])
            auth = kw.get('auth')
            if not auth:
                auth = kw
            uid = ws_methods.check_auth(auth)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            values = kw.get('req_data')
            if not values:
                values = kw
            values['uid'] = uid
            args = kw.get('args')
            model = args.get('model')
            method = args.get('method')

            if not model or not method:
                return ws_methods.http_response('Please provide valid args')

            method_to_call = getattr(req_env[model], method)
            events = method_to_call(values)
            res = ws_methods.emit_event(events)
            if res == 'done':
                return ws_methods.http_response('', events[0]['data'])
            else:
                return ws_methods.http_response(model + '.' + method + ' processed but ' + str(res))
        except:
            return ws_methods.handle()

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
            message_id = int(message_id)
            filters = [('id', '=', message_id)]
            message = req_env['odoochat.message'].sudo().search(filters)
            if message:
                message.read_status = True
            else:
                return ws_methods.http_response('Invalid message id => '+ str(message_id))
            return ws_methods.http_response('', 'done')
        except:
            return ws_methods.handle()

    @http.route('/get-user-messages-json', type="json", csrf=False, auth='public', cors='*')
    def getUserMessages_json_request(self, **kw):
        kw = request.jsonrequest
        res = self.getUserMessages(kw)
        return res

    @http.route('/get-user-messages', type="http", csrf=False, auth='public', cors='*')
    def getUserMessages_http_request(self, **kw):
        res = self.getUserMessages(kw)
        return res

    def getUserMessages(self, kw):
        try:
            if (kw.get('user')):
                kw = json.loads(kw.get('user'))
            uid = ws_methods.check_auth(kw)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env

            sender = uid
            to = kw.get('target_id')
            to = int(to)
            offset = kw.get('offset')            

            db_filters = [('sender', 'in', [sender, to]), ('to', 'in', [to, sender])]
            count = req_env['odoochat.message'].search_count(db_filters)
            if not offset:
                offset = 0
            else:
                offset = int(offset)
                if offset < 0:
                    offset = 0
                elif offset > count:
                    return ws_methods.http_response('', [])
            
            messages = req_env['odoochat.message'].search(db_filters, offset=offset, limit=20)
            props = ['sender', 'to', 'content', 'create_date']
            messages_obj = ws_methods.objects_list_to_json_list(messages, props)

            filters = [('sender','=',to), ('to','=',sender), ('read_status', '=', False)]
            try:
                req_env['odoochat.message'].search(filters).write({'read_status':True})
            except:
                a = 1
            res = ws_methods.http_response('', messages_obj)
            return res
        except:
            return ws_methods.handle()