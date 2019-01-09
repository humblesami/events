import odoo
import string
import random
import requests
from odoo import http
from odoo.addons.dn_base import ws_methods

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
                    token = spuser.token
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
            if uid:
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
            return ws_methods.http_response('', {'db': db, 'token': token, 'name': user.name, 'id':user.id, 'photo': user_photo,'groups':groups })
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

    @http.route('/ws/note', type="http", csrf=False,  auth='public', cors='*')
    def note(self, **kw):
        try:
            request = http.request
            res = request.env['dn_base.notification.status'].get_my_notifications()
            return res
        except:
            ws_methods.handle()


    @http.route('/ws/verifytoken-socket', type="json", csrf=False,  auth='public', cors='*')
    def verifyTokenSocket(self, **kw):
        try:
            request = http.request
            kw = request.jsonrequest
            auth = kw.get('auth')
            if not auth:
                auth = kw
            uid = self.verifyToken(auth)
            if type(uid) is not int:
                #If its not number then uid must be an error string
                return ws_methods.http_response(uid)

            req_env = request.env
            filters = [('user_id', '=', uid),('counter','>',0)]

            note_statuses = req_env['dn_base.notification.status'].sudo().search(filters)
            props = ['counter', 'user_id', 'notification_id']
            status_list = ws_methods.objects_list_to_json_list(note_statuses, props)
            notificationList = ws_methods.my_notifications_on_record()
            for note in status_list:
                filters = [('id', '=', note['notification_id'].id),('parent_id','=',False),('parent_model','=',False)]
                note_data = req_env['dn_base.notification'].search(filters, order='create_date desc')
                if note_data:
                    props = ['id', 'content', 'res_model', 'res_id', 'parent_model', 'parent_id', 'client_route']
                    notification_object = ws_methods.object_to_json_object(note_data[0], props)
                    notification_object['counter'] = note['counter']
                    notification_object['user_id'] = note['user'].id
                    notificationList.append(notification_object)

            friendIds = []
            friendList = {}
            meetingList = []
            unseenMessages = 0
            partner_id = req_env.user.partner_id.id
            filters = [('partner_ids', 'in', [partner_id]), ('publish', '=', True), ('archived', '=', False)]
            meetings = request.env['calendar.event'].search(filters)

            base_url = req_env['ir.config_parameter'].sudo().get_param('web.base.url')
            for obj in meetings:

                attendees = []
                for partner in obj.partner_ids:
                    obj_id = partner.user_id.id
                    if obj_id != uid and obj_id not in friendIds:
                        friendObj = partner.user_id
                        friend = {
                            'id': friendObj.id,
                            'name' : friendObj.name,
                            'photo': base_url + '/dn/content_file/res.users/'+str(friendObj.id)+'/image_small',
                        }
                        if friendObj.has_group('meeting_point.group_meeting_staff') or friendObj.has_group('meeting_point.group_meeting_admin'):
                            friend['type'] = 'staff'
                        else:
                            friend['type'] = 'director'

                        db_filters = [('sender', '=', friend['id']), ('to', '=', uid), ('read_status', '=', False)]
                        friend['unseen'] = req_env['odoochat.messages'].sudo().search_count(db_filters)
                        unseenMessages += friend['unseen']

                        friendList[friend['id']] = friend
                        friendIds.append(friendObj.id)
                    attendees.append(partner.user_id.id)

                event = {
                    'id' : obj.id,
                    'name' : obj.name,
                    'attendees' : attendees
                }
                meetingList.append(event)

            res = {'notifications': notificationList, 'meetings': meetingList, 'friends': friendList,
                   'unseen': unseenMessages}
            return ws_methods.http_response('', res)
        except:
            return ws_methods.handle()

    @http.route('/ws/verifytoken', type="http", csrf=False, auth='public', cors='*')
    def verifyTokenHttp(self, **kw):
        try:
            values = kw
            uid = self.verifyToken(values)
            if type(uid) is not int:
                return ws_methods.http_response(uid)
            else:
                return ws_methods.http_response('', 'ok')
        except:
            return ws_methods.handle()