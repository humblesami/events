# -*- coding: utf-8 -*-
from odoo import models, api, fields
from odoo.exceptions import UserError, ValidationError
from odoo.addons.dn_base.statics import scan_virus,raise_dn_model_error


class Empty(models.Model):
    _name = "dn_base.empty"
    name = fields.Char()

class MyMail(models.Model):
    _inherit = 'mail.message'
    def post_comment(self, values):
        req_env = self.env
        if 'message_type' in values:
            datMessage = values['message_type']
        else:
            datMessage = 'comment'
        comment_model = req_env['mail.message']
        #with_context(message_create_from_mail_mail=True).
        comment_vals = {
            'body': values['body'],
            'model': values['res_model'],
            'res_id': values['res_id'],
            'subtype_id': values['subtype_id'],
            'message_type': datMessage,
            'email_from': 'admin@example.com'
        }
        parent_id = values.get('parent_id')
        if not parent_id:
            comment_vals['subtype_id'] = values['subtype_id']
        else:
            parent_id = int(parent_id)
            comment_vals['parent_id'] = parent_id
        res = comment_model.create(comment_vals)
        values['create_date'] = res.create_date
        values['user'] = {'name': req_env.user.name, 'id': req_env.user.id}
        res = {
            'name': 'comment_received',
            'data': values,
        }
        return res

class Empty(models.Model):
    _name = "dn_base.empty"
    name = fields.Char()

class MenuIcon(models.Model):
    _name = "dn_base.menu_icon"
    name = fields.Char()
    menu_id = fields.Many2one('ir.ui.menu')

class ir_model_seen_registery(models.Model):
    _name = 'dn.seen'

    res_model = fields.Char(string="Model Name")
    res_id = fields.Integer(string="Record Id")
    #seen_by_me = fields.Integer(compute='_compute_seen_by_me', default=0)

    @api.multi
    def _compute_seen_by_me(self):
        try:
            uid = self.env.uid
            res_model = self._name
            seen_model = self.env['dn.seen']
            for obj in self:
                if obj.create_uid.id == uid:
                    obj.seen_by_me = 1
                    continue
                res_id = obj.id
                filters = [('create_uid', '=', uid), ('res_model', '=', res_model), ('res_id', '=', res_id)]
                res = seen_model.search(filters)
                if res:
                    obj.seen_by_me = 1
        except:
            a = 1

class IrAttachment(models.Model):
    _inherit = "ir.attachment"

    @api.model
    def create(self, vals):
        if self._uid != 1:
            self.validate_file_type(vals)
        filedata = super(IrAttachment, self).create(vals)
        return filedata

    @api.multi
    def write(self, vals):
        if self._uid != 1:
            self.validate_file_type(vals)
        filedata = super(IrAttachment, self).write(vals)
        return filedata

    def validate_file_type(self, vals):
        file_name = vals.get('datas_fname')
        if not file_name:
            raise  UserError("File name not provided")
        fileType = vals['datas_fname'].split()
        fileType = len(fileType - 1)
        fileType = fileType.lower()
        valid_types = ['pdf','doc, docx, ppt, pptx','xls','csv','bpm','png','jpeg','jpg','txt']
        if fileType not in valid_types:
            raise  UserError("Only images and documents are valid for upload, "+fileType + " not allowed")
        else:
            scan_virus(vals['datas'])
