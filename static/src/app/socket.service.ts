import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
declare var $;

@Injectable()
export class SocketService {
    
    io: any;
    socket:any;
    user_data:any;
    chat_users = {};    
    server_url = '';
    media_url = '';
    user_photo = '';    
    on_verified = [];
    verified = false;
    iframe_url = true;
    current_route = '';
    not_public_url = 0;
    server_events = {};
    unseen_messages = 0;
    keys_chat_users = [];
	notificationList = [];
    current_id = undefined;	      
    site_config = undefined;
    current_model = undefined;
    video_call : any;
    ongoing_call : any;
    rtc_multi_connector : any;
    constructor(private router: Router, route: ActivatedRoute) {                
        var obj_this = this;
        obj_this.video_call = {
            id: undefined,
            message: undefined,
            caller : undefined,
            callee: undefined,
            timeout: 21000,
            init: function(uid){
                let video_call = this;
                if(!obj_this.chat_users[uid].online)
                {
                    video_call.show_notification(obj_this.chat_users[uid].name +' is not online yet, but will be informed when online')
                    return;
                }
                let call_id = obj_this.user_data.id+'-'+uid+'-call';                
                video_call.caller = obj_this.user_data;
                video_call.callee = obj_this.chat_users[uid];
                video_call.id = call_id; 
                let data =  {
                    caller_id: obj_this.user_data.id,
                    callee_id: uid,
                    call_id : call_id
                };

                // console.log(video_call.caller, video_call.callee);
                if(obj_this.chat_users[uid].online){
                    obj_this.emit_rtc_event('incoming_call', data, [uid]);                    
                    video_call.message = 'Calling...';
                }
                else
                {
                    video_call.message = "Called person is not online but will be informed about your call when he/she will be online";                    
                }
                video_call.state = 'outgoing';
                video_call.initialize();                
                
                
                setTimeout(function(){
                    // console.log(video_call.state, video_call.callee.id, 727);
                    if(video_call.state == 'outgoing')
                    {
                        video_call.cancel('Not available');
                    }
                }, video_call.timeout);
            },

            initialize: function(){
                this.maximize();
                $('#rtc-container').show();                
            },
            
            show_incoming_call: function(data){                
                var video_call = this;
                if(obj_this.ongoing_call || video_call.state != 'available')
                {
                    video_call.show_notification('Another incoming call');
                    return;
                }
                // console.log(data, 1334);
                video_call.state = 'incoming';
                video_call.id = data.call_id;
                video_call.caller = obj_this.chat_users[data.caller_id];
                video_call.callee = obj_this.user_data;
                video_call.initialize();
            },

            incoming_call : undefined,
            state: 'available',

            accept: function(){
                var data = { 
                    user_id: obj_this.user_data.id
                };
                var video_call = this;
                obj_this.emit_rtc_event('accepted', data, [video_call.caller.id]);
                video_call.state = 'accepted';
                video_call.message = 'Connecting caller';
            },

            accepted: function(data){
                this.start_for_me(data);
            },

            start_for_me: function(data){
                // console.log(data, 156);
                var video_call = obj_this.video_call;
                video_call.state = 'ongoing';
                if(!video_call.id)
                {
                    console.log(video_call.state, 'Invalid call id, it must has been alreasy set');
                    // console.log(video_call, video_call.incoming);
                    return;
                }
                
                var params = {
                    uid: obj_this.user_data.id,
                    room: video_call.id,
                    token: obj_this.user_data.token
                };    
                // console.log(params, 1577);
                if(!obj_this.rtc_multi_connector)
                {
                    obj_this.rtc_multi_connector = window['video_caller'];
                }
                obj_this.ongoing_call = video_call.id;
                // console.log(obj_this.rtc_multi_connector, 190);

                var on_started = undefined;
                if(video_call.caller.id == params.uid)
                {
                    on_started = function(){
                        // console.log(data, 14);
                        if(data)
                        {
                            data = {
                                create_time: Date(), 
                                room: video_call.id,
                                user_id: data.user_id
                            }
                            // console.log(data, 14889);
                            obj_this.emit_rtc_event('started_by_caller', data, [data.user_id]);
                        }
                    }
                }                               
                obj_this.rtc_multi_connector.init(params, on_started);
                $('#ongoing_controls').show();
            },

            started_by_caller: function(data){
                let video_call = this;
                video_call.start_for_me(data);
            },
            
            same: function(val){
                return val;
            },

            cancel: function(){
                let video_call = this;
                // console.log('Cancelling', this.caller.id, this.callee.id);
                obj_this.emit_rtc_event('cancelled', '', [video_call.callee.id]);
                this.quit();
            },

            cancelled: function(data){
                // console.log('Cancelled', this.caller.id, this.callee.id);
                this.quit();
            },

            reject: function(){
                var video_call = this;
                var data = { message: 'Sorry busy'};
                if(!video_call.caller.id)
                {
                    console.log('No caller id to send in reject');
                }
                obj_this.emit_rtc_event('rejected', data, [video_call.caller.id]);
                this.quit();
            },

            rejected: function(data){
                if(this.state == 'outgoing')
                {
                    this.show_notification('User is busy, try later');
                }
                else
                {
                    console.log(this.state, ' Not calling how cancelled');
                }
                this.quit(data.message);
            },

            terminate: function(){
                // console.log('Do terminate');
                var data = { 
                    user_id: obj_this.user_data.id, 
                    room_id: this.id
                };
                obj_this.socket.emit('call_terminated', data);
                // console.log(obj_this.ongoing_call, this, 568);
                this.quit('terminating');
            },

            terminated: function(data){
                if(obj_this.ongoing_call)
                {
                    console.log('Leaving now');
                    // console.log(obj_this.ongoing_call, this, 189);
                    this.quit();
                }
                else
                {
                    console.log('Already left');
                }
            },

            quit: function(request_type){                
                let video_call = this;   
                // console.log(obj_this.ongoing_call, request_type, 193);
                if(obj_this.ongoing_call && request_type != 'terminating')
                {
                    video_call.terminate();
                }
                video_call.caller = undefined;
                video_call.callee = undefined;
                if(obj_this.ongoing_call)
                {
                    try{
                        obj_this.rtc_multi_connector.end_call();
                        obj_this.rtc_multi_connector.socket.disconnect();                        
                    }
                    catch(er)
                    {
                        console.log('error in rtc end call', er);
                    }                    
                }
                
                obj_this.video_call.state = 'available';                
                obj_this.ongoing_call = undefined;                 
                $('#videos-container').html('');
                $('#ongoing_controls').hide();
                $('#rtc-container').hide();
            },

            minimize: function(){
                $('#rtc-container').removeClass('full').addClass('min');
                window['rtc-call-max'] = undefined;
            },
            maximize: function(){
                $('#rtc-container').removeClass('min').addClass('full');
                window['rtc-call-max'] = 1;
            },

            show_notification: function(message){
                window['bootbox'].alert(message);
            },
        };
        
        if(!window['socket_manager'])
        {
            window['socket_manager'] = obj_this;            
        }
        this.site_config = window['site_config'];
        this.server_url = this.site_config.server_base_url;
        this.media_url = this.server_url + '/media';
        this.user_photo = this.media_url + '/profile/ETjUSr1v2n.png';
        var url = window['pathname'];
        var res = window['public_routes'].indexOf(url);
        if(res == -1)
        {            
            try
            {
                var user_cookie = localStorage.getItem('user');                
                let cuser = undefined;
                if(user_cookie)
                {
                    cuser = JSON.parse(user_cookie);
                }
                else
                {
                    window['functions'].go_to_login();
                    return;
                }
                if(cuser && cuser.token)
                {
                    obj_this.connect_socket(cuser);
                }
                else
                {
                    window['functions'].go_to_login();
                    return;
                }
            }
            catch(er)
            {
                console.log('Failed socket exception ',er)
            }
        }
        else
        {
            $('#main-div').show();
        }
    }

    connect_socket(authorized_user){
        var obj_this = this;
        if(!authorized_user)
        {            
            console.log('Not authorized');
            return;
        }
        let me = {
            id:authorized_user.id,
            group: undefined
        }
        if(authorized_user.groups.length > 0)
        {
            me.group = authorized_user.groups[0].name;
        }
        console.log(me);
        $('#main-div').show();
        for(var i = 0; i < authorized_user.groups.length; i++){
            if( authorized_user.groups[i].name == 'Admin'){
                authorized_user.is_admin = 1;
                break;
            }
        }
        obj_this.user_data = authorized_user;       

        let complete_server_url = obj_this.site_config.chat_server+'/sio';
        obj_this.socket = window['io'].connect(complete_server_url,{
            reconnection: false,
            transports: ['websocket'],
            reconnectionDelay: 2000,
            reconnectionDelayMax : 5000,
            reconnectionAttempts: 2,
        }).on('connect_error', function (err) {
            console.log('Socket connection failed '+complete_server_url+' please run socket server is up');
        });
                   
        obj_this.socket.on('connect',function(){
            obj_this.socket.off('server_event');            
            authorized_user.socket_id = obj_this.socket.id;
            var socket_error = "Socket connection not established at "+ obj_this.site_config.chat_server + ' because ';            
            var options = {
                url: obj_this.site_config.chat_server+'/verify_socket',
                data: authorized_user,
                success: function(data){
                    if(data && !data.error)
                    {
                        socket_error = '';
                        onAuthenticated(data.data);
                    }
                    else if(data.error)
                    {
                        // obj_this.user_data = undefined;
                        console.log(data.error+' for ', authorized_user);
                        socket_error += data.error;
                    }
                    else
                    {
                        socket_error += ' no response';
                    }
                },
                error:function(a, b){
                    socket_error += b.responseText;             
                },
                complete:function(){
                    if(socket_error)
                    {
                        console.log(socket_error);
                    }                    
                }
            };
            $.ajax(options);

            function onAuthenticated(data) {
                if(data.message)
                {
                    console.log(data.message.error);
                }
                if(data.user && data.friends)
                {
                    
                }
                else{
                    console.log('invalid user data ', data);
                    return;
                }
                console.log("Authenticated\n\n");
                obj_this.user_data.photo = data.user.photo;
                obj_this.user_photo = obj_this.server_url + data.user.photo;
                obj_this.verified = true;
                if(!data.unseen && data.unseen != 0)
                {
                    data.unseen = 0;
                    console.log('Please ask to add unseen attribute from service developer of get_user_data');
                }
                obj_this.unseen_messages = data.unseen;
                var chat_user_keys = [];
                for(var c in data.friends)
                {
                    chat_user_keys.push(c);
                }
                obj_this.chat_users = data.friends;                
                obj_this.keys_chat_users = chat_user_keys;
                // console.log(obj_this.chat_users, 4509);

                obj_this.notificationList = [];
                for(let i in data.list)
                {
                    obj_this.add_item_in_notification_list(data.list[i], null);
                }
                // console.log(1111, obj_this.notificationList);
                obj_this.notificationList = obj_this.notificationList.reverse();
                obj_this.registerEventListeners();
                for(let i in obj_this.on_verified)
                {
                    obj_this.on_verified[i]();
                }
                obj_this.on_verified = [];
            };
            obj_this.socket.on('server_event', function(res){
                try{
                    // console.log(res.name);
                    if(!obj_this.server_events[res.name])
                    {
                        if(!obj_this.verified)
                        {
                            obj_this.execute_on_verified(function(){
                                obj_this.server_events[res.name](res.data);
                            });
                        }
                        else
                        {
                            console.log('Not handeled ', res.name);
                        }
                    }                                
                    else
                        obj_this.server_events[res.name](res.data);
                    
                }
                catch(er)
                {                            
                    console.log(er.message, ' in '+res.name+' with data ', res);
                }
            });
        });        
    }

    execute_on_verified = function(method){        
        if(this.verified)
            method();
        else
        {
            this.on_verified.push(method);
        }
    }

    update_unseen_message_count(event, target_id, target) {        
        if(!target)
        {
            console.log('Selection failed for id='+target_id, target);
            return;
        }
        if(!target.unseen && target.unseen != 0)
        {
            target.unseen = 0;
            console.log('Please ask to add unseen attribute for each friend from service developer of get_user_data');
        }
		var inc = 0;
        var obj_this = this;        		
		try {			
            switch (event) {
                case "receive-new-message":
                    inc = 1;
                    break;
                case "read-new-message":
                    inc = -1;                                        
                    break;                
				case "user-selected":
					inc = target.unseen * -1;					
                    break;
            }
            
            target.unseen = target.unseen + inc;
			obj_this.unseen_messages = obj_this.unseen_messages + inc;

            if (obj_this.unseen_messages >= 1) {
				$('.un-read-msg.count').show();
			}
			else if (obj_this.unseen_messages <= 0) {
				$('.un-read-msg.count').hide();
			}
		} catch (er) {
			console.log("update message count err no ", er);
		}
    }    

	registerEventListeners(){
        var obj_this = this;
        var bootbox = window["bootbox"];

        obj_this.server_events['meeting_started'] = function (res) {
            bootbox.alert(res);
        };

        obj_this.server_events['notification_received'] = function (res) {             
            obj_this.add_item_in_notification_list(res, 1);            
        };
        
        obj_this.server_events['notification_updated'] = function (res) {
            console.log('notifications updated')
        };

        obj_this.server_events['incoming_call'] = function (data){
            obj_this.video_call.show_incoming_call(data);
        };
        obj_this.server_events['cancelled'] = function(data){
            obj_this.video_call.cancelled(data);
        };        
        obj_this.server_events['call_terminated'] = function(data){
            obj_this.video_call.terminated(data);
        };
        obj_this.server_events['rejected'] = function(data){
            obj_this.video_call.rejected(data);
        };
        obj_this.server_events['accepted'] = function(data){
            obj_this.video_call.accepted(data);
        };
        obj_this.server_events['started_by_caller'] = function(data){
            obj_this.video_call.started_by_caller(data);
        };
        
        
        

        function updateUserStatus(user)
        {
            if(obj_this.user_data.id == user.id)
            {
                console.log(user , "Should never happen now");
                return;
            }
            if(!obj_this.chat_users[user.id])
            {
                console.log(user.id + ' not found in list -- ', obj_this.chat_users);
                return;
                //pending to add this user in list
            }
            else
            {
                obj_this.chat_users[user.id].online = user.online;
            }
        }

        obj_this.server_events['friend_joined'] = updateUserStatus;

        obj_this.server_events['user_left'] = updateUserStatus;

        obj_this.server_events['new_friend'] = function(friend){
            obj_this.chat_users[friend.id] = friend;
            obj_this.keys_chat_users.push(friend.id);
        }
        obj_this.server_events['friend_removed'] = function(friend_id){
            for(var i=0;i<obj_this.keys_chat_users.length;i++)
            {
                if(obj_this.keys_chat_users[i] == friend_id)
                {
                    obj_this.keys_chat_users.splice(i, 1);
                    break;
                }
            }
            delete obj_this.chat_users[friend_id];
        }
        

        obj_this.server_events['error'] = function (res) {
            if(res == 'Invalid Token')
            {
                console.log('Unauthorized due to invalid token');
                window["current_user"].go_to_login();
                return;
            }
            else
                console.log("Error from chat ", res);
        };

        obj_this.server_events['force_log_out'] = function (res) {
            var href = window.location.toString();
            if(href.indexOf('172.16') == -1 || href.indexOf('localhost') == -1)
            {
                window["current_user"].go_to_login();
                return;
            }
        };

        obj_this.server_events['chat_message_received'] = function (msg) {
            let sender = obj_this.chat_users[msg.sender];
            if(!sender)
            {
                console.log(obj_this.chat_users, ' Dev issue as '+msg.sender+' not found');
                return;
            }
            obj_this.update_unseen_message_count("receive-new-message", msg.sender, sender);

        };

        obj_this.server_events['point_comment_received'] = function (data) {
            window['on_annotation_comment_received'](data);
        };
    };

    emit_rtc_event(event_name, data, audience)
    {
        data = {
            name: event_name,
            audience: audience,
            data: data
        }
        this.socket.emit('client_event', data);
    }

	emit_server_event(input_data, args) {
        try{
            var options =
            { 
                data:{
                    params: input_data,
                    args : args
                }
            }             
            window['dn_rpc_object'](options);
        }
        catch(er)
        {
            console.log(er)
        }        
	}

    init_route(url){
        this.not_public_url = 0;
        this.current_route = url;
        this.current_id = undefined;
        this.current_model = undefined;
        this.notificationList.forEach(function(el, i){
            el.active = undefined;
        });
    }

    activate_notification(){

    }

    find_notification_index(res_model, res_id) {
        let index = -1;
        for(let i in this.notificationList){
            let item_in_list = this.notificationList[i];
            if(item_in_list.res_model == res_model && item_in_list.res_id == res_id)
            {
                index = parseInt(i);
                break;
            }
        }
        return index;
    }

	removeNotification(res_app, res_model, res_id){        
		if(!this.verified)
			return;
		let index = -1;
		let active_item = undefined;
		for(let i in this.notificationList){
            let item = this.notificationList[i];
			item.active = false;
			if(item.res_model == res_model && item.res_id == res_id) {
				active_item = item;
                index = parseInt(i);                
			}
        }        
		if(!active_item)
			return;
    	
        let input_data = {
            no_notify:1,
            res_model: res_model,
            res_id:res_id,
            res_app: res_app
        }
        if(active_item.counter > 0)
        {
            let args = {
                app: 'chat',
                model: 'Notification',
                method: 'update_counter'
            };
            this.emit_server_event(input_data, args);
        }            
        this.remove_item_from_notification_list(index);
    }
    
    add_item_in_notification_list(item, on_receive) {
        var obj_this = this;
        try{
            if(!item.body)
            {
                console.log(item, ' no body');
                return;
            }
            item.body = item.body.trim();
            if(item.body.length == 0)
            {
                console.log('Not notif text in',item);
                return;
            }
        }
        catch(er){
            console.log(er, 'Invalid notif text '+item.body);
            return;
        }
        
        let route = obj_this.model_routes[item.address.res_app][item.address.res_model];        
        
        if (item.address.parent_post_id){
            route += item.address.parent_id+'/';
        }
        item.client_route = route + item.address.res_id;
        item.counter = 1;
        if(on_receive)
        {
            for(var i in obj_this.notificationList)
            {
                if(item.id == obj_this.notificationList[i].id)
                {
                    obj_this.notificationList[i].text = item.text;
                }
            }
        }
        else{
            obj_this.notificationList.push(item);
        }
    }

    remove_item_from_notification_list(i) {
        this.notificationList.splice(i, 1);
    }

    get_param(name, url)
    {
        try{
            if (!url) url = location.href;
            name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
            var regexS = "[\\?&]"+name+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var results = regex.exec( url );
            var result = results[1];
            return result;
        }
        catch(er){
            return '';
        }	
    }

    model_routes = {
        'meetings':{
            'Event':'/meeting/',
            'MeetingDocument':'/annotation/doc/',
            'AgendaDocument':'/annotation/doc/'
        },
        'voting':{
            'Voting':'/voting/'
        },
        'annotation':{
            'Point': '/annotation/doc/discussion'
        }
    }
    
    close_socket(){        
        var socket = window['socket_manager'].socket;
		if(socket && socket.connected){
			socket.disconnect();
			socket = false;
        }
        this.user_data = undefined;
    }
}
