# from django import apps
# from django.contrib.auth.models import  Permission
# from django.contrib.contenttypes.models import ContentType

# from meetings.model_files.committee import Committee
# from meetings.model_files.user import Profile, MeetingGroup


# def init():
#     super_users = Profile.objects.filter(is_superuser=True)
#     if not super_users:
#         obj = Profile.objects.create(is_superuser=True, is_staff=True, username='sa')
#         super_users = [obj]
#     else:
#         super_users = list(super_users)
#     for obj in super_users:
#         add_in_group(obj, 'Admin')
#     committees = Committee.objects.filter(allUser=True)
#     if not committees:
#         Committee.objects.create(name='All Users', allUser=True)
# init()

# def get_permission_set(group_name):
#     all_models = apps.get_models()
#     perm_set = {}
#     if group_name == 'Admin':
#         perm_set = {
#             'view': 1,
#             'add': 1,
#             'change': 1
#         }
#     elif group_name == 'Director' or group_name == 'Staff':
#         perm_set = {
#             'view': 1
#         }

#     group_permissions = {}
#     for model_obj in all_models:
#         meta = model_obj._meta
#         app_name = meta.app_label
#         model_name = meta.model_name
#         if not group_permissions.get(app_name):
#             group_permissions[app_name] = {}
#         group_permissions[app_name][model_name] = perm_set

#     if group_name == 'Director' or group_name == 'Staff':
#         group_permissions['meetings']['profile'] = {'view': 1, 'change': 1}
#         group_permissions['authtoken']['token'] = {'view': 1, 'add': 1}

#     return group_permissions


# def add_in_group(obj, group_name):
#     error_list = []
#     try:
#         user_group = MeetingGroup.objects.filter(name=group_name)
#         if user_group:
#             user_group = user_group[0]
#             if obj.groups.filter(name=group_name):
#                 return 'done'
#             obj.groups.add(user_group)
#             obj.save()
#             return 'done'
#         user_group = MeetingGroup.objects.create(name=group_name)
#         group_permissions = get_permission_set(group_name)
#         for app_name in group_permissions:
#             for model_name in group_permissions[app_name]:
#                 model_permissions = group_permissions[app_name][model_name]

#                 content_id = ContentType.objects.filter(app_label=app_name, model=model_name)
#                 if not content_id:
#                     error_list.append('No content id for ' + app_name + '.' + model_name)
#                     continue
#                 else:
#                     content_id = content_id[0].id
#                 for permission_type in model_permissions:
#                     code_name = permission_type + '_' + model_name
#                     permission = Permission.objects.filter(content_type_id=content_id, codename=code_name)
#                     if not permission:
#                         error_list.append('No permission entry for content_type_id='+str(content_id)+' for '+app_name+'.'+model_name)
#                         continue
#                     else:
#                         permission = permission[0]
#                     user_group.permissions.add(permission)
#             obj.groups.add(user_group)
#             obj.save()
#         if error_list:
#             return error_list
#         else:
#             return 'done'
#     except:
#         from mainapp.ws_methods import get_error_message
#         res = get_error_message()
#         res = 1



