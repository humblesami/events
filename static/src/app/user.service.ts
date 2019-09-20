import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { SocketService } from './socket.service';

declare var $: any

@Injectable()

export class UserService {
    server_url;
    
    constructor(private httpService:HttpService, private socketService: SocketService) {
        
    }


    private users = [];
    selected_object;
    valid_users = [];
    selectedUsers = [];    

    set_users(list)
    {
        // console.log(list, 133);
        this.users = list;
    }

    saveusers(){
        let obj_this = this;        
        var user_ids = [];        
        for(var user of obj_this.selectedUsers)
        {
            user_ids.push(user.id);
        }
        let args = {
            app: 'authsignup',
            model: 'AuthUser',
            method: 'define_access'
        }
        let final_input_data = {
            params: {
                object_id : obj_this.selected_object.id,                
                model:obj_this.selected_object.model,
                app: obj_this.selected_object.app,                
                user_ids : user_ids,
            },
            args: args
        };
        obj_this.httpService.get(final_input_data,
        (result: any) => {
            console.log(result);           
        },null);
        $('#select_user_modal').modal('hide');
    }

    closemodel(){
        $('#select_user_modal').modal('hide');
        this.selectedUsers = [];
        this.selected_object  = undefined;
    }

    get_access_details(obj, app, model, parent=null){
        let obj_this = this;
        obj_this.selectedUsers = [];
        obj.model = model;
        obj.app = app;
        obj_this.selected_object = obj;
        
        let args = {
            app: 'authsignup',
            model: 'AuthUser',
            method: 'get_resource_audience'
        }
        let params = {
            object_id: obj.id,
            app: app,
            model: model,
            parent: parent
        };
        // console.log(params);
        let final_input_data = {
            params: params,
            args: args
        };
        obj_this.httpService.get(final_input_data,
        (result: any) => {
            if(parent && parent.id)
            {
                obj_this.valid_users = result.valid;
            }
            else{                
                obj_this.valid_users = obj_this.users;
            }
            // console.log(obj_this.valid_users, 54);
            obj_this.selectedUsers = result.selected;
        },null);
        $('#select_user_modal').modal('show');
    }
}
