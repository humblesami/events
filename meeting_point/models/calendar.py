# -*- coding: utf-8 -*-
import time
import threading
from odoo import models, fields, api
from odoo.addons.dn_base import dn_dt
from odoo.exceptions import ValidationError


class Attendee(models.Model):
    _inherit = 'calendar.attendee'

    STATE_SELECTION = [
        ('needsAction', 'No Response'),
        ('tentative', 'Uncertain'),
        ('declined', 'Declined'),
        ('accepted', 'Accepted'),
    ]

    state = fields.Selection(STATE_SELECTION, string='Status', readonly=True, default='needsAction',
                             help="Status of the attendee's participation")

    mail_sent = fields.Char(string="Mail Sent")
    attendance = fields.Selection([('pending','Pending'),('absent','Absent')
                                      ,('inperson','In-Person'),('online','Online')]
                                  ,default='pending',string="Attendance")
    photo = fields.Binary(related='partner_id.image_small')
    email = fields.Char('Email', help="Email of Invited Person", related='partner_id.email')
    exectime = fields.Char(related="event_id.exectime")
    response_by = fields.Char(string="Response By")


    @api.multi
    def action_pending(self):
        self.attendance="pending"

    @api.multi
    def action_absent(self):
        self.attendance = "absent"

    @api.multi
    def action_inperson(self):
        self.attendance = "inperson"

    @api.multi
    def action_online(self):
        self.attendance = "online"

    @api.multi
    def write(self, vals):
        for rec in self:
            exec_time = rec.event_id.exectime
            if exec_time == 'upcoming':
                if 'attendance' in vals:
                    raise ValidationError("Sorry attendance can not be marked before meeting completed")
            elif exec_time == 'ongoing':
                do_any_thing = True
            elif exec_time == 'completed':
                for key in vals:
                    if key != 'attendance':
                        raise ValidationError("Sorry can not make changes in completed meeting")
            elif exec_time == 'archived':
                raise ValidationError("Sorry can not make changes in completed/archived meeting")
            else:
                raise ValidationError("Unknown meeting type")
        return super(Attendee, self).write(vals)

    @api.multi
    def _send_mail_to_attendees(self, template_xmlid, force_send=False):
        """ Send mail for event invitation to event attendees.
            :param template_xmlid: xml id of the email template to use to send the invitation
            :param force_send: if set to True, the mail(s) will be sent immediately (instead of the next queue processing)
        """
        res = False

        if self.env['ir.config_parameter'].sudo().get_param('calendar.block_mail') or self._context.get("no_mail_to_attendees"):
            return res

        calendar_view = self.env.ref('calendar.view_calendar_event_calendar')
        invitation_template = self.env.ref(template_xmlid)

        # get ics file for all meetings
        ics_files = self.mapped('event_id').get_ics_file()

        # prepare rendering context for mail template
        colors = {
            'needsAction': 'grey',
            'accepted': 'green',
            'tentative': '#FFFF00',
            'declined': 'red'
        }
        rendering_context = dict(self._context)
        rendering_context.update({
            'color': colors,
            'action_id': self.env['ir.actions.act_window'].search([('view_id', '=', calendar_view.id)], limit=1).id,
            'dbname': self._cr.dbname,
            'base_url': self.env['ir.config_parameter'].sudo().get_param('web.base.url', default='http://localhost:8069')
        })
        invitation_template = invitation_template.with_context(rendering_context)

        # send email with attachments
        mails_to_send = self.env['mail.mail']
        for attendee in self:
            if attendee.email or attendee.partner_id.email:
                if attendee.mail_sent == "True" and not "sending_reminder" in self._context:
                    continue
                mail_id = invitation_template.send_mail(attendee.id)

                vals = {}
                vals['model'] = None  # We don't want to have the mail in the tchatter while in queue!
                vals['res_id'] = False
                current_mail = self.env['mail.mail'].browse(mail_id)
                current_mail.mail_message_id.write(vals)
                mails_to_send |= current_mail

            if attendee.partner_id.mp_user_id.admin_email and attendee.partner_id.mp_user_id.mail_to_assistant:
                assistant_template = self.env.ref('meeting_point.calendar_template_meeting_assistant_invitation')
                assistant_template = assistant_template.with_context(rendering_context)
                mail_id = assistant_template.send_mail(attendee.id)

                vals = {}
                vals['model'] = None  # We don't want to have the mail in the tchatter while in queue!
                vals['res_id'] = False
                current_mail = self.env['mail.mail'].browse(mail_id)
                current_mail.mail_message_id.write(vals)
                mails_to_send |= current_mail
        mail_ids=mails_to_send.ids
        if force_send and mails_to_send:
            res = mails_to_send.send()

        # self.write({"mail_sent": True})
        t = threading.Thread(target=self.run_method, args=([mail_ids]))
        t.start()
        return res

    def run_method(self,mail_ids):
        with api.Environment.manage():
            new_cr = self.pool.cursor()
            self = self.with_env(self.env(cr=new_cr))
            time.sleep(20)
            self.env['mail.mail'].process_email_queue()
            self.write({"mail_sent": "True"})
            failed_mails = self.env['mail.mail'].search([('id','in',mail_ids)])
            if failed_mails:
                failed_partners=failed_mails.mapped("recipient_ids")
                failed_emails = failed_mails.mapped("email_to")
                failed_attendees=self.filtered(lambda r: r.partner_id in failed_partners or r.email in failed_emails)
                failed_attendees.write({"mail_sent": "Fail"})

            self._cr.commit()
            self._cr.close()



class Meeting(models.Model):
    _inherit = ['calendar.event']#,'dn.seen']

    @api.model
    def _default_partners(self):
        """ When active_model is res.partner, the current partners should be attendees """
        partners = self.env.user.partner_id
        # if partners.name=="Administrator":
        #     partners={}
        active_id = self._context.get('active_id')
        if self._context.get('active_model') == 'res.partner' and active_id:
            if active_id not in partners.ids:
                partners |= self.env['res.partner'].browse(active_id)
        return partners

    @api.model
    def _defualt_country(self):
        c = self.env['res.country'].search([('code','=','US')], limit=1)
        return c


    address = fields.Char(string="Address")
    customMessage = fields.Char(string="Message")
    street = fields.Char(string="Street")
    conference_bridge_numbe = fields.Char(string="Conference Bridge No.")
    country = fields.Many2one('res.country', string="Country", default=_defualt_country)
    description = fields.Html()
    publish = fields.Boolean(string="Publish")
    pin = fields.Char(string="Meeting PIN")
    video_call_link = fields.Char(compute="_compute_video_link")
    country_state = fields.Many2one('res.country.state',string="Status")#, domain=lambda self:self.filter_states())
    company = fields.Char(string="Company")
    city = fields.Char(string="City")
    topic_ids = fields.One2many('meeting_point.topic', 'meeting_id')
    document_ids = fields.One2many('meeting_point.document','meeting_id',string="Document(s) To Sign")
    doc_ids = fields.One2many('meeting_point.doc', 'meeting_id', string="Meeting Document(s)")
    status = fields.Char(string="Status")
    zip = fields.Char(string="Zip")
    is_active_yet = fields.Boolean(compute="_compute_active_status")
    seen_by_me = fields.Integer(compute='_compute_seen_by_me', default=0)
    survey_ids = fields.One2many('survey.survey','meeting_id',string="Survey")
    partner_ids = fields.Many2many('res.partner', 'calendar_event_res_partner_rel', string='Attendees',
                                   states={'done': [('readonly', True)]}, default=_default_partners,
                                   domain=lambda self:self.filter_attendees(), ondelete="cascade")
    #message_ids = fields.One2many("mail.message",'res_id',write=['meeting_point.director'])
    exectime = fields.Char(compute="_compute_archive")
    archived = fields.Boolean(string="Archived")
    im_attendee = fields.Char(compute='look_if_invited')

    @api.model
    def create(self, vals):
        surveys = vals.get('survey_ids')
        if surveys:
            del vals['survey_ids']
        meeting = super(Meeting, self).create(vals)
        if surveys:
            meeting_id = meeting.id
            for survey in surveys:
                if survey[2] == False:
                    continue
                survey[2]['meeting_id'] = meeting_id
                vals = survey[2]
                res = self.env['survey.survey'].create(vals)
        return meeting

    @api.multi
    def write(self, vals):
        if self.env.user.id !=1 and self.exectime == "past":
            changing_the_past = True
            if changing_the_past:
                raise ValidationError("Sorry you are not authorized to change the past event, you can mark attendance and attach documents only.")
        elif self.env.user.id !=1 and self.exectime == "completed":
            changing_the_past = False
            for ke in vals:
                if ke != 'doc_ids' and ke != 'document_ids' and ke != 'attendee_ids':
                    changing_the_past = True
                    break
            if changing_the_past:
                raise ValidationError("Sorry you are not authorized to change the past event, you can mark attendance and attach documents only.")
        if self.env.user.has_group('meeting_point.group_meeting_admin'):
            self = self.sudo()
        res = super(Meeting, self).write(vals)
        return res

    @api.multi
    def _compute_video_link(self):
        for obj in self:
            obj.video_call_link = '/conference/'+obj.pin


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

    def unlink(self):
        stop_time = self.stop
        stop_time = dn_dt.strTodt(stop_time)
        timenow = dn_dt.now()
        archive = stop_time < timenow
        if self.env.user.id != 1 and archive:
            raise ValidationError(
                "Sorry you are not authorized to delete any past event.")

        return super(Meeting, self).unlink()

    @api.multi
    def look_if_invited(self):
        my_pid = self.env.user.partner_id.id
        for event in self:
            event.im_attendee = "no"
            for p in event.partner_ids:
                my_pid == p.id
                event.im_attendee = "yes"
                break


    @api.multi
    def _compute_archive(self):
        for event in self:
            stop_time = event.stop
            stop_time = dn_dt.strTodt(stop_time)
            start_time = event.start
            start_time = dn_dt.strTodt(start_time)
            timenow = dn_dt.now()

            # event.archived = stop_time < timenow

            if timenow < start_time:
                event.exectime = "upcoming"
            elif timenow <= stop_time:
                event.exectime = "ongoing"
            elif timenow > stop_time:
                # stop_time = stop_time + timedelta(hours=3)
                event.exectime = "completed"
                if event.archived:
                    event.exectime = "past"
                # else:
                #     event.exectime = "completed"





    @api.multi
    def _compute_active_status(self):
        try:
            for rec in self:
                rec.is_active_yet = False
                stop_datetime = dn_dt.dtToStr(self.stop)
                stop_date = stop_datetime.date()
                today_date = dn_dt.today()
                res = stop_date>=today_date
                if res:
                    rec.is_active_yet = rec.publish
        except:
            q=1

    @api.onchange('country')
    def filter_states(self):
        domain= {'domain': {'state': [('country_id', '=', self.country.id)]}}
        return domain

    @api.multi
    def filter_attendees(self):
        category_id = self.env['ir.module.category'].sudo().search([('name', '=', 'MeetingPoint')]).id
        domain=['|',('user_id.groups_id.category_id','=',category_id),('is_committee','=',True)]
        return domain


    def do_accept(self):
        """ Marks event invitation as Accepted. """  # for attendee in id_needed:
        #     attendee.event_id.message_post(body=_("%s has accepted invitation") % (attendee.common_name), subtype="calendar.subtype_invitation")
        current_user = self.env.user.id
        newpartner_id = self.env['res.users'].search([['id', '=', current_user]]).partner_id.id
        if current_user:
            attend = self.env['calendar.attendee']
            attendee = attend.search([['event_id', '=', self.id], ['partner_id', '=', newpartner_id]])
            # attendee[_uid] = attendee[_uid]._replace(_uid=1)
            result = attendee.sudo().write({'state': 'accepted'})
            result = attendee.sudo().write({'response_by': attendee.partner_id.name})
            super(Meeting, self).sudo().write({'status': 'Going'})
            return result

    @api.multi
    def do_decline(self):
        """ Marks event invitation as Declined. """
        # obj = self.env['calendar.attendee']
        # obj.do_decline_overide(self)
        current_user = self.env.user.id
        newpartner_id = self.env['res.users'].search([['id', '=', current_user]]).partner_id.id
        if current_user:
            attend = self.env['calendar.attendee']
            attendee = attend.search([['event_id', '=', self.id], ['partner_id', '=', newpartner_id]])
            # attendee[_uid] = attendee[_uid]._replace(_uid=1)
            result = attendee.sudo().write({'state': 'declined'})
            result = attendee.sudo().write({'response_by': attendee.partner_id.name})
            super(Meeting, self).sudo().write({'status': 'NotGoing'})
            return result

    @api.multi
    def do_tentative(self):
        """ Marks event invitation as Accepted. """  # for attendee in attendee:
        #     attendee.event_id.message_post(body=_("%s has accepted invitation") % (attendee.common_name), subtype="calendar.subtype_invitation")
        current_user = self.env.user.id
        newpartner_id = self.env['res.users'].search([['id', '=', current_user]]).partner_id.id
        if current_user:
            attend = self.env['calendar.attendee']
            attendee = attend.search([['event_id', '=', self.id], ['partner_id', '=', newpartner_id]])
            # attendee[_uid] = attendee[_uid]._replace(_uid=1)
            result = attendee.sudo().write({'state': 'tentative'})
            super(Meeting, self).sudo().write({'status': 'MayBe'})
            return result

    @api.multi
    def action_archive(self):
        super(Meeting, self).write({'archived': True})


    @api.onchange('start_datetime', 'duration')
    def _onchange_duration(self):
        if self.start_datetime:
            start = fields.Datetime.from_string(self.start_datetime)
            self.start = self.start_datetime
            if self.duration != 0.0:
                stop_time = dn_dt.addInterval(start, 'h', self.duration)
                self.stop = fields.Datetime.to_string(stop_time)
            else:
                self.stop=self.start_datetime

    @api.onchange('stop_datetime')
    def _onchange_stop_datetime(self):
        if self.stop_datetime:
            self.stop=self.stop_datetime

    @api.onchange('partner_ids')
    def _change_field_value(self):
        user_id = []
        remain = []
        for partner in self.partner_ids:
            if (partner.is_committee):
                temp = self.env['meeting_point.committee'].search([('partner_id', '=', partner.id)])
                for val in temp.user_ids._ids:
                    tempValueForPartner=self.env['meeting_point.users'].search([('id','=',val)]).user_id.partner_id.id
                    user_id.append(tempValueForPartner)
            else :
                 user_id.append(partner.id)
        TempAttendee=list(set(user_id))
        self.partner_ids=self.env['res.partner'].browse(TempAttendee)

    @api.multi
    def create_attendees(self):
        current_user = self.env.user
        result = {}
        for meeting in self:
            alreay_meeting_partners = meeting.attendee_ids.mapped('partner_id')
            meeting_attendees = self.env['calendar.attendee']
            meeting_partners = self.env['res.partner']
            for partner in meeting.partner_ids.filtered(lambda partner: partner not in alreay_meeting_partners):
                values = {
                    'partner_id': partner.id,
                    'email': partner.email,
                    'event_id': meeting.id,
                }

                # current user don't have to accept his own meeting
                if partner == self.env.user.partner_id:
                    values['state'] = 'accepted'

                attendee = self.env['calendar.attendee'].create(values)

                meeting_attendees |= attendee
                meeting_partners |= partner
                # to prevent from sending mail on meeting creation
                if self.publish:
                    if meeting_attendees:
                        to_notify = meeting_attendees.filtered(lambda a: a.email != current_user.email)
                        to_notify._send_mail_to_attendees('meeting_point.calendar_template_meeting_attendee_invitation')

                meeting.write({'attendee_ids': [(4, meeting_attendee.id) for meeting_attendee in meeting_attendees]})
            if meeting_partners:
                meeting.message_subscribe(partner_ids=meeting_partners.ids)

            # We remove old attendees who are not in partner_ids now.
            all_partners = meeting.partner_ids
            all_partner_attendees = meeting.attendee_ids.mapped('partner_id')
            old_attendees = meeting.attendee_ids
            partners_to_remove = all_partner_attendees + meeting_partners - all_partners

            attendees_to_remove = self.env["calendar.attendee"]
            if partners_to_remove:
                attendees_to_remove = self.env["calendar.attendee"].search(
                    [('partner_id', 'in', partners_to_remove.ids), ('event_id', '=', meeting.id)])
                attendees_to_remove.unlink()

            result[meeting.id] = {
                'new_attendees': meeting_attendees,
                'old_attendees': old_attendees,
                'removed_attendees': attendees_to_remove,
                'removed_partners': partners_to_remove
            }
        return result

    @api.multi
    def action_sendmail(self):
        email = self.env.user.email
        if email:
            for meeting in self:
                is_admin = self.env.user.has_group('meeting_point.group_meeting_admin')
                if is_admin:
                    meeting.attendee_ids._send_mail_to_attendees('meeting_point.calendar_template_meeting_attendee_invitation')

        return True

    @api.multi
    def action_publish(self):
        self.action_sendmail()
        super(Meeting, self).write({'publish': True})

    @api.multi
    def non_publish(self):
        super(Meeting, self).write({'publish': False})

    @api.multi
    def go_to_meeting(self):
        return {
            'type': 'ir.actions.act_window',
            # 'name': 'Assign Signatures',
            # 'view_id': view_id,
            'view_mode': 'form',
            'res_model': self._name,
            'res_id': self.id,
            'target': 'current',
        }


    @api.model
    def search(self, args, offset=0, limit=0, order=None, count=False):
        if not self.env.user.has_group('meeting_point.group_meeting_admin') and not self.env.user.has_group('base.group_system'):
            myargs = ['|',('partner_ids', 'in', [self.env.user.partner_id.id]),
                      ('partner_ids', 'in', [c.partner_id.id for c in self.env.user.mp_user_id.committee_ids])]
            args.extend(myargs)
        meeting=super(Meeting, self).search(args)
        return meeting

class MpAlarmManager(models.AbstractModel):

    _inherit = 'calendar.alarm_manager'

    def do_mail_reminder(self, alert):
        meeting = self.env['calendar.event'].browse(alert['event_id'])
        alarm = self.env['calendar.alarm'].browse(alert['alarm_id'])

        result = False
        if alarm.type == 'email':
            self = self.with_context(sending_reminder=True)
            result = meeting.attendee_ids._send_mail_to_attendees('meeting_point.calendar_template_meeting_attendee_reminder',
                                                                  force_send=True)
        return result





