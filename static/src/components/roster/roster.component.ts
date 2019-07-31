import { Component, OnInit, Input } from '@angular/core';
@Component({
    selector: 'app-roster',
    templateUrl: './roster.component.html',
    styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {
    @Input() meeting_id: number;
    constructor() { }
    ngOnInit() {
        console.log('meting id', this.meeting_id)
    }
}
