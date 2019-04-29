import base64
import subprocess

from django.core.files import File as DjangoFile

# import pdftotext
from PIL import Image
from django.db import models
from fpdf import FPDF

from mainapp import settings


class File(models.Model):
    name = models.CharField(max_length=30)
    html = models.CharField(max_length=30)
    content = models.CharField(max_length=30)
    attachment = models.FileField(upload_to='files/')
    pdf_doc = models.FileField(upload_to='converted/')
    original_pdf = models.FileField(upload_to='original/')


    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        create = False
        if self.pk is None:
            create = True
        super(File, self).save(*args, **kwargs)
        if create:
            self.get_pdf()

            pass
        else:

            pass



    def get_pdf(self):
        tmp = self.attachment.url.split('.')
        ext = tmp[len(tmp) - 1]
        filename = self.attachment.name.replace("files/","").split(".")[0]

        pth = settings.BASE_DIR + self.attachment.url
        if ext == "doc" or ext == "docx" or  ext == "ppt" or ext == "pptx" or ext == "pdf":
            self.doc2pdf(pth,ext,filename)
        elif ext == "xls" or ext =="xlsx":
            self.excel2xhtml(pth,filename)
        elif ext in ['png','jpg','jpeg']:
            self.img2pdf(pth,filename)
        else:
            raise

    def doc2pdf(self, pth,ext,filename):
        try:
            converted_pth = pth.replace("files","converted")
            converted_pth = converted_pth.split(".")[0] + ".pdf"
            if ext == "pdf":
                res = open(pth, 'rb')
            else:
                subprocess.check_call(
                    ['/usr/bin/python3', '/usr/bin/unoconv', '-f', 'pdf',
                     '-o', converted_pth, '-d', 'document',
                     pth])
                res = open(converted_pth, 'rb')
            # content=""
            # pdf = pdftotext.PDF(res)
            # for pag in pdf:
            #     content += pag
            if ext != "pdf":
                res = open(converted_pth, 'rb')
            else:
                res = open(pth , 'rb')
            self.pdf_doc.save(filename+".pdf", DjangoFile(res))
            self.original_pdf.save(filename+".pdf", DjangoFile(res))

        except:
            raise

    def excel2xhtml(self, pth,filename):
        try:
            converted_pth = pth.replace("files", "converted")
            converted_pth = converted_pth.split(".")[0] + ".xhtml"
            subprocess.check_call(
                ['/usr/bin/python3', '/usr/bin/unoconv', '-f', 'xhtml',
                 '-o', converted_pth,
                 pth ])
            res = open(converted_pth, 'rb')
            self.pdf_doc.save(filename + ".xhtml", DjangoFile(res))
            # read = res.read()
            # r=read.decode("utf-8")
            # self.html = r

        except:
            raise

    def img2pdf(self,pth,filename):
        try:
            converted_pth = pth.replace("files", "converted")
            im = Image.open(pth)
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
            pdf.image(pth,x=0,y=0,w=w,h=h)
            pdf.output(converted_pth, "F")
            res = open(converted_pth, 'rb')
            self.pdf_doc.save(filename+".pdf", DjangoFile(res))
            self.original_pdf.save(filename+".pdf", DjangoFile(res))
        except:
            raise
