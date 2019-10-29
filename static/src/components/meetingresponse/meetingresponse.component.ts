import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../app/http.service';

@Component({
    selector: 'app-meetingresponse',
    templateUrl: './meetingresponse.component.html',
    styleUrls: ['./meetingresponse.component.css']
})
export class MeetingresponseComponent implements OnInit {

    @Input() attendee_status: string;
    @Input() meeting_id: string;
    @Input() my_event: string;
    @Input() token: string;

    httpService: HttpService;
    constructor(private http_ervice: HttpService) {
        this.httpService = http_ervice;        
    }

    respond_invitation(response: string, meet_id: string) {
        let req_url = '/meeting/respond-invitation-json';
        let obj_this = this;
        let input_data = {
            meeting_id: meet_id,
            response: response,
            token: obj_this.token,
        };
        
        if (response) {
            let args = {
                app: 'meetings',
                model: 'Event',
                method: 'respond_invitation'
            }			
            let final_input_data = {
                params: input_data,
                args: args,
                no_loader: 1,
            };
            obj_this.attendee_status = response;
            if (!obj_this.token)
            {
                obj_this.httpService.get(final_input_data, function(data) {
                }, null);
            }
            else
            {
                obj_this.httpService.post_public(final_input_data, function(data) {
                    window.open(window['site_config'].server_base_url+'/#/thanks/Response submitted successfully', '_self');
                }, (er)=>{
                    window.open(window['site_config'].server_base_url+'/#/feedback/' + er, '_self');
                });
            }
        }
    }

    ngOnInit() {        
    }

}
