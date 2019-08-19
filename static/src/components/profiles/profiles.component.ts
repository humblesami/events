import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../app/http.service";
import { SocketService } from 'src/app/socket.service';

@Component({
    styleUrls:['./profiles.css'],
    templateUrl: 'profiles.component.html'
})
export class ProfilesComponent implements OnInit {
    profiles_data: any;
    no_prof = false;
    type = '';
    socketService : SocketService;

    constructor(private httpService: HttpService, private ss: SocketService) {        
        this.profiles_data = [];
        this.socketService = this.ss;
        httpService.on_get_data = this.get_list;
        this.get_list();
    }

    get_list(){
        var obj_this = this;
        var url = window.location.href.split("/")
        var path = url[url.length-1]
        obj_this.type = "";
        if (path == "directors"){
            obj_this.type = "director"
        }
        if (path == "admins"){
            obj_this.type = "admin"
        }
        if (path == "staff"){
            obj_this.type = "staff"
        }
        const input_data = {
            type:obj_this.type
        }
        let args = {
            app: 'meetings',
            model: 'Profile',
            method: 'get_records'
        }			
        let final_input_data = {
            params: input_data,
            args: args
        };
        obj_this.httpService.get(final_input_data,
            (result) => {
                    obj_this.profiles_data = result.records;
                    obj_this.profiles_data && obj_this.profiles_data.length > 0 ? obj_this.no_prof = false : obj_this.no_prof = true;                    
        }, (error) => {});
    }

    ngOnInit() {
        window['json_functions'].find_activate_link('.MeetingBtnWrapper');
    }
}
