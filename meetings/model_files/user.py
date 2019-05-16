import base64
import io

from django.db import models
from mainapp import ws_methods
from documents.file import File
from django.core.files.base import ContentFile
from django.utils.translation import gettext_lazy as _
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User as user_model, Group as group_model, UserManager, Permission

from django.core.files import File as DjangoFile
from mainapp.ws_methods import queryset_to_list, obj_to_dict

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
    name = models.CharField(max_length=200, default='', blank=True)
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
    ethnicity = models.IntegerField(choices=ETHINICITY_CHOICES, blank=True, null=True)
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
    signature_data = models.BinaryField(default=b'', null=True, blank=True)
    resume = models.OneToOneField(File, null=True, on_delete=models.CASCADE)
    # user_type = models.CharField(max_length=50)

    def __str__(self):
        return self.fullname()

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
        group = params.get('type')
        profiles = Profile.objects.filter(groups__name__iexact=group)
        total_cnt = profiles.count()
        current_cnt = total_cnt
        profiles = queryset_to_list(
            profiles,fields=['username','image','email','id']
        )
        profiles_json = {'records': profiles, 'total': total_cnt, 'count': current_cnt}
        return profiles_json

    @classmethod
    def get_details(cls, request, params):
        user_id = params.get('id')
        group = params.get('type')
        if not user_id:
            user_id = request.user.id
        profile_orm = Profile.objects.filter(pk=user_id)
        if not profile_orm:
            user_object = user_model.objects.get(pk=user_id)
            if user_object.is_superuser:
                profile_object = Profile(user_ptr=user_object, name=user_object.username)
                profile_object.save()
                create_group(user_object, 'Admin')
                profile_orm = profile_object
        else:
            profile_orm = profile_orm[0]
        profile = obj_to_dict(
            profile_orm,
            fields=[
                'id', 'name', 'image', 'bio', 'location', 'birth_date', 'nick_name', 'job_title', 'department',
                'work_phone', 'mobile_phone', 'website', 'fax', 'ethnicity', 'gender', 'veteran',
                'disability', 'board_joining_date', 'admin_first_name', 'admin_last_name', 'admin_nick_name',
                'admin_cell_phone', 'admin_email', 'admin_work_phone', 'admin_fax', 'admin_image', 'mail_to_assistant',
                'term_start_date', 'term_end_date', 'date_joined'
            ],
        )
        profile['name'] = profile_orm.fullname()
        profile['date_joined'] = str(profile['date_joined'])
        profile['disability'] = profile_orm.get_disability_display()
        profile['ethnicity'] = profile_orm.get_ethnicity_display()
        profile['gender'] = profile_orm.get_gender_display()
        profile['veteran'] = profile_orm.get_veteran_display()
        profile['signature_data'] = profile_orm.signature_data.decode()
        resume = profile_orm.resume
        if resume:
            profile['resume'] = {'id': resume.id}
        gender = ws_methods.choices_to_list(profile_orm._meta.get_field('gender').choices)
        disability = ws_methods.choices_to_list(profile_orm._meta.get_field('disability').choices)
        ethnicity = ws_methods.choices_to_list(profile_orm._meta.get_field('ethnicity').choices)
        veteran = ws_methods.choices_to_list(profile_orm._meta.get_field('veteran').choices)
        choice_fields = {'gender': gender, 'disability': disability, 'ethnicity': ethnicity, 'veteran': veteran}
        data = {"profile": profile, "next": 0, "prev": 0, 'choice_fields': choice_fields}
        return data

    @classmethod
    def update_profile(cls, request, params):
        user_id = request.user.id
        profile = Profile.objects.get(pk=user_id)

        for key in params:
            if key != 'signature_data' and key !=' image' and key !=' admin_image' and key !='resume':
                setattr(profile, key, params[key])


        if params.get('resume'):
            image_data = params['resume']

            format, imgstr = image_data.split(';base64,')
            binary_data = io.BytesIO(base64.b64decode(imgstr))
            jango_file = DjangoFile(binary_data)

            file_name = ''
            resume_file = profile.resume # File.objects.filter(user_id=user_id)
            if not resume_file:
                file_name = 'resume_' + str(user_id) + '.pdf'
                resume_file = File(name=file_name, file_type='resume')
            else:
                file_name = resume_file.name

            resume_file.attachment.save(file_name, jango_file)
            resume_file.save()

            profile.resume = resume_file
            profile.save()

        if params.get('image'):
            image_data = params['image']
            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]

            data = ContentFile(base64.b64decode(imgstr))
            file_name = 'image_'+str(user_id) + '.' + ext
            profile.image.save(file_name, data, save=True)

        if params.get('admin_image'):
            image_data = params['admin_image']
            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]

            data = ContentFile(base64.b64decode(imgstr))
            file_name = 'admin_image_'+str(user_id) + '.' + ext
            profile.admin_image.save(file_name, data, save=True)

        profile.save()
        return 'done'


    @classmethod
    def save_signature(cls, request, params):
        user_id = request.user.id
        profile = Profile.objects.get(pk=user_id)
        signature_data = params['signature_data']
        signature_data = signature_data.encode()
        # signature_data = base64.encodebytes(signature_data)
        profile.signature_data = signature_data
        profile.save()
        return 'done'

    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)
        self.is_staff = True

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


class MeetingGroup(group_model):
    pass
    # app_label = models.CharField(max_length=100)
