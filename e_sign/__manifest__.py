# -*- coding: utf-8 -*-

{
    'name': 'E-Signature',
    'description': 'Sign your documents online.',
    'version': '1.0',
    'author': 'Digital Net Technologies',
    'license': 'AGPL-3',
    'category': 'Human Resources',
    'data': [
        'security/groups.xml',
        'security/ir.model.access.csv',
        'views/doc.xml',
        'views/sign.xml',
        'views/default.xml',
        'views/signature_requests.xml',
        'views/menus.xml',

    ],
    'depends': [
        'dn_base','dn_documents',
    ],
    'application':True
}
