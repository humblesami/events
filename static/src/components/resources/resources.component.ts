import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { SocketService } from 'src/app/socket.service';
import { RenameService } from 'src/app/rename.service';
declare var $:any;

@Component({
    selector: 'app-resources',
    styleUrls:['./resources.css'],
    templateUrl: 'resources.component.html'
})
export class ResourcesComponent implements OnInit {        
    heading = 'Resources';
    bread_crumb = {
		items: [],
		title: ''
    };
    httpService: HttpService;
    renameService: RenameService;

    constructor(private httpServ: HttpService,private renameSer: RenameService, private socketService: SocketService) {        
        
    }

    ngOnInit() {
        let obj_this = this;        
    }
}
