# Generated by Django 2.2 on 2019-05-02 09:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meetings', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='profile',
            options={'verbose_name_plural': 'MeetVUE Users'},
        ),
        migrations.AlterModelOptions(
            name='staff',
            options={'verbose_name_plural': 'Staff'},
        ),
        migrations.RemoveField(
            model_name='meetinggroup',
            name='app_label',
        ),
    ]
