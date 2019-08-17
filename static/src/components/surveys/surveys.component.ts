import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../app/http.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-surveys',
    templateUrl: './surveys.component.html',
    styleUrls: ['./surveys.css']
})
export class SurveysComponent implements OnInit {
    no_meet = false;
    survey_data: any;
    active_meeting: any;
    show = false;
    meeting_type: string;
    heading = 'Home';
    bread_crumb = {
        items: [],
        title: ''
    };

    constructor(private httpService: HttpService, public router: Router, private route: ActivatedRoute) {
            
    }

    get_data(){
        let obj_this = this;
        let input_data = { meeting_type: obj_this.meeting_type, paging : {offset: 0, limit: 10}};
        var success_cb = function (result) {
            // console.log(result)
            for(var i in result.records)
            {
                var open_date = result.records[i]['open_date'];
                open_date= window['functions'].meeting_time(open_date);
                result.records[i]['open_date'] = open_date;
            }
            obj_this.survey_data = result.records;
            obj_this.httpService.total_records = result.total;
            obj_this.survey_data.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;
            // make_bread_crumb(flag);
        };
        let args = {
            app: 'survey',
            model: 'Survey',
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
        this.heading = flag;
        this.get_data();
    }

}
