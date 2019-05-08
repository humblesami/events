from django.db import models
from django.utils.translation import gettext, gettext_lazy as _
from .user import Profile

class Committee(models.Model):
    name = models.CharField(_('name'), max_length=150)
    users = models.ManyToManyField(Profile,blank=True,related_name="committees")
    summary = models.TextField('Summary', max_length=500, null=True)
    allUser = models.BooleanField('All Users', default=False)

    def __str__(self):
        return self.name

    @classmethod
    def get_detail(cls, request, params):
        comm_id = params.get('id')
        if comm_id:
            committee = Committee.objects.filter(pk=comm_id)
            committee = list(committee)
            committee = committee[0]
            if committee:
                committee_members = []
                members = committee.users.all()
                for member in members:
                    member = {'id': member.id, 'name': member.username, 'image_small': member.image.name}
                    committee_members.append(member)

                committee = {"name": committee.name, 'id': committee.id, "members": committee_members,
                             "summary": committee.summary}
                data = {"committee": committee, "next": 0, "prev": 0}
                return data
            else:
                return {'error': 'Committee Not Found aganist Specific Details'}
        # committee = req_env['meeting_point.committee'].search([('id', '=', values['id'])])
        # prev = req_env['meeting_point.committee'].search([('id', '<', values['id'])], limit=1, order='id desc')
        # next = req_env['meeting_point.committee'].search([('id', '>', values['id'])], limit=1, order='id')
        #
        # props = ['id', 'name', 'image_small']
        # committee_members = ws_methods.objects_list_to_json_list(committee.user_ids, props)
        # committee = {"name": committee.name, 'id': committee.id, "members": committee_members,
        #              "summary": committee.summary}
        # data = {"committee": committee, "next": next.id, "prev": prev.id}
        # return ws_methods.http_response('', data)
        else:
            return {'error': 'Committee Not Found aganist Specific Details'}

    @classmethod
    def get_records(cls, request, params):
        data = []
        committees = Committee.objects.filter()
        total_cnt = committees.count()
        current_cnt = total_cnt
        for committee in committees:
            committee_memebers = []
            members = committee.users.filter()
            for member in members:
                member = {'id': member.id, 'name': member.username, 'image_small': member.image.name}
                committee_memebers.append(member)
            committee = {'name': committee.name, 'id': committee.id, 'members': committee_memebers}
            data.append(committee)
        data = {'records':data, 'total':total_cnt, 'count':current_cnt}
        return data
        