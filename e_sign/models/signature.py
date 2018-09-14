import base64
import datetime
import os
import tempfile
import uuid
from random import randint

import re
from PyPDF2 import PdfFileReader, PdfFileWriter
from fpdf import FPDF
from werkzeug import urls

from odoo import models, fields, api, http
from odoo.exceptions import UserError
from odoo.tools import pycompat

email_validator = re.compile(r"[^@]+@[^@]+\.[^@]+")

class Signature(models.Model):
    _name="e_sign.signature"

    date = fields.Datetime(string="Date")
    document_id = fields.Integer(string="Document")
    user_id = fields.Many2one('res.users', string="User", ondelete='cascade')
    name=fields.Char(string="Name")
    draw_signature = fields.Binary(string="Signature")
    upload_signature = fields.Binary(string="Upload")
    auto_signature = fields.Boolean(string="Auto Signature")
    path = fields.Char(store=False, compute = 'get_image_path')
    temp_pth = fields.Char(store=False)
    filename = fields.Char(string="Filename")
    showbutton = fields.Char(compute='_compute_showbutton', string='show')
    left=fields.Float(string="Left")
    top = fields.Float(string="Top")
    page=fields.Integer(string="Page")
    width=fields.Float(string="Width")
    height =fields.Float(string="Height")
    zoom = fields.Float(string="Zoom")
    token = fields.Char(string="Token", readonly=True)
    email = fields.Char(string="Email")
    type = fields.Char(string="Type")

    def get_image_path(self):
        return  ''

    @api.model
    def create(self, vals):
        if vals.get('email')!='':
            vals['user_id'] = False
            email=vals.get('email')
            email = email.strip()
            if email:
                if not email_validator.match(email):
                    raise UserError(("Incorrect Email Address"))
        vals['draw_signature'] = False
        vals['auto_signature'] = False
        sign = super(Signature, self).create(vals)
        # sign.create_response_and_send_mail()
        return sign

    @api.multi
    def write(self, values):
        if "upload_signature" in values:
            values["draw_signature"] = values["upload_signature"]
        elif "auto_signature" in values:
            values["draw_signature"] = values["auto_signature"]

        s = super(Signature, self).write(values)
        if "doc" in self._context:
            doc=self._context.get("doc")
            if 'draw_signature' in values and doc.workflow_enabled:
                doc.send_next_mail(self)
        return True

    @api.multi
    def _compute_showbutton(self):
        for s in self:
            if s.user_id.id == self.env.user.user_id.id:
                s.showbutton = True
            else:
                s.showbutton = False



    def do_sign(self):
        return {
            'type': 'ir.actions.act_window',
            'view_type': 'form',
            'name':'Sign the document',
            'view_mode': 'form,tree',
            'res_model': 'e_sign.signature',
            'target': 'new',
            'context': self.env.context,
            'res_id': self.id,
        }

    def embed_signature(self):

        #pth = tempfile.gettempdir()
        curr_dir = os.path.dirname(__file__)
        pth = curr_dir.replace('models', 'doc_signs')

        file = self.document_id.pdf_doc
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
        count = 0
        pdf = FPDF(orientation, 'pt', solution)
        pdf.add_page(orientation=orientation)
        # Addition ended

        if self.draw_signature:
            file_s = self.draw_signature
            # f = base64.decodestring(file_s)
            img_file = base64.b64decode(file_s)
            # create a writable image and write the decoding result
            exten = 'png'
            if self.filename:
                exten = self.get_extension(self.filename)

            signarure_image_path = 'pic2' +str(randint(1, 99))+ "." + exten
            image_result = open(signarure_image_path,'wb')
            image_result.write(img_file)
            image_result.close()

            left=(self.left/100)*width
            top=(self.top/100)*height

            if self.zoom >width:
                diff=self.zoom - width
                perc = (width / self.zoom)
                w=self.width *perc
                h = self.height *perc

            if self.zoom <width:
                diff= width-self.zoom
                perc=(diff/self.zoom)
                plus=perc*self.width
                w=self.width + plus
                plus = perc * self.height
                h = self.height + plus
            if self.zoom ==width:
                w=self.width
                h = self.height

            pdf.image(signarure_image_path, x=left, y=top, w=w, h=h)

        signature_only_pdf_path = pth + "/signature-pdf-"+str(randint(1, 99))+".pdf"
        pdf.output(signature_only_pdf_path, "F")
        pdf.close()

        signaturepdf = PdfFileReader(open(signature_only_pdf_path, "rb"))
        # for page_number in range(signaturepdf.getNumPages()):
        #     output.addPage(signaturepdf.getPage(page_number))
        sign_img = signaturepdf.getPage(0)
        for page_number in range(input.getNumPages()):
            page = input.getPage(page_number)
            if page_number+1==self.page:
                page.mergePage(sign_img)
            output.addPage(input.getPage(page_number))

        output_pdf_path = pth + "/signed-doc-output-"+str(randint(1, 99))+".pdf"
        with open(output_pdf_path, "wb") as outputStream:
            output.write(outputStream)
        res = open(output_pdf_path, 'rb')
        read = res.read()
        # res_encode = base64.encodestring(read)
        res_encode = base64.b64encode(read)
        res.close()

        self.sudo().document_id.write({'pdf_doc': res_encode, 'from_code': True})





