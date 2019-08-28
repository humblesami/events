from django.db import models
from mainapp import ws_methods
from mainapp.models import CustomModel


class Committee(CustomModel):
    name = models.CharField(max_length=150)
    users = models.ManyToManyField('meetings.Profile', blank=True, related_name="committees")
    description = models.TextField(max_length=500, default='', blank=True)
    allUser = models.BooleanField('All Users', default=False)

    def __str__(self):
        return self.name

    @classmethod
    def get_detail(cls, request, params):
        comm_id = params.get('id')
        if comm_id:
            committee_orm = Committee.objects.filter(pk=comm_id)[0]
            committee = ws_methods.obj_to_dict(
                committee_orm,
                fields=['id', 'name', 'description']
            )
            if committee:
                kw = params.get('kw')
                if kw:
                    committee_users = ws_methods.search_db({'kw': kw, 'search_models': {'meetings': ['Profile']}})
                    committee_users = ws_methods.get_user_info(committee_users)
                else:
                    committee_users = ws_methods.get_user_info(committee_orm.users.filter(groups__name__in=['Admin','Staff','Director']).distinct())
                
                total_cnt = len(committee_users)
                offset = params.get('offset')
                limit = params.get('limit')
                committee_users = list(committee_users)
                if limit:
                    committee_users = committee_users[offset: offset + int(limit)]
                current_cnt = len(committee_users)
                committee['users'] = committee_users

                data = {"committee": committee, "next": 0, "prev": 0, "count": current_cnt,"total": total_cnt}
                return data
            else:
                return {'error': 'Committee Not Found against Specific Details'}
        else:
            return {'error': 'Committee Not Found against Specific Details'}

    @classmethod
    def get_records(cls, request, params):
        kw = params.get('kw')
        committees_orm = []
        if kw:
            committees_orm = ws_methods.search_db({'kw': kw, 'search_models': {'meetings': ['Committee']}})
        else:
            committees_orm = Committee.objects.filter()
        total_cnt = committees_orm.count()
        offset = params.get('offset')
        limit = params.get('limit')
        committees_orm = list(committees_orm)
        if limit:
            committees_orm = committees_orm[offset: offset + int(limit)]
        current_cnt = total_cnt
        committees = ws_methods.queryset_to_list(
            committees_orm,
            fields=['id', 'name', 'description'],
            related={
                'users': {'fields': ['id', 'username', 'image']}
            }
        )

        data = {'records':committees, 'total': total_cnt, 'count': current_cnt}
        return data