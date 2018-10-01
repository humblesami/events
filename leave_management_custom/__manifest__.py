# -*- coding: utf-8 -*-
{
    'name': "E-Leave",

    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com""",

    'description': """
        Long description of module's purpose
    """,

    'author': "DigitalNet",
    'website': "http://www.digitalnet.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Leave Management',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['dn_hr','hr_holiday_exclude_special_days','dn_attendance_leaves'],

    # always loaded
    'data': [
        'security/leave_groups.xml',
        'security/ir.model.access.csv',
         # 'views/employee.xml',
        'views/views.xml',
        'views/templates.xml',
        'security/rules.xml',
        'views/users.xml',
        'views/admin.xml',
        'views/manager.xml',
        'views/officer.xml',
        'views/staff.xml',
        'views/menus.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'installable': True,
    'application': True,
    'auto_install': True,
}