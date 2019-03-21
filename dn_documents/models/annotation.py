from odoo import models, fields, api
from odoo.addons.dn_base import ws_methods
from odoo.addons.dn_base.statics import raise_dn_model_error

doc_type_models = {
    'meeting':'calendar.event'
}
class Document(models.Model):
    _name = 'annotation.document'
    name = fields.Char()
    version = fields.Integer(required=True, default=0)
    user_id = fields.Many2one('res.users',ondelete='cascade', required=True)
    _sql_constraints = [
        ('unique document against user', 'unique(user_id,name)',
         'Can not have duplicate document for same user'),
    ]


class Annotation(models.Model):
    _name = 'annotation.annotation'
    name = fields.Char()
    uid = fields.Integer()
    document_id = fields.Many2one('annotation.document', ondelete='cascade')
    color = fields.Char()
    date_time = fields.Datetime()
    page = fields.Integer()
    type = fields.Char()
    uuid = fields.Char()
    _sql_constraints = [
        ('unique annotation id', 'unique(uuid)',
         'Can not have duplicate id for annotation'),
    ]

class RectangleAnnotation(models.Model):
    _inherit = 'annotation.annotation'
    _name = 'annotation.rectangle'
    rectangles = fields.One2many('annotation.rectangle.dimensions', 'rectangle_id')


class Dimensions(models.Model):
    _name = 'annotation.rectangle.dimensions'
    rectangle_id = fields.Many2one('annotation.rectangle',ondelete='cascade')
    x = fields.Float()
    y = fields.Float()
    width = fields.Float()
    height = fields.Float()

class PointAnnotation(models.Model):
    _inherit = 'annotation.annotation'
    _name = 'annotation.point'
    doc_name = fields.Char()
    sub_type = fields.Char()
    x = fields.Integer()
    y = fields.Integer()
    comments = fields.One2many('annotation.point.comments', 'point_id')
    my_notifications = fields.Integer(compute='compute_my_notifications')

    def save_comment_point(self, values):
        req_env = self.env
        point = values.get('point')
        comment = point.get('comment')
        if not point or not comment:
            raise raise_dn_model_error('Please provide comment and point')
        doc_name = values.get('doc_id')
        #arr = doc_name.split('.')[0]

        point_id = req_env['annotation.point'].search([('uuid', '=', point['uuid'])])
        new_point = False
        if not point_id:
            if not doc_name:
                raise raise_dn_model_error('Invalid Document Id')
            point['doc_name'] = doc_name
            point_id = req_env['annotation.point'].create(point)
            new_point = True

        comment['point_id'] = point_id.id
        req_env['annotation.point.comments'].create(comment)

        point['counter'] = point_id.my_notifications + 1

        doc_type = values['doc_type']
        document_id = values['parent_res_id']

        document_id = int(document_id)
        docname = ''
        meeting = False
        topic_name = False
        if doc_type == 'topic':
            res_model = 'meeting_point.topicdoc'
            topic_doc = req_env['meeting_point.topicdoc'].search([('id', '=', document_id)])
            meeting = topic_doc.topic_id.meeting_id
            topic_name = topic_doc.topic_id.name
            docname = topic_doc.name
        elif doc_type == 'meeting':
            res_model = 'meeting_point.doc'
            meeting_doc = req_env['meeting_point.doc'].search([('id', '=', document_id)])
            meeting = meeting_doc.meeting_id
            docname = meeting_doc.name
        if not meeting:
            raise raise_dn_model_error('Invalid doc type=' + str(doc_type) + ' or id =' + (document_id))

        res = {
            'meta': {'meeting': meeting.name, 'doc': docname },
            'model': res_model,
            'point_id': point_id.id,
            'res_id': document_id,
            'x': point['x'],
            'y': point['y']
        }
        res['point'] = point
        notification_message = ' comment(s) received on document ' + doc_name
        if new_point:
            res['new_point'] = 1
        if topic_name:
            res['meta']['topic'] = topic_name
            notification_message += ' on agenda topic ' + topic_name
        notification_message += ' on meeting ' + meeting.name

        data_object = {
            'name':'point_comment_received',
            'data':res,
        }
        notification_values = {
            'res_model':'annotation.point',
            'res_id': comment['point_id'],
            'parent_res_id': document_id,
            'parent_res_model': res_model,
        }
        audience = meeting.get_audience()
        res = req_env['notification'].add_notification(data_object, notification_values, notification_message, audience)
        return res

    @api.multi
    def compute_my_notifications(self):
        req_env = self.env
        for obj in self:
            params = {'res_model':self._name, 'res_id':obj.id}
            res = req_env['notification'].getNotificationCount(params)
            obj.my_notifications = res

class CommentAnnotation(models.Model):
    _name = 'annotation.point.comments'
    content = fields.Char()
    point_id = fields.Many2one('annotation.point',ondelete='cascade')
    uid = fields.Integer()
    uuid = fields.Char()
    date_time = fields.Datetime()
    user_name = fields.Char()
    _sql_constraints = [
        ('unique comment id', 'unique(uuid)',
         'Can not have duplicate id for comment'),
    ]

class DrawingAnnotation(models.Model):
    _inherit = 'annotation.annotation'
    _name = 'annotation.drawing'
    lines = fields.One2many('annotation.drawing.lines', 'drawing_id')

class Line(models.Model):
    _name = 'annotation.drawing.lines'
    drawing_id = fields.Many2one('annotation.drawing',ondelete='cascade')
    x = fields.Integer()
    y = fields.Integer()