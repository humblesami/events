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
        this.get_data();
    }

    get_data()
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
            obj_this.httpService.count = result.count;
            obj_this.httpService.total_records = result.total;
            obj_this.folders && obj_this.folders.length > 0 ? obj_this.no_resource = false : obj_this.no_resource = true;
            // make_bread_crumb(obj_this.heading);
        },
        (error: any) => {
            //console.log(error);
            //alert(error);
        });      
        function make_bread_crumb(page_title ) {
            if (page_title) {
                obj_this.bread_crumb.title = page_title;
            }
        }  
    }

    ngOnInit() {
    }
}
