import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/socket.service';
// declare var $:any;

@Component({
    selector: 'app-resourcedetails',
    styleUrls:['./resourcedetails.css'],
    templateUrl: 'resourcedetails.component.html'
})

export class ResourceDetailsComponent implements OnInit {
    folder_id = '';
    parents = [];
    folder : any;
    reloading = true;
    search_options = {
        search_type : 'folders',
        recursive : false,
        search_kw : '',
    }
    cookie_key = 'resources/root/search';
    constructor(private route: ActivatedRoute, public socketService: SocketService){
        let obj_this = this;
        let is_not_root = obj_this.route.snapshot.params.id;
        if(is_not_root)
        {
            obj_this.cookie_key = 'resources/inner/search';
        }
        let search_options_cookie = localStorage.getItem(obj_this.cookie_key);
        if(search_options_cookie)
        {
            this.search_options = JSON.parse(search_options_cookie);
        }
        else{
            if(is_not_root)
            {
                this.search_options.search_type = 'all';
            }
        }
        obj_this.search_options.search_kw = '';
        // console.log(obj_this.search_options, obj_this.cookie_key);
        obj_this.route.params.subscribe(params => {            
            obj_this.reloading = true;
            setTimeout(function(){
                // console.log(434);
                obj_this.folder_id = obj_this.route.snapshot.params.id;
                obj_this.reloading = false;
            }, 20);
        });        
    }
    data_loaded(data){
        this.folder = data;
        this.parents = data.parents;
    }

    search(search_type=undefined){
        let obj_this = this;
        obj_this.reloading = true;
        if(search_type)
        {
            if(search_type == 'recursive')
            {
                obj_this.search_options.recursive = !obj_this.search_options.recursive;
            }
            else{
                if(search_type == 'files' && obj_this.cookie_key.indexOf('root') > -1)
                {
                    obj_this.search_options.recursive = true;
                }
                obj_this.search_options.search_type = search_type;
            }
            if(!obj_this.search_options.recursive)
            {
                obj_this.search_options.recursive = undefined;
            }
            localStorage.setItem(obj_this.cookie_key, JSON.stringify(obj_this.search_options));
        }
        // console.log(obj_this.search_options, 455);
        setTimeout(function(){
            obj_this.folder_id = obj_this.route.snapshot.params.id;
            obj_this.reloading = false;
        }, 20);
    }

    
    ngOnInit() {
        let obj_this = this;
        // $('.search_options>input[values="'+obj_this.search_options.search_type+'"]').prop('checked', true);
        obj_this.folder_id = obj_this.route.snapshot.params.id;
        obj_this.search();
    }
}
