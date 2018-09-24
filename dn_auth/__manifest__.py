{

    'name': 'dn-auth',
    "summary": "Signle place login, Auto session expire, Password rules, Login tracking.",
    'version': '11.0.1.0.0',
    'author': "DigitalNet",
    'category': 'Auth',
    'depends': [
        'auth_crypt',
        'auth_signup',
        'dn_base',
    ],
    "data": [
        'security/ir.model.access.csv',
        'views/res_company_view.xml',
        'views/login.xml',
        'views/settings.xml'
    ],
    'application': True,
}
