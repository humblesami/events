import sys

import json
from datetime import datetime
from odoo import models, fields, api
from odoo.exceptions import ValidationError

class News(models.Model):
    _name = 'meeting_point.news'
    name = fields.Char(required=True)
    title = fields.Char()
    validated = fields.Char()
    description = fields.Html()
    photo = fields.Binary(attachment=True)
    filename = fields.Char()
    doc_ids = fields.One2many('meeting_point.news.doc', 'news_id', string='Related Documents')
    video_ids = fields.One2many('meeting_point.news.video', 'news_id', string='Related Videos')

    pending_meetings = fields.Many2many('calendar.event', string="Meetings"
                                        , compute="compute_meetings")
    pending_surveys = fields.Many2many('survey.survey', string="Surveys"
                                       , compute="compute_surveys")
    pending_documents = fields.Many2many('meeting_point.document', string="Signatures"
                                         , compute="compute_documents")
    public_events = fields.Many2many('calendar.event', string="All Upcoming Events"
                                         , compute="compute_events")
    public_event = fields.Char(string="All Upcoming Events"
                                     , compute="compute_events")

    to_do_items_count = fields.Integer(compute="compute_to_do_items")

    @api.multi
    def compute_to_do_items(self):
        environment = self.env
        for obj in self:
            cnt = len(obj.pending_meetings.filtered(lambda r:r.attendee_status =='needsAction'))
            obj.to_do_items_count = cnt + len(obj.pending_surveys) + len(obj.pending_documents)


    @api.multi
    def compute_events(self):
        environment = self.env
        for obj in self:
            date_value = datetime.now()
            date_value = date_value.strftime('%Y-%m-%d %H:%M:%S')
            filter = [('publish', '=', True), ('stop_datetime', '>=', date_value)]
            meetings = environment['calendar.event'].sudo().search(filter)
            obj.public_events = meetings
            events_list = []
            for m in meetings:
                hour = str(int(m.start.split(" ")[1].split(":")[0]) + 5)
                hourEnd = str(int(m.stop_datetime.split(" ")[1].split(":")[0]) + 5)
                if int(hour)<10:
                    hour = '0'+str(hour)
                if int(hourEnd) < 10:
                    hourEnd = '0' + str(hourEnd)
                timeHour = m.start.split(" ")[0] +'T'+hour+':'+m.start.split(" ")[1].split(":")[1]+ ':'+m.start.split(" ")[1].split(":")[2]+'Z'
                timeHourEnd = m.stop_datetime.split(" ")[0] + 'T' + hourEnd + ':' + m.stop_datetime.split(" ")[1].split(":")[1] + ':' + m.stop_datetime.split(" ")[1].split(":")[2] + 'Z'
                event = {'id':m.id,'title':m.name,'start':timeHour,'end':timeHourEnd}
                events_list.append(event)
            obj.public_event=json.dumps(events_list)


    @api.multi
    def compute_documents(self):
        try:
            environment = self.env
            for obj in self:
                docs = environment['meeting_point.document'].search([])
                docs = docs.filtered(lambda r: r.mp_signature_status == "Pending")
                obj.pending_documents = docs
        except:
            raise ValidationError(str(sys.exc_info()) + " while getting documents")

    @api.multi
    def compute_surveys(self):
        try:
            env = self.env
            for obj in self:
                surveys = env['survey.survey'].search([])
                surveys = surveys.filtered(lambda x: x.my_status != 'not invited')
                obj.pending_surveys = surveys
        except:
            raise ValidationError(sys.exc_info() + " while getting surveys")

    @api.multi
    def compute_meetings(self):
        try:
            environment = self.env
            date_value = datetime.now()
            date_value = date_value.strftime('%Y-%m-%d %H:%M:%S')
            filters = [('publish', '=', True), ('stop_datetime', '>=', date_value)]
            partner = environment.user.partner_id
            for obj in self:
                meetings = environment['calendar.event'].search(filters).filtered(lambda r: partner in r.partner_ids)
                obj.pending_meetings = meetings
        except:
            raise ValidationError(sys.exc_info() + " while getting events")

    def create(self, values):
        self.validate_image(values)
        doc = super(News, self).create(values)
        return doc

    def write(self, values):
        self.validate_image(values)
        doc = super(News, self).write(values)
        return doc

    def validate_image(self, values):
        if 'photo' in values and 'filename' in values:
            if not 'validated' in values:
                raise ValidationError("File not validated")
            if values['validated'] == 'invalid':
                raise ValidationError("File size not validated")
            filename = values['filename']
            if not filename:
                raise ValidationError("There is no file")
            else:
                # Check the file's extension
                if not filename.endswith(('png', 'jpg', 'jpeg', 'bmp', 'svg', 'gif')):
                    raise ValidationError("Invalid file uploaded, Only image files are allowed")


class NewsDocs(models.Model):
    _name = 'meeting_point.news.doc'
    _inherit = 'dn_documents.allfiles'
    news_id = fields.Many2one('meeting_point.news', string='Related Message')


class NewsVideo(models.Model):
    _name = 'meeting_point.news.video'
    name = fields.Char(string='Video Title')
    url = fields.Char(string='Video Link')
    news_id = fields.Many2one('meeting_point.news', string='Related Message')



class MpDashboard(models.Model):
    _name = 'meeting_point.dashboard'

    # partner_ids = fields.Many2many('res.partner', string='Users', domain=lambda self: self.filter_attendees())
    #
    # @api.multi
    # def filter_attendees(self):
    #     category_id = self.env['ir.module.category'].sudo().search([('name', '=', 'MeetingPoint')]).id
    #     domain = ['|', ('user_id.groups_id.category_id', '=', category_id), ('is_committee', '=', True)]
    #     return domain
    #
    # @api.onchange('partner_ids')
    # def _change_field_value(self):
    #     user_id = []
    #     remain = []
    #     for partner in self.partner_ids:
    #         if (partner.is_committee):
    #             temp = self.env['meeting_point.committee'].search([('partner_id', '=', partner.id)])
    #             for val in temp.user_ids._ids:
    #                 tempValueForPartner=self.env['meeting_point.users'].search([('id','=',val)]).user_id.partner_id.id
    #                 user_id.append(tempValueForPartner)
    #         else :
    #              user_id.append(partner.id)
    #     TempAttendee=list(set(user_id))
    #     self.partner_ids=self.env['res.partner'].browse(TempAttendee)