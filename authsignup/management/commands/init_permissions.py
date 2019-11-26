from django.core.management.base import BaseCommand
from django.utils import timezone
from django.contrib.auth.models import Permission
from django.contrib.auth.models import ContentType
from django.contrib.auth.models import Group
from django.db import transaction
import json

class Command(BaseCommand):
    help = 'Displays current time'

    def add_permissions(self):
        group_permissions_data = None
        content_types_data = None
        with open('group_permissions.json', 'r') as gperms:
            group_permissions_data = json.load(gperms)

        with open('content_types.json', 'r') as ctypes:
            content_types_data = json.load(ctypes)
        print('Please wait setting up permissions...')
        with transaction.atomic():
            for group in group_permissions_data:
                obj_group = Group.objects.get(name=group)
                obj_group.permissions.clear()
                apps = group_permissions_data[group]
                for app in apps:
                    models = apps[app]
                    for model in models:
                        perms = models[model]
                        for key, val in perms.items():
                            if val:
                                content_type_id = content_types_data[app][model]
                                code_name = key + '_' + model
                                obj_perm = Permission.objects.get(content_type_id=content_type_id,
                                                                codename=code_name)
                                obj_group.permissions.add(obj_perm)

        print('Permissions are set to the Groups')
        # for group in obj_permissions:            
        #     obj_group = {}
        #     obj_group.permissions.clear()
        #     for app in apps:
        #         for model in models:
        #             content_type_id = content_types[app][model]
        #             for perm_type in model:
        #                 code_name = perm_type + '_' + model
        #                 obj_perm = Permission.objects.get(codename = code_name, content_type_id=content_type_id)
        #                 obj_group.permissions.add(obj_perm.id)




        # pass


    def handle(self, *args, **kwargs):
        self.add_permissions()
        # perms = Permission.objects.all()
        # for perm in perms:
        #     print(perm.name)
        # res = {}
        # ctypes = ContentType.objects.all()
        # for ctype in ctypes:
        #     try:
        #         if not res[ctype.app_label]:
        #             res[ctype.app_label] = {}
        #     except:
        #         res[ctype.app_label] = {}
        #     res[ctype.app_label].update({
        #         ctype.model: ctype.id
        #     })
        #     with open('contents.txt', 'w+') as outFile:
        #         jsonData = json.dumps(res)
        #         outFile.write(jsonData)
        ###################################################################################
        # groups = Group.objects.all()
        # res = {}
        # ctypes = ContentType.objects.prefetch_related('permission_set').all()
        # for group in groups:
        #     try:
        #         if not res[group.name]:
        #             res[group.name] = {}
        #     except:
        #         res[group.name] = {}
        #     for ctype in ctypes:
        #         try:
        #             if not res[group.name][ctype.app_label]:
        #                 res[group.name][ctype.app_label] = {}
        #         except:
        #             res[group.name][ctype.app_label] = {}

        #         res[group.name][ctype.app_label].update({
        #             ctype.model: {'add': 1, 'delete': 1, 'view': 1, 'change': 1}
        #         })
        # with open('contents.txt', 'w+') as outFile:
        #     jsonData = json.dumps(res)
        #     outFile.write(jsonData)
        ##############################################################
        #     group.permissions.clear()
        #     group.permissions.add(*permissions)
        # print('Permissions Added')
        # print(root_dir)
        # with open('/meetings/fixtures/userdata.json', 'r') as inFile:
        #     print('file opened')
        # data = []
        # res = {}
        # ctypes = ContentType.objects.prefetch_related('permission_set').all()
        # for ctype in ctypes:
        #     permissions = []
        #     for permission in ctype.permission_set.all():
        #         permissions.append({
        #             'id': permission.id,
        #             'permission_name': permission.name
        #         })

            # if not res[ctype.app_name]:
            #     res[ctype.app_name] = {}
            # if not res[ctype.app_name][ctype.model_name]
            #     res[ctype.app_name][ctype.model_name] = {}
            

            # contentData = {
                
            # }

            # contentData = {
            #     'id': ctype.id,
            #     'name': ctype.name,
            #     'permissions': permissions
            # }
            # data.append(contentData)
            
        # with open('contents.txt', 'w+') as outFile:
        #     jsonData = json.dumps({'data': data})
        #     outFile.write(jsonData)
        # print('File Created')