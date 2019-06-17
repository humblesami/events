import { Component, OnInit, Input } from '@angular/core';
import {HttpService} from "../../app/http.service";
import {SocketService} from "../../app/socket.service";
import {ActivatedRoute} from "@angular/router";
declare var $: any;


@Component({
	selector: 'app-comments',
	styleUrls:['./comments.css'],
	templateUrl: './comments.component.html'	
})
export class CommentsComponent implements OnInit {

    @Input() res_app: string;
    @Input() res_model: string;
    @Input() res_id: string;    

	comments = [];
	notes = [];
	new_reply = '';
	comment_subtype = 1;
    new_comment = '';
    active_comment : any;

	constructor(private httpService: HttpService,
				private socketService: SocketService,
				private route: ActivatedRoute) {
                    
                }

	get_data(input_data) {
        var obj_this = this;
        
        let on_comments_list = function(result){
            try {
                for(let i in result) {
                    var item = result[i];
                    if (item.subtype_id) {
                        if (item.subtype_id === 1) {
                            item.reply = false;
                            if(item.body && item.body.startsWith('<p>'))
                            {                                
                                item.body = $(item.body)[0].innerHTML;
                            }
                            obj_this.add_item(item, obj_this.comments, 'read comment', 0);
                        } else if (item.subtype_id === 2) {
                            if(item.body && item.body.startsWith('<p>'))
                            {
                                item.body = $(item.body)[0].innerHTML;
                            }
                            obj_this.add_item(item, obj_this.notes, 'read note', 0);
                        }
                    }
                    if(item.children)
                    {
                        for(let j in item.children) {
                            var child_item = item.children[j];
                            if(child_item.body && child_item.body.startsWith('<p>'))
                            {                                
                                child_item.body = $(child_item.body)[0].innerHTML;
                            }
                        }
                    }
                }
            }
            catch (er) {
                console.log(er);
            }
        }
        let args = {
            app: 'chat',
            model:'Comment',
            method:'get_comments',
        }
        input_data = {
            params: input_data,
            args: args
        }
		this.httpService.get(input_data, on_comments_list,null);
    }
    
    add_item(item, collection, add_type, at_start){
        if(!item.user)
        {
            console.log('Bad item in '+add_type);
            return;
        }
        else
        {
            if(at_start == 1)
            {
                collection.splice(0, 0, item);
            }
            else{
                collection.push(item);
            }
            
        }
    }

	showReplies(id) {
		this.comments.forEach(com => {
			if (com.id === id) {
				if (com['showRep']) {
					com['showRep'] = !com['showRep'];
				} else {
					com['showRep'] = true;
				}
			} else {
				if (com['showRep']) {
					com['showRep'] = !com['showRep'];
				} else {
					com['showRep'] = false;
				}
			}
		});
	}

	commentReply(comment) {
        this.new_reply = '';        
        if(this.active_comment)
            this.active_comment.active = false;
        comment.active = true;
        this.active_comment = comment;        
        setTimeout(function(){
            $('.reply-box:first').focus();
        }, 100);
        
	}

	save_comment(parent_item)
	{
		let obj_this = this;
		let item = {
			res_model: obj_this.res_model,
            res_id: obj_this.res_id,
            res_app: obj_this.res_app,
			subtype_id: obj_this.comment_subtype,
			create_date : new Date(),
            user: obj_this.socketService.user_data,
            user_id:  obj_this.socketService.user_data.id
        };
        if(item.subtype_id == 2)
        {
            item['body'] = obj_this.new_comment;
            obj_this.add_item(item, obj_this.notes, 'created note', 1);
			this.new_comment = '';
        }
        else
        {
            if(parent_item)
            {
                item['parent_id'] = parent_item.id;
                item['body'] = obj_this.new_reply;
                if(!Array.isArray(parent_item.children))
                    parent_item.children = [item]
                else
                {
                    obj_this.add_item(item, parent_item.children, 'cr reply', 0);
                }
                this.new_reply = '';
                item['reply'] = 1;
            }
            else
            {
                item['body'] = obj_this.new_comment;
                obj_this.add_item(item, obj_this.comments, 'created comment', 1);
                this.new_comment = '';
                item['reply'] = false;
            }
        }
        let input_data = {
            args: {
                app: 'chat',
                model: 'Comment',
                method: 'add'
            },
            no_loader: 1,
            params: item
        }
		this.httpService.post(input_data, function(data){
            item['id'] = data.id;
        }, null);
	}

	deleteComment(id, type) {
        let obj_this = this;
        
        let args = {
            app: 'chat',
            model: 'message',
            method: 'unlink'
        }
		let input_data = {
            params: {id: id},
            args: args
        };

        let on_deleted = function(result: any) {
            if (type === 'comment') {
                for (let i = 0; i < obj_this.comments.length; i++) {
                    if (obj_this.comments[i].id === id) {
                        obj_this.comments.splice(i, 1);
                        break;
                    }
                }
            } else if (type === 'note') {

                for (let i = 0; i < obj_this.notes.length; i++) {
                    if (obj_this.notes[i].id === id) {
                        obj_this.notes.splice(i, 1);
                        break;
                    }
                }
            }
            else {
                for (let i = 0; i < obj_this.comments.length; i++) {
                    if (obj_this.comments[i].id === type) {
                        var replies = obj_this.comments[i].children;
                        for (let j = 0; j < replies.length; j++)
                        {
                            if(replies[j].id == id)
                                replies.splice(j, 1);
                        }
                        break;
                    }
                }
            }			
        }
		obj_this.httpService.post(input_data,on_deleted, null);
	}

	cancelComment() {
		this.new_comment = '';
    }
    
	ngOnInit() {
        let obj_this = this;
		let input_data = {
			res_model: obj_this.res_model,
            res_id: obj_this.res_id,
            res_app: obj_this.res_app,
            subtype_id : obj_this.comment_subtype,
			no_loader: 1
        };
        obj_this.get_data(input_data);
        // console.log(3232);
        obj_this.socketService.server_events['comment_received'] = function (data) {
            // console.log(data, 76);
			var container = $('.comments.main-container');
			if(container.length < 1)
			{
				return;
			}
           
            if (obj_this.res_id != data.res_id || obj_this.res_model != data.res_model) {
                return;
            }
            if (data.parent_id) {
                for (var i in obj_this.comments) {
                    if (obj_this.comments[i].id == data.parent_id) {
                        obj_this.add_item(data, obj_this.comments[i].children, 'rec reply', 0);
                        break;
                    }
                }
            }
            else {
                obj_this.add_item(data, obj_this.comments, 'rec comment', 1);
            }
        };
        function remove_notification()
        {
            obj_this.socketService.current_model = obj_this.res_model;
            obj_this.socketService.current_id = obj_this.res_id;
            obj_this.socketService.removeNotification(obj_this.res_app, obj_this.res_model, obj_this.res_id);
        }
        obj_this.socketService.execute_on_verified(remove_notification);

    }
    
	save_comment_key_up(e, parent){

		let obj_this = this;
		if(e.keyCode == 13 && !e.shiftKey){
			e.preventDefault();
			obj_this.save_comment(parent);
		}
	}
}
