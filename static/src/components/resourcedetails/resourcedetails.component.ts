import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../app/http.service';
import { SocketService } from 'src/app/socket.service';
declare var $:any;

@Component({
    selector: 'app-resourcedetails',
    styleUrls:['./resourcedetails.css'],
    templateUrl: 'resourcedetails.component.html'
})

export class ResourceDetailsComponent implements OnInit {
    folder: any;
    httpService: HttpService;
    socketService: SocketService;    

    constructor(private httpServ: HttpService,
        private ss: SocketService, private route: ActivatedRoute) {
        this.httpService = httpServ;
        this.socketService = ss;
        this.route.params.subscribe(params => this.get_list(1));        
    }

    search_kw: '';
    str_files = '';
    str_folders = '';

    get_list(on_init=null){
        var obj_this = this;
        let params = {};
        if (obj_this.folder){
            // params['parent'] = obj_this.folder;
            params['parent_id'] = obj_this.folder.id;
        }
        else{
            var parent_id = obj_this.route.snapshot.params.id;
            if (parent_id)
            {
                params['parent_id'] = parent_id
            }
        }
        // params['resursive'] = 1;

        let args = {
            app: 'resources',
            model: 'Folder',
            method: 'get_file_folders'
        }
        let final_input_data = {
            params: params,
            args: args
        };
        obj_this.httpService.get(final_input_data,
            (result: any) => {
                obj_this.folder = undefined;
                setTimeout(function(){
                    obj_this.str_files = JSON.stringify(result.files);
                    obj_this.str_folders = JSON.stringify(result.folders);
                    obj_this.folder = result;
                    setTimeout(function(){
                        var create_button = $('#create_new_folder');
                        $('.breadcrumbSection .edit-buttons').append(create_button);
                    },51);
                }, 10);
                const parents = result.parents;
                if (parents && parents.length > 0) {
                    parents.reverse();
                }
        }, (error: any) => {
            console.log(error);
        });
    }    


    ngOnInit() {   
        let obj_this = this;
    }
}
