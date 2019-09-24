import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-chatgroup',
    templateUrl: './chatgroup.component.html',
    styleUrls: ['./chatgroup.component.css']
})
export class ChatgroupComponent implements OnInit {
    @Input() input_users = [];
    @Input() group_name = '';
    constructor(public activeModal: NgbActiveModal) {
        
    }
    selected_users = [];
    group_users_changed(selected_users) {        
        this.selected_users = selected_users;        
    }

    sendRecord(){
        console.log(this.selected_users, 3343);
        let obj_this = this;
        this.activeModal.close({group_name: obj_this.group_name, selectd_users: this.selected_users});
    }

    userlist_input = '';
    ngOnInit() {
        this.userlist_input = JSON.stringify(this.input_users);
        console.log(this.input_users, 133);
    }
}