from meetings.model_files.user import *
from mainapp import  ws_methods
from django.db.models import Q
from mainapp.models import CustomModel

# Create your models here.

class Folder(CustomModel):
    name = models.CharField(max_length = 200)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

    @classmethod
    def get_details(cls, request, params):
        obj = {}
        folder_id = params['id']
        folder = None
        user_id = request.user.id
        if folder_id == 'new':
            if not user_id:
                return 'Invalid resource id'
            folder = Folder.objects.filter(created_by_id=user_id).last()
            if folder:
                folder_id = folder.id
        else:
            folder = Folder.objects.get(pk=folder_id)
        obj['id'] = folder_id
        obj['name'] = folder.name
        obj['parents'] = cls.get_ancestors(cls, folder)
        obj['files'] = []
        kw = params.get('kw')
        resource_files = []
        if kw:            
            if folder:
                resource_files = folder.documents.all().filter(Q(name__icontains= kw))
            else:
                resource_files = ws_methods.search_db({'kw': kw, 'search_models': {'resources': ['ResourceDocument']}})
                resource_files = resource_files.filter(folder_id= folder.id)
        else:
            resource_files = folder.documents.all()
            ar = []
            sub_folders = folder.folder_set.values()
            for sub in sub_folders:
                sub_folder = {'id': sub['id'], 'name': sub['name'], 'parent_id': folder.id}
                ar.append(sub_folder)
            obj['sub_folders'] = ar
        
        is_staff = request.user.groups.all().filter(name__in=['Admin','Staff'])        
        if not is_staff:
            resource_files = resource_files.filter(
                    Q(users__id=request.user.id))
        
        obj['total'] = resource_files.count()
        offset = params.get('offset')
        limit = params.get('limit')
        if limit:
            resource_files = resource_files[offset: offset + int(limit)]
        obj['count'] = len(resource_files)
        resource_files = list(resource_files.values('id','name'))
        obj['files'] = resource_files
        return obj

    def get_ancestors(self, folder_orm):
        parents_list = []
        upper_folder = folder_orm.parent
        while upper_folder:
            parents_list.append({'name':upper_folder.name,'id':upper_folder.id})
            upper_folder = upper_folder.parent
        return parents_list


    @classmethod
    def get_records(cls, request, params):
        kw = params.get('kw')
        folders = []
        if kw:
            
            folders = ws_methods.search_db({'kw': kw, 'search_models': {'resources': ['Folder']}})
            folders = folders.filter(Q(parent__isnull=True))
        else:
            folders = Folder.objects.filter(Q(parent__isnull=True))
        
        
        total_cnt = folders.count()
        offset = params.get('offset')
        limit = params.get('limit')
        folders = list(folders.values('id', 'name'))
        if limit:
            folders = folders[offset: offset + int(limit)]
        current_cnt = len(folders)
        res = {'records':folders, 'total':total_cnt, 'count':current_cnt}
        return res


class ResourceDocument(File):
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name='documents')
    users = models.ManyToManyField (Profile, 'Access', blank=True)

    @classmethod
    def get_attachments(cls, request, params):
        parent_id = params.get('parent_id')
        docs = File.objects.filter(folder_id=parent_id)
        docs = docs.values('id', 'name')
        docs = list(docs)
        return docs

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