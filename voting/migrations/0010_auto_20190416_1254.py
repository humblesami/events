# Generated by Django 2.2 on 2019-04-16 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voting', '0009_auto_20190412_1404'),
    ]

    operations = [
        migrations.AddField(
            model_name='voting',
            name='enable_discussion',
            field=models.BooleanField(blank=True, default=False, verbose_name='Signature Required'),
        ),
        migrations.AddField(
            model_name='voting',
            name='public_visibility',
            field=models.BooleanField(blank=True, default=False, verbose_name='Results Visible To All'),
        ),
        migrations.AddField(
            model_name='voting',
            name='signature_required',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]
