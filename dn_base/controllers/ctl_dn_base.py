import json
import base64
import requests
import werkzeug
from odoo import http, tools
from odoo.http import request
from werkzeug.utils import redirect
from odoo.exceptions import ValidationError
from odoo.addons.dn_base import dn_dt, ws_methods
from odoo.addons.web.controllers.main import Binary
from odoo.addons.website.controllers.main import Website
from odoo.addons.web.controllers.main import Session, binary_content

class MyWebsite(Website):
    @http.route('/', type='http', auth="public", website=True)
    def index(self):
        request = http.request
        if not request.session.uid:
            return redirect('/web/login')
        else:
            return redirect('/web')

class MySession(Session):
    @http.route(auth="none")
    def logout(self):
        if request.session.uid:
            request.session.logout(keep_db=True)
        return redirect('/web/login')

socket_server = {
    'url':tools.config['socket_url'],
    'connected': False
}

class Controller(http.Controller):

    @http.route('/messege_request', type='http', csrf=False, auth='public', cors='*')
    def messege_request(self, **kw):
        try:
            kw = json.loads(kw['data'])
            auth = kw.get('auth')
            if not auth:
                auth = kw
            uid = ws_methods.check_auth(auth)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            values = kw.get('req_data')
            if not values:
                values = kw
            values['uid'] = uid
            args = kw.get('args')
            model = args.get('model')
            method = args.get('method')

            if not model or not method:
                return ws_methods.http_response('Please provide valid args')

            method_to_call = getattr(req_env[model], method)
            res = method_to_call(values)
            events = [
                {'name': res['name'], 'data': res['data'], 'audience': [res['data']['sender']]}
            ]
            res = ws_methods.emit_event(events)
            if res == 'done':
                return ws_methods.http_response('', 'done')
            else:
                return ws_methods.http_response(model + '.' + method + ' processed by Odoo server but ' + res)
        except:
            return ws_methods.handle()

    @http.route('/socket_server_request', type='http', csrf=False, auth='public', cors='*')
    def socket_request_http(self, **kw):
        try:
            kw = json.loads(kw['data'])
            auth = kw.get('auth')
            if not auth:
                auth = kw
            uid = ws_methods.check_auth(auth)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            values = kw.get('req_data')
            if not values:
                values = kw
            values['uid'] = uid
            args = kw.get('args')
            model = args.get('model')
            method = args.get('method')

            if not model or not method:
                return ws_methods.http_response('Please provide valid args')

            method_to_call = getattr(req_env[model], method)
            res = method_to_call(values)

            if values.get('no_notify'):
                return ws_methods.http_response('', 'done')

            res_model = values['res_model']
            parent_res_model = values.get('parent_res_model')
            parent_res_id = values.get('parent_res_id')
            if parent_res_id:
                parent_res_id = int(parent_res_id)
                parent_res_model = values['parent_res_model']  # repeated to raise exception if not found
            res_id = values.get('res_id')
            if res_id:
                res_id = int(res_id)
            else:
                res_id = res['id']

            audience = res.get('audience')
            if not audience:
                if parent_res_id:
                    audience = req_env[parent_res_model].search([('id', '=', parent_res_id)]).get_audience()
                else:
                    audience = req_env[res_model].search([('id', '=', res_id)]).get_audience()

            notification_values = {
                'res_model': res_model,
                'res_id': res_id,
                'audience': audience
            }
            if parent_res_id:
                notification_values['parent_res_id'] = parent_res_id
                notification_values['parent_res_model'] = parent_res_model

            notification = req_env['notification'].add_notification(notification_values)
            notification_values['content'] = notification.notification_type_id.content

            if notification.is_parent:
                notification_values['is_parent'] = notification.is_parent
            events = [
                {'name': res['name'], 'data': res['data'], 'audience': audience },
                {'name':'notification_received', 'data':notification_values, 'audience': audience}
            ]
            if not events:
                raise ValidationError('Invalid events')
            res = ws_methods.emit_event(events)
            if res == 'done':
                return  ws_methods.http_response('', 'done')
            else:
                return ws_methods.http_response(model + '.'+method+' processed by Odoo server but '+ res)
        except:
            return ws_methods.handle()

    @http.route('/socket_request-json', type='json', csrf=False, auth='public', cors='*')
    def socket_request_json(self):
        res = ''
        try:
            kw = request.jsonrequest
            auth = kw.get('auth')
            data = kw.get('req_data')
            if not data:
                data = kw
            time_zone = kw.get('time_zone')
            forward_url = kw.get('function_url')
            if auth and auth.get('token'):
                uid = ws_methods.check_auth(auth)
                data['uid'] = uid
                data['db'] = auth['db']
                data['token'] = auth['token']
            else:
                if not data.get('uid'):
                    data['uid'] = data['id']
                uid = ws_methods.check_auth(data)
            if not uid:
                return ws_methods.not_logged_in()

            url = request.httprequest.host_url+forward_url
            res = requests.post(url, json=data)
            res = res.content
            res = res.decode('utf8')
            res = json.loads(res)
            res = res.get('result')
            if not res:
                res = res.get('error')
            return res
        except:
            return ws_methods.handle(res)

    @http.route('/model/binary', auth='public', csrf=False, cors='*')
    def model_binary_http(self, **kw):
        doc = self.model_binary(kw)
        return doc

    def model_binary(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.http_response('Could not authenticate')
            if 'data' in values:
                values = values['data']
            res_id = values.get('res_id')
            binary_model = values.get('model')
            binary_field = values.get('field')
            record = http.request.env[binary_model].search([('id', '=', res_id)])
            file = record[0][binary_field].decode('utf-8')
            res = ws_methods.http_response('', {'doc': file})
            return res
        except:
            return ws_methods.handle()

    @http.route('/password-reset-email', type='http', csrf=False, auth='public', cors='*')
    def password_reset_emai(self, **kw):
        try:
            login = kw.get('login')
            if  not login:
                return ws_methods.http_response('Please provide username/email')
            try:
                request.env['res.users'].sudo().reset_password(login)
            except:
                return ws_methods.http_response('Invalid login '+login)
            data = { 'message':"Email has been sent to "+  login}
            return ws_methods.http_response('',data)
        except:
            return ws_methods.handle()

    @http.route('/reset-password', type='http', csrf=False, auth='public', cors='*')
    def reset_password(self, **kw):
        try:
            passwd = kw.get('password')
            token = kw.get('token')
            if not token or not passwd:
                return ws_methods.http_response('Invalid input')
            filters = [('signup_token', '=', token)]
            partner = request.env['res.partner'].sudo().search(filters, limit=1)
            if partner:
                res = partner.user_id.write({'password': passwd, 'signup_token': False})
                return ws_methods.http_response('', 'success')
            else:
                return ws_methods.http_response('Invalid Token')
        except:
            return ws_methods.handle()

    @http.route('/api-token', type='http', csrf=False, auth='public', cors='*')
    def api_token(self, **kw):
        return 'Token service not implemented yet'

    @http.route('/api-endpoint', type='http', csrf=False, auth='public', cors='*')
    def api_get(self, **kw):
        try:
            kw = json.loads(kw['input_data'])
            auth = kw.get('auth')
            data = kw.get('req_data')
            data['time_zone'] = kw.get('time_zone')
            forward_url = kw.get('function_url')
            uid = ws_methods.check_auth(auth)
            if not uid:
                return ws_methods.not_logged_in()
            res = http.local_redirect(forward_url, data)
            #res = werkzeug.utils.redirect(forward_url, data)
            return res
        except:
            return ws_methods.handle()

    @http.route('/get-comments', type='http', csrf=False, auth='none', cors='*')
    def get_comments_http(self, **kw):
        temp = self.get_comments(kw)
        return temp

    def get_comments(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            if 'data' in values:
                values = values['data']
            res_id = values.get('res_id')
            model = values.get('res_model')
            if not model:
                model = values.get('model')
            if not res_id or not model:
                return ws_methods.http_response('Invalid model or id')
            filters = [('res_id', '=', res_id), ('model', '=', model), ('parent_id', '=', False), ('create_uid', '!=', False)]
            if uid != 1:
                filters.append(('create_uid', '!=', 1))
            comments = req_env['mail.message'].search(filters, order='create_date desc')
            props = ['id', 'body', 'subtype_id.id', 'create_date']
            ar_comments = ws_methods.objects_list_to_json_list(comments, props)
            i = 0
            for com in comments:
                user = com.create_uid
                if not user.id:
                    ar_comments[i]['is_own'] = 1

                ar_comments[i]['user'] = {'name': user.name, 'id': user.id}
                ar_children = []
                if com.child_ids:
                    child_ids = com.child_ids.sorted(key=lambda p: (p.create_date))
                    ar_children = ws_methods.objects_list_to_json_list(child_ids, props)
                    j = 0
                    for child_com in child_ids:
                        user1 = child_com.create_uid
                        ar_children[j]['user'] = {'name': user1.name, 'id': user1.id}
                        j = j + 1
                ar_comments[i]["children"] = ar_children
                i = i + 1
            return ws_methods.http_response('', ar_comments)
        except:
            return ws_methods.handle()

    @http.route('/delallcomments', type='http', csrf=False, auth='public', cors='*')
    def delcomments(self, **kw):
        #http.request.env['mail.message'].sudo().search([('model', '=', 'calendar.event')]).unlink()
        return ws_methods.http_response('', 'Done')

    @http.route('/comment/add', type='http', csrf=False, auth='public', cors='*')
    def save_comment_http(self, **kw):
        res = self.save_comment(kw)
        return res['data']

    @http.route('/comment/add-json', type="json", csrf=False, auth='public', cors='*')
    def save_comment_json(self, **kw):
        kw = request.jsonrequest
        auth = kw.get('auth')
        if not auth:
            auth = kw
        uid = ws_methods.check_auth(auth)
        if not uid:
            return ws_methods.not_logged_in()
        values = kw.get('req_data')
        if not values:
            values = kw
        res = self.save_comment(values)
        return res['data']

    @http.route('/comment/delete', type='http', csrf=False, auth='none', cors='*')
    def delete_comment_http(self, **kw):
        return self.delete_comment(kw)

    @http.route('/comment/delete-json', type="json", csrf=False, auth='none', cors='*')
    def delete_comment_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.delete_comment(req_body)

    def delete_comment(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.http_response('Not authorized')
            if 'data' in values:
                values = values['data']

            comment_id = values.get('id')
            if not comment_id:
                return ws_methods.http_response('Please provide comment id')
            req_env = http.request.env
            comment = req_env['mail.message'].search([('id','=',comment_id)])
            if not comment:
                rec = "Wrong Comment Id to delete "+ str(comment_id)
                ws_methods.handle_silently(rec)
                return ws_methods.http_response("Could not delete")
            res = comment.unlink()
            if res and type(res) is bool:
                res = "success"
                return ws_methods.http_response('', res)
            else:
                return ws_methods.http_response(res)
        except:
            return ws_methods.handle()

    @http.route('/dn_base/update_seen_by', csrf=False)
    def update_seen_by(self, **kw):
        env = http.request.env
        uid = env.uid
        res_model = kw['res_model']
        res_id = int(kw['res_id'])

        filters = [('create_uid', '=', uid), ('res_model', '=', res_model), ('res_id', '=', res_id)]
        seen_model = env['dn.seen']
        res = seen_model.search(filters)
        if not res:
            res = seen_model.create({'create_uid' : uid,'res_model':res_model, 'res_id':res_id})
            return json.dumps({'error':'','data':'Yes'})
        else:
            return json.dumps({'error': '', 'data': 'Already Added'})


class MyBinary(Binary):

    @http.route([
        '/dn/content_file/<string:model>/<int:id>/<string:field>',
        '/dn/content_file/<string:model>/<int:id>/<string:field>/<string:db>/<string:user_token>'], type='http', auth="public")
    def filefromurl(self, xmlid=None, model='ir.attachment', id=None, field='datas',
                       filename=None, filename_field='datas_fname', unique=None, mimetype=None,
                       download=None, token=None, db=None, user_token=None, access_token=None, **kw):

        values = {'token': user_token, 'db': db}
        uid = ws_methods.check_auth_token(values)
        if not uid:
            return request.not_found()

        env = request.env(user=uid)
        status, headers, content = binary_content(
            xmlid=xmlid, model=model, id=id, field=field, unique=unique, filename=filename,
            filename_field=filename_field, download=download, mimetype=mimetype,
            access_token=access_token,env=env)
        if status == 304:
            response = werkzeug.wrappers.Response(status=status, headers=headers)
        elif status == 301:
            return werkzeug.utils.redirect(content, code=301)
        elif status != 200:
            response = request.not_found()
        else:
            if not content:
                response = request.not_found()
            else:
                content_base64 = base64.b64decode(content)
                headers.append(('Content-Length', len(content_base64)))
                response = request.make_response(content_base64, headers)
        if token:
            response.set_cookie('fileToken', token)
        return response

    @http.route('/dn_base/change_password', auth='none',cors='*', csrf=False)
    def change(self,**kw):
        try:
            req_env = http.request.env
            new_passwd = kw.get('new')
            old_passwd = kw.get('old')
            token = kw.get('token')
            db = kw.get('db')
            filters = [('auth_token', '=', token)]
            user = request.env['dnspusers'].sudo().search(filters)
            uid = request.session.authenticate(db, user.login, old_passwd)
            if uid:
                res = req_env.user.write({'password': new_passwd})
                return ws_methods.http_response('','success')
            else:
                return ws_methods.http_response('Invalid Password')
        except:
            return ws_methods.handle()

    @http.route('/del-all', type="http", csrf=False, cors='*')
    def deleteModelRecords(self, **kw):
        try:
            uid = http.request.uid
            if uid !=1:
                return ws_methods.http_response("You are not allowed to profoem this action.")
            req_env = http.request.env
            model = kw.get('model')
            req_env[model].search([]).unlink()

            return ws_methods.http_response('', 'Successfully saved')
        except:
            return ws_methods.handle()