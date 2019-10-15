import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../app/http.service';
import {SocketService} from "../../app/socket.service";
import { RenameService } from 'src/app/rename.service';


declare var $: any;
@Component({
  selector: 'app-topicedit',
  templateUrl: './topicedit.component.html',
  styleUrls: ['../profileedit/profileedit.component.css',
  '../documents/documents.component.css','./topicedit.component.css'
]
})
export class TopiceditComponent implements OnInit {
@Input() meeting_id: any;
@Input() meeting_name: any;
@Input() action: any;
@Input() topic_id: any;
socketService: SocketService;
renameService: RenameService;
modified_topic_data = {};
agenda_docs = [];
event__name = '';
add_another = false;
added_topics = [];
topic = undefined;
  constructor(
    public activeModal: NgbActiveModal,
    private httpService: HttpService,
    private renameSer: RenameService,
    private ss: SocketService,
  ) {
    this.topic = {};
    this.socketService = ss;
    this.renameService = renameSer;
  }

  onAddAnother()
  {
    this.add_another = true;
    this.onSubmit();
  }

  onCancel(){
      this.activeModal.close('closed');
  }

  get_icon_url(source = null){
    var icon_url = "/static/assets/images/cloud/local.png";
    switch(source){
        case "Google":
                icon_url = "/static/assets/images/cloud/gdrive.png";
            break;
        case "Onedrive":
                icon_url = "/static/assets/images/cloud/onedrive.png";
            break;
        case "Dropbox":
                icon_url = "/static/assets/images/cloud/dropbox.png";
            break;
    }
    return icon_url;
}

  clear_form()
  {
    let obj_this = this;
    if (obj_this.action == 'update')
    {
      obj_this.action = 'create';
      setTimeout(() => {
        obj_this.apply_drag_drop();
      }, 10);
    }
    obj_this.add_another = false;
    obj_this.topic = {
      name: '', 
      description: '',
      lead: '',
      duration:''
    };
    obj_this.modified_topic_data = {};
    obj_this.agenda_docs = [];
  }

  delete_file(evn, doc_id)
  {
      evn.stopPropagation();
      evn.preventDefault();
      let obj_this = this;
      window['bootbox'].confirm('Are you sure to delete?', function(dr){
        if(!dr)
        {
            return;
        }            
        let input_data = {
            doc_id: doc_id,
        }
        let args = {
            app: 'documents',
            model: 'File',
            method: 'delete_file'
        }
        let final_input = {
            params: input_data,
            args: args
        }

        obj_this.agenda_docs.find((item)=>{
            return item.id== doc_id;
        }).deleting=true;

        obj_this.httpService.get(final_input, (data)=>{                        
            obj_this.agenda_docs =  obj_this.agenda_docs.filter((el)=>{
                return doc_id != el.id;
            });
        }, null);
      });
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
      if (data != 'done')
      {
        obj_this.added_topics.push(data);
      }
      if (!obj_this.add_another)
      {
        if (!obj_this.added_topics.length)
        {
          obj_this.activeModal.close('saved');
        }
        else
        {
          obj_this.activeModal.close(obj_this.added_topics);
        }
      }
      else
      {
        obj_this.clear_form();
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

     apply_drag_drop()
    {
      let obj_this = this;
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
    else if(obj_this.action == 'create')
    {
      setTimeout(() => {
        obj_this.apply_drag_drop();
      }, 10);
    }
  }

}
