# -*- coding: utf-8 -*-
###############################################################################
#
#    Tech-Receptives Solutions Pvt. Ltd.
#    Copyright (C) 2009-TODAY Tech-Receptives(<http://www.techreceptives.com>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Lesser General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Lesser General Public License for more details.
#
#    You should have received a copy of the GNU Lesser General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
###############################################################################

from odoo import models, fields


class OpTiming(models.Model):
    _name = 'op.timing'
    _description = 'Period'
    _order = 'sequence'

    name = fields.Char('Name', size=16, required=True)
    hour = fields.Selection(
        [('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'),
         ('6', '6'), ('7', '7'), ('8', '8'), ('9', '9'), ('10', '10'),
         ('11', '11'), ('12', '12')], 'Hours', required=True)
    minute = fields.Selection(
        [('00', '00'), ('15', '15'), ('30', '30'), ('45', '45')], 'Minute',
        required=True)
    duration = fields.Float('Duration')
    am_pm = fields.Selection(
        [('am', 'AM'), ('pm', 'PM')], 'AM/PM', required=True)
    sequence = fields.Integer('Sequence')

class AvailableTimes(models.Model):
    _name = 'op.available_times'
    _description = 'Availability'
    # _order = 'sequence'

    name = fields.Char('Name', size=16)
    day = fields.Selection(
        [('0', 'Monday'), ('1', 'Tuesday'), ('2', 'Wednesday'), ('3', 'Thursday'), ('4', 'Friday'),
         ('5', 'Saturday'), ('6', 'Sunday')], 'Day', required=True)
    start = fields.Selection(
        [('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'),
         ('6', '6'), ('7', '7'), ('8', '8'), ('9', '9'), ('10', '10'),
         ('11', '11'), ('12', '12'), ('13', '13'), ('14', '14'), ('15', '15'), ('16', '16'), ('17', '17'),
         ('18', '18'), ('19', '19'), ('20', '20'), ('21', '21'), ('22', '22'), ('23', '23')], 'From', required=True)
    end = fields.Selection(
        [('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5'),
         ('6', '6'), ('7', '7'), ('8', '8'), ('9', '9'), ('10', '10'),
         ('11', '11'), ('12', '12'), ('13', '13'), ('14', '14'), ('15', '15'), ('16', '16'), ('17', '17'),
         ('18', '18'), ('19', '19'), ('20', '20'), ('21', '21'), ('22', '22'), ('23', '23')], 'To', required=True)

    am_pm = fields.Selection(
        [('am', 'AM'), ('pm', 'PM')], 'AM/PM')
    # sequence = fields.Integer('Sequence')


class AvailableDays(models.Model):
    _name = 'op.available_days'
    _description = 'Available Days'
    # _order = 'sequence'

    name = fields.Char('Name', size=16, required=True)
    day = fields.Selection(
        [('1', 'Monday'), ('2', 'Tuesday'), ('3', 'Wednesday'), ('4', 'Thursday'), ('5', 'Friday'),
         ('6', 'Saturday'), ('7', 'Sunday')], 'Day', required=True)

    # sequence = fields.Integer('Sequence')
