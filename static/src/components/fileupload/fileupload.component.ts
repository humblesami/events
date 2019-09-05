import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';

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
    @Output() update_data: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        var obj_this = this;
        $(function(){
            let file_input = $('.upload-files');
            let resInfo = {
                res_app: obj_this.res_app,
                res_model: obj_this.res_model,
                res_id: obj_this.res_id
            }
            window['apply_drag_drop'](file_input, resInfo, function(data){
                // console.log(data, 9966);
                obj_this.update_data.emit(data);
            });
        });
    }
}
