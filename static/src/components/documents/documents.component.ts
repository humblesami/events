import { Component, OnInit, Input, NgZone } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import {SocketService} from "../../app/socket.service";
import { RenameService } from 'src/app/rename.service';
declare var $:any;


@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
    httpService: HttpService;
    @Input() parent_field: string;
    @Input() parent_id: string;
    @Input() parent_model: string;

    @Input() res_app: string;
    @Input() res_model: string;
    @Input() readonly: any;
    @Input() dont_show_files: any;
    docs = [];
    users = [];
    roterLinkPrefix = '';
    show_renamer_button = false;
    selectedUsers = [];
    selected_docs = [];
    doc_types = {
        MeetingDocument: '/meeting/doc/',
        AgendaDocument:'/topic/doc/',
        VotingDocument:'/voting/doc/',
        ResourceDocument:'/resource/doc/',
        NewsDocument:'/news/doc/',
    }
    // unique_id = window['js_utils'].unique_id();
    socketService: SocketService;
    object_id = undefined;
    renameService: RenameService;

    constructor(private httpServ: HttpService,private renameSer: RenameService, private ss: SocketService,
        public zone: NgZone) {
        this.httpService = httpServ;
        this.renameService =renameSer;
        this.socketService = ss;
        window['app_libs']['pdf'].load();
        this.object_id = window['js_utils'].unique_id();
        ss.doc_objects[this.object_id] = this;
    }

    get_icon_url(source = null){
        var icon_url = "/static/assets/images/cloud/local.png";
        switch(source){
            case "Google":
                    icon_url = "/static/assets/images/cloud/gdrive.png";
                break;
            case "Onedrive":
                    icon_url = "/static/assets/images/cloud/onedrive.png";
                break;
            case "Dropbox":
                    icon_url = "/static/assets/images/cloud/dropbox.png";
                break;
        }
        return icon_url;
    }

    on_mode_changed(){
        let obj_this = this;        
        setTimeout(function(){
            obj_this.on_admin_mode_changed()
        },10);
    }

    on_admin_mode_changed(){
        let obj_this = this;
        if(!this.socketService.admin_mode || this.readonly)
        {
            return;
        }
        let file_input = $('#dlc-file-picker');        
        if(file_input.attr('dragdrop'))
        {
            return;
        }
        let resInfo = {
            res_app: obj_this.res_app,
            res_model: obj_this.parent_model,
            res_id: obj_this.parent_id
        }
        file_input.attr('dragdrop', 1);
        window['apply_drag_drop'](file_input, resInfo, function(data){
            try{
                var result = obj_this.docs.concat(data);
                obj_this.zone.run(() => obj_this.docs = result);
                obj_this.openmodel(result);
            }
            catch(er){
                console.log(er, 5455);
            }
        });
    }

    delete_file(evn, doc_id)
    {
        evn.stopPropagation();
        evn.preventDefault();
        let obj_this = this;        
        let input_data = {
            doc_id: doc_id,
        }
        let args = {
            app: 'documents',
            model: 'File',
            method: 'delete_file'
        }
        let final_input = {
            params: input_data,
            args: args
        }

        obj_this.docs.find((item)=>{
            return item.id== doc_id;
        }).deleting=true;

        obj_this.httpServ.get(final_input, (data)=>{                        
            obj_this.docs =  obj_this.docs.filter((el)=>{
                return doc_id != el.id;
            });
        }, null);
    }

    start_rename(evn)
    {
        evn.stopPropagation();
        evn.preventDefault();
    }

    get_list(){
        let obj_this = this;
        if (obj_this.dont_show_files)
        {
            return;
        }
        obj_this.roterLinkPrefix = obj_this.doc_types[obj_this.res_model];
        let input_data = {
            args:{
                app:'documents',
                model:'File',
                method: 'get_attachments',
            },
            params:{
                app: obj_this.res_app,
                model: obj_this.res_model,
                parent_field: obj_this.parent_field,
                parent_id: obj_this.parent_id,
            }
        }
        // console.log(6565,133);
        this.httpService.get(input_data, function(data){
            // console.log(data, 133);
            obj_this.docs = data.docs;
            obj_this.users = data.users;
        }, null);
    }
    

    saveusers(){
        let obj_this = this;        
        var user_ids = [];
        var new_file_ids = [];
        for(var file of obj_this.selected_docs)
        {
            new_file_ids.push(file.id);
        }
        for(var user of obj_this.selectedUsers)
        {
            user_ids.push(user.id);
        }
        console.log(user_ids,new_file_ids);
                
        let args = {
            app: 'resources',
            model: 'Folder',
            method: 'define_access'
        }
        let final_input_data = {
            params: {
                file_ids: new_file_ids,
                user_ids : user_ids
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
        this.selected_docs  = [];
    }

    openmodel(docs){
        let obj_this = this;
        obj_this.selectedUsers = [];
        obj_this.selected_docs  = [];

        for(var doc of docs)
        {
            obj_this.selected_docs.push(doc);
        }
        console.log(docs);
        if(docs.length == 1)
        {
            let args = {
                app: 'resources',
                model: 'Folder',
                method: 'get_resource_audience'
            }
            let final_input_data = {
                params: {
                    file_id: docs[0].id,
                },
                args: args
            };
            obj_this.httpService.get(final_input_data,
            (result: any) => {
                // console.log(result);
                obj_this.selectedUsers = result;
            },null);                
        }
        $('#select_user_modal').modal('show');
    }

    ngOnInit() {
        let obj_this = this;
        obj_this.get_list();        
        setTimeout(function(){
            obj_this.on_admin_mode_changed()
        },10);
        $(document).on('focus','.DocText input',function(){
            this.select();
        });
    }

    ngOnDestroy(){
        delete this.socketService.doc_objects[this.object_id];
    }
}
