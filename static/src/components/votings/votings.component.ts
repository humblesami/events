import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../app/http.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-votings',
    templateUrl: './votings.component.html',
    styleUrls: ['./votings.css']
})
export class VotingsComponent implements OnInit {

    no_meet = false;
    voting_data: any;
    active_meeting: any;
    show = false;
    meeting_type: string;
    heading = 'Home';
    bread_crumb = {
    items: [],
    title: ''
};

constructor(private httpService: HttpService, public router: Router, private route: ActivatedRoute) {
    const obj_this = this;
    this.httpService.fetch_paged_data = function(off_set, limit){
        let req_peram = (window.location + '').split('/');
        let flag = req_peram[req_peram.length - 1];
        
        let req_url = '/meeting/list-json';
        let input_data = { meeting_type: flag, paging : {offset: off_set, limit: limit}};
        var success_cb = function (result) {
            // console.log(result)
            for(var i in result.records)
            {
                var open_date = result.records[i]['open_date'];
                open_date= window['functions'].meeting_time(open_date);
                result.records[i]['open_date'] = open_date;
            }
            obj_this.voting_data = result.records;
            obj_this.httpService.total_records = result.total;
            obj_this.voting_data.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;
        };
        let args = {
            app: 'Votings',
            model: 'Voting',
            method: 'get_records'
        }			
        let final_input_data = {
            params: input_data,
            args: args
        };
        obj_this.httpService.get(final_input_data, success_cb, null);
    }
}

ngOnInit() {
    window['json_functions'].find_activate_link('.MeetingBtnWrapper');
    let req_peram = (window.location + '').split('/');
        let flag = req_peram[req_peram.length - 1];
        this.meeting_type = flag;
        // console.log(flag)
        this.heading = flag + ' Votings';
        let obj_this = this;
        // let req_url = '/meeting/list-json';
        let input_data = { meeting_type: flag, paging : {offset: 0, limit: 10}};
        var success_cb = function (result) {
            // console.log(result)
            for(var i in result.records)
            {
                var open_date = result.records[i]['open_date'];
                open_date= window['functions'].meeting_time(open_date);
                result.records[i]['open_date'] = open_date;
            }
            obj_this.voting_data = result.records;
            obj_this.httpService.total_records = result.total;
            obj_this.voting_data.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;
            // make_bread_crumb(flag);
        };
        var failure_cb = function (error) {
        };
        let args = {
            app: 'voting',
            model: 'Voting',
            method: 'get_records'
        }			
        let final_input_data = {
            params: input_data,
            args: args
        };
        this.httpService.get(final_input_data, success_cb, failure_cb);

        function make_bread_crumb(page_title, ) {
            const bread_crumb_items = obj_this.bread_crumb.items;
            if (page_title) {
                obj_this.bread_crumb.title = page_title + ' Votings';
            }
        }
    }
}