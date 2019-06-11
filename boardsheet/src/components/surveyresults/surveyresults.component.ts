import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../app/http.service';
import {ActivatedRoute} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-surveyresults',
  templateUrl: './surveyresults.component.html',
  styleUrls: ['./surveyresults.css']
})
export class SurveyresultsComponent implements OnInit {
  surveyDetails: any;
  data_loaded = false;

  constructor(private httpService: HttpService, private route: ActivatedRoute, ) { }

  ngOnInit() {
    const obj_this = this;
    const input_data = {survey_id : obj_this.route.snapshot.params.id};
    const success_cb = function (result) {
      obj_this.surveyDetails = result;
      setTimeout(function(){
        for(let question in obj_this.surveyDetails.questions)
        {
          if (obj_this.surveyDetails.questions[question].chart_data.length > 0){
            window['drawChart'](obj_this.surveyDetails.questions[question].chart_data, 
              '#chartData-'+obj_this.surveyDetails.questions[question].id);
          }
        }
        if (obj_this.surveyDetails.progress_data){
          window['drawChart'](obj_this.surveyDetails.progress_data, '#progress-chart');
        }
      }, 100)
    };
    const failure_cb = function (error) {
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

  ngDoCheck(){

    // console.log(667, this.data_loaded);
  }
  ngAfterViewInit(){

    // console.log(5522, this.data_loaded);
  }
}