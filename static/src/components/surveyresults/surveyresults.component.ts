import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../app/http.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { SocketService } from 'src/app/socket.service';
import { ViewmembersComponent } from '../viewmembers/viewmembers.component';
declare var $: any;

@Component({
    selector: 'app-surveyresults',
    templateUrl: './surveyresults.component.html',
    styleUrls: ['./surveyresults.css']
})
export class SurveyresultsComponent implements OnInit {
    surveyDetails: any;
    data_loaded = false;
    socketService: SocketService;

    constructor(private httpService: HttpService,
        private route: ActivatedRoute, private ss: SocketService,
        public router: Router) {
        this.socketService = this.ss;
        window['app_libs']['signature'].load();
    }

    show_answer_details(detail){
        window['bootbox'].alert(detail);
        $('.modal-dialog').addClass('modal-lg');
    }
    show_user_details(name,email){
        window['bootbox'].alert("<div class='col-md-12'>"+name+"</div>" +"<div class='col-md-12'>"+ email+"</div>");
        $('.modal-dialog').addClass('modal-lg');
        //$( "#dialog" ).dialog();
    }
    ngOnInit() {
        const obj_this = this;
        const input_data = {
            survey_id: obj_this.route.snapshot.params.id
        };
        const success_cb = function(result) {
            obj_this.surveyDetails = result;
            // console.log(result);
            setTimeout(function() {
                var chart_colors = window['chart_colors'];
                // console.log(chart_colors,7888);
                for (let i in obj_this.surveyDetails.questions) {
                    let question = obj_this.surveyDetails.questions[i];
                    if (question.chart_data.length && question.user_answers.length) {
                        var p =0;
                        for(let j in question.chart_data){
                            if(p>=chart_colors.length)
                            {
                                p = 0;
                            }
                            question.chart_data[j].color = chart_colors[p++];
                        }
                        window['app_libs']['chart'].load(()=>{
                            window['drawChart'](question.chart_data, '#chartData-' + question.id);
                        });
                    }
                }
                if (obj_this.surveyDetails.progress_data) {
                    window['app_libs']['chart'].load(()=>{
                    window['drawChart'](obj_this.surveyDetails.progress_data, '#progress-chart');
                    });
                }
            }, 800)
        };
        const failure_cb = function(error) {
            // console.log(error)
            // obj_this.router.navigate(['/survey/' + obj_this.route.snapshot.params.id]);
        };
        let args = {
            app: 'survey',
            model: 'Survey',
            method: 'get_results'
        }
        let final_input_data = {
            params: input_data,
            args: args
        };
        obj_this.httpService.get(final_input_data, success_cb, failure_cb);
    }

    ngDoCheck() {

        // console.log(667, this.data_loaded);
    }
    ngAfterViewInit() {

        // console.log(5522, this.data_loaded);
    }
    selected_respondents;
    get_answered_users(question_id, check_answer){
        let obj_this = this;
        // console.log(4554,question_id, check_answer, survey_id );
        // return
        const failure_cb = function(error) {
            console.log(error)
            // obj_this.router.navigate(['/survey/' + obj_this.route.snapshot.params.id]);
        };
        const success_cb = function(result) {
            console.log(result);
            obj_this.selected_respondents = result;
            let diaolog_options = {}
            diaolog_options = {
                selected_users: [],
                user_list: obj_this.selected_respondents,
                component: ViewmembersComponent,
                hide_checkbox : 1,
                extra_input: {title : 'Respondents'},
            };
            obj_this.socketService.user_selection_dialog(diaolog_options);
        }
        var on_modal_closed = function(result){
            console.log(result);
        }
        const input_data = {
            survey_id : obj_this.route.snapshot.params.id,
            question_id : question_id,
            check_answer : check_answer
        };
        let args = {
            app: 'survey',
            model: 'Survey',
            method: 'get_answered_users'
        }
        let final_input_data = {
            params: input_data,
            args: args
        };

        obj_this.httpService.get(final_input_data, success_cb, failure_cb);
    
    }
}
