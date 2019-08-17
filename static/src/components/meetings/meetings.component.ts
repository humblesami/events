import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../app/http.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var $: any;

@Component({
    styleUrls:['./meetings.css'],
    templateUrl: 'meetings.component.html'
})
export class MeetingsComponent implements OnInit {
    no_meet = false;
    meeting_list = [];
    active_meeting: any;    
    show = false;
    meeting_type: string;
    heading = 'Home';
    bread_crumb = {
		items: [],
		title: ''
	};
    offset: number;
    limit: number;
    total_records : number;
    constructor(private httpService: HttpService, public router: Router, private route: ActivatedRoute) {
        this.offset = 0;
        this.limit = 2;
        this.total_records = 0;
        const obj_this = this;
        this.httpService.fetch_paged_data = function(off_set, limit){
            let req_peram = (window.location + '').split('/');
            let flag = req_peram[req_peram.length - 1];
            
            let req_url = '/meeting/list-json';
            let input_data = { meeting_type: flag, paging : {offset: off_set, limit: limit}};
            var success_cb = function (result) {
                for(var i in result.records)
                {
                    var start = result.records[i]['start'];
                    start = window['functions'].meeting_time(start);
                    result.records[i]['start_dt'] = start;
                }
                obj_this.meeting_list = result.records || [];
                obj_this.httpService.total_records = result.total;
                obj_this.meeting_list.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;
            };
            let args = {
                app: 'meetings',
                model: 'Event',
                method: 'get_records'
            }			
            let final_input_data = {
                params: input_data,
                args: args
            };
            obj_this.httpService.get(final_input_data, success_cb, null);
        }
    }
    changedOffset(data)
    {
        this.offset = Number(data);
        // console.log(this.offset, 1008);
        this.get_data();
    }
    changedLimit(data)
    {
        this.limit = Number(data);
        this.offset = 0;
        // console.log(this.limit, this.offset, 144);
        this.get_data();
    }
 
    search_records(e){
        let obj_this = this;
        // console.log(e.keyCode, 67);
        if(e.keyCode == 13)
        {
            obj_this.get_data(e.target.value);
        }
    }

    ngOnInit() {        
        this.get_data();
        window['json_functions'].find_activate_link('.MeetingBtnWrapper');
    }
    
    count: number;
    get_data(kw = ''){
        var url_segments = this.route.snapshot.url;
        this.meeting_type = url_segments[url_segments.length -1].path;
        let obj_this = this;
              
        var success_cb = function (result) {            
            for(var i in result.records)
            {
                var start = result.records[i]['start'];
                start = window['functions'].meeting_time(start);
                result.records[i]['start_dt'] = start;
            }
            obj_this.total_records = result.total;
            obj_this.count = result.records.length;
            obj_this.meeting_list = result.records || [];
            obj_this.httpService.total_records = result.total;
            // console.log(obj_this.total_records,obj_this.count,  1411);
            obj_this.meeting_list.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;
            
        };
        
        let input_data = {
            meeting_type: obj_this.meeting_type, 
            offset: obj_this.offset,
            limit: obj_this.limit,
            kw : kw
       };

        var failure_cb = function (error) {
        };
        let args = {
            app: 'meetings',
            model: 'Event',
            method: 'get_records'
        }			
        let final_input_data = {
            params: input_data,
            args: args
        };
        this.httpService.get(final_input_data, success_cb, failure_cb);
    }    
}
