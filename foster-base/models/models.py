# # -*- coding: utf-8 -*-

from odoo import models, fields, api

# class foster_management(models.Model):
#     _name = 'foster.applicant'
#
#     date = fields.Date("Date")
#     last_name = fields.Char("Applicant Last Name")
#     first_name = fields.Char("First")
#     middle_name = fields.Char("Middle")
#     other_name = fields.Char("Any Other Name")
#     spouse_last_name = fields.Char("Spouse Last Name")
#     spouse_first_name = fields.Char("First")
#     spouse_middle_name = fields.Char("Middle")
#     spouse_other_name = fields.Char("Any Other Name")
#     address = fields.Char("Address")
#     town = fields.Char("Town")
#     country_state = fields.Many2one('res.country.state', string="State")
#     zip  = fields.Char("Zip Code")
#     home_phone = fields.Char("Home Phone")
#     work_phone = fields.Char("Work Phone")
#     cell_phone = fields.Char("Cell/Mobile Phone")
#     co_home_phone = fields.Char("Co-Applicant Work Phone")
#     co_cell_phone = fields.Char("Co-Applicant Cell/Mobile Phone")
#     applicant_email = fields.Char("Applicant Email")
#     co_applicant_email = fields.Char("Co-Applicant Email")
#     emergency_contact_name = fields.Char("Name of Emergency/Telephone Contact", help="Please provide the name "
#                                              "of person(s) through whom you can be reached in emergency")
#     emergency_contact_phone = fields.Char("Telephone of Emergency/Telephone Contact",help = "Please provide the telephone "
#                                              "of person(s) through whom you can be reached in emergency")
#     hours_available = fields.Integer("Hours Available")
#     note = fields.Text("Direction to your home")
#     lang_primary = fields.Char("Primary")
#     lang_other = fields.Char("Other")
#     comp_primary = fields.Char("Primary")
#     comp_other = fields.Char("Other")
#
#
#
#
#
#
#
