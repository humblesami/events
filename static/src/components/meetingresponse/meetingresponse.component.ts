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

    constructor(private httpService: HttpService) {

    }

    respond_invitation(response: string, meet_id: string) {
        let req_url = '/meeting/respond-invitation-json';
        let obj_this = this;
        let input_data = {
            meeting_id: meet_id,
            response: response
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
            obj_this.httpService.get(final_input_data, function(data) {
            }, null);
        }
        }

  ngOnInit() {
  }

}
