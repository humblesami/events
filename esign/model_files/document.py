import io
import os
import base64
import datetime

from fpdf import FPDF
from random import randint
from django.contrib.auth.models import User, Group
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
        if not user.id:
            return 'Unauthorized request'
        file_obj = SignatureDoc.objects.get(id=file_id)
        file_name = file_obj.name

        doc_data = SignatureDoc.get_doc_data(request, file_obj, token)
        if type(doc_data) is str:
            return doc_data
        doc_data['doc_name'] = file_name
        doc_data['id'] = file_id
        return doc_data

    @classmethod
    def get_doc_data(cls, request, doc, token=False):
        pdf_doc = doc.pdf_doc.read()
        pdf_doc = base64.b64encode(pdf_doc)
        pdf_doc = pdf_doc.decode('utf-8')

        user = False
        signatures = None
        if token:
            post_info = {
                'id': doc.id,
                'model': 'SignatureDoc',
                'app': 'esign'
            }
            user_token = PostUserToken.validate_token_for_post(token, post_info)
            if user_token:
                user = user_token.user
                signatures = doc.signature_set.filter(user_id=user.id)
        else:
            user = request.user
            group = Group.objects.get(name="Admin")
            if user in group.user_set.all():
                signatures = doc.signature_set.all()
            else:
                signatures = doc.signature_set.filter(user_id=user.id)
        uid = user.id

        signatures = queryset_to_list(signatures,
                                      fields=['user__id', 'user__username', 'id', 'type', 'page', 'field_name', 'zoom',
                                              'width', 'height', 'top', 'left', 'image'])
        for s in signatures:
            signed = False
            my_record = False
            s["name"] = s["user__username"]
            if s["image"]:
                signed = True
            sign_user_id = s["user__id"]
            if token:
                if (uid == sign_user_id and sign_user_id):
                    my_record = True
            else:
                if (uid == sign_user_id):
                    my_record = True
            s["signed"] = signed
            s["my_record"] = my_record
        return {"pdf_binary": pdf_doc, "doc_data": signatures, 'id': doc.id}


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
    image = models.ImageField(upload_to='esign/', blank=True, null=True)
    date = models.DateField(null=True, blank=True)

    document = models.ForeignKey(SignatureDoc, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)
    page = models.IntegerField(null=True, blank=True)
    left = models.FloatField(null=True, blank=True)
    top = models.FloatField(null=True, blank=True)
    zoom = models.FloatField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    width = models.FloatField(null=True, blank=True)
    signed_at = models.DateTimeField(null=True)
    created_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='admin')


    @classmethod
    def del_sign(cls, request, params):
        signature_id = int(params['signature_id'])        
        sign = Signature.objects.get(id=signature_id)
        if sign.signed_at:
            return 'Can not be deleted executed signature from doucment'
        if sign.created_by:
            if sign.created_by.id == request.user.id:
                sign.delete()
                return 'done'
            else:
                return 'Unauthorized'
        else:
            sign.delete()
            return 'done'

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
        return { 'image': binary_signature }


    @classmethod
    def save_signature(cls, request, params):
        doc_id = int(params['document_id'])
        doc = SignatureDoc.objects.get(id=doc_id)
        signature_id = params['signature_id']
        token = params.get('token')
        uid = False
        sign = Signature.objects.get(id=signature_id)
        if token:
            token = PostUserToken.objects.get(token=token)
            user = token.user
            if user.id != sign.user_id:
                return 'Invalid user'
            post_info = token.post_info
            if post_info.res_id != doc_id:
                return 'Invalid doc access'
        else:
            if request.user.id != 1:
                if request.user.id != sign.user.id:
                    return "Unauthorized"
        binary_signature = ""
        sign.signed_at = datetime.datetime.now()
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
                sign.image.save("sign"+".png", jango_file)
            if params['type'] == "date":
                # dt=kw['date']
                dt = datetime.datetime.today().strftime('%b,%d  %Y')
                binary_signature = cls.get_auto_sign(sign, dt)
                binary_data = io.BytesIO(base64.b64decode(binary_signature))
                jango_file = DjangoFile(binary_data)
                sign.image.save("sign"+".png", jango_file)
            if params['type'] == "text":
                text = params['text']
                binary_signature = cls.get_sign_text(sign, text)
                binary_data = io.BytesIO(base64.b64decode(binary_signature))
                jango_file = DjangoFile(binary_data)
                sign.image.save("sign"+".png", jango_file)
            sign.save()
        return { 'image': binary_signature}

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
        return {"image": image}

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
        binary_signature = base64.encodebytes(read)
        binary_signature = binary_signature.decode('utf-8')
        return { 'image': binary_signature }