import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../app/http.service';
import { ActivatedRoute,Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SocketService } from 'src/app/socket.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { template } from '@angular/core/src/render3';
declare var $:any;

@Component({
    selector: 'app-profileedit',
    templateUrl: './profileedit.component.html',
	styleUrls: ['./profileedit.component.css'],
})
export class ProfileeditComponent implements OnInit {
	@Input() public edit_info;
    edit_mode = true;
	my_profile = false;
	selectedEthnicity = [];
	section = '';
	delete_confirm = false;
	user_id = undefined;
	selectedGender = [];
	selectedVeteran = [];
	selectedDisability = [];
	selectedTwoFactorAuth = [];
	selectedCommittees;
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
        private router: Router,
    private ss: SocketService,public activeModal: NgbActiveModal) {
        this.profile_data = {};
        this.profile_data.login = this.last_login;  
        this.socketService = this.ss;      
        // this.route.params.subscribe(params => this.get_data());
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
	input_date_format(){
		setTimeout(function(){
            $('input[type="date"]').each(function(i, el){
                // console.log($(el).position().top, 334);
                $(el).parent().css('position', 'relative');
                let prev_val = el.value;
                let overlay_style= 'position: absolute;';
                overlay_style += 'border: 0px;padding: 5px;margin: 3px 0px 0px 5px;';
                let overlay = $('<input class="date-overlay" style="'+overlay_style+'" value="'+prev_val+'" />');

                overlay.css({left:$(el).position().left, top:$(el).position().top});                
                overlay.focus(function(){
                    $(el).focus();
                });
                overlay.blur(function(e){
                    if(prev_val != overlay.val() && (overlay.val().length == 10 || overlay.val().length == 0))
                    {                        
                        prev_val = overlay.val();
                        el.value = prev_val;
                    }
                });

                $(el).parent().append(overlay);
                $(el).change(function() {
                    if(!el.value)
                    {
                        overlay.val('');
                        return;
                    }
                    let st_date = window['dt_functions'].standardDate(el.value);
                    prev_val = st_date;
                    overlay.val(st_date);
                })
            })            
        }, 100);
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
				obj_this.profile_data['resume'] = fileReader.result;
			}
			obj_this.resumeUpload()
		};
		fileReader.onerror = function (error) {
			console.log('Error: ', error);
		};
	}

	bio_html = undefined;
	get_data() {
		const obj_this = this;		
		let id = obj_this.edit_info.user_id;
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
			if (result.profile.ethnicity.id)
			{
				obj_this.selectedEthnicity = result.profile.ethnicity;
			}
			if (result.profile.veteran.id)
			{
				obj_this.selectedVeteran = result.profile.veteran;
			}
			if (result.profile.gender.id)
			{
				obj_this.selectedGender = result.profile.gender;
			}
			if (result.profile.disability.id)
			{
				obj_this.selectedDisability = result.profile.disability;
			}
			if (result.profile.committees)
			{
				obj_this.selectedCommittees = result.profile.committees;
			}
			if (result.profile.two_factor_auth.id)
			{
				obj_this.selectedTwoFactorAuth = result.profile.two_factor_auth;
			}
			if (result.profile.mail_to_assistant)
			{
				$('#mail-to-assistant').prop('checked', true)
			}
			else
			{
				$('#mail-to-assistant').prop('checked', false)
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
			obj_this.input_date_format();
		};
		const failure_cb = function (error) {
		};
		this.httpService.get(input_data, success_cb, failure_cb);
	}

	mail_to_assistant_change(value)
	{
		let obj_this = this;
		let mail_to_assistant = $('#mail-to-assistant').prop('checked');
		obj_this.modified_profile_data['mail_to_assistant'] = mail_to_assistant;
	}

	update_image()
	{
		$('.update_image:first').click();
	}

	resumeUpload() {
		this.submitted = true;
		const obj_this = this;
		const form_data = obj_this.modified_profile_data;
		const input_data = {};
		for (const key in form_data) {
			if(obj_this.modified_profile_data[key] != '')
				input_data[key] = obj_this.modified_profile_data[key];			
		}
		input_data['user_id'] = obj_this.route.snapshot.params.id;
        let args = {
            app: 'meetings',
            model: 'Profile',
			method: 'update_profile',
			post: 1,
        }
        let final_input_data = {
            params: input_data,
            args: args
        };
		this.httpService.post(final_input_data,
			(data: any) => {
				obj_this.get_data();
			},
			(error) => {
                const x = document.getElementById('slot-select-error');
                if(x)
                {
                    x.className = 'snackbar-error show';
                    setTimeout(function () {
                        x.className = x.className.replace('show', '');
                    }, 3000);   
                }
				
            });
    }
	onSubmit() {
		this.submitted = true;
		const obj_this = this;
		const form_data = obj_this.modified_profile_data;
		const input_data = {};
		for (const key in form_data) {
			if(obj_this.profile_data[key] || obj_this.modified_profile_data[key])
            {
                input_data[key] = obj_this.modified_profile_data[key];
            }
		}
		if (input_data['resume'] == 'removed')
		{
			input_data['resume'] = null;
		}
		input_data['user_id'] = obj_this.user_id;
        let args = {
            app: 'meetings',
            model: 'Profile',
			method: 'update_profile',
			post: 1,
        }
        let final_input_data = {
            params: input_data,
            args: args
        };
		this.httpService.post(final_input_data,
			(data: any) => {
                let obj_this = this;
                
                if(obj_this.my_profile)
                {
                    let profile = data.profile_data;
                    var user_cookie = localStorage.getItem('user');                
                    let cuser = undefined;
                    if(user_cookie)
                    {
                        cuser = JSON.parse(user_cookie);
                    }
                    if (cuser)
                    {
                        profile.token = cuser.token;
                        let value = JSON.stringify(profile);
                        localStorage.setItem('user', value);
                        obj_this.socketService.user_data.groups = profile.groups;
                        obj_this.socketService.user_data.name = profile.name;
                        obj_this.socketService.user_data.photo = profile.photo;
                        obj_this.socketService.user_photo = obj_this.base_url + profile.photo;
                    }
                }				
                
				// obj_this.router.navigate(['/my-profile']);
				obj_this.activeModal.close('saved')
			},
			(error) => {
                const x = document.getElementById('slot-select-error');
                if(x)
                {
                    x.className = 'snackbar-error show';
                    setTimeout(function () {
                        x.className = x.className.replace('show', '');
                    }, 3000);   
                }				
            });
	}
	delete_confirmed()
	{
		this.modified_profile_data['resume'] = 'removed';
		this.profile_data['resume'] = null;
		this.delete_confirm = false;
	}
	delete_cancelled()
	{
		this.delete_confirm = false;
	}
	
	add_resume(){
		$('.add_resume').trigger('click');
	}
	edit_resume(e){
		let obj_this = this;
		if ($(e).hasClass('fa-trash-alt'))
		{
			obj_this.delete_confirm = true;
			return;
		}
		$('.edit_resume').trigger('click');
    }
    onCancel(){
        this.activeModal.close('Close click');
    }


    init_sign()
    {
        let obj_this = this;
        let sign_config = {
            signature_data: obj_this.profile_data.signature_data,            
            on_signed: function(signature_data) {
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
	setEthnicity()
	{
        if(!this.selectedEthnicity)
        {
            this.modified_profile_data['ethnicity'] = null;
        }
        else
        {
            this.modified_profile_data['ethnicity'] = this.selectedEthnicity['id'];
        }
	}
	setGender()
	{
        if(!this.selectedGender)
        {
            this.modified_profile_data['gender'] = null;
        }
		else{
            this.modified_profile_data['gender'] = this.selectedGender['id'];
        }
	}
	setVeteran()
	{
        if(!this.selectedVeteran)
        {
            this.modified_profile_data['veteran'] = null;
        }
		else{
            this.modified_profile_data['veteran'] = this.selectedVeteran['id'];
        }
	}
	setDisability()
	{
        if(!this.selectedDisability)
        {
            this.modified_profile_data['disability'] = null;
        }
		else{
            this.modified_profile_data['disability'] = this.selectedDisability['id'];
        }
	}
	setCommittees()
	{
        if (this.selectedCommittees.length)
        {
            this.modified_profile_data['committees'] = this.selectedCommittees;
        }
        else
        {
            this.modified_profile_data['committees'] = 'removed_all';
        }
	}
	setTowFactorAuth()
	{
		if (this.selectedTwoFactorAuth)
        {
            this.modified_profile_data['two_factor_auth'] = this.selectedTwoFactorAuth['id'];
        }
        else
        {
            this.modified_profile_data['two_factor_auth'] = null;
        }
	}

	
	ngOnInit(){
		if (this.edit_info)
		{
			this.section = this.edit_info.section;
			this.user_id = this.edit_info.user_id;
			this.get_data()
		}		
	}	
}