# -*- coding: utf-8 -*-

{
    'name': 'dn- Timesheets on Payslips',
    'description': 'Get Timesheet and Attendence numbers onto Employee Payslips.',
    'version': '1.0',
    'author': 'Digital Net Technologies',
    'license': 'AGPL-3',
    'category': 'Human Resources',
    'data': [
        'hr_contract_view.xml',
        'menus.xml',
        'security/access.xml',
    ],
    'depends': [
        'dn_hr',
        'hr_payroll',
        'hr_timesheet',
    ],
}
