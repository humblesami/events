import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { delay, map, tap } from 'rxjs/operators';
import { ChatUser } from 'src/app/models/chat';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/app/socket.service';
import { ProfilesummaryComponent } from '../profilesummary/profilesummary.component';
import {Observable, of} from 'rxjs';

@Component({
    selector: 'app-djangopaginator',
    templateUrl: './djangopaginator.component.html',
    styleUrls: ['./djangopaginator.component.css']
})
export class DjangopaginatorComponent implements OnInit {
    @Input() meeting_id: number;
    asyncMeals: Observable < string[] > ;
    p: number = 1;
    total: number;
    collection = [];
    loading: boolean;
    config: any;
    offset = 0;
    count = "";
    key_word: string;
    maxSize: 5;
    itemsPerPage = 2;
    limit_options = [
        2,
        10,
        50,
        100
    ]
    constructor(private httpService: HttpService,
        private modelService: NgbModal,
        public activeModal: NgbActiveModal,
        private socketService: SocketService) {
        // this.config= {
        //   itemsPerPage: 2,
        // };
    }
    attendance_data = [];
    roster_search(e) {
        if (e.keyCode == 13) {
            this.key_word = e.target.value;
            this.getdata();
        }
        // console.log(32312, e.keyCode);
    }
    ngOnInit() {
        this.offset = this.offset;
        this.itemsPerPage = this.itemsPerPage;
        this.getdata();
    }

    getdata() {
        this.loading = true;
        let obj_this = this;

        function success(data) {
            obj_this.count = data.attendees.length;
            obj_this.collection = data.attendees;
            obj_this.httpService.changePaginator(data.total);
            obj_this.total = data.total;

            console.log(obj_this.collection);
        }
        let input_data = {
            meeting_id: obj_this.meeting_id,
            offset: obj_this.offset,
            limit: obj_this.itemsPerPage
        }
        let args = {
            app: 'meetings',
            model: 'Event',
            method: 'get_roster_details'
        }
        let final_input = {
            params: input_data,
            args: args,
            no_loader: 1
        }
        if (obj_this.key_word) {
            input_data['key_word'] = obj_this.key_word;
            args['method'] = 'search_roster';
            // obj_this.key_word = undefined;
        }
        obj_this.httpService.get(final_input, success, null)

    }

    recall() {
        this.p = 1; //Math.ceil(this.offset/this.itemsPerPage)
        this.offset = 0; //(this.p - 1) * this.itemsPerPage;
        console.log(this.itemsPerPage, this.offset, this.p);
        this.getdata();

    }


    pageChanged(event) {
        this.offset = (event - 1) * this.itemsPerPage;
        console.log(this.itemsPerPage, this.offset, event);
        this.getdata();
        this.p = event;
    }

    // lastPage(){
    //   let lastPage= Math.ceil(this.total/this.itemsPerPage);
    //   this.offset = (lastPage - 1) * this.itemsPerPage;
    //   this.getdata();
    //   this.p=lastPage;
    // }


    update_attendance(attendee_id: number, val) {
        let attendee = this.attendance_data.find(x => x.id == attendee_id);
        if (attendee) {
            attendee.attendance = val;
        } else {
            this.attendance_data.push({
                id: attendee_id,
                attendance: val
            });
        }
        console.log(this.attendance_data, 103);
    }

    submit_attendance() {
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
        obj_this.httpService.post(final_input, function(data) {
            console.log(data);
        }, null);
        obj_this.activeModal.close('Close click');
    }
}