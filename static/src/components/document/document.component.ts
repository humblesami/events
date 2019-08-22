import { Component, OnInit, Input } from '@angular/core';
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
    mentionConfig = {};
    mention_list = [];
    should_save = false;
    socketService : SocketService
    constructor(private route: ActivatedRoute,
				private ss:SocketService,
                private httpService: HttpService,
                private router: Router,
                private _location: Location) {
                    this.mention_list = []
                    window['should_save'] = true;
		this.socketService = ss;
        this.route.params.subscribe(params => this.loadDoc());
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
        console.log(Date(), new Date().getMilliseconds());
        var obj_this = this;
		window['show_annotation'] = false;
        window['functions'].showLoader('loaddocwaiter');        
        obj_this.onLibsLoaded();
    }

    placeCursorAtEnd() {
        let contentEditableElement = $('.active-mention')[0];
        var range,selection;
        if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
        {
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }
    }


    doc_models = {

    }
    
    onLibsLoaded()
    {
        console.log(Date(), new Date().getMilliseconds(), ' doc reached');
        var obj_this = this;        
        var doc_type = obj_this.route.snapshot.params.doc_type;        
        let doc_id = obj_this.route.snapshot.params.res_id;
        let point_id = undefined;
        let args = {
            app: 'documents',
            model: 'File',
            // method: 'get_binary'
            method: 'get_file_data'
        }
        if (window.location.toString().indexOf('4200') > -1)
        {
            args.method = 'get_binary';
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
            // console.log(Date(), data, new Date().getMilliseconds(),  'doc data downloaded');
            data.file_type = doc_type;
            obj_this.doc_data = data;
            
            if (data.breadcrumb)
            {
                obj_this.breadcrumb = JSON.stringify(data.breadcrumb);
            }
            if(data.mention_list)
            {
                obj_this.mention_list = data.mention_list.filter(function(obj){
                    return obj.id != obj_this.socketService.user_data.id;
                });
                // console.log(obj_this.mention_list);
                obj_this.mentionConfig = {
                    items: obj_this.mention_list,
                    insertHTML: true,
                    triggerChar: "@",
                    dropUp: true,
                    labelKey: 'name',
                    mentionSelect: function(val){
                        let el = $('.active-mention');                
                        let tag = $('<a class="mention" mentioned_id="'+val.id+'" href="/#/'+val.group+'/'+val.id+'">'+val.name+'</a>');
                        el.append(tag);
                        el.html(el.html().replace('@', ''));
                        obj_this.placeCursorAtEnd();
                        window['should_save'] = false;
                        return '';
                    }
                };
            }
            
            var doc_data = {
                id: doc_id,
                first_time: 1, 
                type : doc_type,
                attendees: data.attendees,
                doc_name: data.name,
                mp_signature_status:data.mp_signature_status
            };
            if(data.url)
            {
                doc_data['url'] = data.url;
            }
            else
            {
                doc_data['doc'] = data.doc;
            }
            if (data.excel){
                $('app-document .excel_doc').append(data.doc).show()
                $('.loadingoverlay').hide();
            }
            else{
                console.log(Date(), new Date().getMilliseconds(), 'started rendering');
                window['pdf_js_module'].render(doc_data);
            }                
        };
        if(!doc_type){
            //console.log("No doc_type");
            return;
        }
        
        obj_this.httpService.get(input_data,renderDoc, function(){
            window['functions'].hideLoader('loaddocwaiter');
        });
    }

    on_page_changed(pageToMove)
    {
        if(pageToMove <= 1)
        {
            pageToMove = 1;
            $('.page-prev-btn').addClass("disabled");
            $('.page-next-btn').removeClass("disabled");
        }
        else if(pageToMove >= this.total_pages)
        {
            pageToMove = this.total_pages;
            $('.page-next-btn').addClass("disabled");
            $('.page-prev-btn').removeClass("disabled");
        }
        else
        {
            $('.page-next-btn').removeClass("disabled");
            $('.page-prev-btn').removeClass("disabled");
        }                
        this.page_num = pageToMove;        
    }
    
    programatic_scroll = false;
    next_prev_page(pageToMove){                
        pageToMove = this.page_num + pageToMove;
        this.change_page(pageToMove);
    }

    change_page(pageToMove = null)
    {
        if(!this.total_pages)
        {
            this.total_pages = $('.page-count:first').html();
        }
        console.log(pageToMove, 133);
        try{
            if(!pageToMove)
            {
                pageToMove = this.page_num;
            }
            let test = parseInt(pageToMove);
            if(pageToMove < 1)
            {
                pageToMove = 1;
                this.page_num = pageToMove;
                return;
            }
            else
            {
                if(pageToMove >= this.total_pages)
                {
                    pageToMove = this.total_pages;
                    this.page_num = pageToMove;
                    return;
                }
            }         
            let page_height = $('.pdfViewer .page:first').height();
            let pdf_scroll = (pageToMove * page_height);
            this.programatic_scroll = true;
            $('.PdfViewerWrapper:first').scrollTop(pdf_scroll);
        }
        catch
        {
            this.page_num = 1;
        }
    }
    
    ngOnInit() {
        var obj_this = this;
        window['init_doc_comments']();
		$('.PdfViewerWrapper:first').scroll(function() {
            if(!this.total_pages)
            {
                this.total_pages = $('.page-count:first').html();
            }
            if(obj_this.programatic_scroll)
            {
                obj_this.programatic_scroll = false;
                return;
            }
			var pdf_scroll = $(this).scrollTop();
			if(pdf_scroll == 0 )
            pdf_scroll = 1;
            let page_height = $('.pdfViewer .page:first').height();
            obj_this.page_num = Math.ceil(pdf_scroll / page_height);            
        });
    }
}
