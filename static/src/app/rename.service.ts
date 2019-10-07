import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { SocketService } from './socket.service';

declare var $: any

@Injectable()

export class RenameService {
    server_url;
    
    constructor(private httpService:HttpService, private socketService: SocketService) {
        
    }

    name_is_changed = false;
    enable_rename(evn, obj){
        if(!obj.edit_mode)
        {
            var target = $(evn.target).closest('.DocText');            
            this.name_is_changed = false;
            obj.edit_mode = true;
            setTimeout(function(){
                target.find('.renamer').focus();
            }, 100);
        }
    }

    renamer_changed(el)
    {
        this.name_is_changed = true;
    }

    renamer_focused_out(evn,folder,type=null){
        if(evn.type=='keyup' && evn.keyCode != 13)
        {
            return;
        }
        var el = evn.target;
        $(el).closest('.DocName').css("display","block");
        $(el).closest('.DocName').find('input.renamer').css("width","100%");
        this.rename_object(el, folder, type);
    }

    prevent_default(evn, personal){        
        if(!this.socketService.admin_mode && !personal)
        {
            return;
        }
        evn.stopPropagation();
        evn.preventDefault();
    }

    rename_object(el, item, type)
    {
        let obj_this = this;
        if(!type)
        {
            console.log('No type given for renaming');
        }
        item.edit_mode = false;
        var app = '';
        var model = '';
        switch(type)
        {
            case 'file':
                model = 'File';
                app= 'documents'
                break;
            case 'folder':
                model = 'Folder';
                app= 'resources'
                break;
        }
        if(!app)
        {
            console.log('No app model sepecified for renaming '+type);
        }
        if(!this.name_is_changed)
        {
            return;
        }
        this.name_is_changed = false;
        let item_name = $(el).closest('.DocText').find('input.renamer').val();
        if (!item_name)
        {            
            return;
        }
        var item_id = item.id;
        let input_data = {
            item_id: item_id,
            name: item_name,            
        }
        input_data['app'] = app;
        input_data['model'] = model;
        let args = {
            app: 'authsignup',
            model: 'AuthUser',
            method: 'rename_item'
        }
        let final_input = {
            params: input_data,
            args: args
        }
        obj_this.httpService.get(final_input, (data)=>{
            item.name = data.name;
            //console.log(item, 133);
        }, null);        
    }
    objects_to_move = {files:[], folders:[], current_parent_id: undefined};

    make_movable(evn, item_id, key){
        let obj_this = this;
        evn.stopPropagation();
        evn.preventDefault();
        var movable = $(evn.target).closest('a.doc,a.folder');
        if(movable.hasClass('draggable'))
        {
            var item_index = obj_this.objects_to_move[key].indexOf(item_id);
            obj_this.objects_to_move[key].splice(item_index, 1);
            movable.removeClass('draggable');
        }
        else{
            obj_this.objects_to_move[key].push(item_id);            
            movable.addClass('draggable');
        }
        $('a.folder.droppable').removeClass('droppable');        
        $('a.folder:not(.draggable)').addClass('droppable');
        // console.log(obj_this.movables, 24454);
    }

    load_movables(folder_id){
        let obj_this = this;
        var parent_id = obj_this.objects_to_move.current_parent_id;
        if(folder_id == parent_id)
        {
            $('a.doc').each(function(i, el){
                if(obj_this.objects_to_move.files.indexOf(el.attr('item_id')) != -1)
                {
                    $(this).closest('a.doc)').removeClass('.draggable').addClass('draggable');
                }
            });
            $('a.folder').each(function(i, el){
                if(obj_this.objects_to_move.files.indexOf(el.attr('item_id')) != -1)
                {
                    $(this).closest('a.folder)').removeClass('.draggable').addClass('draggable');
                }
            });
        }
        else{
            if(obj_this.objects_to_move.files.length || obj_this.objects_to_move.folders.length)
            {
                                
            }
        }
    }

    on_files_moved(){

    }

    on_folders_moved(){

    }
}
