from django.db import models
from meetings.user import *

# Create your models here.

class Folder(models.Model):
    name = models.CharField(max_length = 200)
    parent_folder = models.ForeignKey('self', on_delete=models.CASCADE, related_name='parent', null=True, blank=True)

    def __str__(self):
        return self.name
    @classmethod
    def get_details(cls, request, params):
        obj = {}
        folder_id = params.get('id')
        if folder_id:
            folder = Folder.objects.get(pk=folder_id)
            files = list(folder.files_set.values())
            obj['files'] = files
            obj['sub_folders'] = []
            parents = list(folder.parent.all())
            ar = []
            for parent in parents:
                parent_id = parent.id
                obj['parent_id'] = parent_id
                obj['name'] = folder.name
                try:
                    if len(files) < 0:
                        files = list(parent.files_set.values())
                    if len(files) > 0:
                        obj['files'] = files
                except:
                    pass
                ar.append({'id': parent.id, 'name': parent.name})
            obj['parents'] = ar
            return obj

        else:
            return 'InValid Data'

        # obj = {}
        # req_env = http.request.env
        # folder = req_env['meeting_point.folder'].search([('id', '=', id)])
        # files = folder.file_ids
        # sub_folders = folder.sub_folders
        # obj['sub_folders'] = ws_methods.objects_list_to_json_list(sub_folders, ['id', 'name', 'parent_folder.id'])
        # obj['files'] = ws_methods.objects_list_to_json_list(files, ['id', 'name'])
        #
        # parent = folder.parent_folder
        # parent_id = False
        # if parent:
        #     parent_id = parent.id
        # obj['parent_id'] = parent_id
        # obj['name'] = folder.name
        #
        # ar = []
        # while parent:
        #     ar.append({'id': parent.id, 'name': parent.name})
        #     parent = parent.parent_folder
        # obj['parents'] = ar
        #
        # return ws_methods.http_response('', obj)

        return {'error': 'Not implemented'}
    @classmethod
    def get_records(cls, request, params):
        total_cnt = Folder.objects.filter(parent_folder__isnull = True).count()
        folder = Folder.objects.filter(parent_folder__isnull=True).values('name', 'id')
        folder = list(folder)
        current_cnt = len(folder)
        folderObject = {'records':folder, 'total':total_cnt, 'count':current_cnt}
        return folderObject

class Files(models.Model):
    name = models.CharField('Title', max_length=200, blank=False)
    parent_folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    users = models.ManyToManyField (Profile, 'Access')
    file = models.FileField(upload_to='files/', null=True)

    def __str__(self):
        return self.name
