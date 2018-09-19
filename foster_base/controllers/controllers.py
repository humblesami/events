# -*- coding: utf-8 -*-

import os
import json
import base64

import werkzeug

from odoo import http
import datetime as dateval
from odoo.http import request
from odoo import SUPERUSER_ID
from odoo.api import Environment
from odoo.addons.dn_base import ws_methods
from odoo import registry as registry_get
from PIL import Image, ImageFont, ImageDraw


class Foster(http.Controller):

    @http.route(['/foster/application'],
                type="http", auth="public", website=True, csrf=True)
    def fill_application(self,**kwargs):
        states = request.env['res.country.state'].search([])
        countries = request.env['res.country'].search([])
        return request.render('foster_base.foster_application_page',{'states':states,'countries':countries})

    @http.route(['/partner/application'],
                type="http", auth="public", website=True, csrf=True)
    def fill__partner_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        return request.render('foster_base.foster_partner_page',{'fosters':fosters})



    @http.route('/application/submit', type="http", auth="public", website=True, csrf=True)
    def application_process(self,id, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value

        if http.request.env.user.name != "Public user":
            foster = request.env['foster.applicants'].sudo().create({'last_name': values['last_name'],
            'first_name':values['first_name'],'middle_name':values['middle_name'],'other_name':values['other_name'],
            'sex':values['sex'],'state':values['states'],'place_of_birth':values['place_of_birth'],
            'birthdate':values['birth_date'],'address':values['address'],'town':values['town'],'zip':values['zip'],
            'home_phone':values['home_phone'],'work_phone':values['work_phone'],'cell_phone':values['cell_phone'],
            'security_number':values['security_number'],'applicant_email':values['email'],
            'date':values['date'],'citizen_ship':values['countries'],'immigration':values['immigration'],
            'education':values['education'],'last_grade':values['last_grade'],'lang_primary':values['lang_primary'],
            'lang_other':values['lang_other'],'comp_primary':values['comp_primary'],'comp_other':values['comp_other'],
            'note':values['note'],'current_marriage_date':values['current_marriage_date'],'previous_marriage_date':values['previous_marriage_date'],
            'previous_marriage_date_end':values['previous_marriage_date_end'],'employment_type':values['employment_type'],
            'days_worked':values['days_worked'],'date_employment_began':values['date_employment_began'],'income_year':values['income_year'],
            'employer_name':values['employer_name'],'employer_phone':values['employer_phone'],'house':values['house'],'current_address_period':values['current_address_period'],
            'name_of_contact':values['name_of_contact'],'phone_of_contact':values['phone_of_contact'],'previous_address':values['previous_address'],'file':values['file']})


            return werkzeug.utils.redirect("/partner/application?foster=%s"%(foster.id))

    @http.route('/partner/submit', type="http", auth="public", website=True, csrf=True)
    def application_process_partner(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value

        foster = request.env['foster.applicants'].search([('id','=',values['fosters'])])
        partner = foster.patner


        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['foster.partner'].sudo().create({'spouse_last_name': values['spouse_last_name'],
            'spouse_first_name': values['spouse_first_name'],'spouse_middle_name':values['spouse_middle_name'],
            'spouse_other_name':values['spouse_other_name'],'age':values['age'],'co_home_phone':values['co_home_phone'],
            'co_cell_phone':values['co_cell_phone'],'co_work_phone':values['co_work_phone'],
            'security_number':values['security_number'],'co_applicant_email':values['co_applicant_email'],
            'sex':values['sex'],'birthdate':values['birthdate'],'place_of_birth':values['place_of_birth'],
             'partner_id':foster.id
                                                         })
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/partner/application?foster=%s"%(foster.id))
            else:
                return werkzeug.utils.redirect("/family/members?foster=%s"%(foster.id))

    @http.route(['/family/members'],
                type="http", auth="public", website=True, csrf=True)
    def family_members_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        return request.render('foster_base.foster_family_members_page',{'fosters':fosters})

    @http.route('/family/members/submition', type="http", auth="public", website=True, csrf=True)
    def application_process_family_members(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['foster.family.members'].sudo().create({'full_name': values['full_name'],
                                                         'sex': values['sex'],
                                                                'birth_date': values['birth_date'],
                                                                'security_number': values['security_number'],
                                                                'living_at_hom': values['living_at_hom'],
                                                                'relation_to_applicant': values['relation_to_applicant'],
                                                                'members':foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/family/members?foster=%s"%(foster.id))
            else:
                return werkzeug.utils.redirect("/other/members?foster=%s"%(foster.id))


    # foster other living members in home
    @http.route(['/other/members'],
                type="http", auth="public", website=True, csrf=True)
    def other_members_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        return request.render('foster_base.foster_other_members_page',{'fosters':fosters})

    @http.route('/other/members/submition', type="http", auth="public", website=True, csrf=True)
    def application_process_other_members(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['foster.other.members'].sudo().create({'full_name': values['full_name'],
                                                                'sex': values['sex'],
                                                                'birth_date': values['birth_date'],
                                                                'security_number': values['security_number'],
                                                                'living_at_hom': values['living_at_hom'],
                                                                'nature': values['nature'],
                                                            'other_members':foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/other/members?foster=%s"%(foster.id))
            else:
                return werkzeug.utils.redirect("/family/childcare?foster=%s"%(foster.id))

    # Family Based Child Care

    @http.route(['/family/childcare'],
                type="http", auth="public", website=True, csrf=True)
    def family_childcare_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        return request.render('foster_base.foster_family_based_child_care',{'fosters':fosters})

    @http.route('/family/childcare/submition', type="http", auth="public", website=True, csrf=True)
    def application_process_family_childcare(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value

        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['family.childcare'].sudo().create({'name': values['name'],
                                                           'care_agent':foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/family/childcare?foster=%s"%(foster.id))
            else:
                return werkzeug.utils.redirect("/disable/individuals/childcare?foster=%s"%(foster.id))


    # Disabled individuals care
    @http.route(['/disable/individuals/childcare'],
                type="http", auth="public", website=True, csrf=True)
    def disabled_childcare_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        return request.render('foster_base.foster_disable_individual_care',{'fosters':fosters})

    @http.route('/diable/childcare/submition', type="http", auth="public", website=True, csrf=True)
    def application_process_diabled_childcare(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['disable.childcare'].sudo().create({'name': values['name'],'care_taker':values['care_taker'],
                                                'reason':values['reason'],'agency':values['agency'],
                                                              'childcare':foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/disable/individuals/childcare?foster=%s"%(foster.id))
            else:
                return werkzeug.utils.redirect("/childcare/plan?foster=%s"%(foster.id))


    # Child care plan person

    @http.route(['/childcare/plan'],
                type="http", auth="public", website=True, csrf=True)
    def plan_childcare_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        return request.render('foster_base.foster_child_care_plan', {'fosters': fosters})

    @http.route('/childcare/plan/submition', type="http", auth="public", website=True, csrf=True)
    def application_process_plan_childcare(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['childcare.plan.person'].sudo().create(
                {'name': values['name'],'plan_person':foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/childcare/plan?foster=%s" % (foster.id))
            else:
                return werkzeug.utils.redirect("/childcare/services?foster=%s" % (foster.id))

    # Child care plan services
    @http.route(['/childcare/services'],
                type="http", auth="public", website=True, csrf=True)
    def plan_childcare_application_services(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        return request.render('foster_base.foster_any_other_service_plan', {'fosters': fosters})

    @http.route('/childcare/services/submition', type="http", auth="public", website=True, csrf=True)
    def application_process_plan_childcare_services(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['childcare.plan.services'].sudo().create(
                {'name': values['name'],'description':values['description'],'plan_service':foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/childcare/services?foster=%s" % (foster.id))
            else:
                return werkzeug.utils.redirect("/health/history?foster=%s" % (foster.id))

    # health history
    @http.route(['/health/history'],
                type="http", auth="public", website=True, csrf=True)
    def healths_history_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        return request.render('foster_base.foster_health_history', {'fosters': fosters})

    @http.route('/health/history/submition', type="http", auth="public", website=True, csrf=True)
    def application_process_healths_history(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['health.history'].sudo().create(
                {'member_name': values['member_name'], 'provider_name': values['provider_name'],
                 'address':values['address'],'phone':values['phone'],'treat_type':values['treat_type'],
                 'treated':foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/health/history?foster=%s" % (foster.id))
            else:
                return werkzeug.utils.redirect("/medical/history?foster=%s" % (foster.id))

    # health history2
    @http.route(['/medical/history'],
                type="http", auth="public", website=True, csrf=True)
    def health_medicals_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        return request.render('foster_base.foster_health_history_second', {'fosters': fosters})

    @http.route('/medical/history/submition', type="http", auth="public", website=True, csrf=True)
    def application_process_medicl_history(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['medical.problems'].sudo().create(
                {'member_name': values['member_name'], 'provider_name': values['provider_name'],
                 'address': values['address'], 'phone': values['phone'], 'date': values['date'],
                 'current_problem':foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/medical/history?foster=%s" % (foster.id))
            else:
                return werkzeug.utils.redirect("/emergency/contact?foster=%s" % (foster.id))

    # emergency contact
    @http.route(['/emergency/contact'],
                type="http", auth="public", website=True, csrf=True)
    def emergency_person_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        return request.render('foster_base.foster_emergency_contact_person', {'fosters': fosters})

    @http.route('/emergency/contact/submition', type="http", auth="public", website=True, csrf=True)
    def application_process_emergency_contact_history(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['foster.emergency.contact.person'].sudo().create(
                {'name': values['name'], 'telephone': values['telephone'],
                 'hours_available': values['hours_available'],
                 'applicant':foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/emergency/contact?foster=%s" % (foster.id))
            else:
                return werkzeug.utils.redirect("/applicant/pets?foster=%s" % (foster.id))


    # pets
    @http.route(['/applicant/pets'],
                type="http", auth="public", website=True, csrf=True)
    def pets_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        return request.render('foster_base.foster_pets', {'fosters': fosters})

    @http.route('/applicant/pets/submition', type="http", auth="public", website=True, csrf=True)
    def application_process_pets_history(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['applicant.pets'].sudo().create(
                {'name': values['name'], 'breed': values['breed'],
                 'pets': foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/applicant/pets?foster=%s" % (foster.id))
            else:
                return werkzeug.utils.redirect("/applicant/drivers?foster=%s" % (foster.id))

    # drivers
    @http.route(['/applicant/drivers'],
                type="http", auth="public", website=True, csrf=True)
    def divers_history_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        return request.render('foster_base.foster_divers', {'fosters': fosters})

    @http.route('/applicant/drivers/submition', type="http", auth="public", website=True, csrf=True)
    def application_process_drivers_history(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['foster.drivers'].sudo().create(
                {'name': values['name'], 'license_number': values['license_number'],
                 'expiration_date':values['expiration_date'],'state':values['states'],
                 'driver_info': foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/applicant/drivers?foster=%s" % (foster.id))
            else:
                return werkzeug.utils.redirect("/foster/history?foster=%s" % (foster.id))


    # foster history

    @http.route(['/foster/history'],
                type="http", auth="public", website=True, csrf=True)
    def fosters_history_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        return request.render('foster_base.foster_care_history', {'fosters': fosters})

    @http.route('/foster/history/submition', type="http", auth="public", website=True, csrf=True)
    def application_proces_foster_health_history(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['foster.history'].sudo().create(
                {'name': values['name'], 'date': values['date'],
                 'adopt': foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/foster/history?foster=%s" % (foster.id))
            else:
                return werkzeug.utils.redirect("/adoptive/history?foster=%s" % (foster.id))

    # foster history 2

    @http.route(['/adoptive/history'],
                type="http", auth="public", website=True, csrf=True)
    def health_adoptive_history_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        return request.render('foster_base.foster_care_history_second', {'fosters': fosters})

    @http.route('/adoptive/history/submition', type="http", auth="public", website=True, csrf=True)
    def foster_adoptive_history(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['providing.foster'].sudo().create(
                {'name': values['name'], 'agency': values['agency'],
                 'provide': foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/adoptive/history?foster=%s" % (foster.id))
            else:
                return werkzeug.utils.redirect("/medical/references?foster=%s" % (foster.id))


    # medical references
    @http.route(['/medical/references'],
                type="http", auth="public", website=True, csrf=True)
    def medical_refernces_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        states = request.env['res.country.state'].search([])
        return request.render('foster_base.medical_references', {'fosters': fosters,'states':states})

    @http.route('/medical/references/submition', type="http", auth="public", website=True, csrf=True)
    def medical_refernces_submition(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['medical.references'].sudo().create(
                {'name': values['name'], 'address': values['address'],'city':values['address'],
                 'state':values['states'],'zip':values['zip'],'phone':values['phone'],
                 'applicant_id': foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/medical/references?foster=%s" % (foster.id))
            else:
                return werkzeug.utils.redirect("/employer/references?foster=%s" % (foster.id))


    # employer references
    @http.route(['/employer/references'],
                type="http", auth="public", website=True, csrf=True)
    def employer_refrence_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        states = request.env['res.country.state'].search([])
        return request.render('foster_base.employer_references', {'fosters': fosters,'states':states})

    @http.route('/employer/references/submition', type="http", auth="public", website=True, csrf=True)
    def employer_refernces_submition(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['employer.references'].sudo().create(
                {'name': values['name'], 'address': values['address'], 'city': values['address'],
                 'state': values['states'], 'zip': values['zip'], 'phone': values['phone'],
                 'applicant_employer_id': foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/employer/references?foster=%s" % (foster.id))
            else:
                return werkzeug.utils.redirect("/personal/references?foster=%s" % (foster.id))

    # personal references

    @http.route(['/personal/references'],
                type="http", auth="public", website=True, csrf=True)
    def personal_refernces_history_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        states = request.env['res.country.state'].search([])
        return request.render('foster_base.personal_references', {'fosters': fosters, 'states': states})

    @http.route('/personal/references/submition', type="http", auth="public", website=True, csrf=True)
    def personal_refernces_submition(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value
        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])
        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['personal.references'].sudo().create(
                {'name': values['name'], 'address': values['address'], 'city': values['address'],
                 'state': values['states'], 'zip': values['zip'], 'phone': values['phone'],
                 'relation_to':values['relation_to'],
                 'applicant_id': foster.id})
            if values.get("add_more") == '':
                return werkzeug.utils.redirect("/personal/references?foster=%s" % (foster.id))
            else:
                return werkzeug.utils.redirect("/cori/form?foster=%s" % (foster.id))


    # cori form

    @http.route(['/cori/form'],
                type="http", auth="public", website=True, csrf=True)
    def cori_form_application(self, **kwargs):
        fosters = request.env['foster.applicants'].search([])
        states = request.env['res.country.state'].search([])
        countries = request.env['res.country.state'].search([])
        return request.render('foster_base.cori_form', {'fosters': fosters, 'states': states,'countries':countries})

    @http.route('/cori/form/submit', type="http", auth="public", website=True, csrf=True)
    def application_cori_form_submit(self, **kwargs):
        values = {}
        for field_name, field_value in kwargs.items():
            values[field_name] = field_value

        foster = request.env['foster.applicants'].search([('id', '=', values['fosters'])])

        if http.request.env.user.name != "Public user":
            # request.env['foster.applicants'].search([])
            request.env['cori.form'].sudo().create({'cori_applicant': values['cori_applicant'],
                                                         'cori_partner': values['cori_partner'],
                                                         'house_hold_member': values['house_hold_member'],
                                                         'other_member': values['other_member'],
                                                         'cori_last_name': values['cori_last_name'], 'cori_first_name': values['cori_first_name'],
                                                         'cori_middle_name': values['cori_middle_name'],
                                                         'corimaiden_name': values['corimaiden_name'],
                                                         'cori_dob': values['cori_dob'],
                                                         'race': values['race'],
                                                         'cori_ss_num': values['cori_ss_num'], 'ethnicity': values['ethnicity'],
                                                         'cori_address': values['cori_address'],
                                                    'cori_city': values['cori_city'],
                                                    'cori_state': values['states'],
                                                    'other_state': values['countries'],
                                                    'cori_zip': values['cori_zip'],
                                                    'resided_date': values['resided_date'],
                                                    'phone_num': values['phone_num'],
                                                         'corri_applicant_id': foster.id
                                                         })

            return werkzeug.utils.redirect("/thanks")


    # thanks
    @http.route('/thanks', type="http", auth="public", website=True, page=True)
    def support_ticket_thanks(self, **kw):
        return http.request.render('foster_base.support_thank_you', {})

    @http.route(['/foster/sign/<string:token>'],
                type='http', auth='public', website=True)
    def start_sign(self, token=None, **post):
        if not token:
            return
        else:
            sign = request.env['e_sign.signature'].sudo().search([('token', '=', token)], limit=1)

            if not sign:
                return request.render("website.403")
            doc = request.env['foster.sign_docs'].sudo().search([('id', '=', sign.document_id)])
            status = self.compute_status(doc, token)
            data = {'document': doc, 'page': None, 'token': sign.token, 'status': status}
            return request.render('foster_base.foster_sign_page', data)

    def compute_status(self,doc,token):
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

    @http.route('/foster/get_signature',auth='public', csrf=False, cors='*')
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


    @http.route('/foster/get_pdf',auth='none', csrf=False, cors='*')
    def get_pdf(self, **kw):
        doc_id = kw['document_id']
        doc=http.request.env['foster.sign_docs'].sudo().search([('id','=',doc_id)])
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

        my_model = http.request.env['foster.sign_docs']
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

    @http.route('/foster/save_signature',auth='public', csrf=False, cors='*')
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
            # doc.notify_signed_mail(signature.id)
            pdf = doc.pdf_doc.decode('utf-8')
            return ws_methods.http_response('', {"signature":binary_signature,"pdf_binary": pdf})
        except:
            return ws_methods.handle()