# Generated by Django 2.2 on 2019-05-08 10:14

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django_countries.fields
import meetings.user


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('documents', '0001_initial'),
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('start_date', models.DateTimeField(null=True, verbose_name='start date')),
                ('end_date', models.DateTimeField(null=True, verbose_name='end date')),
                ('custom_message', models.CharField(blank=True, max_length=200, verbose_name='Message')),
                ('street', models.CharField(blank=True, max_length=50, verbose_name='Street')),
                ('description', models.TextField(blank=True)),
                ('publish', models.BooleanField(default=False, verbose_name='Publish')),
                ('country', django_countries.fields.CountryField(blank=True, max_length=2)),
                ('state', models.CharField(blank=True, max_length=200, verbose_name='State')),
                ('city', models.CharField(blank=True, max_length=200, verbose_name='City')),
                ('archived', models.BooleanField(default=False, verbose_name='Archived')),
                ('zip', models.CharField(blank=True, max_length=500, verbose_name='Zip')),
                ('pin', models.CharField(blank=True, max_length=50, verbose_name='Meeting PIN')),
                ('conference_bridge_number', models.CharField(blank=True, max_length=200, verbose_name='Conference Bridge No.')),
            ],
            options={
                'verbose_name_plural': 'Meetings',
                'verbose_name': 'Meeting',
            },
        ),
        migrations.CreateModel(
            name='MeetingGroup',
            fields=[
                ('group_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='auth.Group')),
            ],
            bases=('auth.group',),
            managers=[
                ('objects', django.contrib.auth.models.GroupManager()),
            ],
        ),
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
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
                ('resume', models.FileField(blank=True, null=True, upload_to='files/')),
            ],
            options={
                'verbose_name_plural': 'MeetVUE  Users',
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
                ('lead', models.CharField(blank=True, max_length=200)),
                ('duration', models.DurationField(blank=True, null=True)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='meetings.Event')),
            ],
        ),
        migrations.CreateModel(
            name='MeetingDocument',
            fields=[
                ('file_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='documents.File')),
                ('meeting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='meetings.Event')),
            ],
            bases=('documents.file',),
        ),
        migrations.AddField(
            model_name='event',
            name='attendees',
            field=models.ManyToManyField(to='meetings.Profile'),
        ),
        migrations.CreateModel(
            name='Committee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='name')),
                ('summary', models.TextField(max_length=500, null=True, verbose_name='Summary')),
                ('allUser', models.BooleanField(default=False, verbose_name='All Users')),
                ('users', models.ManyToManyField(blank=True, related_name='committees', to='meetings.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='AgendaDocument',
            fields=[
                ('file_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='documents.File')),
                ('agenda', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='meetings.Topic')),
            ],
            bases=('documents.file',),
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
            bases=('meetings.profile',),
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
            bases=('meetings.profile',),
            managers=[
                ('objects', meetings.user.ManagerDirector()),
            ],
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
            ],
            options={
                'verbose_name_plural': 'Staff',
                'constraints': [],
                'proxy': True,
                'indexes': [],
            },
            bases=('meetings.profile',),
            managers=[
                ('objects', meetings.user.ManagerStaff()),
            ],
        ),
    ]
