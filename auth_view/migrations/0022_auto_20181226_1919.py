# Generated by Django 2.1.4 on 2018-12-26 14:19

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_view', '0021_auto_20181226_1911'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userid', models.IntegerField()),
                ('Date', models.DateTimeField(blank=True, default=datetime.datetime.now)),
                ('Status', models.IntegerField(choices=[(0, 'User Newely Created'), (1, 'User Activated'), (2, 'Regenerated Activation Link')], default=1)),
            ],
        ),
        migrations.RemoveField(
            model_name='userlogs123',
            name='user_id',
        ),
        migrations.DeleteModel(
            name='UserLogs123',
        ),
    ]
