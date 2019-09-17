import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { SocketService } from 'src/app/socket.service';
declare var $:any;

@Component({
    templateUrl: 'resources.component.html'
})
export class ResourcesComponent implements OnInit {
    records = [];
    no_resource = false;
    new_folder = undefined;
    parent_folder = undefined;
    modified_folder_data =undefined;
    heading = 'Resources';
    bread_crumb = {
		items: [],
		title: ''
    };
    httpService: HttpService;
    constructor(private httpServ: HttpService, private socketService: SocketService) {        
        this.httpService = httpServ;
    }

    get_list()
    {
        let obj_this = this;
        let args = {
            app: 'resources',
            model: 'Folder',
            method: 'get_records'
        }			
        let final_input_data = {
            params: {},
            args: args
        };
        obj_this.httpService.get(final_input_data,
        (result: any) => {
            obj_this.records = result.records;            
            obj_this.records && obj_this.records.length > 0 ? obj_this.no_resource = false : obj_this.no_resource = true;            
        },null);
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
                        parent_folder : null,
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

    add_folder_create_button(){
        if($('#create_new_folder').length || !this.socketService.admin_mode)
        {
            return;
        }
        let obj_this = this;
        var create_button = $('<button class="btn btn-primary" id="create_new_folder">Create Folder</button>');        
        create_button.click(function(){            
            obj_this.create_folder_popup_config();
        });
        setTimeout(function(){
            $('.breadcrumbSection .edit-buttons').append(create_button);
        },10);        
    }

    ngOnInit() {
        let obj_this = this;
        this.get_list();
        setTimeout(function(){
            obj_this.add_folder_create_button();
        }, 13);

        obj_this.socketService.call_backs_on_mode_changed['handle_folder_create'] = function(){
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
