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
    httpService: HttpService;
    socketService: SocketService;    

    constructor(private httpServ: HttpService,
        private ss: SocketService, private route: ActivatedRoute) {
        this.httpService = httpServ;
        this.socketService = ss;
        this.route.params.subscribe(params => this.get_list(1));        
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
                obj_this.folder = undefined;                
                setTimeout(function(){
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
