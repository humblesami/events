import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { HttpService } from '../../app/http.service';
declare var $:any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() onsearch:EventEmitter<String> = new EventEmitter<String>();
  httpService: HttpService;

  constructor(private httpServ: HttpService) {
    this.httpService = httpServ;
   }

   get_list(event, kw){
    this.httpService.search_kw = $("#search_input").val();
    kw= $("#search_input").val();
    this.onsearch.emit(kw);
  }

  ngOnInit() {
  }

}
