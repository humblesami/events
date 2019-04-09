import datetime
import os
import json
import threading
import time
import uuid
import base64
from odoo import http, api
from werkzeug import urls
from random import randint
from odoo.http import request
from odoo.tools import pycompat
from collections import OrderedDict
from odoo.exceptions import UserError
from odoo.addons.dn_base import ws_methods
from PIL import Image, ImageFont, ImageDraw

class Signature(http.Controller):

    @http.route('/e-sign/get_signature', csrf=False,auth='public')
    def get_signature(self, **kw):
        try:
            if not kw:
                return ws_methods.http_response("Invalid Input")
            req_env = http.request.env
            my_model = req_env['e_sign.signature']
            if not 'signature_id' in kw:
                return ws_methods.http_response("Invalid Input")

            signature_id = kw['signature_id']
            sign = my_model.sudo().search([('id', '=', signature_id)])

            if not sign:
                return ws_methods.http_response("Unauthorized")

            draw_signature = sign.draw_signature
            if draw_signature:
                draw_signature = draw_signature.decode('utf-8')
            else:
                if sign.type == 'initial':
                    draw_signature=self.get_auto_sign(sign)
            return ws_methods.http_response('', {"signature": draw_signature})
        except:
            return ws_methods.handle()

    @http.route('/e-sign/save_signature', csrf=False,auth='public')
    def save_signature(self, **kw):
        doc = False
        try:
            if not kw:
                return ws_methods.http_response("Invalid Input")
            url = kw['url']
            m = url.split("model=")[1].split("&")[0]
            model = self.get_model(m)
            my_model = http.request.env[model]
            doc_id = kw['document_id']
            doc = my_model.sudo().search([('id', '=', doc_id)])
            if not 'signature_id' in kw:
                return ws_methods.http_response("Invalid Input")
            # if not 'binary_signature' in kw:
            #     return ws_methods.http_response("Please provide signatures")
            signature_id = kw['signature_id']
            token = kw.get('token')
            sign1 = http.request.env['e_sign.signature'].sudo().search([('token', '=', token)])
            uid = False
            if sign1:
                uid = sign1[0].user_id
            sign = http.request.env['e_sign.signature'].sudo().search([('id', '=', signature_id)])
            if http.request.uid ==4:

                if uid != sign.user_id:
                    raise UserError(("Unauthorized"))
            else:
                if http.request.uid !=sign.user_id.id and uid != sign.user_id:
                    raise UserError(("Unauthorized"))
            binary_signature = ""
            if kw['type'] == "upload":
                binary_signature = kw['binary_signature']
                sign.write({'draw_signature': binary_signature, 'filename': kw['filename']})
            else:
                if kw['type'] == "auto":

                    binary_signature= self.get_auto_sign(sign)
                    # sign.write({'draw_signature': binary_signature})

                if kw['type'] == "draw":
                    binary_signature = kw['binary_signature']
                    sign.with_context({"doc": doc}).write({'draw_signature': binary_signature})
                if kw['type'] == "date":
                    # dt=kw['date']
                    dt=datetime.datetime.today().strftime('%b,%d  %Y')
                    binary_signature = self.get_auto_sign(sign,dt)
                    sign.with_context({"doc": doc}).write({'draw_signature': binary_signature})
                if kw['type'] == "text":
                    text=kw['text']
                    binary_signature = self.get_sign_text(sign,text)
                    sign.with_context({"doc": doc}).write({'draw_signature': binary_signature})



            doc.embed_signatures()
            if not doc:
                return ws_methods.http_response("Document : " + doc_id + " does not exist")

            pdf = doc.pdf_doc.decode('utf-8')
            doc_data = self.get_doc_data(doc,token)

            return ws_methods.http_response('', {"pdf_binary": pdf,"signature":binary_signature, "doc_data":doc_data})
        except:
            return ws_methods.handle()

    @http.route('/e-sign/delete_signature', csrf=False,auth='user')
    def delete_signature(self, **kw):
        doc = False
        try:
            if not kw:
                return ws_methods.http_response("Invalid Input")
            url = kw['url']
            m = url.split("model=")[1].split("&")[0]
            model = self.get_model(m)
            my_model = http.request.env[model]
            if not 'signature_id' in kw:
                return ws_methods.http_response("Invalid Input")

            signature_id = kw['signature_id']
            sign = http.request.env['e_sign.signature'].search([('id', '=', signature_id)])
            doc_id = kw['document_id']
            doc = my_model.search([('id', '=', doc_id)])
            doc.emit_data_update(doc)
            sign.unlink()

            if not doc:
                return ws_methods.http_response("Document : " + doc_id + " does not exist")
            doc.pdf_doc=doc.original_pdf
            doc.embed_signatures()

            pdf = doc.pdf_doc.decode('utf-8')
            doc_data = self.get_doc_data(doc)

            return ws_methods.http_response('', {"pdf_binary": pdf,"doc_data":doc_data})
        except:
            return ws_methods.handle()


    @http.route('/e-sign/get_doc_data', csrf=False,auth='public')
    def get_docc_data(self, **kw):
        try:
            if not kw:
                return ws_methods.http_response("Invalid Input")
            req_env = http.request.env
            url = kw['url']
            m=url.split("model=")[1].split("&")[0]
            model=self.get_model(m)
            my_model = req_env[model]
            if not 'document_id' in kw:
                return ws_methods.http_response("Invalid Document Id")

            doc_id = kw['document_id']
            token = kw.get('token')
            doc = my_model.sudo().search([('id', '=', doc_id)])
            if not doc:
                return ws_methods.http_response("Document : "+doc_id+" does not exist")
            usrs = self.get_users(doc)
            users = []
            for u in usrs:
                users.append({"id": u["id"], "name": u["name"]})
            doc_data = self.get_doc_data(doc, token)

            pdf=doc.pdf_doc.decode('utf-8')
            meeting_id = False
            send_to_all = False
            meetings = []
            if m == "meeting_point.document":
                meeting_id = False
                send_to_all = doc.send_to_all
                if doc.meeting_id:
                    meeting_id = doc.meeting_id.id
                for m in req_env['calendar.event'].sudo().search([]):
                    arr = []
                    for p in m.partner_ids:
                        if p.user_id:
                            arr.append({'id': p.user_id.id, 'name': p.user_id.name})
                    meetings.append({'id': m.id, 'name': m.name, 'attendees': arr})


            is_admin = req_env.user.has_group('dn_base.group_dn_app_manager')
            if token:
                is_admin=False
            return ws_methods.http_response('', {"pdf_binary": pdf,"users":users,"doc_data":doc_data,"isAdmin":is_admin,"meetings":meetings,"meeting_id":meeting_id,"send_to_all":send_to_all})

        except:
            return ws_methods.handle()

    @http.route('/e-sign/save_sign_data', csrf=False,auth='public')
    def save_sign_data(self, **kw):
        try:
            if not kw:
                return ws_methods.http_response("Invalid Input")
            req_env = http.request.env
            url = kw['url']
            m = url.split("model=")[1].split("&")[0]
            model = self.get_model(m)
            my_model = req_env[model]
            if not 'document_id' in kw:
                return ws_methods.http_response("Invalid Document Id")
            doc_id = kw['document_id']
            work_flow_enabled=kw['work_flow_enabled']
            meeting_id = kw['meeting_id']
            send_to_all = kw['send_to_all']
            doc = my_model.sudo().search([('id', '=', doc_id)])
            if work_flow_enabled=='true':
                doc.sudo().write({'workflow_enabled':True})
            if work_flow_enabled=='false':
                doc.sudo().write({'workflow_enabled': False})
            if send_to_all=='true':
                doc.sudo().write({'send_to_all':True})
            if send_to_all=='false':
                doc.sudo().write({'send_to_all': False})
            if meeting_id not in ['False','false']:
                meeting_id=int(meeting_id)
                doc.sudo().write({'meeting_id': meeting_id})
            if meeting_id in ['False','false']:
                doc.sudo().write({'meeting_id': False})
            signatures=json.loads(kw['data'])
            email_data = []
            if send_to_all == 'true':
                m = req_env['calendar.event'].search([('id','=',meeting_id)])
                sign_top = 5
                c = 0
                for p in m.partner_ids:
                    if p.user_id:
                        if c == 0:
                            sign_left = 3
                        if c == 1:
                            sign_left = 51

                        token = pycompat.text_type(uuid.uuid4())
                        obj = {'document_id': doc_id, 'user_id': p.user_id.id, 'type': "sign",'token': token,
                               'left': sign_left, 'top': sign_top,'height': 40, 'width': 140,
                               'zoom': 300
                               }

                        doc.signature_ids = [(0, 0, obj)]

                        user_email = p.user_id.email
                        email = False
                        mail = False

                        if not doc.workflow_enabled:
                            mail = True
                        elif doc.workflow_enabled:
                            if doc.signature_ids.filtered(lambda r: r.token != token).__len__() == 0:
                                mail = True
                            else:
                                all_signed = True
                                for s in doc.signature_ids.filtered(lambda r: r.token != token):
                                    if not s.draw_signature:
                                        all_signed = False
                                        break
                                if all_signed:
                                    mail = True
                        if mail:
                            email_data.append(
                                {'user_email': user_email, 'email': email, 'token': token, 'model': model,
                                 'doc_id': doc_id, 'subject': kw['subject'], 'message': kw['message']})
                        if c == 1:
                            c = 0
                            sign_top += 15
                            continue
                        c += 1
                doc.add_pages_for_sign(doc)
            else:
                user_ids = [s["user_id"] for s in signatures]
                user_ids = list(OrderedDict.fromkeys(user_ids))
                for u in user_ids:
                    token = pycompat.text_type(uuid.uuid4())
                    for s in [x for x in signatures if x['user_id'] == u] :
                        if not (s['user_id']!="0" or (s['email']!="" and s['name']!="")):
                            return ws_methods.http_response("Select user or enter email and name")

                        obj={'document_id':s['document_id'],'user_id':s['user_id'],
                                         'email': s['email'],'name': s['name'],'field_name': s['field_name'],
                                         'left':s['left'],'top':s['top'],'page':s['page'],
                                         'height':s['height'],'width':s['width'],'zoom': s['zoom'],'type': s['type'],'token':token}
                        doc.signature_ids=[(0,0,obj)]
                    user_email = doc.signature_ids.filtered(lambda r: r.token == token)[0].user_id.email
                    email = doc.signature_ids.filtered(lambda r: r.token == token)[0].email
                    mail = False

                    if not doc.workflow_enabled:
                        mail = True
                    elif doc.workflow_enabled:
                        if doc.signature_ids.filtered(lambda r: r.token != token).__len__() == 0:
                            mail = True
                        else:
                            all_signed = True
                            for s in doc.signature_ids.filtered(lambda r: r.token != token):
                                if not s.draw_signature:
                                    all_signed = False
                                    break
                            if all_signed:
                                mail = True
                    if mail:
                        email_data.append(
                            {'user_email': user_email, 'email': email, 'token': token, 'model': model,'doc_id': doc_id, 'subject': kw['subject'], 'message': kw['message']})

            t = threading.Thread(target=req_env['e_sign.document'].send_mails_thread, args=([email_data]))
            t.start()


            token = kw.get('token')
            doc_data=self.get_doc_data(doc,token)
            pdf = doc.pdf_doc.decode('utf-8')

            return ws_methods.http_response('', {"pdf_binary": pdf,"doc_data":doc_data})

        except:
            return ws_methods.handle()

    # Public signature
    @http.route(['/e_sign/sign/<string:model>/<string:token>'],
                type='http', auth='public', website=True)
    def start_sign(self,model=None, token=None, **post):
        if not token:
            return
        else:
            sign = request.env['e_sign.signature'].sudo().search([('token', '=', token)], limit=1)

            if not sign:
                return request.render("website.403")
            url = model
            m = url.split("model=")[1].split("&")[0]
            id=url.split("id=")[1].split("&")[0]
            doc = request.env[m].sudo().search([('id','=',int(id))])
            status=self.compute_status(doc,token)
            data = {'document': doc, 'page': None, 'token': sign.token, 'status': status}
            return request.render('e_sign.e_sign_sign_page', data)


    def compute_status(self,doc,token):
        pending = []
        signed = []
        my_signature_status = "Not required"
        for signature in doc.signature_ids:
            if signature.token == token and signature.type=="sign":
                if not signature.draw_signature:
                    pending.append(signature.page)
                if signature.draw_signature:
                    signed.append(signature.page)
        if pending:
            status = "Pending(pages:"
            for p in pending:
                status += str(p) + ","
            status += ")"
            my_signature_status = status
        else:
            if signed:
                status = "Done(pages:"
                for p in signed:
                    status += str(p) + ","
                status += ")"
                my_signature_status = status
        return  my_signature_status

    def get_auto_sign(self,sign,date=""):
        curr_dir = os.path.dirname(__file__)
        pth = curr_dir.replace('controllers', 'doc_signs')
        font_dir = curr_dir.replace('controllers', 'static')
        font = ImageFont.truetype(font_dir + "/FREESCPT.TTF", 200)
        txt = sign.user_id.name or sign.name
        if sign.type == "initial":
            txt = ''.join([x[0].upper() + "." for x in txt.split(' ')])
        if sign.type == "date":
            font = ImageFont.truetype(font_dir + "/ubuntu.regular.ttf", 200)
            txt = date

        sz = font.getsize(txt)
        sz = (sz[0]+50, sz[1])
        # if sz[0] < 100:
        #     sz=(150,50)
        img = Image.new('RGB', sz, (255, 255, 255))
        d = ImageDraw.Draw(img)

        d.text((40, 0), txt, (0, 0, 0), font=font)

        img_path = pth + "/pic" + str(randint(1, 99)) + ".png"
        img.save(img_path)

        res = open(img_path, 'rb')
        read = res.read()
        binary_signature = base64.encodebytes(read)
        binary_signature = binary_signature.decode('utf-8')
        return  binary_signature

    def get_sign_text(self,sign,text):
        curr_dir = os.path.dirname(__file__)
        pth = curr_dir.replace('controllers', 'doc_signs')
        font_dir = curr_dir.replace('controllers', 'static')
        font = ImageFont.truetype(font_dir + "/FREESCPT.TTF", 200)


        sz = font.getsize(text)
        sz = (sz[0]+50, sz[1])
        # if sz[0] < 100:
        #     sz=(150,50)
        img = Image.new('RGB', sz, (255, 255, 255))
        d = ImageDraw.Draw(img)

        d.text((40, 0), text, (0, 0, 0), font=font)

        img_path = pth + "/pic" + str(randint(1, 99)) + ".png"
        img.save(img_path)

        res = open(img_path, 'rb')
        read = res.read()
        binary_signature = base64.encodebytes(read)
        binary_signature = binary_signature.decode('utf-8')
        return  binary_signature

    def get_doc_data(self, doc, token=False):
        doc_data = []
        req_env = http.request.env
        uid = False
        if token:
            signs = doc.signature_ids.filtered(lambda r: r.token == token)
            if signs:
                uid = signs[0].user_id
        for s in doc.signature_ids:
            signed = False

            my_record = False
            if s.draw_signature:
                signed = True
            if token:
                if (uid == s.user_id and s.user_id) or token == s.token:
                    my_record = True
            else:
                if (req_env.user == s.user_id and s.user_id):
                    my_record = True
            doc_data.append(
                {"id": s.id, "name": s.user_id.name or s.name, "left": s.left, "top": s.top, "page": s.page,
                 "signed": signed, "zoom": s.zoom, "width": s.width, "height": s.height, "my_record": my_record,
                 "type": s.type,"field_name": s.field_name})



        return doc_data

    def create_response_and_send_mail(self,user_email,email,token,model,doc_id,subject,message):
        """ Create one mail by recipients and replace __URL__ by link with identification token """
        # set url
        req_env = http.request.env
        web_url = ws_methods.get_main_url()
        web_url = '/' if req_env.context.get('relative_url') else \
            web_url
        Mail = req_env['mail.mail']
        url = urls.url_join(web_url, "e_sign/sign")
        # url = urls.url_parse(url).path[1:]  # dirty hack to avoid incorrect urls
        if token:
            url = url + '/model='+model+'&id='+doc_id+'&/' + token
        # post the message
        template = req_env.ref('e_sign.email_template_signature_e_sign', raise_if_not_found=False)
        body = template.body_html.replace("__URL__", url)
        body = body.replace("__Message__", message)
        values = {
            'model': None,
            'res_id': None,
            'subject': subject,
            'body': body,
            'body_html': body,
            'parent_id': None,
            # 'attachment_ids': wizard.attachment_ids and [(6, 0, wizard.attachment_ids.ids)] or None,
            'email_from': '"OdooHQ" <a@a.com>',
            'auto_delete': True,
        }
        if user_email or email:
            if user_email:
                u=req_env['res.users'].search([('login','=',user_email)])
                values['recipient_ids'] = [(4, u.partner_id.id)]
            if email:
                values['email_to'] = email
            Mail.create(values).send()

    def send_mails_thread(self,email_data):
        with api.Environment.manage():
            new_cr = self.pool.cursor()
            self = self.with_env(self.env(cr=new_cr))
            time.sleep(20)
            for m in email_data:
                self.create_response_and_send_mail(m['user_email'],m['email'],m['token'],m['model'],m['doc_id'],m['subject'],m['message'])

            self._cr.commit()
            self._cr.close()

    def get_users(self,doc):
        usrs=request.env['res.users'].sudo().search([("id","!=",1)])
        users=[]
        for u in usrs:
            users.append({"id": u.id, "name": u.name})
        return users

    def get_model(self,model):
        return "e_sign.document"

    @http.route('/get-sign-token', type='http', auth='public', cors='*')
    def get_sign_token(self, **kw):
        try:
            uid = ws_methods.check_auth(kw)
            if not uid:
                return ws_methods.not_logged_in()
            doc_id = kw.get('doc_id')
            doc_id = int(doc_id)
            if not doc_id:
                return ws_methods.http_response('Invalid document id')
            else:
                doc = request.env['meeting_point.document'].search([('id', '=', doc_id)])
                sign = doc.signature_ids.filtered(lambda r: r.user_id.id == uid)
                sign = sign[0]
            return ws_methods.http_response('', {'token': sign.token})
        except:
            ws_methods.handle()
