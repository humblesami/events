from odoo import models, fields, api
from odoo.exceptions import ValidationError

class TopicDoc(models.Model):
    _name = 'meeting_point.topicdoc'
    _inherit = 'dn_documents.allfiles'
    topic_id = fields.Many2one('meeting_point.topic', string="Meeting Topic")

class Topic(models.Model):
    _name="meeting_point.topic"
    _inherit = 'dn_documents.allfiles'
    _order = "sequence"

    name = fields.Char(string="Title")
    meeting_id = fields.Many2one('calendar.event', string="Meeting", ondelete='cascade')
    content = fields.Text(string="Description", ondelete='cascade')
    lead = fields.Char(string="Lead")
    duration = fields.Float(string="Duration")
    sequence = fields.Integer()
    document_ids = fields.One2many('meeting_point.topicdoc','topic_id', string="Document(s)")
    details = fields.Char()
    attachments = fields.Html(compute='has_attachments', string="Attachment(s)")

    @api.multi
    def has_attachments(self):
        for topic in self:
            if topic.document_ids:
                topic.attachments = '<span class="fa fa-2x fa-file-text" />'

    def vaildate_file(self,values):
        if 'attachment' not in values:
            return self
        if not values['attachment']:
            return self
        if 'filename' not in values:
            raise ValidationError("Invalid File Name")
        if not values['filename']:
            raise ValidationError("Invalid File Name")
        if not values['filename'].endswith(('pdf','ppt', 'pptx', 'doc', 'docx')):
                #('ppt', 'pptx', 'doc', 'docx',
            raise ValidationError("Invalid type file uploaded, Only pdf,doc and ppt files are allowed")



