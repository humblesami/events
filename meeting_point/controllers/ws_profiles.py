import base64

import requests
from odoo import http
from dateutil import parser
from odoo.addons.dn_base import ws_methods
from dateutil.relativedelta import relativedelta


class ws_profile(http.Controller):
    @http.route('/ws/profiles', type="http", csrf=False, auth='none', cors='*')
    def get_profiles_http(self, **kw):
        return self.get_profiles(kw)

    @http.route('/ws/profiles-json', type="json", csrf=False, auth='none', cors='*')
    def get_profiles_json(self, **kw):
        reqBody = http.request.jsonrequest
        return self.get_profiles(reqBody)

    def get_profiles(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            limit = 0
            offset = 0
            if 'paging' in values:
                offset = values['paging']['offset']
                limit = values['paging']['limit']

            filter = [('groups_id.category_id.name','=','MeetingPoint'),('groups_id.name','=','Director')]
            total_cnt = len(req_env['meeting_point.users'].search(filter))
            profiles = req_env['meeting_point.users'].search(filter, offset=offset, limit=limit)
            current_cnt = len(profiles)
            profiles_json = []
            for profile in profiles:
                props = ['id', 'name', 'email', 'nick_name', 'website',
                         'companies', 'bio', 'mobile_phone', 'work_phone',
                         'fax', 'job_title', 'department', 'board_joing_date',
                         'admin_first_name',
                         'admin_last_name',
                         'admin_image',
                         'admin_nick_name',
                         'admin_email',
                         'admin_fax',
                         'admin_cell_phone',
                         'admin_work_phone',
                         'mail_to_assistant',
                         'image_small',
                         'image_medium'
                         ]
                profile_json = ws_methods.object_to_json_object(profile, props)
                if profile.committee_ids:
                    committees = ws_methods.objects_list_to_json_list(profile.committee_ids, ['id', 'name'])
                    profile_json['committees'] = committees
                else:
                    profile_json['committees'] = []

                profiles_json.append(profile_json)

            profiles_json = {'records':profiles_json, 'total':total_cnt, 'count':current_cnt}
            return ws_methods.http_response('', profiles_json)
        except:
            return ws_methods.handle()

    @http.route('/ws/profile', type="http", csrf=False, auth='none', cors='*')
    def get_my_profile_http(self, **kw):
        return self.get_my_profile(kw)

    @http.route('/ws/profile-json', type="json", csrf=False, auth='none', cors='*')
    def get_my_profile_json(self, **kw):
        reqBody = http.request.jsonrequest
        return self.get_my_profile(reqBody)

    def get_my_profile(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            mp_user_id = 0
            if 'data' in  values:
                values = values['data']
            if 'id' in values:
                mp_user_id = values['id']

            next = False
            prev = False

            if mp_user_id:
                profile = req_env['meeting_point.users'].search([('id','=',mp_user_id)])
                prev = req_env['meeting_point.users'].search([('id','<',values['id'])], limit=1, order='id desc')
                next = req_env['meeting_point.users'].search([('id','>',values['id'])], limit=1, order='id')
                next = next.id
                prev = prev.id
            else:
                profile = req_env['meeting_point.users'].search([('user_id', '=', uid)])
            if not profile:
                return ws_methods.http_response('User not in meeting point')

            props = ['id', 'name', 'image_medium', 'resume', 'email', 'nick_name', 'website', 'companies', 'bio', 'mobile_phone', 'work_phone',
                     'fax', 'job_title', 'department', 'board_joing_date', 'admin_first_name', 'admin_last_name',
                     'admin_image', 'admin_nick_name', 'admin_email', 'admin_fax', 'admin_cell_phone',
                     'admin_work_phone', 'mail_to_assistant']

            committees = ws_methods.objects_list_to_json_list(profile.committee_ids, ['id', 'name'])
            profile_json = ws_methods.object_to_json_object(profile, props)
            profile_json['committees'] = committees

            dnspuser = req_env['dnspusers'].search([('user_id','=', uid)])
            sign = dnspuser.signature
            if sign:
                profile_json['signature'] = sign.decode('utf-8')


            gmt = 0
            if 'gmt' in values:
                gmt = values['gmt']
            if mp_user_id:
                mp_user_id = int(mp_user_id)
                uid = req_env['res.users'].search([('mp_user_id','=', mp_user_id)]).id
            profile_json['login'] = self.last_login(uid, gmt)

            data = {"profile": profile_json, "next":next, "prev":prev}
            return ws_methods.http_response('', data)
        except:
            return ws_methods.handle()

    @http.route('/profile/get_signature', type="http", csrf=False, auth='none', cors='*')
    def profile_signature_http(self, **kw):
        return self.profile_signature_get(kw)

    @http.route('/profile/get_signature-json', type="json", csrf=False, auth='none', cors='*')
    def profile_signature_json(self, **kw):
        reqBody = http.request.jsonrequest
        return self.profile_signature_get(reqBody)

    def profile_signature_get(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            user = req_env['dnspusers'].search([('user_id','=',uid)])
            if not user:
                user = req_env['dnspusers'].create({'user_id':uid})

            sign =  user.signature
            if sign:
                sign = sign.decode('utf-8')
            sign = {'signature' : sign }
            return ws_methods.http_response('', sign)
        except:
            ws_methods.handle()

    @http.route('/profile/save_signature', type="http", csrf=False, auth='none', cors='*')
    def profile_signature_save_http(self, **kw):
        return self.profile_signature_save(kw)

    @http.route('/profile/save_signature-json', type="json", csrf=False, auth='none', cors='*')
    def profile_signature_save_json(self, **kw):
        reqBody = http.request.jsonrequest
        return self.profile_signature_save(reqBody)

    def profile_signature_save(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            if 'data' in values:
                values = values['data']

            req_env = http.request.env
            user = req_env['dnspusers'].search([('user_id', '=', uid)])
            user.signature = values['binary_signature']
            return ws_methods.http_response('', "ok")
        except:
            ws_methods.handle()

    def last_login(self, uid, gmt=0):
        filters = [('user_id', '=', uid)]
        model = http.request.env['login.info']
        rows = model.search(filters, limit=2, order='create_date desc')

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
        return result

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

    @http.route('/ws/change-profile', type="http", csrf=False, auth='none', cors='*')
    def change_profile_http(self, **kw):
        return self.change_profile(kw)

    @http.route('/ws/change-profile-json', type="json", csrf=False, auth='none', cors='*')
    def change_profile_json(self, **kw):
        reqBody = http.request.jsonrequest
        return self.change_profile(reqBody)

    def change_profile(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()

            req_env = http.request.env
            mp_id = req_env.user.mp_user_id.id
            user = req_env['meeting_point.users'].search([('id', '=', mp_id)])

            if 'data' in values:
                values = values['data']

            # for key in values:
            #     if key not in ('token','db','id', 'email', 'board_joing_date') and key in user and user[key] != values[key]:
            #         if not user[key] and values[key] == '':
            #             donothing = 1
            #         else:
            #             val = values[key]
            #             modified_values[key] = val

            modified_values = {}
            for field in user._fields:
                val = values.get(field)
                if val:
                    modified_values[field] = val

            image_small = values.get('image_small')
            if image_small:
                image_small = image_small.replace('data:image/png;base64,','')
                modified_values['image_small'] = image_small
            image_medium = values.get('image_medium')
            if image_medium:
                image_medium = image_medium.replace('data:image/png;base64,', '')
                modified_values['image_medium'] = image_medium
            admin_image = values.get('admin_image')
            if admin_image:
                admin_image = admin_image.replace('data:image/png;base64,', '')
                modified_values['admin_image'] = admin_image
            user.write(modified_values)
            return ws_methods.http_response('', 'Success')
        except:
            return ws_methods.handle()

    def decode_base64(self, data):
        """Decode base64, padding being optional.

        :param data: Base64 data as an ASCII byte string
        :returns: The decoded byte string.

        """
        missing_padding = len(data) % 4
        if missing_padding != 0:
            data += b'=' * (4 - missing_padding)
        return base64.decodestring(data)
