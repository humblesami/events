
import json
import datetime
from odoo import models, fields, api
from odoo.exceptions import ValidationError
from odoo.http import request


class Home(models.Model):
    _name = 'openeducat.home'

    name = fields.Char(required=True)
    title = fields.Char()
    description = fields.Html()
    photo = fields.Binary(attachment=True)
    session_ids = fields.Many2many('op.session', string="Sessions", compute="compute_sessions")
    sessions = fields.Char(string="Sessions", compute="compute_sessions")
    classes = fields.Char(string="Classes", compute="compute_sessions")

    course_id = fields.Many2one('op.course', 'Course')
    branch_id = fields.Many2one('op.branch', 'Location(Education Center)')
    class_ids = fields.Many2many('op.batch', string='Scheduled classes', compute="_compute_sched_classes")
    faculty_ids = fields.Many2many('op.faculty', string='Faculty availability', compute="_compute_sched_classes")
    term_ids = fields.Many2many('op.term', string='Terms')
    days = fields.Many2many('op.days', string='Days')
    start = fields.Float('Start time')
    end = fields.Float('End time')
    avail_room_ids = fields.Many2many('op.classroom', string='Available rooms', compute="_compute_avail_rooms")
    avail_faculty_ids = fields.Many2many('op.faculty', string='Available teachers', compute="_compute_avail_teachers")
    req_hrs = fields.Float('Required', compute="_compute_classhrs")

    filter_start = fields.Date('From')
    filter_end = fields.Date('To')
    rooms = fields.Many2many('op.classroom', string='Rooms', compute="compute_rooms")
    teachers = fields.Many2many('op.faculty', string='Teachers', compute="compute_teachers")
    course = fields.Many2one('op.course', 'Course')
    branch = fields.Many2one('op.branch', 'Location(Education Center)')

    # @api.onchange('filter_start', 'filter_end')
    # def onchange_combine(self):
    #     if self.filter_start and self.filter_end:
    #         request.session["capacity_dates"] = {"start": self.filter_start, "end": self.filter_end}
    #     else:
    #         request.session.pop('capacity_dates', None)

    @api.multi
    @api.depends('course','filter_start','filter_end')
    def compute_teachers(self):
        for rec in self:
            # if rec.filter_start and rec.filter_end:
            #     request.session["capacity_dates"]={"start":rec.filter_start,"end":rec.filter_end}
            # else:
            #     request.session.pop('capacity_dates', None)
            if rec.course:
                tchrs=self.env['op.faculty'].search([('faculty_course_ids', '=', rec.course.id)])
                if rec.filter_start and rec.filter_end:
                    for t in tchrs:
                        hours = t.class_ids.calculate_hours(rec.filter_start, rec.filter_end, faculty=t)
                        t.total_sched_hrs1 = hours["scheduled"]
                        t.total_avail_hrs1 = hours["available"]
                rec.teachers = tchrs
            else:
                tchrs = self.env['op.faculty'].search([])
                if rec.filter_start and rec.filter_end:
                    for t in tchrs:
                        hours = t.class_ids.calculate_hours(rec.filter_start, rec.filter_end, faculty=t)
                        t.total_sched_hrs1 = hours["scheduled"]
                        t.total_avail_hrs1 = hours["available"]

                rec.teachers = tchrs


    @api.multi
    @api.depends('branch')
    def compute_rooms(self):
        for rec in self:
            if rec.branch:
                rooms=self.env['op.classroom'].search([('branch_id', '=', rec.branch.id)])
                rec.rooms = rooms
            else:
                rooms = self.env['op.classroom'].search([])
                rec.rooms = rooms



    @api.multi
    @api.depends('course_id')
    def _compute_sched_classes(self):
        for rec in self:
            if rec.course_id:
                tchrs=self.env['op.faculty'].search([('faculty_course_ids', '=', rec.course_id.id)])
                rec.faculty_ids = tchrs
                faculty_ids=tchrs.ids
                rec.class_ids=self.env['op.batch'].search([('faculty_id','in',faculty_ids)])

    @api.multi
    @api.depends('course_id','start','end','days','term_ids')
    def _compute_avail_teachers(self):
        for rec in self:
            if  rec.term_ids and rec.course_id and rec.days and rec.start and rec.end:
                temp={"course_id": rec.course_id,
                                             "term_ids": rec.term_ids,
                                             "days": rec.days,
                                             "start": rec.start,
                                             "end": rec.end}
                hrs=self.env['op.batch'].calculate_hours_from_obj(False,False,terms=rec.term_ids,obj=temp)
                req_hours=hrs["scheduled"]
                teachers=[]
                days1 = []
                for d in rec.days:
                    days1.append(int(d.day))
                for t in self.env['op.faculty'].search([('faculty_course_ids','in',rec.course_id.id)]):
                    for d in rec.days:
                        available = False

                        for a in t.available_times:
                            if int(a.day) == int(d.day) and rec.start >= int(a.start) and rec.end <= int(a.end):
                                available = True
                                break
                        if not available:
                            break
                    if not available:
                        continue

                    hours=t.class_ids.calculate_hours(False,False,faculty=t,terms=rec.term_ids,local=True)
                    available_hrs = hours["available"]
                    if req_hours > available_hrs:
                        continue

                    sessions = hours["sessions"]
                    avail=True
                    for s in sessions:
                        st = datetime.datetime.strptime(s["start_datetime"], "%Y-%m-%d %H:%M:%S")
                        en = datetime.datetime.strptime(s["end_datetime"], "%Y-%m-%d %H:%M:%S")
                        day = st.weekday()
                        st = st.hour + st.minute / 60.0
                        en = en.hour + en.minute / 60.0
                        x = rec.start
                        y = rec.end

                        if day in days1:
                            if x >= st and x < en or y > st and y <= en:
                                avail=False
                                break
                    if not avail:
                        continue
                    teachers.append(t.id)
                rec.avail_faculty_ids = self.env['op.faculty'].search([('id','in',teachers)])

    @api.multi
    @api.depends('start','end','days','term_ids','branch_id')
    def _compute_avail_rooms(self):
        for rec in self:
            if rec.branch_id and rec.term_ids and rec.days and rec.start and rec.end:
                temp={"course_id": rec.course_id,
                                             "term_ids": rec.term_ids,
                                             "days": rec.days,
                                             "start": rec.start,
                                             "end": rec.end}
                hrs=self.env['op.batch'].calculate_hours_from_obj(False,False,terms=rec.term_ids,obj=temp)
                req_hours=hrs["scheduled"]
                rooms=[]
                days1 = []
                for d in rec.days:
                    days1.append(int(d.day))
                for t in self.env['op.classroom'].search([('branch_id', '=', rec.branch_id.id)]):

                    hours = t.class_ids.calculate_hours(False, False, terms=rec.term_ids, room=True, local=True)
                    available_hrs = hours["available"]
                    if req_hours > available_hrs:
                        continue

                    sessions = hours["sessions"]
                    avail = True
                    for s in sessions:
                        st = datetime.datetime.strptime(s["start_datetime"], "%Y-%m-%d %H:%M:%S")
                        en = datetime.datetime.strptime(s["end_datetime"], "%Y-%m-%d %H:%M:%S")
                        day = st.weekday()
                        st = st.hour + st.minute / 60.0
                        en = en.hour + en.minute / 60.0
                        x = rec.start
                        y = rec.end

                        if day in days1:
                            if x >= st and x < en or y > st and y <= en:
                                avail = False
                                break
                    if not avail:
                        continue
                    rooms.append(t.id)

                rec.avail_room_ids = self.env['op.classroom'].search([('id','in',rooms)])

    @api.multi
    def compute_sessions(self):
        environment = self.env
        for obj in self:

            classes=environment['op.batch'].search([])
            obj.session_ids = environment['op.session'].search([])
            sessions = {}
            class_list=[]
            for c in classes:
                obj0 = {'id': c.id, 'title': c.name}
                class_list.append(obj0)
                lst=[]
                for s in c.session_ids:
                    obj1 = {'id':s.id,'title':s.name,'start':s.start_datetime.split(" ")[0],'color':s.term}
                    lst.append(obj1)
                for term in c.term_ids:
                    if not term.break_start or not term.break_end:
                        continue
                    start_date = datetime.datetime.strptime(
                        term.break_start, '%Y-%m-%d')
                    end_date = datetime.datetime.strptime(term.break_end, '%Y-%m-%d')

                    for n in range((end_date - start_date).days + 1):
                        curr_date = start_date + datetime.timedelta(n)
                        curr_day = curr_date.weekday()
                        if curr_day==5 or curr_day ==6:
                            continue
                        temp0 = curr_date.strftime('%Y-%m-%d')
                        obj1 = {'id': '', 'title': '', 'start': temp0, 'color': 'red'}
                        lst.append(obj1)
                sessions[str(c.id)]=lst
            obj.sessions=json.dumps(sessions)
            obj.classes = json.dumps(class_list)


