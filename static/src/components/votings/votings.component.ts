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
    records = [];
    active_meeting: any;
    show = false;
    meeting_type: string;
    heading = 'Home';
    bread_crumb = {
    items: [],
    title: ''
};
httpService: HttpService;
constructor(private httpServ: HttpService, public router: Router, private route: ActivatedRoute) {
    this.httpService = httpServ;
}

get_list()
{
    let obj_this = this;
    // let req_url = '/meeting/list-json';
    let input_data = { meeting_type: obj_this.meeting_type, paging : {offset: 0, limit: 10}};
    var success_cb = function (result) {
        console.log(result);
        for(var i in result.records)
        {
            var open_date = result.records[i]['open_date'];
            open_date= window['functions'].meeting_time(open_date);
            result.records[i]['open_date'] = open_date;
        }
        obj_this.records = result.records;
        obj_this.records.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;            
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
    this.httpService.get(final_input_data, success_cb, null);
}

ngOnInit() {
        window['json_functions'].find_activate_link('.MeetingBtnWrapper');
        let req_peram = (window.location + '').split('/');
        let flag = req_peram[req_peram.length - 1];
        this.meeting_type = flag;
        // console.log(flag)
        this.heading = flag + ' Votings';
        this.get_list();
    }
}