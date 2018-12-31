import json
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
            db = False
            if not 'db' in values:
                return ws_methods.http_response('No database selected')
            else:
                db = values['db']
            if 'data' in values:
                values = values['data']
            if not 'login' in values or 'password' not in values:
                return ws_methods.http_response('Please provide login and password')
            login = values['login']
            password = str(values['password'])

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
                    d = request.env['login.info'].create(vals)
                    d = 1
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

    @http.route('/ws/verifytoken', type="http", csrf=False, auth='public', cors='*')
    def verifyToken(self, **kw):
        try:
            request = http.request
            if request.uid and request.uid != 4:
                return ws_methods.http_response('','ok')
            values = kw
            token = values.get('token')
            if not token:
                return ws_methods.http_response('Token Not Given')
            token = str(token)
            stuid = values.get('id')
            uid = int(stuid)
            req_env = request.env
            filters = [('auth_token', '=', token),('user_id','=', uid)]
            user = req_env['dnspusers'].sudo().search(filters)
            if not user:
                return ws_methods.http_response('Token not valid for user '+stuid)

            values['login'] = user.login
            values['password'] = user.password

            uid = ws_methods.authenticate(values)
            req_env = request.env
            filters = [('user_id', '=', uid),('read_status','=',False)]

            note_statuses = req_env['dn_base.notification.status'].sudo().search(filters)
            props = ['id', 'read_status', 'user_id', 'notification_id']
            status_list = ws_methods.objects_list_to_json_list(note_statuses, props)
            notificationList = []
            for note in status_list:
                note_data = req_env['dn_base.notification'].search([('id','=',note['notification'].id)], order='create_date desc')
                props = ['id', 'content', 'res_model', 'res_id', 'client_route']
                notification_object = ws_methods.object_to_json_object(note_data[0], props)
                notification_object['read_status'] = note['read_status']
                notification_object['user_id'] = note['user'].id
                notificationList.append(notification_object)

            friendIds = []
            friendList = []
            meetingList = []
            partner_id = req_env.user.partner_id.id
            filters = [('partner_ids', 'in', [partner_id]), ('publish', '=', True), ('archived', '=', False)]
            meetings = request.env['calendar.event'].search(filters)

            base_url = req_env['ir.config_parameter'].sudo().get_param('web.base.url')
            for obj in meetings:

                attendees = []
                for partner in obj.partner_ids:

                    if partner.user_id.id not in friendIds:
                        friendObj = partner.user_id
                        friend = {
                            'id': friendObj.id,
                            'name' : friendObj.name,
                            'image': base_url + '/dn/content_file/res.users/'+str(friendObj.id)+'/image_small',
                        }
                        if friendObj.has_group('meeting_point.group_meeting_staff'):
                            friend['type'] = 'staff'
                        else:
                            friend['type'] = 'director'

                        db_filters = [('sender', '=', friend['id']), ('to', '=', uid), ('read_status', '=', False)]
                        friend['unseen'] = req_env['odoochat.messages'].sudo().search_count(db_filters)

                        friendList.append(friend)
                        friendIds.append(friendObj.id)

                    attendees.append(partner.user_id.id)

                event = {
                    'id' : obj.id,
                    'name' : obj.name,
                    'attendees' : attendees
                }
                meetingList.append(event)

            return ws_methods.http_response('', {'notifications': notificationList, 'meetings': meetingList, 'friends': friendList})
        except:
            return ws_methods.handle()