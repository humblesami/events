import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../app/http.service';
import {ActivatedRoute} from '@angular/router';
declare var $: any;

@Component({
    selector: 'app-topics',
    styleUrls:['./meetingdetails.css'],
    templateUrl: './topics.component.html'
})
export class TopicsComponent implements OnInit {
    topic = {
        id: '',
        lead : '',
        content: '',
        duration:'00:00',
        name: '',
        docs:[],
        votings:[],
    };
    bread_crumb = {
        items: [],
        title: ''
    };
    meeting_type = '';
    meeting_name = '';
    meeting_id = '';
    attachments = [];
    constructor(private httpService: HttpService, private route: ActivatedRoute) { }
    file_change(event)
    {
        let obj_this = this;
        var res = new Promise<any>(function(resolve, reject) {
            window['functions'].get_file_binaries(event.target.files, resolve);
        }).then(function(data){
            data.forEach(element => {
                let ar = element.name.split('.')
                element.ext = ar[ar.length - 1];
                element.name = element.name.replace('.' + element.ext, '');
                element.file_name = element.name;
            });
            obj_this.attachments = obj_this.attachments.concat(data);
            let a = 21;
        });
    }


    doc_name_change(doc, e)
    {
        doc.name = e.target.value;
    }


    attach_btn_click(ev)
    {
        if(!$(ev.target).is('input'))
        {
            $(ev.target).closest('.attach_btn').find('input').click();
        }        
    }


    remove_attachment(el){        
        let obj_this = this;                
        var i = $(el.target).closest('#attach_modal .doc-thumb').index();        
        obj_this.attachments.splice(i, 1);        
    }
    

    upload_doucments()
    {
        var obj_this = this;
        obj_this.attachments.forEach(element =>{
            element.file_name = element.name;
            element.name = element.name + '.' + element.ext;
        });

        if (obj_this.attachments.length && obj_this.topic)
        {
            let args = {
                app: 'meetings',
                model: 'AgendaDocument',
                method: 'upload_agenda_documents',
                post: 1
            }
            let input_data = {
                params: {
                    topic_id: obj_this.topic.id,
                    attachments: obj_this.attachments
                },
                args: args,
                no_loader: 1
            };
            obj_this.httpService.get(input_data, function(data){
                obj_this.topic.docs = obj_this.topic.docs.concat(data);
                obj_this.attachments = []
            }, null);
        }
    }
    ngOnInit() {
        const obj_this = this;
        const req_url = '/topic/details-json';
        const input_data = {id : obj_this.route.snapshot.params.id};
        const success_cb = function (result) {
            if(!result.votings)
            {
                result.votings = [];
            }
            obj_this.topic = result;
            // obj_this.bread_crumb.title = obj_this.topic['name'];
            // obj_this.bread_crumb.items.push({
            //     title: obj_this.topic['meeting_name'],
            //     link: '/meeting/' + obj_this.topic['meeting_id']
            // });

            obj_this.meeting_type = obj_this.topic['meeting_type'];
            obj_this.meeting_name = obj_this.topic['event__name'];
            obj_this.meeting_id = obj_this.topic['event__id'];
            obj_this.meeting_type === 'ongoing' ? obj_this.meeting_type = 'upcoming' : obj_this.meeting_type;
            if(obj_this.meeting_type)
            {
                obj_this.meeting_type === 'past' ? obj_this.meeting_type = 'archived' : obj_this.meeting_type;
            }
        };
        const failure_cb = function (error) {
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
        obj_this.httpService.get(final_input_data, success_cb, failure_cb);
    }
}
