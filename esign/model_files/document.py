import io
import os
import uuid
import json
import base64
import datetime
from fpdf import FPDF
from random import randint

from PIL import Image, ImageDraw
from collections import OrderedDict
from django.contrib.auth.models import User
from mainapp.settings import server_base_url
from PyPDF2 import PdfFileReader, PdfFileWriter
from mainapp.ws_methods import queryset_to_list, send_email_on_creation

from django.db import models
from django.core.files import File as DjangoFile

from documents.file import File
from mainapp.settings import MEDIA_ROOT


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
        self.pdf_doc.save(self.original_pdf.name, DjangoFile(signed_doc))

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
        file_id = int(params['document_id'])
        token = params['token']
        file_name = ''
        if token:
            signature = Signature.objects.filter(token=token)
            if not signature.exists():
                return "Invalid Token"
            file_obj = cls.objects.filter(id=file_id)[0]
            file_name = file_obj.name
        else:
            file_obj = cls.objects.filter(id=file_id)[0]
            file_name = file_obj.name

        users = User.objects.filter()
        doc_data = cls.get_doc_data(request, file_obj, token)
        doc_data['doc_name'] = file_name
        doc_data["users"] = users
        return doc_data

    @classmethod
    def get_signature(cls, request, params):
        signature_id = params['signature_id']
        sign = Signature.objects.filter(id=signature_id)[0]

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
    def save_sign_data(cls, request, params):
        doc_id = int(params['document_id'])
        doc = cls.objects.filter(id=doc_id)[0]
        doc.save()
        signatures = json.loads(params['data'])
        email_data = []
        user_ids = [s["user_id"] for s in signatures]
        user_ids = list(OrderedDict.fromkeys(user_ids))
        for u in user_ids:
            token = str(uuid.uuid4())
            for s in [x for x in signatures if x['user_id'] == u]:
                obj = Signature(**{'document_id': s['document_id'], 'user_id': s['user_id'],
                                   'email': s['email'], 'name': s['name'], 'field_name': s['field_name'],
                                   'left': s['left'], 'top': s['top'], 'page': s['page'],
                                   'height': s['height'], 'width': s['width'], 'zoom': s['zoom'], 'type': s['type'],
                                   'token': token})
                obj.save()

        template_data = {
            'subject': params['subject'],
            'message': params['message'],
            'url': server_base_url + '/#/token-sign-doc/' + str(doc.id) + '/'
        }
        post_info = {}
        post_info['res_app'] = cls._meta.app_label
        post_info['res_model'] = cls._meta.model_name
        post_info['res_id'] = doc.id
        template_name = 'esign/esign_request.html'
        email_data = {
            'subject': params['subject'],
            'audience': user_ids,
            'post_info': post_info,
            'template_data': template_data,
            'template_name': template_name,
            'token_required': True
        }
        send_email_on_creation(email_data)
        doc_data = cls.get_doc_data(request, doc)
        return doc_data

    @classmethod
    def save_signature(cls, request, params):
        doc_id = int(params['document_id'])
        doc = cls.objects.filter(id=doc_id)[0]
        signature_id = params['signature_id']
        token = params.get('token')
        uid = False
        sign = Signature.objects.filter(id=signature_id)[0]
        if token:
            sign1 = Signature.objects.filter(token=token)
            if not sign1.exists():
                return "Unauthorized"
            if sign1:
                uid = sign1[0].user.id
            if uid != sign.user.id:
                return "Unauthorized"
        else:
            if request.user.id != 1:
                if request.user.id != sign.user.id:
                    return "Unauthorized"
        binary_signature = ""
        if params['type'] == "upload":
            binary_signature = params['binary_signature']
            binary_data = io.BytesIO(base64.b64decode(binary_signature))
            jango_file = DjangoFile(binary_data)
            sign.image.save(params['filename'], jango_file)
        else:
            if params['type'] == "auto":
                binary_signature = cls.get_auto_sign(sign)
                # sign.write({'draw_signature': binary_signature})
            if params['type'] == "draw":
                binary_signature = params['binary_signature']
                binary_data = io.BytesIO(base64.b64decode(binary_signature))
                jango_file = DjangoFile(binary_data)
                sign.image.save("sign" + ".png", jango_file)
            if params['type'] == "date":
                # dt=kw['date']
                dt = datetime.datetime.today().strftime('%b,%d  %Y')
                binary_signature = cls.get_auto_sign(sign, dt)
                binary_data = io.BytesIO(base64.b64decode(binary_signature))
                jango_file = DjangoFile(binary_data)
                sign.image.save("sign" + ".png", jango_file)
            if params['type'] == "text":
                text = params['text']
                binary_signature = cls.get_sign_text(sign, text)
                binary_data = io.BytesIO(base64.b64decode(binary_signature))
                jango_file = DjangoFile(binary_data)
                sign.image.save("sign" + ".png", jango_file)

        doc.embed_signatures()
        doc_data = cls.get_doc_data(request, doc, token)
        doc_data["signature"] = binary_signature

        return doc_data

    @classmethod
    def delete_signature(cls, request, params):
        signature_id = int(params['signature_id'])
        sign = Signature.objects.filter(id=signature_id)
        doc_id = params['document_id']
        doc = cls.objects.filter(id=doc_id)[0]
        # doc.emit_data_update(doc)
        sign.delete()
        doc.embed_signatures()
        doc_data = cls.get_doc_data(request, doc)

        return doc_data

    @classmethod
    def get_doc_data(cls, request, doc, token=False):
        pdf_doc = doc.pdf_doc.read()
        pdf_doc = base64.b64encode(pdf_doc)
        pdf_doc = pdf_doc.decode('utf-8')

        signatures = doc.signature_set.all()
        signatures = queryset_to_list(signatures,
                                      fields=['user__id', 'user__username', 'id', 'type', 'page', 'field_name', 'zoom',
                                              'width', 'height', 'top', 'left', 'image', 'token'])
        uid = False
        if token:
            signs = doc.signature_set.filter(token=token)
            if signs:
                uid = signs[0].user.id
        for s in signatures:
            signed = False
            my_record = False
            s["name"] = s["user__username"]
            if s["image"]:
                signed = True
            if token:
                if (uid == s["user__id"] and s["user__id"]) or token == s["token"]:
                    my_record = True
            else:
                if (request.user.id == s["user__id"]):
                    my_record = True
            s["signed"] = signed
            s["my_record"] = my_record
        return {"pdf_binary": pdf_doc, "doc_data": signatures}

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
        sz = (150, 28)
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
    def get_sign_text(cls, sign, text):
        curr_dir = os.path.dirname(__file__)
        pth = curr_dir.replace('model_files', 'static')
        sz = (185, 25)
        # if sz[0] < 100:
        #     sz=(150,50)
        img = Image.new('RGB', sz, (255, 255, 255))
        d = ImageDraw.Draw(img)

        d.text((5, 0), text, (0, 0, 0))

        img_path = pth + "/pic" + str(randint(1, 99)) + ".png"
        img.save(img_path)

        res = open(img_path, 'rb')
        read = res.read()
        binary_signature = base64.encodebytes(read)
        binary_signature = binary_signature.decode('utf-8')
        return binary_signature

    def add_pages_for_sign(self):
        if not self.original_pdf or not self.signature_set.all().exists():
            return
        pth = MEDIA_ROOT + "/" + self.original_pdf.name

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
        count = 0
        pdf = FPDF(orientation, 'pt', solution)
        pdf.add_page(orientation=orientation)
        # Addition ended
        for page_number in range(input.getNumPages()):
            output.addPage(input.getPage(page_number))
        current_pg = input.getNumPages() + 1

        for sign in self.signature_set.all():
            count = count + 1
            sign.page = current_pg
            sign.save()
            if (count == 9):
                pdf.add_page(orientation=orientation)
                count = 0
                current_pg += 1

        signature_only_pdf_path = MEDIA_ROOT + "/files/signature-pdf-pages" + str(self.id) + ".pdf"
        pdf.output(signature_only_pdf_path, "F")

        pdf.close()

        signaturepdf = PdfFileReader(open(signature_only_pdf_path, "rb"))
        for page_number in range(signaturepdf.getNumPages()):
            output.addPage(signaturepdf.getPage(page_number))

        output_pdf_path = MEDIA_ROOT + "/files/sign-doc-output-pages" + str(self.id) + ".pdf"
        with open(output_pdf_path, "wb") as outputStream:
            output.write(outputStream)
        res = open(output_pdf_path, 'rb')
        self.pdf_doc.save(self.original_pdf.name, DjangoFile(res))
        self.original_pdf.save(self.original_pdf.name, DjangoFile(res))


class Signature(models.Model):
    name = models.CharField(max_length=200, blank=True)
    token = models.CharField(max_length=200, blank=True)
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
