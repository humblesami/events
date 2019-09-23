import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { ChatUser } from 'src/app/models/chat';
import { SocketService } from 'src/app/socket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfilesummaryComponent } from '../profilesummary/profilesummary.component';
declare var $: any;

@Component({
    selector: 'app-roster',
    templateUrl: './roster.component.html',
    styleUrls: ['./roster.component.css']
})

export class RosterComponent implements OnInit {
    @Input() meeting_id: number;
    server_url = window['server_url'];
    httpService: HttpService;
    constructor(private httpServ: HttpService,        
            private socketService: SocketService, private modalService: NgbModal) {
                this.httpService = httpServ;
    }    
    attendance_data = [];    
    
    attendees = [];
    count: number;
    absent_all = false;
    inperson_all = false;
    online_all = false;

    open_dialog(user_id) {
        let obj_this = this;
		const modalRef = this.modalService.open(ProfilesummaryComponent);
        modalRef.componentInstance.user_id = user_id;
    }

    exe(){
        let obj_this = this;

        function call_cbs(){
            obj_this.enable_checkboxes('absent_all','absent');
            // obj_this.enable_checkboxes('inperson_all','inperson');
            // obj_this.enable_checkboxes('online_all','online');
        }
        try{
            
           if(window['bs_cb']){
            call_cbs();
           }
           else{
            var script_path = 'static/assets/libs/bootstrap/bs-cb.js';
            var script = document.createElement('script');                
                script.onload = function(){
                    call_cbs();
                    window['bs_cb'] = 1;
                };
                script.src = script_path;
                document.body.appendChild(script);
           }
            
        }
        catch(er){
            console.log(er);
        }
    }
    
    enable_checkboxes(parent_id, child){
        var clss = '.checkbox-child';
        var welParent = $('#'+parent_id).checkbox();
        var welChild = $(clss).checkbox();
        
        // check event on parent checkbox
        welParent.on('check', function(e){
            // remove ambiguous;
            welParent.chbxChecked(e.checked);
            welChild.each(function(i, element) {
                $(element).chbxChecked(e.checked);
            });
        });
        
        // check event on child checkbox
        welChild.on('check', function(e) {
            var bAnd = true, bOr = false;
            welChild.each(function(i, element){
                var bChecked = $(element).chbxChecked();
                bAnd = bAnd && bChecked, bOr = bOr || bChecked;
            });
            
            var bChecked = bAnd === true || (bAnd === false && bOr === false ? false : null);
            welParent.chbxChecked(bChecked);
        });
    }

    get_list(){
        let obj_this = this;
        function success(data){            
            obj_this.httpService.count = Number(data.total);
            obj_this.count = data.attendees.length;
            obj_this.attendees = data.attendees;
            obj_this.absent_all = false;
            obj_this.inperson_all = false;
            obj_this.online_all = false;
            obj_this.attendance_data = [];
        }        
        let input_data = {
            meeting_id: obj_this.meeting_id,            
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
        
        obj_this.httpService.get(final_input, success, null)
    }

    update_attendance(attendee_id: number, val, all_attendees=false){
        if (!all_attendees)
        {
            this.absent_all = false;
            this.inperson_all = false;
            this.online_all = false;
        }
        let attendee = this.attendance_data.find(x=>x.id == attendee_id);        
        if(attendee)
        {
            attendee.attendance = val; 
        }
        else{
            this.attendance_data.push({id: attendee_id, attendance: val});
        }
        // console.log(this.attendance_data, 103);
    }

    submit_attendance(e){        
        let obj_this = this;
        let input_data = {
            meeting_id: obj_this.meeting_id,
            attendance_data: obj_this.attendance_data,
        }
        // console.log(input_data, 222);
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


    check_all(el)
    {
        let obj_this = this;
        let target = $(el);
        let new_val = false;
        let attendance = '';
        if(target.hasClass('absent-all'))
        {
            new_val = $('#absent_all').prop('checked');
            obj_this.absent_all = new_val;
            $('input[type="radio"].absent').prop('checked', new_val);
            obj_this.online_all = false;
            obj_this.inperson_all = false
            attendance = 'absent';
        }

        if(target.hasClass('inperson-all'))
        {
            new_val = $('#inperson_all').prop('checked');
            obj_this.inperson_all = new_val;
            $('input[type="radio"].inperson').prop('checked', new_val);
            obj_this.absent_all = false;
            obj_this.online_all = false;
            attendance = 'inperson';
        }

        if(target.hasClass('online-all'))
        {
            new_val = $('#online_all').prop('checked');
            obj_this.online_all = new_val;
            $('input[type="radio"].online').prop('checked', new_val);
            obj_this.absent_all = false;
            obj_this.inperson_all = false;
            attendance = 'online';
        }
        if (new_val)
            {
                obj_this.attendees.forEach(el => {
                    el.attendance = attendance;
                    obj_this.update_attendance(el.id, attendance, true);
                });
            }
            else
            {
                obj_this.attendees.forEach(el => {
                    el.attendance = '';
                    obj_this.update_attendance(el.id, attendance, true);
                });
            }
    }

    ngOnInit() {
        this.get_list(); 

       
        
    }
}