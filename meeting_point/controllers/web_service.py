from odoo import http
from odoo.addons.dn_base import ws_methods


class ws(http.Controller):
    @http.route('/meeting_point/search', type="http", csrf=False, auth='none', cors='*')
    def searchmp_http(self, **kw):
        return self.search_mp(kw)

    @http.route('/meeting_point/search-json', type="json", csrf=False, auth='none', cors='*')
    def searchmp_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.search_mp(req_body)

    def search_mp(self, kw):
        try:
            uid = ws_methods.check_auth(kw)
            try:
                uid = int(uid)
            except:
                return ws_methods.http_response(uid)
            model_name = kw['model']
            kw = kw['kw']
            results = []
            if not kw or kw == '':
                return ws_methods.http_response('',results)

            req_env = http.request.env
            models = {

                #'meeting_point.news': ['name', 'description'],
                #'meeting_point.news.video': ['name'],

                'calendar.event': ['name', 'description'],
                'survey.survey': ['title'],

                'meeting_point.users':['name', 'login'],

                'meeting_point.topic':['name', 'lead'],
                'meeting_point.folder': ['name'],
                'meeting_point.committee': ['name'],

                'meeting_point.document': ['name'],
                #'meeting_point.news.doc': ['name'],
                'meeting_point.files': ['name'],
                'meeting_point.doc': ['name'],
                'meeting_point.topicdoc': ['name'],
            }

            if model_name and model_name != '':
                models =  {model_name : models[model_name] }

            for model_name in models:
                filters = []
                first_field = False
                for field_name in models[model_name]:
                    if not first_field:
                        first_field = field_name
                    filter = (field_name, 'ilike', kw)
                    if len(filters) == 0:
                        filters = [filter]
                    else:
                        filters.insert(0, '|')
                        filters.append(filter)
                res = req_env[model_name].search(filters)
                for obj in res:
                    results.append({'id':obj.id, 'name':obj[first_field], 'model':model_name})

            return ws_methods.http_response('', results)
        except:
            return ws_methods.handle()

    @http.route('/meeting_point/search-docs', type="http", csrf=False, auth='none', cors='*')
    def searchmp_docs_http(self, **kw):
        return self.search_docs(kw)

    @http.route('/meeting_point/search-docs-json', type="json", csrf=False, auth='none', cors='*')
    def searchmp_docs_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.search_docs(req_body)

    def search_docs(self, kw):
        try:
            uid = ws_methods.check_auth(kw)
            try:
                uid = int(uid)
            except:
                return ws_methods.http_response(uid)
            model_name = kw['model']
            kw = kw['kw']
            results = []
            if not kw or kw == '':
                return ws_methods.http_response('',results)

            req_env = http.request.env
            models = {

                'meeting_point.document': ['name', 'content'],
                'meeting_point.news.doc': ['name', 'content'],
                'meeting_point.files': ['name', 'content'],
                'meeting_point.doc': ['name', 'content'],
                'meeting_point.topicdoc': ['name', 'content'],
            }

            if model_name and model_name != '':
                models =  {model_name : models[model_name] }

            for model_name in models:
                filters = []
                first_field = False
                for field_name in models[model_name]:
                    if not first_field:
                        first_field = field_name
                    filter = (field_name, 'ilike', kw)
                    if len(filters) == 0:
                        filters = [filter]
                    else:
                        filters.insert(0, '|')
                        filters.append(filter)
                res = req_env[model_name].search(filters)
                for obj in res:
                    results.append({'id':obj.id, 'name':obj[first_field], 'model':model_name})

            return ws_methods.http_response('', results)
        except:
            return ws_methods.handle()

    @http.route('/ws/mp-home', type="http", csrf=False, auth='none', cors='*')
    def mp_home_http(self, **kw):
        return self.mp_home(kw)

    @http.route('/ws/mp-home-json', type="json", csrf=False, auth='none', cors='*')
    def mp_home_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.mp_home(req_body)

    def mp_home(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            home = req_env['meeting_point.news'].search([('id', '=', 1)])

            home_object = ws_methods.object_to_json_object(home, ['id', 'title', 'photo', 'description'])

            home_object['doc_ids'] = ws_methods.objects_list_to_json_list(home.doc_ids, ['id', 'name'])
            home_object['video_ids'] = ws_methods.objects_list_to_json_list(home.video_ids, ['name', 'url'])
            for video in home_object['video_ids']:
                video['url'] = video['url'].replace('/watch?v=', '/embed/')
            to_do_items = {}
            props = ['id', 'start','stop', 'name', 'address', 'city', 'country_state.name'
                , 'country.name', 'zip', 'street', 'company', 'attendee_status'
                     ]
            to_do_items['pending_meetings'] = ws_methods.objects_list_to_json_list(home.pending_meetings, props)

            props = ['id', 'title', 'meeting_id.name']
            to_do_items['pending_surveys'] = ws_methods.objects_list_to_json_list(home.pending_surveys, props)

            for val in to_do_items['pending_surveys']:
                survey_title = val['title'].replace(' ','-')
                survey_title = survey_title.replace("'", '-')
                start_url = http.request.conf['host_url'] + 'survey/start/' + survey_title + '-' + str(val['id']) + '/phantom/' + values['db'] + '/' + values['token']
                val['start_url'] = start_url
            props = ['id','name', 'mp_signature_status', 'meeting_id.name']
            to_do_items['pending_documents'] = ws_methods.objects_list_to_json_list(home.pending_documents, props)

            public_events_list = home.public_events
            public_events = ws_methods.objects_list_to_json_list(public_events_list, ['id', 'start','stop', 'name'])

            home_object['to_do_items'] = to_do_items

            i = 0
            for ev in public_events_list:
                if req_env.user.partner_id in ev.partner_ids:
                    public_events[i]["my_event"] = 1
                    i += 1
            home_object['calendar'] = public_events

            return ws_methods.http_response('', home_object)
        except:
            return ws_methods.handle()

    @http.route('/ws/committees', type="http", csrf=False, auth='none', cors='*')
    def get_committees_http(self, **kw):
        return self.get_committees(kw)

    @http.route('/ws/committees-json', type="json", csrf=False, auth='none', cors='*')
    def get_committees_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.get_committees(req_body)

    def get_committees(self, values):
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

            total_cnt = len(req_env['meeting_point.committee'].search([]))
            committees = req_env['meeting_point.committee'].search([], offset=offset, limit=limit)
            current_cnt = len(committees)
            data = []
            for comit in committees:
                props = ['id', 'name', 'image_small']
                committee_members = ws_methods.objects_list_to_json_list(comit.user_ids, props)
                committee = {"name": comit.name, 'id': comit.id, "members": committee_members}
                data.append(committee)

            data = {'records':data, 'total':total_cnt, 'count':current_cnt}
            return ws_methods.http_response('', data)
        except:
            return ws_methods.handle()

    @http.route('/committee/details', type="http", csrf=False, auth='none', cors='*')
    def get_committee_http(self, **kw):
        return self.get_committee_details(kw)

    @http.route('/committee/details-json', type="json", csrf=False, auth='none', cors='*')
    def get_committee_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.get_committee_details(req_body)

    def get_committee_details(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            if 'data' in values:
                values = values['data']

            committee = req_env['meeting_point.committee'].search([('id','=',values['id'])])
            prev = req_env['meeting_point.committee'].search([('id','<',values['id'])], limit=1, order='id desc')
            next = req_env['meeting_point.committee'].search([('id','>',values['id'])], limit=1, order='id')

            props = ['id', 'name', 'image_small']
            committee_members = ws_methods.objects_list_to_json_list(committee.user_ids, props)
            committee = {"name": committee.name, 'id':committee.id, "members": committee_members,"summary":committee.summary}
            data = {"committee": committee, "next": next.id, "prev": prev.id}
            return ws_methods.http_response('', data)
        except:
            return ws_methods.handle()



    @http.route('/ws/post-comment', type="http", csrf=False, auth='public', cors='*')
    def mp_comment_http(self, **kw):
        return self.mp_comments(kw)

    @http.route('/ws/post-comment-json', type="json", csrf=False, auth='public', cors='*')
    def mp_comment_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.mp_comments(req_body)

    def mp_comments(self, values):
        try:
            # uid = 8
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env
            partner = req_env.user.partner_id
            if 'message_type' in values:
                datMessage = values['message_type']
            else:
                datMessage = 'comment'
            if 'model' in values:
                model = values['model']
            else:
                model = 'calendar.event'
            myModel = http.request.env['mail.message']
            Result = myModel.create(
                {'body': values['body'], 'parent_id': values['parent_id'], 'model': model, 'author_id': partner.id,
                 'res_id': values['res_id'], 'message_type': datMessage, 'subtype_id': values['subtype_id']})
            return ws_methods.http_response('', Result.id)
        except:
            return ws_methods.handle()

    @http.route('/ws/del-comment', type="http", csrf=False, auth='public', cors='*')
    def delete_comment_http(self, **kw):
        return self.delete_comments(kw)

    @http.route('/ws/del-comment-json', type="json", csrf=False, auth='public', cors='*')
    def delete_comment_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.delete_comments(req_body)

    def delete_comments(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            # req_env = http.request.env
            myModel = http.request.env['mail.message'].search([('id', '=', values['id'])])
            Result = myModel.unlink()
            return ws_methods.http_response('', Result)
        except:
            return ws_methods.handle()