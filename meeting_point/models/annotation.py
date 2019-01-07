from odoo import models, fields, api

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

    @api.multi
    def compute_my_notifications(self):
        note_model = self.env
        for obj in self:
            not_id = note_model['dn_base.notification'].search([('res_model','=','annotation.point'),('res_id','=',obj.id)]).id
            counter = note_model['dn_base.notification.status'].search([('notification_id','=',not_id),('user_id','=',self.env.user.id)]).counter
            obj.my_notifications = counter

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