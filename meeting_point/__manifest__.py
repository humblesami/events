# -*- coding: utf-8 -*-
{
    'name': "MeetingPoint",

    'summary': """
        Schedule meetings as many as you want""",

    'description': """
        Long description of module's purpose
    """,

    'author': "DigitalNet",
    'website': "http://www.digitalnet.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
    # for the full list
    "category": "Digitalnet",
    'version': '1.0',

    # any module necessary for this one to work correctly
    'depends': [
        'dn_auth',
        'dn_documents', 'e_sign', #our base
        'odoochat',
        'calendar','survey', #builtin + required
        'doc_viewer', #custom + required
        #'inputmask_widget','web_digital_sign', #off the shelf + required
        #'odoo_web_login',#off the shelf + luxries incompatible with odoo-11
        # ,'web_widget_timepicker',
        #'web_tree_many2one_clickable', #off the shelf + luxries
    ],

    # always loaded
    'data': [
        'security/groups.xml',
        'security/ir.model.access.csv',
        'data/default.xml',
        'views/roles.xml',
        'views/calendar.xml',
        'views/signature.xml',
        'views/committee.xml',
        'views/survey.xml',
        'views/resources.xml',
        'views/templates.xml',
        'views/users.xml',
        'views/director.xml',
        'views/staff.xml',
        'views/admin.xml',
        'views/meetingdoc.xml',
        'views/meetingtopic.xml',
        'views/news.xml',
        'views/dashboard.xml',
        'views/signature_requests.xml',
        'views/voting.xml',
        'views/menus.xml',
        'security/rules.xml',
        'demo/demo.xml',
        'views/surveytemplates.xml',

    ],
    # only loaded in demonstration mode
    'installable': True,
    'application': True,
    'auto_install': False,
}