import json
from django.apps import apps
from django.db import models, transaction
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

from documents.file import File
from chat.models import Notification
from mainapp.ws_methods import set_obj_attrs
from meetings.model_files.user import Profile
from mainapp.models import CustomModel


class AnnotationDocument(CustomModel):
    version = models.IntegerField(default=0)
    file = models.ForeignKey(File, on_delete=models.CASCADE, null=True)
    doc_name = models.CharField(max_length=100, null=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)

    def __str__(self):
        nam = 'Unnamed'
        if self.doc_name:
            nam = self.doc_name
        return nam

    @classmethod
    def get_data(cls, request, params):
        doc_data = File.get_file_data(request, params)
        annotations = cls.get_annotations(request, params)
        if doc_data.get('data'):
            doc_data['data']['annotation_data'] = annotations
        else:
            doc_data['annotation_data'] = annotations
        return doc_data

    @classmethod
    def get_data_with_binary(cls, request, params):
        doc_data = File.get_file_data(request, params)
        annotations = cls.get_annotations(request, params)
        if doc_data.get('data'):
            doc_data['data']['annotation_data'] = annotations
        else:
            doc_data['annotation_data'] = annotations
        return doc_data

    @classmethod
    def get_annotations(cls, request, params):
        res = {}
        force = params.get('force')
        doc_id = params.get('id')
        doc_name = params.get('doc_id')
        user_id = request.user.id
        comments_points = PointAnnotation.get_point_annotations(pdf_id=doc_id)

        doc = AnnotationDocument.objects.filter(doc_name=doc_name)
        if not doc:
            res = {'version': -1, 'annotations': [], 'comments': comments_points}
            return res

        doc = doc[0]
        document_version = params.get('version') or 0
        if not str(document_version).isnumeric():
            document_version = 0

        if doc.version < document_version and not force:
            res = {'version': doc.version, 'comments': comments_points}
            return  res

        with transaction.atomic():
            user_rectangles = RectangleAnnotation.get_rectangles(doc.id, user_id)
            line_drawings = DrawingAnnotation.get_drawings(doc.id, user_id)
            note_points = PointAnnotation.get_point_annotations(document_id=doc.id)
        res = {
            'version': doc.version, 'annotations': note_points + line_drawings + user_rectangles,
            'comments': comments_points
        }
        return res
    
    @classmethod
    def add_annotation(cls, request, params):
        doc_name = params.get('doc_id')
        doc_id = params.get('id')
        user_id = request.user.id
        document_version = params.get('version') or 0
        if not str(document_version).isnumeric():
            document_version = 0
        doc = AnnotationDocument.objects.filter(user_id = user_id, file_id = doc_id)
        if doc:
            doc = doc[0]
            reset = params.get('reset')
            if reset:
                doc.version = 0
                doc.annotation_set.all().delete()
                return 'done'
        else:
            doc = AnnotationDocument(
                version=1
                , file_id=doc_id
                , doc_name=doc_name
                , user_id=user_id
            )
            doc.save()

        user_annotations = params.get('annotations')
        if not user_annotations:
            user_annotations = []
        else:
            user_annotations = json.loads(user_annotations)

        point_annotations = []
        drawing_annotations = []
        rectangle_annotations = []

        for user_annot in user_annotations:
            annotation_to_save = None
            new_annotation = {
                'user_id' : user_id,
                'page' : 1,
                'type' : user_annot['type'],
                'uuid' : user_annot['uuid'],
                'document_id' : doc.id,
            }            
            
            if user_annot['type'] == 'drawing':
                annotation_to_save = DrawingAnnotation()
                annotation_to_save.width=user_annot['width']
                annotation_to_save.color=user_annot['color']
                set_obj_attrs(new_annotation, annotation_to_save)
                drawing_annotations.append(annotation_to_save)
            
            elif user_annot['type'] == 'point':
                sub_type = user_annot['sub_type']
                if sub_type != 'personal':
                    continue
                annotation_to_save = PointAnnotation()
                annotation_to_save.x = user_annot['x']
                annotation_to_save.y = user_annot['y']
                annotation_to_save.created_by_id = user_id
                annotation_to_save.sub_type = sub_type

                set_obj_attrs(new_annotation, annotation_to_save)
                point_annotations.append(annotation_to_save)
            
            elif user_annot['type'] in ('highlight','strikeout', 'underline'):
                annotation_to_save = RectangleAnnotation()
                annotation_to_save.color=user_annot['color']

                set_obj_attrs(new_annotation, annotation_to_save)
                rectangle_annotations.append(annotation_to_save)            
            else:
                raise ValidationError('Invalid annotation type '+user_annot['type'])            
                
        res = False
        with transaction.atomic():
            doc.annotation_set.all().delete()
            for obj in point_annotations:
                if not obj.sub_type:
                    raise ValidationError('Invalid point annotation')
                obj.save()
            for obj in drawing_annotations:
                obj.save()
            for obj in rectangle_annotations:
                obj.save()

            save_annotations = PointAnnotation.objects.filter(user_id=user_id, document_id=doc.id, type='point')
            cls.save_notes(save_annotations, user_annotations, user_id)

            save_annotations = DrawingAnnotation.objects.filter(user_id=user_id, document_id=doc.id, type='drawing')
            res = cls.save_lines(save_annotations, user_annotations)
            if not res:
                save_annotations = RectangleAnnotation.objects.filter(type__in = ['highlight','strikeout', 'underline'], user_id=user_id, document_id=doc.id)
                res = cls.save_dimensions(save_annotations, user_annotations)
                if not res:
                    doc.version = document_version
                    doc.save()
        if res:
            transaction.rollback()
            return res
        else:
            return 'done'

    @classmethod
    def save_lines(cls, saved_annotations, user_annotations):
        children = []
        drawing = 0
        if not saved_annotations:
            return
        for item in user_annotations:
            if item['type'] != 'drawing':
                continue
            drawing += 1
            for obj in saved_annotations.filter(uuid=item["uuid"]):
                if len(item['lines']) == 0:
                    return 'Invalid drawing object'
                for child in item['lines']:
                    child_to_save = Line(
                        drawing_id=obj.id,
                    )
                    x = None
                    y = None
                    if type(child) is dict:
                        x = child.get('x')
                        y = child.get('y')
                    elif type(child) is list:
                        x = child[0]
                        y = child[1]
                    if x and y:
                        child_to_save.x = x
                        child_to_save.y = y
                    else:
                        return 'Invalid points in line'
                    children.append(child_to_save)
        if len(children) > 0:
            Line.objects.bulk_create(children)
        else:
            if drawing > 0:
                return 'Invalid drawing object'

    @classmethod
    def save_dimensions(cls, saved_annotations, user_annotations):
        if not saved_annotations:
            return
        children = []
        rectangles = 0
        for item in user_annotations:
            if item['type'] not in ('highlight','strikeout', 'underline'):
                continue
            rectangles += 1
            for obj in saved_annotations.filter(uuid=item["uuid"]):
                dimensions = item.get('rectangles')
                if dimensions is None:
                    dimensions = item.get('dimensions')
                if len(dimensions) == 0:
                    return 'Invalid rectangle object'
                for dimension in dimensions:
                    child_to_save = Dimension(
                        rectangle_id = obj.id,
                        x = dimension.get('x'),
                        y = dimension.get('y'),
                        width = dimension.get('width'),
                        height = dimension.get('height')
                    )
                    children.append(child_to_save)
        if len(children) > 0:
            Dimension.objects.bulk_create(children)
        else:
            if rectangles > 0:
                return 'Invalid rectangle object'

    @classmethod
    def save_notes(cls, saved_annotations, user_annotations, user_id):
        children = []
        note_count = 0
        for item in user_annotations:
            if item['type'] != 'point':
                continue
            note_count += 1
            point_id = item.get("uuid")
            for obj in saved_annotations.filter(uuid = point_id):
                for comment in item['comments']:
                    body = comment.get('body')
                    if body is None:
                        body = comment.get('content')
                    child_to_save = CommentAnnotation(
                        point_id=obj.id,
                        user_id=user_id,
                        uuid = comment['uuid'],
                        body = body
                    )
                    children.append(child_to_save)
        if len(children) > 0:
            CommentAnnotation.objects.bulk_create(children)
        else:
            if note_count > 0:
                return 'Note must have some comment'


class Annotation(CustomModel):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    document = models.ForeignKey(AnnotationDocument, null=True, on_delete=models.CASCADE)
    page = models.IntegerField()
    type = models.CharField(max_length=50)
    uuid = models.CharField(max_length=200)

    def save(self, *args, **kwargs):
        if not self.pk:
            objs = Annotation.objects.filter(uuid=self.uuid)
            if objs:
                print('Duplicate addition of same annotation '+ str(objs[0]))
        if not self.document_id:
            raise Exception('Invalid document id')
        super(Annotation, self).save(*args, **kwargs)

    def __str__(self):
        nam = self.type + '-'
        if self.document:
            if self.document.doc_name:
                nam += self.document.doc_name
        nam += '-' + str(self.id)+'-'+self.uuid
        return nam


class RectangleAnnotation(Annotation):
    color = models.CharField(max_length=50)

    @classmethod
    def get_rectangles(cls, doc_id, user_id):
        rectangles = RectangleAnnotation.objects.filter(document_id=doc_id, type__in=['highlight','underline','strikeout','rectangle'], user_id = user_id)
        user_rectangle = []
        counter = 0
        for rectangle in rectangles:
            user_rectangle.append({
                'uid': rectangle.user.id,
                'document_name': rectangle.document.doc_name,
                'type': rectangle.annotation_ptr.type,
                'page': rectangle.annotation_ptr.page,
                'uuid': rectangle.annotation_ptr.uuid,
                'date_time': str(rectangle.created_at),
                'color': rectangle.color,
                'doc_id': rectangle.document.doc_name,

            })
            dimensions = rectangle.dimension_set.all()
            user_dimension = []
            for dimension in dimensions:
                user_dimension.append({
                    'x': dimension.x, 'y': dimension.y,
                    'width': dimension.width,
                    'height': dimension.height
                })
            user_rectangle[counter]['rectangles'] = user_dimension
            counter += 1
        return user_rectangle


class Dimension(CustomModel):
    rectangle = models.ForeignKey(RectangleAnnotation, on_delete=models.CASCADE)
    x = models.FloatField()
    y = models.FloatField()
    width = models.FloatField()
    height = models.FloatField()


class DrawingAnnotation(Annotation):
    title = models.CharField(max_length=50, default='')
    width = models.IntegerField(default=2)
    color = models.CharField(max_length=20, default='#000000')

    @classmethod
    def get_drawings(cls, doc_id, user_id):
        drawings = DrawingAnnotation.objects.filter(document_id=doc_id, user_id=user_id)
        line_drawings = []
        counter = 0
        for drawing in drawings:
            line_drawings.append({
                'uid': drawing.user.id,
                'document_name': drawing.document.doc_name,
                'type': drawing.annotation_ptr.type,
                'page': drawing.annotation_ptr.page,
                'uuid': drawing.annotation_ptr.uuid,
                'date_time': str(drawing.created_at),
                'color': drawing.color,
                'width': drawing.width,
                'doc_id': drawing.document.doc_name,

            })
            lines = drawing.line_set.all()
            drawing_lines = []
            for line in lines:
                drawing_lines.append({'x': line.x, 'y': line.y})
            line_drawings[counter]['lines'] = drawing_lines
            counter += 1
        return  line_drawings    

    
class Line(CustomModel):
    drawing = models.ForeignKey(DrawingAnnotation, on_delete=models.CASCADE)
    x = models.IntegerField()
    y = models.IntegerField()


class PointAnnotation(Annotation):
    sub_type = models.CharField(max_length=200)
    x = models.IntegerField()
    y = models.IntegerField()
    '''
        Unique identification of document. Having doc_name+file_id
        Only applicable for shared comments
    '''
    pdf = models.ForeignKey(File, on_delete=models.CASCADE, null=True)

    def get_meta(self):
        data = {
            'post_parent_id': self.pdf.id,
            'file_type': self.pdf.file_type
        }
        return data

    def notification_text(self):
        parent_obj = None
        if self.pdf.file_type == 'meeting':
            parent_obj = self.pdf.meetingdocument
        elif self.pdf.file_type == 'topic':
            parent_obj = self.pdf.agendadocument
        else:
            return 'comment on unknown document'
        txt1 = parent_obj.notification_text()
        txt2 = ' on point '+str(self.id)
        return txt1 + txt2

    def get_audience(self):
        parent_obj = None
        if self.pdf.file_type == 'meeting':
            parent_obj = self.pdf.meetingdocument
        elif self.pdf.file_type == 'topic':
            parent_obj = self.pdf.agendadocument
        else:
            return []
        return parent_obj.get_audience()

        # if self.pdf.file_type == 'topic':
        #     return self.pdf.agendadocument.get_audience()
        # elif self.pdf.file_type == 'meeting':
        #     return self.pdf.meeting.get_audience()
        # else:
        #     return []

    @classmethod
    def save_point(cls, point):
        x = point.get('x')
        y = point.get('y')
        sub_type = ''
        file_id = point.get('file_id')
        user_id = point.get('uid')
        name = point.get('class')
        uuid = point.get('uuid')
        doc_name = point.get('doc_name')
        page = point.get('page')
        type = point.get('type')
        new_point = False

        document = AnnotationDocument.objects.filter(file_id=file_id, user_id=user_id)
        if document:
            document = document[0]
        else:
            document = AnnotationDocument.objects.create(file_id=file_id, doc_name=doc_name, user_id=user_id)

        user_point = PointAnnotation.objects.filter(uuid=uuid, document_id=document.id)
        if user_point:
            user_point = user_point[0]
            return {'point_id': user_point.id, 'new_point': new_point}
        else:
            user_point = PointAnnotation(sub_type=sub_type, pdf_id=file_id, x=x, y=y,
                                user_id=user_id, name=name, document_id=document.id,
                                page=page, type=type, uuid=uuid)
            user_point.save()
            new_point = 1
            return {'point_id': user_point.id, 'new_point': new_point}

    @classmethod
    def get_point_annotations(cls, pdf_id=None, document_id=None):
        point_objects = []
        sub_type = None
        if pdf_id:
            point_objects = PointAnnotation.objects.filter(pdf_id=pdf_id)
            sub_type = ''
            return_sub_type = False
        elif document_id:
            point_objects = PointAnnotation.objects.filter(document_id=document_id)
            sub_type = 'personal'
            return_sub_type = 'personal'
        else:
            return []

        notes_data = []
        for point in point_objects:
            if point.sub_type == sub_type:
                note_point = {
                    'id': point.id, 'uid': point.created_by_id, 'type': point.type, 'uuid': point.uuid,
                    'date_time': str(point.created_at), 'x': point.x, 'y': point.y, 'sub_type': return_sub_type,
                    'class': 'Annotation', 'counter': 0, 'page': point.page, 'doc_name': point.document.doc_name, 'comments': []
                }

                note_objects = point.commentannotation_set.all()
                note_point_comments = []
                for note in note_objects:
                    user = note.user
                    note_point_comments.append({
                        'class': "Comment",
                        'uuid': note.uuid,
                        'point_id': point.uuid,
                        'uid': user.id,
                        'content': note.body,
                        'user_name': user.name,
                        'user': {'name': user.fullname(), 'id':user.id, 'image': user.image.url},
                        'date_time': str(note.created_at)
                    })
                note_point['comments'] = note_point_comments
                notes_data.append(note_point)
        return notes_data


class CommentAnnotation(CustomModel):
    body = models.CharField(max_length=500)
    point = models.ForeignKey(PointAnnotation, on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    uuid = models.CharField(max_length=200)

    @classmethod
    def save_comment(cls, request, params):        
        user_id = request.user.id
        point = params.get('point')
        mentioned_list = params.get('mentioned_list');
        if point:
            point_id = None
            user_point = None
            existing_point = None
            if point.get('id'):
                existing_point = PointAnnotation.objects.filter(pk = point['id'])
            if existing_point:
                user_point = existing_point[0]
                point_id = user_point.id
            else:
                user_point = PointAnnotation.save_point(point)
                point_id = user_point['point_id']
            comment = point.get('comment')
            comment_uuid = comment.get('uuid')
            comment_body = comment.get('content')
            comment_uid = comment.get('uid')
            if comment:
                comment = CommentAnnotation(body=comment_body, point_id=point_id, user_id=comment_uid, uuid=comment_uuid)
                comment.save()
                res = {}
                res['point'] = point
                point['id'] = point_id
                if not existing_point:
                    res['new_point'] = 1
                doc_type = params['doc_type']
                res_model = ''
                file_id = params['file_id']

                if len(comment_body) > 20:                    
                    comment_body = '=> '+ comment_body[0: 20] + '...'
                text = 'You have new comment '+ comment_body + ' on '
                if doc_type == 'meeting':
                    res_model = 'MeetingDocument'
                    model = apps.get_model('meetings', res_model)
                    obj = model.objects.get(pk = file_id)
                    text += ' meeting document '+obj.name+ ' in '+obj.meeting.name
                elif doc_type == 'topic':
                    res_model = 'AgendaDocument'
                    model = apps.get_model('meetings', res_model)
                    obj = model.objects.get(pk = file_id)
                    text += ' an agenda-topic-document '+obj.name+ ' in meeting=>'+obj.agenda.event.name
                else:
                    raise ValidationError('Invalid document type '+doc_type)
                params = {
                    'res_app': 'documents',
                    'res_model': 'PointAnnotation',
                    'res_id' : point_id,
                    'parent_post_id': file_id,
                    'file_type': doc_type,
                    'notification_type': 'comment'
                }
                event_data = {'name': 'point_comment_received', 'data': res, 'uid' : request.user.id}                
                Notification.add_notification(request.user, params, event_data, mentioned_list)
                return res
        else:
            return 'Invalid Point'
