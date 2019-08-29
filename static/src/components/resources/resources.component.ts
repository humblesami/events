import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../app/http.service';

@Component({
    templateUrl: 'resources.component.html'
})
export class ResourcesComponent implements OnInit {
    records = [];
    no_resource = false;
    heading = 'Resources';
    bread_crumb = {
		items: [],
		title: ''
    };
    httpService: HttpService;
    constructor(private httpServ: HttpService) {        
        this.httpService = httpServ;
    }

    get_list()
    {
        const obj_this = this;        
        let args = {
            app: 'resources',
            model: 'Folder',
            method: 'get_records'
        }			
        let final_input_data = {
            params: {},
            args: args
        };
        obj_this.httpService.get(final_input_data,
        (result: any) => {            
            obj_this.records = result.records;            
            obj_this.records && obj_this.records.length > 0 ? obj_this.no_resource = false : obj_this.no_resource = true;            
        },null);
    }

    ngOnInit() {
        this.get_list();
    }
}
