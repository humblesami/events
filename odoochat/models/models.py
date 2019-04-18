# -*- coding: utf-8 -*-
from odoo import models, fields, api
from odoo.exceptions import ValidationError


class odoochat_attachment(models.Model):
    _name = 'odoochat.attachment'
    _inherit = 'dn_documents.allfiles'
    message_id = fields.Many2one('odoochat.message', required=True)

class odoochat(models.Model):
    _name = 'odoochat.message'
    _order = "id desc"

    sender = fields.Integer()
    to = fields.Integer()
    content = fields.Char()
    read_status = fields.Boolean(default=False)
    attachments = fields.One2many('odoochat.attachment', 'message_id')

    def save(self, vals):
        attachments = vals.get('attachments')
        if attachments and len(attachments) > 0:
            del vals['attachments']
            if not vals['content']:
                vals['content'] = ''
        if not vals['content']:
            raise ValidationError('Invalid message, no content')
        message = super(odoochat, self).create(vals)
        vals['id'] = message.id
        for at in attachments:
            at['message_id'] = vals['id']
            self.env['odoochat.attachment'].create(at)

        res = [{'name': 'chat_message_received', 'data':vals, 'audience': [ vals['to']] }]
        return res