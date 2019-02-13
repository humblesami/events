# -*- coding: utf-8 -*-

{
    'name': 'dn-documents',
    'description': 'Manage your documents online.',
    'version': '1.0',
    'author': 'Digital Net Technologies',
    'license': 'AGPL-3',
    'category': 'Human Resources',
    'data': [
        'security/groups.xml',
        'security/ir.model.access.csv',
        'views/doc.xml',
        'views/annotation.xml',
    ],
    'depends': [
        'dn_base'
    ],
    'application':True
}
