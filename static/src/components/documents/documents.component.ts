import { Component, OnInit, Input, NgZone } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import {SocketService} from "../../app/socket.service";
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

    docs = [];
    roterLinkPrefix = '';
    doc_types = {
        MeetingDocument: '/meeting/doc/',
        AgendaDocument:'/topic/doc/',
        VotingDocument:'/voting/doc/',
        ResourceDocument:'/resource/doc/',
        NewsDocument:'/news/doc/',
    }
    not_home_page = true;
    // unique_id = window['js_utils'].unique_id();
    socketService: SocketService;
    object_id = undefined;

    constructor(private httpServ: HttpService, private ss: SocketService,
        public zone: NgZone) {
        this.httpService = httpServ;
        this.socketService = ss;
        this.object_id = window['js_utils'].unique_id();
        ss.doc_objects[this.object_id] = this;
        if (window.location.hash == '#/')
        {
            this.not_home_page = false;
        }
        else
        {
            this.not_home_page = true;
        }
    }

    on_mode_changed(){
        let obj_this = this;        
        setTimeout(function(){
            obj_this.on_admin_mode_changed()
        },10);
    }

    on_admin_mode_changed(){
        let obj_this = this;
        if(!this.socketService.admin_mode)
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
            var result = obj_this.docs.concat(data);
            // obj_this.docs = result;
            obj_this.zone.run(() => obj_this.docs = result);            
            // console.log(obj_this.docs, data, 'After upload '+Date());
        });
    }

    change_file_name(evn, doc_id)
    {
        let obj_this = this;
        let input_data = {
            doc_id: doc_id,
            name: evn.target.value
        }
        let args = {
            app: 'documents',
            model: 'File',
            method: 'change_file_name'
        }
        let final_input = {
            params: input_data,
            args: args
        }
        obj_this.httpServ.get(final_input, null, null);
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
            obj_this.docs = data;
        }, null);
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
