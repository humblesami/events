import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { HttpService } from '../../app/http.service';
import { SocketService } from '../../app/socket.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
    styleUrls:['./home.css'],
    templateUrl: 'home.component.html'    
})
export class HomeComponent implements OnInit {
    to_do_data = false;
    to_do_count = 0;
    date: Number = Date.now();
    home_data: any;

    constructor(private httpService: HttpService,
        public router: Router,
        private sanitizer: DomSanitizer,
        private socketService: SocketService) {            
        $('#collapsibleNavbar').children().eq(0).addClass('active');
    }

    navigate_meeting() {
        var obj_this = this;
        let id = document.getElementsByClassName('go_details')[0].id;
        obj_this.router.navigate(['/upcoming/meeting/' + id]);
    }

    scroll_to_do(){
        if(!this.home_data)
        {
            return;
        }
        $('.router-outlet').animate({            
            scrollTop: $('#to-do').position().top - 20
        }, 500);
    }

    get_home_data() {
        var obj_this = this;
        var success_cb = function(home_data) {
            if (!home_data['to_do_items']) {
                console.log("invalid data", home_data);
                return;
            }

            // console.log(home_data);
            var result = home_data.to_do_items.pending_meetings;
            for (var i in result) {
                var start = result[i]['start'];
                start = window['functions'].meeting_time(start);
                result[i]['start_dt'] = start;
            }
            
            home_data.description = obj_this.sanitizer.bypassSecurityTrustHtml(home_data.news.description);            

            var valid_videos = [];            
            home_data.video_ids.forEach((element: any) => {
                element.original_url = element.url;
                if (element.url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
                    element.url = obj_this.sanitizer.bypassSecurityTrustResourceUrl(element.url);
                    valid_videos.push(element);
                } else {
                    console.log(element.url + ' is not a valid url for video '+element.name);
                }
            });            
            obj_this.home_data = home_data;
            home_data.video_ids = valid_videos;
            var to_do_items = home_data.to_do_items;
            obj_this.to_do_count = to_do_items.pending_documents.length + to_do_items.pending_meetings.length + to_do_items.pending_surveys.length + to_do_items.pending_votings.length;
        };
        let args = {
            app: 'meetings',
            model: 'News',
            method: 'get_data'
        }
		let input_data = {
            params: {},
            args: args
        };
        obj_this.httpService.get(input_data, success_cb, null);
    }

    view_video(video_name, video_url){  
        console.log(video_url); 
        $('#videoModal .modal-heaer').html('<h3>'+video_name+'</h3>')
        $('#videoModal .modal-body .embed-responsive').html(`
            <iframe class="embed-responsive-item" frameborder="0"  allowfullscreen="allowfullscreen"
            src="`+video_url+`?autoplay=1">
            </iframe>
        `);     
        $('#videoModal').modal('show');
    }

    ng_init = false;
    ngOnInit() {
        var obj_this = this;
        $('.home-container').show();
        $('#videoModal').on('hidden.bs.modal', function () {
            $('#videoModal .modal-body .embed-responsive').html('');
        });
        
        obj_this.get_home_data(); 
        $(function(){
            obj_this.ng_init = true;
        })       
        this.socketService.server_events['to_do_item_updated'] = function() {
            if (obj_this){
                setTimeout(function(){
                    obj_this.get_home_data();
                },5000)
            }                
        }    
    }
}