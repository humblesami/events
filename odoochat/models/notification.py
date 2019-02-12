from odoo import models, fields
from odoo.addons.dn_base import ws_methods


class NotificationType(models.Model):
    _name = 'notification.type'
    name = fields.Char()
    content = fields.Char(default='notifications on')
    client_route = fields.Char(default='/')
    _sql_constraints = [
        (
        'notification_type_uniq', 'unique (name)', "Notification type already exists for same model!"),
    ]

class Notification(models.Model):
    _name = 'notification'
    notification_type_id = fields.Many2one('notification_type', ondelete='cascade')
    res_id = fields.Integer()
    parent_id = fields.Many2one('notification', ondelete='cascade')
    is_parent = fields.Integer()
    _sql_constraints = [
        (
        'notification_uniq', 'unique (notification_type_id,res_id)', "Notification already exists for same record of same model!"),
    ]

    def getMyNotifications(self, params):
        uid = self.env.user.id
        name = params.get('res_model')
        res_id = params.get('res_id')
        sql = 'select name res_model,content,res_id,n.id,is_parent,counter from notification_type t'
        sql += ' join notification n on n.notification_type_id=t.id'
        sql += ' join notification_counter c on c.notification_id=n.id'
        sql += ' where counter>0 and n.parent_id is null and user_id='+str(uid)
        if name:
            sql += " and name='"+name+"'"
        if res_id:
            sql += " and res_id="+str(res_id)
        res = ws_methods.execute_read(sql)
        return res

    def add_notification(self, params):
        req_env = self.env

        res_model = params.get('res_model')
        res_id = params.get('res_id')

        parent_res_id = params.get('parent_res_id')
        parent_res_model = params.get('parent_res_model')

        notification_type = req_env['notification.type'].search([('name', '=', res_model)])
        audience = params['audience']
        if not notification_type:
            notification_type = req_env['notification.type'].create({"name":res_model})
        else:
            notification_type = notification_type[0]

        notification_type_id = notification_type.id

        if parent_res_id:
            parent_notification_type_id = req_env['notification.type'].search([('name', '=', parent_res_model)])
            if parent_notification_type_id:
                parent_notification_type = req_env['notification.type'].create({"name": res_model})
                notification_type_id = parent_notification_type.id
            parent_notification_id = self.add_notification_item(parent_res_id, audience, parent_notification_type_id)
            parent_notification_id.is_parent = 1
            self.add_notification_item(res_id, audience, notification_type_id, parent_notification_id)
        else:
            self.add_notification_item(res_id, audience, notification_type_id)

    def add_notification_item(self, res_id, audience, notification_type_id, parent_id=None):
        req_env = self.env
        filters = [('res_id', '=', res_id), ('notification_type_id', '=', notification_type_id)]
        notification = req_env['notification'].search(filters)
        if not notification:
            values = {
                'res_id': res_id,
                'notification_type_id': notification_type_id
            }
            if parent_id:
                values['parent_id'] = parent_id
            notification = req_env['notification'].create(values)
        else:
            notification = notification[0]
        a = 1
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
        return notification.id

    def update_counter(self, params):
        req_env = self.env
        uid = req_env.user.id
        res_id = params.get('res_id')
        res_model = params.get('res_model')
        notification_type = req_env['notification.type'].search([('name', '=', res_model)])
        notification_type_id = notification_type[0].id
        filters = [('res_id', '=', res_id), ('notification_type_id', '=', notification_type_id)]
        notification = req_env['notification'].search(filters)[0]
        filters = [('user_id', '=', uid), ('notification_id', '=', notification.id)]
        notification_counter = req_env['notification.counter'].search(filters)
        counter = notification_counter.counter
        notification_counter.counter = 0

        if notification.parent_id:
            notification = notification.parent_id
            filters = [('user_id', '=', uid), ('notification_id', '=', notification.id)]
            notification_counter = req_env['notification.counter'].search(filters)
            notification_counter.counter -= counter

class NotificationCounter(models.Model):
    _name = 'notification.counter'
    notification_id = fields.Many2one('notification', ondelete='cascade')
    user_id = fields.Many2one('res.users')
    counter = fields.Integer(default = 0)

    _sql_constraints = [
        (
            'notification_uniq', 'unique (notification_id,user_id)',
            "Notification already exists for same record of same user!"
        )
    ]