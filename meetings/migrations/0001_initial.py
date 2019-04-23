# Generated by Django 2.2 on 2019-04-23 08:30

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import meetings.user


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('start_date', models.DateTimeField(verbose_name='start date')),
            ],
        ),
        migrations.CreateModel(
            name='Admin',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('auth.user',),
            managers=[
                ('objects', meetings.user.ManagerAdmin()),
            ],
        ),
        migrations.CreateModel(
            name='Director',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('auth.user',),
            managers=[
                ('objects', meetings.user.ManagerDirector()),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('auth.group',),
            managers=[
                ('objects', django.contrib.auth.models.GroupManager()),
            ],
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('auth.user',),
            managers=[
                ('objects', meetings.user.ManagerStaff()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='meetings.Event')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='profile/ETjUSr1v2n.png', null=True, upload_to='profile/')),
                ('bio', models.TextField(blank=True, max_length=500)),
                ('location', models.CharField(blank=True, max_length=30)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('nick_name', models.CharField(blank=True, max_length=30)),
                ('job_title', models.CharField(blank=True, max_length=30)),
                ('department', models.CharField(blank=True, max_length=30)),
                ('work_phone', models.CharField(blank=True, max_length=30)),
                ('mobile_phone', models.CharField(blank=True, max_length=30)),
                ('website', models.CharField(blank=True, max_length=30)),
                ('fax', models.CharField(blank=True, max_length=30)),
                ('ethinicity', models.IntegerField(blank=True, choices=[(1, 'Hispanic or Latino'), (2, 'American Indian or Alaskan Native'), (3, 'Asian'), (4, 'Native Hawaiian or Other Native Pacific Islander'), (5, 'Black or African American'), (6, 'White'), (7, 'Two or more races'), (8, 'I decline to answer')], null=True)),
                ('gender', models.IntegerField(blank=True, choices=[(1, 'Male'), (2, 'Female'), (3, 'Other'), (4, 'I decline to answer')], null=True)),
                ('veteran', models.IntegerField(blank=True, choices=[(1, 'Yes'), (2, 'No'), (3, 'I decline to answer')], null=True)),
                ('disability', models.IntegerField(blank=True, choices=[(1, 'Yes'), (2, 'No'), (3, 'I decline to answer')], null=True)),
                ('board_joining_date', models.DateField(blank=True, null=True, verbose_name='board joining date')),
                ('admin_first_name', models.CharField(blank=True, max_length=30, null=True)),
                ('admin_last_name', models.CharField(blank=True, max_length=30, null=True)),
                ('admin_nick_name', models.CharField(blank=True, max_length=30, null=True)),
                ('admin_cell_phone', models.CharField(blank=True, max_length=30, null=True)),
                ('admin_email', models.CharField(blank=True, max_length=30, null=True)),
                ('admin_work_phone', models.CharField(blank=True, max_length=30, null=True)),
                ('admin_fax', models.CharField(blank=True, max_length=30, null=True)),
                ('admin_image', models.ImageField(default='profile/ETjUSr1v2n.png', null=True, upload_to='profile/')),
                ('mail_to_assistant', models.BooleanField(blank=True, null=True)),
                ('term_start_date', models.DateField(blank=True, null=True)),
                ('term_end_date', models.DateField(blank=True, null=True)),
                ('signature_image', models.ImageField(null=True, upload_to='profile/')),
                ('resume', models.FileField(null=True, upload_to='files/')),
                ('user', models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='mp_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='GroupExtend',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app_label', models.CharField(blank=True, max_length=30)),
                ('group', models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, to='auth.Group')),
            ],
        ),
        migrations.AddField(
            model_name='event',
            name='attendees',
            field=models.ManyToManyField(to='meetings.User'),
        ),
        migrations.CreateModel(
            name='Committee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='name')),
                ('users', models.ManyToManyField(blank=True, related_name='committees', to='meetings.Profile')),
            ],
        ),
    ]
