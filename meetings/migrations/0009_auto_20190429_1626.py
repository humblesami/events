# Generated by Django 2.2 on 2019-04-29 11:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meetings', '0008_auto_20190429_1623'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='archived',
        ),
        migrations.RemoveField(
            model_name='event',
            name='city',
        ),
    ]
