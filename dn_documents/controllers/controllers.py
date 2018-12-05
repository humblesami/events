from odoo import http
from odoo.http import request
from odoo.addons.dn_base import ws_methods

class Document(http.Controller):

    @http.route('/dn_documents/get_pdf',auth='none', csrf=False)
    def get_pdf(self, **kw):
        doc_id = kw.get('document_id')
        model = kw.get('model')
        if not doc_id or not model:
            return ws_methods.http_response('Invalid document id/type')
        token = kw.get("token")
        try:
            pdf = {"doc": "", "type": ""}
            uid = ws_methods.check_auth(kw)
            if uid:
                doc = request.env[model].sudo().search([('id', '=', doc_id)])
                if doc.pdf_doc:
                    pdf['pdf_binary'] = doc.pdf_doc.decode('utf-8')
                    pdf['type'] = doc.path
            elif token:
                sign = request.env['e_sign.signature'].sudo().search([('token', '=', token)], limit=1)
                if not sign:
                    return ws_methods.http_response("Not authorized for signature")
                doc = request.env[model].sudo().search([('id', '=', sign.document_id)])
                if doc.pdf_doc:
                    pdf = doc.pdf_doc.decode('utf-8')
            else:
                return ws_methods.http_response("Invalid credentials")
            return ws_methods.http_response('', pdf)
        except:
            return ws_methods.handle()
