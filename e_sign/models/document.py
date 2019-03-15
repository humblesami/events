import os
import base64
import tempfile
from fpdf import FPDF
from werkzeug import urls
from random import randint
from odoo.exceptions import UserError
from odoo.addons.dn_base import ws_methods
from odoo import models, fields, api, http
from PyPDF2 import PdfFileReader, PdfFileWriter
from odoo.addons.dn_base.statics import raise_dn_model_error

class Document(models.Model):
    _name = 'e_sign.document'
    _inherit = 'dn_documents.allfiles'

    content = fields.Html(string="Content")
    from_code = fields.Boolean(string="From Code")
    details_opener = fields.Char(string="View Details")
    workflow_enabled = fields.Boolean(string="Enable workflow")

    signature_ids = fields.Many2many('e_sign.signature', string="Signature(s)")
    sign_ids = fields.Many2many('e_sign.signature', string="Signature(s)" ,compute="_compute_signs_only")
    my_signature_status = fields.Char(string="My Signature", compute="_compute_status")
    pending_signatures = fields.Char(string="Pending Signatures", compute="_compute_pending")

    def _compute_pending(self):
        for doc in self:
            total = 0
            pending = 0
            for signature in doc.signature_ids.filtered(lambda r:r.type == "sign"):
                total += 1
                if not signature.draw_signature and not signature.upload_signature and signature.type=="sign":
                    pending += 1
            doc.pending_signatures = str(pending) + " of " + str(total)
            #doc.pending_signatures = pending

    def _compute_status(self):
        for doc in self:
            pending=False
            found=False
            doc.my_signature_status = "Not required"
            for signature in doc.signature_ids:
                if signature.user_id == self.env.user:
                    found=True
                    if not signature.draw_signature:
                        pending=True
            if pending:
                doc.my_signature_status ="Pending"
            else:
                if found:
                    doc.my_signature_status = "Completed"
    def _compute_signs_only(self):
        for doc in self:
            doc.sign_ids=doc.signature_ids.filtered(lambda r:r.type == "sign")



    @api.onchange('attachment')
    def validate_file_name_type(self):
        if self.attachment:
            if not self.filename:
                raise UserError("There is no file")
            else:
                # Check the file's extension
                if not self.filename.endswith(('ppt', 'pptx', 'doc', 'docx', 'pdf')):
                    raise UserError("Invalid file uploaded, Only microsoft word, power point and PDF files are allowed")

    def vaildate_file(self,values):
        if 'attachment' not in values:
            raise UserError("Please Upload Attachment")
        if not values['attachment']:
            raise UserError("Please Upload Attachment")
        if 'filename' not in values:
            raise UserError("Invalid File Name")
        if not values['filename']:
            raise UserError("Invalid File Name")
        if not values['filename'].endswith(('pdf','ppt', 'pptx', 'doc', 'docx')):
                #('ppt', 'pptx', 'doc', 'docx',
                raise UserError("Invalid file uploaded, Only microsoft word, power point and PDF files are allowed")

    @api.model
    def create(self, values):
        try:
            doc = super(Document, self).create(values)
            return doc
        except:
            raise_dn_model_error("Error while creating e-sign document \n")

    def write(self, values):
        try:
            super(Document, self).write(values)
            return True
        except:
            raise_dn_model_error("Error while writing e-sign document \n")

    def create_signature(self, uid, doc_id):
        vals = {
            'user_id': uid,
            'document_id': doc_id,
        }
        self.env['e_sign.signature'].create(vals)

    def embed_signatures(self):

        file = self.original_pdf
        signed_doc=self.get_signed_doc(file,self.signature_ids)
        self.sudo().write({'pdf_doc': signed_doc, 'from_code': True})

    def send_next_mail(self,sign):
        """ Create one mail by recipients and replace __URL__ by link with identification token """
        req_env = self.env
        all_signs=req_env['e_sign.signature'].search([('token', '=', sign.token)])
        all_signed=True
        for s in all_signs:
            if not s.draw_signature:
                all_signed=False
        if not all_signed:
            return
        # set url

        web_url = ws_methods.get_main_url()
        web_url = '/' if req_env.context.get('relative_url') else \
            web_url
        Mail = req_env['mail.mail']
        url = urls.url_join(web_url, "e_sign/sign")
        # url = urls.url_parse(url).path[1:]  # dirty hack to avoid incorrect urls
        next_signs=self.signature_ids.filtered(lambda r:r.token != sign.token and not r.draw_signature)
        if next_signs:
            next_sign=next_signs[0]
        if not next_signs:
            return
        if next_sign.token:
            url = url + '/model='+self._name+'&id='+str(self.id)+'&/' + next_sign.token
        # post the message
        template = req_env.ref('e_sign.email_template_signature_e_sign', raise_if_not_found=False)
        values = {
            'model': None,
            'res_id': None,
            'subject': "Signature required",
            'body': template.body_html.replace("__URL__", url),
            'body_html': template.body_html.replace("__URL__", url),
            'parent_id': None,
            # 'attachment_ids': wizard.attachment_ids and [(6, 0, wizard.attachment_ids.ids)] or None,
            'email_from': '"OdooHQ" <a@a.com>',
            'auto_delete': True,
        }
        if next_sign.user_id.email:
            u=req_env['res.users'].search([('email','=',next_sign.user_id.email)])
            values['recipient_ids'] = [(4, u.partner_id.id)]
        if next_sign.email:
            values['email_to'] = next_sign.email
        Mail.create(values).send()

    def get_signed_doc(self,pdf,signatures):

        #pth = tempfile.gettempdir()
        curr_dir = os.path.dirname(__file__)
        pth = curr_dir.replace('models', 'doc_signs')

        file = pdf
        pdf_doc = base64.b64decode(file)
        # f = base64.decodestring(file)

        fobj = tempfile.NamedTemporaryFile(delete=False)
        fname1 = fobj.name
        fobj.write(pdf_doc)
        fobj.close()

        input = PdfFileReader(open(fname1, "rb"))
        # Addition of code for orientation correction Asfand
        pageValue = input.getPage(0)
        pageOrientation = pageValue.get('/Rotate')
        page = input.getPage(0).mediaBox
        zAxis = page.getUpperRight_x()
        yAxis = page.getUpperLeft_x()
        width = int(zAxis - yAxis)

        height = int(page.getUpperRight_y() - page.getLowerRight_y())
        solution = [width, height]
        if width > height or pageOrientation == 90:
            if height > width:
                orientation = 'L'
            else:
                orientation = 'P'
        elif pageOrientation == 0 or pageOrientation == 180 or pageOrientation == None:
            if width > height:
               orientation = 'L'
            else:
                orientation = 'P'

        output = PdfFileWriter()
        pdf = FPDF(orientation, 'pt', solution)
        pdf.add_page(orientation=orientation)
        signatures=signatures.sorted(key=lambda r: r.page)
        current_page=1
        sign_pages=[]
        for s in signatures:
            if s.draw_signature:
                pg =s.page
                if pg !=current_page:
                    for i in range(pg-current_page):
                        pdf.add_page(orientation=orientation)

                file_s = s.draw_signature
                # f = base64.decodestring(file_s)
                img_file = base64.b64decode(file_s)
                # create a writable image and write the decoding result
                exten = 'png'
                if s.filename:
                    exten = s.get_extension(s.filename)
                signarure_image_path = pth+'/pic2' +str(s.id)+ "." + exten
                image_result = open(signarure_image_path,'wb')
                image_result.write(img_file)
                image_result.close()
                left=(s.left/100)*width
                top=(s.top/100)*height

                if s.zoom >width:
                    diff=s.zoom - width
                    perc = (width / s.zoom)
                    w=s.width *perc
                    h = s.height *perc

                if s.zoom <width:
                    diff= width-s.zoom
                    perc=(diff/s.zoom)
                    plus=perc*s.width
                    w=s.width + plus
                    plus = perc * s.height
                    h = s.height + plus
                if s.zoom ==width:
                    w=s.width
                    h = s.height

                pdf.image(signarure_image_path, x=left, y=top, w=w, h=h)
                current_page=pg
                sign_pages.append(pg)
        signature_only_pdf_path = pth + "/signature-pdf-"+str(randint(1, 99))+".pdf"
        pdf.output(signature_only_pdf_path, "F")
        pdf.close()

        signaturepdf = PdfFileReader(open(signature_only_pdf_path, "rb"))
        for page_number in range(input.getNumPages()):
            page = input.getPage(page_number)
            if page_number+1 in sign_pages:
                sign_page = signaturepdf.getPage(page_number)
                if sign_page:
                    page.mergePage(sign_page)
            output.addPage(input.getPage(page_number))

        output_pdf_path = pth + "/signed-doc-output-"+str(randint(1, 99))+".pdf"
        with open(output_pdf_path, "wb") as outputStream:
            output.write(outputStream)
        res = open(output_pdf_path, 'rb')
        read = res.read()
        res_encode = base64.b64encode(read)
        res.close()
        return  res_encode

    def get_extension(self, filename):
        ar = filename.split('.')
        return ar[len(ar)-1]


    def assign_signatures(self):
        view_id = self.env.ref('e_sign.doc_edit_form').id
        return {
            'type': 'ir.actions.act_window',
            'name': 'Assign Signatures',
            'view_id': view_id,
            'view_mode': 'form',
            'res_model': self._name,
            'res_id': self.id,
            'target': 'current',
        }
    def open_signature_assign_form(self):

        view_id = self.env.ref('e_sign.doc_assign_signatures_form').id
        return {
            'type': 'ir.actions.act_window',
            'name': 'View Document',
            'view_id': view_id,
            'view_mode': 'form',
            'res_model': self._name,
            'res_id': self.id,
            'context': {'form_view_initial_mode': 'edit', 'force_detailed_view': 'true'},
            'target': 'current',
        }

    @api.model
    def search(self, args, offset=0, limit=0, order=None, count=False):
        if not self.env.user.has_group('dn_base.group_dn_app_manager') and not self.env.user.has_group('base.group_system'):
            list=self.env['e_sign.signature'].search([('user_id', '=', self.env.user.id)]).ids
            myargs = ['|',('signature_ids','=',False),('signature_ids','in',list)]
            args.extend(myargs)
            docs = super(Document, self).search(args)
            remove_ids = []
            user_mail = http.request.env.user.email
            for d in docs:
                if d.workflow_enabled:
                    my_signs= d.signature_ids.sudo().filtered(lambda r: r.user_id.email == user_mail)
                    if my_signs:
                        my_sign=my_signs[0]
                        prev_signs= d.signature_ids.sudo().filtered(lambda r: r.id< my_sign.id and r.user_id.email != my_sign.user_id.email)
                        if prev_signs:
                            prev_sign=prev_signs[-1]
                            all_signed=True
                            for s in d.signature_ids.sudo().filtered(lambda r: r.token == prev_sign.token):
                                if not s.draw_signature:
                                    all_signed=False
                            if not all_signed:
                                remove_ids.append(d.id)
            docs=docs.filtered(lambda r: r.id not in remove_ids)
            return docs

        docs=super(Document, self).search(args)
        return docs