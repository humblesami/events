import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from "../../app/http.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SocketService } from 'src/app/socket.service';
declare var $:any;

@Component({
    selector: 'app-surveys',
    templateUrl: './surveys.component.html',
    styleUrls: ['./surveys.css', '../esigndocs/esigndocs.css']
})
export class SurveysComponent implements OnInit {
    @Input() meeting_id: number;
    @Input() loaded_as_child: any;
    @Input() to_do_only: any;
    
    loading = true;
    socketService: SocketService;
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
    constructor(private httpServ: HttpService, 
        public router: Router, private route: ActivatedRoute,
        private sock: SocketService) {
        this.httpService = httpServ;
        this.socketService = sock;
    }

    get_records(el, state)
    {
        let obj_this = this;
        $(el).parent().find('.active').removeClass('active');
        $(el).addClass('active');
        let states = [];
        if (state == 'completed')
        {
            states = [state, 'incomplete']
        }
        else
        {
            states = [state]
        }
        this.httpServ.states = states;
        obj_this.get_list(states);
    }
    prev_state = undefined;

    get_list(states=['to do'])
    {
        let obj_this = this;
        let offset = undefined;
        let limit = undefined;
        if(obj_this.httpServ.states && states.length < 1){
            states = obj_this.httpServ.states
        }
        if(obj_this.prev_state != states)
        {
            obj_this.loading = true;
            offset = 0;
            limit = 0;
        }
        obj_this.prev_state = states;
        let input_data = { states: states, meeting_type: obj_this.meeting_type, offset: offset, limit: limit};
        if(obj_this.meeting_id){
            input_data['meeting_id']=obj_this.meeting_id;
        }
        var success_cb = function (result) {
            // console.log(result)
            for(var i in result.records)
            {
                var open_date = result.records[i]['open_date'];
                open_date= window['dt_functions'].meeting_time(open_date);
                result.records[i]['open_date'] = open_date;
            }
            obj_this.records = result.records;
            obj_this.records.length > 0 ? obj_this.no_meet = false : obj_this.no_meet = true;
            obj_this.loading = false;
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
        if(this.httpServ.states){
            // console.log(this.httpServ.states,121221);
        }
        this.get_list();
    }
}
