import { ChangeDetectionStrategy ,Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../app/http.service'
import { ChatUser } from 'src/app/models/chat'
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from 'src/app/socket.service';
import { ProfilesummaryComponent } from '../profilesummary/profilesummary.component';
declare var $: any;
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

interface IServerResponse {
  items: string[];
  total: number;
}

@Component({
  selector: 'app-ngxpageroster',
  templateUrl: './ngxpageroster.component.html',
  styleUrls: ['./ngxpageroster.component.css']
})
export class NgxpagerosterComponent implements OnInit {
  @Input() meeting_id : number;
  config: any;
  collection = [];
  count = "";
  key_word: string;
  maxSize = 5;
  itemsPerPage = 1;
  limit_options = [
    1,
    10,
    50,
    100
  ] 
  constructor(private httpService: HttpService,
    private modelService: NgbModal,
    public activeModal: NgbActiveModal,
    private socketService: SocketService) { 
    this.config= {
      currentPage : 1,
      totalItems: 0,
    };
  }
  attendance_data = [];
  roster_search(e){
    if(e.keyCode == 13)
    {
        this.key_word = e.target.value;
        this.getdata();
    }
    // console.log(32312, e.keyCode);
}

  
  getdata(){
    let obj_this = this;
    function success(data){
      obj_this.count = data.attendees.length;
      obj_this.collection = data.attendees;
      obj_this.httpService.changePaginator(data.total);
      obj_this.config.totalItems = obj_this.count;
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
    if(obj_this.key_word)
    {
        input_data['key_word'] = obj_this.key_word;            
        args['method'] = 'search_roster';
        // obj_this.key_word = undefined;
    }
    obj_this.httpService.get(final_input, success, null)
    
  }
  
  pageChanged(event){
    this.config.currentPage = event;
  }

  lastPage(){
    let lastPage= Math.ceil(this.config.totalItems/this.itemsPerPage);
    return lastPage;
  }
  ngOnInit() {
    this.getdata();
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

  submit_attendance(){        
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
    obj_this.activeModal.close('Close click');
  } 

}