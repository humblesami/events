import { Component, OnInit } from "@angular/core";
import { SocketService } from "../../app/socket.service";
declare var $: any;

@Component({
    selector: "app-chat",
    styleUrls:['./notification.css'],
	templateUrl: "./chat.component.html",	
})
export class ChatComponent implements OnInit {
	socketService : SocketService;
    constructor(
		private ss: SocketService) {
		var obj_this = this;
        obj_this.socketService = ss;        
    }
    odoo_build = window['odoo'] ? 1 : undefined;

	close_right_panel() {
		$(".right-panel").hide();
    }

    toggle_notifications(e)
    {
        var togglerelated = window['functions'].togglerelated;        
        togglerelated('.container.notification-list'); 
    }
    
	ngOnInit() {                
        var obj_this = this;
        var route = window['pathname'];
        if(route == '/chat')
        {            
            //console.log("Loaded as route");
            $('body').css('background-color','transparent');
            $('.main-user-navbar').css({'padding-top': '8px'});
        }
        else
        {
            //console.log("Loaded in app");
        }
    }
}