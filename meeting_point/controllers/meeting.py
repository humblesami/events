import sys
from odoo import http
from odoo.addons.dn_base import dn_dt
from odoo.addons.dn_base import ws_methods

class meeting(http.Controller):

    @http.route('/meeting/summary', type="http", csrf=False, auth='none', cors='*')
    def mp_meeting_http(self, **kw):
        res= self.mp_meeting_summary(kw)
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
            props = ['id', 'start', 'stop', 'duration', 'video_call_link', 'conference_bridge_numbe', 'pin',
                     'description', 'name', 'address', 'city', 'country_state.name', 'country.name', 'zip', 'street',
                     'company']
            meeting_object = ws_methods.object_to_json_object(meeting, props)

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
            props = ['id', 'start', 'stop', 'duration', 'video_call_link', 'conference_bridge_numbe', 'pin', 'exectime',
                     'description', 'name', 'address', 'city', 'country_state.name', 'country.name', 'zip', 'street',
                     'company']
            meeting_object = ws_methods.object_to_json_object(meeting, props)
            topics_arr = []
            for topic in meeting.topic_ids:
                obj = ws_methods.object_to_json_object(topic, ['lead', 'name', 'duration', 'content', 'id'])
                obj['duration'] = dn_dt.hours_to_hoursNminutes(obj['duration'])
                obj["docs"] = ws_methods.objects_list_to_json_list(topic.document_ids, ['id', 'name'])
                topics_arr.append(obj)
            meeting_object['topics'] = topics_arr
            meeting_object['meeting_docs'] = ws_methods.objects_list_to_json_list(meeting.doc_ids, ['id', 'name'])
            docs_to_sign = []
            props = ['id', 'name','mp_signature_status']
            for sign_doc in meeting.document_ids:
                sign = sign_doc.signature_ids.filtered(lambda r: r.user_id.id == uid)
                if sign:
                    doc_to_add = ws_methods.object_to_json_object(sign_doc, props)
                    docs_to_sign.append(doc_to_add)

            meeting_object['sign_docs'] = docs_to_sign
            meeting_object['surveys'] = ws_methods.objects_list_to_json_list(meeting.survey_ids, ['id', 'title'])
            props = ['attendance','state','email','response_by', 'photo']
            meeting_object['attendees'] = ws_methods.objects_list_to_json_list(meeting.attendee_ids, props)

            for attendee in meeting_object['attendees']:
                if attendee['state'] == 'needsAction':
                    attendee['state'] = 'No Response'
                elif attendee['state'] == 'accepted':
                    attendee['state'] = 'Accepted'
                elif attendee['state'] == 'rejected':
                    attendee['state'] = 'Rejected'
                elif attendee['state'] == 'declined':
                    attendee['state'] = 'Declined'
            filters = [('res_id', '=', meeting_object['id']), ('model', '=', 'calendar.event'),
                       ('message_type', '=', 'comment'),('parent_id','=',False)]
            comments = req_env['mail.message'].search(filters , order='create_date desc')
            props = ['id', 'body','subtype_id.id', 'create_date']
            ar_comments = ws_methods.objects_list_to_json_list(comments, props)
            i= 0
            for com in comments:
                try:
                    user = com.author_id.user_id
                    ar_comments[i]['user'] = {'name': user.name, 'id': user.mp_user_id.id}

                    ar_children = []
                    if com.child_ids:
                        child_ids = com.child_ids.sorted(key=lambda p: (p.create_date))
                        ar_children = ws_methods.objects_list_to_json_list(child_ids, props)
                        j = 0
                        for child_com in child_ids:
                            try:
                                user1 = child_com.author_id.user_id
                                ar_children[j]['user'] = {'name': user1.name, 'id': user1.mp_user_id.id}
                            except:
                                a = 1
                            j = j + 1
                    ar_comments[i]["children"] = ar_children
                except:
                    a = 1
                i = i + 1

            id = int(values['id'])
            filters = []
            if 'meeting_type' in values:
                if values['meeting_type'] == 'completed':
                    filters.append(('publish', '=', True))
                    filters.append (('stop', '<', date_value))
                elif values['meeting_type'] == 'archived':
                    filters.append(('archived', '=', True))
                elif values['meeting_type'] == 'upcoming':
                    filters.append(('publish', '=', True))
                    filters.append (('stop', '>=', date_value))
            filters.append(('id', '<', id))
            prev = req_env['calendar.event'].search(filters, limit=1, order='id desc')
            if len(prev) > 0:
                prev = prev[0]
            if len(filters) > 0:
                filters[len(filters)-1] = ('id', '>', id)
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

            if not 'meeting_type' in values:
                values['meeting_type'] = 'upcoming'
            if values['meeting_type'] == 'completed':
                total_cnt = len(req_env['calendar.event'].search([('publish', '=', True),('stop', '<', date_value)]))
                meetings = req_env['calendar.event'].search([('publish', '=', True), (
                'stop', '<', date_value)], offset=offset, limit=limit)  # .filtered(lambda r: partner in r.partner_ids)
            elif values['meeting_type'] == 'archived':
                total_cnt = len(req_env['calendar.event'].search([('archived', '=', True)]))
                meetings = req_env['calendar.event'].search(
                    [('archived', '=', True)], offset=offset, limit=limit)  # .filtered(lambda r: partner in r.partner_ids)
            else:
                total_cnt = len(req_env['calendar.event'].search([('publish', '=', True), ('stop', '>=', date_value)]))
                meetings = req_env['calendar.event'].search([('publish', '=', True), (
                'stop', '>=', date_value)], offset=offset, limit=limit)  # .filtered(lambda r: partner in r.partner_ids)

            props = ['id', 'start', 'stop', 'duration', 'video_call_link', 'conference_bridge_numbe', 'pin',
                     'description', 'name', 'address', 'city', 'country_state.name', 'country.name', 'zip', 'street',
                     'company', 'status']
            meetings = ws_methods.objects_list_to_json_list(meetings, props)
            current_cnt = len(meetings)
            meetings = {'records': meetings, 'total': total_cnt, 'count': current_cnt}
            return ws_methods.http_response('', meetings)
        except:
            return ws_methods.handle()

    @http.route('/meeting/respond-invitation', type="http", csrf=False, auth='none', cors='*')
    def attendeeStatusHttp(self, **kw):
        return self.meetingAttendeeStatus(kw)

    @http.route('/meeting/respond-invitation-json', type="json", csrf=False, auth='none', cors='*')
    def attendeeStatusJson(self, **kw):
        req_body = http.request.jsonrequest
        return self.meetingAttendeeStatus(req_body)

    def meetingAttendeeStatus(self, values):
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
