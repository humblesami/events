import {Component, Injectable, OnInit} from '@angular/core';
import {HttpService} from '../../app/http.service';
import {SocketService} from '../../app/socket.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
    selector: 'app-header',
    styleUrls:['./header.css'],
    templateUrl: './header.component.html'    
})

export class HeaderComponent implements OnInit {
	search_bar = false;
	show_search_results = false;
    searchAble = true;
	is_content_search = false;
	content_search = false;
    search_key_word = '';
    global_search = true;
    search_active = false;
    search_results = {};
    search_item_types = [];
    no_search = false;
    results_visibility = false;
    socketService : any;
    current_model = '';
    is_list_view = false;

    route_map = {
        'meetings.Event': '/meeting/',
        'meetings.Topic': '/topic/',
        'resources.Folder': '/resource/',
        'meetings.Committee': '/committees/',
        'survey.Survey': '/survey/',
		'meetings.NewsDocument': '/home/doc/',
        'meetings.Profile': '/profile/',
        'voting.Voting': '/voting/',

        'voting.VotingDocument' : 'voting/doc/',
        'meetings.MeetingDocument': '/meeting/doc/',
        'resources.ResourceDocument': '/resource/doc/',
        'meetings.SignDocument': '/signdoc/',
        'meetings.AgendaDocument': '/topic/doc/',
    };
    
    constructor(private router: Router, private sserv : SocketService, private route: ActivatedRoute, private httpService: HttpService) {
        this.socketService = sserv;
        this.route.data.subscribe(data => {            
            if(!data.searchAble) {
                this.searchAble = false;
            }
        });
    }

    on_search_focus(){
        console.log(this.route);
        this.route.data.subscribe(data => {            
            console.log(data.is_list_view, 1883, data);
            this.is_list_view = data.is_list_view;          
        });
    }

    settingDocRoute(file_type){
        let file_route = '';
        switch(file_type){
            case 'meeting':
                file_route = '/meeting/doc/'
                break;
            case 'topic':
                file_route = '/topic/doc/'
                break;
            case 'voting':
                file_route = '/voting/doc/'
                    break;
            case 'home':
                file_route = '/home/doc/'
                    break;
            case 'signature':
                file_route = '/signature/doc/'
                    break;
            case 'resource':
                    file_route = '/resource/doc/'
                        break;
        }
        return file_route;
    }

    doc_types = [];
    content_search_results = undefined;

    search(){
        let obj_this = this;        
        obj_this.content_search = obj_this.is_content_search;
        let url = window.location + '';
        obj_this.search_key_word = obj_this.search_key_word.replace(/[^a-zA-Z0-9 ]/g, '');
        if(obj_this.search_key_word.length < 1) {
            return;
        }
        else {
            var success_cb = function (result) {
                // $('.searchbar-full-width').hide();
				if(obj_this.content_search){
                    obj_this.doc_types = [];
                    obj_this.content_search_results = {};
					result.forEach(item => {
                        let file_route = obj_this.settingDocRoute(item.file_type);
						item['route'] = file_route + item.id + '/' + obj_this.search_key_word;                        
                        if(obj_this.content_search_results[item.file_type])
                        {
                            obj_this.content_search_results[item.file_type].push(item);
                        }
                        else
                        {
                            obj_this.doc_types.push(item.file_type);
                            obj_this.content_search_results[item.file_type] = [item];
                        }
                    });
                    // console.log(obj_this.content_search_results, obj_this.doc_types);
				}
				else {
                    obj_this.search_item_types=[];
                    obj_this.search_results = {}
					result.forEach(item => {                        
                        item['route'] = obj_this.route_map[item.model] + item.id;					
                        var item_type = item.model.split('.')[1]+'s';
                        if (item_type == 'Profiles')
                        {
                            if (!item.name)
                            {
                                if (item.first_name)
                                {
                                    if (item.last_name)
                                    {
                                        item.name = item.first_name + ' ' + item.last_name;
                                    }
                                }
                                if (!item.last_name)
                                {
                                    if (item.last_name)
                                    {
                                        item.name = item.last_name;
                                    }
                                }
                                if (!item.first_name && !item.last_name)
                                {
                                    item.name = item.username;
                                }
                            }
                        }

						if(obj_this.search_results[item_type])
                        {
                            obj_this.search_results[item_type].push(item);
                        }
                        else
                        {                            
                            obj_this.search_item_types.push(item_type);
                            obj_this.search_results[item_type] = [item];
                        }
                    });
                    console.log(obj_this.search_results, obj_this.search_item_types);
                }
                if(result.length < 1) {
                    obj_this.no_search = true;
                }
                else{
                	obj_this.no_search = false;
				}
                obj_this.show_search_results = true;
                //console.log(obj_this.search_results)
            };
            var failure_cb = function (error) {
            };

            let req_url = '/meeting_point/search-json';
            this.content_search ? req_url = '/meeting_point/search-docs':null ;

            let input_data = { kw: obj_this.search_key_word, is_content_search: obj_this.is_content_search };
            let search_model = '';
            if(this.searchAble && !this.global_search) {
                if(url.indexOf('meetings') !== -1 ){
                    input_data['model'] = 'calendar.event';
                } else if(url.indexOf('resources') !== -1 ) {
                    input_data['model'] = 'meeting_point.folder';
                } else if(url.indexOf('committees') !== -1 ) {
                    input_data['model'] = 'meeting_point.committee';
                } else if(url.indexOf('profiles') !== -1 ) {
                    input_data['model'] = 'meeting_point.users';
                }
                else if(url.lastIndexOf('voting') !== -1){
                    input_data['model'] = 'meeting_point.voting';
                }
            }
            else {
                input_data['model'] = '';
            }
            let args = {
                app: 'meetings',
                model: 'Abstract',
                method: 'search'
            };
            if(obj_this.content_search )
            {
                args.method = 'search_contents'
            }
            let final_input_data = {
                args: args,
                params: input_data,
            }
            this.httpService.search(final_input_data, success_cb, failure_cb);
        }
    }

    signout(){
        var obj_this = this;
        window['functions'].go_to_login();
    }
    
    change_cursor()
    {
        //console.log(322);
        window['functions'].change_cursor();
    }
    show_profile_menu(e){
        var togglerelated = window['functions'].togglerelated;        
        togglerelated('.profile-menu.dropdown-menu');
    }

    search_bar_shown = false;
    search_results_visibility()
    {
        let obj_this = this;
        if (!obj_this.search_bar_shown)
        {
            $(".searchbar-full-width")
                    .show()
                    .find("input:first")
                    .focus();
            obj_this.search_bar_shown = true;
        }
        else
        {
            $(".searchbar-full-width")
                    .hide();
            obj_this.search_bar_shown = false;
        }
        if (obj_this.search_results)
        {
            obj_this.show_search_results = true;
        }
    }

    hide_search(){
        let obj_this = this;
        obj_this.show_search_results = false;
        $(".searchbar-full-width").hide();
        obj_this.search_bar_shown = false;
    }
    
    show_messenger(){
        if($('.messenger-container').length == 1)
        {
            $('.popup.messenger').show();
        }
    }

    admin_url = '';
    ngOnInit() {        
        // setTimeout(function(){
        //     $('.messageicon-container').popover({
        //         html:true,
        //         content: function() {
        //             // var content = $(this).attr("content");
        //             // console.log($(content)[0]);                    
        //             // return content; // $(content)[0].outerHTML;
        //             return $('#messenger-icon-target').html();
        //         }
        //     });
        // }, 200);
        
    }
}
