import { Component, OnInit, Input } from '@angular/core';
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
    // unique_id = window['js_utils'].unique_id();
    socketService: SocketService;

    constructor(private httpServ: HttpService, private ss: SocketService) {
        this.httpService = httpServ;
        this.socketService = ss;
    }

    update_data(data){
        let obj_this = this;
        this.docs = this.docs.concat(data);
        console.log(this.docs, data, 'After upload '+Date());
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

    ngOnInit() {
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
        }, null)
    }
}
