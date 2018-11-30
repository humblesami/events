import os
import sys
import base64
import traceback

import io
import subprocess
from random import randint
from pdfminer.pdfpage import PDFPage
from pdfminer.layout import LAParams
from pdfminer.converter import TextConverter
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter

from odoo import models, fields, api
from odoo.exceptions import UserError
from odoo.addons.dn_base.models.statics import scan_virus
from odoo.addons.dn_base.statics import raise_dn_model_error

class AllFiles(models.Model):
    _name = 'dn_documents.allfiles'
    name = fields.Char(string="Title" ,required=False)
    filename = fields.Char(string="Filename")
    attachment = fields.Binary(string="Attachment", attachment=True, required=True)
    pdf_doc = fields.Binary(string="View")
    html = fields.Char(string="Html")
    original_pdf = fields.Binary(string="Without Signs")
    path = fields.Char(string="View Document", store=False, compute='get_path')
    content = fields.Char(string="Content")

    def get_path(self):
        for doc in self:
            # if doc.pdf_doc:
            model=self._name
            # doc.path = "/web/content?model=%s&field=pdf_doc&id=" %(model) + str(doc.id)
            doc.path = model

    @api.onchange('attachment')
    def validate_file_name_type(self):
        if self.attachment:
            if not self.filename:
                raise UserError("There is no file")
            else:
                # Check the file's extension
                if not self.filename.endswith(('ppt', 'pptx', 'doc', 'docx', 'pdf','xls','xlsx')):
                    raise UserError("Invalid file uploaded, Only microsoft word, power point, excel and PDF files are allowed")
                else:
                    scan_virus(self.attachment)
    @api.model
    def create(self, values):
        try:
            self.vaildate_file(values)
            if values.get("attachment"):
                pdf_doc,content = self.get_pdf(values['attachment'], values['filename'])
                if values['filename'].endswith(('xls', 'xlsx')):
                    values['html'] = pdf_doc
                else:
                    values['pdf_doc'] = pdf_doc
                    values['original_pdf'] = pdf_doc
                    values['content'] = content
            doc = super(AllFiles, self).create(values)
            return doc
        except:
            raise_dn_model_error()

    @api.multi
    def write(self, values):
        try:

            if values.get("attachment"):
                self.vaildate_file(values)
                pdf_doc,content = self.get_pdf(values['attachment'], values['filename'])
                if values['filename'].endswith(('xls', 'xlsx')):
                    values['html'] = pdf_doc
                else:
                    values['pdf_doc'] = pdf_doc
                    values['original_pdf'] = pdf_doc
                    values['content'] = content
            doc = super(AllFiles, self).write(values)
            return doc
        except:
            raise_dn_model_error("Error in file write \n")

    def vaildate_file(self,values):
        if 'attachment' not in values:
            raise UserError("Please Upload Attachment")
        if not values['attachment']:
            raise UserError("Please Upload Attachment")
        if 'filename' not in values:
            raise UserError("Invalid File Name")
        if not values['filename']:
            raise UserError("Invalid File Name")
        if not values['filename'].endswith(('pdf','ppt', 'pptx', 'doc', 'docx','xls','xlsx')):
                #('ppt', 'pptx', 'doc', 'docx',
                raise UserError("Invalid file uploaded, Only microsoft word, power point, excel and PDF files are allowed")
        else:
            scan_virus(self.attachment)

    def get_pdf(self, docfile, filename):
        curr_dir = os.path.dirname(__file__)
        tmp = filename.split('.')
        ext = tmp[len(tmp) - 1]
        # if ext == "pdf":
        #     return docfile
        pth = curr_dir.replace('models', 'doc_signs/')
        pth = pth + str(randint(1, 99))
        file = docfile
        img_file = base64.b64decode(file)  # f = base64.decodestring(file)
        pdf_content = open(pth + filename, 'wb')
        pdf_content.write(img_file)
        pdf_content.close()
        if ext == "doc" or ext == "docx" or  ext == "ppt" or ext == "pptx" or ext == "pdf":
            res,content = self.doc2pdf(pth, filename,ext)
            if not res:
                raise UserError("Could not convert")
            else:
                read = res.read()
                # res_encode = base64.encodestring(read)
                res_encode = base64.b64encode(read)
                return res_encode,content
        elif ext == "xls" or ext =="xlsx":
            res = self.excel2xhtml(pth, filename)
            return res
        else:
            raise UserError("Invalid file uploaded, Only microsoft word, power point, excel and PDF files are allowed")

    def doc2pdf(self, pth, filename,ext):
        try:
            if ext == "pdf":
                res = open(pth + filename, 'rb')
            else:
                subprocess.check_call(
                    ['/usr/bin/python3', '/usr/bin/unoconv', '-f', 'pdf',
                     '-o', pth + '_new.pdf', '-d', 'document',
                     pth + filename])
                res = open(pth + '_new.pdf', 'rb')
            content=""
            rsrcmgr = PDFResourceManager()
            retstr = io.StringIO()
            codec = 'utf-8'
            laparams = LAParams()
            device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=laparams)
            # Create a PDF interpreter object.
            interpreter = PDFPageInterpreter(rsrcmgr, device)
            # Process each page contained in the document.

            for page in PDFPage.get_pages(res):
                interpreter.process_page(page)
                content = retstr.getvalue()
            # print(content)
            if ext != "pdf":
                res = open(pth + '_new.pdf', 'rb')
            else:
                res = open(pth + filename, 'rb')
            return res,content

        except:
            eg = traceback.format_exception(*sys.exc_info())
            errorMessage = ''
            for er in eg:
                errorMessage += "\n" + er
            print (errorMessage)
            raise UserError(errorMessage)
            return False

    def excel2xhtml(self, pth, filename):
        try:
            subprocess.check_call(
                ['/usr/bin/python3', '/usr/bin/unoconv', '-f', 'xhtml',
                 '-o', pth + '_new.xhtml',
                 pth + filename])
            res = open(pth + '_new.xhtml', 'rb')
            read = res.read()
            r=read.decode("utf-8")
            return r

        except Exception:
            eg = traceback.format_exception(*sys.exc_info())
            errorMessage = ''
            for er in eg:
                errorMessage += "\n" + er
            print (errorMessage)
            raise UserError(errorMessage)
            return False

    def open_view_doc_form(self):
        view_id = self.env.ref('dn_documents.pdf_doc_view').id
        if self:
            return {
                'type': 'ir.actions.act_window',
                'name': self.name,
                'view_id': view_id,
                'view_mode': 'form',
                'res_model': self._name,
                'res_id': self.id,
                'target': 'current',
            }
