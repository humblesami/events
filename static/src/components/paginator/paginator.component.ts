import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../app/http.service';

@Component({
    selector: 'app-paginator',
    styleUrls:['./paginator.css'],
    templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {
    @Input() off_set: number;
    @Input() total_records: number;
    @Output() changedOffset: EventEmitter<number> =   new EventEmitter();
    @Output() changedLimit: EventEmitter<number> = new EventEmitter()
    limit = 10;
    count = 0;
    limit_options = [
        10,
        20,
        50,
        100
    ]
    httpService:any

    constructor(private httpServ : HttpService) {
        this.httpService = httpServ;
    }

    change_page(change){
        if(isNaN(change))
        {
            change = 3;
        }
        this.off_set += Number(change);
        this.off_set < 0 ? this.off_set = 0 : this.off_set;
        this.httpService.fetch_paged_data(Number(this.off_set), Number(this.limit));
        this.changedOffset.emit(Number(this.off_set));
    }
    change_limit() {
        this.httpService.fetch_paged_data(Number(this.off_set), Number(this.limit));
        this.changedLimit.emit(Number(this.limit))
    }

    ngOnInit() {
    }

}
