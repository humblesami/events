import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { SocketService } from 'src/app/socket.service';
declare var $: any;

@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
    @Input() input_users = '';
    @Output() selectedUsers : EventEmitter <any> = new EventEmitter();
    server_url = window['server_url'];
    httpService: HttpService;
    constructor(private httpServ: HttpService,
        private socketService: SocketService) {
        this.httpService = httpServ;
    }    
    attendance_data = [];    

    users = [];
    all_users = [];
    count: number;

    on_selection_changed(){
        let selected_users = this.users.filter((el)=>{
            return el.selected == true;
        });
        this.selectedUsers.emit(selected_users);
    }

    selection_input = [];
    check_user_selected(user_id)
    {
        let selected = false;        
        for (const user of this.selection_input) {
            if (user.id == user_id)
            {
                selected = true;
                break;
            }
        }

        return selected;
    }

    get_list(){
        let obj_this = this;
        function success(data){            
            obj_this.httpService.count = Number(data.total);
            obj_this.count = data.users.length;
            obj_this.users = data.users;

            if(obj_this.input_users)
            {
                obj_this.selection_input = JSON.parse(obj_this.input_users);
                console.log(32323);
                obj_this.selectedUsers.emit(obj_this.selection_input);
            }

            obj_this.users.forEach((val)=>{
                val.selected = obj_this.check_user_selected(val.id);
            });
            obj_this.all_users = obj_this.users;
        }
        let args = {
            app: 'meetings',
            model: 'Profile',
            method: 'get_all_users'
        }
        let final_input = {
            params: {},
            args: args,
            no_loader:1
        }
        
        obj_this.httpService.get(final_input, success, (er)=>{console.log(er);})
    }

    all_selected_users(el)
    {
        this.users = this.all_users.filter((el)=>{
            return el.selected == true;
        });
        this.apply_active_class(el);
    }

    all_profile_users(el)
    {
        this.users = this.all_users;
        this.apply_active_class(el);
    }

    all_available_users(el)
    {
        this.users = this.all_users.filter((el)=>{
            return el.selected == false;
        });
        this.apply_active_class(el);
    }

    apply_active_class(el)
    {
        $(el).parent().find('.active').removeClass('active');
        $(el).addClass('active');
    }

    user_serach(val)
    {
        let obj_this = this;
        let btn_text = $('a.btn.active').text();
        if (btn_text.toLowerCase().indexOf('all') != -1)
        {
            obj_this.all_profile_users($('a.btn.active'));
        }
        else if (btn_text.toLowerCase().indexOf('available') != -1)
        {
            obj_this.all_available_users($('a.btn.active'));
        }
        else if (btn_text.toLowerCase().indexOf('selected') != -1)
        {
            obj_this.all_selected_users($('a.btn.active'));
        }
        obj_this.users = obj_this.users.filter((el)=>{
            var mail_matched = false;
            if(el.email && el.email.toLowerCase().indexOf(val) != -1)
            {
                mail_matched = true;
            }
            var name_matched = false;
            if(el.name && el.name.toLowerCase().indexOf(val) != -1)
            {
                name_matched = true;
            }
            return mail_matched || name_matched;
        });
    }

    uncheck_user(user_obj)
    {
        user_obj.selected = false;
    }
    check_user(user_obj)
    {
        user_obj.selected = true;
    }

    ngOnInit() {
        this.get_list();        
    }
}