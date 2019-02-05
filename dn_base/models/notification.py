from odoo import models, fields
from odoo.exceptions import ValidationError


class NotificationType(models.Model):
    _name = 'dn_base.notification_type'
    content = fields.Char()
    res_model = fields.Char()
    client_route = fields.Char()
    parent_type = fields.Many2one('dn_base.notification_type', ondelete='cascade')
    _sql_constraints = [
        (
        'notification_type_uniq', 'unique (res_model)', "Notification type already exists for same model!"),
    ]

class Notification(models.Model):
    _name = 'dn_base.notification'
    notification_type_id = fields.Many2one('dn_base.notification_type', ondelete='cascade')
    res_id = fields.Integer()
    parent_id = fields.Many2one('dn_base.notification', ondelete='cascade')

    _sql_constraints = [
        (
        'notification_uniq', 'unique (notification_type_id,res_id)', "Notification already exists for same record of same model!"),
    ]

    def getMyNotifications(self):
        uid = self.env.user
        counters = self.env['dn_base.notification.counter'].search([('user_id','=',uid,'counter','>',0)])
        res = []
        for obj in counters:
            notification = obj.notification_id
            if not notification.notification_type_id.parent_type:
                item = {'counter':obj.counter,'res_id':notification.res_id, 'res_model':notification.notification_type_id.res_model}
                res.append(item)
        return res

    def add_notification(self, res_model, res_id, parent_id=None):
        req_env = self.env
        targets = []
        notification_type = req_env['dn_base.notification_type'].search([('res_model', '=', res_model)])
        notification_type = notification_type[0]
        if parent_id:
            if not notification_type.parent_type:
                raise ValidationError('Invalid parent type for '+res_model)
            notification = req_env['dn_base.notification'].search([('res_model', '=', res_model),('res_id', '=', res_id)])
            if notification:
                notification = notification[0]
                parent_item = notification.parent_id
                if not parent_item:
                    raise ValidationError('Item could not be created without parent')
                audience = parent_item.get_audience()
            else:
                values = {
                    'res_id': 1,
                    'notification_type_id': notification_type.id
                }
                notification = req_env['dn_base.notification'].create(values)
        else:
            item = req_env[notification_type.res_model].search([('id','=',res_id)])
            audience = item.get_audience()
            filters = [('res_id','=',res_id), ('notification_type_id','=',notification_type.id)]
            notification = req_env['dn_base.notification'].search(filters)
            if not notification:
                values = {
                    'res_id': res_id,
                    'notification_type_id': notification_type.id
                }
                notification = req_env['dn_base.notification'].create(values)
            else:
                notification = notification[0]
            self.add_counter_item(notification, audience)

    def add_notification_item(self, res_id, notification_type, audience):
        req_env = self.env
        filters = [('res_id', '=', res_id), ('notification_type_id', '=', notification_type.id)]
        notification = req_env['dn_base.notification'].search(filters)
        if not notification:
            values = {
                'res_id': res_id,
                'notification_type_id': notification_type.id
            }
            notification = req_env['dn_base.notification'].create(values)
        else:
            notification = notification[0]
        self.add_counter_item(notification, audience)


    def add_counter_item(self, notification, audience):
        req_env = self.env
        for uid in audience:
            notification_counter = req_env['dn_base.notification.counter'].search(
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
                req_env['dn_base.notification.counter'].create(values)

class NotificationCounter(models.Model):
    _name = 'dn_base.notification.counter'
    notification_id = fields.Many2one('dn_base.notification', ondelete='cascade')
    user_id = fields.Many2one('res.users')
    counter = fields.Integer(default=0)

    _sql_constraints = [
        (
            'notification_uniq', 'unique (notification_id,user_id)',
            "Notification already exists for same record of same user!"),
    ]