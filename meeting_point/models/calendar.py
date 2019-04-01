# -*- coding: utf-8 -*-
import random
import time
import threading
from odoo import models, fields, api, http
from odoo.addons.dn_base import dn_dt
from odoo.addons.dn_base import ws_methods
from odoo.exceptions import ValidationError

room_pins_obj = {
    '3402742788':'mvdn198374',
    '1382256314':'mvdn491712',
    '2427772817':'mvdn321763',
    '1209858678':'mvdn711768',
    '2654131214':'mvdn620675',
    '4275231112':'mvdn110932',
    '3484541378':'mvdn101143',
    '1598259377':'mvdn127621',
    '3588811445':'mvdn100183',
    '3415505034':'mvdn190794',

    '2647278176': 'mvdn4190381',
    '2133492198': 'mvdn6311061',
    '3630449303': 'mvdn3257961',
    '2305493690': 'mvdn4815967',
    '1134974752': 'mvdn2467711',
    '3822042166': 'mvdn4514141',
    '1054906226': 'mvdn6431871',
    '2183471040': 'mvdn6668961',
    '2493460320': 'mvdn8548061',
    '1251875115': 'mvdn1908801',
    '3516917613': 'mvdn1875453',
    '2633199354': 'mvdn6761615',
    '3036254943': 'mvdn8392751',
    '2557148857': 'mvdn9764861',
    '1373353879': 'mvdn1408121',
    '3401574759': 'mvdn4932531',
    '3965642739': 'mvdn4902161',
    '2782459091': 'mvdn5008741',
    '1456035374': 'mvdn5503618',
    '1104523209': 'mvdn5250951',
    '3239267006': 'mvdn6621281',
    '555530737': 'mvdn7668961',
    '556906545': 'mvdn5877781',
    '399545852': 'mvdn3381351',
    '717444724': 'mvdn1546361',
    '639130039': 'mvdn8684812',
}

class MeetingPin(models.Model):
    _name = 'meeting_point.pin'
    pin = fields.Char()
    room = fields.Char()

class Attendee(models.Model):
    _inherit = 'calendar.attendee'

    STATE_SELECTION = [
        ('needsAction', 'No Response'),
        ('tentative', 'Uncertain'),
        ('declined', 'Declined'),
        ('accepted', 'Accepted'),
    ]

    state = fields.Selection(STATE_SELECTION, string='Attendance_Status', readonly=True, default='needsAction')

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
        web_url = ws_methods.get_main_url()
        rendering_context.update({
            'color': colors,
            'action_id': self.env['ir.actions.act_window'].search([('view_id', '=', calendar_view.id)], limit=1).id,
            'dbname': self._cr.dbname,
            'web_url': web_url
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
    country = fields.Many2one('res.country', string="Country", default=_defualt_country)
    description = fields.Html()
    publish = fields.Boolean(string="Publish")
    country_state = fields.Many2one('res.country.state',string="State")#, domain=lambda self:self.filter_states())
    company = fields.Char(string="Company")
    location = fields.Char(string="Location",compute = "_compute_address")
    city = fields.Char(string="City")
    topic_ids = fields.One2many('meeting_point.topic', 'meeting_id')
    topic_ids_new = fields.One2many('meeting_point.topic', 'meeting_id')
    document_ids = fields.One2many('meeting_point.document','meeting_id',string="Document(s) To Sign")
    doc_ids = fields.One2many('meeting_point.doc', 'meeting_id', string="Meeting Document(s)")
    zip = fields.Char(string="Zip")
    #seen_by_me = fields.Integer(compute='_compute_seen_by_me', default=0)
    survey_ids = fields.One2many('survey.survey','meeting_id',string="Survey")
    partner_ids = fields.Many2many('res.partner', 'calendar_event_res_partner_rel', string='Attendees',
                                   states={'done': [('readonly', True)]}, default=_default_partners,
                                   domain=lambda self:self.filter_attendees(), ondelete="cascade")
    archived = fields.Boolean(string="Archived")
    #message_ids = fields.One2many("mail.message",'res_id',write=['meeting_point.director'])

    pin = fields.Char(string="Meeting PIN")
    conference_bridge_number = fields.Char(string="Conference Bridge No.")
    video_call_link = fields.Char()
    end_call = fields.Boolean(string="End-Call On Moderator Left")
    password = fields.Char()
    moderator = fields.Integer()

    exectime = fields.Char(compute="_compute_archive")
    im_attendee = fields.Char(compute='look_if_invited')
    is_active_yet = fields.Char(compute="_compute_meeting_status")
    conference_status = fields.Char(compute='is_video_active')
    voting_ids = fields.One2many('meeting_point.voting','meeting_id',string="Approval/Voting" )

    @api.model
    def create(self, vals):
        try:
            surveys = vals.get('survey_ids')
            if surveys:
                del vals['survey_ids']
            if vals.get('topic_ids_new'):
                vals['topic_ids'] = vals.get('topic_ids_new')
            meeting = super(Meeting, self).create(vals)
            # self.setVideoLink(meeting, 1)
            if surveys:
                meeting_id = meeting.id
                for survey in surveys:
                    if survey[2] == False:
                        continue
                    survey[2]['meeting_id'] = meeting_id
                    vals = survey[2]
                    res = self.env['survey.survey'].create(vals)
            return meeting
        except:
            raise

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
        if vals.get('topic_ids_new'):
            vals['topic_ids'] = vals.get('topic_ids_new')
        res = super(Meeting, self).write(vals)
        self.emit_data_update()
        return res

    @api.multi
    def is_video_active(self):
        for obj in self:
            dt_now = dn_dt.now()
            before_15 = dn_dt.addInterval(obj.start, 'min', -15)
            # if dt_now < before_15:
            #     obj.conference_status = 'Not active yet, will be available at '+ str(before_15)
            #     if obj.moderator != 0:
            #         obj.moderator = 0
            # else:
            after_3hours = dn_dt.addInterval(obj.stop, 'h', 3)
            if  dt_now > after_3hours:
                obj.conference_status = 'over'
                if obj.moderator != 0:
                    obj.moderator = 0
            else:
                if obj.moderator == 0:
                    obj.conference_status = 'active'
                else:
                    obj.conference_status = 'active'

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
                if my_pid == p.id:
                    event.im_attendee = "yes"
                    break
                continue
    @api.multi
    def _compute_address(self):
        for event in self:
            val = ''
            if event.address:
               val = val + event.address + ', '
            if event.street:
               val = val + event.street + ', '
            if event.city:
                val = val + event.city + ', '
            if event.country_state.name:
                val = val + event.country_state.name + ', '
            if event.zip:
                val = val + event.zip + ', '
            if event.country.name:
                val = val +event.country.name
            last_character = val[len(val) - 1]
            if last_character == ' ':
                val = val.strip()
            if last_character == ',':
                val = val[:-1]
            val = val.strip()
            event.location = val

    @api.multi
    def _compute_archive(self):
        for event in self:
            stop_time = event.stop
            stop_time = dn_dt.strTodt(stop_time)
            start_time = event.start
            start_time = dn_dt.strTodt(start_time)
            timenow = dn_dt.now()

            if event.archived:
                event.exectime = "past"
                if event.pin:
                    self.disableConference(event)
            elif timenow < start_time:
                event.exectime = "upcoming"
            elif timenow <= dn_dt.addInterval(stop_time, 'h', 3):
                event.exectime = "ongoing"
            else:
                self.disableConference(event)
                event.exectime = "completed"

    @api.multi
    def _compute_meeting_status(self):
        try:
            for rec in self:
                rec.is_active_yet = 'no'
                if rec.im_attendee != 'yes':
                    continue
                if not rec.publish:
                    continue
                if rec.archived:
                    continue
                res = rec.exectime != 'completed'
                rec.is_active_yet = 'yes'
        except:
            q=1

    def get_name_audience(self):
        ids = []
        for partner in self.partner_ids:
            if partner.id != self.env.user.partner_id.id:
                ids.append(partner.user_id.id)
        res = { 'name' : '  meeting '+ self.name, 'audience': ids }
        return res

    def get_audience(self):
        ids = []
        for partner in self.partner_ids:
            if partner.id != self.env.user.partner_id.id:
                ids.append(partner.user_id.id)
        return ids

    def concurrentMeetings(self, start, stop):
        start = dn_dt.strTodt(start)
        start = dn_dt.addInterval(start, 'm', -15)
        start = dn_dt.dtTostr(start)

        stop = dn_dt.strTodt(stop)
        stop = dn_dt.addInterval(stop, 'h', 3)
        stop = dn_dt.dtTostr(stop)
        meets = self.env['calendar.event'].search([('start', '>=', start), ('stop', '<=', stop)])
        return meets

    def filteredPins(self,start, stop):
        meets = self.concurrentMeetings(start, stop)
        pins = []
        for meeting in meets:
            pins.append(meeting.pin)
        dict = room_pins_obj.keys()
        arr = []
        for key in dict:
            arr.append(key)
        filtered = set(arr) - set(pins)
        return filtered

    def getUniquePin(self, start, stop, pin=None):
        if not pin:
            dict = room_pins_obj.keys()
            arr = []
            for key in dict:
                arr.append(key)
            rint = random.randint(0, len(arr) - 1)
            pin = arr[rint]
        sql = "select pin from calendar_event where pin='" + pin + "' and date(start)='" + start + "' or date(stop)='" + stop + "'"
        new_cr = self.pool.cursor()
        new_cr.execute(sql)
        pins = new_cr.dictfetchall()
        if len(pins) > 0:
            pins = self.filteredPins(start, stop)
            rint = random.randint(0, len(pins) - 1)
            pin = arr[rint]
        return pin

    def setVideoLink(self, event, creating=None, vals=None):
        if not event.start or not event.stop:
            return
        if creating:
            meeting_id = event.id
            pin = self.getUniquePin(event.start, event.stop)
            # video_call_link = '/meeting_point/static/jitsi/index.html?name='+self.env.user.name+'&meeting_id=' + str(meeting_id) + '&pin=' + pin
            # conference_bridge_number = '+1-512-402-2718'
            # vide_vals = {'moderator': 0, 'pin': pin, 'conference_bridge_number': conference_bridge_number, 'video_call_link': video_call_link}
            event.write(vide_vals)
        elif vals['pin']:
            pin = self.getUniquePin(event.start, event.stop, vals['pin'])
            call_url = event.video_call_link
            arr = call_url.split('&')
            call_url = arr[0] + '&' + arr[1] + '&pin=' + pin
            video_call_link = call_url
            event.write({'pin':pin, 'video_call_link': video_call_link})

    def disableConference(self, event):
        if event.conference_status == 'active' and event.exectime != 'upcoming' and event.exectime != 'ongoing':
            vals = {'pin': '', 'video_call_link': '', 'moderator': 0, 'video_active': False, 'conference_bridge_number': ''}
            event.sudo().write(vals)

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
        return self.respond_meeting('accepted')

    @api.multi
    def do_decline(self):
        return self.respond_meeting('declined')

    @api.multi
    def do_tentative(self):
        return self.respond_meeting('tentative')


    def respond_meeting(self, response):
        user = self.env.user
        response_by = 'Assistant'
        if user.id != 1 and user.id != 4:
            response_by = 'Self'
        attendee = self.env['calendar.attendee'].search([('event_id', '=', self.id), ('partner_id', '=', user.partner_id.id)])
        result = attendee.sudo().write({'state': response, 'response_by': response_by})
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
    @api.multi
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

    def emit_data_update(self):
        audience = []
        for partner in self.partner_ids:
            if partner.user_id:
                audience.append(partner.user_id.id)
        data = [{
            'name': 'to_do_item_updated',
            'audience': audience,
            'data': {
                'id': self.id
            }
        }]
        ws_methods.emit_event(data)

    @api.multi
    def action_publish(self):
        self.action_sendmail()
        self.publish = True
        # self.emit_data_update()

    @api.multi
    def non_publish(self):
        if self.exectime  == 'ongoing':
            raise  ValidationError("Sorry can not make changes in ongoing meeting")
        else :
            self.publish = False
        # self.emit_meeting_update()

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

    def start_conference(self):
        qs = str(self.pin)+'&meeting_id='+str(self.id)
        urll = "/meeting_point/static/meet.html?pin="+qs

        return {
            'type': 'ir.actions.act_url',
            'name': "Conference",
            'target': 'new',
            'url': urll
        }




        # view_id = self.env.ref('calendar.view_conference').id
        # return {
        #     'type': 'ir.actions.act_window',
        #     'name': 'Conference',
        #     'view_id': view_id,
        #     'view_mode': 'form',
        #     'res_model': self._name,
        #     'res_id': self.id,
        #     'target': 'current',
        # }

    @api.model
    def search(self, args, offset=0, limit=0, order=None, count=False):
        if not self.env.user.has_group('meeting_point.group_meeting_admin') and not self.env.user.has_group('base.group_system'):
            myargs = ['|',('partner_ids', 'in', [self.env.user.partner_id.id]),
                      ('partner_ids', 'in', [c.partner_id.id for c in self.env.user.mp_user_id.committee_ids])]
            args.extend(myargs)
        meetings=super(Meeting, self).search(args)
        if 'upcoming' in self._context:
            meetings=meetings.filtered(lambda r: r.exectime in ['ongoing', 'upcoming'])
        elif 'completed' in self._context:
            meetings=meetings.filtered(lambda r: r.exectime in ['completed'])
        return meetings

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