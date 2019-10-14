import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../app/http.service';

declare var $: any;
@Component({
  selector: 'app-topicedit',
  templateUrl: './topicedit.component.html',
  styleUrls: ['./topicedit.component.css', '../profileedit/profileedit.component.css']
})
export class TopiceditComponent implements OnInit {
@Input() meeting_id: any;
@Input() meeting_name: any;
@Input() action: any;
@Input() topic_id: any;
modified_topic_data = {};
agenda_docs = [];
event__name = '';
topic = undefined;
  constructor(
    public activeModal: NgbActiveModal,
    private httpService: HttpService
  ) {
    this.topic = {};
  }

  onCancel(){
      this.activeModal.close();
  }

  onSubmit()
  {
    let obj_this = this;
    const form_data = obj_this.modified_topic_data;
		const input_data = {};
		for (const key in form_data) {
			if(obj_this.modified_topic_data[key] != '')
				input_data[key] = obj_this.modified_topic_data[key];			
    }
    let args = {
      app: 'meetings',
      model: 'Topic',
      post: 1,
        }
    if (obj_this.action == 'update')
    {
      input_data['topic_id'] = obj_this.topic_id;
      args['method'] = 'update_agenda_topic';
    }
    else
    {
      args['method'] = 'save_agenda_topic';
      if (obj_this.meeting_id)
      {
        input_data['meeting_id'] = obj_this.meeting_id;
      }
    }
    input_data['agenda_docs'] = obj_this.agenda_docs;
    let final_input_data = {
      params: input_data,
      args: args
    }
    obj_this.httpService.get(final_input_data, (data)=>{
      if (obj_this.action == 'update')
      {
        obj_this.activeModal.close();
      }
    }, null);
  }

  get_topic()
  {
    let obj_this = this;
    const input_data = {id : obj_this.topic_id};
    let args = {
      app: 'meetings',
      model: 'Topic',
      method: 'get_details'
    }			
    let final_input_data = {
        params: input_data,
        args: args
    };
    obj_this.httpService.get(final_input_data, (data)=>{
      obj_this.topic = data;
      obj_this.event__name = data.event__name;
    }, null);
  }

  ngOnInit() {
    let obj_this = this;
    if (obj_this.meeting_name)
    {
      obj_this.event__name = obj_this.meeting_name;
    }
    if (obj_this.action == 'update' && obj_this.topic_id)
    {
      obj_this.get_topic()
    }
    let file_input = $('.add_agenda_docs');
    let resInfo = {
        res_app: 'documents',
        res_model: 'File'
    }
    file_input.attr('dragdrop', 1);
    window['apply_drag_drop'](file_input, resInfo, function(data){
      try{
        for (let doc of data)
        {
          obj_this.agenda_docs.push(doc);
        }
      }
      catch(er){
          console.log(er, 5455);
      }
  });
  }

}
