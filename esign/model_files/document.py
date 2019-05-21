import base64
import datetime
import io
from random import randint

from PyPDF2 import PdfFileReader, PdfFileWriter
from django.db import models

# Create your models here.
from fpdf import FPDF

from documents.file import File
from django.core.files import File as DjangoFile

from mainapp.settings import MEDIA_ROOT
from mainapp.ws_methods import queryset_to_list


class SignDocument(File):
    workflow_enabled = models.BooleanField(blank=True, null=True)
    original_pdf = models.FileField(upload_to='original/')

    # my_signature_status
    # pending_signatures

    def save(self, *args, **kwargs):
        create = False
        if self.pk is None:
            create = True
        super(SignDocument, self).save(*args, **kwargs)
        if create:
            self.original_pdf = self.pdf_doc
            pass
        else:
            pass

    @classmethod
    def save_doc(cls, request, params):
        file_data = params['file']

        format, binary = file_data.split(';base64,')
        binary_data = io.BytesIO(base64.b64decode(binary))
        jango_file = DjangoFile(binary_data)

        new_file = cls(name=params["name"])

        new_file.attachment.save(params["name"], jango_file)
        new_file.save()



        docs = cls.objects.filter()
        total_cnt = docs.count()
        current_cnt = total_cnt
        docs = queryset_to_list(
            docs, fields=['name', 'id']
        )
        result = {'records': docs, 'total': total_cnt, 'count': current_cnt}
        return result

    def embed_signatures(self):

        file = self.original_pdf
        signed_doc = self.get_signed_doc(file, self.signature_set.all())
        self.pdf_doc.save(self.original_pdf.name, DjangoFile(signed_doc))

    def get_signed_doc(self, pdf, signatures):

        # pth = tempfile.gettempdir()
        # curr_dir = os.path.dirname(__file__)
        # pth = curr_dir.replace('models', 'doc_signs')
        #
        # file = pdf
        # pdf_doc = base64.b64decode(file)
        # # f = base64.decodestring(file)
        #
        # fobj = tempfile.NamedTemporaryFile(delete=False)
        # fname1 = fobj.name
        # fobj.write(pdf_doc)
        # fobj.close()
        pth = MEDIA_ROOT + "/"+pdf.name

        input = PdfFileReader(open(pth, "rb"))
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
        # signatures = signatures.sorted(key=lambda r: r.page)
        current_page = 1
        sign_pages = []
        for s in signatures:
            if s.image:
                pg = s.page
                if pg != current_page:
                    for i in range(pg - current_page):
                        pdf.add_page(orientation=orientation)
                left = (s.left / 100) * width
                top = (s.top / 100) * height

                if s.zoom > width:
                    diff = s.zoom - width
                    perc = (width / s.zoom)
                    w = s.width * perc
                    h = s.height * perc

                if s.zoom < width:
                    diff = width - s.zoom
                    perc = (diff / s.zoom)
                    plus = perc * s.width
                    w = s.width + plus
                    plus = perc * s.height
                    h = s.height + plus
                if s.zoom == width:
                    w = s.width
                    h = s.height

                pdf.image(MEDIA_ROOT + "/" + s.image.name, x=left, y=top, w=w, h=h)
                if self.send_to_all:
                    pdf.set_xy(left + 50, top + h)
                    # pdf.ln(5)
                    pdf.set_font('Arial', 'U', 15)
                    # Special case, we have restricted our users to read super admin
                    try:
                        sign_name = s.user.username
                    except:
                        sign_name = 'Root'
                    pdf.cell(5, 5, sign_name)
                    date = datetime.datetime.today().strftime('%b,%d  %Y')
                    # pdf.ln(20)
                    pdf.set_xy(left + 50, top + h + 20)
                    pdf.cell(5, 5, date)
                    # if ip:
                    #     pdf.ln(25)
                    #     pdf.cell(5, 5, ip)
                current_page = pg
                sign_pages.append(pg)
        signature_only_pdf_path = MEDIA_ROOT + "/files/signature-pdf-" + str(randint(1, 99)) + ".pdf"
        pdf.output(signature_only_pdf_path, "F")
        pdf.close()

        signaturepdf = PdfFileReader(open(signature_only_pdf_path, "rb"))
        for page_number in range(input.getNumPages()):
            page = input.getPage(page_number)
            if page_number + 1 in sign_pages:
                sign_page = signaturepdf.getPage(page_number)
                if sign_page:
                    page.mergePage(sign_page)
            output.addPage(input.getPage(page_number))

        output_pdf_path = MEDIA_ROOT + "/files/signed-doc-output-" + str(randint(1, 99)) + ".pdf"
        with open(output_pdf_path, "wb") as outputStream:
            output.write(outputStream)
        res = open(output_pdf_path, 'rb')
        return res

    @classmethod
    def get_token(cls, request, params):
        return {'error': 'Not implemented'}