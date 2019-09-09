import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {Location} from '@angular/common';
declare var $: any;

@Component({
	styleUrls:['./recordedit.css'],
	templateUrl: 'recordedit.component.html'
})

export class RecordEditComponent implements OnInit {
	id: any;
	url: any;
	constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private _location: Location) { 
		
    }
    
	ngOnInit() {
        this.id= this.route.snapshot.params.id;        
        let temp = window.location.hash.split("edit")[1];
        this.url = window['site_config'].server_base_url+"/admin"+temp+"?_popup";
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        window['functions'].showLoader(temp);
        function content_start_loading(){
            window['functions'].hideLoader(temp);
        }
        function receiveMessage(e){
            var url = window.location.href,
                url_parts = url.split("/"),
                allowed = url_parts[0] + "//" + url_parts[2];
    
            // Only react to messages from same domain as current document
            if (e.origin !== allowed && e.origin != 'http://localhost:8000') return;
            // Handle the message
            switch (e.data) {
                case 'iframe_load': content_start_loading(); break;
            }
        };
        window.addEventListener("message", receiveMessage, false);
    }
    go_back(){
        this._location.back();
    }
	ngOnDestroy() {
	}
}
