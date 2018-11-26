var check = 0;
var socket = undefined;
var users = undefined;
var active_user = undefined;
var sendMessage = undefined;
var total_unseen = 0;
var notifications = {};

var closeChatbox = function() {
    $('.chatbox').css('display', 'none');
    active_user = undefined;
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

odoo.define('odoochat.onClientready', function (require) {
    "use strict";
    var core = require('web.core');
    core.bus.on('web_client_ready', null, function () {
      $(function(){
            var chat_menu_item = $('.o_menu_sections:first a[data-menu-xmlid="meeting_point.chat_menu"]:first');
            var notify_div = '<span id="unseen-msg-counter" style="color: white;background: red;border-radius: 25px;width: 20px;text-align: center;font-size: 14px;position: relative;">0</span>';
            $(chat_menu_item).append($(notify_div));

            if($('.dn-chatter').length > 1){
                $('.dn-chatter:first').remove();
            }

            var create_msg_obj = function(msg){
                var input_data = {
                    "token": odoo.session_info.token,
                    "name": odoo.session_info.username,
                    "id": odoo.session_info.uid,
                    "uid": odoo.session_info.uid,
                    "db": odoo.session_info.db
                }

                input_data['msg'] = {
                    content : msg,
                    sender : odoo.session_info.uid,
                    to : active_user.id
                }
                return input_data;
            }

            var populate_user_list = function(user){
                 notifications[user.id] = 0;
                var child = '<li id="' + user.id + '" class="open-chatbox list-group-item"><span>'+ user.name + '</span>';
                child += '<span style="position:relative;left:90%;" id="unseen-' + user.id + '"></span></li>';
                $('#online-users-list:first ul:first').append(child);
            }

            var remove_user_from_list = function(user){
                var id = '#'+user.id;
                $(id).remove();
            }

            var append_message = function(msg){
                var li_obj = '<li ';
                if(msg.sender == odoo.session_info.uid)
                    li_obj += 'class="replies"';
                else
                    li_obj += 'class="sent"';

                li_obj += ' ><p>' + msg.content + '</p></li>';
                $('#chat_list').append(li_obj);
                $('#message-form input:first').val("");
                $(".smartchatbox").scrollTop($(".smartchatbox")[0].scrollHeight);
            }

            var show_chat = function(){
                socket.on('allMessages', function(messages){
                    $('#chat_list').empty();
                    for(var i = 0; i < messages.length; i++){
                        var msg = messages[i];
                        append_message(msg);
                    }
                })
                $('.chatbox .chat-text').text(active_user.name);
                $('.chatbox').css('display', 'block');
                total_unseen -= notifications[active_user.id];
                notifications[active_user.id] = 0;
                $('#unseen-msg-counter').text(total_unseen);
                $('#unseen-'+active_user.id).text(notifications[active_user.id]);
            }

            // On send message
            $(document).on('click', '#message-form button', function(){
                    var msg = $('#message-form input:first').val();
                    var msg_obj = create_msg_obj(msg);
                    append_message(msg_obj.msg);
                    socket.emit('message', msg_obj);
                });

            var receiveMessage = function(msg, sender_id) {
                if(active_user && active_user.id == sender_id){
                    append_message(msg);
                }
                else {
                    ++(notifications[sender_id]);
                    ++total_unseen;
                    $('#unseen-msg-counter').text(total_unseen);
                    $('#unseen-'+sender_id).text(notifications[sender_id]);
                }
            }

            $(document).on('mousedown','.o_menu_sections:first a[data-menu-xmlid="meeting_point.chat_menu"]:first', function(){
                $(this).addClass('showmouseawaybutton');
                if(check != 1)
                {
                    $(this).removeAttr("href").removeAttr("data-target").removeAttr("data-toggle").removeAttr("data-action-id").removeAttr("data-action-model").removeAttr("data-menu").css('cursor','pointer');
                    check = 1;
                    $(this).attr('id', 'toggle_chat_btn')
                }
                if($(this).hasClass('active')){
                    $(this).removeClass('active');
                }
                else{
                    $(this).addClass('active');
                }
                $('#online-users-list').toggle();
            });

            // Open Chat Box Click
            $(document).on('click', '.open-chatbox', function(){
                    var id = $(this).attr('id');
                    active_user = users[id];
                    var input_data = {
                        "token": odoo.session_info.token,
                        "name": odoo.session_info.username,
                        "id": odoo.session_info.uid,
                        "uid": odoo.session_info.uid,
                        "db": odoo.session_info.db,
                        "filter" : {'sender':odoo.session_info.uid, 'to':active_user.id}
                    }
                    socket.emit('getMessages', input_data);
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

            socket = io('https://chat.brainpbx.com',{
                'reconnection': true,
                'reconnectionDelay': 2000,
                'reconnectionDelayMax' : 5000,
                'reconnectionAttempts': 2
            });

            socket.on('connect',function(){
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
                    for(var user in users){
                        if(user != odoo.session_info.uid){
                            populate_user_list(users[user]);
                        }
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
            });
        });
    });
});