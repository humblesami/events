import json
from odoo import http
from odoo.exceptions import ValidationError
from odoo.http import request
from odoo.addons.dn_base import ws_methods
from odoo.addons.dn_auth.controllers.ctl_auth import auth

class OdooChatAuth(auth):
    a = 1
    def get_user_data(self, values):
        res = super(OdooChatAuth, self).get_user_data(values)

        req_env = http.request.env
        uid = req_env.user.id
        method_to_call = getattr(req_env['notification'], 'getMyNotifications')
        notificationList = method_to_call(values)

        friendIds = []
        friendList = {}
        unseenMessages = 0

        base_url = http.request.httprequest.host_url
        base_url = base_url[:-1]
        image_path1 = base_url + '/dn/content_file/res.users/'
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