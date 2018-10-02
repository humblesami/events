from odoo import http
from odoo.addons.dn_base import dn_dt
from odoo.addons.dn_base import ws_methods

class topic(http.Controller):


    @http.route('/topic/details', type="http", csrf=False, auth='none', cors='*')
    def mp_meeting_compact_http(self, **kw):
        return self.mp_meeting_topic(kw)


    @http.route('/topic/details-json', type="json", csrf=False, auth='none', cors='*')
    def mp_meeting_compact_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.mp_meeting_topic(req_body)


    def mp_meeting_topic(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            if 'data' in values:
                values = values['data']
            topic = req_env['meeting_point.topic'].search([('id', '=', int(values["id"]))])
            obj = ws_methods.object_to_json_object(topic, ['lead', 'name', 'duration', 'content', 'id', 'meeting_id.id', 'meeting_id.name'])
            try:
                duration = float(obj['duration'])
                obj['duration'] = dn_dt.hours_to_hoursNminutes(duration)
            except:
                a = 1
            obj["docs"] = ws_methods.objects_list_to_json_list(topic.document_ids, ['id', 'name'])
            return ws_methods.http_response('', obj)
        except:
            return ws_methods.handle()