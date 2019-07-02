import { Component } from '@angular/core';
import {SocketService} from './socket.service';
declare var $:any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',    
})

export class AppComponent {        
    constructor(private ss: SocketService)
    {
        this.socketService = ss;        
    }
    socketService: SocketService;

	topFunction() {        
		document.body.scrollTop = 0;
		$("html, body").animate({ scrollTop: 0 }, 600);
	}

	scrollFunction() {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			document.getElementById("backTop").style.display = "block";
		} else {
			document.getElementById("backTop").style.display = "none";
		}
    }
    
    odoo_build = window['odoo'] ? 1 : undefined;
    ngOnInit() {
        var obj_this = this;
        window['loader'] = $('#server-wait');
        window.onscroll = function() {obj_this.scrollFunction()};
        var treeviewMenu = $('.app-menu');
        $('body').on('click', '.main-nav-header [data-toggle="sidebar"]', function(event){
            event.preventDefault();
            $('body.user').toggleClass('sidenav-toggled');
        });
        
        $('body').on('click', '.main-nav-header [data-toggle="treeview"]', function(event){
            console.log('toggleing 2');
            event.preventDefault();
            if(!$(this).parent().hasClass('is-expanded')) {
                treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
            }
            $(this).parent().toggleClass('is-expanded');
        });

        $("body").on("click", ".top-search-btn", function() {
            $(".serach-input")
                .toggleClass("active")
                .focus();
            $(".btn-search").toggleClass("animate");
            $(".serach-input").val("");
        });
        
        
    }
}
