from odoo import models, fields, api

class Folder(models.Model):
    _name = 'meeting_point.folder'

    name = fields.Char(string="Title")
    parent_folder = fields.Many2one('meeting_point.folder', string="Parent Folder", ondelete="cascade")
    partners = fields.Many2many('meeting_point.users', string="Access")
    sub_folders = fields.One2many('meeting_point.folder', 'parent_folder', string="Sub Folder")
    file_ids = fields.One2many('meeting_point.files','parent_folder', string="Files")
    allUser = fields.Boolean('All Users')

    @api.onchange('allUser')
    def alluser(self):
        val = self.allUser
        if(val):
            user_ids = self.env['meeting_point.users'].sudo().search([])
            self.partners = user_ids
        else:
            self.partners = []

class Files(models.Model):
    _name = 'meeting_point.files'
    _inherit = 'dn_documents.allfiles'

    parent_folder = fields.Many2one('meeting_point.folder', string="Parent Folder", ondelete="cascade")
    partners = fields.Many2many('meeting_point.users', string="Access")