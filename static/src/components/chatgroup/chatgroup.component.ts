import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-chatgroup',
    templateUrl: './chatgroup.component.html',
    styleUrls: ['./chatgroup.component.css']
})
export class ChatgroupComponent implements OnInit {
    @Input() input_users_str = '';
    @Input() selection_input_str = '';
    @Input() group_name = '';
    constructor(public activeModal: NgbActiveModal) {
        
    }
    selected_users = [];
    group_users_changed(selected_users) {        
        this.selected_users = selected_users;        
    }

    sendRecord(){
        let obj_this = this;
        this.activeModal.close({group_name: obj_this.group_name, selectd_users: this.selected_users});
    }

    ngOnInit() {
        
    }
}