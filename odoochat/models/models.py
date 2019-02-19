# -*- coding: utf-8 -*-
from odoo import models, fields, api

class odoochat(models.Model):
    _name = 'odoochat.message'

    sender = fields.Integer()
    to = fields.Integer()
    content = fields.Char()
    read_status = fields.Boolean(default=False)

    def save(self, vals):
        super(odoochat, self).create(vals)
        res = [{'name': 'chat_message_received', 'data':vals, 'audience': [ vals['to']] }]
        return res