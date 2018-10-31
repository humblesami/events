import json
import base64
import werkzeug
from odoo import http
from odoo.http import request
from werkzeug.utils import redirect
from odoo.addons.dn_base import dn_dt
from odoo.addons.dn_base import ws_methods
from odoo.addons.web.controllers.main import Binary
from odoo.addons.web.controllers.main import Session, binary_content


class Controller(http.Controller):

    @http.route('/api-token', type="http", csrf=False, auth='public', cors='*')
    def api_token(self, **kw):
        return 'Token service not implemented yet'

    @http.route('/api-endpoint', type="http", csrf=False, auth='public', cors='*')
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

    @http.route('/delallcomments', type="http", csrf=False, auth='public', cors='*')
    def delcomments(self, **kw):
        #http.request.env['mail.message'].sudo().search([('model', '=', 'calendar.event')]).unlink()
        return ws_methods.http_response('', 'Done')


    @http.route('/comment/add', type="http", csrf=False, auth='public', cors='*')
    def save_comment_http(self, **kw):
        return self.save_comment(kw)

    @http.route('/comment/add-json', type="json", csrf=False, auth='public', cors='*')
    def save_comment_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.save_comment(req_body)

    def save_comment(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.http_response('Not authorized')
            if 'data' in values:
                values = values['data']
            meeting_id = values.get('res_id')
            if not  meeting_id:
                return ws_methods.http_response('Please provide meeting id')
            model_name = values.get('model_name')
            if not meeting_id:
                return ws_methods.http_response('Please provide related model')
            subtype_id = values.get('subtype')
            if not subtype_id:
                subtype_id = 2
            parent_id = values.get('parent_id')
            req_env = http.request.env
            mesg_body = values['body']

            str_uid = str(uid)
            max_comment_id = 0
            query = 'select max(id) from mail_message where create_uid = '+ str_uid
            res = ws_methods.execute_read(query)
            if len(res) > 0:
                if res[0][0]:
                    max_comment_id = res[0][0]

            create_date = dn_dt.nowStr()
            if not parent_id:
                req_env.cr.execute(
                    'insert into mail_message(model,res_id,body,message_type,subtype_id,create_uid,create_date) VALUES (%s, %s, %s, %s, %s, %s, %s)',
                    (model_name, meeting_id, mesg_body, 'comment', subtype_id, uid, create_date))
            else:
                req_env.cr.execute(
                    'insert into mail_message(model,res_id,body,message_type,subtype_id,parent_id,create_uid,create_date) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)',
                    (model_name, meeting_id, mesg_body, 'comment', subtype_id, parent_id, uid, create_date))

            str_comment_id = str(max_comment_id)
            query = 'select id,create_date,create_uid from mail_message where id > '+str_comment_id+' and create_uid = '+str_uid
            res = ws_methods.execute_read(query)
            if len(res) == 0:
                return ws_methods.http_response('Not created')
            comment_id = res[0][0]
            user = req_env.user
            comment = { 'id':comment_id, 'body': mesg_body,'subtype':subtype_id, 'create_date': create_date, 'user':{'id':user.mp_user_id.id,'name':user.name}, 'children':[]}
            return ws_methods.http_response('', comment)
        except:
            return ws_methods.handle()


    @http.route('/comment/delete', type="http", csrf=False, auth='none', cors='*')
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

class MySession(Session):
    @http.route(auth="none")
    def logout(self):
        if request.session.uid:
            request.session.logout(keep_db=True)
        return redirect('/web/login')

class MyBinary(Binary):


    @http.route([
        '/dn/content_file/<string:model>/<int:id>/<string:field>',
        '/dn/content_file/<string:model>/<int:id>/<string:field>/<string:db>/<string:user_token>'], type='http', auth="public")
    def filefromurl(self, xmlid=None, model='ir.attachment', id=None, field='datas',
                       filename=None, filename_field='datas_fname', unique=None, mimetype=None,
                       download=None, token=None, db=None, user_token=None, access_token=None, **kw):

        values = {'token': user_token, 'db': db}
        uid = ws_methods.check_auth(values)
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
            content_base64 = base64.b64decode(content)
            headers.append(('Content-Length', len(content_base64)))
            response = request.make_response(content_base64, headers)
        if token:
            response.set_cookie('fileToken', token)
        return response

    def content_common(self, xmlid=None, model='ir.attachment', id=None, field='datas',
                       filename=None, filename_field='datas_fname', unique=None, mimetype=None,
                       download=None, data=None, token=None, access_token=None, **kw):
        d=request.env[model].search([('id', '=', id)])
        if not d:
            return request.not_found()
        status, headers, content = binary_content(
            xmlid=xmlid, model=model, id=id, field=field, unique=unique, filename=filename,
            filename_field=filename_field, download=download, mimetype=mimetype,
            access_token=access_token)
        if status == 304:
            response = werkzeug.wrappers.Response(status=status, headers=headers)
        elif status == 301:
            return werkzeug.utils.redirect(content, code=301)
        elif status != 200:
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