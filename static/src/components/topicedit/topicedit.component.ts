import { isArray } from 'util';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../app/http.service';
import {SocketService} from "../../app/socket.service";
import { RenameService } from 'src/app/rename.service';
import { Router } from '@angular/router';
// import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

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
    @Input() meeting_obj: any;
    @Input() new_topic_valid_time:any;
    @Input() topic_id: any;
    socketService: SocketService;
    renameService: RenameService;
    modified_topic_data = {
        name: '',
        description: '',
        lead: '',
        duration: ''
    };
    agenda_docs = [];
    event__name = '';
    add_another = false;
    added_topics = [];
    topic = {
        name: '',
        description: '',
        lead: '',
        duration: '',
        docs: []
    };
    constructor(
        public activeModal: NgbActiveModal,
        private httpService: HttpService,
        private renameSer: RenameService,
        private ss: SocketService,
        public router: Router
    ) {
        this.socketService = ss;
        this.renameService = renameSer;
    }

    onAddAnother() {
        this.add_another = true;

        this.onSubmit();
    }

    onCancel() {
        this.activeModal.close('closed');
    }

    get_icon_url(source = null) {
        var icon_url = "/static/assets/images/cloud/local.png";
        switch (source) {
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

    clear_form() {
        let obj_this = this;
        if (obj_this.action == 'update') {
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
            docs: [],
            duration: ''
        };
        obj_this.modified_topic_data = {
            name: '',
            description: '',
            lead: '',
            duration: ''
        };
        obj_this.agenda_docs = [];
    }

    delete_file(evn, doc_id) {
        evn.stopPropagation();
        evn.preventDefault();
        let obj_this = this;
        window['bootbox'].confirm('Are you sure to delete?', function(dr) {
            if (!dr) {
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

            obj_this.agenda_docs.find((item) => {
                return item.id == doc_id;
            }).deleting = true;

            obj_this.httpService.get(final_input, (data) => {
                obj_this.agenda_docs = obj_this.agenda_docs.filter((el) => {
                    return doc_id != el.id;
                });
            }, null);
        });
    }
    onSubmit() {
        let obj_this = this;
        const form_data = obj_this.modified_topic_data;
        const input_data = {};
        for (const key in form_data) {
            if (obj_this.modified_topic_data[key] != '')
                input_data[key] = obj_this.modified_topic_data[key];
        }
        let args = {
            app: 'meetings',
            model: 'Topic',
            post: 1,
        }
        if (obj_this.action == 'update') {
            input_data['topic_id'] = obj_this.topic_id;
            args['method'] = 'update_agenda_topic';
        } else {
            args['method'] = 'save_agenda_topic';
            if (obj_this.meeting_id) {
                input_data['meeting_id'] = obj_this.meeting_id;
            }
        }
        input_data['agenda_docs'] = obj_this.agenda_docs;
        let final_input_data = {
            params: input_data,
            args: args
        }
        obj_this.httpService.get(final_input_data, (data) => {
            if (data != 'done') {
                obj_this.added_topics.push(data);
            }
            if (!obj_this.add_another) {
                if (!obj_this.added_topics.length) {
                    obj_this.activeModal.close('saved');
                } else {
                    obj_this.activeModal.close(obj_this.added_topics);
                }
            } else {
                obj_this.clear_form();
                data = obj_this.added_topics
                if (isArray(data))
                {
                    for (let topic of data)
                    {
                        let index = -1;
                        obj_this.meeting_obj.meeting_topics.filter((el, i)=>{
                            // console.log(el, i, topic);
                            if (el.id == topic.id)
                            {
                                index = i;
                            }
                        })
                        if (index != -1)
                        {
                            obj_this.meeting_obj.meeting_topics[index] = topic;
                        }
                        else
                        {
                            obj_this.meeting_obj.meeting_topics.push(topic);
                        }
                    }
    
                }
                let check :-1
                obj_this.topic_id = ''
                obj_this.sum_agenda_duration(null);
            }
        }, null);
    }

    duration_to_number(duration){
        if(duration){
            duration = duration.split(":")
            let duration_hours = parseInt(duration[0]);
            let duration_minuets = parseInt(duration[1]);
            if(duration_hours>0){
                    duration_hours = duration_hours * 60;
                }
            duration = duration_hours + duration_minuets;
            return duration;
        }
    }
    timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        let rhours_string =  rhours.toString();
        let rminutes_string = rminutes.toString();
        if (rhours < 10){
            rhours_string = "0" + rhours;
        }
        if(rminutes < 10){
            rminutes_string  = "0" + rminutes;

        }
        return  rhours_string + ":" + rminutes_string;

        }
        
    sum_agenda_duration(evn){
        let obj_this = this;
        var topics_duration_sum = 0;
        var topics = obj_this.meeting_obj.meeting_topics
        for(var topic of topics)
        {
            var num = obj_this.duration_to_number(topic.duration)
            
            if(topic.id != obj_this.topic_id)
            {
                topics_duration_sum += num;
            }
        }
        var meeting_duration_minuets = obj_this.duration_to_number(obj_this.meeting_obj.meeting_duration);
        if(meeting_duration_minuets>=topics_duration_sum){
            let available_time = meeting_duration_minuets - topics_duration_sum;
            var available_time_string = obj_this.timeConvert(available_time);
            obj_this.modified_topic_data.duration =evn
            if(evn){
                var new_topic_duration = obj_this.duration_to_number(obj_this.modified_topic_data.duration)
                if( available_time < new_topic_duration ){
                    var message = "Not Valid Time. Meeting has only: " + available_time_string + " Time"
                    window['bootbox'].alert(message);
                    setTimeout(()=>{
                        $("#duration").val(available_time_string);
                        obj_this.modified_topic_data.duration = available_time_string
                        },10);
                    
                }
            }else{
                setTimeout(()=>{
                    $("#duration").val(available_time_string);
                    },10);
                // console.log(available_time_string);
            }

        }else{
            var message = "Not Valid Time."
            window['bootbox'].alert(message);
        }

        // sum += obj_this.topic.duration;

    }


    // check_duration(evn, time){
    //     // modified_topic_data.duration = evn.target.value
    //     let obj_this = this;
    //     obj_this.modified_topic_data.duration = time
    //     let dur = obj_this.modified_topic_data.duration
    //     // console.log(obj_this.modified_topic_data.duration);
  
    //     const input_data = {
    //         meeting_id: obj_this.meeting_id,
    //         duration: dur
    //     };
    //     let args = {
    //         app: 'meetings',
    //         model: 'Topic',
    //         method: 'check_duration',
    //         no_loader:1,
    //     }
    //     let final_input_data = {
    //         params: input_data,
    //         no_loader:1,
    //         args: args
    //     };
    //     obj_this.httpService.get(final_input_data, (data) => {
    //         if(data.is_valid == true){
    //             // console.log(data)
    //         }else{
    //             // console.log(data)
    //             if(data.valid_time){
    //                 obj_this.modified_topic_data.duration=data.valid_time;
    //                 window['bootbox'].alert(data.message);
    //                 obj_this.new_topic_valid_time = data.valid_time;
    //                 $("#duration").val(data.valid_time);

    //             }else{
    //                 window['bootbox'].alert(data.message);
    //                 $("#duration").val('');
    //             }

    //         }

    //     }, null);
    // }

    get_topic() {
        let obj_this = this;
        const input_data = {
            id: obj_this.topic_id
        };
        let args = {
            app: 'meetings',
            model: 'Topic',
            method: 'get_details'
        }

        let final_input_data = {
            params: input_data,
            args: args
        };
        obj_this.httpService.get(final_input_data, (data) => {
            obj_this.topic = data;
            obj_this.event__name = data.event__name;
            if (obj_this.topic.docs.length) {
                obj_this.agenda_docs = obj_this.topic.docs;
            }
        }, null);
    }

    redirect_to_doc(link) {
        this.activeModal.close();
        this.router.navigate([link]);
    }

    apply_drag_drop() {
        let obj_this = this;
        let file_input = $('.add_agenda_docs');
        let resInfo = {
            res_app: 'documents',
            res_model: 'File'
        }
        file_input.attr('dragdrop', 1);
        window['apply_drag_drop'](file_input, resInfo, function(data) {
            try {
                for (let doc of data) {
                    obj_this.agenda_docs.push(doc);
                }
            } catch (er) {
                console.log(er, 5455);
            }
        });
    }


    ngOnInit() {
 
        let obj_this = this;
        if (obj_this.meeting_name) {
            obj_this.event__name = obj_this.meeting_name;
        }
        if (obj_this.action == 'update' && obj_this.topic_id) {
            obj_this.get_topic()
        }
        // else if(obj_this.action == 'create')
        {
            setTimeout(() => {
                obj_this.apply_drag_drop();
            }, 10);
        }
        // console.log(obj_this.meeting_obj);
        obj_this.sum_agenda_duration(null);
        window['app_libs']['mask'].load(()=>{
            $('#duration').mask('00:00');

        });
    }

}