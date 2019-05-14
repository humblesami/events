from django.contrib.auth.models import User
from django.db import models
from .file import *
from meetings.model_files.user import Profile


class AnnotationDocument(File):
    version = models.IntegerField()
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)

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
        # force = values.get('force')
        #
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
        res = {'version': 0, 'annotations': [], 'comments': []}
        return res

    @classmethod
    def add_annotation(cls, request, params):
        # uid = ws_methods.check_auth(kw)
        # if not uid:
        #     return ws_methods.not_logged_in()
        # req_env = http.request.env
        #
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
        #     points = req_env['annotation.point'].search([('document_id', '=', doc.id), ('sub_type', '=', 'personal')])
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
        return 'done'

class Annotation(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    document = models.ForeignKey(AnnotationDocument, on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    page = models.IntegerField()
    type = models.CharField(max_length=50)
    uuid = models.CharField(max_length=50)


class RectangleAnnotation(Annotation):
    color = models.CharField(max_length=50)

class Dimensions(models.Model):
    rectangle_id = models.ForeignKey(RectangleAnnotation, on_delete=models.CASCADE)
    x = models.FloatField()
    y = models.FloatField()
    width = models.FloatField()
    height = models.FloatField()


class PointAnnotation(Annotation):
    doc_name = models.CharField(max_length=200)
    sub_type = models.CharField(max_length=200)
    x = models.IntegerField()
    y = models.IntegerField()
    my_notification = models.IntegerField()


class CommentAnnotation(Annotation):
    body = models.CharField(max_length=500)
    point_id = models.ForeignKey(PointAnnotation, on_delete=models.CASCADE)


class DrawingAnnotation(Annotation):
    title = models.CharField(max_length=50)


class Line(models.Model):
    drawing_id = models.ForeignKey(DrawingAnnotation, on_delete=models.CASCADE)
    x = models.IntegerField()
    y = models.IntegerField()