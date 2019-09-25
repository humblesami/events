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
    parents = [];
    httpService: HttpService;
    socketService: SocketService;    

    constructor(private httpServ: HttpService, private zone:NgZone,
        private ss: SocketService, private route: ActivatedRoute) {
        this.httpService = httpServ;
        this.socketService = ss;        
        let obj_this = this;
        obj_this.route.params.subscribe(params => {            
            obj_this.get_list()
        });        
    }

    search_kw: '';
    str_files = '';
    str_folders = '';

    get_list(){
        var obj_this = this;
        let params = {};
        var parent_id = undefined;
        parent_id = obj_this.route.snapshot.params.id;
        if (parent_id)
        {
            params['parent_id'] = parent_id
        }
        // params['resursive'] = 1;

        let args = {
            app: 'resources',
            model: 'Folder',
            method: 'search_file_folders'
        }
        let final_input_data = {
            params: params,
            args: args
        };
        // console.log(params, 222);
        obj_this.httpService.get(final_input_data,
            (result: any) => {
                obj_this.folder = undefined;
                obj_this.str_files = undefined;
                obj_this.str_files = undefined;
                setTimeout(function(){                    
                    if(parent_id || obj_this.search_kw)
                    {
                        obj_this.str_files = JSON.stringify(result.files);
                    }
                    obj_this.str_folders = JSON.stringify(result.folders);                    
                    obj_this.folder = result;
                    setTimeout(function(){
                        if($('#create_new_folder').length == 0)
                        {
                            var create_button = $('#create_new_folder');                    
                            $('.breadcrumbSection .edit-buttons').append(create_button);
                        }
                    }, 20);
                }, 20);
                const parents = result.parents;
                if (parents && parents.length > 0) {
                    parents.reverse();
                }
                obj_this.parents = parents;
        }, (error: any) => {
            console.log(error);
        });
    }    


    ngOnInit() {   
        let obj_this = this;
    }
}
