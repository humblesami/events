from odoo import models, fields, api

class Folder(models.Model):
    _name = 'meeting_point.folder'

    name = fields.Char(string="Title")
    parent_folder = fields.Many2one('meeting_point.folder', string="Parent Folder", ondelete="cascade")
    sub_folders = fields.One2many('meeting_point.folder', 'parent_folder', string="Sub Folder")
    file_ids = fields.One2many('meeting_point.files','parent_folder', string="Files")
    allUser = fields.Boolean('All Users',default = False)

    @api.model
    def _default_partners(self):
        """ When active_model is res.partner, the current partners should be attendees """
        partners = self.env['meeting_point.users'].sudo().search([('user_id','=',self.env.user.id)])
        return   partners


    partners = fields.Many2many('meeting_point.users', string="Access", default=_default_partners)

    @api.onchange('allUser')
    def alluser(self):
        val = self.allUser
        if(val):
            user_ids = self.env['meeting_point.users'].sudo().search([('user_id', '!=', 1)])
            self.partners = user_ids
        else:
            self.partners = []

class Files(models.Model):
    _name = 'meeting_point.files'
    _inherit = 'dn_documents.allfiles'

    parent_folder = fields.Many2one('meeting_point.folder', string="Parent Folder", ondelete="cascade")
    partners = fields.Many2many('meeting_point.users', string="Access")