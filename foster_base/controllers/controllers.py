# -*- coding: utf-8 -*-

import os
import json
import base64

import werkzeug

from odoo import http
import datetime as dateval
from odoo.http import request
from odoo import SUPERUSER_ID
from odoo.api import Environment
from odoo.addons.dn_base import ws_methods
from odoo import registry as registry_get
from PIL import Image, ImageFont, ImageDraw


class Foster(http.Controller):

    @http.route(['/foster/application'],
                type="http", auth="public", website=True, csrf=True)
    def fill_application(self,**kwargs):
        states = request.env['res.country.state'].search([])
        countries = request.env['res.country'].search([])
        return request.render('foster_base.foster_application_page',{'states':states,'countries':countries})

    @http.route(['/partner/application'],
                type="http", auth="public", website=True, csrf=True)
    def fill__partner_application(self, **kwargs):
        return request.render('foster_base.foster_partner_page')

    @http.route(['/family/members'],
                type="http", auth="public", website=True, csrf=True)
    def family_members_application(self, **kwargs):
        return request.render('foster_base.foster_family_members_page')


    @http.route('/application/submit', type="http", auth="public", website=True, csrf=True)
    def application_process(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value

        if http.request.env.user.name != "Public user":
            request.env['foster.applicants'].sudo().create({'last_name': values['last_name'],
            'first_name':values['first_name'],'middle_name':values['middle_name'],'other_name':values['other_name'],
            'sex':values['sex'],'state':values['states'],'place_of_birth':values['place_of_birth'],
            'birthdate':values['birth_date'],'address':values['address'],'town':values['town'],'zip':values['zip'],
            'home_phone':values['home_phone'],'work_phone':values['work_phone'],'cell_phone':values['cell_phone'],
            'security_number':values['security_number'],'applicant_email':values['email'],
            'date':values['date'],'citizen_ship':values['countries'],'immigration':values['immigration'],
            'education':values['education'],'last_grade':values['last_grade'],'lang_primary':values['lang_primary'],
            'lang_other':values['lang_other'],'comp_primary':values['comp_primary'],'comp_other':values['comp_other']})


        return werkzeug.utils.redirect("/partner/application")

    @http.route('/partner/submit', type="http", auth="public", website=True, csrf=True)
    def application_process_partner(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value

        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['foster.partner'].sudo().create({'spouse_last_name': values['spouse_last_name'],
                                                            'spouse_first_name': values['spouse_first_name']})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/partner/application")
            else:
                return werkzeug.utils.redirect("/family/members")


    @http.route('/family/members/submition', type="http", auth="public", website=True, csrf=True)
    def application_process_family_members(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['foster.family.members'].sudo().create({'full_name': values['full_name'],
                                                         'sex': values['sex'],
                                                                'birth_date': values['birth_date'],
                                                                'security_number': values['security_number'],
                                                                'living_at_hom': values['living_at_hom'],
                                                                'relation_to_applicant': values['relation_to_applicant']})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/family/members")
            else:
                return werkzeug.utils.redirect("/support/ticket/thanks")

    @http.route(['/foster/sign/<string:token>'],
                type='http', auth='public', website=True)
    def start_sign(self, token=None, **post):
        if not token:
            return
        else:
            sign = request.env['e_sign.signature'].sudo().search([('token', '=', token)], limit=1)

            if not sign:
                return request.render("website.403")
            doc = request.env['foster.sign_docs'].sudo().search([('id', '=', sign.document_id)])
            status = self.compute_status(doc, token)
            data = {'document': doc, 'page': None, 'token': sign.token, 'status': status}
            return request.render('foster_base.foster_sign_page', data)

    def compute_status(self,doc,token):
        pending = False
        found = False
        m_signature_status = "Not required"
        for signature in doc.signature_ids:
            if signature.token == token:
                found = True
                if not signature.draw_signature:
                    pending = True
        if pending:
            m_signature_status = "Pending"
        else:
            if found:
                m_signature_status = "Completed"
        return  m_signature_status

    @http.route('/foster/get_signature',auth='public', csrf=False, cors='*')
    def get_signature(self, **kw):
        try:
            doc_sign = self.get_doc_signature(kw)
            if not 'sign' in doc_sign:
                return ws_methods.http_response(doc_sign)
            signature = doc_sign['sign']

            draw_signature = signature.draw_signature
            if draw_signature:
                draw_signature = draw_signature.decode('utf-8')
            else:
                draw_signature = ''
            return ws_methods.http_response('', {"signature": draw_signature})
        except:
            return ws_methods.handle()


    @http.route('/foster/get_pdf',auth='none', csrf=False, cors='*')
    def get_pdf(self, **kw):
        doc_id = kw['document_id']
        doc=http.request.env['foster.sign_docs'].sudo().search([('id','=',doc_id)])
        pdf = doc.pdf_doc.decode('utf-8')
        return ws_methods.http_response('', {"pdf_binary": pdf})

    def get_doc_signature(self, kw):
        if not kw:
            return ws_methods.http_response("Invalid Input")
        doc_id = kw.get('document_id')
        if not doc_id:
            return ws_methods.http_response("Invalid Document Id")

        sign_token = False
        uid = http.request.uid
        if not uid or uid == 4:
            token = kw.get('token')
            if token and kw.get('db'):
                uid = ws_methods.check_auth(kw)
            else:
                sign_token = token

        if not uid and not sign_token:
            return "Unauthorized"

        my_model = http.request.env['foster.sign_docs']
        doc = my_model.sudo().search([('id', '=', doc_id)])
        if not doc:
            return "Document not found"
        if sign_token:
            signature = doc.signature_ids.filtered(lambda r: r.token == sign_token)
        else:
            signature = doc.signature_ids.filtered(lambda r: r.user_id.id == uid)
        if not signature:
            return "Signature not found"
        return {'doc': doc, 'sign': signature}

    @http.route('/foster/save_signature',auth='public', csrf=False, cors='*')
    def save_signature(self, **kw):

        try:
            doc_sign = self.get_doc_signature(kw)
            if not 'sign' in doc_sign:
                return ws_methods.http_response(doc_sign)
            signature = doc_sign['sign']
            doc = doc_sign['doc']

            if kw['type'] == "auto":
                curr_dir = os.path.dirname(__file__)
                pth = curr_dir.replace('controllers', 'doc_signs')
                font_dir = curr_dir.replace('controllers','static')

                font = ImageFont.truetype(font_dir+"/FREESCPT.TTF", 200)
                sz=font.getsize(signature.user_id.name)
                sz = (sz[0] + 50, sz[1])
                img = Image.new('RGB', sz, (255, 255, 255))
                d = ImageDraw.Draw(img)
                d.text((40, 0), signature.user_id.name, (0, 0, 0), font=font)
                uid=http.request.env.user.id
                img_path=pth + "/"+str(uid)+"piic.png"
                img.save(img_path)

                res = open(img_path, 'rb')
                read = res.read()
                binary_signature = base64.encodebytes(read)
                binary_signature= binary_signature.decode('utf-8')
                return ws_methods.http_response('', {"signature": binary_signature})
            else:
                binary_signature = kw.get('binary_signature')
                if not binary_signature:
                    return ws_methods.http_response("Please provide signatures")
                if kw['type'] == "draw":
                    signature.write({'draw_signature': binary_signature})
                elif kw['type'] == "upload":
                    signature.write({'draw_signature': binary_signature, 'filename': kw['filename']})
                else:
                    return ws_methods.http_response("Unknown sign type")

            doc.embed_signature(doc)
            # doc.notify_signed_mail(signature.id)
            pdf = doc.pdf_doc.decode('utf-8')
            return ws_methods.http_response('', {"signature":binary_signature,"pdf_binary": pdf})
        except:
            return ws_methods.handle()