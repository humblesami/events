import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {HttpService} from "../../app/http.service";
import {SocketService} from "../../app/socket.service";
import {User, ChatGroup, ChatClient, Message } from '../../app/models/chat';

declare var $: any;

@Component({
	selector: 'app-messenger',
	styleUrls:['./messenger.css'],
	templateUrl: './messenger.component.html'
})
export class MessengerComponent implements OnInit {	    
    socketService : SocketService;
	is_minimize = true;
	chat_initilized = 0;
	searchVal = '';
    is_request_sent = true;
    chat_groups = [];
    
    people_list: Array<User>;
    selectedPeople : Array<User>;

	constructor(
		private sanitizer: DomSanitizer,
		private httpService: HttpService,
		private ss: SocketService) {
		var obj_this = this;
		obj_this.socketService = ss;
        var socketService = ss;

		function registerChatEventListeners()
		{
			socketService.server_events['chat_message_received'] = function (msg) {
                try{
                    //console.log('redifen chat_message_received');
                    obj_this.receiveMessage(obj_this, msg, msg.sender);
                }
                catch(er)
                {
                    console.log(er);
                }
            };
            socketService.server_events['chat_group_created'] = function(data){
                console.log(data);
            };
            var ar = [];
            // obj_this.people_list = new Array<User>();
            for(var key in obj_this.socketService.chat_users)
            {
                var obj = new User(key,
                    obj_this.socketService.chat_users[key].name,
                    obj_this.socketService.chat_users[key].photo)
                ar.push(obj);
            }
            obj_this.people_list = ar;
			if(!obj_this.socketService.user_data)
			{
				console.log("No user data is socket service yet");
				return;
			}
        }
        try{
            ss.execute_on_verified(registerChatEventListeners);
        }
        catch(er)
        {
            console.log(113, er);
        }        
    }
    group_name = '';

    create_chat_room()
    {       
        let obj_this = this; 
        if(!obj_this.group_name)
        {
            console.log('group name required');
            return;
        }
        let input_data= {
            args:{
                app:'chat',
                model:'ChatGroup',
                method:'create'
            },
            params:{
                name: obj_this.group_name,
                members: obj_this.selectedPeople
            }
        }
        obj_this.httpService.post(input_data,function(created_chat_group){
            obj_this.chat_groups.push(created_chat_group);
        }, null);
    }

    
    select_chat_group(selected_group: ChatGroup){
        let obj_this = this;
        this.active_chat_user = selected_group;
        let args = {
            app: 'chat',
            model: 'ChatGroup',
            method: 'get_messages'
        }
        let input_data = {
            params: {group_id: selected_group.id},
            args: args
        };
        var call_on_user_selected_event = function(data){
            if(!Array.isArray(data))
            {
                data = [];
            }
            obj_this.is_request_sent = false;
            obj_this.active_chat_user.messages = [];
            obj_this.onGroupSelected(data);
        }
        input_data['no_loader'] = 1;
        obj_this.httpService.get(input_data, call_on_user_selected_event, call_on_user_selected_event);
    }    
    
	select_chat_user(target_id) {        
        var obj_this = this;     
        if(obj_this.active_chat_user &&  target_id == obj_this.active_chat_user.id)
        {
            return;
        }
        obj_this.attachments = [];        
        
        if(obj_this.socketService.chat_users[target_id])
        {
            obj_this.active_chat_user = obj_this.socketService.chat_users[target_id];
        }        
        else{
            console.log('Invalid firend id '+target_id);
        }
        this.is_minimize = false;
        
        if(!obj_this.active_chat_user)
        {
            console.log("No user selected with "+target_id+' from ',obj_this.socketService.chat_users);
            return;
        }
        // if(obj_this.active_chat_user.messages)
        // {
        //     //obj_this.active_chat_user needed for $( ".msg_card_body") in dom
        //     // but will take some time to make above dom ready, so wait 10 ms please
        //     setTimeout(function(){
        //         obj_this.onUserSelected(obj_this.active_chat_user.messages, 1);
        //     },10)            
        // }
        // else
        {
            let args = {
                app: 'chat',
                model: 'message',
                method: 'get_friend_messages'
            }
            let input_data = {
                params: {target_id: target_id},
                args: args
            };
            var call_on_user_selected_event = function(data){
                if(!Array.isArray(data))
                {
                    data = [];
                }
                obj_this.is_request_sent = false;
                obj_this.active_chat_user.messages = [];
                obj_this.onUserSelected(data);
            }
            input_data['no_loader'] = 1;
            obj_this.httpService.get(input_data, call_on_user_selected_event, call_on_user_selected_event);
        }
	}

	hide_chat_box(){
		$('.friends-chat-box').show();
    }

    show_users_list(){
        let args = {
            method: 'get_attendees_list'
        }
    }

    scroll_to_end(selector)
    {
        if($(selector).length > 0)
        {              
            $(selector).css('visibility', 'hidden');
            setTimeout(function(){
                $(selector).stop().animate({
                    scrollTop: $(selector)[0].scrollHeight
                }, 50, function(){
                    setTimeout(function(){
                        $(selector).css('visibility', 'visible');
                    }, 50)                    
                });
            }, 50);
        }
        else
        {
            console.log('Invalid selector '+selector+' to scroll');
        }
    }

    active_chat_user: ChatClient;

    onGroupSelected(messages, already_fetched = 0) {
        var obj_this = this;
		$( ".msg_card_body").unbind( "scroll" );
		$(".msg_card_body").scroll(function(){
            let scroll_top = $(".msg_card_body").scrollTop();
            if(!obj_this.active_chat_user)
            {
                console.log('Invalid chat user');
                return;
            }
            if(!obj_this.active_chat_user.messages)
            {
                // console.log('No chat user messages');
                obj_this.active_chat_user.messages = [];                
            }
			if(scroll_top < 2){
                get_old_messages();
			}
        });

        function get_old_messages(){            
            obj_this.is_request_sent = false;
            if(obj_this.active_chat_user.read || obj_this.is_request_sent){                    
                return;
            }
            obj_this.is_request_sent = true;
            let params = {
                target_id: obj_this.active_chat_user.id, 
                offset: obj_this.active_chat_user.messages.length
            };

            let args = {
                app: 'chat',
                model: 'message',
                method: 'get_old_messages'
            }
            let input_data = {
                params: params,
                args: args
            };
            let on_success = function(data){
                // console.log(params.offset, data);
                if(data.length > 0) {
                    obj_this.is_request_sent = false;
                    obj_this.update_emjoi_urls(data);
                    obj_this.active_chat_user.messages = data.concat(obj_this.active_chat_user.messages);
                    obj_this.scroll_to_end(".msg_card_body");                    
                }
                else
                {
                    obj_this.active_chat_user.read = true;
                }
            };
            input_data['no_loader'] = 1;
            obj_this.httpService.get(input_data, on_success, null);
        }
        //waiting because [data-emojiable=true] needs to render
        setTimeout(function(){
            var emoji_config = {
                emojiable_selector: "[data-emojiable=true]",
                assetsPath: "/static/assets/emoji/images",
                popupButtonClasses: "far fa-smile"
            };            
            var emojiPicker = new window["EmojiPicker"](emoji_config);
            emojiPicker.discover();
            
            if(already_fetched != 1)
            {
                obj_this.update_emjoi_urls(messages);		     
                obj_this.active_chat_user.messages = messages;
            }
            
            obj_this.socketService.update_unseen_message_count(
                "user-selected",            
                obj_this.active_chat_user.id,
                obj_this.active_chat_user
            );
            
            var emoji_editor = $('.emoji-wysiwyg-editor');            
            emoji_editor.unbind('keyup');            
            emoji_editor.keyup(function(e){                
				if(e.keyCode == 13 && !e.shiftKey)
				{
					obj_this.prepare_message();
				}
				$('.emoji-menu').hide();
            });

            $('#send_btn').unbind('click');
			$('#send_btn').click(function(){
				obj_this.prepare_message();
			});
            obj_this.scroll_to_end(".msg_card_body");	
        },20);        
        $('.friends-chat-box').hide();
        $('.chat-container-wrppaer').show();
    }

	onUserSelected(messages, already_fetched = 0) {        
        var obj_this = this;
		$( ".msg_card_body").unbind( "scroll" );
		$(".msg_card_body").scroll(function(){
            let scroll_top = $(".msg_card_body").scrollTop();
            if(!obj_this.active_chat_user)
            {
                console.log('Invalid chat user');
                return;
            }
            if(!obj_this.active_chat_user.messages)
            {
                // console.log('No chat user messages');
                obj_this.active_chat_user.messages = [];                
            }
			if(scroll_top < 2){
                get_old_messages();
			}
        });	

        function get_old_messages(){            
            obj_this.is_request_sent = false;
            if(obj_this.active_chat_user.read || obj_this.is_request_sent){                    
                return;
            }
            obj_this.is_request_sent = true;
            let params = {
                target_id: obj_this.active_chat_user.id, 
                offset: obj_this.active_chat_user.messages.length
            };

            let args = {
                app: 'chat',
                model: 'message',
                method: 'get_old_messages'
            }
            let input_data = {
                params: params,
                args: args
            };
            let on_success = function(data){
                // console.log(params.offset, data);
                if(data.length > 0) {
                    obj_this.is_request_sent = false;
                    obj_this.update_emjoi_urls(data);
                    obj_this.active_chat_user.messages = data.concat(obj_this.active_chat_user.messages);
                    obj_this.scroll_to_end(".msg_card_body");                    
                }
                else
                {
                    obj_this.active_chat_user.read = true;
                }
            };
            input_data['no_loader'] = 1;
            obj_this.httpService.get(input_data, on_success, null);
        }
        //waiting because [data-emojiable=true] needs to render
        setTimeout(function(){
            var emoji_config = {
                emojiable_selector: "[data-emojiable=true]",
                assetsPath: "/static/assets/emoji/images",
                popupButtonClasses: "far fa-smile"
            };            
            var emojiPicker = new window["EmojiPicker"](emoji_config);
            emojiPicker.discover();
            
            if(already_fetched != 1)
            {
                obj_this.update_emjoi_urls(messages);		     
                obj_this.active_chat_user.messages = messages;
            }
            
            obj_this.socketService.update_unseen_message_count(
                "user-selected",            
                obj_this.active_chat_user.id,
                obj_this.socketService.chat_users[obj_this.active_chat_user.id]
            );
            
            var emoji_editor = $('.emoji-wysiwyg-editor');            
            emoji_editor.unbind('keyup');            
            emoji_editor.keyup(function(e){                
				if(e.keyCode == 13 && !e.shiftKey)
				{
					obj_this.prepare_message();
				}
				$('.emoji-menu').hide();
            });

            $('#send_btn').unbind('click');
			$('#send_btn').click(function(){
				obj_this.prepare_message();
			});
            obj_this.scroll_to_end(".msg_card_body");	
        },20);        
        $('.friends-chat-box').hide();
        $('.chat-container-wrppaer').show();
	}

	send_message(input_data, force_post= false){        
		try{
            let args = {
                app: 'chat',
                model: 'message',
                method: 'send'
            }
            if (force_post)
            {
                args['post'] = 1;
            }
            var on_success = input_data.on_success;
            input_data = {
                params: input_data,
                args: args
            };
            input_data['no_loader'] = 1;
			this.httpService.post(input_data, function(data){
                if(on_success)
                {
                    on_success(data);
                }
            }, null);
		}
		catch(er)
		{
			console.log(er, ' in sending message');
		}
    }
    
    file_change(event)
    {
        let obj_this = this;
        var res = new Promise<any>(function(resolve, reject) {
            window['functions'].get_file_binaries(event.target.files, resolve);
        }).then(function(data){            
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
	prepare_message() {
        var obj_this = this;
        if(!obj_this.active_chat_user)
        {
            console.log('There must be some active user');
            return;
        }
        if(!obj_this.active_chat_user.messages)
        {
            console.log('Chat user must already have messages');
            obj_this.active_chat_user.messages = [];
        }

        var message_content = $('.emoji-wysiwyg-editor').html();
        if(message_content)
        {
            if(message_content.endsWith('<div><br></div>'))
            {
                message_content = message_content.slice(0, -15);
                if(message_content.endsWith('<div><br></div>'))
                {
                    message_content = message_content.slice(0, -15);
                }
			}
            if(message_content){
                message_content = message_content.replace(/^(\s+<br( \/)?>)*|(<br( \/)?>\s)*$/gm, '');
            }
        }

        if (!message_content  && obj_this.attachments.length == 0){                
            $('.emoji-wysiwyg-editor').html('');
            return;
        }

        var date = new Date();
        var components = [
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        ];
        var timestamp = components.join("");
        var input_data = {
            body: message_content,
            uuid : timestamp,
            sender: obj_this.socketService.user_data.id,
            attachments: obj_this.attachments,
			to: obj_this.active_chat_user["id"],
            create_date: new Date(),
            no_loader: 1,
        };

        var force_post = false;
        if(obj_this.attachments.length > 0)
        {
            force_post = true;
            input_data['on_success'] = function(data){                
                let that_message = obj_this.active_chat_user.messages.filter(function(obj){
                    return obj.uuid == data.uuid;
                });
                if(that_message.length > 0)
                {
                    let recent_message = that_message[0];
                    recent_message.attachments = that_message[0].attachments;
                }
                else{
                    console.log('No.. cant lost the message');
                }
            }
        }

        obj_this.send_message(input_data, force_post);
        if(message_content)
        {
            message_content = obj_this.sanitizer.bypassSecurityTrustHtml(message_content);
        }
        input_data.body = message_content;
        let message_obj = new Message(obj_this.active_chat_user,message_content, Date(), obj_this.attachments);
        obj_this.active_chat_user.messages.push(message_obj);        
        $('.emoji-wysiwyg-editor').html("");        
        obj_this.attachments = [];
		obj_this.scroll_to_end(".msg_card_body");
    }
    
	receiveMessage(obj_this, message, sender_id) {        
        let sender = obj_this.socketService.chat_users[sender_id];
        if(!sender)
        {
            console.log(obj_this.socketService.chat_users, ' Dev issue as '+sender_id+' not found');
            return;
        }
        if(message.body)
        {
            message.body = obj_this.sanitizer.bypassSecurityTrustHtml(message.body);
        }
		// var is_chat_open = obj_this.active_chat_user &&
		// 	obj_this.active_chat_user.id == sender_id &&
		// 	!this.is_minimize;
		var active_uid = parseInt($(".active_chat_user_id").html());
		var is_chat_open = $(".msg_card_body").length >0 &&
		active_uid == sender_id;
        
		if(!sender.messages)
		{
			sender.messages = [];
		}
        sender.messages.push(message);
        obj_this.socketService.update_unseen_message_count("receive-new-message", sender_id, sender);
		if (is_chat_open) {
            let args = {
                app: 'chat',
                model: 'message',
                method: 'mark_read'
            }
            let input_data = {
                params: {message_id: message.id},
                args: args
            };
            input_data['no_loader'] = 1;
			obj_this.httpService.post(input_data, null, null);

            obj_this.socketService.update_unseen_message_count("read-new-message", sender_id, sender);            
            setTimeout(function(){
                obj_this.scrollToEnd();
            }, 200)
		}
    }    
    
    update_emjoi_urls(messages)
    {
        var obj_this = this;
        
        {
            messages.forEach(element => {
                if(element.body)
                {
                    element.body = obj_this.sanitizer.bypassSecurityTrustHtml(element.body);
                }
            });
        }
    }

    odoo_build = window['odoo'] ? 1 : undefined;
	is_mobile_device = false;
    ng_init = false;    

    remove_attachment(el){        
        let obj_this = this;                
        var i = $(el.target).closest('#attach_modal .doc-thumb').index();        
        obj_this.attachments.splice(i, 1);        
    }

    attachments = [];

	ngOnInit() {        
        var obj_this = this;
        for(var key in obj_this.socketService.chat_users)
        {
            obj_this.socketService.chat_users[key].messages = undefined;
        }
        $('.chat-container-wrppaer').hide();
        obj_this.is_mobile_device = true;
        $('.popup.messenger').hide();
        // this.exampleData = [
        //     {
        //     id: 'basic1',
        //     text: 'Basic 1'
        //     },
        //     {
        //     id: 'basic2',
        //     disabled: true,
        //     text: 'Basic 2'
        //     },
        //     {
        //     id: 'basic3',
        //     text: 'Basic 3'
        //     },
        //     {
        //     id: 'basic4',
        //     text: 'Basic 4'
        //     }
        // ];
    }

    ngOnDestroy() {
        this.active_chat_user = undefined;
        // this.socketService.server_events['chat_message_received'] = function(){
        //     //alert(34233434);
        // };

    }
}