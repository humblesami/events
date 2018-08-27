from odoo import models, fields

class Intake(models.Model):
    _name = 'foster.intake'
    intake_worker = fields.Char(string='Intake Worker')
    date = fields.Date(string='Date of Intake')
    pevious_intake = fields.Date('Previous Intake to HopeWell (if applicable)')
    foster_parent = fields.Many2one('foster.applicants', 'applicant_id', string='Foster Parent')
    social_worker = fields.Char(string='Social Worker')
    c_supervisor = fields.Char(string='Clinical Supervisor')
    assign_date = fields.Date(string='Date Assigned')
    youth_name_last = fields.Char(string='Youth Name : Last Name')
    youth_name_first = fields.Char(string='Fast Name')
    pre_caretaker = fields.Char(string='Previous Caretaker')
    address = fields.Text(string='Address')
    phone = fields.Char(string='Phone')
    dob = fields.Date(string='DOB')
    birth_place = fields.Char(string='Place of Birth')
    citizenship = fields.Char(string='Citizenship')
    sex = fields.Selection([
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other')
    ])
    cultural_background = fields.Text(string='Cultural Background')
    racial_background = fields.Selection([
        ('caucasian', 'Caucasian'),
        ('af_am', 'Af/Am (non-Hispanic, non-Italian)'),
        ('italian', 'Italian'),
        ('hispanic', 'Hispanic'),
        ('south_asian', 'Southeast Asian'),
        ('asian', 'Asian (not Southeast Asian)'),
        ('nat_american', 'Native American'),
        ('nat_alaskan', 'Pacific Islander, Native Alaskan	'),
        ('cape_verd', 'Cape Verdean'),
        ('other', 'Other (including bi-racial)')
    ])
    religion = fields.Char(string='Religion')
    lang_primary = fields.Char(string='Primary Language')
    id_marks = fields.Char(string='Identifying Marks')
    height = fields.Integer(string='Height')
    weight = fields.Float(string='Weight')
    hair_color = fields.Char(string='Hair Color')
    eye_color = fields.Char(string='Eye Color')
    ssn = fields.Char(string='SS Number')
    medicaid = fields.Integer(string='Medicaid #: X00 ')
    mass_no = fields.Integer(string='Mass Health #')
    guardianship_status = fields.Char(string='Custody/Guardianship Status')
    goal = fields.Char(string='Long Term Goal')
    agency = fields.Char(string='Referring Agency')
    office = fields.Char(string='Area Office')
    agency_worker = fields.Char(string='Referring Agency Social Worker')
    supervisor = fields.Char(string='Supervisor')
    agency_address = fields.Text(string='Address')
    agency_phone = fields.Char(string='Phone')
    email = fields.Char(string='Email')
    custodial_agency = fields.Char(string='Custodial Agency (if different from above)')


