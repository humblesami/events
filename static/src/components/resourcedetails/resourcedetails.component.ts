import { Component, OnInit, NgZone } from '@angular/core';
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


    ngOnInit() {   
        let obj_this = this;
    }
}
