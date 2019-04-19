# Generated by Django 2.1.4 on 2018-12-27 06:47

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('auth_view', '0026_auto_20181227_1135'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Email', models.EmailField(max_length=254)),
                ('Date', models.DateTimeField(blank=True, default=datetime.datetime.now)),
                ('Status', models.IntegerField(choices=[(0, 'User Newely Created'), (1, 'User Activated'), (2, 'Regenerated Activation Link')], default=1)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
