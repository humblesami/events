# -*- coding: utf-8 -*-
{
    'name': "dn-website",

    'summary': """
        Base Module For DN Frontend Website
        """,

    'description': """
        Base Module For DN Frontend Website
    """,

    'author': "Digitalnet",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Website',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['dn_base','website'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
    ],
    'application':True
}