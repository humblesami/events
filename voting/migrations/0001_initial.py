# Generated by Django 2.2 on 2019-05-07 11:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('meetings', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Voting',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, verbose_name='Title')),
                ('open_date', models.DateTimeField(verbose_name='Start Date')),
                ('close_date', models.DateTimeField(verbose_name='End Date')),
                ('signature_required', models.BooleanField(blank=True, default=False, verbose_name='Signature Required')),
                ('enable_discussion', models.BooleanField(blank=True, default=False, verbose_name='Enable Discussion')),
                ('public_visibility', models.BooleanField(blank=True, default=False, verbose_name='Results Visible To All')),
                ('description', models.TextField()),
                ('my_status', models.CharField(default='pending', max_length=50)),
                ('meeting', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='meetings.Event')),
                ('topic', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='meetings.Topic')),
            ],
        ),
        migrations.CreateModel(
            name='VotingType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Voting Type')),
            ],
        ),
        migrations.CreateModel(
            name='VotingChoice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Voting Choice')),
                ('voting_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='voting.VotingType')),
            ],
        ),
        migrations.CreateModel(
            name='VotingAnswer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('signature_data', models.BinaryField(blank=True, verbose_name='Signature Data')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('user_answer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='voting.VotingChoice')),
                ('voting', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='voting.Voting')),
            ],
        ),
        migrations.AddField(
            model_name='voting',
            name='voting_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='voting.VotingType'),
        ),
    ]
