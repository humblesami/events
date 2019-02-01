import json
import base64
import requests
import werkzeug
import datetime
from odoo import http, tools
from odoo.http import request
from werkzeug.utils import redirect
from odoo.addons.dn_base import dn_dt
from odoo.addons.dn_base import ws_methods
from odoo.addons.web.controllers.main import Binary
from odoo.addons.website.controllers.main import Website
from odoo.addons.web.controllers.main import Session, binary_content, Home

from odoo.addons.meeting_point.controllers import annotation as annotationController
from odoo.addons.odoochat.controllers import controllers as chatController

def save_comment(values):
    try:
        if 'data' in values:
            values = json.loads(values['data'])
        uid = ws_methods.check_auth(values)
        if not uid:
            return ws_methods.http_response('Not authorized')
        res_id = values.get('res_id')
        if not  res_id:
            return ws_methods.http_response('Please provide meeting id')
        res_model = values.get('model_name')
        if not res_id:
            return ws_methods.http_response('Please provide related model')
        subtype_id = values.get('subtype')
        if not subtype_id:
            subtype_id = 2
        parent_id = values.get('parent_id')
        req_env = http.request.env
        mesg_body = values['body']
        str_uid = str(uid)

        authorId = req_env['res.users'].search([('id','=',uid)]).partner_id.id
        max_comment_id = 0
        query = 'select max(id) as comment_id from mail_message where create_uid = '+ str_uid
        res = ws_methods.execute_read(query)
        if len(res) > 0:
            if res[0]['comment_id']:
                max_comment_id = res[0]['comment_id']

        create_date = dn_dt.nowStr()
        table_time = datetime.datetime.now()
        if not parent_id:
            req_env.cr.execute(
                'insert into mail_message(model,res_id,body,message_type,subtype_id,create_uid,date,create_date,write_date,author_id) VALUES (%s, %s, %s, %s, %s, %s, %s,%s,%s,%s)',
                (res_model, res_id, mesg_body, 'comment', subtype_id, uid, table_time,table_time,table_time,authorId))
        else:
            req_env.cr.execute(
                'insert into mail_message(model,res_id,body,message_type,subtype_id,parent_id,create_uid,date,create_date,write_date,author_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s,%s,%s,%s)',
                (res_model, res_id, mesg_body, 'comment', subtype_id, parent_id, uid, table_time,table_time,table_time,authorId))

        str_comment_id = str(max_comment_id)
        query = 'select id,create_date,create_uid,parent_id from mail_message where id > '+str_comment_id+' and create_uid = '+str_uid
        added_comment = ws_methods.execute_read(query)
        attendees = []
        meeting = req_env['calendar.event'].sudo().search([('id', '=', res_id)])
        partners = meeting.partner_ids
        for partner in partners:
            try:
                if partner.user_id:
                    attendees.append(partner.user_id.id)
            except:
                a = 1
        if len(added_comment) == 0:
            return ws_methods.http_response('Not created')
        added_comment = added_comment[0]
        comment_id = added_comment['id']
        user = req_env.user
        data = {
            'comment': {
                'id': comment_id,
                'body': mesg_body,
                'subtype': subtype_id,
                'create_date': create_date,
                'user': {'id': user.mp_user_id.id, 'name': user.name, 'uid': str_uid},
                'children': [],
                'meeting': meeting.name,
                'res_id': res_id
            }
        }


        if subtype_id == 1:
            notification = {'res_id':res_id, 'res_model': res_model, 'content':'new comment added on a meeting' }
            notification['user_id'] = uid
            notification_object = ws_methods.addNotification(notification, attendees)

        if added_comment['parent_id']:
            data['comment']['parent_id'] = added_comment['parent_id']

        res = ws_methods.http_response('', data)
        res = {
            'events': [
                {'data': notification_object, 'name': 'newNotification', 'audience': attendees},
                {'data': res, 'name': 'meetCommentRecieve', 'audience': attendees}
            ],
            'data': res
        }
        return res
    except:
        return ws_methods.handle()

def update_notification(values):
    try:
        req_env = http.request.env
        parent_model = values.get('parent_model')
        parent_id = values.get('parent_id')
        res_model = values.get('res_model')
        res_id = values.get('res_id')

        filter = [('res_model', '=', res_model), ('res_id', '=', res_id)]

        if parent_id and parent_model:
            filter.append(('parent_model', '=', parent_model))
            filter.append(('parent_id', '=', parent_id))

        note_list = req_env['dn_base.notification'].search(filter)
        ids = ws_methods.objects_list_to_array(note_list, 'id')

        filter = [('notification_id', 'in', ids), ('user_id', '=', values['uid'])]
        req_env['dn_base.notification.status'].sudo().search(filter).write({'counter': 0})

        res = ws_methods.http_response('', 'Successfully Updated')

        res = {
            'events': [
                {'data': res, 'name': 'notification_updated', 'audience': [values['uid']]}
            ],
            'data': res
        }
        return res
    except:
        return ws_methods.handle()

class MyWebsite(Website):
    @http.route('/', type='http', auth="public", website=True)
    def index(self):
        request = http.request
        if not request.session.uid:
            return redirect('/web/login')
        else:
            return redirect('/web')



socket_events = {
    'save_message': chatController.save_messages,
    'get_active_user_message': chatController.getActiveUserMessage,
    'save_comment_point': annotationController.save_comment_point,
    'save_comment': save_comment,
    'update_notification': update_notification,
    # 'verify': authController.verify
}

socket_server = {
    'url':tools.config['socket_url'],
    'connected': False
}

class Controller(http.Controller):

    @http.route('/socket_server_request', type='http', csrf=False, auth='public', cors='*')
    def socket_request_http(self, **kw):
        try:
            auth = kw.get('auth')
            if not auth:
                auth = kw
            uid = ws_methods.check_auth(auth)
            if not uid:
                return ws_methods.not_logged_in()
            values = kw.get('req_data')
            if not values:
                values = kw
            values['uid'] = uid
            event_name = kw.get('event')
            if not event_name:
                return ws_methods.http_response('No event name given')
            res = socket_events[event_name](values)
            if not res['events']:
                return res

            res = ws_methods.emit_event(res['events'])
            if res == 'done':
                return  ws_methods.http_response('', 'done')
            else:
                return ws_methods.http_response(event_name + ' processed by Odoo server but '+ res)
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

    @http.route('/get-record-notifications', type='http', csrf=False, auth='public', cors='*')
    def get_point_noteifications(self, **kw):
        try:
            auth = kw.get('auth')
            uid = ws_methods.check_auth(auth)
            if not uid:
                return ws_methods.not_logged_in()

            vals = kw.get('req_data')
            req_env = http.request.env
            notifications = req_env['dn_base.notification.status'].search([('user_id', '=', vals['user_id'])])
            point_notifications = []

            parent_id = vals.get('parent_id')
            parent_model = vals.get('parent_model')
            filters = []
            for status in notifications:
                filters = [('parent_id', '=', parent_id),
                           ('parent_model', '=', parent_model),
                           ('id', '=', status.notification_id)]
                # else:
                #     filters = [('res_id', '=', vals['res_id'], ('res_model', '=', vals['res_model'])]

                noteList = req_env['dn_base.notification'].search(filters)
                props = ['res_id']
                noteObj = ws_methods.object_to_json_object(noteList[0], props)
                noteObj['count'] = status.count
                point_notifications.append(noteObj)

        except:
            return ws_methods.handle()

    @http.route('/update-notify-status', type='json', auth='public', csrf=False, cors='*')
    def update_notification_status(self):
        try:
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
            values['uid'] = uid
            res = update_notification(values)
            return res['data']
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

    @http.route('/update_client_rotes', type='http', csrf=False, auth='public', cors='*')
    def socket_request(self, **kw):
        try:
            if request.uid != 1:
                return "Error"
            sql = "update dn_base_notification set client_route=CONCAT('/',client_route) where client_route not like '/%'"
            #sql = "update dn_base_notification set client_route = substring(client_route from 2 for 9999) where client_route like '//%'"
            ws_methods.execute_update(sql)
            res = 'done'
            return res
        except:
            return ws_methods.handle()

    @http.route('/get-comments', type='http', csrf=False, auth='none', cors='*')
    def get_comments_http(self, **kw):
        temp = self.get_comments(kw)
        return temp

    @http.route('/get-comments-nonhttp', type="json", csrf=False, auth='none', cors='*')
    def get_comments_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.get_comment(req_body)

    def get_comments(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            if 'data' in values:
                values = values['data']
            filters = [('res_id', '=', values['res_id']), ('parent_id', '=', False),
                       ('model', '=', values['res_model']), ('create_uid', '!=', False)]
            if uid != 1:
                filters.append(('create_uid', '!=', 1))
            comments = req_env['mail.message'].search(filters, order='create_date desc')
            props = ['id', 'body', 'subtype_id.id', 'create_date']
            ar_comments = ws_methods.objects_list_to_json_list(comments, props)
            i = 0
            for com in comments:
                user = com.create_uid
                if not user.mp_user_id.id:
                    ar_comments[i]['is_own'] = 1

                ar_comments[i]['user'] = {'name': user.name, 'id': user.mp_user_id.id}
                ar_children = []
                if com.child_ids:
                    child_ids = com.child_ids.sorted(key=lambda p: (p.create_date))
                    ar_children = ws_methods.objects_list_to_json_list(child_ids, props)
                    j = 0
                    for child_com in child_ids:
                        user1 = child_com.create_uid
                        ar_children[j]['user'] = {'name': user1.name, 'id': user1.mp_user_id.id}
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
        res = save_comment(kw)
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
        res = save_comment(kw)
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