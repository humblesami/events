import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {SocketService} from "../../app/socket.service";
import {HttpService} from "../../app/http.service";
import {Location} from '@angular/common';

declare var $: any;

@Component({
    selector: 'app-document',
    templateUrl: './document.component.html'
})
export class DocumentComponent implements OnInit {

    page_num = 1;
    doc_data: any;  
    breadcrumb: any;  
    total_pages = 0;
    annot_hidden = false;
    socketService : SocketService
    constructor(private route: ActivatedRoute,
				private ss:SocketService,
                private httpService: HttpService,
                private router: Router,
                private _location: Location) {
		this.socketService = ss;
        this.route.params.subscribe(params => this.loadDoc());
    }

	changePage(pageToMove){
		this.total_pages = $('.page-count').html();
		if(pageToMove < 1 || pageToMove > this.total_pages)
			this.page_num = pageToMove = 1;

		if(pageToMove == 1)
			$('.page-prev-btn').attr("disabled", "disabled");
		else
			$('.page-prev-btn').removeAttr('disabled');

		if(pageToMove == this.total_pages)
			$('.page-next-btn').attr("disabled", "disabled");
		else
			$('.page-next-btn').removeAttr('disabled');
		$('#viewer-wrapper').scrollTop($('.pdfViewer .page:first').height()* (pageToMove - 1)+50)
	}

	hint() {
		$('.search-bar-container .search-hint-text').css("display", "none").fadeIn(700);
	}
	unhint() {
		$('.search-bar-container .search-hint-text').hide();
	}

	toggleAnnotations(){
		this.annot_hidden = !this.annot_hidden;
		window['show_annotation'] = !window['show_annotation']
		$('.annotation_button').toggle();
		$('.annotationLayer').toggle();
	}

    go_to_parent_url()
    {
        var obj_this = this;
        var parent_url = localStorage.getItem('previous_url');
        var curl = window['pathname'];
        if(parent_url.endsWith('login'))
        {
            parent_url = '/#/';
        }
        else if(parent_url)
        {
            obj_this.router.navigate([parent_url]);
        }
    }

    go_back()
    {
        this._location.back();
    }

    loadDoc(){
        var obj_this = this;
		window['show_annotation'] = false;
        window['functions'].showLoader('loaddocwaiter');        
        obj_this.onLibsLoaded();
    }

    doc_models = {

    }
    
    onLibsLoaded()
    {
        var obj_this = this;        
        var doc_type = obj_this.route.snapshot.params.doc_type;        
        let doc_id = obj_this.route.snapshot.params.res_id;
        let point_id = undefined;
        
        
        let args = {
            app: 'documents',
            model: 'File',
            method: 'get_binary'
        }
        var input_data = {            
            args: args,
            params: {id : doc_id}
        };  
        if(obj_this.route.toString().indexOf('discussion') > -1)
        {
            point_id = doc_id;
            input_data = {            
                args: args,
                params: {id : doc_id}
            }; 
        }      

        var renderDoc = function(data){
            obj_this.doc_data = data;
            if (data.breadcrumb)
            {
                obj_this.breadcrumb = JSON.stringify(data.breadcrumb);
            }
            var doc_data = {
                doc:data.doc, 
                id: doc_id,
                first_time: 1, 
                // type : doc_type,
                type : data.type,
                attendees: data.attendees,
                mp_signature_status:data.mp_signature_status
            };
            if (data.excel){
                $('app-document .excel_doc').append(data.doc).show()
                $('.loadingoverlay').hide();
            }
            else{
                window['pdf_js_module'].render(doc_data);
            }
            
            var c_path = window['pathname'];
            $('.notification-list:first .list-group-item[ng-reflect-router-link="'+c_path+'"]').addClass('active');                
        };
        if(!doc_type){
            //console.log("No doc_type");
            return;
        }
        obj_this.httpService.get(input_data,renderDoc, function(){
            window['functions'].hideLoader('loaddocwaiter');
        });        
    }
    mentionConfig:any
    ngOnInit() {
        var obj_this = this;
        window['init_doc_comments']();
		var content = $("#content-wrapper");
		var results;
		var currentClass = "current";
		var offsetTop = 50;
        var currentIndex = 0;
        
        var obj_this = this;
		$('#viewer-wrapper').scroll(function() {
			var scroll = $(this).scrollTop();
			if(scroll == 0 )
				scroll = 1;
			obj_this.page_num = Math.ceil(scroll / $('.pdfViewer .page:first').height());
			if(obj_this.page_num == 1)
				$('.page-prev-btn').attr("disabled", "disabled");
			else
				$('.page-prev-btn').removeAttr('disabled');

			if(obj_this.page_num == $('.page-count').html())
				$('.page-next-btn').attr("disabled", "disabled");
			else
				$('.page-next-btn').removeAttr('disabled');
        });
         obj_this.mentionConfig ={
            items: [{id:1, name: 'Faizan'}, {id: 2, name: 'Sami'}],
            insertHTML: true,
            triggerChar: '@',
            labelKey: 'name',
            mentionSelect:function(val){
                // obj_this.should_save = false;
                setTimeout(function(){
                    let val = $('.mention-div').text();
                    $('.mention-div').html(val.replace('&lt','<').replace('&gt', '>'));                        
                },10);                    
                return '<a>'+val.name+'</a>';                    
            }
        };
    }
}
