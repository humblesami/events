# -*- coding: utf-8 -*-
{
    'name': "dn-base",

    'summary': """
        Base Module For DN Apps
        """,

    'description': """
        Base Module For DN Apps
    """,

    'author': "My Company",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    "category": "Digitalnet",
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['mail'],

    # always loaded
    'data': [
        'security/res.lang.csv',
        'security/groups.xml',
        'security/ir.model.access.csv',
        'security/rules.xml',
        'views/views.xml',
        'views/user.xml',
        'views/templates.xml',
        'views/mail.xml',
        'views/notification.xml',
        'views/menus.xml'
    ],
    # only loaded in demonstration mode
    'demo': [
        #'demo/demo.xml',
    ],
    'qweb': [
            'views/notifications.xml',
            'views/icon.xml'
    ],
    'application':True,
    #'post_init_hook': '_auto_update_lang_en',
}
