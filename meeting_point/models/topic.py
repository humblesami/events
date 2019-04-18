from odoo import models, fields, api
from odoo.exceptions import ValidationError

class TopicDoc(models.Model):
    _name = 'meeting_point.topicdoc'
    _inherit = 'dn_documents.allfiles'
    topic_id = fields.Many2one('meeting_point.topic', string="Meeting Topic")

    @api.model
    def search(self, args, offset=0, limit=0, order=None, count=False):
        if not self.env.user.has_group('dn_base.group_dn_app_manager') and not self.env.user.has_group('base.group_system'):

            myargs = [('topic_id.meeting_id.partner_ids','in',[self.env.user.partner_id.id]),('topic_id.meeting_id.publish','=',True)]
            args.extend(myargs)
        docs = super(TopicDoc, self).search(args)
        return docs

class Topic(models.Model):
    _name="meeting_point.topic"
    _order = "sequence"

    name = fields.Char(string="Title", required=True)
    meeting_id = fields.Many2one('calendar.event', string="Meeting", ondelete='cascade')
    content = fields.Text(string="Description", ondelete='cascade')
    lead = fields.Char(string="Lead")
    duration = fields.Float(string="Duration")
    sequence = fields.Integer()
    document_ids = fields.One2many('meeting_point.topicdoc','topic_id', string="Document(s)")
    details = fields.Char()
    attachments = fields.Char(compute='has_attachments', string="Attachment(s)")
    actions = fields.Char(compute='has_votings', string="Actions(s)")
    voting_ids = fields.One2many('meeting_point.voting', 'topic_id', string="Approval/Voting")


    def open_same_window(self):
        return {
            'type': 'ir.actions.act_window',
            # 'name': 'Assign Signatures',
            # 'view_id': view_id,
            'view_mode': 'form',
            'res_model': self._name,
            'res_id': self.id,
            'target': 'current',
        }

    @api.multi
    def has_attachments(self):
        for topic in self:
            if topic.document_ids:
                topic.attachments = ''
                for d in topic.document_ids:
                    topic.attachments += '<a style="margin:1px" title="%s" onclick="openTopicDoc(event,%s)"  name="open_annotator_form" class="fa fa-lg fa-file"></a>'%(d.name,d.id)
            else:
                topic.attachments = ''

    @api.multi
    def has_votings(self):
        for topic in self:
            if topic.voting_ids:
                topic.actions = ''
                for d in topic.voting_ids:
                    topic.actions += '<a style="margin:1px" title="%s" onclick="openTopicAction(event,%s)"  class="fa fa-lg fa-th-list"></a>'%(d.name,d.id)
            else:
                topic.actions = ''



