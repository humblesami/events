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

from odoo import models, fields, api


class OpAttendanceLine(models.Model):
    _name = 'op.attendance.line'
    _inherit = ['mail.thread']
    _rec_name = 'attendance_id'

    attendance_id = fields.Many2one(
        'op.attendance.sheet', 'Attendance Sheet',
        track_visibility="onchange", ondelete="cascade")
    student_id = fields.Many2one(
        'op.student', 'Student', required=True, track_visibility="onchange")
    present = fields.Boolean(
        'Present ?', default=True, track_visibility="onchange")
    course_id = fields.Many2one(
        'op.course', 'Course',
        related='session_id.course_id', store=True,
        readonly=True)
    batch_id = fields.Many2one(
        'op.batch', 'Class',
        related='session_id.batch_id', store=True,
        readonly=True)
    remark = fields.Char('Remark', size=256, track_visibility="onchange")
    attendance_date = fields.Date('Date', store=True,
        readonly=True, track_visibility="onchange")
    register_id = fields.Many2one(
        related='attendance_id.register_id', store=True)
    session_id = fields.Many2one('op.session', 'Session', ondelete="cascade")
    state = fields.Selection(
        [('draft', 'Draft'),('done', 'Done')],
        'Status', default='draft')

    _sql_constraints = [
        ('unique_student',
         'unique(student_id,session_id)',
         'Student must be unique per Attendance.'),
    ]

class OpBatch(models.Model):
    _inherit = 'op.session'

    attendance_line = fields.One2many(
        'op.attendance.line', 'session_id', 'Attendance Line')
    total_present = fields.Integer(
        'Total Present', compute='_compute_total_present',
        track_visibility="onchange")
    total_absent = fields.Integer(
        'Total Absent', compute='_compute_total_absent',
        track_visibility="onchange")
    attendance_state = fields.Selection(
        [('draft', 'Draft'), ('done', 'Done')],
        'Status', default='draft')

    @api.multi
    @api.depends('attendance_line.present')
    def _compute_total_present(self):
        for record in self:
            record.total_present = self.env['op.attendance.line'].search_count(
                [('present', '=', True), ('session_id', '=', record.id)])

    @api.multi
    @api.depends('attendance_line.present')
    def _compute_total_absent(self):
        for record in self:
            record.total_absent = self.env['op.attendance.line'].search_count(
                [('present', '=', False), ('session_id', '=', record.id)])

    @api.multi
    def action_draft(self):
        self.attendance_line.write({'state':'draft'})
        self.attendance_state='draft'

    @api.multi
    def action_confirm(self):
        self.attendance_line.write({'state': 'done'})
        self.attendance_state = 'done'

    def open_session_form(self):

        # view_id = self.env.ref('meeting_point.view_meeting_doc_view_sign_form').id
        if self:
            return {
                'type': 'ir.actions.act_window',
                'name': self.name,
                # 'view_id': view_id,
                'view_mode': 'form',
                'res_model': self._name,
                'res_id': self.id,
                'target': 'current',
            }