from odoo import http
from odoo.http import request
from odoo.addons.dn_base import ws_methods

class Document(http.Controller):

    def get_doc(self, data):
        try:
            doc_id = data['doc_id']
            model = data['model']
            token = data["token"]
            pdf = {"doc": "", "type": ""}
            if request.session.uid:
                doc = request.env[model].sudo().search([('id', '=', doc_id)])
                if doc.pdf_doc:
                    pdf['pdf_binary'] = doc.pdf_doc.decode('utf-8')
                    pdf['type'] = doc.path
            else:
                if token:
                    sign = request.env['e_sign.signature'].sudo().search([('token', '=', token)], limit=1)

                    if not sign:
                        return request.render("website.403")
                    doc = request.env[model].sudo().search([('id', '=', sign.document_id)])
                    if doc.pdf_doc:
                        pdf = doc.pdf_doc.decode('utf-8')
            return ws_methods.http_response('', pdf)
        except:
            return ws_methods.http_response('Document not found', {"pdf_binary": pdf})

    @http.route('/dn_documents/get_pdf',auth='none', csrf=False)
    def get_pdf(self, **kw):
        doc_id = kw['document_id']
        model = kw['model']
        token = kw.get("token")
        data = {
            "doc_id": doc_id,
            "token": token,
            "model": model,
        }

        return self.get_doc(data)

    @http.route('/dn_documents/get_pdf_from_parent_model', auth='none', csrf=False)
    def get_pdf_from_parent_model(self, **kw):
        doc_id = kw.get("res_id")
        token = kw.get("token")
        model = kw.get("model")
        data = {
            "doc_id" : doc_id,
            "token" : token,
            "model" :model,
        }
        return self.get_doc(data)
