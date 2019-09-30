import re
from meetings.model_files.user import *
from mainapp.models import CustomModel
from django_currentuser.middleware import get_current_user


class Folder(CustomModel):
    name = models.CharField(max_length = 200)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    users = models.ManyToManyField(Profile, related_name='folder_audience', blank=True)
    personal = models.BooleanField(default=False, null=True)


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


    def create_personal_folder(cls, request, params):
        personal_folder = None
        try:
            personal_folder = cls.objects.filter(personal=True, created_by_id = request.user.id)
            if not personal_folder:
                personal_folder = cls(name='My Folder', personal=True)
                personal_folder.save()
                personal_folder.users.add(request.user.id)
                personal_folder.save()
        except:
            if personal_folder:
                personal_folder.delete()


    def update_child_access(self, ids_to_remove, user_id):
        if self.id:
            documents = self.documents.all()
            for document in documents:
                for user in ids_to_remove:
                    if user != user_id:
                        document.users.remove(user)
            sub_folders = Folder.objects.filter(parent_id=self.id)
            if sub_folders:
                for sub_folder in sub_folders:
                    for user in ids_to_remove:
                        if user != user_id:
                            sub_folder.users.remove(user)
                    sub_folder.update_child_access(ids_to_remove, user_id)
        return 'done'

    @classmethod
    def create_new(cls,request,params):        
        name = params['name']        
        folder = Folder(
            name =name,
        )
        parent_id = params.get('parent_id')
        personal = params.get('personal')
        if personal:
            folder.personal = personal
        if parent_id:        
            folder.parent_id = parent_id
        folder.save()
        data = {
            'name': folder.name,
            'id': folder.id,
            'parent': parent_id,
        }
        return data

    @classmethod
    def delete_folder(cls, request, params):
        folder_id = params['folder_id']
        folder = Folder.objects.get(pk=folder_id)
        folder.delete()
        return 'done'

    @classmethod
    def change_folder_name(cls, request, params):
        folder_id = params['folder_id']
        name = params['name']
        folder = Folder.objects.get(pk=folder_id)
        folder.name = name
        folder.save()
        return 'done'

    @classmethod
    def search_folders(cls, request, params):
        result = {}
        parent_id = params.get('parent_id')
        user_id = request.user.id
        recursive = params.get('recursive')
        if recursive == 'false':
            recursive = None
        kw = params.get('kw')
        if not kw:
            kw = ''
        if parent_id:
            folder = Folder.objects.filter(pk=parent_id, users__id=user_id).order_by('-pk')
            if folder:
                folder = folder[0]
                result['folders'] = folder.search_folder(kw, user_id, [], 'folders', recursive)
                result['parents'] = cls.get_ancestors(cls, folder)
                result['id'] = folder.id
                result['name'] = folder.name
                personal = False
                if folder.personal and folder.created_by_id == user_id:
                    result['personal'] = folder.personal
        else:
            result['folders'] = cls.search_root(kw, user_id, [], 'folders', recursive)
        return result

    @classmethod
    def search_files(cls, request, params):
        result = { 'files' : []}
        parent_id = params.get('parent_id')
        user_id = request.user.id
        recursive = params.get('recursive')
        if recursive == 'false':
            recursive = None
        kw = params.get('kw')
        if not kw:
            kw = ''
        if parent_id:
            folder = Folder.objects.filter(pk=parent_id, users__id=user_id).order_by('-pk')
            if folder:
                folder = folder[0]
                result = folder.search_folder(kw, user_id, [], 'files', recursive)                
        elif recursive:
            result = cls.search_root(kw, user_id, [], 'files', recursive)
        return result

    @classmethod
    def search_root(cls, kw, user_id, results, search_type, recursive=False):
        folders = Folder.objects.filter(parent_id=None, users__id=user_id).order_by('-pk')
        if search_type == 'folders':
            records = []
            for folder in folders:
                folder.total_files = 0
                folder.files_in_folder(folder)
                total_files = folder.total_files

                folder_obj = folder.__dict__
                if re.search(kw, folder_obj['name'], re.IGNORECASE):
                    personal = False
                    if folder_obj['personal'] and folder_obj['created_by_id'] == user_id:
                        personal = True
                    results.append({
                        'id': folder_obj['id'],
                        'name': folder_obj['name'],
                        'total_files': total_files,
                        'personal': personal
                    })
        if recursive:
            for obj in folders:
                results = obj.search_folder(kw, user_id, results, search_type, recursive)
        return results

    def search_folder(self, kw, user_id, results, search_type, recursive=False):
        obj = self
        if search_type == 'files':
            files = obj.documents.filter(users__id=user_id, name__icontains=kw).values('id', 'name', 'access_token').order_by('-pk')
            for file in files:
                personal = False
                if file['personal'] and file['created_by_id'] == user_id:
                    personal = True
                results.append({
                    'id': file['id'],
                    'name': file['name'],
                    'access_token': file['access_token'],
                    'personal': personal
                })
        if search_type == 'folders' or recursive:
            folders = obj.folder_set.filter(users__id=user_id).order_by('-pk')
            records = []
            for folder in folders:
                folder.total_files = 0
                folder.files_in_folder(folder)
                total_files = folder.total_files

                if search_type == 'folders':
                    folder_obj = folder.__dict__
                    if re.search(kw, folder_obj['name'], re.IGNORECASE):
                        personal = False
                        if folder_obj['personal'] and folder_obj['created_by_id'] == user_id:
                            personal = True
                        results.append({
                            'id': folder_obj['id'],
                            'name': folder_obj['name'],
                            'total_files' : total_files,
                            'personal': personal
                        })
                if recursive:
                    folder.search_folder(kw, user_id, results, search_type, recursive)
        return results

    def get_ancestors(self, folder_orm):
        parents_list = []
        upper_folder = folder_orm.parent
        while upper_folder:
            parents_list.append({'name':upper_folder.name,'id':upper_folder.id})
            upper_folder = upper_folder.parent
        parents_list.reverse()
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
        parent_id = params.get('parent_id')
        if kw:
            folders = ws_methods.search_db({'kw': kw, 'search_models': {'resources': ['Folder']}})
            if parent_id:
                folders = folders.filter(Q(parent_id=parent_id) & Q(users__id=user_id))
            else:
                folders = folders.filter(Q(parent__isnull=True) & Q(users__id=user_id))
        else:
            if parent_id:
                folders = Folder.objects.filter(Q(parent_id=parent_id) & Q(users__id=user_id)).order_by('-pk')
            else:
                folders = Folder.objects.filter(Q(parent__isnull=True) & Q(users__id=user_id)).order_by('-pk')

        total_cnt = folders.count()
        offset = params.get('offset')
        limit = params.get('limit')
        records = []
        users_obj = ws_methods.get_model('meetings','Profile')
        users_obj = users_obj.objects.all().order_by('-pk')
        all_users = list(users_obj.values('id', 'name'))
        if limit:
            folders = folders[offset: offset + int(limit)]
        for folder in folders:
            folder.total_files = 0
            folder.files_in_folder(folder)
            total_files = folder.total_files
            cd = ws_methods.obj_to_dict(folder, fields=['name', 'id'])
            cd['total_files'] = total_files
            records.append(cd)
        current_cnt = len(records)
        res = {'records':records, 'total':total_cnt, 'count':current_cnt, 'users': all_users}
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


class ResourceDocument(File):
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name='documents')
    users = models.ManyToManyField (Profile, related_name='file_audience', blank=True)
    personal = models.BooleanField(default=False, null=True)

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