
import json
from datetime import datetime
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



    @api.multi
    def compute_sessions(self):
        environment = self.env
        for obj in self:

            classes=environment['op.batch'].search([])
            obj.session_ids = environment['op.session'].search([])
            sessions = {}
            for c in classes:
                lst=[]
                for s in c.session_ids:
                    obj1 = {'id':s.id,'title':s.name,'start':s.start_datetime.split(" ")[0]}
                    lst.append(obj1)
                sessions[str(c.id)]=lst
            obj.sessions=json.dumps(sessions)


