from odoo import http
from odoo.http import request
from odoo.addons.dn_base import ws_methods
class Document(http.Controller):
    @http.route('/dn_documents/get_pdf',auth='public', csrf=False)
    def get_pdf(self, **kw):
        doc_id = kw.get('document_id')
        model = kw.get('model')
        token = kw.get("token")
        if not model or not doc_id:
            return ws_methods.http_response('Invalid document id/type')
        try:
            if request.session.uid:
                doc = request.env[model].sudo().search([('id', '=', doc_id)])
            elif token:
                sign = request.env['e_sign.signature'].sudo().search([('token', '=', token)], limit=1)
                if not sign:
                    return ws_methods.http_response('No signature assigned to you')
                doc = request.env[model].sudo().search([('id', '=', sign.document_id)])
            else:
                return ws_methods.http_response('Not authorized')
            if doc and doc.pdf_doc:
                pdf = doc.pdf_doc.decode('utf-8')
                return ws_methods.http_response('', {"pdf_binary": pdf})
            else:
                return ws_methods.http_response('Document Not Found')
        except:
            return ws_methods.handle()
