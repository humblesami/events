from odoo import models, fields, api

class Partner(models.Model):
    _name = 'foster.partner'
    name = fields.Char("Name")
    age = fields.Integer("Age")
    spouse_last_name = fields.Char("Last Name")
    spouse_first_name = fields.Char("First")
    spouse_middle_name = fields.Char("Middle")
    spouse_other_name = fields.Char("Any Other Name")
    partner_id = fields.Many2one("foster.applicants", string="Partner/Spouse")
    co_home_phone = fields.Char("Work Phone")
    co_cell_phone = fields.Char("Cell/Mobile Phone")
    co_applicant_email = fields.Char("Email")
    sex = fields.Selection([
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other')
    ])
    birthdate = fields.Date("Birth Date")
    place_of_birth = fields.Char("Place of Birth")
    security_number = fields.Char("Social Security Number")
    citizen_ship = fields.Many2one('res.country', string='Country of Citizenship')
    immigration = fields.Char("If not citizen, Immigration Status")
    education = fields.Char("Education")
    last_grade = fields.Selection([
        ('a', 'A'),
        ('b', 'B'),
        ('c', 'C'),
        ('d','D')
    ])
    current_marriage_date = fields.Date("Current Marriage Date")
    previous_marriage_date = fields.Date("Previous Marriage Date")
    previous_marriage_date_end = fields.Date("Previous Marriage Date Ended")
    employment_type = fields.Selection([
        ('employee', 'Employee'),
        ('worker', 'Worker'),
        ('self-employed', 'Self-Employed')
    ], string="Current Employment Type")
    days_worked = fields.Integer("Hours/Days Worked")
    date_employment_began = fields.Date("Date Employment Began")
    employer_name = fields.Char("Employer Name")
    employer_phone = fields.Char("Employer Phone")
    income_year = fields.Char("Income per Year")

class Emergency_contact_person(models.Model):
    _name = 'foster.emergency.contact.person'
    name = fields.Char("Name")
    telephone = fields.Integer("Phone")
    hours_available = fields.Integer("Hours Available")
    applicant = fields.Many2one("foster.applicants")

class Family_memebers(models.Model):
    _name = 'foster.family.members'
    full_name = fields.Char("Name")
    sex = fields.Selection([
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other')
    ])
    birth_date = fields.Date("Birth Date")
    security_number = fields.Integer("Social Security Number")
    living_at_home = fields.Selection([
        ('yes','Yes'),
        ('no','No')
    ])
    relation_to_applicant = fields.Char("Relation to Applicant")
    members = fields.Many2one("foster.applicants")

class Other_members_home(models.Model):
    _name = 'foster.other.members'

    full_name = fields.Char("Name")
    sex = fields.Selection([
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other')
    ])
    birth_date = fields.Date("Birth Date")
    security_number = fields.Integer("Social Security Number")
    living_at_home = fields.Selection([
        ('yes', 'Yes'),
        ('no', 'No')
    ])
    nature = fields.Char("Nature of Contact")
    other_members = fields.Many2one("foster.applicants")

class Family_based_childcare(models.Model):
    _name = 'disable.childcare'

    name = fields.Char("Name")
    care_taker = fields.Char("CareTaker")
    reason = fields.Char("Reason")
    agency = fields.Char("Agency(if any)")
    childcare = fields.Many2one("foster.applicants")

class Family_childcare(models.Model):
    _name = 'family.childcare'

    name = fields.Char("Name")
    care_agent = fields.Many2one("foster.applicants")

class childcare_plan_person(models.Model):
    _name = 'childcare.plan.person'

    name = fields.Char("Name")
    plan_person = fields.Many2one("foster.applicants")

class childcare_plan_services(models.Model):
    _name = 'childcare.plan.services'

    name = fields.Char("Name")
    description = fields.Text("Description")
    plan_service = fields.Many2one("foster.applicants")

class pets(models.Model):
    pet_name = fields.Char("Pet Name")
    breed = fields.Char("Breed(if dog)")

class health_status(models.Model):
    _name = 'fodter.health_status'
    household_member_name = fields.Char('Household Member Name')
    treatment_provider_name = fields.Char('Treatment Provider Name')
    address = fields.Text('Address')
    treatment_type = fields.Char('Treatment Type')
    condition_date_onset = fields.Datetime('Date of onset')
    is_cured = fields.Boolean('Current Condition?')

class refrence(models.Model):
    _name = 'foster.refrence'
    type = fields.Char('Type of reference')
    address = fields.Text('Address')
    phone_no = fields.Char('Phone Number')
    city = fields.Char('City')
    state =  fields.Char('State')
    zip =  fields.Char('Zip')


class Applicant(models.Model):
    _name = 'foster.applicants'

    date = fields.Date("Date")
    last_name = fields.Char("Last Name")
    first_name = fields.Char("First")
    middle_name = fields.Char("Middle")
    other_name = fields.Char("Any Other Name")
    address = fields.Char("Address")
    town = fields.Char("Town")
    country_state = fields.Many2one('res.country.state', string="State")
    zip = fields.Char("Zip Code")

    home_phone = fields.Char("Home Phone")
    work_phone = fields.Char("Work Phone")
    cell_phone = fields.Char("Cell/Mobile Phone")
    applicant_email = fields.Char("Email")
    sex = fields.Selection([
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other')
    ])
    birthdate = fields.Date("Birth Date")
    place_of_birth = fields.Char("Place of Birth")
    security_number = fields.Char("Social Security Number")
    citizen_ship = fields.Many2one('res.country', string='Country of Citizenship')
    immigration = fields.Char("If not citizen, Immigration Status")
    education = fields.Char("Education")
    last_grade = fields.Selection([
        ('a', 'A'),
        ('b', 'B'),
        ('c', 'C'),
        ('d', 'D')
    ])
    current_marriage_date = fields.Date("Current Marriage Date")
    previous_marriage_date = fields.Date("Previous Marriage Date")
    previous_marriage_date_end = fields.Date("Previous Marriage Date Ended")
    employment_type = fields.Selection([
        ('employee', 'Employee'),
        ('worker', 'Worker'),
        ('self-employed', 'Self-Employed')
    ], string="Current Employment Type")
    days_worked = fields.Integer("Hours/Days Worked")
    date_employment_began = fields.Date("Date Employment Began")
    employer_name = fields.Char("Employer Name")
    employer_phone = fields.Char("Employer Phone")
    income_year = fields.Char("Income per Year")
    # emergency_contact_name = fields.Char("Name of Emergency/Telephone Contact", help="Please provide the name "
    #                                                                                  "of person(s) through whom you can be reached in emergency")
    # emergency_contact_phone = fields.Char("Telephone of Emergency/Telephone Contact",
    #                                       help="Please provide the telephone "
    #                                            "of person(s) through whom you can be reached in emergency")
    # hours_available = fields.Integer("Hours Available")
    note = fields.Text("Direction to your home")
    lang_primary = fields.Char("Primary")
    lang_other = fields.Char("Other")
    comp_primary = fields.Char("Primary")
    comp_other = fields.Char("Other")
    house = fields.Selection([
        ('yes', 'Own'),
        ('no', 'Rent')
    ], string="House")
    current_address_period = fields.Char("How long at current address")
    name_of_contact = fields.Char("Name of contact for verification")
    phone_of_contact = fields.Char("Phone Number of contact for verification")
    previous_address = fields.Text("Previous Address and how long")


    patner = fields.One2many('foster.partner','partner_id', string="Partner/Spouse")
    family_members = fields.One2many('foster.family.members', 'members', string='Family Members')
    other_living_members = fields.One2many('foster.other.members', 'other_members', string='Other Members')
    emrgency_contact = fields.One2many("foster.emergency.contact.person",'applicant', string='Emergency Contact Person')
    childcare_agent = fields.One2many('disable.childcare', 'childcare', string='Disabled Individual Care')
    family_care_agent = fields.One2many('family.childcare', 'care_agent', string='Family Care')
    childcare_person = fields.One2many("childcare.plan.person", "plan_person", string="Child Care Person")
    childcare_service = fields.One2many("childcare.plan.services", "plan_service", string="Child Care Service")
