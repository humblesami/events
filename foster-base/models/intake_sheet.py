from odoo import models, fields

class parent(models.Model):
    _name = 'birth.parent'
    married_name = fields.Char(string='Birth Mother – Married Name')
    middle_name = fields.Char(string='Maiden Name')
    first_name = fields.Char(string='First Name')
    phone = fields.Char(string='Phone')
    racial_background = fields.Char(string='Cultural/Racial Background')
    mother = fields.Boolean('Mother')
    father= fields.Boolean('Father')
    address = fields.Text(string='Address')


class emergency_contact_person(models.Model):
    _name = 'emergency.person'
    last_name = fields.Char(string='Last Name')
    first_name = fields.Char(string='First Name')
    phone = fields.Char(string='Phone')
    relation = fields.Char(string='Relationship to Youth')
    address = fields.Text(string='Address')

class therapist(models.Model):
    _name = 'emergency.person'
    isFamily = fields.Boolean(string='Family Therapist')
    clinic = fields.Char(string='Clinic')
    name = fields.Char(string='Name')
    phone = fields.Char(string='Phone')
    address = fields.Text(string='Address')

class psychiatric_disorder(models.Model):
    _name = 'disorder'
    isPrimary = fields.Boolean(string='Primary')
    isSecondary = fields.Boolean(string='Secondary')
    isGAF = fields.Boolean(string='GAF')
    details = fields.Char(string='AXIS')

class medication(models.Model):
    _name = 'medication'
    name_medicine = fields.Char(string='Medicine')
    dosages = fields.Char(string='Dosages')
    isPsychotropic = fields.Boolean(string='Psychotropic')
    time = fields.Datetime(string='Times of day')


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
    other_agency = fields.Char(string='Specify other Agency Involvement')
    agency_involvement_reasons = fields.Selection([
        ('physical_abuse', 'Physical Abuse'),
        ('sexual_abuse', 'Sexual Abuse'),
        ('neglect', 'Neglect'),
        ('cra', 'CRA'),
        ('criminal_offense', 'Criminal Offense'),
        ('assaultive', 'Assaultive'),
        ('sex_offender', 'Sex Offender'),
        ('suicidal_behavior', 'Suicidal Behavior'),
        ('other', 'Other'),
    ])
    total_placements = fields.Integer(string='Total Placements since Custodial Agency’s initial involvement')
    foster_care = fields.Char(string='Foster Care')
    therapeutic_foster_care = fields.Char(string='Therapeutic Foster Care')
    residential = fields.Char(string='Residential')
    hospitalization = fields.Char(string='Hospitalization')
    other = fields.Char(string='Other (Specify)')
    parent = fields.One2many('birth.parent', 'parent_id', string='Birth Parents')
    emergency_person = fields.One2many('emergency.person', 'emergency_person_id', string='Emergency Contact Person')
    family_contact = fields.Char(string='Bio - Family Contact')
    psychiatric_disorders = fields.One2many('disorder', 'disorder_id', string='Psychiatric Disorders')
    risk_behaviors = fields.Selection([
        ('fire_set', 'Fire Setting'),
        ('sex_offend', 'Sexual Offending'),
        ('homicidal', 'Homicidal'),
        ('assaultive', 'Assaultive'),
        ('suicidal', 'Suicidal'),
        ('other', 'Other')
    ])
    therapist = fields.One2many('therapist', 'therapist_id', string='Therapist')
    physical_exam = fields.Date(string='Last Physical Exam')
    dental_exam = fields.Date(string='Last Dental Exam')
    medical_conditions = fields.Text(string='Significant Medical Conditions')
    diet = fields.Text(string='Special Diet type/restrictions')
    allergies = fields.Text(string='Allergies')
    medications = fields.One2many('medication', 'medication_id', string='Medications')
    school = fields.Char(string='School')
    grade = fields.Char(string='Grade')
    IEP = fields.Char(string='IEP')
    prob_officer = fields.Char(string='Probation Officer')
    court = fields.Char(string='Court')
    court_phone = fields.Char(string='Phone')
    GAL = fields.Char(string='GAL')
    GAL_phone = fields.Char(string='Phone')
    attorney = fields.Char(string='Attorney')
    attorney_phone = fields.Char(string='Phonez')
    placement_restrictions = fields.Selection([
        ('no_pet', 'No pets'),
        ('no_child', 'No younger children'),
        ('no_share_bed', 'No shared bedroom'),
        ('no_gun', 'No guns'),
        ('dorr_alarms', 'Alarms on bedroom door'),
        ('no_fire', 'No access to fire setting materials'),
        ('supervision', 'Needs 1:1 supervision 24 hours a day'),
        ('no_smoking', 'Non smoking environment'),
    ])
    respite_recommendations = fields.Text(string='Respite Recommendations')
    discharge_date = fields.Date(string='Anticipated Date of Discharge')

