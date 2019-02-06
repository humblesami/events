from odoo import models, fields
from odoo.addons.dn_base import ws_methods


class NotificationType(models.Model):
    _name = 'notification.type'
    name = fields.Char()
    content = fields.Char()
    client_route = fields.Char()
    parent_type = fields.Many2one('notification_type', ondelete='cascade')
    _sql_constraints = [
        (
        'notification_type_uniq', 'unique (name)', "Notification type already exists for same model!"),
    ]

class Notification(models.Model):
    _name = 'notification'
    notification_type_id = fields.Many2one('notification_type', ondelete='cascade')
    res_id = fields.Integer()
    parent_id = fields.Many2one('notification', ondelete='cascade')

    _sql_constraints = [
        (
        'notification_uniq', 'unique (notification_type_id,res_id)', "Notification already exists for same record of same model!"),
    ]

    def getMyNotifications(self, params):
        uid = self.env.user.id
        name = params.get('res_model')
        res_id = params.get('res_id')
        sql = 'select name, content, res_id, counter from notification_type t'
        sql += ' join notification n on n.notification_type_id=t.id'
        sql += ' join notification_counter c on c.notification_id=n.id'
        sql += ' where counter>0 and user_id='+str(uid)
        if name:
            sql += " and name='"+name+"'"
        if res_id:
            sql += " and res_id="+str(res_id)
        res = ws_methods.execute_read(sql)
        return res

    def add_notification(self, params):
        req_env = self.env
        name = params.get('res_model')
        res_id = params.get('res_id')
        parent_id = params.get('parent_id')
        notification_type = req_env['notification_type'].search([('name', '=', name)])
        notification_type_id = notification_type[0].id
        current_object = req_env[notification_type.model].search([('id', '=', res_id)])

        if parent_id:
            parent_object = req_env[notification_type.parent_type.model].search([('id', '=', res_id)])
            parent_notification_type_id = notification_type[0].parent_type.id
            self.add_notification_item(parent_id, parent_object, parent_notification_type_id)
            self.add_notification_item(res_id, current_object, notification_type_id)
        else:
            self.add_counter_item(res_id, current_object, notification_type_id)

    def add_notification_item(self, res_id, item, notification_type_id):
        req_env = self.env
        audience = item.get_audience()
        filters = [('res_id', '=', res_id), ('notification_type_id', '=', notification_type_id)]
        notification = req_env['notification'].search(filters)
        if not notification:
            values = {
                'res_id': res_id,
                'notification_type_id': notification_type_id
            }
            notification = req_env['notification'].create(values)
        else:
            notification = notification[0]

        for uid in audience:
            notification_counter = req_env['notification.counter'].search(
                [('user_id', '=', uid), ('notification_id', '=', notification.id)])
            if notification_counter:
                notification_counter = notification_counter[0]
                notification_counter.counter += 1
            else:
                values = {
                    'counter': 1,
                    'user_id': uid,
                    'notification_id': notification.id
                }
                req_env['notification.counter'].create(values)

class NotificationCounter(models.Model):
    _name = 'notification.counter'
    notification_id = fields.Many2one('notification', ondelete='cascade')
    user_id = fields.Many2one('res.users')
    counter = fields.Integer(default=0)

    _sql_constraints = [
        (
            'notification_uniq', 'unique (notification_id,user_id)',
            "Notification already exists for same record of same user!"),
    ]