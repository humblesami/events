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
    offset = 0;
    limit = 0;
    total_records = 0;
    server_url = window['server_url'];
    constructor(private httpService: HttpService) { }
    changedOffset(data)
    {
        this.offset = data;
        this.get_data();
    }
    changedLimit(data)
    {
        this.limit = data;
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
            offset: 0,
            limit: 2
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
            obj_this.total_records = data.total;
            obj_this.count = data.attendees.length;
            obj_this.attendees = data.attendees;
            console.log(data,  obj_this.total_records, obj_this.count, 1009);                      
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
        console.log(attendance_data);
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
