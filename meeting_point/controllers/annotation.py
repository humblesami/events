import json
from odoo import http
from odoo.addons.dn_base import ws_methods

class annotation(http.Controller):

    @http.route('/get-annotations', type="http", csrf=False, auth='public', cors='*')
    def getAnnotations(self, **kw):
        try:
            res = {}
            values = kw
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env

            if 'doc_id' in values:
                a = 1
            else:
                return ws_methods.http_response('Please Provide document id!')

            doc_id = values.get('doc_id')
            force = values.get('force')
            doc = req_env['annotation.document'].search([('name', '=', doc_id),('user_id','=',uid)])
            if not doc:
                doc = req_env['annotation.document'].create({'name': doc_id, 'user_id':uid, 'version':0})
                res = {'version': 0, 'annotations': []}
                return ws_methods.http_response('' ,res)

            document_version = values.get('version') or 0
            document_version = int(document_version)
            if doc.version < document_version and not force:
                return ws_methods.http_response('', {'version': doc.version})

            document_id = doc.id
            filter = [('document_id', '=', document_id), ('type', 'in', ['underline', 'highlight', 'strikeout'])]

            rectangle_objects = req_env['annotation.rectangle'].search(filter)
            props = ['uid', 'document_id.name', 'page', 'type', 'uuid', 'date_time', 'color']
            rectanglular_annotations = ws_methods.objects_list_to_json_list(rectangle_objects, props)
            props = ['x', 'y', 'width', 'height']
            i = 0
            for rect in rectangle_objects:
                dimentions = ws_methods.objects_list_to_json_list(rect.rectangles, props)
                rectanglular_annotations[i]['rectangles'] = dimentions
                rectanglular_annotations[i]['doc_id'] = doc_id
                i = i + 1

            filter = [('document_id', '=', document_id), ('type', '=', 'drawing')]
            drawing_objects = req_env['annotation.drawing'].search(filter)
            props = ['uid', 'document_id.name', 'page', 'type', 'uuid', 'date_time', 'color']
            drawings = ws_methods.objects_list_to_json_list(drawing_objects, props)
            props = ['x', 'y']
            i = 0
            for rect in drawing_objects:
                dimentions = ws_methods.objects_list_to_json_list(rect.lines, props)
                ar_res = []
                for xy in dimentions:
                    ar_res.append([xy['x'], xy['y']])
                drawings[i]['lines'] = ar_res
                drawings[i]['doc_id'] = doc_id
                drawings[i]['width'] = 1
                i = i + 1

            filter = [('type', '=', 'point')]
            point_objects = req_env['annotation.point'].search(filter).filtered(lambda r: r.document_id.name == doc_id)
            props = ['uid', 'document_id.name', 'page', 'type', 'uuid', 'date_time', 'x', 'y', 'sub_type']
            points = ws_methods.objects_list_to_json_list(point_objects, props)

            props = ['uid', 'user_name', 'date_time', 'uuid', 'content']
            i = 0
            for point in point_objects:
                comments = point.comments
                comments = ws_methods.objects_list_to_json_list(comments, props)
                for com in comments:
                    com['point_id'] = points[i]['uuid']
                points[i]['comments'] = comments
                i = i + 1

            annotations = rectanglular_annotations + points + drawings
            res = {'version': doc.version, 'annotations': annotations}
            return ws_methods.http_response('', res)
        except:
            return ws_methods.handle()

    @http.route('/save-annotations', type="http", csrf=False, auth='public', cors='*')
    def addAnnotation(self, **kw):
        try:
            uid = ws_methods.check_auth(kw)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env

            doc_id = kw.get('doc_id')
            doc = req_env['annotation.document'].search([('name', '=', doc_id),('user_id','=',uid)])
            if doc:
                reset = kw.get('reset')
                if not reset:
                    document_version = kw.get('version') or 0
                    document_version = int(document_version)
                    if document_version == 0:
                        document_version = 1
                    if doc.version >= document_version:
                        return ws_methods.http_response('', doc.version)
                res = req_env['annotation.rectangle'].search([('document_id', '=', doc.id)]).unlink()
                res = req_env['annotation.drawing'].search([('document_id', '=', doc.id)]).unlink()
                points = req_env['annotation.point'].search([]).filtered(lambda r: r.document_id.name == doc_id) #('document_id','=',doc.id)])
                for p in points:
                    res = p.comments.filtered(lambda r: r.uid == uid).unlink()
                    if p.create_uid.id == uid and len(p.comments) == 0:
                        res = p.unlink()
                if reset:
                    doc.version = 0
                    return ws_methods.http_response('', 'done')
            else:
                doc = req_env['annotation.document'].create({'name': doc_id, 'user_id':uid, 'version':0})

            values = kw.get('annotations')
            values = json.loads(values)

            if not values:
                return ws_methods.http_response('', 'No annotations to save')
            for val in values:
                atype = val.get('type')
                modal = types[atype]

                dimensions = val.get('rectangles')
                comments = val.get('comments')
                lines = val.get('lines')

                if val['uid'] != uid and not comments:
                    continue

                val['document_id'] = doc.id
                if dimensions:
                    del val['rectangles']
                    rid = req_env[modal].create(val)
                    modal = types['rectangle']
                    for vals in dimensions:
                        vals['rectangle_id'] = rid.id
                        req_env[modal].create(vals)
                elif lines:
                    del val['lines']
                    pen_id = req_env[modal].create(val)
                    modal = types['line']
                    for line in lines:
                        vals = {}
                        vals['drawing_id'] = pen_id.id
                        vals['x'] = line[0]
                        vals['y'] = line[1]
                        req_env[modal].create(vals)
                elif comments:
                    del val['comments']
                    point_id = req_env[modal].search([('uuid','=',val['uuid'])])
                    if not point_id:
                        point_id = req_env[modal].create(val)
                    modal = types['comment']
                    for vals in comments:
                        if vals['uid'] == uid:
                            vals['point_id'] = point_id.id
                            req_env[modal].create(vals)
                else:
                    req_env[modal].create(val)
            doc.version = kw['version']
            return ws_methods.http_response('', 'done')
        except:
            return ws_methods.handle()

    @http.route('/del-all', type="http", csrf=False, auth='public', cors='*')
    def delallannotations(self, **kw):
        try:
            uid = ws_methods.check_auth(kw)
            if not uid:
                return ws_methods.not_logged_in()
            if uid !=1:
                return ws_methods.http_response("Ni ni, u are not")
            req_env = http.request.env
            req_env['annotation.document'].sudo().search([]).unlink()
            req_env['annotation.rectangle'].sudo().search([]).unlink()
            req_env['annotation.rectangle.dimensions'].sudo().search([]).unlink()

            req_env['annotation.point'].sudo().search([]).unlink()
            req_env['annotation.point.comments'].sudo().search([]).unlink()

            req_env['annotation.drawing'].sudo().search([]).unlink()
            req_env['annotation.drawing.lines'].sudo().search([]).unlink()
            return ws_methods.http_response('', 'Successfully saved')
        except:
            return ws_methods.handle()


types = {
    'underline': 'annotation.rectangle',
    'strikeout': 'annotation.rectangle',
    'highlight': 'annotation.rectangle',
    'point': 'annotation.point',
    'drawing':'annotation.drawing',
    'rectangle': 'annotation.rectangle.dimensions',
    'line':'annotation.drawing.lines',
    'comment':'annotation.point.comments'
}