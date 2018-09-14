from odoo import http
from odoo.http import request
from odoo.addons.dn_base import ws_methods

class Document(http.Controller):

    @http.route('/dn_documents/get_pdf',auth='none', csrf=False)
    def get_pdf(self, **kw):
        doc_id = kw['document_id']
        model = kw['model']
        token = kw.get("token")
        pdf=""

        try:
            if request.session.uid:
                doc = request.env[model].sudo().search([('id', '=', doc_id)])
                if doc.pdf_doc:
                    pdf = doc.pdf_doc.decode('utf-8')
            else:
                if token:
                    sign = request.env['e_sign.signature'].sudo().search([('token', '=', token)], limit=1)

                    if not sign:
                        return request.render("website.403")
                    doc = request.env[model].sudo().search([('id', '=', sign.document_id)])
                    if doc.pdf_doc:
                        pdf = doc.pdf_doc.decode('utf-8')
            return ws_methods.http_response('', {"pdf_binary": pdf})
        except:
            return ws_methods.http_response('Document not found', {"pdf_binary": pdf})
