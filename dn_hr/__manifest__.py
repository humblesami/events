# -*- coding: utf-8 -*-
{
    'name': "dn-hr",

    'summary': """
        Base Module For DN Hr Apps
        """,

    'description': """
        Base Module For DN Hr Apps
    """,

    'author': "DigitalNet",
    'website': "http://www.digitalnet.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Leave Management',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['dn_base','hr','hr_contract'],

    # always loaded
    'data': [
        'views/employee.xml',
        'views/res_config_views.xml',
        'views/hr_employee_sequence.xml'
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'installable': True,
    'application': True,
    'auto_install': True,
}