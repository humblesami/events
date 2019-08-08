import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../app/http.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { SocketService } from 'src/app/socket.service';
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
    }

    ngOnInit() {
        const obj_this = this;
        const input_data = {
            survey_id: obj_this.route.snapshot.params.id
        };
        const success_cb = function(result) {
            obj_this.surveyDetails = result;
            console.log(result)
            setTimeout(function() {
                for (let question in obj_this.surveyDetails.questions) {
                    if (obj_this.surveyDetails.questions[question].chart_data.length && obj_this.surveyDetails.questions[question].user_answers.length > 0) {
                        window['drawChart'](obj_this.surveyDetails.questions[question].chart_data,
                            '#chartData-' + obj_this.surveyDetails.questions[question].id);
                    }
                }
                if (obj_this.surveyDetails.progress_data) {
                    // window['drawChart'](obj_this.surveyDetails.progress_data, '#progress-chart');
                }
            }, 800)
        };
        const failure_cb = function(error) {
            obj_this.router.navigate(['/survey/' + obj_this.route.snapshot.params.id]);
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
}