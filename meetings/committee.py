from django.db import models
from django.utils.translation import gettext, gettext_lazy as _

from mainapp.ws_methods import obj_to_dict, queryset_to_list
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
            committee_orm = Committee.objects.filter(pk=comm_id)[0]
            committee = obj_to_dict(committee_orm,fields=['id','name','summary'],related={"users":{"fields":['id','username','image__name']}})
            if committee:

                data = {"committee": committee, "next": 0, "prev": 0}
                return data
            else:
                return {'error': 'Committee Not Found aganist Specific Details'}

        else:
            return {'error': 'Committee Not Found aganist Specific Details'}

    @classmethod
    def get_records(cls, request, params):
        committees_orm = Committee.objects.filter()
        total_cnt = committees_orm.count()
        current_cnt = total_cnt
        committees = queryset_to_list(committees_orm,fields=['id','name','summary'],related={"users":{"fields":['id','username','image__name']}})

        data = {'records':committees, 'total':total_cnt, 'count':current_cnt}
        return data
        