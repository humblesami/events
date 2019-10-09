import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpService } from '../../app/http.service';

@Component({
  selector: 'app-movetomyfolder',
  templateUrl: './movetomyfolder.component.html',
  styleUrls: ['./movetomyfolder.component.css']
})
export class MovetomyfolderComponent implements OnInit {
  httpService: HttpService;
  @Input() folder_id : number;
  @Input() doc_id : number;

  constructor(private httpServ: HttpService,) { 
    let obj_this = this;
    obj_this.httpService = httpServ;
  }

  folders_recursive_childs(folder_id){
    let obj_this = this;
    let args = {
        app: 'resources',
        model: 'Folder',
        method: 'folders_recursive_childs'
    }
    let final_input_data = {
        params: {
            parent_id: folder_id,
        },
        args: args
    };
    // console.log(final_input_data.params, 333);
    obj_this.httpService.get(final_input_data,
    (result: any) => {
        console.log(result);
        // obj_this.on_result(result);
    },null);  
  }

  ngOnInit() {
      // this.folders_recursive_childs(folder_id)
      alert("testing");
  }

}
