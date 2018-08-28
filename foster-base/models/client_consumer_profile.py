from odoo import models, fields

class Consumer_Profile(models.Model):
    _name = 'consumer.profile'

    birth_date = fields.Date(string='Date of Birth')
    placement_date = fields.Date(string='Placement Date')
    assessment_date = fields.Date(string='Assessment Date')
    foster_parent = fields.Char(string='Foster Parent')
    bio_parent = fields.Char(string='Bio Parent')
    social_worker = fields.Char(string='HopeWell Social Worker')
    legal_status = fields.Char(string='Legal Status')
    goal = fields.Char(string='Goal')
    description = fields.Text(string='Client Description')
    living_situation = fields.Text(string='Current Living Situation')
    referral_plan = fields.Text(string='Referral and Placement Plans')
    background_info = fields.Text(string='Background Information')
    past_placements = fields.Text(string='Past Placements')
    family_relations = fields.Text(string='Family Relations')
    medical_status = fields.Text(string='Medical/ Dental Status')
    education = fields.Char(string='Education')
    curr_service = fields.Char(string='Current Services')
    special_assets = fields.Text(string='Special Assets')
    recreation = fields.Text(string='Leisure/Recreation')
    needs = fields.Text(string='Critical Needs/ Issues')
    prefrences = fields.Text(string='Consumer Preference')
    future_goals = fields.Text(string='Future Goals')

