import os
import base64
from odoo import http
from odoo.addons.dn_base import ws_methods
from PIL import Image, ImageFont, ImageDraw

class DocumentSign(http.Controller):

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

        my_model = http.request.env['meeting_point.document']
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

    @http.route('/document/get_signature', auth='public', csrf=False, cors='*')
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

    @http.route('/document/get_pdf', auth='public', csrf=False, cors='*')
    def get_pdf(self, **kw):
        doc_id = kw['document_id']
        doc = http.request.env['meeting_point.document'].sudo().search([('id', '=', doc_id)])
        pdf = doc.pdf_doc.decode('utf-8')
        return ws_methods.http_response('', {"pdf_binary": pdf})

    @http.route('/document/save_signature', auth='public', csrf=False, cors='*')
    def save_signature(self, **kw):

        try:
            doc_sign = self.get_doc_signature(kw)
            if not 'sign' in doc_sign:
                return ws_methods.http_response(doc_sign)
            signature = doc_sign['sign']
            doc = doc_sign['doc']

            binary_signature = kw.get('binary_signature')
            if not binary_signature:
                return ws_methods.http_response("Please provide signatures")

            if kw['type'] == "upload":
                signature.write({'draw_signature': binary_signature, 'filename': kw['filename']})
            else:
                if kw['type'] == "auto":
                    # pth = tempfile.gettempdir()
                    curr_dir = os.path.dirname(__file__)
                    pth = curr_dir.replace('controllers', 'doc_signs')
                    font_dir = curr_dir.replace('controllers', 'static')

                    font = ImageFont.truetype(font_dir + "/FREESCPT.TTF", 200)
                    sz = font.getsize(signature.user_id.name)
                    sz = (sz[0] + 50, sz[1])
                    img = Image.new('RGB', sz, (255, 255, 255))
                    d = ImageDraw.Draw(img)
                    d.text((40, 0), signature.user_id.name, (0, 0, 0), font=font)
                    uid = http.request.env.user.id
                    img_path = pth + "/" + str(uid) + "piic.png"
                    img.save(img_path)

                    res = open(img_path, 'rb')
                    read = res.read()
                    binary_signature = base64.encodebytes(read)
                    binary_signature = binary_signature.decode('utf-8')
                    return ws_methods.http_response('', {"signature": binary_signature})
                    # signature.write({'draw_signature': binary_signature})
                else:
                    if kw['type'] == "draw":
                        signature.write({'draw_signature': binary_signature})
            doc.embed_signature(doc)
            doc.notify_signed_mail(signature.id)
            pdf = doc.pdf_doc.decode('utf-8')
            return ws_methods.http_response('', {"signature": binary_signature, "pdf_binary": pdf})
        except:
            return ws_methods.handle()

    @http.route('/document/mp/save_doc', auth='public', csrf=False, cors='*')
    def save_doc_esign(self, **kw):
        vals=kw
        doc = http.request.env['meeting_point.document'].create(vals)
        view_id = http.request.env.ref('meeting_point.view_meeting_assign_sign_form').id
        return ws_methods.http_response('', {"doc_id": doc.id,"view_id":view_id})