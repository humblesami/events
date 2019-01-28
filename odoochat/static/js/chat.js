(function(){

    window.emojiPicker = new EmojiPicker({
      emojiable_selector: '[data-emojiable=true]',
      assetsPath: '/odoochat/static/img/',
      popupButtonClasses: 'fa fa-smile-o'
    });
    window.emojiPicker.discover();

    if(odoo.session_info.uid == 1){

        return;
    }

    //Local
    var chat_server = 'http://localhost:4000';
    //online
    if(dn_base_web_url.indexOf('odoohq') > -1)
        chat_server = 'https://chat.brainpbx.com';

    var check = 0;
    var socket = undefined;
    var users = undefined;
    var active_user = undefined;
    var sendMessage = undefined;
    var total_unseen = 0;
    var notifications = {};
    var is_mini = false;

    $('#chatbox .close-chat').click(function() {
        $('.chatbox').css('display', 'none');
        active_user = undefined;
    });
    $('#chatbox .maxi-chat').click(function(){
        is_mini = false
        $('.chatbox').css('margin', '0');
        $('.maxi-chat').css('display', 'none');
        $('.mini-chat').css('display', 'block');
    });
    $('#chatbox .mini-chat').click(function() {
        is_mini = true;
        $('.maxi-chat').css('display', 'block');
        $('.mini-chat').css('display', 'none');
        $('.chatbox').css('margin', '0 0 -382px 0');
    });

    //console.log($('.o_menu_systray').length, 11833);
    odoo.define('odoochat.onClientready', function (require) {
        "use strict";
        var core = require('web.core');
        core.bus.on('web_client_ready', null, function () {
            //var chat_menu_item = $('.o_menu_sections:first a[data-menu-xmlid="meeting_point.chat_menu"]:first');
            var notify_div = '<span id="unseen-msg-counter">0</span>';
            var chat_menu_item = $('<li class="showmouseawaybutton"><div class="fa fa-lg fas fa-comments chatt" ></div></li>');
            $('.o_menu_systray').prepend(chat_menu_item);
            $(chat_menu_item).append($(notify_div));

            var dnow = Date();

            // Open Chat Box Click
            $(document).on('click', '.open-chatbox', function(){
                var id = $(this).attr('id');
                active_user = users[id];
                console.log(active_user )
                var input_data = {
                    "name" : 'getMessages',
                    "auth" : {
                        "token": odoo.session_info.token,
                        "name": odoo.session_info.username,
                        "id": odoo.session_info.uid,
                        "uid": odoo.session_info.uid,
                        "db": odoo.session_info.db,
                        'sender':odoo.session_info.uid,
                        'target_id':active_user.id
                    },
                    "req_data": {}
                }
                socket.emit('client_event', input_data);
                show_chat();
            });

            // On Body Click Anywhere
            $(document).on('mouseup touchstart', function(e){
                var target = e.target;
                var showbtn = $(target).closest('.showmouseawaybutton');
                if(showbtn && showbtn.length > 0)
                {
                    return;
                }
                else
                {
                    var shownpanel = $(target).closest('.hidemouseaway');
                    if(shownpanel  && shownpanel.length > 0)
                        return;
                    else
                    {
                        $('.showmouseawaybutton').removeClass('active');
                        $('.hidemouseaway').hide();
                    }
                }
            });

            socket = io(chat_server, {
                'reconnection': true,
                'reconnectionDelay': 2000,
                'reconnectionDelayMax' : 5000,
                'reconnectionAttempts': 2
            });

            if($('.dn-chatter').length > 1){
                $('.dn-chatter:first').remove();
                $('.dn-chatter:first').show();
            }

            var chatter_shown = 0;

            chat_menu_item.click(function(){
                if(chatter_shown != 1)
                {
                    $('.dn-chatter:first').show();
                    $('#online-users-list').show();
                    $(this).addClass('active');
                    for(var user in users){
                        if(user != odoo.session_info.uid){
                            add_user_in_list(users[user]);
                        }
                    }
                    chatter_shown = 1;
                }
                else
                {
                    $('#online-users-list').toggle();
                }
            });

            if(total_unseen == 0)
                $('#unseen-msg-counter').hide();
            else
                $('#unseen-msg-counter').show();

            var create_msg_obj = function(msg){
                var input_data = {
                    "name" : 'message',
                    "auth": {
                        "token": odoo.session_info.token,
                        "name": odoo.session_info.username,
                        "id": odoo.session_info.uid,
                        "uid": odoo.session_info.uid,
                        "db": odoo.session_info.db
                    }
                }

                input_data['req_data'] = {
                    content : msg,
                    sender : odoo.session_info.uid,
                    to : active_user.id
                }
                return input_data;
            }

            var add_user_in_list = function(user){
                var child = '<li id="' + user.id + '" class="open-chatbox list-group-item">';
                child += '<img class="image-circular" src=' + user.photo + '/>'
                child += '<span>'+ user.name + '</span>';
                child += '<span class="user_count"style="position:relative;';
                if(user.unseen <= 0)
                    child += 'display:none;';

                child += '" id="unseen-' + user.id + '">' + user.unseen + '</span>';
                child += '<span style="right: 10px;position: absolute;';
                if(!user.online){
                    child += 'display:none;';
                }
                child += '" class="badge badge-success online">online</span><span style="right: 10px;position: absolute;';
                if(user.online){
                    child += 'display:none;';
                }

                child += '" class="badge badge-warning offline">offline</span>';


                child += '</li>';
                $('#online-users-list:first ul:first').append(child);
                if(notifications[user.id] && notifications[user.id] > 0){
                    $('#unseen-'+user.id).text(notifications[user.id]);
                    $('#unseen-'+user.id).show();
                }
                else{
                    notifications[user.id] != 0
                }
            }

            var append_message = function(msg){
                var li_obj = '<li ';
                if(msg.sender == odoo.session_info.uid)
                    li_obj += 'class="replies"';
                else
                    li_obj += 'class="sent"';

                li_obj += ' ><div><p>' + msg.content + '</p><p>'+ msg.create_date +'</p></div></li>';
                $('#chat_list').append(li_obj);
                $('#message-form input:first').val("");
                $(".smartchatbox").scrollTop($(".smartchatbox")[0].scrollHeight);
            }

            var updateUserStatus = function(user){
                //console.log(user);
                if(!users[user.id])
                {
                    console.log(users, user.id, user.online);
                }
                else
                {
                    if(users[user.id].online != user.online)
                    {
                        users[user.id].online = user.online;
                        //console.log("Changed "+user.online+" for ", user );
                    }
                    else
                    {
                        //console.log("Not changed "+user.online+" for ", user );
                    }
                }
                var list_id = '#'+user.id;
                $(list_id).find('.online').toggle();
                $(list_id).find('.offline').toggle();
            }

            var server_events = {
                error : function (err) {
                    console.log("Error from chat ", err);

                },
                new_user : updateUserStatus,
                user_left : updateUserStatus,
                forced_logged_out : function (data) {
                    var href = window.location.toString();
                    if(href.indexOf('localhost') == -1)
                    {
                        bootbox.alert('You are logged out due to '+data.reason);
                        window.location = '/web/login';
                    }
                },
                message : function (msg) {
                    receiveMessage(msg, msg.sender);
                },
                allMessages : function(messages){
                    $('#chat_list').empty();
                    for(var i = 0; i < messages.length; i++){
                        var msg = messages[i];
                        append_message(msg);
                    }
                      $('.replies').Emoji();
                       $('.sent').Emoji();
                }
            }

            var show_chat = function(){
                if(is_mini)
                    $('#chatbox .maxi-chat').click();
                $('.chatbox .chat-text p').text(active_user.name);
                $('.chatbox').css('display', 'block');
                total_unseen -= notifications[active_user.id];
                notifications[active_user.id] = 0;
                $('#unseen-msg-counter').html(total_unseen);
                if(total_unseen == 0)
                    $('#unseen-msg-counter').hide();
                else
                    $('#unseen-msg-counter').show();

                if(notifications[active_user.id] == 0)
                    $('#unseen-'+active_user.id).hide();
                else
                    $('#unseen-'+active_user.id).show();

                $('#unseen-'+active_user.id).text(notifications[active_user.id]);
                $('.user_count').hide();
            }

            // On send message
            $('#message-form').submit(sendMessageFunction);

            function sendMessageFunction(e){
                  $('.replies').Emoji();
                   $('.sent').Emoji();
                e.preventDefault();
                if(socket && socket.connected){
                    var msg = $('#message-form input:first').val();

                    if(!msg)
                        return;
                    var msg_obj = create_msg_obj(msg);
                    append_message(msg_obj.req_data);
                    socket.emit('client_event', msg_obj);
                      $('.replies').Emoji();
                       $('.sent').Emoji();
                }
            }

            var receiveMessage = function(msg, sender_id) {
                console.log(sender_id, active_user);
                if(active_user && active_user.id == sender_id && !is_mini){
                    append_message(msg);
                    $('.replies').Emoji();
                    $('.sent').Emoji();
                }
                else {
                    if(isNaN(notifications[sender_id]))
                        notifications[sender_id] = 0;
                    ++(notifications[sender_id]);

                    if(isNaN(total_unseen))
                        total_unseen = 0;
                    ++total_unseen;
                    $('#unseen-msg-counter').text(total_unseen);
                    $('#unseen-'+sender_id).text(notifications[sender_id]);
                    $('.chatbox .chat-text .user_count').text(notifications[sender_id]);
                    if(total_unseen == 0)
                        $('#unseen-msg-counter').hide();
                    else
                        $('#unseen-msg-counter').show();

                    if(notifications[sender_id] == 0)
                        $('#unseen-'+sender_id).hide();
                    else
                        $('#unseen-'+sender_id).show();

                    if(notifications[sender_id] == 0)
                        $('.chatbox .chat-text .user_count').hide();
                    else
                        $('.chatbox .chat-text .user_count').show();
                }
            }

            var is_connected = true;
            console.log('Connecting chat server '+chat_server);

            socket.on('connect',function(){
                dn_current_site_user.socket = socket;
                is_connected = true;
                console.log('Chat server '+chat_server+' connected');

                socket.emit('client_event', {
                    "name" : 'verify',
                    "auth" : {
                        "token": odoo.session_info.token,
                        "name": odoo.session_info.username,
                        "uid": odoo.session_info.uid,
                        "db": odoo.session_info.db
                    },
                    "req_data" : {
                        "token": odoo.session_info.token,
                        "name": odoo.session_info.username,
                        "id": odoo.session_info.uid,
                        "db": odoo.session_info.db
                    }
                });

                socket.on('verified', function(res){
                    console.log('User is verififed');
                    if(!users){
                        users = {};
                    }
                    users = res.friends;
                    if(res.unseen > 0)
                        $('#unseen-msg-counter').text(res.unseen).show();
                },)

                socket.on('server_event',function(res){
                    try{
                        if(!server_events[res.name])
                            console.log('Not handeled ' ,res);
                        else
                            server_events[res.name](res.data);
                    }
                    catch(er)
                    {
                        console.log(er.message, ' in '+res.name+' with data ', res);
                    }
                });


     $('#send_btn').click(function() {
         $('.emoji-wysiwyg-editor').html("");
          $('.replies').Emoji();
    $('.sent').Emoji();
    });

            });

            setTimeout(function(){
                if(!is_connected)
                {
                    console.log('Chat server could not be connected');
                }
            }, 11000)
        });
    });
})()