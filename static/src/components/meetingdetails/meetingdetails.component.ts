import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../app/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import {SocketService} from "../../app/socket.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RosterComponent } from '../roster/roster.component';
import { TopiceditComponent } from '../topicedit/topicedit.component';
import { isArray } from 'util';

declare var $: any;

@Component({
	styleUrls:['./meetingdetails.css'],
	templateUrl: 'meetingdetails.component.html'
})

export class MeetingDetailsComponent implements OnInit {
	meeting_object: any;
	meetObjLoaded = false;
	notes = [];
	new_reply = '';
	next = '';
	prev = '';
	title = '';
    flag = '';
    meeting_type = '';
    meeting_status = '';
	first_time = true;
    me_as_respondant: any;
    applicable_publish_action: string;
	discussion_params = {
		model:'Event',
		app:'meetings'
	}
    conference_not_active = false;
    socketService: SocketService;

	constructor(private route: ActivatedRoute,
				private router: Router,
				private httpService: HttpService,
				private sanitizer: DomSanitizer,
                private ss: SocketService,
                private modalService: NgbModal) 
    {	
        this.socketService = this.ss;
        this.route.params.subscribe(params => this.get_data());
    }

    open_roster(){
        let obj_this = this;
		const modalRef = this.modalService.open(RosterComponent, { backdrop: 'static' });
        modalRef.componentInstance.meeting_id = obj_this.meeting_object.id;
        modalRef.componentInstance.meeting_type = obj_this.meeting_object.exectime;
        modalRef.result.then(function(data){
            obj_this.meeting_object.attendance_marked = data && data.attendance_marked;
        });
    }


    delete_agenda_topic(evt, topic_id)
    {
        evt.stopPropagation();
        evt.preventDefault();
        let obj_this = this;
        if (!topic_id)
        {
            return;
        }
        let input_data = {
            topic_id: topic_id
        }
        let args = {
            app: 'meetings',
            model: 'Topic',
            method: 'delete_agenda_topic'
        }
        let final_input = {
            params: input_data,
            args: args
        }
        obj_this.httpService.get(final_input, (data)=>{
            obj_this.meeting_object.topics = obj_this.meeting_object.topics.filter((el)=>{
                return el.id != topic_id;
            });
        }, null)
    }

    open_topic_edit(evt, topic_id, action)
    {
        evt.stopPropagation();
        evt.preventDefault();
        let obj_this = this;
		const modalRef = this.modalService.open(TopiceditComponent, { backdrop: 'static' });
        modalRef.componentInstance.meeting_id = obj_this.meeting_object.id;
        modalRef.componentInstance.meeting_name = obj_this.meeting_object.name;
        modalRef.componentInstance.action = action;
        modalRef.componentInstance.topic_id = topic_id;
        modalRef.result.then(function(data){
            if (isArray(data))
            {
                for (let topic of data)
                {
                    let index = -1;
                    obj_this.meeting_object.topics.filter((el, i)=>{
                        console.log(el, i, topic);
                        if (el.id == topic.id)
                        {
                            index = i;
                        }
                    })
                    if (index != -1)
                    {
                        obj_this.meeting_object.topics[index] = topic;
                    }
                    else
                    {
                        obj_this.meeting_object.topics.push(topic);
                    }
                }
            }
        });
    }

    on_publish_changed(e){
        let obj_this = this;
        let args = {
            app: 'meetings',
            model: 'Event',
            method: 'update_publish_status'
        }
        $(e.target).closest('button').attr('disabled', 'disabled');
        if(obj_this.meeting_status == 'Unpublished')
        {
            obj_this.meeting_status = 'Published';
        }
        else{
            obj_this.meeting_status = 'Unpublished';
        }
        let input_data = {
            params: {meeting_id: obj_this.meeting_object.id,publish_status: !obj_this.meeting_object.publish},
            args: args,
            no_loader: 1
        };
        obj_this.httpService.get(input_data, function(data){
            let is_published = obj_this.meeting_object.publish;
            $(e.target).closest('button').removeAttr('disabled');
            if (is_published)
            {
                obj_this.meeting_status = 'Unpublished';
                obj_this.applicable_publish_action = 'Publish';
                obj_this.meeting_type = 'draft';
                var elm = $('li.breadcrumb-item a').last();
                var parent_elm = elm.parent();
                elm.remove();
                parent_elm.append('<a href="#/meetings/draft">Draft Meetings</a>');
            }
            else
            {
                obj_this.meeting_status = 'Published';
                obj_this.applicable_publish_action = 'Unpublish';
                if(new Date(obj_this.meeting_object.end_date) > new Date())
                {
                    obj_this.meeting_type = 'upcoming';
                    var elm = $('li.breadcrumb-item a').last();
                    var parent_elm = elm.parent();
                    elm.remove();
                    parent_elm.append('<a href="#/meetings/upcoming">Upcoming Meetings</a>');
                }
                else{
                    obj_this.meeting_type = 'completed';
                    var elm = $('li.breadcrumb-item a').last();
                    var parent_elm = elm.parent();
                    elm.remove();
                    parent_elm.append('<a href="#/meetings/completed">Completed Meetings</a>');
                }
            }
            obj_this.meeting_object.publish = !is_published;
        }, function(){
            if (obj_this.meeting_object.publish)
            {
                $('.toggle_cb').prop('checked', true);                            
            }
            else
            {
                $('.toggle_cb').prop('checked', false);
            }
        });
    }

    is_attendee = false;

	get_data() {
        let obj_this = this;
		const page_url = window.location + '';
		let req_peram = (window.location + '').split('/');
		obj_this.flag = req_peram[req_peram.length - 3];
		if (['upcoming', 'completed', 'archived'].indexOf(obj_this.flag) === -1) {
			obj_this.flag = '';
		}

		
        let args = {
            app: 'meetings',
            model: 'Event',
            method: 'get_details'
        }
		let input_data = {
            params: {id: obj_this.route.snapshot.params.id, meeting_type: obj_this.flag},
            args: args
        };

        let on_data = function(result) {
            // console.log(result,1122);
            try {
                if(result.message)
                {
                    $('.router-outlet').html('<h2 style="text-align:center">'+result.message+'</h2>');
                    return;
                }
                var meeting_object = obj_this.meeting_object = result.meeting;                                                
                obj_this.next = result.next;
                obj_this.prev = result.prev;
                if (result.meeting && result.meeting.name) {
                } else {
                    obj_this.router.navigate(['/']);
                    return;
                }
                obj_this.meeting_type = result.meeting.exectime;
                obj_this.meeting_type === 'ongoing' ? obj_this.meeting_type = 'upcoming' : obj_this.meeting_type;
                if(obj_this.meeting_type)
                {
                    obj_this.meeting_type === 'past' ? obj_this.meeting_type = 'archived' : obj_this.meeting_type;
                    obj_this.title = obj_this.meeting_type[0].toUpperCase() + obj_this.meeting_type.slice(1).toLowerCase();
                }
                obj_this.meeting_object.description = obj_this.meeting_object.description.trim();                
                if(meeting_object.description)
                    meeting_object.description = obj_this.sanitizer.bypassSecurityTrustHtml(obj_this.meeting_object.description);
                var uid = window['current_user'].cookie.id;

                var pp = 0
                var cur_user_object = undefined;
                var myindex = -1;
                var attendees = meeting_object.attendees
                attendees.forEach(att => {
                    if (att.uid == uid) {
                        myindex = pp;
                        cur_user_object = att;
                    }
                    pp++;
                });
                if(!cur_user_object)
                {
                    obj_this.is_attendee = false;
                }
                else{
                    obj_this.is_attendee = true;
                }
                attendees.splice(myindex, 1);
                attendees.splice(0, 0, cur_user_object);
                obj_this.me_as_respondant = attendees[0];
                if (obj_this.meeting_object.publish)
                {
                    obj_this.meeting_status = 'Published';
                    obj_this.applicable_publish_action = 'Unpublish';
                }
                else
                {
                    obj_this.meeting_status = 'Unpublished';
                    obj_this.applicable_publish_action = 'Publish';
                }
                for(var survey of meeting_object.surveys)
                {
                    survey.open_date = window['dt_functions'].meeting_time(survey.open_date);
                }
                for(var voting of meeting_object.votings)
                {
                    voting.open_date = window['dt_functions'].meeting_time(voting.open_date);
                }
                setTimeout(function(){
                    if (obj_this.meeting_object.publish)
                    {
                        $('.toggle_cb').prop('checked', true);                            
                    }
                    else
                    {
                        $('.toggle_cb').prop('checked', false);
                    }
                }, 100);
            } catch (er) {
                console.log(er);
            }
            obj_this.meetObjLoaded = true;
        };

        
		this.httpService.get(input_data, on_data, null);
	}

	isInProgress() {
		// var startTime = moment('8:45am', 'h:mma');
		// var endTime = moment('9:00am', 'h:mma').add(3, 'hours');
		// var now = moment();
		// if(now.isBefore(endTime) && now.isAfter(startTime))
		// console.log('In Progress!!!')
		// else
		// console.log('Finished!!')
		return true;
    }

    move_to_archive(meeting_id:number)
    {
        console.log(43);
        let obj_this = this;
        if (meeting_id)
        {
            let args = {
                app: 'meetings',
                model: 'Event',
                method: 'move_to_archive'
            }
            let input_data = {
                params: {meeting_id: meeting_id},
                args: args,
                no_loader: 1
            };            
            if (obj_this.meeting_object.attendance_marked)
            {                
                obj_this.httpService.get(input_data, function(data){
                    var url = '/meeting/archived/' + meeting_id
                    obj_this.router.navigate([url]);
                }, null)
            }
            else{
                window['bootbox'].alert('Please click Roster to mark all attendance first');
            }
        }
    }
    attachments = [];


    doc_name_change(doc, e)
    {
        doc.name = e.target.value;
    }


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
        });
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

        if (obj_this.attachments.length && obj_this.meeting_object)
        {
            let args = {
                app: 'meetings',
                model: 'MeetingDocument',
                method: 'upload_meeting_documents',
                post: 1
            }
            let input_data = {
                params: {
                    meeting_id: obj_this.meeting_object.id,
                    attachments: obj_this.attachments
                },
                args: args,
                no_loader: 1
            };
            obj_this.httpService.get(input_data, function(data){
                obj_this.meeting_object.meeting_docs = obj_this.meeting_object.meeting_docs.concat(data);
                obj_this.attachments = []
            }, null);
        }
    }
    visible_limit = {
        survey : 1,
        sign_doc : 1,
        news_doc : 1,
        news_video: 1,
        voting: 1,
    };
    ng_init = false;
    start_indices = {
        survey : 0,
        sign_doc : 0,
        news_doc : 0,
        news_video: 0,
        voting: 0,
    };
    ending_indices = {
        survey : 0,
        sign_doc : 0,
        news_doc : 0,
        news_video: 0,
        voting: 0,
    }

    update_indices(){

    }
    get_slider_start_index(flag, items, item_type){
        
        if(!items)
        {
            return;
        }
        if(this.start_indices[item_type] + flag * this.visible_limit[item_type] >= items.length)
        {
            this.start_indices[item_type] = 0;
        }
        else if(this.start_indices[item_type] + flag * this.visible_limit[item_type] < 0)
        {
            this.start_indices[item_type] = items.length % this.visible_limit[item_type] > 0 ? items.length - items.length % this.visible_limit[item_type] : items.length - this.visible_limit[item_type];
        }
        else
        {
            this.start_indices[item_type] += flag * this.visible_limit[item_type];
        }
        this.ending_indices[item_type] =  this.start_indices[item_type] + this.visible_limit[item_type];
        console.log(this.visible_limit[item_type],this.start_indices[item_type],items,item_type);
    }
	ngOnInit() {
        let obj_this = this;
        var vw = $(window).width();
        // console.log(vw , 66);
        if(vw > 1200)
        obj_this.visible_limit = {
            survey : 3,
            sign_doc : 6,
            news_doc : 6,
            news_video: 4,
            voting: 3,
        }
        else if(vw > 991 && vw < 1200)
        obj_this.visible_limit = {
            survey : 3,
            sign_doc : 4,
            news_doc : 6,
            news_video: 4,
            voting: 3,
        }
        else if(vw > 767 && vw < 992)
        obj_this.visible_limit = {
            survey : 2,
            sign_doc : 3,
            news_doc : 3,
            news_video: 3,
            voting: 2,
        }
        else if(vw > 576 && vw < 768)
        obj_this.visible_limit = {
            survey : 1,
            sign_doc : 2,
            news_doc : 2,
            news_video: 2,
            voting: 1,
        }
        else
        obj_this.visible_limit = {
                survey : 1,
                sign_doc : 1,
                news_doc : 1,
                news_video: 1,
                voting: 1,
            };

        for (var item_type in obj_this.ending_indices)
        {
            obj_this.ending_indices[item_type] = obj_this.visible_limit[item_type];
        }
        // console.log(obj_this.visible_limit, obj_this.ending_indices,1122);
	}

	ngOnDestroy() {

	}
}
