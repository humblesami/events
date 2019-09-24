﻿import { Component, OnInit, Input } from '@angular/core';
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

    constructor(public socketService: SocketService) {        
        
    }

    ngOnInit() {
        
    }
}
