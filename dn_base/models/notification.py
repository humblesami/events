from odoo import models, fields, api


class Notification(models.Model):
    _name = 'dn_base.notification'

    content = fields.Char()
    res_model = fields.Char()
    res_id = fields.Integer()
    client_route = fields.Char()
    parent_model = fields.Char()
    parent_id = fields.Char()
    _sql_constraints = [
        ('notification_uniq', 'unique (res_id,res_model)', "Notification already exists for same record of same model!"),
    ]

class NotificationStatus(models.Model):
    _name = "dn_base.notification.status"
    counter = fields.Integer(default=0)
    notification_id = fields.Many2one('dn_base.notification',ondelete='cascade')
    user_id = fields.Many2one('res.users')
    _sql_constraints = [
        (
        'notification_status_uniq', 'unique (notification_id,user_id)', "Notification already exists for same user!"),
    ]

    def get_my_notifications(self):
        cnt = 0
        filters = [('parent_id', '!=', False)]
        notifications = self.env['dn_base.notification'].sudo().search(filters)
        list = []
        for obj in notifications:
            job = {'parent_model': obj.parent_model,
             'parent_id': obj.parent_id}
            if job not in list:
                list.append(job)

        my_id = self.env.user.id
        parent_counts = []
        for job in list:
            filters = [('notification_id', '=', job.id)]
            statuses = self.env['dn_base.notification.status'].sudo().search(filters)
            for child in statuses:
                if child.user_id == my_id:
                    cnt += child.counter
            if cnt > 0:
                parent_counts[job.prenet_model +'-'+ str(job.prenet_id)] = cnt


        return parent_counts