var closeChatbox = function() {
        $('.chatbox').css('display', 'none');

    }

var maxiChatbox = function(){
    $('.chatbox').css('margin', '0');
    $('.maxi-chat').css('display', 'none');
    $('.mini-chat').css('display', 'block');
}

var minimChatbox = function() {
        $('.maxi-chat').css('display', 'block');
        $('.mini-chat').css('display', 'none');
        $('.chatbox').css('margin', '0 0 -382px 0');
    }

$(function(){
    var check = 0;
    var socket = undefined;
    var users = undefined;
    var active_user = undefined;
    var sendMessage = undefined;

    if($('.dn-chatter').length > 1){
        $('.dn-chatter:first').remove();

    }

    var populate_user_list = function(user){
        var child = '<li id="' + user.id + '" class="open-chatbox list-group-item"><span>'+ user.name + '</span></li>';
        $('#online-users-list:first ul:first').append(child);
    }

    var remove_user_from_list = function(user){
        var id = '#'+user.id;
        $(id).remove();
    }

    var receiveMessage = function(msg, sender_id) {
        if(!users[sender_id]['messages'] || users[sender_id]['messages'].length == 0)
            users[sender_id]['messages'] = [];
		    users[sender_id]['messages'].push(msg);
		if(active_user && active_user.id == sender_id){
            var li_obj = '<li class="sent"><p>' + msg.content + '</p></li>';
            $('#chat_list').append(li_obj);
			$(".smartchatbox").scrollTop($(".smartchatbox")[0].scrollHeight);
		}
	}

    $(document).on('mousedown','.o_menu_sections:first a[data-menu-xmlid="meeting_point.chat_menu"]:first', function(){
        if(check != 1)
        {
            $(this).removeAttr("href").removeAttr("data-target").removeAttr("data-toggle").removeAttr("data-action-id").removeAttr("data-action-model").removeAttr("data-menu").css('cursor','pointer');
            check = 1;
        }
        $('#online-users-list').css('display', 'block');
    });

    function create_msg_obj(msg){
        var msg_obj = {
            content : msg,
            sender : odoo.session_info.uid,
            to : active_user.id
        }
        return msg_obj;
    }

    socket = io('http://172.16.21.43:3000',{
        'reconnection': true,
        'reconnectionDelay': 2000,
        'reconnectionDelayMax' : 5000,
        'reconnectionAttempts': 2
    });

    socket.on('connect',function(){
        console.log('Socket server connected...');

        socket.emit('verify', {
            "token": odoo.session_info.token,
            "name": odoo.session_info.username,
            "id": odoo.session_info.uid,
            "db": odoo.session_info.db
        });

        socket.on('online_users', function(online_users){
            if(!users){
                users = {};
            }
            users = online_users;
            console.log(users);

            for(user in users){
                if(user != odoo.session_info.uid)
                    populate_user_list(users[user]);
            }
        })

        socket.on('new_user', function (incoming_user) {
            if(!users){
                users = {};
            }
            users[incoming_user.id] = incoming_user;
            console.log(users);
            populate_user_list(incoming_user);
        });

        socket.on('message', function (msg) {
            receiveMessage(msg, msg.sender);
        });

        socket.on('leave', function (going_user) {
        try
        {
            if(!going_user)
            {
                console.log("undefined leaving user", going_user);
                return;
            }
            if(!going_user.id)
            {
                console.log("undefined leaving user id" , going_user);
                return;
            }
            if(odoo.session_info.id == going_user.id)
            {
                return;
            }
            delete users[going_user.id];
            console.log(users);
            remove_user_from_list(going_user);
        }
        catch(err)
        {
            console.log("Error for ",going_user);
        }
    });

        $(document).on('click', '.open-chatbox', function(){
        var id = $(this).attr('id');
        active_user = users[id];
        $('.chatbox .chat-text').text(active_user.name);
        $('.chatbox').css('display', 'block');
    });

        // On send message
        $(document).on('click', '#message-form button', function(){
        var msg = $('#message-form input:first').val();
        var msg_obj = create_msg_obj(msg);
        var li_obj = '<li class="replies"><p>' + msg + '</p></li>';
        $('#chat_list').append(li_obj);
        socket.emit('message', msg_obj);
        $('#message-form input:first').val("");
        $(".smartchatbox").scrollTop($(".smartchatbox")[0].scrollHeight);
    });
    });
});