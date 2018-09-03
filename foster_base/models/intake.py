from odoo import models, fields

class emergency_contact_person(models.Model):
    _name = 'youth.emergency.person'
    last_name = fields.Char(string='Last Name')
    first_name = fields.Char(string='First Name')
    phone = fields.Char(string='Phone')
    relation = fields.Char(string='Relationship to Youth')
    address = fields.Text(string='Address')
    youth_id = fields.Many2one('foster.intake')

class Agency_Involvement(models.Model):
    _name = 'agency.involvement.reason'

    name= fields.Char("Name")

class High_Risk_Behaviour(models.Model):
    _name = 'high.risk.behaviour'

    name= fields.Char("Name")

class Placement_Restrictions(models.Model):
    _name = 'placement.restrictions'

    name =fields.Char('Name')

class Intake(models.Model):
    _name = 'foster.intake'
    _rec_name = 'intake_worker'

    intake_worker = fields.Char(string='Intake Worker')
    date = fields.Date(string='Date of Intake')
    pevious_intake = fields.Date('Previous Intake to HopeWell (if applicable)')
    foster_parent = fields.Char(string='Foster Parent')
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
    height = fields.Char(string='Height')
    weight = fields.Char(string='Weight')
    hair_color = fields.Char(string='Hair Color')
    eye_color = fields.Char(string='Eye Color')
    ssn = fields.Char(string='SS Number')
    medicaid = fields.Integer(string='Medicaid #: X00 ')
    mass_no = fields.Char(string='Mass Health #')
    guardianship_status = fields.Char(string='Custody/Guardianship Status')
    goal = fields.Char(string='Long Term Goal')
    agency = fields.Char(string='Referring Agency')
    office = fields.Char(string='Area Office')
    agency_worker = fields.Char(string='Referring Agency Social Worker')
    supervisor = fields.Char(string='Supervisor')
    supervisor_phone = fields.Char("Phone")
    supervisor_email = fields.Char("Email")
    supervisor_address = fields.Text("Address")
    agency_address = fields.Text(string='Address')
    agency_phone = fields.Char(string='Phone')
    email = fields.Char(string='Email')
    custodial_agency = fields.Char(string='Custodial Agency (if different from above)')
    other_agency = fields.Char(string='Specify other Agency Involvement')
    agency_involvement_reasons = fields.Many2many("agency.involvement.reason")
    foster_care = fields.Char(string='Foster Care')
    therapeutic_foster_care = fields.Char(string='Therapeutic Foster Care')
    residential = fields.Char(string='Residential')
    hospitalization = fields.Char(string='Hospitalization')
    other = fields.Char(string='Other (Specify)')
    mother_married_name = fields.Char("Married Name")
    mother_maiden_name = fields.Char("Maiden Name")
    mother_first_name = fields.Char("First Name")
    mother_address = fields.Char("Address")
    mother_phone = fields.Char("Phone")
    mother_background = fields.Char("Cultural/Racial Background")
    father_last_name = fields.Char("Last Name")
    father_first_name = fields.Char("First Name")
    father_address = fields.Char("Address")
    father_phone = fields.Char("Phone")
    father_background = fields.Char("Cultural/Racial Background")
    emergency_person = fields.One2many('youth.emergency.person', 'youth_id', string="Emergency Contact Person")

    family_contact = fields.Char(string='Bio - Family Contact')
    axis_1_primary = fields.Char("AXIS I(Primary)")
    axis_1_secondary = fields.Char("AXIS I(Secondary)")
    axis_2 = fields.Char("AXIS II")
    axis_3 = fields.Char("AXIS III")
    axis_4 = fields.Char("AXIS IV")
    axis_5 = fields.Char("AXIS V(GAF)")
    high_risk_behave = fields.Many2many("high.risk.behaviour", string="High Risk Behaviors")

    therapist = fields.Char(string='Therapist')
    clinic = fields.Char("Clinic")
    clinic_address = fields.Text("Clinic Address")
    clinic_phone = fields.Char("Clinic Phone")
    family_therapist = fields.Char("Family Therapist")
    family_therapist_clinic = fields.Char("Clinic")
    family_therapist_phone = fields.Char("Phone")
    family_therapist_address = fields.Char("Address")
    family_psychiatrist = fields.Char("Family Psychiatrist")
    family_psychiatrist_clinic = fields.Char("Clinic")
    family_psychiatrist_phone = fields.Char("Phone")
    family_psychiatrist_address = fields.Char("Address")
    last_physical_exam = fields.Date("Last Physical Exam")
    last_dental_exam = fields.Date("Last Dental Exam")
    medical_condition = fields.Char("Significant Medical Conditions")
    diet_type = fields.Char("Special Diet type/restrictions")
    allergies = fields.Char("Allergies")
    psychotropic = fields.Text("Psychotropic")
    non_psychotropic = fields.Text("Non Psychotropic")
    school = fields.Char(string='School')
    grade = fields.Char(string='Grade')
    IEP = fields.Char(string='IEP')
    prob_officer = fields.Char(string='Probation Officer')
    court = fields.Char(string='Court')
    court_phone = fields.Char(string='Phone')
    GAL = fields.Char(string='GAL')
    GAL_phone = fields.Char(string='Phone')
    attorney = fields.Char(string='Attorney')
    attorney_phone = fields.Char(string='Phone')
    placement_restrictions = fields.Many2many('placement.restrictions',string="Placement Restrictions")
    respite_recommendations = fields.Text(string='Respite Recommendations')
    discharge_date = fields.Date(string='Anticipated Date of Discharge')
