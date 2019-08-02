import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../app/http.service';
declare var $: any;

@Component({
    selector: 'app-paginator',
    styleUrls:['./paginator.css'],
    templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {     
    @Input() count: number;   
    @Output() changedOffset: EventEmitter<number> =   new EventEmitter();
    @Output() changedLimit: EventEmitter<number> = new EventEmitter()
    limit = 2;
    limit_options = [
        2,
        10,
        50,
        100
    ]
    httpService:any;
    page_number: number;
    constructor(private httpServ : HttpService) {
        let obj_this = this;
        httpServ.changePaginator = function(data){
            obj_this.count = data;
            // console.log(3331, obj_this.count);
        }
        // console.log(Date(), new Date().getMilliseconds(), 113);
        this.httpService = httpServ;
        this.offset = 0;        
        this.page_number = 1;        
    }

    offset: number;

    change_page(change: number){
        console.log(change, this.offset, this.limit, this.count);
        if(change <= 1 && this.offset < 0)
        {
            this.offset = 0;
            return;
        }
        else if(change >= 1 && this.offset + this.limit >= this.count)
        {
            return;
        }
        else{
            let new_val = change * this.limit;        
            this.offset = this.offset + new_val;
            this.page_number += change;
            this.changedOffset.emit(this.offset);
            // console.log(this.offset, this.limit, this.count);
        }        
    }
    change_limit(e){
        this.limit = $(e.target).val();
        this.changedLimit.emit(this.limit);
        // console.log(this.limit, this.offset, 1411);
    }
    public updateCount(total)
    {
        console.log(total, 14545);
    }
    ngOnInit() {        
        // console.log(this.count, 199);
        let obj_this = this;
        window['wait_or_execute']
    }

}
