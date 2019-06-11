import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../app/http.service';

@Component({
    selector: 'app-paginator',
    styleUrls:['./paginator.css'],
    templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {

    off_set = 0;
    limit = 10;
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
        this.off_set += Number(change);
        this.off_set < 0 ? this.off_set = 0 : this.off_set;
        this.httpService.fetch_paged_data(Number(this.off_set), Number(this.limit));
    }
    change_limit() {
        this.httpService.fetch_paged_data(Number(this.off_set), Number(this.limit));
    }

    ngOnInit() {
    }

}
