# Generated by Django 2.2 on 2019-04-29 11:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meetings', '0009_auto_20190429_1626'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='city',
            field=models.CharField(default=None, max_length=200, verbose_name='City'),
        ),
    ]
