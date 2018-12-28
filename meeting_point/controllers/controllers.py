import os
import json
import base64
from odoo import http
import datetime as dateval
from odoo.http import request
from odoo import SUPERUSER_ID
from odoo.api import Environment
from odoo.addons.dn_base import ws_methods
from odoo import registry as registry_get
from PIL import Image, ImageFont, ImageDraw
from odoo.addons.dn_auth.controllers.ctl_dn_auth import AuthSession

class dn_auth(AuthSession):

    @http.route(csrf=False)
    def get_site_users(self, **kw):
        users = []
        try:            
            category_id = http.request.env['ir.module.category'].sudo().search([('name', '=', 'MeetingPoint')]).id
            domain = ['|', ('user_id.groups_id.category_id', '=', category_id), ('is_committee', '=', True)]
            rows = http.request.env['res.partner'].search(domain).sorted(key=lambda p: (p.name))
    
            #     return domain
            for partner in rows:
                user = {'pid':partner.id,  'name': partner.name, 'email': partner.email}
                if partner.user_id:
                    user['id'] = partner.user_id.id
                users.append(user)
            return ws_methods.http_response('', users)
        except:
            return ws_methods.handle()

    @http.route('/committee_to_users',csrf=False)
    def committee_to_users(self, **kw):
        try:
            partner_id = int(kw['pid'])
            committee = http.request.env['meeting_point.committee'].search([('partner_id','=',partner_id)])
            user_ids = []
            for mpuser in committee.user_ids:
                user_ids.append(mpuser.user_id.id)
            return ws_methods.http_response('',user_ids)
        except:
            return ws_methods.handle()



class meeting(http.Controller):

    @http.route('/meeting/decline/<nam>/<db>/<token>/<assistant>', type='http', auth='public')
    def decline_meeting(self, nam, db, token,assistant):
        res = '<div class="o_logo" style="text-align:center">';
        res += '<img class="img img-responsive center-block" src="/web/binary/company_logo">'
        res += '</div>'
        res += '<h2 style="color:green; text-align:center">'
        res += '<h2 style="text-align:center">'
        try:
            registry = registry_get(db)
            with registry.cursor() as cr:
                env = Environment(cr, SUPERUSER_ID, {})
                attendee = env['calendar.attendee'].search([('access_token', '=', token)])
                if attendee:
                    if attendee.state != 'declined':
                        attendee.do_decline()
                        if assistant=='0':
                            attendee.response_by='Self'
                        else:
                            attendee.response_by = 'Assistant:' + str(attendee.partner_id.mp_user_id.admin_first_name) + " " + str(attendee.partner_id.mp_user_id.admin_last_name)


                        res += 'You have declined to attend the meeting : ' + nam
                    else:
                        res += 'You have already declined to attend the meeting : ' + nam
                else:
                    res += 'Token Expired'
        except:
            res += 'Failed to perform the action'

        res += '<span></h2>'
        return res

    @http.route('/meeting/accept/<nam>/<db>/<token>/<assistant>', type='http', auth='public')
    def accept_meeting(self, nam, token, db,assistant):
        res = '<div class="o_logo" style="text-align:center">';

        res += '<img class="img img-responsive center-block" src="/web/binary/company_logo">'
        res += '</div>'
        res += '<h2 style="color:green; text-align:center">'
        res += '<h2 style="text-align:center">'
        try:
            registry = registry_get(db)
            with registry.cursor() as cr:
                env = Environment(cr, SUPERUSER_ID, {})
                attendee = env['calendar.attendee'].search([('access_token', '=', token)])
                if attendee:
                    if attendee.state != 'accepted':
                        attendee.do_accept()
                        if assistant=='0':
                            attendee.response_by='Self'
                        else:
                            attendee.response_by = 'Assistant:' + str(attendee.partner_id.mp_user_id.admin_first_name) + " " + str(attendee.partner_id.mp_user_id.admin_last_name)

                        res += 'You have accepted to attend the meeting : ' + nam
                    else:
                        res += 'You have already accepted to attend the meeting : ' + nam
                else:
                    res += 'Token Expired'
        except:
            res += 'Failed to perform the action'

        res += '<span></h2>'
        return res


    @http.route('/meeting_point/get_committee/<id>', csrf=False)
    def get_committee(self, id):
        try:
            req_env = http.request.env
            committee = req_env['meeting_point.committee'].search([('id','=',id)])
            data = []
            for mem in committee.user_ids:
                member = {"id": mem.id, "name": mem.name}
                data.append(member)
            return ws_methods.http_response('', data)
        except:
            return ws_methods.handle()

    @http.route('/meeting_point/get_committees', csrf=False)
    def get_committees(self, **kw):
        try:
            req_env = http.request.env
            committees = req_env['meeting_point.committee'].search([])
            data = []
            for comit in committees:
                committee_members = []
                for mem in comit.user_ids:
                    member = {"id":mem.id,"name":mem.name}
                    committee_members.append(member)
                committee = {"name": comit.name, "members":committee_members}
                data.append(committee)
            return ws_methods.http_response('', data)
        except:
            return ws_methods.handle()

    @http.route('/meeting_point/topic_priority', csrf=False)
    def topic_priority(self, **kw):
        try:
            if not kw:
                return ws_methods.http_response("Invalid Input")
            req_env = http.request.env

            data = kw['data']
            data = json.dumps(data)
            topic_model = req_env['meeting_point.topic']
            for item in data:
                topic = topic_model.search(['id','=',item['id']])
                topic.priority = item['priority']
            return ws_methods.http_response('', {"done": True})
        except:
            return ws_methods.handle()

    @http.route('/meeting_point/get_signature',auth='public', csrf=False, cors='*')
    def get_signature(self, **kw):
        try:
            doc_sign = self.get_doc_signature(kw)
            if not 'sign' in doc_sign:
                return ws_methods.http_response(doc_sign)
            signature = doc_sign['sign']

            draw_signature = signature.draw_signature
            if draw_signature:
                draw_signature = draw_signature.decode('utf-8')
            else:
                draw_signature = ''
            return ws_methods.http_response('', {"signature": draw_signature})
        except:
            return ws_methods.handle()

    @http.route('/meeting_point/get_pdf',auth='public', csrf=False, cors='*')
    def get_pdf(self, **kw):
        doc_id = kw['document_id']
        doc=http.request.env['meeting_point.document'].sudo().search([('id','=',doc_id)])
        pdf = doc.pdf_doc.decode('utf-8')
        return ws_methods.http_response('', {"pdf_binary": pdf})

    def get_doc_signature(self, kw):
        if not kw:
            return ws_methods.http_response("Invalid Input")
        doc_id = kw.get('document_id')
        if not doc_id:
            return ws_methods.http_response("Invalid Document Id")

        sign_token = False
        uid = http.request.uid
        if not uid or uid == 4:
            token = kw.get('token')
            if token and kw.get('db'):
                uid = ws_methods.check_auth(kw)
            else:
                sign_token = token

        if not uid and not sign_token:
            return "Unauthorized"

        my_model = http.request.env['meeting_point.document']
        doc = my_model.sudo().search([('id', '=', doc_id)])
        if not doc:
            return "Document not found"
        if sign_token:
            signature = doc.signature_ids.filtered(lambda r: r.token == sign_token)
        else:
            signature = doc.signature_ids.filtered(lambda r: r.user_id.id == uid)
        if not signature:
            return "Signature not found"
        return {'doc': doc, 'sign': signature}

    @http.route('/meeting_point/save_signature',auth='public', csrf=False, cors='*')
    def save_signature(self, **kw):

        try:
            doc_sign = self.get_doc_signature(kw)
            if not 'sign' in doc_sign:
                return ws_methods.http_response(doc_sign)
            signature = doc_sign['sign']
            doc = doc_sign['doc']

            if kw['type'] == "auto":
                curr_dir = os.path.dirname(__file__)
                pth = curr_dir.replace('controllers', 'doc_signs')
                font_dir = curr_dir.replace('controllers','static')

                font = ImageFont.truetype(font_dir+"/FREESCPT.TTF", 200)
                sz=font.getsize(signature.user_id.name)
                sz = (sz[0] + 50, sz[1])
                img = Image.new('RGB', sz, (255, 255, 255))
                d = ImageDraw.Draw(img)
                d.text((40, 0), signature.user_id.name, (0, 0, 0), font=font)
                uid=http.request.env.user.id
                img_path=pth + "/"+str(uid)+"piic.png"
                img.save(img_path)

                res = open(img_path, 'rb')
                read = res.read()
                binary_signature = base64.encodebytes(read)
                binary_signature= binary_signature.decode('utf-8')
                return ws_methods.http_response('', {"signature": binary_signature})
            else:
                binary_signature = kw.get('binary_signature')
                if not binary_signature:
                    return ws_methods.http_response("Please provide signatures")
                if kw['type'] == "draw":
                    signature.write({'draw_signature': binary_signature})
                elif kw['type'] == "upload":
                    signature.write({'draw_signature': binary_signature, 'filename': kw['filename']})
                else:
                    return ws_methods.http_response("Unknown sign type")

            doc.embed_signature(doc)
            doc.notify_signed_mail(signature.id)
            pdf = doc.pdf_doc.decode('utf-8')
            return ws_methods.http_response('', {"signature":binary_signature,"pdf_binary": pdf, "doc":pdf})
        except:
            return ws_methods.handle()

    @http.route('/meeting_point/save_signature_doc', auth='public', csrf=False, cors='*')
    def save_signature_doc(self, **kw):
        try:
            uid = ws_methods.check_auth(kw)
            if not uid:
                return ws_methods.not_logged_in()
            doc_sign = self.get_doc_signature(kw)
            if not 'sign' in doc_sign:
                return ws_methods.http_response(doc_sign)
            signature = doc_sign['sign']
            doc = doc_sign['doc']

            if kw['type'] == "auto":
                curr_dir = os.path.dirname(__file__)
                pth = curr_dir.replace('controllers', 'doc_signs')
                font_dir = curr_dir.replace('controllers', 'static')

                font = ImageFont.truetype(font_dir + "/FREESCPT.TTF", 200)
                sz = font.getsize(signature.user_id.name)
                sz = (sz[0] + 50, sz[1])
                img = Image.new('RGB', sz, (255, 255, 255))
                d = ImageDraw.Draw(img)
                d.text((40, 0), signature.user_id.name, (0, 0, 0), font=font)
                uid = http.request.env.user.id
                img_path = pth + "/" + str(uid) + "piic.png"
                img.save(img_path)

                res = open(img_path, 'rb')
                read = res.read()
                binary_signature = base64.encodebytes(read)
                binary_signature = binary_signature.decode('utf-8')
                return ws_methods.http_response('', {"signature": binary_signature})
            else:
                binary_signature = kw.get('binary_signature')
                if not binary_signature:
                    return ws_methods.http_response("Please provide signatures")
                if kw['type'] == "draw":
                    signature.write({'draw_signature': binary_signature})
                elif kw['type'] == "upload":
                    signature.write({'draw_signature': binary_signature, 'filename': kw['filename']})
                else:
                    return ws_methods.http_response("Unknown sign type")

            doc.embed_signature(doc)
            doc.embed_signature(doc)
            doc.notify_signed_mail(signature.id)
            pdf = doc.pdf_doc.decode('utf-8')
            doc = {'id': doc.id, "doc": pdf, 'doc_name': doc.name, 'type': 'signature', 'uid': uid}
            return ws_methods.http_response('', doc)
        except:
            return ws_methods.handle()

    @http.route('/meeting_point/dashboard', website=True)
    def admindashboard(self):
        outputdata = {"error": " Error somewhere", "data": {"counts":{}}}

        environment = http.request.env
        modelName = 'calendar.event'

        # recordFilter = []
        # records = environment[modelName].search(recordFilter)
        results = []
        # for rec in records:
        #     results.append({"subject": rec.name, "sdate": rec.start, "edate": rec.stop, "location": rec.location,
        #                     "duration": rec.duration})
        outputdata["data"]["meetings"] = results


        modelName = 'res.users'
        records = environment[modelName].search([])
        results = []
        for rec in records:
            location = self.getLocationDetails(rec)
            results.append({"name": rec.name, "location": location, "company": rec.company_id.name, "image":rec.image})
        outputdata["data"]["directorProfiles"] = results

        modelName = 'survey.survey'
        recordFilter = [('stage_id', '=', '7')]
        #recordFilter = []
        records = environment[modelName].search(recordFilter)
        results = {"names": [], "responses": []}
        for rec in records:
            results["names"].append(rec.title)
            recordFilter = [('survey_id', '=', rec.id)]
            modelName = 'survey.user_input_line'
            temp = environment[modelName].search(recordFilter)
            temp = len(temp)
            results["responses"].append(temp)
        outputdata["data"]["surveydata"] = results

        surveyCount = 0;
        surveysPerMonth = {"months": [], "counts": []}
        sql = "SELECT cast( to_char(create_date, 'YYYY-MM') as varchar) syear_month ,cast(count(*) as integer)";
        sql += " FROM survey_survey WHERE create_date >= CURRENT_DATE - interval '1' year group by syear_month";
        sql += " order by syear_month desc;"
        curs = environment.cr
        curs.execute(sql)
        results = curs.fetchall()
        for rec in results:
            surveysPerMonth["months"].append(rec[0])
            surveysPerMonth["counts"].append(rec[1])
            surveyCount += rec[1]

        outputdata["data"]["surveysPerMonth"] = surveysPerMonth

        outputdata["data"]["counts"]["directorCount"] = len(outputdata["data"]["directorProfiles"])
        outputdata["data"]["counts"]["meetingCount"] = len(outputdata["data"]["meetings"])
        outputdata["data"]["counts"]["surveyCount"] = surveyCount

        outputdata["error"] = ""
        results = json.dumps(outputdata)
        return results

    @http.route('/meeting_point/getfile/<string:modelname>/<string:fieldname>/<string:id>', auth='public')
    def readfile(self, modelname, fieldname, id):
        environment = http.request.env
        records = environment[modelname].search([('id', '=', id)])
        result = 'empty'
        for rec in records:
            result = rec[fieldname]
        return result


    @http.route('/aameeting/delpartners/', auth='public')
    def delpartners(self):
        try:
            errorMessage = "Done"
            partners = http.request.env['res.partner'].search([
                ('user_id', '=', False), ('is_company', '=', False), ('x_committee_id', '=', False)
            ])
            for p in partners:
                if p.name != 'Administrator':
                    p.unlink()
            return ws_methods.http_response('',"Done")
        except:
            return ws_methods.handle()

    @http.route('/aameeting/menuicons', website=True)
    def getmenuicons(self, inputdata):
        records = http.request.env['x_menu_icons'].search([])
        results = []

        for rec in records:
            results.append({"class": rec.x_name, "menu_id": rec.x_menu_id.id, "url": rec.x_url})
        results = {"error": "", "data": results}
        results = json.dumps(results)
        return results

    def getLocationDetails(self, rec):
        location = ''
        if rec.street:
            location = location + ' ' + rec.street
        if rec.city:
            location = location + ' ' + rec.city
        if rec.state_id:
            location = location + ' ' + rec.state_id.name
        if rec.country_id:
            location = location + ' ' + rec.country_id.name
        return location

    # Public signature
    @http.route(['/meeting_point/sign/<string:token>'], type='http', auth='public', website=True)
    def start_sign(self,token=None, **post):
        if not token:
            return
        else:
            sign = request.env['e_sign.signature'].sudo().search([('token', '=', token)], limit=1)

            if not sign:
                return request.render("website.403")
            doc = request.env['meeting_point.document'].sudo().search([('id','=',sign.document_id)])
            sign_status = self.compute_sign_status(doc,token)
            data = {'document': doc, 'page': None, 'token': sign.token, 'status': sign_status}
            return request.render('meeting_point.meeting_point_sign_page', data)


    def compute_sign_status(self,doc,token):
        pending = False
        found = False
        m_signature_status = "Not required"
        for signature in doc.signature_ids:
            if signature.token == token:
                found = True
                if not signature.draw_signature:
                    pending = True
        if pending:
            m_signature_status = "Pending"
        else:
            if found:
                m_signature_status = "Completed"
        return  m_signature_status

    @http.route('/meeting_point/user_info', csrf=False)
    def get_user_info(self, **kw):
        try:
            req_env = http.request.env
            users = req_env['meeting_point.users'].search([])
            data = []
            for user in users:
                user_object = {"name": user.name, "email": user.login, "id": user.id}
                data.append(user_object)
            return ws_methods.http_response('', data)
        except:
            return ws_methods.handle()


    @http.route('/meetingData', type="http", auth='public', csrf=False, cors='*')
    def meetingUserData(self,**kw):
        try:
            uid = 1
            meetingData = []
            dbname = http.request.db
            dbname=dbname.encode("utf-8")
            # dbname = self._cr.dbname,
            baseurl= http.request.env['ir.config_parameter'].sudo().get_param('web.base.url', default='http://localhost:8069').encode("utf-8")
            date_value = dateval.datetime.now()
            date_value = date_value.strftime('%Y-%m-%d %H:%M:%S')
            filters = [('publish', '=', True), ('start_datetime', '>=', date_value)]
            partner = http.request.env.user.partner_id
            meetings =http.request.env['calendar.event'].search(filters).filtered(lambda r: partner in r.partner_ids)
            survey = []
            dataValue={"data": {"surveys": [] , "meetings": [],'documents':[]}},
            for event in meetings:
                count=0
                attendee = http.request.env['calendar.attendee'].sudo().search([('partner_id','=',partner.id),('event_id','=',event.id)])
                acceptUrl  = (baseurl+'/meeting/accept/'+attendee.event_id.name+'/'+dbname+'/'+attendee.access_token).encode("utf-8")
                declineUrl = (baseurl+'/meeting/decline/'+attendee.event_id.name+'/'+dbname+'/'+attendee.access_token).encode("utf-8")
                meeting_object = {"name":event.name,"start_time":event.start_datetime,"stop_time":event.stop_datetime,"accept":acceptUrl,"decline":declineUrl}
                surveys = http.request.env['survey.survey'].sudo().search(
                    [('meeting_id', '=', event.id)])
                for val in surveys:
                    start_url =baseurl+'/survey/start/'+(val.title).encode("utf-8")+'-'+str(val.id)+'/phantom'
                    survey_object={"name":val.title,'start_url':start_url}
                    dataValue[0]['data']['surveys'].append(survey_object)
                    # survey.append(survey_object)
                document = http.request.env['meeting_point.document'].sudo().search(
                    [('meeting_id', '=', event.id)])
                documentArray=[]
                for data in document:
                    for value in data.user_ids:
                        if (value.id== uid):
                            document_object = {"name":data.name,'pdf_doc':data.pdf_doc,'meeting_name':event.name}
                            dataValue[0]['data']['documents'].append(document_object)
                            # documentArray.append(document_object)
                meetingData.append(survey)
                dataValue[0]['data']['meetings'].append(meeting_object)
                # meetingData.append(meeting_object)
                count=dataValue[0]
            return ws_methods.http_response('', dataValue[0]['data'])
        except Exception:
            ws_methods.handle()

    @http.route('/get-allusers', type="http", auth='public', csrf=False, cors='*')
    def fetch_all_users(self,**kw):
        try:
            data = kw.get('data')
            kw = json.loads(data)
            uid = ws_methods.check_auth(kw)
            if not uid:
                return ws_methods.not_logged_in()

            req_env = http.request.env
            partner  = req_env['res.partner'].search([ ('user_id', '=', uid)])
            filters = [('publish', '=', True),('archived', '=', False)]
            # res = req_env['calendar.event'].search(filter)
            meetings = req_env['calendar.event'].search(filters).filtered(lambda r: partner in r.partner_ids)
            partner_ids = []
            for value in meetings:
                partner_ids = partner_ids+value.partner_ids.ids
            finalData = sorted(set(partner_ids))
            dataJson ={}
            res = []
            for looper in finalData:
                data = req_env['res.users'].sudo().search([('partner_id', '=', looper)])
                dataJson['name'] = data.name
                dataJson['uid'] = data.id
                json_data = dataJson
                res.append(json_data)
            json.dumps(res)
            return ws_methods.http_response('', res)
        except Exception:
            ws_methods.handle()


