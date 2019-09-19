﻿import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../app/http.service';
import { SocketService } from 'src/app/socket.service';
import { RenameService } from 'src/app/rename.service';
declare var $:any;

@Component({
    styleUrls:['./resourcedetails.css'],
    templateUrl: 'resourcedetails.component.html'
})

export class ResourceDetailsComponent implements OnInit {
    folder: any;
    root = true;
    no_folders = false;
    new_folder = undefined;
    parent_folder = undefined;    
    modified_folder_data =undefined;
    no_files = false;
    httpService: HttpService;
    socketService: SocketService;
    renameService: RenameService;
    selectedUsers = [];
    users = [];
    selected_docs = [];

    constructor(private httpServ: HttpService,private renameSer: RenameService, 
        private ss: SocketService, private route: ActivatedRoute, public zone: NgZone) {
        this.httpService = httpServ;
        this.socketService = ss;
        this.route.params.subscribe(params => this.get_list(1));
        this.renameService =renameSer;
    }

    delete_folder(evn, folder_id)
    {
        evn.stopPropagation();
        evn.preventDefault();
        let obj_this = this;        
        let input_data = {
            folder_id: folder_id,
        }
        let args = {
            app: 'resources',
            model: 'Folder',
            method: 'delete_folder'
        }
        let final_input = {
            params: input_data,
            args: args
        }

        obj_this.httpServ.get(final_input, (data)=>{                        
            obj_this.folder.sub_folders =  obj_this.folder.sub_folders.filter((el)=>{
                return folder_id != el.id;
            });
        }, null);
    }

    get_list(on_init=null){
        var obj_this = this;
        const input_data = { id: this.route.snapshot.params.id };
        let args = {
            app: 'resources',
            model: 'Folder',
            method: 'get_details'
        }

        let final_input_data = {
            params: input_data,
            args: args
        };
        obj_this.httpService.get(final_input_data,
            (result: any) => {
                obj_this.root = !(result.hasOwnProperty('parent_id'));
                obj_this.folder = undefined;                
                setTimeout(function(){
                    obj_this.folder = result;                    
                }, 50);
                if(on_init)
                {
                    setTimeout(function(){
                        obj_this.add_folder_create_button();
                    },100);
                }
                const parents = result.parents;
                if (parents && parents.length > 0) {
                    parents.reverse();
                    parents[parents.length - 1]['is_last'] = 1888;
                }
        }, (error: any) => {
            console.log(error);
            //alert(error);
        });
    }    

    create_folder_popup_config()
	{
		let obj_this = this;
		let config = {
			on_load: function(){
				obj_this.load_create_folder_popup();
			},
			on_save:function(){						
                obj_this.new_folder = $('#new_folder').val();
				if(!obj_this.new_folder)
				{
					obj_this.new_folder = [];
					$('#folder-error').show();
				}
				else
				{
					let input_data = {
                        name: obj_this.new_folder,
                        parent_id : obj_this.folder.id
					}
					let args = {
						app: 'resources',
						model: 'Folder',
						method: 'create_new'
					}
					let final_input_data = {
						params: input_data,
						args: args
					}
					obj_this.httpService.get(final_input_data, function(data){
                        $('#folder-error').hide();
                        obj_this.get_list();
						$('#signModal').modal('hide');
					},function(err){
						$('#folder-error').show()
						$('#folder-error').text(err);
					});
				}
			},
			on_close: function(){
				
			}
		}
		window['init_popup'](config);
    }    

    add_folder_create_button(){
        let obj_this = this;
        if($('#create_new_folder').length || !this.socketService.admin_mode)
        {
            return;
        }
        var create_button = $('<button class="btn btn-primary" id="create_new_folder">Create Folder</button>');        
        create_button.click(function(){
            obj_this.create_folder_popup_config();
        });
        setTimeout(function(){
            $('.breadcrumbSection .edit-buttons').append(create_button);
        },10);
    }

    load_create_folder_popup(){
        setTimeout(function(){
            $('#signModal .modal-body').html(`
                <input type="text" name="new_folder" id="new_folder"
                placeholder="Please Enter Folder Name"
                class="form-control new_folder" required/>
                <small style="display: none;" id="folder-error" class="text-danger">
                    Enter a Valider Name
                </small>
            `);
            $('#new_folder').keyup(function(e){
                if(e.keyCode == 13)
                {
                    $('#save-sig').click();
                }
                if(!$(this).val())
                {
                    $('#folder-error').show()
                    $('#folder-error').text('Enter Valid Name.');
                }
                else
                {
                    $('#folder-error').hide();
                }
            });
        }, 100)        
    }

    saveusers(){
        let obj_this = this;        
        var user_ids = [];
        var new_file_ids = [];
        for(var file of obj_this.selected_docs)
        {
            new_file_ids.push(file.id);
        }
        for(var user of obj_this.selectedUsers)
        {
            user_ids.push(user.id);
        }
        // console.log(user_ids,new_file_ids);
        let args = {
            app: 'resources',
            model: 'Folder',
            method: 'define_access'
        }
        let final_input_data = {
            params: {
                folder_ids : new_file_ids,
                user_ids : user_ids
            },
            args: args
        };
        obj_this.httpService.get(final_input_data,
        (result: any) => {
            console.log(result);           
        },null);
        $('#select_user_forlder').modal('hide');
    }

    closemodel(){
        $('#select_user_forlder').modal('hide');
        this.selectedUsers = [];
        this.selected_docs  = [];
    }

    openmodel(docs){
        let obj_this = this;
        obj_this.selectedUsers = [];
        obj_this.selected_docs  = [];

        for(var doc of docs)
        {
            obj_this.selected_docs.push(doc);
        }
        if(docs.length == 1)
        {
            let args = {
                app: 'resources',
                model: 'Folder',
                method: 'get_resource_audience'
            }
            let final_input_data = {
                params: {
                    folder_id: docs[0].id,
                    parent_id: obj_this.folder.id
                },
                args: args
            };
            obj_this.httpService.get(final_input_data,
            (result: any) => {                
                obj_this.users = result.valid;
                obj_this.selectedUsers = result.selected;
            },null);                
        }
        $('#select_user_forlder').modal('show');
    }


    ngOnInit() {   
        let obj_this = this;
        this.socketService.call_backs_on_mode_changed['handle_folder_create'] = function(){            
            if(obj_this.socketService.admin_mode)
            {
                obj_this.add_folder_create_button();
            }
            else{
                $('#create_new_folder').remove();
            }
        }
    }
}
