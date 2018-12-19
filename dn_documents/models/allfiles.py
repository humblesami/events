import io
import os
import sys
import base64
import subprocess
import threading
import time
import traceback
from random import randint

from PIL import Image
from fpdf import FPDF
from pdfminer.pdfpage import PDFPage
from pdfminer.layout import LAParams
from pytesseract import pytesseract

from odoo import models, fields, api
from pdfminer.converter import TextConverter
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from odoo.addons.dn_base.statics import scan_virus,raise_dn_model_error


class AllFiles(models.Model):
    _name = 'dn_documents.allfiles'
    name = fields.Char(string="Title" ,required=True)
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
                raise raise_dn_model_error("There is no file")
            else:
                # Check the file's extension
                if not self.filename.endswith(('ppt', 'pptx', 'doc', 'docx', 'pdf','xls','xlsx','png','jpg','jpeg')):
                    raise raise_dn_model_error("Invalid file uploaded, Only microsoft word, power point, excel and PDF files are allowed")
                else:
                    scan_virus(self.attachment)

    def apply_ocr(self):
        t = threading.Thread(target=self.apply_ocr_thread)
        t.start()
        pass

    def apply_ocr_thread(self):
        with api.Environment.manage():
            new_cr = self.pool.cursor()
            self = self.with_env(self.env(cr=new_cr))
            time.sleep(10)
            if self.attachment:
                im = Image.open(io.BytesIO(base64.b64decode(self.attachment)))
                text = pytesseract.image_to_string(im)
                pdf=pytesseract.image_to_pdf_or_hocr(im, extension='pdf')
                res=base64.b64encode(pdf)

                self.content=text
                self.pdf_doc = res



            self._cr.commit()
            self._cr.close()

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
            if values.get("attachment"):
                if values['filename'].endswith(('png', 'jpg', 'jpeg')):
                    doc.apply_ocr()
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
            if values.get("attachment"):
                if values['filename'].endswith(('png', 'jpg', 'jpeg')):
                    self.apply_ocr()
            return doc
        except:
            raise_dn_model_error("Error in file write \n")

    def vaildate_file(self,values):
        if 'attachment' not in values:
            raise raise_dn_model_error("Please Upload Attachment")
        if not values['attachment']:
            raise raise_dn_model_error("Please Upload Attachment")
        if 'filename' not in values:
            raise raise_dn_model_error("Invalid File Name")
        if not values['filename']:
            raise raise_dn_model_error("Invalid File Name")
        if not values['filename'].endswith(('pdf','ppt', 'pptx', 'doc', 'docx','xls','xlsx','png','jpg','jpeg')):
                #('ppt', 'pptx', 'doc', 'docx',
                raise raise_dn_model_error("Invalid file uploaded, Only microsoft word, power point, excel and PDF files are allowed")
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
                raise raise_dn_model_error("Could not convert")
            else:
                return res,content
        elif ext == "xls" or ext =="xlsx":
            res = self.excel2xhtml(pth, filename)
            return res,''
        elif ext in ['png','jpg','jpeg']:
            res = self.img2pdf(pth, filename)
            return res, ''
        else:
            raise raise_dn_model_error("Invalid file uploaded, Only microsoft word, power point, excel and PDF files are allowed")

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
                read = res.read()
                # res_encode = base64.encodestring(read)
                res_encode = base64.b64encode(read)
            return res_encode,content

        except:
            eg = traceback.format_exception(*sys.exc_info())
            errorMessage = ''
            for er in eg:
                errorMessage += "\n" + er
            print (errorMessage)
            raise raise_dn_model_error(errorMessage)
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
            raise raise_dn_model_error(errorMessage)
            return False

    def img2pdf(self,pth,filename):
        try:
            im = Image.open(pth+filename)
            width, height = im.size
            if height >= width:
                orientation = 'P'
                w=210
                h=297
            else:
                orientation = 'L'
                w = 297
                h = 210

            pdf = FPDF()
            pdf.add_page(orientation=orientation)
            pdf.image(pth+filename,x=0,y=0,w=w,h=h)
            pdf.output(pth+"_new.pdf", "F")
            res = open(pth + '_new.pdf', 'rb')
            read = res.read()
            res_encode = base64.b64encode(read)
            return res_encode
        except:
            eg = traceback.format_exception(*sys.exc_info())
            errorMessage = ''
            for er in eg:
                errorMessage += "\n" + er
            print(errorMessage)
            raise raise_dn_model_error(errorMessage)
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
                'target': 'new',
            }
