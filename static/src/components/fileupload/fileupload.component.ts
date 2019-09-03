import { Component, OnInit, Input } from '@angular/core';

declare var $: any;


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
  @Input() public res_app: string;
  @Input() public res_model: string;
  @Input() public res_id: number;
  constructor() { }

  ngOnInit() {
    var obj_this = this;
    $(()=>{
      let file_input = $('.upload-files');
      let resInfo = {
        res_app: obj_this.res_app,
        res_model: obj_this.res_model,
        res_id: obj_this.res_id
      }
      window['apply_drag_drop'](file_input, resInfo);
    });
  }

}
