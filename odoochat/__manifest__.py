# -*- coding: utf-8 -*-
{
    'name': "odoochat",

    'summary': """
        Chat and Notifications""",

    'description': """
        Long description of module's purpose
    """,

    'author': "DigitalNet",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Notifications',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base','dn_base'],
    'application':True,
    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'security/rules.xml',
        'views/templates.xml',
        'views/notification.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}