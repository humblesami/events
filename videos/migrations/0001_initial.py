# Generated by Django 2.2 on 2019-05-07 08:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('meetings', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, verbose_name='Video Title')),
                ('url', models.CharField(max_length=500, verbose_name='Video Link')),
                ('news', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='meetings.News')),
            ],
        ),
    ]
