from meetings.model_files.user import Profile
from django.db import models
from mainapp.ws_methods import obj_to_dict, queryset_to_list, get_user_info

class Committee(models.Model):
    name = models.CharField(max_length=150)
    users = models.ManyToManyField(Profile, blank=True, related_name="committees")
    description = models.TextField(max_length=500, default='', blank=True)
    allUser = models.BooleanField('All Users', default=False)

    def __str__(self):
        return self.name

    @classmethod
    def get_detail(cls, request, params):
        comm_id = params.get('id')
        if comm_id:
            committee_orm = Committee.objects.filter(pk=comm_id)[0]
            committee = obj_to_dict(
                committee_orm,
                fields=['id', 'name', 'description']
            )
            if committee:
                committee_users = get_user_info(committee_orm.users.all())
                committee['users'] = committee_users

                data = {"committee": committee, "next": 0, "prev": 0}
                return data
            else:
                return {'error': 'Committee Not Found against Specific Details'}
        else:
            return {'error': 'Committee Not Found against Specific Details'}

    @classmethod
    def get_records(cls, request, params):
        committees_orm = Committee.objects.filter()
        total_cnt = committees_orm.count()
        current_cnt = total_cnt
        committees = queryset_to_list(
            committees_orm,
            fields=['id', 'name', 'description'],
            related={
                'users': {'fields': ['id', 'username', 'image']}
            }
        )

        data = {'records':committees, 'total': total_cnt, 'count': current_cnt}
        return data