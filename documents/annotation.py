from meetings.model_files.user import Profile
from django.contrib.auth.models import User
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
        # values = kw
        # uid = ws_methods.check_auth(values)
        # if not uid:
        #     return ws_methods.not_logged_in()
        # req_env = http.request.env
        #
        # if 'doc_id' in values:
        #     a = 1
        # else:
        #     return ws_methods.http_response('Please Provide document id!')
        #
        # doc_name = values.get('doc_id')
        #
        force = params.get('force')
        doc_id = params.get('id')
        doc_name = params.get('doc_id')
        user_id = request.user.id
        point_obj = PointAnnotation.objects.filter(document_id = doc_id)
        comments_points = []
        counter = 0
        for point in point_obj:
            if point.sub_type != 'personal':
                comments_points.append({
                    'id': point.id, 'uid': point.created_by_id, 'type': point.type, 'uuid': point.uuid,
                    'date_time': str(point.date_time), 'x': point.x, 'y': point.y, 'sub_type': point.sub_type,
                    'comments': []
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

        # filter = [('doc_name', '=', doc_name)]
        # point_objects = req_env['annotation.point'].search(filter)
        # props = ['id', 'uid', 'document_id.name', 'page', 'type', 'uuid', 'date_time', 'x', 'y', 'sub_type']
        #
        # comments_points = ws_methods.objects_list_to_json_list(point_objects, props)
        #
        # props = ['uid', 'user_name', 'date_time', 'uuid', 'content']
        # i = 0
        # for point in point_objects:
        #     comments = point.comments
        #     comments = ws_methods.objects_list_to_json_list(comments, props)
        #     for com in comments:
        #         com['point_id'] = comments_points[i]['uuid']
        #     comments_points[i]['comments'] = comments
        #     note_counter = point['my_notifications']
        #     if note_counter > 0:
        #         a = 1
        #     comments_points[i]['counter'] = note_counter
        #     i = i + 1
        #

        doc = AnnotationDocument.objects.filter(doc_name=doc_name, user_id=user_id)
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
        # doc = req_env['annotation.document'].search([('name', '=', doc_name), ('user_id', '=', uid)])
        # if not doc:
        #     res = {'version': -1, 'annotations': [], 'comments': comments_points}
        #     return ws_methods.http_response('', res)
        #
        # document_version = values.get('version') or 0
        # document_version = int(document_version)
        # if doc.version < document_version and not force:
        #     return ws_methods.http_response('', {'version': doc.version, 'comments': comments_points})
        #
        # document_id = doc.id
        # filter = [('document_id', '=', document_id), ('type', 'in', ['underline', 'highlight', 'strikeout'])]
        #
        # rectangle_objects = req_env['annotation.rectangle'].search(filter)
        # props = ['uid', 'document_id.name', 'page', 'type', 'uuid', 'date_time', 'color']
        # rectanglular_annotations = ws_methods.objects_list_to_json_list(rectangle_objects, props)
        # props = ['x', 'y', 'width', 'height']
        # i = 0
        # for rect in rectangle_objects:
        #     dimentions = ws_methods.objects_list_to_json_list(rect.rectangles, props)
        #     rectanglular_annotations[i]['rectangles'] = dimentions
        #     rectanglular_annotations[i]['doc_id'] = doc_name
        #     i = i + 1
        #
        # filter = [('document_id', '=', document_id), ('type', '=', 'drawing')]
        # drawing_objects = req_env['annotation.drawing'].search(filter)
        # props = ['uid', 'document_id.name', 'page', 'type', 'uuid', 'date_time', 'color']
        # drawings = ws_methods.objects_list_to_json_list(drawing_objects, props)
        # props = ['x', 'y']
        # i = 0
        # for rect in drawing_objects:
        #     dimentions = ws_methods.objects_list_to_json_list(rect.lines, props)
        #     ar_res = []
        #     for xy in dimentions:
        #         ar_res.append([xy['x'], xy['y']])
        #     drawings[i]['lines'] = ar_res
        #     drawings[i]['doc_id'] = doc_name
        #     drawings[i]['width'] = 1
        #     i = i + 1
        #

        point_object = PointAnnotation.objects.filter(document_version__doc_name=doc_name)
        note_points = []
        counter = 0
        for point in point_object:
            if point.sub_type == 'personal':
                note_points.append({
                    'id': point.id, 'uid': point.created_by_id, 'type': point.type, 'uuid': point.uuid,
                    'date_time': str(point.date_time), 'x': point.x, 'y': point.y, 'sub_type': point.sub_type,
                    'comments': []
                })
                comments = point.commentannotation_set.all()
                for comment in comments:
                    note_points[counter]['comments'].append({
                        'class': "Comment",
                        'uuid': comment.uuid,
                        'point_id': point.uuid,
                        'uid': comment.user_id,
                        'content': comment.body,
                        'user_name': comment.user.username,
                        'date_time': str(comment.date_time)
                    })
                counter += 1
        # filter = [('document_id', '=', document_id), ('type', '=', 'point'), ('sub_type', '=', 'personal')]
        # point_objects = req_env['annotation.point'].search(filter)
        # props = ['uid', 'document_id.name', 'page', 'type', 'uuid', 'date_time', 'x', 'y', 'sub_type']
        #
        # notes_points = ws_methods.objects_list_to_json_list(point_objects, props)
        #
        # props = ['uid', 'user_name', 'date_time', 'uuid', 'content']
        # i = 0
        # for point in point_objects:
        #     comments = point.comments
        #     comments = ws_methods.objects_list_to_json_list(comments, props)
        #     for com in comments:
        #         com['point_id'] = notes_points[i]['uuid']
        #     notes_points[i]['comments'] = comments
        #     i = i + 1
        #
        # points = notes_points
        # annotations = rectanglular_annotations + points + drawings
        res = {'version': doc.version, 'annotations': note_points, 'comments': comments_points}
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
                points = PointAnnotation.objects.filter(document_version_id = doc.id).delete()
                if reset:
                    doc.version = 0
                    return 'done'
        else:
            doc = AnnotationDocument(version=document_version, document_id=doc_id, doc_name=doc_name, user_id=user_id)
            doc = doc.save()

        doc = AnnotationDocument.objects.filter(doc_name = doc_name, user_id = user_id, document_id = doc_id)
        if doc:
            doc = doc[0]
        values = json.loads(params['annotations'])
        for val in values:
            type = val.get('type')
            comments = val.get('comments')
            name = val.get('class')
            user = val.get('uid')
            date_time = val.get('date_time')
            page = val.get('page')
            uuid = val.get('uuid')
            sub_type = val.get('sub_type')
            x = val.get('x')
            y = val.get('y')
            if sub_type == 'personal':
                point = PointAnnotation(name=name, user_id=user, date_time=date_time, page=page,
                                   type=type, uuid=uuid, sub_type=sub_type, document_id=doc_id, x=x, y=y,
                                        created_by_id=user, my_notification = 0, document_version_id = doc.id)
                point.save()
                point_id = PointAnnotation.objects.filter(date_time=date_time, x=x, y=y, type=type, sub_type=sub_type
                                                          , user_id=user, uuid=uuid).values('id')[0]['id']
                if comments:
                    for val in comments:
                        body = val['content']
                        uuid = val['uuid']
                        date_time = val['date_time']
                        commented_by = val['uid']
                        comment_anno = CommentAnnotation(body=body, point_id_id=point_id, user_id=commented_by
                                                         , date_time=date_time, uuid=uuid)
                        comment_anno.save()


        # doc_name = kw.get('doc_id')
        # doc = req_env['annotation.document'].search([('name', '=', doc_name), ('user_id', '=', uid)])
        # if doc:
        #     reset = kw.get('reset')
        #     if not reset:
        #         document_version = kw.get('version') or 0
        #         document_version = int(document_version)
        #         if doc.version >= document_version:
        #             return ws_methods.http_response('', doc.version)
        #     res = req_env['annotation.rectangle'].search([('document_id', '=', doc.id)]).unlink()
        #     res = req_env['annotation.drawing'].search([('document_id', '=', doc.id)]).unlink()
        #     points = req_env['annotation.point'].search([('document_id', '=', doc.id), (' ', '=', 'personal')])
        #
        #     for p in points:
        #         res = p.comments.unlink()
        #         if len(p.comments) == 0:
        #             res = p.unlink()
        #     if reset:
        #         doc.version = 0
        #         return ws_methods.http_response('', 'done')
        # else:
        #     doc = req_env['annotation.document'].create({'name': doc_name, 'user_id': uid, 'version': 0})
        #
        # values = kw.get('annotations')
        # values = json.loads(values)
        #
        # if not values:
        #     return ws_methods.http_response('', 'No annotations to save')
        # for val in values:
        #     atype = val.get('type')
        #     modal = types[atype]
        #
        #     dimensions = val.get('rectangles')
        #     comments = val.get('comments')
        #     lines = val.get('lines')
        #
        #     if val['uid'] != uid and not comments:
        #         continue
        #
        #     val['document_id'] = doc.id
        #     if dimensions:
        #         del val['rectangles']
        #         rid = req_env[modal].create(val)
        #         modal = types['rectangle']
        #         for vals in dimensions:
        #             vals['rectangle_id'] = rid.id
        #             req_env[modal].create(vals)
        #     elif lines:
        #         del val['lines']
        #         pen_id = req_env[modal].create(val)
        #         modal = types['line']
        #         for line in lines:
        #             vals = {}
        #             vals['drawing_id'] = pen_id.id
        #             vals['x'] = line[0]
        #             vals['y'] = line[1]
        #             req_env[modal].create(vals)
        #     elif comments:
        #         del val['comments']
        #         point_id = req_env[modal].search([('uuid', '=', val['uuid'])])
        #         if not point_id:
        #             if val['sub_type'] != 'personal':
        #                 continue
        #             point_id = req_env[modal].create(val)
        #         else:
        #             if point_id.sub_type != 'personal':
        #                 continue
        #         modal = types['comment']
        #         for vals in comments:
        #             if vals['uid'] == uid:
        #                 vals['point_id'] = point_id.id
        #                 req_env[modal].create(vals)
        #     else:
        #         req_env[modal].create(val)
        # doc.version = kw['version']
        doc.version = document_version
        doc.save()
        return 'done'


class Annotation(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    #null for point with subtype=comment
    document_version = models.ForeignKey(AnnotationDocument, null=True, on_delete=models.CASCADE)

    date_time = models.DateTimeField()
    page = models.IntegerField()
    type = models.CharField(max_length=50)
    uuid = models.CharField(max_length=200)


class RectangleAnnotation(Annotation):
    color = models.CharField(max_length=50)

class Dimensions(models.Model):
    rectangle_id = models.ForeignKey(RectangleAnnotation, on_delete=models.CASCADE)
    x = models.FloatField()
    y = models.FloatField()
    width = models.FloatField()
    height = models.FloatField()


class DrawingAnnotation(Annotation):
    title = models.CharField(max_length=50)


class Line(models.Model):
    drawing_id = models.ForeignKey(DrawingAnnotation, on_delete=models.CASCADE)
    x = models.IntegerField()
    y = models.IntegerField()


class PointAnnotation(Annotation):
    sub_type = models.CharField(max_length=200)

    # null for subtype=personal
    document = models.ForeignKey(File, null=True, on_delete=models.CASCADE)

    x = models.IntegerField()
    y = models.IntegerField()
    my_notification = models.IntegerField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    @classmethod
    def save_point(cls, point):
        type = point.get('type')
        x = point.get('x')
        y = point.get('y')
        sub_type = ''
        counter = point.get('counter')
        uuid = point.get('uuid')
        page = point.get('page')
        date_time = point.get('date_time')
        doc_id = point.get('document_id')
        user_id = point.get('uid')
        name = point.get('class')
        uuid = point.get('uuid')
        page = point.get('page')
        type = point.get('type')

        user_point = PointAnnotation.objects.filter(document_id=doc_id, uuid=uuid, created_by_id=user_id)
        if user_point:
            user_point = user_point[0]
            return user_point.id
        else:
            user_point = PointAnnotation(sub_type=sub_type, document_id=doc_id, x=x, y=y, my_notification=0,
                                created_by_id=user_id, user_id=user_id, name=name, date_time=date_time,
                                page=page, type=type, uuid=uuid)
            user_point.save()
            user_point = PointAnnotation.objects.filter(document_id=doc_id, uuid=uuid, created_by_id=user_id)
            return user_point[0].id

    @classmethod
    def save_comment(cls, request, params):
        doc_id = params.get('parent_res_id')
        doc_name = params.get('doc_id')
        user_id = request.user.id
        point = params.get('point')
        if point:
            point['document_id'] = doc_id
            point_id = cls.save_point(point)
            comment = point.get('comment')
            comment_uuid = comment.get('uuid')
            comment_body = comment.get('content')
            comment_uid = comment.get('uid')
            comment_date_time = comment.get('date_time')
            if comment:
                comment = CommentAnnotation(body=comment_body, point_id_id=point_id, user_id=comment_uid,
                                            date_time=comment_date_time, uuid=comment_uuid)
                comment.save()
                return 'done'
        else:
            return 'Invalid Point'

class CommentAnnotation(models.Model):
    body = models.CharField(max_length=500)
    point_id = models.ForeignKey(PointAnnotation, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    date_time = models.DateTimeField(default=datetime.datetime.now())
    uuid = models.CharField(max_length=200)