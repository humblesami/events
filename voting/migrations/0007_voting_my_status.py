# Generated by Django 2.2 on 2019-05-03 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voting', '0006_votinganswer_user_answer'),
    ]

    operations = [
        migrations.AddField(
            model_name='voting',
            name='my_status',
            field=models.CharField(default='pending', max_length=50),
        ),
    ]
