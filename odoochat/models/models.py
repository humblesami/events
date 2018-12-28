# -*- coding: utf-8 -*-

from odoo import models, fields

class odoochat(models.Model):
    _name = 'odoochat.messages'

    sender = fields.Integer()
    to = fields.Integer()
    content = fields.Char()
    read_status = fields.Boolean(default=False)
