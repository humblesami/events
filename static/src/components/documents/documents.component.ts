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

    @Input() res_app: string;
    @Input() res_model: string;

    docs = [];
    constructor(private httpServ: HttpService) {
        this.httpService = httpServ;  
    }

    ngOnInit() {
        let obj_this = this;
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
            for(var doc of data){
                doc.routerLink = '/'+doc.type+'/doc/'+doc.id;
            }
            obj_this.docs = data;
            console.log(data);
        }, null)
    }

}
