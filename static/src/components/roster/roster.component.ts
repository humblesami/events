import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { ChatUser } from 'src/app/models/chat';
declare var $: any;

@Component({
    selector: 'app-roster',
    templateUrl: './roster.component.html',
    styleUrls: ['./roster.component.css']
})

export class RosterComponent implements OnInit {
    @Input() meeting_id: number;
    offset: number;
    limit: number;
    total_records : number;
    server_url = window['server_url'];
    constructor(private httpService: HttpService) {
        this.offset = 0;
        this.limit = 2;
        this.total_records = 0;        
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
        console.log(this.limit, this.offset, 144);
        this.get_data();
    }
    show_offset()
    {
        console.log(this.offset);
    }

    attendees : Array<ChatUser>;
    count: number;

    get_data(){
        let obj_this = this;
        let input_data = {
            meeting_id: obj_this.meeting_id,
            offset: obj_this.offset,
            limit: obj_this.limit
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
            obj_this.total_records = Number(data.total);
            // console.log(obj_this.total_records, 444);
            obj_this.count = data.attendees.length;
            obj_this.attendees = data.attendees;
        }, null)
    }

    submit_attendance(){
        var attendance_data = [];
        $('table.roster input:checked').each(function(i, el){
            let obj ={
                id: $(el).next().next().val(),
                attendance: $(el).next().val()
            }
            attendance_data.push(obj);                        
        });
        let obj_this = this;
        let input_data = {
            meeting_id: obj_this.meeting_id,
            attendance_data: attendance_data,            
        }
        let args = {
            app: 'meetings',
            model: 'Event',
            method: 'mark_attendance'
        }
        let final_input = {
            params: input_data,
            args: args
        }
        obj_this.httpService.post(final_input, function(data){
            console.log(data);
        }
        , null);
    }

    ngOnInit() {
        this.get_data();        
    }
}
