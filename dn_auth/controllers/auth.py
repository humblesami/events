import json
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
            uid = http.request.session.authenticate(db, login, password)
            if not uid:
                return ws_methods.http_response('Invalid credentials')

            token = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(10))
            # token = encode('sM:de_', token)
            # password = ws_methods.encode('sM:de_', password)

            custom_user_model = http.request.env['dnspusers']
            user = custom_user_model.sudo().search([('user_id', '=', uid)])

            if not user:
                user = custom_user_model.sudo().create({'user_id':uid, 'login':login, 'password':password,'auth_token':token})
            else:
                user.sudo().write({'login':login, 'password':password,'auth_token':token})

            user = user.user_id
            request = http.request
            http_req = request.httprequest
            if uid:
                agent = http_req.user_agent
                # ip = request.httprequest.environ['REMOTE_ADDR']
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
            return ws_methods.http_response('', {'db': db, 'token': token, 'name': user.name, 'id':user.id, 'photo': ''})
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
    def verifytoken(self, **kw):
        try:
            request = http.request
            values = json.loads(kw['user'])
            if request.uid and request.uid != 4:
                return "1"
            if not values['token']:
                return "Token Not Given"
            db = values['db']
            token = str(values['token'])
            # original_token = decode('sM:de_', token)
            filters = [('auth_token', '=', token)]
            user = request.env['dnspusers'].sudo().search(filters)
            if not user:
                return "Not found"
            # password = decode('sM:de_', password)
            uid = request.session.authenticate(db, user.login, user.password)
            return "1"
        except:
            return "Invalid Token"