import io
import os
import json
import sys
import uuid
import base64
import traceback

from django.db import models
from django.db.models import UniqueConstraint

from mainapp import ws_methods
from documents.file import File
from django.core.files.base import ContentFile
from django.core.files import File as DjangoFile
from meetings.model_files.committee import Committee
from django.utils.translation import gettext_lazy as _
from mainapp.settings import server_base_url, ip2location
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User as user_model, Group as group_model, UserManager, Permission

from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in

from mainapp.models import CustomModel

TWO_FACTOR_CHOICES = (
    (1, _("Email")),
    (2, _("Phone"))
)

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

from django.apps import apps

def get_permission_set(group_name):
    permission_set = {}
    all_models = apps.get_models()
    perm_set = {}
    if group_name == 'Admin':
        perm_set = {
            'view': 1,
            'add': 1,
            'change': 1
        }
    elif group_name == 'Director' or group_name == 'Staff':
        perm_set = {
            'view': 1
        }

    group_permissions = {}
    for model_obj in all_models:
        meta = model_obj._meta
        parents = meta.parents
        app_name = meta.app_label
        model_name = meta.model_name
        if not group_permissions.get(app_name):
            group_permissions[app_name] = {}
        group_permissions[app_name][model_name] = perm_set

    if group_name == 'Director' or group_name == 'Staff':
        group_permissions['meetings']['profile'] = {'view': 1, 'change': 1}
        group_permissions['authtoken']['token'] = {'view': 1, 'add': 1}

    return group_permissions

def create_group(obj, group_name):
    error_list = []
    user_group = None
    try:
        user_group = group_model.objects.filter(name=group_name)
        if user_group:
            user_group = user_group[0]
            obj.groups.add(user_group)
            obj.save()
            return 'done'
        user_group = group_model.objects.create(name=group_name)
        group_permissions = get_permission_set(group_name)
        for app_name in group_permissions:
            for model_name in group_permissions[app_name]:
                model_permissions = group_permissions[app_name][model_name]

                content_id = ContentType.objects.filter(app_label=app_name, model=model_name)
                if not content_id:
                    error_list.append('No content id for ' + app_name + '.' + model_name)
                    continue
                else:
                    content_id = content_id[0].id
                for permission_type in model_permissions:
                    code_name = permission_type + '_' + model_name
                    permission = Permission.objects.filter(content_type_id=content_id, codename=code_name)
                    if not permission:
                        error_list.append('No permission entry for content_type_id='+str(content_id)+' for '+app_name+'.'+model_name)
                        continue
                    else:
                        permission = permission[0]
                    user_group.permissions.add(permission)
            obj.groups.add(user_group)
            obj.save()
        if error_list:
            return error_list
        else:
            return 'done'
    except:
        eg = traceback.format_exception(*sys.exc_info())
        errorMessage = ''
        cnt = 0
        for er in eg:
            cnt += 1
            if not 'lib/python' in er:
                errorMessage += " " + er
        return errorMessage


class LoginLocation(models.Model):
    country = models.CharField(max_length=128, null=True)
    city = models.CharField(max_length=128, null=True)
    zip = models.CharField(max_length=16, null=True)
    region = models.CharField(max_length=128, null=True)
    longitude = models.CharField(max_length=16, null=True)
    latitude = models.CharField(max_length=16, null=True)
    time_zone = models.CharField(max_length=64, null=True)
    ip = models.GenericIPAddressField(null=True)


class LoginEntry(models.Model):
    name = models.CharField(max_length=64, null=True)
    user_id = models.IntegerField(null=True)
    location = models.ForeignKey(LoginLocation, null=True, on_delete=models.SET_NULL)
    path_info = models.CharField(max_length=64, null=True)
    operating_system = models.CharField(max_length=32, null=True)
    login_time = models.DateTimeField(auto_now_add=True, null=True)
    browser = models.CharField(max_length=123, null=True)

    def __str__(self):
        return self.name

    @classmethod
    def get_last_login_info(cls, user_id):
        entry = LoginEntry.objects.filter(user_id=user_id).order_by('-id')
        if entry:
            entry = entry[0]
            location = {
                'city': entry.location.city,
                'country': entry.location.country,
                'region': entry.location.region,
                'zip': entry.location.zip,
                'longitude': entry.location.longitude,
                'latitude': entry.location.latitude,
                'ip': entry.location.ip,
            }

            entry = {
                'operating_system': entry.operating_system,
                'location': location,
                'login_time': str(entry.login_time),
                'browser': entry.browser
            }
            if location['country'] or location ['longitude']:
                entry['has_location'] = 1
            return entry
        else:
            return 'No login info'


def get_location_from_ip(ip):
    req_url = ip2location['prefix'] + ip + ip2location['postfix']
    print(req_url)
    res = ws_methods.http_request(req_url)
    res = json.loads(res)
    return res

@receiver(user_logged_in)
def user_logged_in_callback(sender, request, user, **kwargs):
    ws_methods.threadedOperation(make_login_entry, args=(request, user))    

import httpagentparser

def get_browser(agent):
    browser = httpagentparser.detect(agent)
    if not browser:
        browser = agent.split('/')[0]
    else:
        browser = browser['browser']['name']  

    return browser

def make_login_entry(request, user):
    meta = request.META
    ip = get_client_ip(request)
    operating_system = meta.get('SESSION')
    
    
    time_zone = meta.get('TZ')
    agent = meta.get('HTTP_USER_AGENT')
    print('\n\n\n\n')
    print(meta)
    print(operating_system)
    print('\n\n\n\n')
    browser = get_browser(agent)    
    path_info = meta.get('PATH_INFO')
    res = get_location_from_ip(ip)
    location = LoginLocation.objects.filter(
        time_zone=time_zone,
        ip = ip,
        country=res.get('country_name'),
        city=res.get('city'),
        zip=res.get('zip'),        
        region=res.get('region_name'),
        longitude=res.get('longitude'),
        latitude=res.get('latitude')        
    ).first()
    if not location:
        location = LoginLocation.objects.create(
            time_zone=time_zone,
            ip = ip,
            country=res.get('country_name'),
            city=res.get('city'),
            zip=res.get('zip'),
            region=res.get('region_name'),
            longitude=res.get('longitude'),
            latitude=res.get('latitude')
        )

    
    login_entry = LoginEntry(
        location_id=location.id,
        user_id=user.id,
        browser = browser,
        name=str(user.id) + '-' + ip,
        operating_system=operating_system,
    )
    if path_info != '/rest/public':
        login_entry.path_info = path_info
    login_entry.save()


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

# @receiver(user_logged_out)
# def user_logged_out_callback(sender, request, user, **kwargs):
#     ip = request.META.get('REMOTE_ADDR')
#     LoginEntry.objects.create(action='user_logged_out', ip=ip, username=user.username)
#
#
# @receiver(user_login_failed)
# def user_login_failed_callback(sender, credentials, **kwargs):
#     LoginEntry.objects.create(action='user_login_failed', username=credentials.get('username', None))


class Profile(user_model, CustomModel):
    class Meta:
        verbose_name_plural = "Boardsheet  Users"
    name = models.CharField(max_length=200, default='', blank=True)
    image = models.ImageField(upload_to='profile/', default='profile/default.png', null=True)
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
    ethnicity = models.IntegerField(choices=ETHINICITY_CHOICES, blank=True, null=True)
    gender = models.IntegerField(choices=GENDER_CHOICES, blank=True, null=True)
    veteran = models.IntegerField(choices=YES_NO_CHOICES, blank=True, null=True)
    disability = models.IntegerField(choices=YES_NO_CHOICES, blank=True, null=True)
    company = models.CharField(max_length=128, blank=True, null=True)
    board_joining_date = models.DateField('board joining date', blank=True, null=True)
    admin_first_name = models.CharField(max_length=30, blank=True, null=True)
    admin_last_name = models.CharField(max_length=30, blank=True, null=True)
    admin_nick_name = models.CharField(max_length=30, blank=True, null=True)
    admin_cell_phone = models.CharField(max_length=30, blank=True, null=True)
    admin_email = models.CharField(max_length=30, blank=True, null=True)
    admin_work_phone = models.CharField(max_length=30, blank=True, null=True)
    admin_fax = models.CharField(max_length=30, blank=True, null=True)
    admin_image = models.ImageField(upload_to='profile/', default='profile/default.png', null=True)
    mail_to_assistant = models.BooleanField(blank=True, null=True)
    term_start_date = models.DateField(blank=True, null=True)
    term_end_date = models.DateField(blank=True, null=True)
    signature_data = models.BinaryField(default=b'', null=True, blank=True)
    resume = models.OneToOneField(File, null=True, blank=True, on_delete=models.SET_NULL)
    two_factor_auth = models.IntegerField(choices=TWO_FACTOR_CHOICES, blank=True, null=True)
    email_verified = models.BooleanField(null=True, default=False)
    mobile_verified = models.BooleanField(null=True, default=False)
    image_updated = models.BooleanField(default=False)
    # user_type = models.CharField(max_length=50)

    UniqueConstraint(fields=['email'], name='unique_email')

    def __str__(self):
        return self.fullname()

    def save(self, *args, **kwargs):
        creating = False
        if self.two_factor_auth and self.two_factor_auth == 2 and not self.mobile_verified:
            return
            # raise ValidationError('Phone needs to be verified')
        profile_obj = Profile.objects.filter(pk=self.pk)
        password = self.password

        if not profile_obj:
            creating = True
            self.is_staff = True
            if self.email and not self.username:
                self.username = self.email
            self.image = ws_methods.generate_default_image(self.fullname())
        self.name = self.fullname()
        if profile_obj:
            profile_obj = profile_obj[0]
            if self.image != profile_obj.image:
                self.image_updated = True
            if not self.image_updated:
                if self.name != profile_obj.name:
                    curr_dir = os.path.dirname(__file__).replace('/meetings/model_files', '')
                    try:
                        os.remove(curr_dir + profile_obj.image.url)
                    except:
                        pass
                    self.image = ws_methods.generate_default_image(self.name)

        super(Profile, self).save(*args, **kwargs)
        if creating:
            if not self.is_superuser:
                random_password = uuid.uuid4().hex[:8]
                self.password_reset_on_creation_email(random_password)
                self.user_ptr.set_password(random_password)
            else:
                self.user_ptr.set_password(password)
            self.user_ptr.save()
            user_data = {
                'id': self.pk,
                'photo': self.image.url,
                'name': self.fullname()
            }
            events = [
                {'name': 'new_friend', 'data': user_data, 'audience': ['all_online']}
            ]
            ws_methods.emit_event(events)

    def fullname(self):
        user = self
        name = False
        if user.first_name:
            name = user.first_name
        if user.last_name:
            name += ' ' + user.last_name
        if not name:
            if not self.name:
                name = user.username
            else:
                name = self.name
        return name
    

    def is_admin(self):
        admin = False
        if self.groups.filter(name__in=['Admin']):
            admin = True
        return admin


    @property
    def admin_full_name(self):
        admin_full_name = ''
        if self.admin_first_name:
            admin_full_name = self.admin_first_name
        if self.admin_last_name and self.admin_first_name:
            admin_full_name += ' ' + self.admin_last_name
        elif self.admin_last_name:
            admin_full_name = self.admin_last_name
        return admin_full_name

    @classmethod
    def get_records(cls, request, params):
        group = params.get('type')
        profiles = []
        kw = params.get('kw')
        if kw:
            profiles = ws_methods.search_db({'kw': kw, 'search_models': {'meetings': ['Profile']}})
        else:
            profiles = Profile.objects.all().order_by('-pk')
            
        if group:
            profiles = profiles.filter(groups__name__iexact=group).order_by('-pk')
        
        total_cnt = profiles.count()
        offset = params.get('offset')
        limit = params.get('limit')
        profiles = list(profiles)
        if limit:
            profiles = profiles[offset: offset + int(limit)]
        profiles = ws_methods.get_user_info(profiles)
        count = len(profiles)
        profiles_json = {'records': profiles, 'total': total_cnt, 'count': count}
        return profiles_json

    @classmethod
    def get_personal_info(cls, request, params):
        profile_obj = params['profile_obj']
        profile = ws_methods.obj_to_dict(profile_obj, fields=[
            'id',
            'first_name',
            'last_name',
            'mobile_phone',
            'email',
            'birth_date',
            'location',
            'email_verified',
            'mobile_verified',
            'image'
        ])
        resume = profile_obj.resume
        if resume:
            profile['resume'] = {'id': resume.id}
        profile['signature_data'] = profile_obj.signature_data.decode()
        profile['two_factor_auth'] = {
            'id': profile_obj.two_factor_auth,
            'name': profile_obj.get_two_factor_auth_display()
        }
        return profile

    @classmethod
    def get_work_info(cls, request, params):
        profile_obj = params['profile_obj']
        profile = ws_methods.obj_to_dict(profile_obj, fields=[
            'company',
            'job_title',
            'department',
            'work_phone',
            'fax',
            'website',
        ])

        return profile

    @classmethod
    def get_board_info(cls, request, params):
        profile_obj = params['profile_obj']
        profile = ws_methods.obj_to_dict(profile_obj, fields=[
                    'board_joining_date',
                    'term_start_date',
                    'term_end_date'
                ],
                related={
                 'committees': {'fields': ['id', 'name']}
                })
        return profile

    @classmethod
    def get_admin_assistant_info(cls, request, params):
        profile_obj = params['profile_obj']
        profile = ws_methods.obj_to_dict(profile_obj, fields=[
            'admin_first_name',
            'admin_last_name',
            'admin_cell_phone',
            'admin_email',
            'admin_work_phone',
            'admin_fax',
            'admin_image',
            'mail_to_assistant'])
        profile['admin_full_name'] = profile_obj.admin_full_name
        return profile

    @classmethod
    def get_update_profile_details(cls, request, params):
        field_group = params['field_group']
        user_id = params.get('id')
        if not user_id:
            user_id = request.user.id
        group = params.get('type')
        profile_obj = Profile.objects.get(pk=user_id)
        profile = {}
        choice_fields = {
            'gender': [{'id': 0, 'name': ''}],
            'disability': [{'id': 0, 'name': ''}],
            'ethnicity': [{'id': 0, 'name': ''}],
            'veteran': [{'id': 0, 'name': ''}],
            'committees': [{'id': 0, 'name': ''}],
            'two_factor_auth': [{'id': 0, 'name': ''}],
            'groups': [{'id': 0, 'name': ''}]
        }
        param = {}
        param['profile_obj'] = profile_obj
        if field_group == 'personal':
            profile = cls.get_personal_info(request, param)
            choice_fields['two_factor_auth'] = ws_methods.choices_to_list(profile_obj._meta.get_field('two_factor_auth').choices)
        elif field_group == 'bio':
            profile = ws_methods.obj_to_dict(profile_obj, fields=['bio'],related={'groups': {'fields': ['id', 'name']}})
        elif field_group == 'work':
            profile = cls.get_work_info(request, param)
        elif field_group == 'board':
            profile = cls.get_board_info(request, param)
            choice_fields['committees'] = list(Committee.objects.values('id', 'name'))
            choice_fields['groups'] = list(group_model.objects.all().values('id', 'name'))
        elif field_group == 'diversity':
            choice_fields['gender'] = ws_methods.choices_to_list(profile_obj._meta.get_field('gender').choices)
            choice_fields['disability'] = ws_methods.choices_to_list(profile_obj._meta.get_field('disability').choices)
            choice_fields['ethnicity'] = ws_methods.choices_to_list(profile_obj._meta.get_field('ethnicity').choices)
            choice_fields['veteran'] = ws_methods.choices_to_list(profile_obj._meta.get_field('veteran').choices)
        elif field_group == 'administrative':
            profile = cls.get_admin_assistant_info(request, param)
        profile['groups'] = []
        groups = profile_obj.groups.all().values('id', 'name')
        for group in groups:
            profile['groups'].append(group)
        profile['name'] = profile_obj.fullname()
        profile['disability'] = {
            'id': profile_obj.disability,
            'name': profile_obj.get_disability_display()
        }
        profile['ethnicity'] = {
            'id': profile_obj.ethnicity,
            'name': profile_obj.get_ethnicity_display()
        }
        profile['gender'] = {
            'id': profile_obj.gender,
            'name': profile_obj.get_gender_display()
        }
        profile['veteran'] = {
            'id': profile_obj.veteran,
            'name': profile_obj.get_veteran_display()
        }
        profile['two_factor_auth'] = {
            'id': profile_obj.two_factor_auth,
            'name': profile_obj.get_two_factor_auth_display()
        }
        if profile['groups']:
            profile['group'] = profile['groups'][0]['name']
        data = {"profile": profile, "next": 0, "prev": 0, 'choice_fields': choice_fields}
        return data

    @classmethod
    def get_details(cls, request, params):
        user_id = params.get('id')
        group = params.get('type')
        if not user_id:
            user_id = request.user.id
        profile_orm = None
        if user_id == 'new':
            profile_orm = Profile.objects.filter(created_by_id=request.user.id).last()
            if profile_orm:
                user_id = profile_orm.id
        else:
            profile_orm = Profile.objects.get(pk=user_id)

        if not profile_orm:
            user_object = user_model.objects.get(pk=user_id)
            if user_object.is_superuser:
                profile_object = Profile(user_ptr=user_object, name=user_object.username)
                profile_object.save()
                create_group(user_object, 'Admin')
                profile_orm = profile_object
        else:
            admin_full_name = ''
            try:
                admin_full_name = profile_orm.admin_full_name
            except:
                pass
        profile = ws_methods.obj_to_dict(
            profile_orm,
            fields=[
                'id', 'name', 'username', 'first_name', 'last_name', 'email', 'image', 'bio', 'location', 'birth_date',
                'nick_name', 'company', 'job_title', 'department',
                'work_phone', 'mobile_phone', 'website', 'fax', 'ethnicity', 'gender', 'veteran',
                'disability', 'board_joining_date', 'admin_first_name', 'admin_last_name', 'admin_nick_name',
                'admin_cell_phone', 'admin_email', 'admin_work_phone', 'admin_fax', 'admin_image', 'mail_to_assistant',
                'term_start_date', 'term_end_date', 'date_joined', 'groups', 'email_verified', 'mobile_verified'
            ],
            related={
                'committees': {'fields': ['id', 'name']},
                'groups': {'fields': ['id', 'name']}
            }
        )
        if not profile['name']:
            profile['name'] = profile_orm.fullname()
        # profile['date_joined'] = str(profile['date_joined'])
        profile['disability'] = {
            'id': profile_orm.disability,
            'name': profile_orm.get_disability_display()
        }
        profile['ethnicity'] = {
            'id': profile_orm.ethnicity,
            'name': profile_orm.get_ethnicity_display()
        }
        profile['gender'] = {
            'id': profile_orm.gender,
            'name': profile_orm.get_gender_display()
        }
        profile['veteran'] = {
            'id': profile_orm.veteran,
            'name': profile_orm.get_veteran_display()
        }
        profile['two_factor_auth'] = {
            'id': profile_orm.two_factor_auth,
            'name': profile_orm.get_two_factor_auth_display()
        }
        profile['signature_data'] = profile_orm.signature_data.decode()
        if profile['groups']:
            profile['group'] = profile['groups'][0]['name']
        profile['admin_full_name'] = admin_full_name
        resume = profile_orm.resume
        if resume:
            profile['resume'] = {'id': resume.id}
        gender = ws_methods.choices_to_list(profile_orm._meta.get_field('gender').choices)
        disability = ws_methods.choices_to_list(profile_orm._meta.get_field('disability').choices)
        ethnicity = ws_methods.choices_to_list(profile_orm._meta.get_field('ethnicity').choices)
        veteran = ws_methods.choices_to_list(profile_orm._meta.get_field('veteran').choices)
        two_factor_auth = ws_methods.choices_to_list(profile_orm._meta.get_field('two_factor_auth').choices)
        committees = list(Committee.objects.values('id', 'name'))
        groups = list(group_model.objects.all().values('id', 'name'))
        choice_fields = {
            'gender': gender,
            'disability': disability,
            'ethnicity': ethnicity,
            'veteran': veteran,
            'committees': committees,
            'two_factor_auth': two_factor_auth,
            'groups': groups
        }
        profile['login_info'] = LoginEntry.get_last_login_info(profile_orm.id)
        data = {"profile": profile, "next": 0, "prev": 0, 'choice_fields': choice_fields}
        return data

    @classmethod
    def get_profile_summary(cls, request, params):
        user_id = params['user_id']
        profile_obj = Profile.objects.get(pk=user_id)
        profile = ws_methods.obj_to_dict(
            profile_obj,
            fields=['id', 'name', 'first_name', 'last_name', 'image', 'mobile_phone','company', 'email']
        )
        profile['groups'] = []
        groups = profile_obj.groups.all().values('id', 'name')
        for group in groups:
            profile['groups'].append(group)

        profile['photo'] = profile['image']
        return profile

    @classmethod
    def update_profile(cls, request, params):
        request_user = request.user
        if not request_user.profile.is_admin():
            params.pop('committees', None)
            params.pop('groups', None)
        user_id = params.get('user_id')
        if not user_id:
            user_id = request.user.id
        profile = Profile.objects.get(pk=user_id)
        for key in params:
            if key != 'committees' and key != 'signature_data' and key != ' image' and key != ' admin_image' and key != 'resume' and key != 'groups':
                if params[key] == '' and not profile._meta._forward_fields_map[key].max_length:
                    params[key] = None
                setattr(profile, key, params[key])
        committees = params.get('committees')
        if committees:
            if committees != 'removed_all':
                committee_ids = []
                for committee in committees:
                    committee_ids.append(committee['id'])

                all_committees = Committee.objects.filter(pk__in=committee_ids)
                current_committees = profile.committees.all()
                new_committees = set(all_committees) - set(current_committees)
                removed_committees = set(current_committees) - set(all_committees)
                for committee in new_committees:
                    committee.users.add(user_id)
                    committee.save()

                for committee in removed_committees:
                    committee.users.remove(user_id)
                    committee.save()
            else:
                current_committees = profile.committees.all()
                for committee in current_committees:
                    committee.users.remove(user_id)
                    committee.save()

        if params.get('resume'):
            image_data = params['resume']

            format, imgstr = image_data.split(';base64,')
            binary_data = io.BytesIO(base64.b64decode(imgstr))
            jango_file = DjangoFile(binary_data)

            file_name = ''
            resume_file = profile.resume  # File.objects.filter(user_id=user_id)
            if not resume_file:
                file_name = 'resume_' + str(user_id) + '.pdf'
            else:
                file_name = resume_file.name
            resume_file = File(name=file_name, file_type='resume')
            resume_file.attachment.save(file_name, jango_file)
            resume_file.save()
            profile.resume = resume_file
        elif 'resume' in params:
            profile.resume = None
            profile.save();

        if params.get('image'):
            image_data = params['image']
            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]

            data = ContentFile(base64.b64decode(imgstr))
            file_name = 'image_' + str(user_id) + '.' + ext
            profile.image.save(file_name, data, save=True)

        if params.get('admin_image'):
            image_data = params['admin_image']
            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]

            data = ContentFile(base64.b64decode(imgstr))
            file_name = 'admin_image_' + str(user_id) + '.' + ext
            profile.admin_image.save(file_name, data, save=True)

        if 'groups' in params:
            groups = profile.groups.all()
            for group in groups:
                group.user_set.remove(user_id)
                group.save()
            groups = params.get('groups')
            if groups:
                for group in groups:
                    profile.groups.add(group['id'])
                    profile.save()

        profile.save()
        data = {
            'id': profile.id,
            'name': profile.name,
            'photo': profile.image.url,
            'groups': list(profile.groups.all().values('id', 'name')),
            'username': profile.username
        }
        return {'profile_data': data}

    @classmethod
    def save_signature(cls, request, params):
        user_id = params.get('user_id')
        if not user_id:
            user_id = request.user.id
        profile = Profile.objects.get(pk=user_id)
        signature_data = params['signature_data']
        signature_data = signature_data.encode()
        # signature_data = base64.encodebytes(signature_data)
        profile.signature_data = signature_data
        profile.save()
        return 'done'

    def delete(self, using=None, keep_parents=False):
        uid = self.pk
        super(Profile, self).delete()
        events = [
            {'name': 'friend_removed', 'data': uid, 'audience': ['all_online']}
        ]
        ws_methods.emit_event(events)

    def password_reset_on_creation_email(self, random_password):
        try:
            if not self.email:
                return 'User email not exists in system'

            thread_data = {}
            thread_data['subject'] = 'Password Rest'
            thread_data['audience'] = [self.id]
            thread_data['template_data'] = {
                'url': server_base_url + '/user/reset-password/',
                'password': random_password
            }
            thread_data['template_name'] = 'user/user_creation_password_reset.html'
            thread_data['token_required'] = 1
            thread_data['post_info'] = {
                'res_app': 'meetings',
                'res_model': 'Profile',
                'res_id': self.id
            }
            ws_methods.send_email_on_creation(thread_data)
            return 'done'
        except:
            res = ws_methods.get_error_message()
            return res


    @classmethod
    def get_all_users(cls, request, params):
        users = None
        kw = params.get('kw')
        if kw:
            users = ws_methods.search_db({'kw': kw, 'search_models': {'meetings': ['Profile']}})

        else:
            users = Profile.objects.all()
        user_list = []
        for user in users:
            user_list.append({
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'image': user.image.url
            })
        data = {
            'users': user_list,
            'total': len(user_list)
        }
        return data


# class Resume(File):
#     user = models.ForeignKey(Profile, on_delete=models.CASCADE)

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


# class MeetingGroup(group_model):
#     pass
    # app_label = models.CharField(max_length=100)