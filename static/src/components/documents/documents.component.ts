import { Component, OnInit, Input, NgZone } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import {SocketService} from "../../app/socket.service";
import { RenameService } from 'src/app/rename.service';
import { UserService } from 'src/app/user.service';
declare var $:any;


@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
    httpService: HttpService;
    @Input() search_kw = '';
    @Input() search_type = '';
    @Input() recursive = undefined;

    @Input() parent_field: string;
    @Input() parent_id: string;
    @Input() parent_model: string;

    @Input() res_app: string;
    @Input() res_model: string;
    @Input() readonly: any;
    @Input() show_files: any;

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
    userService: UserService;
    renameService: RenameService;
    constructor(private httpServ: HttpService,
        private renameSer: RenameService, 
        private userServ: UserService,
        private ss: SocketService,
        public zone: NgZone) {

        this.httpService = httpServ;
        this.userService = userServ;
        this.renameService = renameSer;
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
        if(!this.socketService.admin_mode || this.readonly || !obj_this.parent_id)
        {
            return;
        }
        let file_input = $('.dlc-file-picker:not(.processed):first');   
        // console.log(file_input.length, 3333);
        let resInfo = {
            res_app: obj_this.res_app,
            res_model: obj_this.parent_model,
            res_id: obj_this.parent_id
        }
        file_input.attr('dragdrop', 1);
        file_input.addClass('processed');
        window['apply_drag_drop'](file_input, resInfo, function(data){
            try{
                var result = obj_this.docs.concat(data);
                obj_this.zone.run(() => obj_this.docs = result);
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
        window['bootbox'].confirm('Are you sure to delete?', function(dr){
            if(!dr)
            {
                return;
            }            
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
        });        
    }

    get_list(){        
        let obj_this = this;
        obj_this.roterLinkPrefix = obj_this.doc_types[obj_this.res_model];
        let args ={
            app:'documents',
            model:'File',
            method: 'get_attachments',
        };
        if(obj_this.parent_model == 'Folder')
        {
            args = {
                app:'resources',
                model:'Folder',
                method: 'search_files',
            }
        }
        let input_data = {
            args: args,
            params:{
                kw: obj_this.search_kw,
                app: obj_this.res_app,
                model: obj_this.res_model,
                parent_field: obj_this.parent_field,
                parent_id: obj_this.parent_id,
                recursive: obj_this.recursive,
            }
        }
        // console.log(6565,133);
        this.httpService.get(input_data, function(data){
            if(obj_this.parent_model == 'Folder'){
                data = data.files;
            }
            obj_this.on_result(data);
        }, null);
    }

    on_result(data){
        let obj_this = this;
        obj_this.docs = data;
    }

    ngOnInit() {
        let obj_this = this;
        // console.log(obj_this.search_type, obj_this.parent_id, obj_this.recursive);
        if(
            obj_this.search_type == 'folders'
            
            || 
            (
                (!obj_this.parent_id  && !obj_this.recursive)
            )
        )
        {
            return;
        }
        obj_this.get_list();
        setTimeout(function(){
            obj_this.on_admin_mode_changed()
        },10);
        if(!window['DocText:focus'])
        {
            window['DocText:focus'] = 1;
            $(document).on('focus','.DocText input',function(){
                this.select();
            });
        }
    }

    ngOnDestroy(){
        delete this.socketService.doc_objects[this.object_id];
    }
}
