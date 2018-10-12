# -*- coding: utf-8 -*-
##############################################################################
#
#    BUILDFISH Development SAC.
#    Copyright (C) 2014-TODAY BUILDFISH (<http://buildfish.com>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

{
    'name': 'Website Reset Password ReCaptcha',
    'description': 'Website Base Google reCaptcha.',
    'summary': 'Website Base Google reCaptcha On Reset Password save credentials.',
    'category': 'Website',
    'version': '1.0',
    'website': 'http://www.DigitalNet.com/',
    "license": "AGPL-3",
    'author': 'DigitalNet',
    'depends': ['website'],
    'data': [
        'views/res_config.xml',
    ],
    'images': [],
    'application': True,
"data": [
        "data/ir_config_parameter_data.xml",
    ],
}

