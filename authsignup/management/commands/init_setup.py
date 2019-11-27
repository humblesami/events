from django.core.management.base import BaseCommand
from django.core.management import call_command


class Command(BaseCommand):
    help = 'setting up migrations and permissions against groups'

    def handle(self, *args, **kwargs):
        call_command('makemigrations')
        call_command('migrate')
        call_command('init_permissions')