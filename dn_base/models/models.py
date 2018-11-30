# -*- coding: utf-8 -*-
from odoo import models, api, fields
from odoo.exceptions import UserError, ValidationError
from odoo.addons.dn_base.statics import scan_virus,raise_dn_model_error

from odoo.addons.mail.models.mail_message import Message

class MyMail(Message):

    @api.multi
    def unlink(self):
        if self.env.uid != 1:
            for rec in self:
                if rec.env.uid == rec.create_uid.id:
                    res = super(Message, rec).sudo().unlink()
                else:
                    raise ValidationError("Can delete own comments only")
            if not res:
                raise ValidationError("Comments not found")
            return res
        else:
            res = super(Message, self).unlink()
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
    seen_by_me = fields.Integer(compute='_compute_seen_by_me', default=0)

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
        fileType = 'exe'
        try:
            if 'datas_fname' in vals and vals['datas_fname'] == 'invitation.ics':
                return
            if not 'datas' in vals:
                raise UserError('No file, systme error')
            if vals['datas'] == '':
                raise UserError('No data in file')
            fileType = self._compute_mimetype(vals)
        except:
            raise_dn_model_error()
        if fileType not in ['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                            ,'application/vnd.ms-powerpoint','application/msword'
                            #,'application/vnd.ms-excel'
                            #,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                            ,'image/png','image/jpeg','image/jpg','image/bmp', 'image/gif'
                            ,'text/plain'
                            ]:
            raise  UserError("Only images and documents are valid for upload, "+fileType + " not allowed")
        else:
            scan_virus(vals['datas'])
