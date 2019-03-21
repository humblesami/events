import sys
import json
import odoo
import random
import string
import requests
import traceback
from odoo import http
from dateutil import parser
from datetime import datetime
from odoo.addons.dn_base import ws_methods
from odoo.addons.dn_auth import dn_auth_vars
from dateutil.relativedelta import relativedelta
from odoo.addons.auth_signup.controllers.main import AuthSignupHome

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
            from odoo import tools
            request.httprequest.url_root = tools.config['server_web_url']
            try:
                uid = request.session.authenticate(db, login, password)
            except:
                return ws_methods.http_response('Error in config, Database '+db+' does not exist')
            if not uid:
                return ws_methods.http_response('Invalid credentials')

            token = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(10))
            request.token = token
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
                request.conf = {'uid': uid, 'db': request.db, 'token': token}
            user_photo = ws_methods.mfile_url('res.users','image_small', uid, 'image')
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
            if http.request.uid and http.request.uid!=4:
                uid = http.request.uid
            else:
                uid = self.verifyToken(values)
            if type(uid) is not int:
                return ws_methods.http_response(uid)
            else:
                values['uid'] = uid
                values['id'] = uid
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
        return {'user' : values}

class AuthSession(AuthSignupHome):

    def login_info_to_json(self, login, gmt):
        login_time = self.get_gtm_datetime_string(login.create_date, gmt * -1)
        object = {
            'name': login.user_id.name,
            'id': login.user_id.id,
            'email': login.user_id.login,
            'login_time': login_time,
            'platform': login.platform,
            'browser': login.browser,
            'ip': login.ip,
            'location': login.location,
        }
        return object

    def get_gtm_datetime_string(self, date_from, gmt):
        date_from = parser.parse(date_from) + relativedelta(hours=gmt)
        date_from = date_from.strftime('%Y-%m-%d %H:%M:%S')
        return date_from

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

    @http.route()
    def web_login(self, *args, **kw):
        request = http.request
        user_id = request.session.uid
        # if user_id:
        #     request.params['login_success'] = True
        #     return redirect('/web')
        response = super(AuthSession, self).web_login(*args, **kw)
        if request.db:
            uid = request.session.uid
            http_req = request.httprequest
            if uid:
                token = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(10))
                custom_user_model = request.env['dnspusers']
                user = custom_user_model.sudo().search([('user_id', '=', uid)])
                if not user:
                    user = custom_user_model.sudo().create({'user_id': uid, 'auth_token': token})
                else:
                    user.sudo().auth_token = token

                agent = http_req.user_agent
                #ip = request.httprequest.environ['REMOTE_ADDR']
                ip = http_req.environ.get('HTTP_X_FORWARDED_FOR') or http_req.environ.get('REMOTE_ADDR')
                location = self.get_location(ip)
                vals = {
                    'browser': agent.browser,
                    'platform': agent.platform,
                    'user_id' : user_id,
                    'ip': ip,
                    'location' : location,
                    'session':request.session.sid
                        }
                try:
                    d = request.env['login.info'].create(vals)
                    d = 1
                except:
                    eg = traceback.format_exception(*sys.exc_info())
                    errorMessage = ''
                    for er in eg:
                        errorMessage += "\n" + er
                        ws_methods.log_error("login.info create"+ errorMessage)
                session_array = dn_auth_vars.dn_sessions
                if not request.db in session_array:
                    session_array[request.db] = {}
                timenow = datetime.now()
                uid = request.session.uid
                uid = 'u' + str(uid)
                session_array[request.db][uid] = {'sid': request.session.sid, 'last_activity': timenow}
                dn_auth_vars.dn_sessions = session_array
                d = 1
            return response
        else:
            return "Database is under maintenance"

    @http.route('/dn_auth/site_users', csrf=False)
    def get_site_users(self, **kw):
        rows = http.request.env['res.users'].search([('active', '=', True)]).sorted(key=lambda p: (p.name))
        users = []
        for user in rows:
            users.append({'id': user.id, 'name': user.name, 'email': user.login})
        return ws_methods.http_response('', users)

    @http.route('/dn_auth/login_info', csrf=False)
    def get_login_info(self, **kw):
        try:
            if 'input_data' in kw:
                kw = kw['input_data']
            gmt = 0
            filters = []
            req_env = http.request.env
            if kw:
                kw = json.loads(kw)
            if 'gmt' in kw:
                gmt = kw['gmt']
                try:
                    gmt = int(gmt)
                except:
                    d = 1;
            if 'user_ids' in kw:
                user_ids = kw['user_ids']
                filters.append(('user_id', 'in', user_ids))
            interval_type = False
            if 'interval_type' in kw:
                interval_type = kw['interval_type']
                if interval_type == "Duration" and 'duration_type' in kw and 'interval' in kw:
                    duration_type = kw['duration_type']
                    interval = kw['interval']
                    from_time = False
                    try:
                        interval = int(interval)
                    except:
                        d = 1;
                    if duration_type == "Hours":
                        from_time = datetime.now() - relativedelta(hours=interval)
                    if duration_type == "Months":
                        from_time = datetime.now() - relativedelta(months=interval)
                    if duration_type == "Days":
                        from_time = datetime.now() - relativedelta(days=interval)
                    if from_time:
                        from_time = from_time.strftime('%Y-%m-%d %H:%M:%S')
                        filters.append(('create_date', '>=', from_time))
                elif interval_type == "Date":
                    if 'date_from' in kw:
                        date_from = self.get_gtm_datetime_string(kw['date_from'], gmt)
                        filters.append(('create_date', '>=', date_from))
                    if 'date_to' in kw:
                        date_to = self.get_gtm_datetime_string(kw['date_to'], gmt)
                        if date_from == date_to:
                            date_to = parser.parse(date_to) + relativedelta(hours=24)
                            date_to = date_to.strftime('%Y-%m-%d %H:%M:%S')
                        filters.append(('create_date', '<=', date_to))
            else:
                from_time = datetime.now() - relativedelta(days=2)
                from_time = from_time.strftime('%Y-%m-%d %H:%M:%S')
                filters.append(('create_date', '>=', from_time))

            rows = []
            if req_env.user.id != 1:
                filters.append(('user_id', '!=', 1))
            if 'grouped' in kw or 'unique_user' in kw:
                rows = req_env['login.info'].search(filters, order='user_id,create_date desc')
            else:
                rows = req_env['login.info'].search(filters, order='create_date desc')
            logins = []

            if 'grouped' in kw:
                last_user_id = False
                for login in rows:
                    if login.user_id:
                        login_time = self.get_gtm_datetime_string(login.create_date, gmt * -1)
                        if last_user_id != login.user_id.id:
                            last_user = {
                                'name': login.user_id.name,
                                'id': login.user_id.id,
                                'email': login.user_id.login,
                                'last_login': {
                                    'login_time': login_time,
                                    'platform': login.platform,
                                    'browser': login.browser,
                                    'ip': login.ip,
                                    'location': login.location,
                                },
                                'prev_logins': []
                            }
                            last_user_id = login.user_id.id
                            logins.append(last_user)
                        else:
                            last_user['prev_logins'].append(
                                {
                                    'login_time': login_time,
                                    'platform': login.platform,
                                    'browser': login.browser,
                                    'ip': login.ip,
                                    'location': login.location,
                                }
                            )

            else:
                last_user_id = False
                for login in rows:
                    if login.user_id:
                        if 'unique_user' in kw:
                            if login.user_id.id != last_user_id:
                                last_user_id = login.user_id.id
                                user = self.login_info_to_json(login, gmt)
                                logins.append(user)
                        else:
                            user = self.login_info_to_json(login, gmt)
                            logins.append(user)
            return ws_methods.http_response('', logins)
        except:
            return ws_methods.handle()

    @http.route('/dn_auth/get_last_two_logins', csrf=False)
    def profile_login(self, **kw):
        try:
            uid = kw['uid']
            filters = [('user_id', '=', int(uid))]
            model = http.request.env['login.info']
            rows = model.search(filters, limit=2, order='create_date desc')
            gmt = int(kw['gmt'])
            last = True
            result = {}

            for login in rows:
                if login.user_id:
                    info = self.login_info_to_json(login, gmt)
                    if last:
                        result['last'] = info
                        last = False
                    else:
                        result['second_last'] = info
            if not 'last' in result:
                result = "No login data"
            return ws_methods.http_response('', result)
        except:
            return ws_methods.handle()