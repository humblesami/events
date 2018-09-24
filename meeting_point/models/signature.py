from odoo.addons.e_sign.controllers.controllers import Signature

class MySignature(Signature):

    def get_users(self,doc):
        if doc._name=="meeting_point.document":
            if doc.meeting_id:
                users = []
                partners=doc.meeting_id.partner_ids

                for p in partners:
                    users.append({"id": p.user_id.id, "name": p.name})
                return users
            else:
                return super(MySignature, self).get_users(doc)
        else:
            return super(MySignature, self).get_users(doc)

    def get_model(self,model):
        if model=="meeting_point.document" or model == "calendar.event" or model == "meeting_point.news":
            return "meeting_point.document"
        else:
            return super(MySignature, self).get_model(model)