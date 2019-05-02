from django.db import models
from django.utils.translation import gettext, gettext_lazy as _
from .user import Profile

class Committee(models.Model):
    name = models.CharField(_('name'), max_length=150)
    users = models.ManyToManyField(Profile,blank=True,related_name="committees")

    def __str__(self):
        return self.name

    @classmethod
    def get_detail(cls, request, params):
        return {'error': 'Not implemented'}

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
                member = {'id': member.user.id, 'name': member.user.username}
                committee_memebers.append(member)
            committee = {'name': committee.name, 'members': committee_memebers}
            data.append(committee)
        data = {'records':data, 'total':total_cnt, 'count':current_cnt}
        return data
        