
import json
import datetime
from odoo import models, fields, api
from odoo.exceptions import ValidationError

class Home(models.Model):
    _name = 'openeducat.home'

    name = fields.Char(required=True)
    title = fields.Char()
    description = fields.Html()
    photo = fields.Binary(attachment=True)
    session_ids = fields.Many2many('op.session', string="Sessions", compute="compute_sessions")
    sessions = fields.Char(string="Sessions", compute="compute_sessions")
    classes = fields.Char(string="Classes", compute="compute_sessions")



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


