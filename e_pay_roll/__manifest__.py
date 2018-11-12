 # -*- coding: utf-8 -*-
{
    'name': "E-PayRoll",

    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com""",

    'description': """
        Long description of module's purpose
    """,

    'author': "My Company",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Employees',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base','dn_attendance',
                'l10n_in_hr_payroll',
                'dn_hr_payroll_timesheet',
                'leave_management_custom'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/hrContract_view_employee.xml',
        'views/web_assets_back.xml',
        'security/e_payroll_groups.xml',
        'security/access_rights.xml',
        'security/ir.model.access.csv',
        'views/users.xml',
        'views/admin.xml',
        'views/manager.xml',
        'views/officer.xml',
        'views/staff.xml',
        'views/menus.xml',
        'views/accesscontrol.xml',
        'wizard/hr_attendance_summary_views.xml',
        'report/attendance_report_report.xml',
        'report/report_hrattendance.xml'
    ],
# 'qweb': [
#         "static/src/xml/pay.xml",
#     ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'application': True,
}