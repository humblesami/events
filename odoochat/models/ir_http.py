import odoo
from odoo import models, http
from odoo.addons.dn_base import ws_methods
# from odoo.addons.dn_auth.models.ir_http import dn_auth_Http

class chat_Http(models.AbstractModel):
    _inherit = 'ir.http'
    def session_info(self):        
        user_info = super(chat_Http, self).session_info()
        user = user_info['user']
        user_data = self.get_user_data(user)
        data_for_socket = [{'name': 'add_user_in_list', 'audience': user_data['friendIds'], 'data': user_data}]
        res = ws_methods.emit_event(data_for_socket)
        return user_info

    def get_user_data(self, values):
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
        meeting_group = req_env['res.groups'].search(filters)
        filters = [('groups_id', 'in', [meeting_group.id]), ('active', '=', True), ('id', '!=', uid)]
        mp_users = req_env['res.users'].search(filters)
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
                     'unseen': unseenMessages, 'user': values}

        return user_data