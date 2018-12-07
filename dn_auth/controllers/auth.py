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
                spuser.write({'auth_token' : token, 'login' : login, 'password' : password })

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
            values = json.loads(kw['user'])
            if request.uid and request.uid != 4:
                return "1"
            token = values.get('token')
            if not token:
                return "Token Not Given"
            token = str(token)
            stuid = values.get('id')
            uid = int(stuid)
            filters = [('auth_token', '=', token),('user_id','=', uid)]
            user = request.env['dnspusers'].sudo().search(filters)
            if not user:
                return "Token not valid for user "+stuid
            return "1"
        except:
            return "Invalid Token"

    @http.route('/ws/verifytoken-json', type="http", csrf=False, auth='public', cors='*')
    def verifyTokenJosn(self, **kw):
        try:
            request = http.request
            if request.uid and request.uid != 4:
                return "1"
            token = kw.get('token')
            if not token:
                return "Token Not Given"
            token = str(token)
            stuid = kw.get('id')
            uid = int(stuid)
            filters = [('auth_token', '=', token), ('user_id', '=', uid)]
            user = request.env['dnspusers'].sudo().search(filters)
            if not user:
                return "Token not valid for user " + stuid
            return "1"
        except:
            return "Invalid Token"