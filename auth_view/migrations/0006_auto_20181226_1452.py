# Generated by Django 2.1.4 on 2018-12-26 09:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_view', '0005_auto_20181226_1309'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userlogs',
            name='Date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
