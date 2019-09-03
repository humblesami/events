import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/http.service';

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

    constructor(private httpServ: HttpService) {
        this.httpService = httpServ;  
    }

    update_data(data){
        this.docs = this.docs.concat(data);
        console.log(data, 134);
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
        this.httpService.get(input_data, function(data){
            obj_this.docs = data;
        }, null)
    }
}
