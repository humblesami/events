from odoo import models, fields

class Notification(models.Model):
    _name = 'dn_base.notification'

    content = fields.Char()
    res_model = fields.Char()
    res_id = fields.Integer()
    client_route = fields.Char()

class NotificationStatus(models.Model):
    _name = "dn_base.notification.status"

    read_status = fields.Boolean(default=False)
    notification_id = fields.Many2one('meetvue.notification')
    user_id = fields.Many2one('res.users')