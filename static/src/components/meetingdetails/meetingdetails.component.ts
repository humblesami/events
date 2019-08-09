import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../app/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import {SocketService} from "../../app/socket.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RosterComponent } from '../roster/roster.component';
import { DjangopaginatorComponent } from '../djangopaginator/djangopaginator.component';

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

    open_modal(meeting_id) {
		const modalRef = this.modalService.open(RosterComponent);
        modalRef.componentInstance.meeting_id = meeting_id;
        setTimeout(function(){
            $('ngb-modal-window.show .modal-dialog').addClass('modal-lg').addClass('modal-dialog-centered');
        }, 51);
    }
    open_roster(){
        $('.roster-full').show();
    }
    open_django(meeting_id) {
		const modalRef = this.modalService.open(DjangopaginatorComponent);
		modalRef.componentInstance.meeting_id = meeting_id;
	}

    on_publish_changed(){
        let obj_this = this;
        let is_published = obj_this.meeting_object.publish;
        if (is_published)
        {
            obj_this.meeting_status = 'Unpublished';
            obj_this.meeting_type = 'draft';
            obj_this.title = 'Draft';
            $('li.breadcrumb-item a').last().html('Draft Meetings').attr('href','/meetings/draft');
        }
        else
        {
            obj_this.meeting_status = 'Published';
            obj_this.meeting_type = 'upcoming';
            obj_this.title = 'Upcoming';
            $('li.breadcrumb-item a').last().html('Upcoming Meetings').attr('href','/meetings/upcoming');
        }
        obj_this.meeting_object.publish = !is_published;
        let args = {
            app: 'meetings',
            model: 'Event',
            method: 'update_publish_status'
        }
        let input_data = {
            params: {meeting_id: obj_this.meeting_object.id,publish_status: obj_this.meeting_object.publish},
            args: args,
            no_loader: 1
        };
        obj_this.httpService.get(input_data, function(){}, function(){
            obj_this.meeting_object.publish = !obj_this.meeting_object.publish;
        });
    }

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

            try {
                if(result.message)
                {
                    $('.router-outlet').html('<h2 style="text-align:center">'+result.message+'</h2>');
                    return;
                }
                var meeting_object = obj_this.meeting_object = result.meeting;
                
                setTimeout(function(){
                    $('.toggle_cb').bootstrapToggle({
                        off: 'Unpublish',
                        on: 'Publish'
                    });
                    if (obj_this.meeting_object.publish)
                    {
                        $('.toggle_cb').prop('checked', false).change();
                        obj_this.meeting_status = 'Published';
                    }
                    else
                    {
                        obj_this.meeting_status = 'Unpublished';
                    }
                                
                }, 100);

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
                    console.log('Me not in attendees');
                    return;
                }
                attendees.splice(myindex, 1);
                attendees.splice(0, 0, cur_user_object);
				obj_this.me_as_respondant = attendees[0];
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

	ngOnInit() {
	}

	ngOnDestroy() {

	}
}
