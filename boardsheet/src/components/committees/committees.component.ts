import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from '../../app/http.service'
import { SocketService } from 'src/app/socket.service';

@Component({
    styleUrls:['./committees.css'],
    templateUrl: 'committees.component.html'    
})
export class CommitteesComponent implements OnInit {
    committees = [];
    no_committees = false;
    heading = 'Committees';
    bread_crumb = {
		items: [],
		title: ''
    };
    socketService: SocketService
    img: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png';

    constructor(private httpService: HttpService, private ss: SocketService) {
        const obj_this = this;
        this.socketService = this.ss;
        obj_this.httpService.fetch_paged_data = function(off_set, limit){
            
            let args = {
                app: 'meetings',
                model: 'Committee',
                method: 'get_records'
            }
            var input_data = {
                paging : {
                    offset: off_set, 
                    limit: limit
                },
                args: args
            };
            var success_cb = function (result) {
                obj_this.committees = result.records;
                obj_this.httpService.total_records = result.total;
                obj_this.committees.length > 0 ? obj_this.no_committees = false : obj_this.no_committees = true;
            };
            var failure_cb = false;
            obj_this.httpService.get(input_data, success_cb, failure_cb);
        }
    }

    ngOnInit() {
        var req_url = '/ws/committees-json';
        var obj_this = this;
        var success_cb = function (result) {
            console.log(result)
            obj_this.committees = result.records;
            obj_this.httpService.total_records = result.total;
            obj_this.committees.length > 0 ? obj_this.no_committees = false : obj_this.no_committees = true;
        };
        let args = {
            app: 'meetings',
            model: 'Committee',
            method: 'get_records'
        }
        var input_data = {
            params :{paging : {offset: 0, limit: 20}},
            args: args
        };
        this.httpService.get(input_data, success_cb, null);
        // make_bread_crumb(obj_this.heading);

        function make_bread_crumb(page_title ) {
            if (page_title) {
                obj_this.bread_crumb.title = page_title;
            }
        }
    }
}
