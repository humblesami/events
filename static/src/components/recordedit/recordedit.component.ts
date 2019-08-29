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
		window['functions'].showLoader('jangoiframe');
    }
    
	ngOnInit() {
        this.id= this.route.snapshot.params.id;        
        let temp = window.location.hash.split("edit")[1];
        if(temp.indexOf('/admin/add') > -1)
        {
            this.url = window['site_config'].server_base_url+"/admin/meetings/profile/add/?group=admin&_popup";
        } 
        else if(temp.indexOf('/staff/add') > -1)
        {
            this.url = window['site_config'].server_base_url+"/admin/meetings/profile/add/?group=staff&_popup";
        }
        else if(temp.indexOf('/director/add') > -1)
        {            
            this.url = window['site_config'].server_base_url+"/admin/meetings/profile/add/?group=director&_popup";
        }                
        else
        {
            this.url = window['site_config'].server_base_url+"/admin"+temp+"?_popup"
        }
        // console.log(temp, this.url);
        
		this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
		$('#record_edit_iframe').load(function(){
			window['functions'].hideLoader('jangoiframe')
		});
    }
    go_back(){
        this._location.back();
    }
	ngOnDestroy() {
	}
}
