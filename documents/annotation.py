from meetings.model_files.user import Profile
from django.contrib.auth.models import User
from mainapp import ws_methods
from chat.models import Notification
from django.db import models
from .file import *
import datetime
import json


class AnnotationDocument(models.Model):
    version = models.IntegerField()
    document = models.ForeignKey(File, on_delete=models.CASCADE, null=True)
    doc_name = models.CharField(max_length=100, null=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)

    @classmethod
    def get_annotations(cls, request, params):
        res = {}
        force = params.get('force')
        doc_id = params.get('id')
        doc_name = params.get('doc_id')
        user_id = request.user.id
        comments_points = PointAnnotation.get_point_annotations(doc_id=doc_id)

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

        user_rectangles = RectangleAnnotation.get_rectangles(doc.id, user_id)
        line_drawings = DrawingAnnotation.get_drawings(doc.id, user_id)
        note_points = PointAnnotation.get_point_annotations(doc_name=doc_name, user_id=user_id)
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
        doc = AnnotationDocument.objects.filter(doc_name = doc_name, user_id = user_id, document_id = doc_id)
        if doc:
            doc = doc[0]
            reset = params.get('reset')
            if not reset:
                if doc.version >= document_version:
                    return {'version': doc.version}
                points = PointAnnotation.objects.filter(document_id = doc.id).delete()
                drawings = DrawingAnnotation.objects.filter(document_id=doc.id).delete()
                rectangles = RectangleAnnotation.objects.filter(document_id=doc.id).delete()
                if reset:
                    doc.version = 0
                    return 'done'
        else:
            doc = AnnotationDocument(version=document_version, document_id=doc_id, doc_name=doc_name, user_id=user_id)
            doc.save()

        # doc = AnnotationDocument.objects.filter(doc_name = doc_name, user_id = user_id, document_id = doc_id)
        if doc:
            # doc = doc[0]
            values = json.loads(params['annotations'])
            for val in values:
                type = val.get('type')
                name = val.get('class')
                user = val.get('uid')
                date_time = val.get('date_time')
                page = val.get('page')
                uuid = val.get('uuid')
                sub_type = val.get('sub_type')
                x = val.get('x')
                y = val.get('y')

                comments = val.get('comments')
                lines = val.get('lines')

                if type in('strikeout', 'highlight', 'underline'):
                    RectangleAnnotation.add_rectangle(val, doc.id)

                if type == 'drawing' and lines:
                    DrawingAnnotation.add_drawing(val, doc.id)

                if type == 'point' and sub_type == 'personal':
                    point = PointAnnotation(name=name, user_id=user, date_time=date_time, page=page,
                                    type=type, uuid=uuid, sub_type=sub_type, x=x, y=y,
                                            created_by_id=user, my_notification = 0, document_id = doc.id)
                    point.save()
                    point_id = point.pk
                    if comments:
                        for val in comments:
                            body = val['content']
                            uuid = val['uuid']
                            date_time = val['date_time']
                            commented_by = val['uid']
                            comment_anno = CommentAnnotation(body=body, point_id_id=point_id, user_id=commented_by
                                                            , date_time=date_time, uuid=uuid)
                            comment_anno.save()
            doc.version = document_version
            doc.save()
            return 'done'


class Annotation(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    #null for point with subtype=comment
    document = models.ForeignKey(AnnotationDocument, null=True, on_delete=models.CASCADE)

    date_time = models.DateTimeField()
    page = models.IntegerField()
    type = models.CharField(max_length=50)
    uuid = models.CharField(max_length=200)


class RectangleAnnotation(Annotation):
    color = models.CharField(max_length=50)

    @classmethod
    def add_rectangle(cls, val, doc_id):
        type = val.get('type')
        name = val.get('class')
        user = val.get('uid')
        date_time = val.get('date_time')
        page = val.get('page')
        uuid = val.get('uuid')
        color = val.get('color')

        dimensions = val.get('rectangles')
        rectangle = RectangleAnnotation(name=name, user_id=user, date_time=date_time, page=page,
                                        type=type, uuid=uuid, document_id=doc_id, color=color)
        rectangle.save()        
        for dimension in dimensions:
            x = dimension.get('x')
            y = dimension.get('y')
            width = dimension.get('width')
            height = dimension.get('height')
            user_dimension = Dimensions(rectangle_id_id=rectangle.id, x=x, y=y, width=width, height=height)
            user_dimension.save()

    @classmethod
    def get_rectangles(cls, doc_id, user_id):
        rectangles = RectangleAnnotation.objects.filter(document_id=doc_id, user_id = user_id)
        user_rectangle = []
        counter = 0
        for rectangle in rectangles:
            user_rectangle.append({
                'uid': rectangle.user.id,
                'document_name': rectangle.document.doc_name,
                'type': rectangle.annotation_ptr.type,
                'page': rectangle.annotation_ptr.page,
                'uuid': rectangle.annotation_ptr.uuid,
                'date_time': str(rectangle.annotation_ptr.date_time),
                'color': rectangle.color,
                'doc_id': rectangle.document.doc_name,

            })
            dimensions = rectangle.dimensions_set.all()
            user_dimension = []
            for dimension in dimensions:
                user_dimension.append({'x': dimension.x, 'y': dimension.y,
                                       'width': dimension.width, 'height': dimension.height})
            user_rectangle[counter]['rectangles'] = user_dimension
            counter += 1
        return  user_rectangle


class Dimensions(models.Model):
    rectangle_id = models.ForeignKey(RectangleAnnotation, on_delete=models.CASCADE)
    x = models.FloatField()
    y = models.FloatField()
    width = models.FloatField()
    height = models.FloatField()


class DrawingAnnotation(Annotation):
    title = models.CharField(max_length=50)
    width = models.IntegerField(default=2)
    color = models.CharField(max_length=20, default='#000000')
    to_merge = models.IntegerField(default=0)

    @classmethod
    def add_drawing(cls, val, doc_id):
        type = val.get('type')
        name = val.get('class')
        user = val.get('uid')
        date_time = val.get('date_time')
        page = val.get('page')
        uuid = val.get('uuid')
        to_merge = val.get('to_merge')
        width = val.get('width')
        color = val.get('color')
        lines = val.get('lines')
        drawing = DrawingAnnotation(title=name, user_id=user, date_time=date_time, page=page,
                                    type=type, uuid=uuid, document_id=doc_id,
                                    width=width, color=color, to_merge=to_merge)
        drawing.save()
        if drawing:
            # drawing = drawing[0]
            for line in lines:
                drawing_id = drawing.id
                x = line[0]
                y = line[1]
                drawing_line = Line(drawing_id_id=drawing_id, x=x, y=y)
                drawing_line.save()

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
                'date_time': str(drawing.annotation_ptr.date_time),
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


class Line(models.Model):
    drawing_id = models.ForeignKey(DrawingAnnotation, on_delete=models.CASCADE)
    x = models.IntegerField()
    y = models.IntegerField()


class PointAnnotation(Annotation):
    sub_type = models.CharField(max_length=200)
    x = models.IntegerField()
    y = models.IntegerField()
    my_notification = models.IntegerField()
    comment_doc_id = models.CharField(max_length=128, null=True)
    pdf = models.ForeignKey(File, on_delete=models.CASCADE, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    @classmethod
    def save_point(cls, point):
        x = point.get('x')
        y = point.get('y')
        sub_type = ''
        date_time = point.get('date_time')
        doc_id = point.get('document_id')
        user_id = point.get('uid')
        name = point.get('class')
        uuid = point.get('uuid')
        page = point.get('page')
        type = point.get('type')
        comment_doc_id = point.get('comment_doc_id')
        new_point = False

        doc_id = int(doc_id)
        user_point = PointAnnotation.objects.filter(pdf_id=doc_id, uuid=uuid, created_by_id=user_id,
        comment_doc_id=comment_doc_id)
        if user_point:
            user_point = user_point[0]
            return {'point_id': user_point.id, 'new_point': new_point}
        else:
            user_point = PointAnnotation(sub_type=sub_type, pdf_id=doc_id, x=x, y=y, my_notification=0,
                                created_by_id=user_id, user_id=user_id, name=name, date_time=date_time,
                                page=page, type=type, uuid=uuid, comment_doc_id=comment_doc_id)
            user_point.save()
            new_point = 1
            return {'point_id': user_point.id, 'new_point': new_point}

    @classmethod
    def save_comment(cls, request, params):
        doc_id = params.get('parent_res_id')
        user_id = request.user.id
        point = params.get('point')
        if point:
            point['document_id'] = doc_id
            user_point = cls.save_point(point)
            point_id = user_point.get('point_id')
            new_point = user_point.get('new_point')
            comment = point.get('comment')
            comment_uuid = comment.get('uuid')
            comment_body = comment.get('content')
            comment_uid = comment.get('uid')
            comment_date_time = comment.get('date_time')
            if comment:
                comment = CommentAnnotation(body=comment_body, point_id_id=point_id, user_id=comment_uid,
                                            date_time=comment_date_time, uuid=comment_uuid)
                comment.save()
                res = {}
                res['point'] = point
                point['id'] = point_id
                res['new_point'] = new_point
                doc = File.objects.get(pk=doc_id)
                attendees = []
                if doc:
                    try:
                        if doc.meetingdocument:
                            meeting_doc = doc.meetingdocument
                            if meeting_doc:
                                meeting = meeting_doc.meeting
                    except:
                        if doc.agendadocument:
                            agenda = doc.agendadocument.agenda
                            if agenda:
                                meeting = agenda.event
                    if meeting:
                        meeting_attendees = meeting.attendees.all()
                        if meeting_attendees:
                            for attendee in meeting_attendees:
                                if user_id != attendee.id:
                                    attendees.append(attendee.id)
                # events = [
                #     {'name': 'point_comment_received', 'data': res, 'audience': attendees}
                # ]
                # res = ws_methods.emit_event(events)
                doc_type = params['doc_type']
                res_id = params['parent_res_id']
                res_model = ''
                if doc_type == 'meeting':
                    res_model = 'Event'
                elif doc_type == 'topic':
                    res_model = 'AgendaDocument'
                res_details = {
                    'res_app': 'meetings',
                    'res_model': res_model,
                    'res_id' : res_id
                }
                event_data = {'name': 'point_comment_received', 'data': res, 'uid' : request.user.id}
                Notification.add_notification(res_details, event_data)
                return res
        else:
            return 'Invalid Point'

    @classmethod
    def get_point_annotations(cls, doc_name=None, doc_id=None, user_id=None):
        if doc_id:
            point_obj = PointAnnotation.objects.filter(pdf_id=doc_id)
            sub_type = ''
            return_sub_type = False
        else:
            point_obj = PointAnnotation.objects.filter(document__doc_name=doc_name, user_id=user_id)
            sub_type = 'personal'
            return_sub_type = 'personal'

        comments_points = []
        counter = 0
        for point in point_obj:
            if point.sub_type == sub_type:
                comments_points.append({
                    'id': point.id, 'uid': point.created_by_id, 'type': point.type, 'uuid': point.uuid,
                    'date_time': str(point.date_time), 'x': point.x, 'y': point.y, 'sub_type': return_sub_type,
                    'class': 'Annotation', 'counter': 0, 'page': point.page, 'comment_doc_id': point.comment_doc_id, 'comments': []
                })
                comments = point.commentannotation_set.all()
                for comment in comments:
                    comments_points[counter]['comments'].append({
                        'class': "Comment",
                        'uuid': comment.uuid,
                        'point_id': point.uuid,
                        'uid': comment.user_id,
                        'content': comment.body,
                        'user_name': comment.user.username,
                        'date_time': str(comment.date_time)
                    })
                counter += 1
        return  comments_points


class CommentAnnotation(models.Model):
    body = models.CharField(max_length=500)
    point_id = models.ForeignKey(PointAnnotation, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    date_time = models.DateTimeField(auto_now_add=True)
    uuid = models.CharField(max_length=200)