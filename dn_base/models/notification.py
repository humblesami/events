from odoo import models, fields, api
from odoo.addons.dn_base import ws_methods


class NotificationType(models.Model):
    _name = 'dn_base.notification_type'
    content = fields.Char()
    res_model = fields.Char()
    client_route = fields.Char()
    parent_type = fields.Many2one('dn_base.notification_type', ondelete='cascade')

    _sql_constraints = [
        (
        'notification_type_uniq', 'unique (res_model, parent_type)', "Notification type already exists for same model!"),
    ]

class Notification(models.Model):
    _name = 'dn_base.notification'

    notification_type_id = fields.Many2one('dn_base.notification_type', ondelete='cascade')
    user_id = fields.Many2one('res.users')
    res_id = fields.Integer()
    counter = fields.Integer(default=0)
    parent_id = fields.Many2one('dn_base.notification', ondelete='cascade')

    _sql_constraints = [
        (
        'notification_uniq', 'unique (notification_type_id,res_id,user_id)', "Notification already exists for same record of same model!"),
    ]

    def getMyNotifications(self):
        sql = ' select sum(counter) counter, res_model, res_id, client_route, content'
        sql += ' from dn_base_notification_type t'
        sql += ' join dn_base_notification n on n.notification_type_id = t.id'
        sql += ' where'
        sql += ' user_id = ' + str(self.env.user.id) + ' AND t.parent_type is null'
        sql += ' group by notification_type_id, res_id client_route, content'
        sql += ' having sum(counter) >0'
        res = ws_methods.execute_read(sql)
        return res

    def add_notification(self, res_model, res_id, parent_id=None):
        req_env = self.env
        targets = []
        notification_type = req_env['dn_base.notification_type'].search([('res_model', '=', res_model),('parent_type', '=', res_model)])
        notification_type = notification_type[0]
        if notification_type.parent_type:
            parent_model = notification_type.parent_type.res_model
            targets = req_env[parent_model].search([('id', '=', parent_id)]).get_audience()
            type_id = notification_type.parent_type.id
            for uid in targets:
                filters = [('notification_type_id', '=', type_id),('res_id','=',parent_id), ('user_id','=', uid)]
                obj = req_env['dn_base.notification'].search(filters)
                if obj:
                    obj.counter += 1
                else:
                    notify_data = {
                        'notification_type_id': notification_type.parent_type.id,
                        'res_id': parent_id,
                        'user_id': uid,
                        'counter': 1
                    }
                    obj = req_env['dn_base.notification'].create(notify_data, targets)
                    filters = [('notification_type_id', '=', type_id), ('res_id', '=', res_id),
                               ('user_id', '=', uid)]
                    obj = req_env['dn_base.notification'].search(filters)
                    if obj:
                        obj.counter += 1
                    else:
                        notify_data = {
                            'notification_type_id': notification_type.parent_type.id,
                            'res_id': res_id,
                            'user_id': uid,
                            'counter': 1
                        }
                        obj = req_env['dn_base.notification'].create(notify_data, targets)
        else:
            targets = req_env[res_model].search([('id', '=', res_id)]).get_audience()

        type_id = notification_type.id
        for uid in targets:
            filters = [('notification_type_id', '=', type_id), ('res_id', '=', parent_id), ('user_id', '=', uid)]
            obj = req_env['dn_base.notification'].search(filters)
            if obj:
                obj.counter += 1
            else:
                notify_data = {
                    'notification_type_id': notification_type.parent_type.id,
                    'res_id': res_id,
                    'user_id': uid,
                    'counter': 1
                }
                obj = req_env['dn_base.notification'].create(notify_data, targets)
        return 'done'