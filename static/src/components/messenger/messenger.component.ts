import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {HttpService} from "../../app/http.service";
import {SocketService} from "../../app/socket.service";
import { ChatGroup, ChatClient, Message, ChatUser } from '../../app/models/chat';

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
    people_list: Array<ChatUser>;
    selectedPeople : Array<ChatUser>;

	constructor(
		private sanitizer: DomSanitizer,
		private httpService: HttpService,
		private ss: SocketService) {
		var obj_this = this;
		obj_this.socketService = ss;
        var socketService = ss;

        function cast_list_chat_users(ar: Array<ChatUser>){
            obj_this.people_list = ar;
        }

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

            socketService.server_events['chat_group_members_updated'] = function(data){
                var index = -1;
                var all_groups = obj_this.socketService.chat_groups;
                for(var i =0; i < all_groups.length; i++)
                {
                    if(all_groups[i].id == data.id)
                    {
                        index = i;
                        break;
                    }
                }
                if(index == -1)
                {
                    console.log('members added in valid group', data, obj_this.socketService.chat_groups);
                    obj_this.on_messge_from_new_group(data.id);
                    return;
                }
                var group = undefined;
                if(obj_this.active_chat_user.is_group && obj_this.active_chat_user.id == data.id)
                {
                    group = obj_this.active_chat_user as ChatGroup;                    
                }
                else
                {
                    group = obj_this.socketService.chat_groups[index];
                }
                for(var j=0;j<data.members.length;j++)
                {
                    group.members.push(data.members[i]);
                }
            }

            socketService.server_events['group_chat_message_received'] = function(msg){
                try{
                    //console.log('redifen chat_message_received');
                    obj_this.receiveGroupMessage(obj_this, msg, msg.sender);
                }
                catch(er)
                {
                    console.log(er);
                }
            };
            var ar = [];
            obj_this.people_list = new Array<ChatUser>();            
            for(var key in obj_this.socketService.chat_users)
            {
                let obj_user = obj_this.socketService.chat_users[key] as ChatUser;                
                obj_this.people_list.push(obj_user);
            }
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

    scrollToEnd(){
        $('.msg_card_body').scrollTop($('.msg_card_body')[0].scrollHeight);
    }

    group_name = '';
    group_moderator = false;
    group_details:ChatGroup;    
    
    show_member_list(chat_group=undefined, call_back=undefined){
        let obj_this = this;
        if(chat_group)
        {
            obj_this.active_chat_user = chat_group;
        }
        obj_this.group_details = obj_this.active_chat_user as ChatGroup;
        obj_this.group_details.show_members = true;
        let input_data = {
            args:{
                app:'chat',
                model:'ChatGroup',
                method:'get_details'
            },
            params: {
                group_id: obj_this.active_chat_user.id
            }
        }
        obj_this.httpService.post(input_data, function(data){
            obj_this.group_moderator = obj_this.socketService.user_data.id == data.created_by.id;
            obj_this.active_chat_user = obj_this.group_details = data;
            var all_chat_groups = obj_this.socketService.chat_groups;
            for(var n=0; n< all_chat_groups.length; n++)
            {
                if(all_chat_groups[n].id == data.id)
                {
                    all_chat_groups[n] = data;
                }
            }
            if(call_back)
            {
                call_back(data);
            }
        } , function(){
            console.log('Group members not fetched');
        });        
    }

    close_group_setup()
    {
        $('.chat-group-setup').hide();
    }

    
    leave_group(){
        let obj_this = this;
        let input_data = {
            args:{
                app:'chat',
                model:'ChatGroup',
                method:'remove_member'
            },
            params: {
                group_id: obj_this.active_chat_user.id,
                member_id: obj_this.socketService.user_data.id
            }
        }
        obj_this.httpService.post(input_data, function(data){                        
            var all_groups = obj_this.socketService.chat_groups;
            for(var i =0; i < all_groups.length; i++)
            {
                if(all_groups[i].id == input_data.params.group_id)
                {
                    all_groups.splice(i, 1);
                    break;
                }
            }
            obj_this.active_chat_user = undefined;
            obj_this.selected_chat_group = undefined;
            $('.chat-container-wrppaer').hide();
            $('.chat-setup-container').show();
            $('.contacts-container').show();
        } , function(){
            console.log('Group members not fetched');
        });
    }

    close_members_list(){
        this.group_detail_mode = 0;
        this.group_details.show_members = false;        
    }    

    create_chat_room()
    {
        $('.chat-group-setup').hide();
        let obj_this = this;
        obj_this.group_detail_mode = 1;
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
            obj_this.socketService.chat_groups.push(created_chat_group);
            created_chat_group.created_by = obj_this.socketService.user_data;
        }, function(){
            $('.chat-group-setup').show();
        });
    }
    
    
    select_chat_group(selected_group: ChatGroup, e){
        let obj_this = this;        
        obj_this.group_detail_mode = 1;
        if(e && e.target && $(e.target).hasClass('setup'))
        {
            return;
        }        
        if(!selected_group.is_group)
        {
            selected_group.is_group = true;
        }
        obj_this.active_chat_user = selected_group;
        // console.log(obj_this.active_chat_user, 155);
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

    can_edit_group: Boolean;
    group_detail_mode = 0;
    selected_chat_group: ChatGroup;
    show_group_setup(group: ChatGroup, e){
        let obj_this = this;
        obj_this.group_detail_mode = 1;
        obj_this.can_edit_group = false;
        if(!group)
        {
            $('.chat-group-setup').show();            
            $('.chat-group-setup').find('.group-name:first').removeAttr('readonly').val('').focus();
            obj_this.selectedPeople = []; 
            obj_this.can_edit_group = true;
            obj_this.selected_chat_group = undefined;
            return;
        }
        obj_this.can_edit_group = group.created_by && group.created_by.id == obj_this.socketService.user_data.id;
        function on_group_setup_shown(){
            obj_this.selected_chat_group = group;
            let my_id = obj_this.socketService.user_data.id;
            obj_this.selectedPeople = group.members.filter(function(item){
                return item.id != my_id;
            });
            $('.chat-container-wrppaer').show();
            $('.chat-group-setup').show();
            $('.chat-group-setup').find('.group-name:first').attr('readonly', 'readonly').val(group.name);
        }

        if(group.members.length == 0)
        {
            $('.chat-container-wrppaer').hide();
            obj_this.show_member_list(group, function(data: ChatGroup){
                group = data;
                on_group_setup_shown();
            });
        }
        else{
            obj_this.selectedPeople = group.members;
            on_group_setup_shown();
        }
    }

    update_chat_group_members(){
        let obj_this = this;
        let input_data= {
            args:{
                app:'chat',
                model:'ChatGroup',
                method:'update_members'
            },
            params:{
                group_id: obj_this.selected_chat_group.id,
                members: obj_this.selectedPeople
            }
        }
        obj_this.httpService.post(input_data,function(){
            obj_this.selected_chat_group.members = obj_this.selectedPeople;
            obj_this.selected_chat_group = undefined;
            obj_this.group_detail_mode = 0;
        }, function(){
            $('.chat-group-setup').show();
        });
    }
    
	select_chat_user(target_id) {        
        var obj_this = this;
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
        this.active_chat_user = undefined;
		$('.friends-chat-box').show();
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
                get_group_old_messages();
			}
        });

        function get_group_old_messages(){
            if(obj_this.active_chat_user.messages.length < 5)
            {
                return;
            }
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
                get_user_old_messages();
			}
        });	

        function get_user_old_messages(){
            if(obj_this.active_chat_user.messages.length < 5)
            {
                return;
            }
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
        let obj_this = this;     
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
            if(obj_this.active_chat_user.is_group)
            {
                input_data.group_id = obj_this.active_chat_user.id;
                delete input_data['to'];
            }
            var on_success = input_data.on_success;
            input_data = {
                params: input_data,
                args: args
            };
            input_data['no_loader'] = 1;
			obj_this.httpService.post(input_data, function(data){
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
			to: obj_this.active_chat_user.id,
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
        let obj_message = {
            id: null,
            from: obj_this.active_chat_user,
            body: message_content,
            date_time: Date(),
            sender: input_data.sender,
            attachments: obj_this.attachments,
            uuid: input_data.uuid
        }
        let message_obj = obj_this.cast_message(obj_message);
        // console.log(obj_message, 1333);
        obj_this.active_chat_user.messages.push(message_obj);        
        $('.emoji-wysiwyg-editor').html("");        
        obj_this.attachments = [];
		obj_this.scroll_to_end(".msg_card_body");
    }

    cast_message(message: Message){
        return message;
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
		var is_chat_open = $(".msg_card_body").length >0 && active_uid == sender_id;
        
		if(!sender.messages)
		{
			sender.messages = [];
		}
        sender.messages.push(message);
        obj_this.socketService.update_unseen_message_count("receive-new-message", sender);
		if (is_chat_open) {
            let args = {
                app: 'chat',
                model: 'message',
                method: 'mark_read_message'
            }
            let input_data = {
                params: {message_id: message.id},
                args: args
            };
            input_data['no_loader'] = 1;
			obj_this.httpService.post(input_data, null, null);

            obj_this.socketService.update_unseen_message_count("read-new-message", sender);            
            setTimeout(function(){
                obj_this.scrollToEnd();
            }, 200)
		}
    }

    on_messge_from_new_group(group_id){
        let obj_this = this;
        let args = {
            app: 'chat',
            model: 'ChatGroup',
            method: 'get_details'
        }
        let input_data = {
            params: {group_id: group_id},
            args: args
        };
        input_data['no_loader'] = 1;        
        obj_this.httpService.post(input_data, function(data){
            obj_this.socketService.chat_groups.push(data);
        }, null);
    }

    receiveGroupMessage(obj_this, message, sender) {    
        try{
            console.log('group message', message.sender , obj_this.socketService.user_data.id);            
            if(message.sender == obj_this.socketService.user_data.id)
            {
                return;
            }
            if(!message.chat_group_id)
            {
                console.log('Invalid group id in message');
                return;
            }
            let temp = obj_this.socketService.chat_groups.filter(function(item){
                return item.id == message.chat_group_id;
            });
            if(temp.length == 0)
            {
                obj_this.on_messge_from_new_group(message.chat_group_id);
                return;
            }
            let group = temp[0];
            if(message.body)
            {
                message.body = obj_this.sanitizer.bypassSecurityTrustHtml(message.body);
            }
            // var is_chat_open = obj_this.active_chat_user &&
            // 	obj_this.active_chat_user.id == sender_id &&
            // 	!this.is_minimize;
            var active_gid = undefined;
            if (obj_this.active_chat_user && obj_this.active_chat_user.is_group)
            {
                active_gid = obj_this.active_chat_user.id;
            }
            var is_chat_open = $(".msg_card_body").length >0 && active_gid == message.chat_group_id;            
            if(!group.messages)
            {
                group.messages = [];
            }
            group.messages.push(message);
            
            obj_this.socketService.update_unseen_message_count("receive-new-message", group);
            if (is_chat_open) {
                let args = {
                    app: 'chat',
                    model: 'message',
                    method: 'mark_read_message'
                }
                let input_data = {
                    params: {message_id: message.id},
                    args: args
                };
                input_data['no_loader'] = 1;
                obj_this.httpService.post(input_data, null, null);
    
                obj_this.socketService.update_unseen_message_count("read-new-message", group);            
                setTimeout(function(){
                    obj_this.scrollToEnd();
                }, 200)
            }
        }
        catch(er){
            console.log(er);
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
        // for(var key in obj_this.socketService.chat_users)
        // {
        //     obj_this.socketService.chat_users[key].messages = undefined;
        // }
        $('.chat-container-wrppaer').hide();
        obj_this.is_mobile_device = true;
        $('.popup.messenger').hide();        
    }

    ngOnDestroy() {
        this.active_chat_user = undefined;
        // this.socketService.server_events['chat_message_received'] = function(){
        //     //alert(34233434);
        // };

    }
}