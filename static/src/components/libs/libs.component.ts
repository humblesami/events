import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-libs',
    templateUrl: './libs.component.html',
    styleUrls: ['./libs.component.css']
})
export class LibsComponent implements OnInit {
    constructor() {

    }
    ngOnInit() {
        window['app_libs'].jquery_ui.load();
    }
}
