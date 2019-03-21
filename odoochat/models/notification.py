from odoo import models, fields
from odoo.addons.dn_base import ws_methods
from odoo.exceptions import ValidationError


class NotificationType(models.Model):
    _name = 'notification.type'
    name = fields.Char(required=True)
    action_id = fields.Many2one('ir.actions.act_window')
    _sql_constraints = [
        (
            'notification_type_unique', 'unique (name)',
            "Notification type already exists for same model!"),
    ]

class Notification(models.Model):
    _name = 'notification'
    res_id = fields.Integer()
    res_model = fields.Char()
    parent_id = fields.Many2one('notification', ondelete='cascade')
    parent_res_id = fields.Integer()
    notification_type_id = fields.Many2one('notification.type')
    content = fields.Char()
    _sql_constraints = [
        (
        'notification_uniq', 'unique (res_model,res_id)', "Notification already exists for same record of same model!"),
    ]

    def getMyNotifications(self, params):
        uid = self.env.user.id
        name = params.get('res_model')
        res_id = params.get('res_id')
        sql = 'select distinct '
        sql += ' res_model,n.content,res_id,n.id,counter '
        sql += ' ,nt.action_id'
        sql += ' from'
        sql += ' notification n '
        sql += ' join notification_type nt on nt.name=n.res_model'
        sql += ' join notification_counter c on c.notification_id=n.id'
        sql += ' where counter>0 and n.parent_id is null and user_id='+str(uid)
        if name:
            sql += " and res_model='"+name+"'"
        if res_id:
            sql += " and res_id="+str(res_id)
        res = ws_methods.execute_read(sql)
        return res

    def getNotificationCount(self, params):
        uid = self.env.user.id
        name = params.get('res_model')
        res_id = params.get('res_id')
        sql = 'select counter from '
        sql += ' notification n '
        sql += ' join notification_counter c on c.notification_id=n.id'
        sql += ' where counter>0 and user_id='+str(uid)
        if name:
            sql += " and res_model='"+name+"'"
        if res_id:
            sql += " and res_id="+str(res_id)
        res = ws_methods.execute_read(sql)
        if len(res) > 0:
            res = res[0]['counter']
        else:
            res = 0
        return res

    def getMyNotificationsOnRecord(self, params):
        uid = self.env.user.id
        name = params.get('res_model')
        res_id = params.get('res_id')
        sql = 'select res_model,n.content,res_id,n.id,counter from '
        sql += ' notification n'
        sql += ' join notification_counter c on c.notification_id=n.id'
        sql += ' where counter>0 and user_id='+str(uid)
        if name:
            sql += " and res_model='"+name+"'"
        if res_id:
            sql += " and res_id="+str(res_id)
        res = ws_methods.execute_read(sql)
        return res

    def add_notification(self, obj_res, notification_values, notification_message, audience):

        res_model = notification_values['res_model']
        res_id = int(notification_values['res_id'])

        parent_res_id = False
        parent_res_model = notification_values.get('parent_res_model')
        if parent_res_model:
            parent_res_id = int(notification_values['parent_res_id'])


        notification = False
        notification_values = {
            'res_model': res_model,
            'res_id': res_id,
            'parent_res_model': parent_res_model,
            'parent_res_id': parent_res_id,
            'content': notification_message,
        }
        if parent_res_id:
            parent_notification = self.add_notification_item(notification_message, parent_res_model, parent_res_id, audience)
            notification = self.add_notification_item(notification_message, res_model, res_id, audience, parent_notification)
        else:
            notification = self.add_notification_item(notification_message, res_model, res_id, audience)

        if parent_res_id:
            notification_values['is_parent'] = 1
        events = [
            {'name': 'notification_received', 'data': notification_values, 'audience': audience},
            {'name': obj_res['name'], 'data': obj_res['data'], 'audience': audience}
        ]
        res = ws_methods.emit_event(events)
        return res

    def add_notification_item(self, notification_message, res_model, res_id, audience, parent_notification=None):
        req_env = self.env
        filters = [('res_id', '=', res_id), ('res_model', '=', res_model)]
        notification = req_env['notification'].search(filters)
        if not notification:
            values = {
                'res_id': res_id,
                'res_model': res_model
            }
            if parent_notification:
                values['parent_id'] = parent_notification.id
                values['parent_res_id'] = parent_notification.res_id
                values['parent_res_model'] = parent_notification.res_model

            values['content'] = notification_message
            notification_type = req_env['notification.type'].search([('name', '=', res_model)])
            if not notification_type:
                notification_type = req_env['notification.type'].create({'name' : res_model})
            values['notification_type_id'] = notification_type.id

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
        return notification

    def update_counter(self, params):
        req_env = self.env
        uid = req_env.user.id
        res_id = params.get('res_id')
        res_model = params.get('res_model')
        filters = [('res_id', '=', res_id), ('res_model', '=', res_model)]
        notification = req_env['notification'].search(filters)[0]
        filters = [('user_id', '=', uid), ('notification_id', '=', notification.id)]
        notification_counter = req_env['notification.counter'].search(filters)
        if len(notification_counter) != 1:
            raise ValidationError('Invalid notification '+str(notification.id)+' for uid '+str(uid))
        counter = notification_counter.counter
        notification_counter.counter = 0

        if notification.parent_id:
            notification = notification.parent_id
            filters = [('user_id', '=', uid), ('notification_id', '=', notification.id)]
            notification_counter = req_env['notification.counter'].search(filters)
            notification_counter.counter -= counter
        return 'done'

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
