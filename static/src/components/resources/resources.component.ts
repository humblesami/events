import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../app/http.service';

@Component({
    templateUrl: 'resources.component.html'
})
export class ResourcesComponent implements OnInit {
    folders = [];
    no_resource = false;
    heading = 'Resources';
    bread_crumb = {
		items: [],
		title: ''
	};
    constructor(private httpService: HttpService) {
        httpService.on_get_data = this.get_list;
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
            obj_this.folders = result.records;
            obj_this.folders && obj_this.folders.length > 0 ? obj_this.no_resource = false : obj_this.no_resource = true;
            // make_bread_crumb(obj_this.heading);
        },null);
    }

    ngOnInit() {
        this.get_list();
    }
}
