from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext, gettext_lazy as _
from django.contrib.auth.models import User as user_model,Group as group_model,UserManager
import datetime
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

class Profile(models.Model):
    user = models.OneToOneField(user_model, on_delete=models.CASCADE, related_name='mp_user', blank=True)
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
    resume = models.FileField(upload_to='files/', null=True)

    def save(self, *args, **kwargs):
        a =1

    def __str__(self):
        return self.user.username

    def fullname(self):
        user = self.user
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


class ManagerDirector(UserManager):
    def get_queryset(self):
        return super(ManagerDirector, self).get_queryset().filter(groups__name__in=['Director'])

class ManagerAdmin(UserManager):
    def get_queryset(self):
        return super(ManagerAdmin, self).get_queryset().filter(groups__name__in=['Admin'])

class ManagerStaff(UserManager):
    def get_queryset(self):
        return super(ManagerStaff, self).get_queryset().filter(groups__name__in=['Staff'])

class User(user_model):
    class Meta:
        proxy = True

class Director(user_model):
    objects = ManagerDirector()
    class Meta:
        proxy = True
    
    @classmethod
    def get_details(cls, request, params):
        return {'error': 'Not implemented'}

    @classmethod
    def get_records(cls, request, params):
        directors = Director.objects.values()
        total_cnt = directors.count()
        current_cnt = total_cnt
        directors = list(directors)
        directors[0]['name'] = directors[0]['username']
        del directors[0]['username']
        # directors[0].pop(directors[0]['name'])
        directors[0]['date_joined'] = str(directors[0]['date_joined'])
        profiles_json = {'records':directors, 'total':total_cnt, 'count':current_cnt}
        return profiles_json

    def save(self, *args, **kwargs):
        create = False
        if self.pk is None:
            create = True
        super(Director, self).save(*args, **kwargs)
        if create:
            try:
                user_group = group_model.objects.get(name="Director")
            except:
                user_group = Group.objects.create(name="Director")
                pass
            self.is_staff = True
            self.groups.add(user_group)
            self.save()
            
# @receiver(post_save, sender=Director)
# def set_groups_director(sender, instance, created, **kwargs):
#     if created:
#         d = g.objects.get(name="Director")
#         instance.groups.add(d)
#         instance.is_staff = True
#         instance.save()

class Admin(user_model):
    objects = ManagerAdmin()
    class Meta:
        proxy = True
    
    def save(self, *args, **kwargs):
        create = False
        if self.pk is None:
            create = True
        super(Admin, self).save(*args, **kwargs)
        if create:
            try:
                user_group = group_model.objects.get(name="Admin")
            except:
                user_group = Group.objects.create(name="Admin")
                pass
            self.is_staff = True
            self.groups.add(user_group)
            self.save()
            
class Staff(user_model):
    objects = ManagerStaff()
    class Meta:
        proxy = True
    
    def save(self, *args, **kwargs):
        create = False
        if self.pk is None:
            create = True
        super(Staff, self).save(*args, **kwargs)
        if create:
            try:
                user_group = group_model.objects.get(name="Staff")
            except:
                user_group = Group.objects.create(name="Staff")
                pass
            self.is_staff = True
            self.groups.add(user_group)
            self.save()


# ////////////////////GROUPS//////////////////////////////////

class GroupExtend(models.Model):
    group = models.OneToOneField(group_model, on_delete=models.CASCADE, blank=True)
    app_label = models.CharField(max_length=30, blank=True)

class Group(group_model):
    class Meta:
        proxy = True

@receiver(post_save, sender=Group)
def set_group_type(sender, instance, created, **kwargs):
    if created:
        GroupExtend.objects.create(app_label = "meetings",group=instance)
