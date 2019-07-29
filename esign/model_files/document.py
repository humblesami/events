import io
import os
import base64
import datetime

from fpdf import FPDF
from random import randint
from django.contrib.auth.models import User
from PyPDF2 import PdfFileReader, PdfFileWriter
from PIL import ImageFont, Image, ImageDraw
from django.db import models
from django.core.files import File as DjangoFile

from documents.file import File
from mainapp import ws_methods
from mainapp.settings import MEDIA_ROOT
from mainapp.ws_methods import queryset_to_list
from restoken.models import PostUserToken


class SignatureDoc(File):
    workflow_enabled = models.BooleanField(blank=True, null=True)
    original_pdf = models.FileField(upload_to='original/')
    open_date = models.DateTimeField(null=True)
    close_date = models.DateTimeField(null=True)

    def save(self, *args, **kwargs):
        create = False
        if self.pk is None:
            create = True
        super(SignatureDoc, self).save(*args, **kwargs)
        if create:
            self.original_pdf = self.pdf_doc
            self.save()
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

        result = {'id': new_file.id}
        return result

    def embed_signatures(self):
        file = self.original_pdf
        signed_doc = self.get_signed_doc(file, self.signature_set.all())
        self.pdf_doc.save(self.original_pdf.name, DjangoFile(signed_doc), self.send_to_all)

    def get_signed_doc(self, pdf, signatures, send_all=None):
        pth = MEDIA_ROOT + "/"+pdf.name
        input = PdfFileReader(open(pth, "rb"))
        # Addition of code for orientation correction Asfand
        pageValue = input.pages[0]
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
                if send_all:
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
    def get_detail(cls, request, params):
        user = request.user
        file_id = int(params['document_id'])
        token = params['token']
        file_name = ''
        if token:
            post_info = {
                'id': params['document_id'],
                'model': 'SignatureDoc',
                'app': 'esign'
            }
            res = PostUserToken.validate_token_for_post(token, post_info)
            if type(res) is str:
                return res
            else:
                user = res.user
            file_obj = cls.objects.filter(id=file_id)[0]
            file_name = file_obj.name
        else:
            file_obj = cls.objects.filter(id=file_id)[0]
            file_name = file_obj.name

        doc_data = cls.get_doc_data(request, file_obj, token)
        doc_data['doc_name'] = file_name
        return doc_data

    @classmethod
    def get_signature(cls, request, params):
        token = params.get('token')
        user = request.user
        if not user.id:
            if not token:
                return 'Not authorized to get signature'
            else:
                post_info = {
                    'id': params['document_id'],
                    'model': 'SignatureDoc',
                    'app': 'esign'
                }
                res = PostUserToken.validate_token_for_post(token, post_info)
                if type(res) is str:
                    return res
                else:
                    user = res.user
        signature_id = params['signature_id']
        sign = Signature.objects.get(id=signature_id)
        if sign.user.id != user.id:
            return 'Invalid user to get signature'
        image = sign.image
        if image:
            image = sign.image.read()
            image = base64.b64encode(image)
            image = image.decode('utf-8')
        else:
            image = None
            if sign.type == 'initial':
                image = cls.get_auto_sign(sign)
        return {"signature": image}


    @classmethod
    def get_auto_sign(cls, sign, date=""):
        curr_dir = os.path.dirname(__file__)
        pth = curr_dir.replace('model_files', 'static')
                
        txt = sign.user.username or sign.name
        if sign.type == "initial":
            txt = ''.join([x[0].upper() + "." for x in txt.split(' ')])
        if sign.type == "date":            
            txt = date

        # if sz[0] < 100:
        sz = (150,28)
        img = Image.new('RGB', sz, (255, 255, 255))
        d = ImageDraw.Draw(img)

        d.text((40, 0), txt, (0, 0, 0))

        img_path = pth + "/pic" + str(randint(1, 99)) + ".png"
        img.save(img_path)

        res = open(img_path, 'rb')
        read = res.read()
        binary_signature = base64.encodebytes(read)
        binary_signature = binary_signature.decode('utf-8')
        return binary_signature


    @classmethod
    def get_records(cls, request, params):
        docs = cls.objects.filter()
        total_cnt = docs.count()
        current_cnt = total_cnt
        docs = queryset_to_list(
            docs,fields=['name','id']
        )
        result = {'records': docs, 'total': total_cnt, 'count': current_cnt}
        return result


class Signature(models.Model):
    name = models.CharField(max_length=200, blank=True)
    email = models.CharField(max_length=200, blank=True)
    type = models.CharField(max_length=200, blank=True)
    field_name = models.CharField(max_length=200, blank=True)
    text = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to='profile/', blank=True, null=True)
    date = models.DateField(null=True, blank=True)

    document = models.ForeignKey(SignatureDoc, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)
    page = models.IntegerField(null=True, blank=True)
    left = models.FloatField(null=True, blank=True)
    top = models.FloatField(null=True, blank=True)
    zoom = models.FloatField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    width = models.FloatField(null=True, blank=True)
