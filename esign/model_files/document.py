import io
import json
import os
import base64
import datetime
from collections import OrderedDict

from django.apps import apps
from fpdf import FPDF
from random import randint
from django.contrib.auth.models import User, Group
from PyPDF2 import PdfFileReader, PdfFileWriter
from PIL import ImageFont, Image, ImageDraw
from django.db import models
from django.core.files import File as DjangoFile
from django.db.models import Q, Count, Case, When, IntegerField
from documents.file import File
from mainapp import ws_methods
from mainapp.settings import MEDIA_ROOT, server_base_url
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

    def get_pending_sign_count(self, uid):
        pending_count = self.signature_set.filter(user_id=uid, signed=False).count()
        total = self.signature_set.filter(user_id=uid).count()
        user_status = 'Pending'
        if total > 0:
            if total == pending_count:
                user_status = 'Completed'
        else:
            user_status = 'Not Required'
        return {'total': total, 'pending': pending_count, 'signature_status': user_status }

    @classmethod
    def pending_sign_docs(cls, uid):
        sign_doc_ids = Signature.objects.filter(user_id=uid, signed=False).distinct().values('document_id')
        docs = cls.objects.filter(pk__in=sign_doc_ids)
        pending_docs = []
        for obj in docs:
            tot_pending = obj.get_pending_sign_count(uid)
            doc = tot_pending

            doc['id'] = obj.id
            doc['name'] = obj.name
            pending_docs.append(doc)
        return pending_docs

    @classmethod
    def ws_assign_signature(cls, request, params):
        doc_id = int(params['document_id'])
        doc = cls.objects.get(id=doc_id)
        if len(doc.signature_set.filter(signed=False)) > 0:
            return 'Can not be edited as signature_started'
        return doc.asign_signature()

    def assign_signature(self, user, params):
        signatures = json.loads(params['data'])
        user_ids = [sign["user_id"] for sign in signatures]
        user_ids = list(OrderedDict.fromkeys(user_ids))
        for u in user_ids:
            for sign in [x for x in signatures if x['user_id'] == u]:
                obj = Signature(
                    document_id=sign['document_id'],
                    user_id=sign['user_id'],
                    email=sign['email'],
                    name=sign['name'],
                    field_name=sign['field_name'],
                    left=sign['left'], top=sign['top'],
                    page=sign['page'],
                    height=sign['height'], width=sign['width'],
                    zoom=sign['zoom'], type=sign['type']
                )
                obj.created_by_id = user.id
                obj.save()
        return self.on_signature_assigned(user, user_ids, params)

    def on_signature_assigned(self, user, user_ids, params):
        template_data = {
            'subject': params['subject'],
            'message': params['message'],
            'url': server_base_url + '/#/token-sign-doc/' + str(self.id) + '/'
        }
        post_info = {}
        post_info['res_app'] = 'esign'
        post_info['res_model'] = 'SignatureDoc'
        post_info['res_id'] = self.id
        template_name = 'esign/esign_request.html'
        email_data = {
            'subject': params['subject'],
            'audience': user_ids,
            'post_info': post_info,
            'template_data': template_data,
            'template_name': template_name,
            'token_required': True
        }
        ws_methods.send_email_on_creation(email_data)
        doc_data = self.get_doc_data(user)
        return doc_data

    def remove_all_signature(self):
        self.signature_set.all().remove()
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
    def ws_get_detail(cls, request, params):
        file_id = int(params['document_id'])
        doc_obj = SignatureDoc.objects.get(id=file_id)
        users = User.objects.all()
        users = queryset_to_list(users, fields=['id', 'name'])
        doc_data = doc_obj.get_detail(request, params)
        doc_data["users"] = users
        return doc_data

    def get_detail(self, request, params):
        token = params['token']
        user = request.user
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
            return 'Unauthorized to get sign document'

        doc_data = self.get_doc_data(request.user)
        sign_count = self.signature_set.filter(signed=True)
        if sign_count:
            doc_data['signature_started'] = True
        doc_data['doc_name'] = file_name
        return doc_data

    @classmethod
    def is_admin(cls, user):
        group = Group.objects.get(name="Admin")
        if user in group.user_set.all():
            return True
        return False

    def get_doc_data(self, user):
        pdf_doc = self.pdf_doc.read()
        pdf_doc = base64.b64encode(pdf_doc)
        pdf_doc = pdf_doc.decode('utf-8')
        signatures = None
        if SignatureDoc.is_admin(user):
            signatures = self.signature_set.all()
        else:
            signatures = self.signature_set.filter(user_id=user.id)

        signatures = queryset_to_list(signatures,
                                      fields=['user__id', 'user__username', 'id', 'type', 'page', 'field_name', 'zoom',
                                              'width', 'height', 'top', 'left', 'image'])
        for signature in signatures:
            signed = False
            my_record = False
            signature["name"] = signature["user__username"]
            if signature["image"]:
                signed = True
            sign_user_id = signature["user__id"]
            if (user.id == sign_user_id and sign_user_id):
                my_record = True
            signature["signed"] = signed
            signature['signtype'] = signature["type"]
            signature["my_record"] = my_record
        return {"pdf_binary": pdf_doc, "doc_data": signatures, 'id': self.id}


    @classmethod
    def get_records(cls, request, params):
        user_id = request.user.id
        docs = cls.objects.values('id', 'name').annotate(
                tot_signed=Count(
                    Case(
                        When((Q(signature__user_id=user_id) & Q(signature__signed=True)), then=1)
                        ,output_field=IntegerField(),)
                        )).annotate(
                            tot_unsigned=Count(
                                Case(
                                    When((Q(signature__user_id=user_id) & Q(signature__signed=False)), then=1)
                                    ,output_field=IntegerField(),)))
        esign_docs = []
        for sign_doc in docs:
            signature_status = ''
            if sign_doc['tot_signed'] == 0 and sign_doc['tot_unsigned'] == 0:
                signature_status = 'Not Required'
            elif sign_doc['tot_unsigned'] == 0:
                signature_status = 'Completed'
            else:
                signature_status = str(sign_doc['tot_signed']) + ' /' + str(sign_doc['tot_unsigned'])
            esign_docs.append({
                'id': sign_doc['id'],
                'name': sign_doc['name'],
                'signature_status': signature_status
            })
        total_cnt = docs.count()
        current_cnt = total_cnt
        result = {'records': esign_docs, 'total': total_cnt, 'count': current_cnt}
        return result


class Signature(models.Model):
    name = models.CharField(max_length=200, blank=True)
    email = models.CharField(max_length=200, blank=True)
    type = models.CharField(max_length=200)
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
    signed = models.BooleanField(default=False)
    signed_at = models.DateTimeField(null=True)
    created_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='admin')

    def save(self, *args, **kwargs):
        create = False
        if self.pk is None:
            create = True
        if self.image:
            self.signed = True
        super(Signature, self).save(*args, **kwargs)
        if create:
            pass


    @classmethod
    def del_sign(cls, request, params):
        signature_id = int(params['signature_id'])        
        sign = Signature.objects.get(id=signature_id)
        if sign.signed_at and sign.created_by.id != request.user.id:
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
    def save_signature(cls, request, params):
        doc_id = int(params['document_id'])
        signature_id = params['signature_id']
        token = params.get('token')
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
        sign.signed_at = datetime.datetime.now()
        binary_signature = ''
        curr_dir = os.path.dirname(__file__)
        font_directory = curr_dir.replace('esign/model_files', 'static/assets/fonts')
        sign_type = params['sign_type']
        if sign_type != 'initials' and sign_type != 'signature':
            text = params['text']
            font = ImageFont.truetype(font_directory + "/roboto-v19-latin-regular.ttf", 48)
            sz = font.getsize(text)
            sz = (sz[0] + 50, sz[1])
            img = Image.new('RGB', sz, (255,255,255))
            drawing = ImageDraw.Draw(img)
            drawing.text((0, -10), text, (0,0,0), font)
            curr_dir = os.path.dirname(__file__)
            signature_directory = curr_dir.replace('model_files', 'static')
            if not os.path.exists(signature_directory):
                os.makedirs(signature_directory)
            img_path = signature_directory + "/tempsignload" + str(request.user.id) + ".png"
            img.save(img_path)

            image = open(img_path, 'rb')
            read = image.read()
            binary_signature = base64.encodebytes(read)
            binary_signature = binary_signature.decode('utf-8')
        else:
            binary_signature = params['binary_signature']
        binary_data = io.BytesIO(base64.b64decode(binary_signature))
        jango_file = DjangoFile(binary_data)
        sign.image.save('sign_image.png', jango_file)
        return { 'image': binary_signature}

    @classmethod
    def load_signature(cls, request, params):
        token = params.get('token')
        sign_type = params.get('sign_type')
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
        res = ''
        model = apps.get_model('meetings', 'Profile')
        profile = model.objects.get(pk=sign.user.id)
        binary_signature = ''
        model = apps.get_model('meetings', 'Profile')
        profile = model.objects.get(pk=sign.user.id)
        if sign_type == 'initials' or sign_type == 'signature':
            if sign.image:
                binary_signature = sign.image.read()
                binary_signature = base64.b64encode(binary_signature)
                binary_signature = binary_signature.decode('utf-8')
        elif sign_type == 'date':
            res = str(datetime.datetime.now())
        elif sign_type == 'email':
            res = profile.email
        elif sign_type == 'name':
            res = profile.fullname()
        else:
            try:
                if sign_type == 'company':
                    res = profile.compnay
                elif sign_type == 'phone':
                    res = profile.mobile_phone
            except:
                pass
        return {"image": binary_signature, 'text': res}

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
        image = ''
        if sign.image:
            image = sign.image
        return {"image": image}

    @classmethod
    def get_auto_sign(cls, request, params):
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
        curr_dir = os.path.dirname(__file__)
        directory = curr_dir.replace('model_files', 'static')
        if not os.path.exists(directory):
            os.makedirs(directory)
        txt = user.profile.name
        sign_type = params['sign_type']
        if sign_type == "initials":
            txt = ''.join([x[0].upper() + "." for x in txt.split(' ')])
        font_directory = curr_dir.replace('esign/model_files', 'static/assets/fonts')
        font = ImageFont.truetype(font_directory + "/roboto-v19-latin-regular.ttf", 48)
        sz = font.getsize(txt)
        sz = (sz[0] + 50, sz[1])
        img = Image.new('RGB', sz, (255, 255, 255))
        d = ImageDraw.Draw(img)
        d.text((0, -10), txt, (0, 0, 0), font)
        img_path = directory + "/pic" + str(randint(1, 99)) + ".png"
        img.save(img_path)

        res = open(img_path, 'rb')
        read = res.read()
        binary_signature = base64.encodebytes(read)
        binary_signature = binary_signature.decode('utf-8')
        return { 'image': binary_signature }