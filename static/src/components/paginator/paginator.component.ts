import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../app/http.service';
declare var $: any;

@Component({
    selector: 'app-paginator',
    styleUrls:['./paginator.css'],
    templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {
    @Input() offset: number;
    @Input() count: number
    @Input() total: number;
    @Output() changedOffset: EventEmitter<number> =   new EventEmitter();
    @Output() changedLimit: EventEmitter<number> = new EventEmitter()
    limit = 2;
    limit_options = [
        2,
        10,
        50,
        100
    ]
    httpService:any

    constructor(private httpServ : HttpService) {
        this.httpService = httpServ;
    }

    change_page(change: number){
        this.offset = this.offset + change * this.limit;
        console.log(this.offset, change, this.limit)
        if(this.offset < 0)
        {
            this.offset = 0;
        }
        if(this.offset + this.limit > this.total)
        {
            return;
        }
        if(isNaN(change))
        {
            change = 3;
        }
        this.changedOffset.emit(this.offset);
    }
    change_limit(e){
        this.limit = $(e.target).val()
    }
    ngOnInit() {
    }

}
