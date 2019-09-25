import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { SocketService } from 'src/app/socket.service';
import { RenameService } from 'src/app/rename.service';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
    selector: 'app-folders',
    templateUrl: './folders.component.html',
    styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {
    @Input() search_kw = '';
    @Input() search_type = '';
    @Input() recursive = false;
    @Input() parent_id: number;
    parent;
    records = [];
    message = '';
    parents = [];
    no_resource = false;
    new_folder = undefined;
    show_renamer_button = false;
    modified_folder_data =undefined;
    
    heading = 'Resources';
    bread_crumb = {
        items: [],
        title: ''
    };
    search_kw1 = '';
    httpService: HttpService;
    userService: UserService;
    renameService: RenameService;

    constructor(private httpServ: HttpService,
        private renameSer: RenameService, 
        private userServ: UserService,        
        private route: ActivatedRoute,
        private socketService: SocketService) {        
            let obj_this = this;
            obj_this.httpService = httpServ;
            obj_this.userService = userServ;
            obj_this.renameService = renameSer;            
    }

    delete_folder(evn, folder_id, folder_total_files)
    {
        evn.stopPropagation();
        evn.preventDefault();
        let obj_this = this;
        if(folder_total_files){
            obj_this.message = 'Are you sure to delete? This folder contains '+ folder_total_files + ' file(s).';
        }else{
            obj_this.message = 'Are you sure to delete?';
        }

        window['bootbox'].confirm(obj_this.message , function(dr){
        if(!dr)
            {
                return;
            }            
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

            obj_this.httpService.get(final_input, (data)=>{                        
                obj_this.records =  obj_this.records.filter((el)=>{
                    return folder_id != el.id;
                });
            }, null);
        });
    }
    
    get_list()
    {
        let obj_this = this;
        let args = {
            app: 'resources',
            model: 'Folder',
            method: 'search_folders'
        }			
        let final_input_data = {
            params: {
                parent_id: obj_this.parent_id,
                recursive: 1,
                kw: obj_this.search_kw
            },
            args: args
        };
        // console.log(final_input_data.params, 333);
        obj_this.httpService.get(final_input_data,
        (result: any) => {
            obj_this.on_result(result);
        },null);
    }

    @Output() data_loaded: EventEmitter<any> = new EventEmitter();
    on_result(result){
        let obj_this = this;
        obj_this.records = result.folders;
        if(obj_this.parent_id)
        {
            obj_this.data_loaded.emit(result);
        }
        obj_this.records && obj_this.records.length > 0 ? obj_this.no_resource = false : obj_this.no_resource = true;
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
                        parent_id : obj_this.parent_id,
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
                        obj_this.records.push(data);
                    },function(err){
                        $('#folder-error').show()
                        $('#folder-error').text(err);
                    });
                }
            },
            hide:1,
        }
        window['init_popup'](config);
    }    
    
    load_create_folder_popup(){        
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
        $('#signModal').modal('show');
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
        var edit_buttons = $('<div class="edit-buttons"></div>');        
        $('.breadcrumbSection:first').append(edit_buttons);
        edit_buttons.append(create_button);
    }

    ngOnInit() {
        let obj_this = this;
        if(obj_this.search_type == 'files')
        {
            return;
        }
        obj_this.add_folder_create_button();
        if(this.parent_id)
        {
            this.parent = {
                app:'resources',
                model:'Folder',
                id: this.parent_id
            }
        }
        this.get_list();
        obj_this.socketService.call_backs_on_mode_changed['handle_folder_create'] = function(){
            if(obj_this.socketService.admin_mode)
            {
                $('#create_new_folder').remove();
                obj_this.add_folder_create_button();
            }
            else{
                $('#create_new_folder').remove();
            }
        }
    }
}