from odoo import http
from odoo.addons.dn_base import ws_methods

doc_models = {
    'home': 'meeting_point.news.doc',
    'resource':'meeting_point.files',
    'meeting':'meeting_point.doc',
    'topic':'meeting_point.topicdoc',
    'signature':'meeting_point.document',
    'voting':'meeting_point.votingdocument'
}

doc_types = {
    'meeting_point.news.doc':'home',
    'meeting_point.files':'resource',
    'meeting_point.doc':'meeting',
    'meeting_point.topicdoc':'topic',
    'meeting_point.document':'signature',
    'meeting_point.votingdocument':'voting'
}

class ws(http.Controller):
    @http.route('/root-folder', type="http", csrf=False, auth='none', cors='*')
    def get_root_folder_http(self, **kw):
        return self.RootFolder(kw)

    @http.route('/root-folder-json', type="json", csrf=False, auth='none', cors='*')
    def get_root_folder_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.RootFolder(req_body)
    def RootFolder(self,values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            req_env = http.request.env

            if 'data' in values:
                values['data']
            limit = 0
            offset = 0
            if 'paging' in values:
                offset = values['paging']['offset']
                limit = values['paging']['limit']

            total_cnt = req_env['meeting_point.folder'].search_count([('parent_folder', '=', False)])
            folder = req_env['meeting_point.folder'].search([('parent_folder', '=', False)], offset=offset, limit=limit)
            current_cnt = len(folder)
            #folder = req_env['meeting_point.folder'].search([('parent_folder','=',False)])
            folderObject = ws_methods.objects_list_to_json_list(folder, ['id', 'name'])
            folderObject = {'records':folderObject, 'total':total_cnt, 'count':current_cnt}
            return ws_methods.http_response('', folderObject)
        except:
            return ws_methods.handle()

    @http.route('/folder-contents', csrf=False, auth='public', cors='*')
    def get_folder_contents_http(self, **kw):
        return self.folderContent(kw)

    @http.route('/folder-contents-json', type="json", csrf=False, auth='public', cors='*')
    def get_folder_contents_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.folderContent(req_body)

    def folderContent(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.not_logged_in()
            if 'data' in values:
                values = values['data']
            if (values['id']):
                id = values['id']
            obj = {}
            req_env = http.request.env
            folder = req_env['meeting_point.folder'].search([('id', '=', id)])
            files = folder.file_ids
            sub_folders = folder.sub_folders
            obj['sub_folders'] = ws_methods.objects_list_to_json_list(sub_folders, ['id', 'name', 'parent_folder.id'])
            obj['files'] = ws_methods.objects_list_to_json_list(files, ['id', 'name'])

            parent = folder.parent_folder
            parent_id = False
            if parent:
                parent_id = parent.id
            obj['parent_id'] = parent_id
            obj['name'] = folder.name

            ar = []
            while parent:
                ar.append({'id':parent.id, 'name':parent.name})
                parent = parent.parent_folder
            obj['parents'] = ar

            return ws_methods.http_response('', obj)
        except:
            return ws_methods.handle()

    @http.route('/ws/folder-doc', auth='none', csrf=False, cors='*')
    def get_folder_document_http(self, **kw):
        return self.get_home_doc(kw)

    @http.route('/ws/folder-doc-json', auth='none', type="json", csrf=False, cors='*')
    def get_folder_document_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.get_home_doc(req_body)

    def get_folder_doc(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.http_response('Could not authenticate')
            file = http.request.env['meeting_point.news.doc'].search([('id', '=', values['doc_id'])])

            return ws_methods.http_response('', {"doc": file['pdf_doc']})
        except:
            return ws_methods.handle('Document not found')


    @http.route('/meeting-doc', auth='none', csrf=False, cors='*')
    def get_meeting_doc_http(self, **kw):
        return self.get_meeting_doc(kw)

    @http.route('/meeting-doc-json', type="json", csrf=False, auth='none', cors='*')
    def get_meeting_doc_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.get_meeting_doc(req_body)

    def get_meeting_doc(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.http_response('Could not authenticate')
            file = http.request.env['meeting_point.doc'].search([('id', '=', values['doc_id'])])
            partner = http.request.env.user.partner_id
            attendee = http.request.env['calendar.attendee'].search(
                [('partner_id', '=', partner.id), ('event_id', '=', file.meeting_id.id)])
            if(attendee.id in file.meeting_id.attendee_ids._ids):
                return ws_methods.http_response('', {"doc": file['pdf_doc']})
            else:
                return ws_methods.http_response('Your are not attendee of the meeting')
        except:
            return ws_methods.handle('Document not found')
    # Routed to get unsigned document ,http and json Routes Api's
    @http.route('/sign-doc-original', auth='none', csrf=False, cors='*')
    def get_meeting_signature_original_http1(self, **kw):
        return self.get_meeting_unsigneddoc_original(kw)

    @http.route('/sign-doc-original-json', type="json", auth='none', csrf=False, cors='*')
    def get_meeting_signature_original_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.get_meeting_unsigneddoc_original(req_body)

    def get_meeting_unsigneddoc_original(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.http_response('Could not authenticate')
            file = http.request.env['meeting_point.document'].search([('id', '=', values['doc_id'])])
            # partner = http.request.env.user.partner_id
            # attendee = http.request.env['calendar.attendee'].search(
            #     [('partner_id', '=', partner.id), ('event_id', '=', file.meeting_id.id)])
            if (file.id):
                return ws_methods.http_response('', {"doc": file['attachment']})
            else:
                return ws_methods.handle('The current user is not authorized to view the document')
        except:
            return ws_methods.handle('Document not found')

    # Route To get Signed Document with validation if user is present in the meetings
    @http.route('/sign-doc',auth='none', csrf=False, cors='*')
    def get_meeting_signature_http(self, **kw):
        return self.get_meeting_signdoc_original(kw)

    @http.route('/sign-doc-json',type="json" ,auth='none', csrf=False, cors='*')
    def get_meeting_signature_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.get_meeting_signdoc_original(req_body)


    def get_meeting_signdoc_original(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.http_response('Could not authenticate')
            if 'data' in values:
                values = values['data']
            doc_id = values['doc_id']
            file = http.request.env['meeting_point.document'].search([('id', '=', doc_id)])
            # partner = http.request.env.user.partner_id
            # attendee = http.request.env['calendar.attendee'].search([('partner_id', '=', partner.id),('event_id','=',file.meeting_id.id)])
            if(file.id):
                return ws_methods.http_response('', {"doc": file['pdf_doc']})
            else:
                return ws_methods.handle('The current user is not authorized to view the document')
        except:
            return ws_methods.handle('Document not found')

    #Route to get document on HomePage
    @http.route('/home-doc', auth='none', csrf=False, cors='*')
    def get_home_document_http(self, **kw):
        return self.get_home_doc(kw)

    @http.route('/home-doc-json', auth='none',type="json", csrf=False, cors='*')
    def get_home_document_json(self, **kw):
        req_body = http.request.jsonrequest
        return self.get_home_doc(req_body)


    def get_home_doc(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.http_response('Could not authenticate')
            file = http.request.env['meeting_point.news.doc'].search([('id', '=', values['doc_id'])])
            return ws_methods.http_response('', {"doc": file['pdf_doc']})
        except:
            return ws_methods.handle('Document not found')

    @http.route('/doc/save-point-comment', type="http", csrf=False, auth='public', cors='*')
    def getAttendees(self, **kw):
        try:
            uid = ws_methods.check_auth(kw)
            if not uid:
                return ws_methods.not_logged_in()
            doc_type = kw.get('doc_type')
            res_id = kw.get('res_id')
            env = http.request.env
            meeting = False
            res_id = int(res_id)
            docname = ''
            topic_name = False
            if doc_type == 'topic':
                topic_doc = env['meeting_point.topicdoc'].search([('id', '=', res_id)])
                meeting = topic_doc.topic_id.meeting_id
                topic_name = topic_doc.topic_id.name
                docname = topic_doc.name
            elif doc_type == 'meeting':
                meeting_doc = env['meeting_point.doc'].search([('id', '=', res_id)])
                meeting = meeting_doc.meeting_id
                docname = meeting_doc.name
            if not meeting:
                return ws_methods.http_response('Invalid doc type=' + str(doc_type) + ' or id =' + (res_id))
            ids = []
            for attendee in meeting.attendee_ids:
                cid = attendee.partner_id.user_id.id
                if cid != uid:
                    ids.append(cid)

            res = {'meta': {'meeting': meeting.name, 'doc': docname}}
            if topic_name:
                res['meta']['topic'] = topic_name
            res['attendees'] = ids

            return ws_methods.http_response('', res)
        except:
            return ws_methods.handle()

    @http.route('/doc/binary', auth='public', csrf=False, cors='*')
    def get_document_http(self, **kw):
        doc = self.get_document_binary(kw)
        return doc

    @http.route('/doc/binary-json', auth='public',type="json", csrf=False, cors='*')
    def get_document_json(self, **kw):
        req_body = http.request.jsonrequest
        doc = self.get_document_binary(req_body)
        return doc

    def get_document_binary(self, values):
        try:
            uid = ws_methods.check_auth(values)
            if not uid:
                return ws_methods.http_response('Could not authenticate')
            if 'data' in values:
                values = values['data']
            doc_id = values.get('doc_id')
            if not doc_id:
                return ws_methods.http_response('Invalid document id')
            doc_id = int(doc_id)
            doc_model = values.get('doc_model')
            if not doc_model:
                doc_type = values.get('doc_type')
                model_name = doc_models[doc_type]
            else:
                model_name = doc_model
                doc_type = doc_types[model_name]
            if not model_name:
                return ws_methods.http_response('Invalid document model')
            file = http.request.env[model_name].search([('id', '=', doc_id)])
            if not file:
                return ws_methods.http_response('Document Not Found')
            attendees = []
            converted = False
            if file.pdf_doc:
                converted = file['pdf_doc'].decode('utf-8')
            doc = {'id': doc_id, "doc": converted, 'doc_nget-attendeesame': file['name'], 'type': doc_type}
            if file.html:
                doc['doc'] = file['html']
                doc['excel'] = 1

            if doc_type == 'resource':
                props = ['parent_folder.name', 'parent_folder.id']
            elif doc_type == 'meeting':
                attendeesList = file['meeting_id']['attendee_ids']
                for obj in attendeesList:
                    attendees.append({"name":obj['display_name'],"id":obj['id']})
                props = ['meeting_id.name', 'meeting_id.id']
            elif doc_type == 'topic':
                attendeesList = file['topic_id']['meeting_id']['attendee_ids']
                for obj in attendeesList:
                    attendees.append({"name": obj['display_name'], "id": obj['id']})
                props = ['topic_id.name', 'topic_id.id']
            elif doc_type == 'signature':
                props = ['meeting_id.name', 'meeting_id.id', 'mp_signature_status']
            elif doc_type == 'home':
                props = ['name']
            elif doc_type == 'voting':
                attendeesList = file['voting_id']['partner_ids']
                for obj in attendeesList:
                    attendees.append({"name":obj['display_name'],"id":obj['id']})
                props = ['voting_id.name', 'voting_id.id']
            else:
                return ws_methods.http_response('Invalid document type ' + doc_type)

            obj = ws_methods.object_to_json_object(file, props)
            for ke in obj:
                doc[ke] = obj[ke]
            doc['uid'] = uid
            doc['model'] = model_name
            doc['attendees'] = attendees
            res = ws_methods.http_response('', doc)
            return res
        except:
            return ws_methods.handle()