# Generated by Django 2.2 on 2019-04-12 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voting', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='votingchoice',
            name='name',
        ),
        migrations.RemoveField(
            model_name='votingtype',
            name='name',
        ),
        migrations.AddField(
            model_name='votingchoice',
            name='choice',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='votingtype',
            name='voting_type',
            field=models.CharField(default='', max_length=100),
        ),
    ]
