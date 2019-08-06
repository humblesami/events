from meetings.model_files.user import *
from mainapp import  ws_methods

# Create your models here.

class Folder(models.Model):
    name = models.CharField(max_length = 200)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

    @classmethod
    def get_details(cls, request, params):
        obj = {}
        folder_id = params['id']
        folder = Folder.objects.get(pk=folder_id)
        obj['id'] = folder_id
        obj['name'] = folder.name
        obj['parents'] = cls.get_ancestors(cls, folder)

        ar = []
        sub_folders = folder.folder_set.values()
        for sub in sub_folders:
            sub_folder = {'id': sub['id'], 'name': sub['name'], 'parent_id': folder.id}
            ar.append(sub_folder)
        obj['sub_folders'] = ar
        obj['files'] = []
        resource_files = list(folder.resourcedocument_set.filter(users__id=request.user.id).values())
        for file in resource_files:
            file['created_at'] = str(file['created_at'])
            obj['files'].append(file)
        return obj

    def get_ancestors(self, folder_orm):
        parents_list = []
        upper_folder = folder_orm.parent
        while upper_folder:
            parents_list.append({'name':upper_folder.name,'id':upper_folder.id})
            upper_folder = upper_folder.parent
        return parents_list
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
        total_cnt = Folder.objects.filter(parent__isnull = True).count()
        # folder = Folder.objects.filter(parent__isnull=True).values('name', 'id')
        folder = Folder.objects.filter(parent__isnull=True).values('name', 'id') #,resourcedocument__users__id=request.user.id).distinct()
        # if folder:
        #     folder = folder.values('id', 'name')
        folder = list(folder)
        current_cnt = len(folder)
        folderObject = {'records':folder, 'total':total_cnt, 'count':current_cnt}
        return folderObject


class ResourceDocument(File):
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    users = models.ManyToManyField (Profile, 'Access', blank=True)

    def save(self, *args, **kwargs):
        if not self.file_type:
            self.file_type = 'resource'
        super(ResourceDocument, self).save(*args, **kwargs)
    def __str__(self):
        return self.name
    

    @property
    def breadcrumb(self):
        folder_obj = self.folder
        data = []
        if folder_obj:
            data.append({'title': folder_obj.name, 'link': '/resource/' + str(folder_obj.id)})
            ancestors = Folder.get_ancestors(self, folder_obj)
            for ancestor in ancestors:
                data.append({'title': ancestor['name'], 'link': '/resource/' + str(ancestor['id'])})
        data.append({'title': 'Resources', 'link': '/resources'})
        data.reverse()
        return data
