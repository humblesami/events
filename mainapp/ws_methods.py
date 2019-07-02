import sys
import json
import base64
import smtplib
from django.apps import apps
from datetime import datetime
from django.contrib.auth import login
from emailthread.models import EmailThread
from django.core.files.base import ContentFile
from rest_framework.authtoken.models import Token


import requests
from urllib.parse import quote, unquote
from django.forms.models import model_to_dict


def now_str():
    now = str(datetime.now())
    now = now.replace(' ','-')
    now = now.replace(':', '-')
    now = now.replace('.', '-')
    return now

def get_user_name(user):
    name = False
    if user.first_name:
        name = user.first_name
        if user.last_name:
            name += ' ' + user.last_name
    elif user.last_name:
        name += user.last_name
    else:
        name = user.username
    return name

from django.core.mail import send_mail
def send_email(subject, html_message, recipients):
    if not subject:
        return 'No Subject to mail'
    if not html_message:
        return 'No message to send mail',
    send_mail(subject, "", "sami@gmai.com",recipients
              , fail_silently=False,
              html_message=html_message)

from mainapp.settings import SOCKET_SERVER_URL
socket_server = {
    'url': SOCKET_SERVER_URL,
    'connected': False
}

from django.db import connection
def execute_update(query):
    cr = connection.cursor()
    res = cr.execute(query)
    return res


def execute_read(query):
    cr = connection.cursor()
    cr.execute(query)
    res = cr.dictfetchall()
    return res

def set_obj_attrs(dict_key_values, py_obj):
    for prop in dict_key_values:
        py_obj. __setattr__(prop, dict_key_values[prop])

def base64StringToFile(data, file_name):
    if 'data:' in data and ';base64,' in data:
        header, data = data.split(';base64,')
    try:
        decoded_file = base64.b64decode(data)
    except:
        raise ValueError('Invalid binary')

    return ContentFile(decoded_file, name=file_name)


def choices_to_list(choice_list):
    lst = []
    for choice in choice_list:
        lst.append({'id': choice[0], 'name': str(choice[1])})
    return  lst


def emit_event(data, req_url=None):
    try:
        if not data:
            data = []
        # for ev in data:
        #     audience = ev['audience']
        #     for uid in audience:
        #         try:
        #             test = int(uid)
        #             if test == 0:
        #                 return 'Invalid user id '+uid+' in audience for '+ev['name']
        #         except:
        #             return 'Invalid user id '+uid+' in audience for '+ev['name']                    
        data = json.dumps(data)
        if not req_url:
            req_url = '/odoo_event'        
        data = quote(data)
        url = socket_server['url'] + req_url + '?data=' + data
        try:
            r = requests.get(socket_server['url'])
            r.raise_for_status()  # Raises a HTTPError if the status is 4xx, 5xxx
        except (requests.exceptions.ConnectionError, requests.exceptions.Timeout):
            res = socket_server['url'] + " is not available"
            print(res)
            res = 'done'
        except requests.exceptions.HTTPError:
            res = 'httperror'
            print(res)
        else:
            res = requests.get(url)
            res = res._content.decode("utf-8")
            return res
        return res

    except:
        res = 'socket request failed because ' + str(sys.exc_info())
        print(res)
        return 'done'


def obj_to_dict(obj,fields=None,to_str=None,related=None):
    if fields:
        dict = model_to_dict(obj,fields)
        for field in fields:
            if field.find("__") != -1:
                val = getattr(obj, field.split("__")[0])
                if val:
                    val = getattr(val, field.split("__")[1])
                dict[field] = val
    else:
        dict = model_to_dict(obj)

    for field in dict:
        #handled non url file fields (saved as binary string)
        if type(dict[field]) is not str  and type(dict[field]) is not int:
            if dict[field]:
                if str(type(dict[field])) in ["<class \'datetime.datetime\'>", "<class 'datetime.date'>"]:
                    dict[field] = str(dict[field])
                elif str(type(dict[field])) in ["<class \'django.db.models.fields.files.FieldFile\'>",'<class \'django.db.models.fields.files.ImageFieldFile\'>']:
                    try:                        
                        file_url = dict[field].url
                        if not file_url:                        
                            dict[field] = str(dict[field])
                        else:
                            dict[field] = file_url
                    except:
                        if dict[field].startswith('/media/data'):
                            dict[field] = dict[field][7:]
                            dict[field] = unquote(dict[field])
            else:
                dict[field] = None
    if to_str:
        for field in to_str:
            if dict[field]:
                dict[field] = str(dict[field])

    if related:
        for field in related:
            _to_str = related[field].get("to_str")
            _fields = related[field].get("fields")
            _related = related[field].get("related")
            rel_obj = getattr(obj, field)
            if rel_obj._queryset_class:
                dict[field] = queryset_to_list(rel_obj.filter(),fields=_fields,to_str=_to_str,related=_related)

    return dict

def queryset_to_list(queryset,fields=None,to_str=None,related=None):
    list = []
    for obj in queryset:
        dict = obj_to_dict(obj,fields,to_str,related)
        list.append(dict)

    return list



def obj_to_dict_search(obj,fields=None,to_str=None,related=None):
    if fields:
        dict = model_to_dict(obj,fields)
        for field in fields:
            if field.find("__") != -1:
                val = getattr(obj, field.split("__")[0])
                if val:
                    val = getattr(val, field.split("__")[1])
                dict[field] = val
    else:
        dict = model_to_dict(obj)

    res_dict = {}
    for field_name, val in dict.items():
                #handled non url file fields (saved as binary string)
        if type(dict[field_name]) is str or type(dict[field_name]) is int:
            res_dict[field_name] = val


    return res_dict

def queryset_to_list_search(queryset,fields=None,to_str=None,related=None):
    list = []
    for obj in queryset:
        dict = obj_to_dict_search(obj,fields,to_str,related)
        if dict:
            list.append(dict)

    return list


# def mfile_url(model, field, id, file_type):
#     res = model + '/' + str(id) + '/' + field + '/' + request.db + '/' + request.token
#     res = get_main_url() + '/' + file_type + '/' + res
#     return res
#
# def execute_update(query):
#     cr = request.env.cr
#     res = cr.execute(query)
#     return res
#
#
# def execute_read(query):
#     cr = request.env.cr
#     cr.execute(query)
#     res = cr.dictfetchall()
#     return res
#
#
# def http_response(er, data=False):
#     try:
#         if er:
#             result = {"error": er}
#         else:
#             result = {"data": data, "error": ""}
#         if request.httprequest.content_type != 'application/json':
#             result = json.dumps(result)
#         return result
#     except:
#         eg = traceback.format_exception(*sys.exc_info())
#         errorMessage = ''
#         for er in eg:
#             errorMessage += "\n" + er
#         return http_response(errorMessage)
#
#
# def not_logged_in():
#     return http_response('Session expired, please login and join again')
#
#
# def handle(ero=False):
#     eg = traceback.format_exception(*sys.exc_info())
#     errorMessage = ''
#     for er in eg:
#         errorMessage += "\n" + er
#     if ero:
#         errorMessage = ero + '\n' + errorMessage
#     return http_response(errorMessage)
#
#
# def handle_silently(rec=False):
#     if not rec:
#         eg = traceback.format_exception(*sys.exc_info())
#         errorMessage = ''
#         for er in eg:
#             errorMessage += "\n" + er
#         er = eg[1] + er
#         mesgtosend = er
#     else:
#         mesgtosend = rec
#     d3 = threading.Thread(target=send_mail, args=[mesgtosend])
#     d3.start()
#
#
# def encode(key, str):
#     enc = []
#     for i in range(len(str)):
#         key_c = key[i % len(key)]
#         enc_c = chr((ord(str[i]) + ord(key_c)) % 256)
#         enc.append(enc_c)
#     return base64.urlsafe_b64encode("".join(enc))
#
#
# def decode(key, enc):
#     dec = []
#     enc = base64.urlsafe_b64decode(enc)
#     for i in range(len(enc)):
#         key_c = key[i % len(key)]
#         dec_c = chr((256 + ord(enc[i]) - ord(key_c)) % 256)
#         dec.append(dec_c)
#     return "".join(dec)
#
#
# def objects_list_to_json_list(objects, props):
#     json_obj_list = []
#     for obj in objects:
#         json_obj = object_to_json_object(obj, props)
#         json_obj_list.append(json_obj)
#     return json_obj_list
#
#
# def objects_list_to_array(objects, prop):
#     json_obj_list = []
#     for obj in objects:
#         json_obj_list.append(obj[prop])
#     return json_obj_list
#
#
# # [{'a':1}, {'b':2}]
# # ['partner_id','user_Id','login']
#
# def object_to_json_object(object, props):
#     json_obj = {}
#     tz = request.httprequest.args.get('time_zone')
#     model = object._name
#     try:
#         for prop in props:
#             obj = object
#             ar = prop.split('.')
#             if ar[0].endswith('_id') and ar[0] != 'res_id' and ar[0] != 'notification_id' and ar[0] != 'parent_id':
#                 str = ar[0].replace('_id', '')
#             else:
#                 str = ar[0]
#             i = 0
#             for sub_prop in ar:
#                 field_type = object._fields[sub_prop].type
#                 if field_type == 'binary':
#                     obj = obj[sub_prop]
#                     if obj:
#                         if sub_prop in ['admin_image', 'image_small', 'image_medium', 'image', 'image', 'photo',
#                                         'signature_img']:
#                             obj = mfile_url(model, sub_prop, object.id, 'image')
#                         else:
#                             obj = obj.decode('utf-8')
#                 elif tz and field_type == 'datetime':
#                     if obj[sub_prop]:
#                         obj = dn_dt.convert_time_zone(tz, obj[sub_prop])
#                     else:
#                         obj = False
#                 else:
#                     obj = obj[sub_prop]
#                 if not obj:
#                     break
#                 if i > 0:
#                     str += "_" + sub_prop
#                 i = i + 1
#             if not obj:
#                 json_obj[str] = ''
#             else:
#                 json_obj[str] = obj
#     except:
#         a = 1
#         raise
#     return json_obj
#
#
# def youtube_url(url):
#     return url.replace('/watch?v=', '/embed/')
#
#
# def log_error(er):
#     er = "Logged " + er
#     print(er)
#
#
# def check_auth(values):
#     for val in values:
#         if val in ['admin_image', 'image_small', 'image_medium', 'image', 'image', 'photo']:
#             arr = values[val].split(',')
#             if len(arr) > 1:
#                 values[val] = values[val].split(',')[1]
#             else:
#                 values[val] = values[val]
#
#     uid = values.get('uid')
#     if uid:
#         uid = int(uid)
#     if uid and request.uid == uid:
#         return request.uid
#     if request.uid and request.uid != 4:
#         return request.uid
#     if not values:
#         return False
#
#     token = values.get('token')
#     if not token:
#         return False
#     db = values.get('db')
#     if not db:
#         return False
#     token = str(token)
#     if not hasattr(request, 'token'):
#         request.token = token
#
#     filters = [('auth_token', '=', token), ('user_id', '=', uid)]
#     user = request.env['dnspusers'].sudo().search(filters)
#     if not user:
#         return False
#     uid = request.session.authenticate(db, user.login, user.password)
#     if not hasattr(request, 'conf'):
#         request.conf = {'uid': uid, 'db': request.db, 'token': token}
#     return uid
#
#
# host_url = False
#
#
# def get_main_url():
#     global host_url
#     if host_url:
#         return host_url
#     host_url = tools.config['server_web_url']
#     return host_url
#
#


def get_model(app_name, model_name):
    try:
        model = apps.get_model(app_name, model_name)
        return model
    except:
        return 'model not found'


def check_auth_token(request,values):
    if request.user and not request.user.is_anonymous:
        return request.user.id
    if not values['auth_token']:
        return False
    token = Token.objects.filter(key=values['auth_token'])
    if not token.exists():
        return False
    user = token[0].user
    login(request, user)

    return user.id


def send_email_on_creation(email_data):
    subject = email_data['subject']
    post_info = email_data['post_info']
    audience = email_data['audience']
    template_data = email_data['template_data']
    template_name = email_data['template_name']
    token_required = email_data.get('token_required')
    thread_data = {
        'subject': subject,
        'audience': audience,
        'template_data': template_data,
        'template_name': template_name,
        'token_required': token_required,
        'post_info': post_info
    }
    EmailThread(thread_data).start()


def get_user_by_token(request, kw=None):
    token = ''
    user = {}
    if request.GET:
        token = request.GET['token']
    if not token:
        if request.POST:
            token = request.POST['token']
    if 'token' in kw.keys() and not token:
        token = kw['token']
        post_user_token = get_model('restoken', 'PostUserToken')
        if type(post_user_token) is str:
            return 'Model not found'
        user_token = post_user_token.validate_token(token, 1)
        if not user_token:
            return 'You are not authorized'
        if 'id' in kw.keys():
            post_res_id = kw['id']
            if int(post_res_id) != user_token.post_info.res_id:
                return 'Token is not valid'
        user = user_token.user
    if not user:
        user = request.user                        
    if user and user.id:
        return user
    else:
        return 'You are not authorized'


def get_user_info(users):
    users_info = []
    for user in users:
        user_info = {}
        user_info['id'] = user_info['uid'] = user.id
        user_info['name'] = user.fullname()
        user_info['photo'] = user_info['image'] = user.image.url
        user_info['email'] = user.email
        groups = list(user.groups.all())
        group_name = ''
        if len(groups) > 0:
            group_name = groups[0].name.lower()
        user_info['group'] = group_name
        users_info.append(user_info)
    return users_info


#
#
# def authenticate(data):
#     db = data.get('db')
#     login = data.get('login')
#     password = data.get('password')
#     uid = request.session.authenticate(db, login, password)
#     return uid
#
#
# from dateutil import parser
#
#
# def change_datetime_format(val, format):
#     dt = parser.parse(val)
#     res = dt.strftime(format)
#     return res
#
#
# def to_datetime(val):
#     dt = parser.parse(val)
#     return dt
#
#
# # Socket Connetion

#
#
# def add_user_to_socket_list(user_data):
#     try:
#         # user_data = json.dumps(user_data)
#         requests.get(socket_server['url'] + '/odoo_event', params=user_data)
#     except:
#         print('odoo event failed')
