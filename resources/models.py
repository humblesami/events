from meetings.model_files.user import *
from mainapp import  ws_methods
from django.db.models import Q
from mainapp.models import CustomModel
from django_currentuser.middleware import get_current_user

# Create your models here.

class Folder(CustomModel):
    name = models.CharField(max_length = 200)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    users = models.ManyToManyField(Profile, related_name='folder_audience', blank=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        current_user = get_current_user()
        creating = False
        if not self.pk:
            creating = True
        super(Folder, self).save(*args, **kwargs)
        if creating and current_user not in self.users.all():
            self.users.add(current_user.id)
            self.save()
        
    
    @classmethod
    def create_new(cls,request,params):        
        name = params['name']        
        folder = Folder(
            name =name,
        )
        parent = params.get('parent_folder')
        if parent:        
            folder.parent_id = parent
        
        folder.save()
        data = {
            'name': folder.name,
            'id': folder.id,
            'parent': parent,
        }
        return data


    @classmethod
    def change_folder_name(cls, request, params):
        folder_id = params['folder_id']
        name = params['name']
        folder = Folder.objects.get(pk=folder_id)
        folder.name = name
        folder.save()
        return 'done'


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
            folder = Folder.objects.filter(pk=folder_id, users__id=user_id)
            if not folder:
                return 'Invalid folder access'
            else:
                folder = folder[0]
        obj['id'] = folder_id
        obj['name'] = folder.name
        obj['parents'] = cls.get_ancestors(cls, folder)
        obj['files'] = []
        kw = params.get('kw')
        resource_files = []
        if kw:            
            if folder:
                resource_files = folder.documents.filter(Q(name__icontains= kw) & Q(users__id=user_id))
            else:
                resource_files = ws_methods.search_db({'kw': kw, 'search_models': {'resources': ['ResourceDocument']}})
                resource_files = resource_files.filter(folder_id= folder.id, users__id=user_id)
        else:
            resource_files = folder.documents.filter(users__id=user_id)
            ar = []
            sub_folders = folder.folder_set.filter(users__id=user_id).values()
            for sub in sub_folders:
                folder = Folder.objects.get(pk= sub['id'])
                folder.total_files = 0
                folder.files_in_folder(folder)
                total_files = folder.total_files                
                sub_folder = {'id': sub['id'], 'name': sub['name'], 'parent_id': folder.id, 'total_files': total_files}
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
    

    total_files = 0
    def files_in_folder(self, folder):
        folder.total_files += self.documents.count()
            # if sub_folder.folder_set.values():
        # new_total = 0
        for sub_folder in self.folder_set.all():
            new_folder = Folder.objects.get(pk=sub_folder.id)
            new_folder.files_in_folder(folder)


    @classmethod
    def get_records(cls, request, params):
        kw = params.get('kw')
        user_id = request.user.id
        folders = []
        if kw:
            
            folders = ws_methods.search_db({'kw': kw, 'search_models': {'resources': ['Folder']}})
            folders = folders.filter(Q(parent__isnull=True) & Q(users__id=user_id))
        else:
            folders = Folder.objects.filter(Q(parent__isnull=True) & Q(users__id=user_id))
        total_cnt = folders.count()
        offset = params.get('offset')
        limit = params.get('limit')
        ab = []
        if limit:
            folders = folders[offset: offset + int(limit)]
        for folder in folders:
            folder.total_files = 0
            folder.files_in_folder(folder)
            total_files = folder.total_files
            cd = ws_methods.obj_to_dict(folder, fields=['name', 'id'])
            cd['total_files'] = total_files
            ab.append(cd)
            # folder.append({'total_files' : total_files})
        folders = ab
        current_cnt = len(ab)
        res = {'records':ab, 'total':total_cnt, 'count':current_cnt}
        return res


    @classmethod
    def resource_search_details(cls, request, params):
        kw = params.get('kw')
        user_id = request.user.id
        folders = None
        files = None
        if kw:
            folders = Folder.objects.filter(users__id=user_id, name__icontains=kw)
            files = ResourceDocument.objects.filter(users__id=user_id, name__icontains=kw)
        else:
            folders = Folder.objects.filter(users__id=user_id)
            files = ResourceDocument.objects.filter(users__id=user_id)
        folder_set = list(files.values('id', 'name'))
        files_set = list(files.values('id', 'name'))
        data = {
            'folders': folder_set,
            'files': files_set
        }
        return data


    @classmethod
    def define_access(cls, request, params):
        folder_id = params.get('folder_id')
        file_ids = params.get('file_ids')
        user_id = request.user.id
        user_ids = params['user_ids']
        if folder_id:
            folder = Folder.objects.get(pk=folder_id)
            for user in folder.users.all():
                if user.id != user_id:
                    folder.users.remove(user.id)
            folder.save()
            for uid in user_ids:
                if uid != user_id:
                    folder.users.add(uid)
            folder.save()
        
        for file_id in file_ids:
            file = ResourceDocument.objects.get(pk=file_id)
            for user in file.users.all():
                if user.id != user_id:
                    file.users.remove(user.id)
            file.save()
            for uid in user_ids:
                if uid != user_id:
                    file.users.add(uid)
            file.save()
        return 'done'

    @classmethod
    def get_resource_audience(cls, request, params):
        folder_id = params.get('folder_id')
        file_id = params.get('file_id')
        audience = []
        has_admin_group = request.user.groups.filter(name='Admin')
        if not has_admin_group:
            return audience
        if folder_id:
            folder_users = Folder.objects.get(pk=folder_id).users.all()
            audience = list(folder_users.values('id', 'name'))
        
        if file_id:
            file_users = ResourceDocument.objects.get(pk=file_id).users.all()
            audience = list(file_users.values('id', 'name'))
        return audience


    @classmethod
    def delete_folder(cls, request, params):
        folder_id = params['folder_id']
        Folder.objects.get(pk=folder_id).delete()
        return 'done'



class ResourceDocument(File):
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name='documents')
    users = models.ManyToManyField (Profile, related_name='file_audience', blank=True)


    def __str__(self):
            return self.name


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
        current_user = get_current_user()
        creating = False
        if not self.pk:
            creating = True
        super(ResourceDocument, self).save(*args, **kwargs)
        if creating and current_user not in self.users.all():
            self.users.add(current_user.id)
            self.save()
    

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