import sys
from odoo import http, api
from odoo.addons.dn_base import dn_dt
from odoo.addons.dn_base import ws_methods

room_pins_obj = {
    '3402742788': 'mvdn198374',
    '1382256314': 'mvdn491712',
    '2427772817': 'mvdn321763',
    '1209858678': 'mvdn711768',
    '2654131214': 'mvdn620675',
    '4275231112': 'mvdn110932',
    '3484541378': 'mvdn101143',
    '1598259377': 'mvdn127621',
    '3588811445': 'mvdn100183',
    '3415505034': 'mvdn190794',
};

class meeting(http.Controller):

    @http.route('/meeting/respond-invitation', type="http", csrf=False, auth='public', cors='*')
    def acceptrejectmeeting(self, **kw):
        return self.editMeetState(kw)

    @http.route('/meeting/respond-invitation-json', type="json", csrf=False, auth='public', cors='*')
    def acceptrejectmeetingjson(self, **kw):
        req_body = http.request.jsonrequest
        return self.editMeetState(req_body)

    def editMeetState(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            # req_env = http.request.env
            if 'data' in values:
                values = values['data']
            meeting_id = values.get('meeting_id')
            if not meeting_id:
                ws_methods.http_response('Please provide meeting id')
            status = values['status']
            meeting = http.request.env['calendar.event'].search([('id', '=', meeting_id)])
            res = False
            if status == 'Accept':
                res = meeting.do_accept()
            elif status == 'Decline':
                res = meeting.do_decline()
            else:
                res = meeting.do_tentative()
            return ws_methods.http_response('', "success")
        except:
            try:
                res = sys.exc_info()
                error_message = False
                if len(res) > 1:
                    res = res[1]
                    if res.name:
                        error_message = res.name
                if error_message:
                    return ws_methods.http_response(error_message)
                else:
                    return ws_methods.handle()
            except:
                return ws_methods.handle()

    @http.route('/meeting/attendees', type="http", csrf=False, auth='public', cors='*')
    def getMeetingAttendees(self, **kw):
        try:
            uid = ws_methods.check_auth(kw)
            if not uid:
                return ws_methods.not_logged_in()

            meeting_id = kw.get('meeting_id')
            meeting_id = int(meeting_id)
            password = kw.get('password')
            meeting = http.request.env['calendar.event'].search([('id', '=', meeting_id)])
            if meeting.password and meeting.password != password:
                return ws_methods.http_response('Invalid Password Provided')

            if meeting.moderator == 0:
                if http.request.env.user.has_group('meeting_point.group_meeting_admin'):
                    meeting.moderator = uid
                else:
                    return ws_methods.http_response("Waiting moderator")

            if not meeting.pin:
                return ws_methods.http_response('No pin defined for meeting')
            if meeting.exectime == "past" or meeting.exectime == "completed":
                return ws_methods.http_response("Meeting was over at " + str(meeting.stop))
            elif meeting.conference_status != 'active':
                return ws_methods.http_response(meeting.conference_status)

            ids = []
            im_attendee = 'no'
            for attendee in meeting.partner_ids:
                cid = attendee.user_id.id
                if cid != uid:
                    ids.append(cid)
                else:
                    im_attendee = 'yes'

            res = {'ids': ids, 'im_attendee': im_attendee, 'roomName': room_pins_obj[meeting.pin]}
            return ws_methods.http_response('', res)
        except:
            return ws_methods.handle()

    def run_method(self,template_xmlid,mail_ids,context):
        with api.Environment.manage():
            new_cr = self.pool.cursor()
            self = self.with_env(self.env(cr=new_cr))

            invitation_template = self.env.ref(template_xmlid)
            if context:
                rendering_context = context
            else:
                rendering_context = self._context
            rendering_context.update({
                'base_url': self.env['ir.config_parameter'].sudo().get_param('web.base.url',
                                                                             default='http://localhost:8069')
            })
            invitation_template = invitation_template.with_context(rendering_context)

            # send email with attachments
            mails_to_send = self.env['mail.mail']
            for attendee in self:
                if attendee.email or attendee.partner_id.email:
                    mail_id = invitation_template.send_mail(attendee.id)

                    vals = {}
                    vals['model'] = None  # We don't want to have the mail in the tchatter while in queue!
                    vals['res_id'] = False
                    current_mail = self.env['mail.mail'].browse(mail_id)
                    current_mail.mail_message_id.write(vals)
                    mails_to_send |= current_mail

            # time.sleep(20)
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

    @http.route('/meeting/moderatorleft', type="http", csrf=False, auth='public', cors='*')
    def moderaorLeft(self, **kw):
        try:
            uid = ws_methods.check_auth(kw)
            if not uid:
                return ws_methods.not_logged_in()
            meeting_id = kw.get('meeting_id')
            meeting_id = int(meeting_id)
            meeting = http.request.env['calendar.event'].search(
                [('id', '=', meeting_id),('moderator','=',uid)])
            meeting.moderator = 0
            return ws_methods.http_response('', 'done')
        except:
            return ws_methods.handle()

    @http.route('/meeting/summary', type="http", csrf=False, auth='none', cors='*')
    def mp_meeting_http(self, **kw):
        res = self.mp_meeting_summary(kw)
        return res

    @http.route('/meeting/summary-json', type="json", csrf=False, auth='none', cors='*')
    def mp_meeting_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.mp_meeting_summary(req_body)

    def mp_meeting_summary(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            if 'data' in values:
                values = values['data']
            meeting_id = values.get('id')
            if not meeting_id:
                return ws_methods.http_response('Please provide meeting id')
            meeting = req_env['calendar.event'].sudo().search([('id', '=', int(values["id"]))])
            props = ['id', 'start', 'stop', 'duration', 'video_call_link', 'conference_bridge_number', 'pin',
                     'description', 'name', 'address', 'city', 'country_state.name', 'country.name', 'zip', 'street',
                     'status', 'company']

            meeting_object = ws_methods.object_to_json_object(meeting, props)
            meeting_object['duration'] = dn_dt.hours_to_hoursNminutes(meeting_object['duration'])

            if req_env.user.partner_id in meeting.partner_ids:
                meeting_object["my_event"] = 1

            return ws_methods.http_response('', meeting_object)
        except:
            return ws_methods.handle()

    @http.route('/meeting/details', type="http", csrf=False, auth='none', cors='*')
    def mp_meeting_compact_http(self, **kw):
        res = self.mp_meeting(kw)
        return res

    @http.route('/meeting/details-json', type="json", csrf=False, auth='none', cors='*')
    def mp_meeting_compact_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.mp_meeting(req_body)

    def mp_meeting(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            if 'data' in values:
                values = values['data']

            id = int(values["id"])
            date_value = dn_dt.nowtostr()
            filters = [('id', '=', id)]

            meeting = req_env['calendar.event'].search(filters, limit=1, order='id')
            props = ['id', 'start', 'stop', 'conference_status', 'duration', 'zip', 'video_call_link',
                     'conference_bridge_number', 'pin', 'exectime',
                     'description', 'name', 'address', 'city', 'country_state.name', 'country.name', 'zip', 'street',
                     'status', 'company']
            meeting_object = ws_methods.object_to_json_object(meeting, props)
            try:
                duration = float(meeting_object['duration'])
                meeting_object['duration'] = dn_dt.hours_to_hoursNminutes(duration)
            except:
                a = 1
            topics_arr = []
            for topic in meeting.topic_ids:
                obj = ws_methods.object_to_json_object(topic, ['lead', 'name', 'duration', 'content', 'id'])
                try:
                    if obj['duration']:
                        duration = float(obj['duration'])
                        obj['duration'] = dn_dt.hours_to_hoursNminutes(duration)
                except:
                    topic_dur = str(obj['duration'])
                    ws_methods.handle_silently(topic_dur + "could not be converted")
                    a = 1
                obj["docs"] = ws_methods.objects_list_to_json_list(topic.document_ids, ['id', 'name'])
                topics_arr.append(obj)
            meeting_object['topics'] = topics_arr
            meeting_object['meeting_docs'] = ws_methods.objects_list_to_json_list(meeting.doc_ids, ['id', 'name'])
            docs_to_sign = []
            props = ['id', 'name', 'mp_signature_status']
            for sign_doc in meeting.document_ids:
                sign = sign_doc.signature_ids.filtered(lambda r: r.user_id.id == uid)
                if sign:
                    doc_to_add = ws_methods.object_to_json_object(sign_doc, props)
                    docs_to_sign.append(doc_to_add)

            meeting_object['sign_docs'] = docs_to_sign
            surveys = meeting.survey_ids.filtered(lambda r: r.my_status == 'pending')
            meeting_object['surveys'] = ws_methods.objects_list_to_json_list(surveys, ['id', 'title'])
            props = ['attendance', 'state', 'response_by']
            meeting_object['attendees'] = ws_methods.objects_list_to_json_list(meeting.attendee_ids, props)

            cnt = 0
            for attendee_partner in meeting.attendee_ids:
                attendee = meeting_object['attendees'][cnt]
                attendee_user = attendee_partner.partner_id.user_id
                attendee['photo'] = ws_methods.mfile_url('res.users', 'image_small', attendee_user.id)
                attendee['uid'] = attendee_user.id
                attendee['name'] = attendee_user.name
                if attendee['state'] == 'needsAction':
                    attendee['state'] = 'No Response'
                elif attendee['state'] == 'accepted':
                    attendee['state'] = 'Accepted'
                elif attendee['state'] == 'rejected':
                    attendee['state'] = 'Rejected'
                elif attendee['state'] == 'declined':
                    attendee['state'] = 'Declined'
                elif attendee['state'] == 'tentative':
                    attendee['state'] = 'Uncertain'
                cnt += 1
            filters = [('res_id', '=', meeting_object['id']), ('parent_id', '=', False),
                       ('model', '=', 'calendar.event'),
                       ('message_type', '=', 'comment'), ('create_uid', '!=', False)]
            if uid != 1:
                filters.append(('create_uid', '!=', 1))
            comments = req_env['mail.message'].search(filters, order='create_date desc')
            props = ['id', 'body', 'subtype_id.id', 'create_date']
            ar_comments = ws_methods.objects_list_to_json_list(comments, props)
            i = 0
            for com in comments:
                user = com.create_uid
                if not user.mp_user_id.id:
                    ar_comments[i]['is_own'] = 1

                ar_comments[i]['user'] = {'name': user.name, 'id': user.mp_user_id.id}
                ar_children = []
                if com.child_ids:
                    child_ids = com.child_ids.sorted(key=lambda p: (p.create_date))
                    ar_children = ws_methods.objects_list_to_json_list(child_ids, props)
                    j = 0
                    for child_com in child_ids:
                        user1 = child_com.create_uid
                        ar_children[j]['user'] = {'name': user1.name, 'id': user1.mp_user_id.id}
                        j = j + 1
                ar_comments[i]["children"] = ar_children
                i = i + 1

            id = int(values['id'])
            filters = []
            if 'meeting_type' in values:
                if values['meeting_type'] == 'completed':
                    filters.append(('publish', '=', True))
                    filters.append(('stop', '<', date_value))
                elif values['meeting_type'] == 'archived':
                    filters.append(('archived', '=', True))
                elif values['meeting_type'] == 'upcoming':
                    filters.append(('publish', '=', True))
                    filters.append(('stop', '>=', date_value))
            filters.append(('id', '<', id))
            prev = req_env['calendar.event'].search(filters, limit=1, order='id desc')
            if len(prev) > 0:
                prev = prev[0]
            if len(filters) > 0:
                filters[len(filters) - 1] = ('id', '>', id)
            else:
                filters = [('id', '>', id)]
            next = req_env['calendar.event'].search(filters, limit=1, order='id')
            if len(next) > 0:
                next = next[0]

            meeting_object['comments'] = ar_comments
            data = {"meeting": meeting_object, "next": next.id, "prev": prev.id}
            return ws_methods.http_response('', data)
        except:
            return ws_methods.handle()

    @http.route('/meeting/list', type="http", csrf=False, auth='none', cors='*')
    def mp_meetings_http(self, **kw):
        res = self.mp_meetings(kw)
        return res

    @http.route('/meeting/list-json', type="json", csrf=False, auth='none', cors='*')
    def mp_meetings_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.mp_meetings(req_body)

    def mp_meetings(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env

            limit = 0
            offset = 0
            if 'paging' in values:
                offset = values['paging']['offset']
                limit = values['paging']['limit']

            date_value = dn_dt.nowtostr()
            if 'data' in values:
                values = values['data']

            myModel = req_env['calendar.event']
            filters = [('publish', '=', True)]
            if not 'meeting_type' in values:
                values['meeting_type'] = 'upcoming'
            if values['meeting_type'] == 'completed':
                filters.append(('stop', '<', date_value))
                filters.append(('archived', '=', False))
            elif values['meeting_type'] == 'archived':
                filters.append(('archived', '=', True))
            else:
                filters.append(('stop', '>=', date_value))
            props = ['id', 'start', 'stop', 'duration', 'video_call_link', 'conference_bridge_number', 'pin',
                     'description', 'name', 'address', 'city', 'country_state.name', 'country.name', 'zip', 'street',
                     'company', 'status']

            # total_cnt = len(myModel.search(filters))
            partner = req_env.user.partner_id
            meetings = myModel.search(filters, offset=offset, limit=limit).filtered(lambda r: partner in r.partner_ids)
            meetings = ws_methods.objects_list_to_json_list(meetings, props)
            # current_cnt = len(meetings)
            meetings = {'records': meetings, 'total': 0, 'count': 0}
            return ws_methods.http_response('', meetings)
        except:
            return ws_methods.handle()