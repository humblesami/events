import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../../app/http.service'
declare var $:any;

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html'
})
export class ForgotpasswordComponent implements OnInit {
	loading = false;
	sent = false;
	error: string;
	email = '';
	valid = false;
	first = true;

	constructor(
		private httpService: HttpService) {
	}

	ngOnInit() {
        $(document).ready(function(){
            setTimeout(function(){
                window['functions'].hideLoader('force');
            },100)
        });
    }

	email_validation(){
		var obj_this = this;
		obj_this.first = false;
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(re.test(String(obj_this.email).toLowerCase())){
			obj_this.valid = true;
		}
		else{
			obj_this.valid = false;
		}
	}

	onSubmit() {
		let obj_this = this;		
		var success_cb = function (result) {
            obj_this.sent = true;
		};
		var failure_cb = function (error) {
            obj_this.error = error;            
        };
        let args = {
            app: 'authsignup',
            model: 'AuthUser',
            method: 'reset_password'
        }
		let input_data = {
            params: {email: obj_this.email,  },
			args: args,
        }; 
        this.httpService.post_public(input_data, success_cb, failure_cb);        
	}
}
