import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../app/http.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SocketService } from 'src/app/socket.service';
declare var $:any;

@Component({
	styleUrls:['./profiledetails.css'],
	templateUrl: 'profiledetails.component.html'
})
export class ProfileDetailsComponent implements OnInit {
	edit_mode = false;
	my_profile = false;
	last_login = {
		last: {
			login_time: '',
			platform: '',
			browser: '',
			ip: '',
			location: ''
		},
		second_last: {
			login_time: '',
			platform: '',
			browser: '',
			ip: '',
			location: ''
		}
	};
	profile_data = undefined;
	choice_fields = {};
	modified_profile_data = {};
	submitted = false;
	admin_info = false;
	next = '';
	prev = '';
	base_url = '';
	type = '';
	type_breadCrumb = '';
	socketService : SocketService;

	constructor(private httpService: HttpService, private formBuilder: FormBuilder, 
        private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private ss: SocketService) {
        this.edit_mode = false;
        this.profile_data = {};
        this.profile_data.login = this.last_login;  
        this.socketService = this.ss;      
        this.route.params.subscribe(params => this.get_data());        
    }
    on_file_drop(container, file_object){
        let obj_this = this;
        let cls = $(container).attr('holdertype');        
        if(obj_this.profile_data[cls])
        {
            obj_this.profile_data[cls] = file_object.data;
            obj_this.modified_profile_data[cls] = file_object.data;
        }
    }

	addFile(event, filter){
		const obj_this = this;
		var element = event.target;
		// console.log(element)
		var file = element.files[0];
		var fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = function () {
			if(filter === 'profile'){
				obj_this.profile_data['image'] = fileReader.result;
				obj_this.modified_profile_data['image'] = fileReader.result;
			}
			else if(filter === 'admin'){
				obj_this.profile_data['admin_image'] = fileReader.result;
				obj_this.modified_profile_data['admin_image'] = fileReader.result;
			}
			else{
				obj_this.modified_profile_data['resume'] = fileReader.result;
			}
		};
		fileReader.onerror = function (error) {
			console.log('Error: ', error);
		};
	}

	bio_html = undefined;
	get_data() {
		const obj_this = this;
        let id = this.route.snapshot.params.id;
        let input_data = undefined;
        if (id == obj_this.socketService.user_data.id || id == undefined) {
			obj_this.my_profile = true;	
		}
		input_data =
		{ 
			id: id,
			type:this.type
		};
		let args = {
            app: 'meetings',
            model: 'Profile',
            method: 'get_details'
        }			
        input_data = {
            params: input_data,
            args: args
        }; 
			
		const success_cb = function (result) {	
			obj_this.base_url = window['site_config'].server_base_url;		
			if(result.profile.admin_email || result.profile.admin_cell_phone
				|| result.profile.admin_fax || result.profile.admin_work_phone
				|| result.profile.admin_image || result.profile.admin_first_name
				|| result.profile.admin_last_name || result.profile.admin_nick_name
			)
			{
				obj_this.admin_info = true;
            }
            // console.log(result);
            if(result.choice_fields)
            {
                obj_this.choice_fields = result.choice_fields;            
            }
            
			for(var key in result.profile){
				obj_this.profile_data[key] = result.profile[key];
			}
			if(result.profile.image)
            {
                result.profile.image = obj_this.base_url + result.profile.image;
			}
			if(result.profile.bio)
			{
				obj_this.bio_html = obj_this.sanitizer.bypassSecurityTrustHtml(result.profile.bio);				
			}
			if (!obj_this.type_breadCrumb)
			{
				obj_this.type = result.profile.group.toLowerCase()
				obj_this.type_breadCrumb = obj_this.type;
				if (obj_this.type_breadCrumb != 'staff')
				{
					obj_this.type_breadCrumb = obj_this.type_breadCrumb +'s';
				}
			}
		};
		const failure_cb = function (error) {
		};
		this.httpService.get(input_data, success_cb, failure_cb);
    }
    
    init_sign()
    {
        let obj_this = this;
        let sign_config = {
            signature_data: obj_this.profile_data.signature_data,            
            on_signed: function(signature_data){
                obj_this.profile_data.signature_data = signature_data;
                obj_this.httpService.post({
                    args: {
                        app: 'meetings',
                        model: 'Profile',
                        method: 'save_signature',
                        post: 1,
                    },
                    params: {
                        signature_data: signature_data
                    }
                }, null, function(){

                });
            }            
        }
        window['init_sign'](sign_config);
    }

	ngOnInit(){

	}

	ngOnChanges(){
        console.log("ngOnChanges")
	}
	ngDoCheck(){
		
	}
	
}
