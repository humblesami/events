import json
import odoo
import string
import random
import requests
from odoo import http
from odoo.addons.dn_base import ws_methods
from odoo.exceptions import ValidationError


class auth(http.Controller):
    @http.route('/ws/authenticate', type="http", csrf=False, auth='none', cors='*')
    def authenticate_http(self, **kw):
        return self.authenticate(kw)

    @http.route('/ws/authenticate-json', type="json", csrf=False, auth='none', cors='*')
    def authenticate_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.authenticate(req_body)

    def authenticate(self, values):
        try:
            db = values.get('db')
            if not 'db' in values:
                return ws_methods.http_response('No database selected')
            if 'data' in values:
                values = values['data']

            login = values.get('login')
            password = values.get('password')
            if not login or not password:
                return ws_methods.http_response('Please provide login and password')
            password = str(password)

            request = http.request
            try:
                uid = request.session.authenticate(db, login, password)
            except:
                return ws_methods.http_response('Error in config, Database '+db+' does not exist')
            if not uid:
                return ws_methods.http_response('Invalid credentials')

            token = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(10))
            custom_user_model = request.env['dnspusers'].sudo()
            spuser = custom_user_model.search([('user_id', '=', uid)])
            if not spuser:
                spuser = custom_user_model.create({'user_id': uid, 'login' : login, 'auth_token' : token, 'password' : password})
            else:
                try:
                    spuser.write({'auth_token' : token, 'login' : login, 'password' : password })
                except:
                    token = spuser.auth_token
                    a = 1

            user = spuser.user_id
            app_name = values.get('app_name')
            groups = []
            for group in  user.groups_id:
                if app_name:
                    if app_name not in group.full_name:
                        continue
                    else:
                        groups.append(group.full_name)
                else:
                    groups.append(group.full_name)
            if not hasattr(request, 'conf'):
                request.conf = {'host_url': request.httprequest.host_url, 'uid': uid, 'db': request.db, 'token': token}
            user_photo = ws_methods.mfile_url('res.users','image_small', uid)
            http_req = request.httprequest
            agent = http_req.user_agent
            ip = 'local'
            location = ''
            local_env = odoo.tools.config.get('local_env')
            if local_env != 'yes':
                ip = http_req.environ.get('HTTP_X_FORWARDED_FOR') or http_req.environ.get('REMOTE_ADDR')
                location = self.get_location(ip)
            vals = {
                'browser': agent.browser,
                'platform': agent.platform,
                'user_id': uid,
                'ip': ip,
                'location': location,
                'session': request.session.sid
            }
            try:
                request.env['login.info'].create(vals)
            except:
                return ws_methods.handle()
            data = {'db': db, 'token': token, 'name': user.name, 'id':user.id, 'photo': user_photo,'groups':groups }
            # authenticate
            res = self.get_user_data(data)
            return ws_methods.http_response('', res)
        except:
            return ws_methods.handle()

    def get_location(self, ip):
        url = "https://ipapi.co/" + ip + '/json'
        res = ''
        try:
            data = requests.get(url).json()

            city = data['city']
            region = data['region']
            #country = data['country']
            res = region +" " +city # +"," + country
        except:
            res = ''
        return res

    def verifyToken(self, values):
        request = http.request
        token = values.get('token')
        uid = values.get('id')
        if not uid:
            uid = values.get('uid')
        if not token or not uid:
            return 'Token or id Not Given'
        token = str(token)
        uid = int(uid)

        req_env = request.env
        filters = [('auth_token', '=', token), ('user_id', '=', uid)]
        user = req_env['dnspusers'].sudo().search(filters)
        if not user:
            str_uid = str(uid)
            return 'Token not valid for user ' + str_uid

        values['login'] = user.login
        values['password'] = user.password
        uid = ws_methods.authenticate(values)
        return uid

    @http.route('/ws/verifytoken', type="http", csrf=False, auth='public', cors='*')
    def verifyTokenHttp(self, **kw):
        try:
            values = kw
            uid = self.verifyToken(values)
            if type(uid) is not int:
                return ws_methods.http_response(uid)
            else:
                values['uid'] = uid
                values['verify_token'] = 1
                # verify-token
                res = self.get_user_data(values)
                return ws_methods.http_response('', res)
        except:
            return ws_methods.handle()

    @http.route('/on_socket_server_restart', type='http', csrf=False, auth='public', cors='*')
    def socket_request_http(self, **kw):
        try:
            values = json.loads(kw['data'])
            uid = self.verifyToken(values)
            if type(uid) is not int:
                return ws_methods.http_response(uid)
            else:
                values['uid'] = uid
                values['on_restart'] = 1
                #on-restart
                res = self.get_user_data(values)
                return ws_methods.http_response('', res)
        except:
            return ws_methods.handle()

    def get_user_data(self, values):
        try:
            request = http.request
            req_env = request.env
            uid = int(values['id'])

            method_to_call = getattr(req_env['notification'], 'getMyNotifications')
            notificationList = method_to_call(values)

            friendIds = []
            friendList = {}
            unseenMessages = 0
            partner_id = req_env.user.partner_id.id
            filters = [('partner_ids', 'in', [partner_id]), ('publish', '=', True)]
            meetings = request.env['calendar.event'].search(filters)

            base_url = http.request.httprequest.host_url
            base_url = base_url[:-1]
            image_path1 = base_url + '/dn/content_file/res.users/'
            image_path2 = '/image_small/' + values['db'] + '/' + values['token']

            # meetingList = []
            for obj in meetings:
                for partner in obj.partner_ids:
                    obj_id = partner.user_id.id
                    if obj_id != uid and obj_id not in friendIds:
                        friendObj = partner.user_id
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
            res = user_data
            if not values.get('on_restart'):
                data_for_socket = [{'name': 'add_user_in_list', 'audience': friendIds, 'data': user_data}]
                res = ws_methods.emit_event(data_for_socket)
                if res != 'done':
                    raise ValidationError(res)
                else:
                    res = values
            return res
        except:
            raise