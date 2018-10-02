import sys
import json
import base64
import smtplib
import threading
import traceback
from odoo.http import request
from odoo.addons.dn_base import dn_dt

def send_mail(mesgtosend):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login("sami.akram@digitalnet.com", "asddsazx")
    recievers = "sami.akram@digitalnet.com,zartash.baig@gmail.com,asfand.yar@digitalnet.com"
    server.sendmail("Sami Akam", recievers, mesgtosend)

def execute_upd(query):
    cr = request.env.cr
    res = cr.execute(query)
    return res

def execute_read(query):
    cr = request.env.cr
    cr.execute(query)
    res = cr.fetchall()
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
#[{'a':1}, {'b':2}]
#['partner_id','user_Id','login']

def object_to_json_object(object, props):
    json_obj = {}
    tz = request.httprequest.args.get('time_zone')
    try:
        for prop in props:
            obj = object
            ar = prop.split('.')
            str = ar[0].replace('_id','')
            i = 0
            for sub_prop in ar:
                field_type = object._fields[sub_prop].type
                #print (object._fields[sub_prop].name)
                if field_type == 'binary':
                    obj = obj[sub_prop]
                    if obj:
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
    if request.uid and request.uid!=4:
        return request.uid
    if not values:
        return False
    if not values['token']:
        return False
    db = values['db']
    token = str(values['token'])
    #original_token = decode('sM:de_', token)
    filters = [('auth_token', '=', token)]
    user = request.env['dnspusers'].sudo().search(filters)
    if not user:
        return False
    #password = decode('sM:de_', password)
    uid = request.session.authenticate(db, user.login, user.password)
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