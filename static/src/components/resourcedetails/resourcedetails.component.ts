import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
    selector: 'app-resourcedetails',
    styleUrls:['./resourcedetails.css'],
    templateUrl: 'resourcedetails.component.html'
})

export class ResourceDetailsComponent implements OnInit {    
    search_kw: '';
    folder_id = '';
    parents = [];
    folder : any;
    reloading = false;
    @Input() show_files: any;
    constructor(private route: ActivatedRoute, public socketService: SocketService){
        let obj_this = this;
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

    last_kw = '';
    search(ev){
        let obj_this = this;
        if(ev.keyCode != 13)
        {
            if(this.last_kw == ev.target.value)
            {
                return;
            }
        }
        this.last_kw = ev.target.value;
        obj_this.reloading = true;
        setTimeout(function(){
            obj_this.folder_id = obj_this.route.snapshot.params.id;
            obj_this.reloading = false;
        }, 20);
    }

    @Input() search_type = '';
    ngOnInit() {
        let obj_this = this;
        obj_this.folder_id = obj_this.route.snapshot.params.id;
    }
}
