# Generated by Django 2.2 on 2019-04-23 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meetings', '0002_remove_event_attendees'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='attendees',
            field=models.ManyToManyField(to='meetings.User'),
        ),
    ]
