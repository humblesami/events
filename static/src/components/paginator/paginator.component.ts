import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../app/http.service';
import { range } from 'rxjs';
declare var $: any;
@Component({
    selector: 'app-paginator',
    styleUrls:['./paginator.css'],
    templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {     
    @Input() count: number;   
    @Output() changedOffset: EventEmitter<number> =   new EventEmitter();
    @Output() changedLimit: EventEmitter<number> = new EventEmitter();
    @Output() lastpage: EventEmitter<number>= new EventEmitter();
    @Output() firstpage: EventEmitter<number>= new EventEmitter();
    @Output() pagedata: EventEmitter<number>= new EventEmitter();
    total_pages = []; 
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
    page_Data(event) {
        this.offset = (event - 1) * this.limit;
        if(event == this.page_number)
        {
            return;
        }
        this.page_number = event;
        this.get_pager(this.page_number);
        this.pagedata.emit(this.offset);        
    }

    change_page(change: number){
        var ppgn = this.page_number + change;        
        this.page_Data(ppgn);
    }    
    last_Page(change: number){
        let lPage= Math.ceil(change/this.limit);
        this.page_Data(lPage);      
    }
    first_Page(change: number){
        this.page_Data(1);   
    }

    shown_pages = [];
    startPage: number;
    endPage: number;

    all_pages(pages:number){
        this.total_pages = [];
        let lPage= Math.ceil(pages/this.limit);
        for (let i = 1; i <= lPage; i++) {            
            this.total_pages.push(i)
        }
        this.get_pager(this.page_number);
    }

    get_pager(current_page){
        // console.log(current_page, 134);
        if(current_page <= 1){
            this.page_number = 1;
        }
        if(this.total_pages.length <= 5)
        {   
            this.startPage = 1;
            this.endPage = this.total_pages.length;
        }
        else
        {
            if(current_page > 2)
            {
                if(current_page - 2 > 0 && current_page + 2 < this.total_pages.length)
                {
                    this.startPage = current_page - 2;
                    this.endPage = current_page + 2;    
                }
                else
                {
                    this.startPage = this.total_pages.length - 4;
                    this.endPage = this.total_pages.length;
                }
            }
            else{
                this.startPage = 1;
                this.endPage = 5;
            }
        }

        this.shown_pages = this.total_pages.slice(this.startPage - 1, this.endPage);
        // console.log(this.shown_pages);

    }
    change_limit(e){
        // console.log(this.offset,this.limit,  1411);
        this.limit = Number($(e.target).val());
        this.offset=0;
        this.page_number=1;
        this.all_pages(this.count);
        this.changedLimit.emit(this.limit);
        // console.log(this.offset,this.limit, 1411);
    }
    
    
    

    public updateCount(total)
    {
        console.log(total, 14545);
    }

    
    ngOnInit() {        
        // console.log(this.count, 199);
        let obj_this = this;
        window['wait_or_execute']
        this.all_pages(this.count);
    }


    
}

