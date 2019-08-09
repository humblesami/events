import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { ChatUser } from 'src/app/models/chat';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/app/socket.service';
import { ProfilesummaryComponent } from '../profilesummary/profilesummary.component';
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
    key_word: string;
    total_records : number;
    server_url = window['server_url'];
    constructor(private httpService: HttpService, 
                // private modalService: NgbModal,
                // public activeModal: NgbActiveModal,
                private socketService: SocketService) { 
        this.offset = 0;
        this.limit = 2;
        this.total_records = 0;    
    }
    attendance_data = [];
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
    
    attendees : Array<ChatUser>;
    count: number;

    open(user_id) {
        // let obj_this = this;
		// const modalRef = this.modalService.open(ProfilesummaryComponent);
		// modalRef.componentInstance.user_id = user_id;
    }
    
    roster_search(e){
        if(e.keyCode == 13)
        {
            this.offset = 0;
            this.key_word = e.target.value;
            this.get_data();
        }
        // console.log(32312, e.keyCode);
    }

    get_data(){
        let obj_this = this;
        function success(data){            
            obj_this.total_records = Number(data.total);            
            obj_this.count = data.attendees.length;
            obj_this.attendees = data.attendees;
            // console.log(obj_this.attendees);
            obj_this.httpService.changePaginator(data.total);
        }        
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
            args: args,
            no_loader:1
        }
        if(obj_this.key_word)
        {
            input_data['key_word'] = obj_this.key_word;            
            args['method'] = 'search_roster';
            // obj_this.key_word = undefined;
        }
        obj_this.httpService.get(final_input, success, null)
    }

    update_attendance(attendee_id: number, val){
        let attendee = this.attendance_data.find(x=>x.id == attendee_id);        
        if(attendee)
        {
            attendee.attendance = val; 
        }
        else{
            this.attendance_data.push({id: attendee_id, attendance: val});
        }
        console.log(this.attendance_data, 103);
    }

    submit_attendance(e){        
        let obj_this = this;
        let input_data = {
            meeting_id: obj_this.meeting_id,
            attendance_data: obj_this.attendance_data,
        }
        console.log(input_data, 222);
        let args = {
            app: 'meetings',
            model: 'Event',
            method: 'mark_attendance'
        }
        let final_input = {
            params: input_data,
            args: args
        }
        // console.log(final_input);
        obj_this.httpService.post(final_input, function(data){
            console.log(data);
        }, null);
        obj_this.close_roster(e);
    }
    close_roster(e){
        // console.log(e.target);
        $(e.target).closest('.roster-full').hide();
    }

    ngOnInit() {
        this.get_data();        
    }
}