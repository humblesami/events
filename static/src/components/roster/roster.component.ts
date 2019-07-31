import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../app/http.service';
@Component({
    selector: 'app-roster',
    templateUrl: './roster.component.html',
    styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {
    @Input() meeting_id: number;
    offset = 0;
    limit = 0;
    total_records = 0;
    constructor(private httpService: HttpService) { }
    changedOffset(data)
    {
        this.offset = data;
    }
    changedLimit(data)
    {
        this.limit = data;
    }
    show_offset()
    {
        console.log(this.offset);
    }

    ngOnInit() {
        let obj_this = this;
        let input_data = {
            meeting_id: obj_this.meeting_id,
            offset: 0,
            limit: 5
        }
        let args = {
            app: 'meetings',
            model: 'Event',
            method: 'get_roster_details'
        }
        let final_input = {
            params: input_data,
            args: args
        }
        obj_this.httpService.get(final_input, (data)=>{
            console.log(data)
        }, null)
        
    }
}
