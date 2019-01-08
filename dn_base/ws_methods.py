import sys
import json
import base64
import smtplib
import threading
import traceback
from  odoo import tools
from odoo.http import request
from odoo.addons.dn_base import dn_dt

def send_mail(mesgtosend):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login("sami.akram@digitalnet.com", "asddsazx")
    recievers = "sami.akram@digitalnet.com,zartash.baig@gmail.com,asfand.yar@digitalnet.com"
    server.sendmail("Sami Akam", recievers, mesgtosend)

def my_notifications_on_record():
    sql = 'select sum(counter) counter, parent_id, parent_model, client_route, content from dn_base_notification n '
    sql += 'join dn_base_notification_status s on s.notification_id = n.id '
    sql += 'where user_id = '+ str(request.env.user.id)+' AND parent_id is not null AND parent_model is not null'
    sql += ' group by parent_id, parent_model, client_route, content'

    return execute_read(sql)

def addNotification(notify_data, targets):
    req_env = request.env
    filters = [('res_model','=',notify_data.get('res_model')),('res_id','=',notify_data.get('res_id'))]
    notify_res = req_env['dn_base.notification'].search(filters)
    props = ['id','content', 'res_model', 'res_id', 'client_route', 'parent_model', 'parent_id']
    notificationList = objects_list_to_json_list(notify_res, props)
    if len(notificationList) > 0:
        notification = notificationList[0]
        if notification:
            notification['users'] = []
            for id in targets:
                filter = [('notification_id', '=', notification['id']), ('user_id', '=', id)]
                note_status = req_env['dn_base.notification.status'].sudo().search(filter)
                if not note_status:
                    req_env['dn_base.notification.status'].create({
                        "notification_id": notification['id'],
                        "user_id": id,
                        "counter": 1
                    })
                else:
                    note_status.counter += 1
    else:
        notification_obj = req_env['dn_base.notification'].create({
            "content": notify_data.get('content'),
            "res_model": notify_data.get('res_model'),
            "res_id": notify_data.get('res_id'),
            "client_route": notify_data.get('client_route'),
            "parent_model": notify_data.get('parent_model'),
            "parent_id": notify_data.get('parent_id')
        })

        props = ['id', 'content', 'res_model', 'res_id', 'client_route', 'parent_model', 'parent_id']
        notification = object_to_json_object(notification_obj, props)

        for id in targets:
            if notify_data.get('user_id') != id:
                req_env['dn_base.notification.status'].create({
                    "notification_id" : notification['id'],
                    "user_id" : id,
                    "counter" : 1
                })

    return notification

def mfile_url(model, field, id):
    conf = request.conf
    res = 'dn/content_file/' + model + '/' +  str(id) + '/' + field + '/' + conf['db'] + '/' + conf['token']
    res = conf['host_url'] + res
    return res

def execute_upd(query):
    cr = request.env.cr
    res = cr.execute(query)
    return res

def execute_read(query):
    cr = request.env.cr
    cr.execute(query)
    res = cr.dictfetchall()
    return res

def http_response(er, data=False):
    try:
        if er:
            result = {"error": er}
        else:
            result = {"data": data, "error": ""}
        if request.httprequest.content_type != 'application/json':
            result = json.dumps(result)
        return result
    except:
        eg = traceback.format_exception(*sys.exc_info())
        errorMessage = ''
        for er in eg:
            er = er.replace('\n', '<br>')
            errorMessage += "<br>" + er
        return http_response(errorMessage)

def not_logged_in():
    return http_response('Session expired, please login')

def handle(er=False):
    if er:
        return http_response(er)
    eg = traceback.format_exception(*sys.exc_info())
    errorMessage = ''
    for er in eg:
        er = er.replace('\n', '<br>')
        errorMessage += "<br>" + er
    er = eg[1]   + er
    return http_response(errorMessage)


def handle_silently(rec=False):
    if not rec:
        eg = traceback.format_exception(*sys.exc_info())
        errorMessage = ''
        for er in eg:
            er = er.replace('\n', '<br>')
            errorMessage += "<br>" + er
        er = eg[1]   + er
        mesgtosend = er
    else:
        mesgtosend = rec
    d3 = threading.Thread(target=send_mail,args=[mesgtosend])
    d3.start()

def encode(key, str):
    enc = []
    for i in range(len(str)):
        key_c = key[i % len(key)]
        enc_c = chr((ord(str[i]) + ord(key_c)) % 256)
        enc.append(enc_c)
    return base64.urlsafe_b64encode("".join(enc))

def decode(key, enc):
    dec = []
    enc = base64.urlsafe_b64decode(enc)
    for i in range(len(enc)):
        key_c = key[i % len(key)]
        dec_c = chr((256 + ord(enc[i]) - ord(key_c)) % 256)
        dec.append(dec_c)
    return "".join(dec)

def objects_list_to_json_list(objects, props):
    json_obj_list = []
    for obj in objects:
        json_obj = object_to_json_object(obj, props)
        json_obj_list.append(json_obj)
    return json_obj_list

def objects_list_to_array(objects, prop):
    json_obj_list = []
    for obj in objects:
        json_obj_list.append(obj[prop])
    return json_obj_list
#[{'a':1}, {'b':2}]
#['partner_id','user_Id','login']

def object_to_json_object(object, props):
    json_obj = {}
    tz = request.httprequest.args.get('time_zone')
    model = object._name
    try:
        for prop in props:
            obj = object
            ar = prop.split('.')
            if ar[0].endswith('_id') and ar[0] != 'res_id' and ar[0] != 'notification_id' and ar[0] != 'parent_id':
                str = ar[0].replace('_id','')
            else:
                str = ar[0]
            i = 0
            for sub_prop in ar:
                field_type = object._fields[sub_prop].type
                if field_type == 'binary':
                    obj = obj[sub_prop]
                    if obj:
                        if sub_prop in ['admin_image', 'image_small', 'image_medium', 'image', 'image', 'photo']:
                            obj = mfile_url(model, sub_prop, object.id)
                        else:
                            obj = obj.decode('utf-8')
                elif tz and field_type == 'datetime':
                    if obj[sub_prop]:
                        obj = dn_dt.convert_time_zone(tz, obj[sub_prop])
                    else:
                        obj = False
                else:
                    obj = obj[sub_prop]
                if not obj:
                    break
                if i > 0:
                    str += "_" + sub_prop
                i = i + 1
            if not obj:
                json_obj[str] = ''
            else:
                json_obj[str] = obj
    except:
        a = 1
        raise
    return json_obj

def youtube_url(url):
    return url.replace('/watch?v=','/embed/')

def log_error(er):
    er = "Logged " + er
    print(er)


def check_auth(values):
    for val in values:
        if val in ['admin_image', 'image_small', 'image_medium', 'image', 'image', 'photo']:
            arr = values[val].split(',')
            if len(arr) > 1:
                values[val] = values[val].split(',')[1]
            else:
                values[val] =  values[val]
    if request.uid and request.uid != 4:
        return request.uid
    if not values:
        return False
    token = values.get('token')
    if not token:
        return False
    db = values.get('db')
    if not db:
        return False
    token = str(token)
    stuid = values.get('uid')
    uid = int(stuid)
    filters = [('auth_token', '=', token),('user_id','=', uid)]
    user = request.env['dnspusers'].sudo().search(filters)
    if not user:
        return False
    uid = request.session.authenticate(db, user.login, user.password)
    if not hasattr(request, 'conf'):
        request.conf = { 'host_url': request.httprequest.host_url, 'uid': uid, 'db': request.db, 'token' : token }
    return uid

def check_auth_token(values):
    if values.get('stopit'):
        a = 1
    if request.uid and request.uid != 4:
        return request.uid
    if not values:
        return False
    if not values['token']:
        return False
    db = values['db']
    token = str(values['token'])
    filters = [('auth_token', '=', token)]
    user = request.env['dnspusers'].sudo().search(filters)
    if not user:
        return False
    uid = request.session.authenticate(db, user.login, user.password)
    if not hasattr(request, 'conf'):
        request.conf = { 'host_url': request.httprequest.host_url, 'uid': uid, 'db': request.db, 'token' : token }
    return uid


def authenticate(data):
    db = data.get('db')
    login = data.get('login')
    password = data.get('password')
    uid = request.session.authenticate(db, login, password)
    return uid

from dateutil import parser
def change_datetime_format(val, format):
    dt = parser.parse(val)
    res = dt.strftime(format)
    return res

def to_datetime(val):
    dt = parser.parse(val)
    return dt

# Socket Connetion
socket_server = {
    'url':tools.config['socket_url'],
    'connected': False
}

import requests
def emit_event(rtc_req):
    try:
        rtc_req['data'] = json.dumps(rtc_req['data'])
        requests.get(socket_server['url']+'/odoo_event', params=rtc_req)
    except:
        print('odoo event failed')