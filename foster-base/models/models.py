# -*- coding: utf-8 -*-

from odoo import models, fields, api

#     _name = 'foster-base.foster-base'

class Person(models.Model):
    _name = 'foster-base.person'
    sex = fields.Char()
    birth_date = fields.Date()
    birth_place = fields.Char()
    social_security_number = fields.Char()
    citizenship = fields.Char()
    immigration_status = fields.Char()
    current_marriage_date = fields.Date()
    previous_marriage_start_date = fields.Date()
    previous_marriage_end_date = fields.Date()
    current_employment_type = fields.Char()
    work_duration = fields.Char()
    employment_start_date = fields.Date()
    employment_verification = fields.Employment_contact_person()


class Applicant(models.Model):
    _name = 'foster-base.applicant'
    _inherit = 'foster-base.person'
    name = fields.Char()
    last_name = fields.Char()
    middle_name = fields.Char()
    other_name = fields.Char()
    partner = fields.Partner()
    address = fields.Char()
    telephone = fields.Char()
    phone_work = fields.Char()
    phone_work_co_applicant = fields.Char()
    email = fields.Char()
    direction_to_home = fields.Char()
    languages = fields.Language()
    family_members = fields.Many2one('Other_Person')


class Partner(models.Model):
    _name = 'foster-base.partner'
    name = fields.Char()


class Emergency_contact_person(models.Model):
    _name = 'foster-base.emergency-contact-person'
    name = fields.Char()
    last_name = fields.Char()
    telephone = fields.Char()
    phone_work = fields.Char()
    available_to = fields.Datetime()
    available_from = fields.Datetime()


class Employment_contact_person(models.Model):
    _name = 'foster-base.employment-contact-person'
    name = fields.Char()
    last_name = fields.Char()
    telephone = fields.Char()
    phone_work = fields.Char()
    available_to = fields.Datetime()
    available_from = fields.Datetime()


class Language(models.Model):
    _name = 'foster-base.language'
    lang = fields.Char()
    proficiency = fields.Char()
    is_primary = fields.Boolean()
    is_written = fields.Boolean()

class Income(models.Model):
    _name = 'foster-base.income'
    amount = fields.Float()
    source = fields.Source()

class Source(models.Model):
    title = fields.Char()
    contact = fields.Char()

class Other_Person(models.Model):
    _name = 'foster-base.other-person'
    full_name = fields.Char()
    sex = fields.Char()
    social_security_number = fields.Char()
    at_home = fields.Boolean()
    relation = fields.Char()
    birth_date = fields.Date()
    is_member = fields.Boolean()
    contact = fields.Char()

class Pet(models.Model):
    _name = 'foster-base.pet'
    pet_type = fields.Char()
    breed = fields.Char()
    count = fields.Integer()
