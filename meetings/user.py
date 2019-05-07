from django.apps import apps
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User as user_model, Group as group_model, UserManager, Permission


GENDER_CHOICES = (
    (1, _("Male")),
    (2, _("Female")),
    (3, _("Other")),
    (4, _("I decline to answer"))
)
MARITAL_CHOICES = (
    (1, _("Single")),
    (2, _("Married")),
    (3, _("Widower")),
    (4, _("Divorced"))
)
YES_NO_CHOICES = (
    (1, _("Yes")),
    (2, _("No")),
    (3, _("I decline to answer"))
)
ETHINICITY_CHOICES = (
    (1, _("Hispanic or Latino")),
    (2, _("American Indian or Alaskan Native")),
    (3, _("Asian")),
    (4, _("Native Hawaiian or Other Native Pacific Islander")),
    (5, _("Black or African American")),
    (6, _("White")),
    (7, _("Two or more races")),
    (8, _("I decline to answer"))
)

permission_set = {
    'Director':{
        'meetings':{
            'event':{'view':1,}
        },
        'voting':{},
        'authtoken':{
            'token':{
                'view':1,
                'add':1,
                'delete': 1,
            }
        },
    },
    'Staff': {
         'meetings':{
            'event':{'view':1,}
        },
        'voting':{},
        'authtoken': {
            'token': {
                'view': 1,
                'add': 1,
                'delete': 1,
            }
        },
    },
    'Admin': {
         'meetings':{
            'event':{'view':1,}
        },
        'voting':{},
        'authtoken': {
            'token': {
                'view': 1,
                'add': 1,
                'delete': 1,
            }
        },
    }
}

def create_group(obj, group_name):
    user_group = False
    try:
        user_group = MeetingGroup.objects.get(name=group_name)
        obj.groups.add(user_group)
        obj.save()
    except:
        user_group = MeetingGroup.objects.create(name=group_name)
        obj.groups.add(user_group)
        obj.save()
        group_permissions = permission_set[group_name]
        for app_name in group_permissions:
            for model_name in group_permissions[app_name]:
                model_permissions = group_permissions[app_name][model_name]
                content_id = ContentType.objects.filter(app_label=app_name, model=model_name)[0].id
                for permission_type in model_permissions:
                    code_name = permission_type+'_'+model_name
                    permission = Permission.objects.filter(content_type_id=content_id, codename=code_name)[0]
                    user_group.permissions.add(permission)


class Profile(user_model):
    class Meta:
        verbose_name_plural = "MeetVUE  Users"
    name = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to='profile/', default='profile/ETjUSr1v2n.png', null=True)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    nick_name = models.CharField(max_length=30, blank=True)
    job_title = models.CharField(max_length=30, blank=True)
    department = models.CharField(max_length=30, blank=True)
    work_phone = models.CharField(max_length=30, blank=True)
    mobile_phone = models.CharField(max_length=30, blank=True)
    website = models.CharField(max_length=30, blank=True)
    fax = models.CharField(max_length=30, blank=True)
    ethinicity = models.IntegerField(choices=ETHINICITY_CHOICES, blank=True, null=True)
    gender = models.IntegerField(choices=GENDER_CHOICES, blank=True, null=True)
    veteran = models.IntegerField(choices=YES_NO_CHOICES, blank=True, null=True)
    disability = models.IntegerField(choices=YES_NO_CHOICES, blank=True, null=True)

    board_joining_date = models.DateField('board joining date', blank=True, null=True)
    admin_first_name = models.CharField(max_length=30, blank=True, null=True)
    admin_last_name = models.CharField(max_length=30, blank=True, null=True)
    admin_nick_name = models.CharField(max_length=30, blank=True, null=True)
    admin_cell_phone = models.CharField(max_length=30, blank=True, null=True)
    admin_email = models.CharField(max_length=30, blank=True, null=True)
    admin_work_phone = models.CharField(max_length=30, blank=True, null=True)
    admin_fax = models.CharField(max_length=30, blank=True, null=True)
    admin_image = models.ImageField(upload_to='profile/', default='profile/ETjUSr1v2n.png', null=True)
    mail_to_assistant = models.BooleanField( blank=True, null=True)
    term_start_date = models.DateField( blank=True, null=True)
    term_end_date = models.DateField( blank=True, null=True)
    signature_image = models.ImageField(upload_to='profile/', null=True)
    resume = models.FileField(upload_to='files/', null=True,blank=True)
    # user_type = models.CharField(max_length=50)

    def __str__(self):
        return self.username

    def fullname(self):
        user = self
        name = False
        if user.first_name:
            name = user.first_name
            if user.last_name:
                name += ' ' + user.last_name
        elif user.last_name:
            name += user.last_name
        else:
            name = user.username
        return name

    @classmethod
    def get_records(cls, request, params):
        profiles = Profile.objects.values()
        total_cnt = profiles.count()
        current_cnt = total_cnt
        profiles = list(profiles)
        for profile in profiles:
            profile['date_joined'] = str(profile['date_joined'])
            profile['last_login'] = str(profile['last_login'])
            profile['birth_date'] = str(profile['birth_date'])
            profile['term_start_date'] = str(profile['term_start_date'])
            profile['term_end_date'] = str(profile['term_end_date'])
            profile['board_joining_date'] = str(profile['board_joining_date'])
            if profile['first_name'] or profile['last_name']:
                profile['name'] = profile['first_name'] +' ' + profile['last_name']
            else:
                profile['name'] = profile['username']
            profile['image_small'] = 'media/'+profile['image']
        profiles_json = {'records':profiles, 'total':total_cnt, 'count':current_cnt}
        return profiles_json

    @classmethod
    def get_details(cls, request, params):
        user_id = params['id']
        profile = Profile.objects.filter(pk=user_id)[0].__dict__
        profile['date_joined'] = str(profile['date_joined'])
        profile['last_login'] = str(profile['last_login'])
        profile['birth_date'] = str(profile['birth_date'])
        profile['term_start_date'] = str(profile['term_start_date'])
        profile['term_end_date'] = str(profile['term_end_date'])
        profile['board_joining_date'] = str(profile['board_joining_date'])

        profile['image'] = "media/"+profile['image']
        profile['admin_image'] = "media/" + profile['admin_image']
        profile['name'] = profile['username']
        if profile.get('_state'):
            del profile['_state']
        data = {"profile": profile, "next": 0, "prev": 0}

    #     uid = ws_methods.check_auth(values)
    #     if not uid:
    #         return ws_methods.not_logged_in()
    #     req_env = http.request.env
    #     mp_user_id = 0
    #     if 'data' in values:
    #         values = values['data']
    #     if 'id' in values:
    #         mp_user_id = values['id']
    #
    #     next = False
    #     prev = False
    #
    #     if mp_user_id:
    #         profile = req_env['meeting_point.users'].search([('id', '=', mp_user_id)])
    #         prev = req_env['meeting_point.users'].search([('id', '<', values['id'])], limit=1, order='id desc')
    #         next = req_env['meeting_point.users'].search([('id', '>', values['id'])], limit=1, order='id')
    #         next = next.id
    #         prev = prev.id
    #     else:
    #         profile = req_env['meeting_point.users'].search([('user_id', '=', uid)])
    #     if not profile:
    #         return ws_methods.http_response('User not in meeting point')
    #
    #     props = ['id', 'name', 'image_medium', 'resume', 'email', 'nick_name', 'website', 'companies', 'bio',
    #              'mobile_phone', 'work_phone',
    #              'fax', 'job_title', 'signature_img', 'department', 'board_joing_date', 'admin_first_name',
    #              'admin_last_name',
    #              'admin_image', 'admin_nick_name', 'admin_email', 'admin_fax', 'admin_cell_phone',
    #              'admin_work_phone', 'mail_to_assistant', 'term_start_date', 'term_end_date',
    #              'companies', 'board_joing_date', 'bio', 'ethinicity', 'gender', 'veteran', 'disability']
    #
    #     committees = ws_methods.objects_list_to_json_list(profile.committee_ids, ['id', 'name'])
    #     profile_json = ws_methods.object_to_json_object(profile, props)
    #     profile_json['committees'] = committees
    #
    #     # dnspuser = req_env['dnspusers'].search([('user_id','=', uid)])
    #     # sign = dnspuser.signature
    #     # if sign:
    #     #     # profile_json['signature'] = sign.decode('utf-8')
    #     #
    #     #     profile_json['signature'] = ws_methods.mfile_url("dnspusers","signature",uid,"image")
    #
    #     gmt = 0
    #     if 'gmt' in values:
    #         gmt = values['gmt']
    #     if mp_user_id:
    #         mp_user_id = int(mp_user_id)
    #         uid = req_env['res.users'].search([('mp_user_id', '=', mp_user_id)]).id
    #     profile_json['login'] = self.last_login(uid, gmt)
    #
    #     data = {"profile": profile_json, "next": next, "prev": prev}
    #     return ws_methods.http_response('', data)
    #
    # except:
    # return ws_methods.handle()
        return data

    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)
        self.is_staff = True


class ManagerDirector(UserManager):
    def get_queryset(self):
        return super(ManagerDirector, self).get_queryset().filter(groups__name__in=['Director'])

class ManagerAdmin(UserManager):
    def get_queryset(self):
        return super(ManagerAdmin, self).get_queryset().filter(groups__name__in=['Admin'])

class ManagerStaff(UserManager):
    def get_queryset(self):
        return super(ManagerStaff, self).get_queryset().filter(groups__name__in=['Staff'])

class Director(Profile):
    objects = ManagerDirector()
    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        created = self.pk
        super(Director, self).save(*args, **kwargs)
        if not created:
            create_group(self, 'Director')

class Admin(Profile):
    objects = ManagerAdmin()
    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        created = self.pk
        super(Admin, self).save(*args, **kwargs)
        if not created:
            create_group(self, 'Admin')

class Staff(Profile):
    objects = ManagerStaff()
    class Meta:
        proxy = True
        verbose_name_plural = "Staff"

    def save(self, *args, **kwargs):
        created = self.pk
        super(Staff, self).save(*args, **kwargs)
        if not created:
            create_group(self, 'Staff')


# ////////////////////GROUPS//////////////////////////////////


class MeetingGroup(group_model):
    pass
    # app_label = models.CharField(max_length=100)
