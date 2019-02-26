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