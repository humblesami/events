import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpService } from "../../app/http.service";
import { SocketService } from "../../app/socket.service";
import { Router } from "@angular/router";
declare var $:any;


@Component({
    styleUrls:['./esigndocdetails.css'],
    templateUrl: 'esigndocdetails.component.html'
})
export class EsignDocDetailsComponent implements OnInit {
    doc: any;
    doc_id:string;
    doc_name: any;
    add_users:boolean = false;
    selected_respondents:any = [];
    all_profile_users:any = [];
    is_public = false;
    users_list = [];
    all_users_list = [];
    selectedUser: any;
    socketService: SocketService;

    constructor(private httpService: HttpService,
        private route: ActivatedRoute,
        private ss: SocketService,
        private router: Router) {
            window['app_libs']['pdf'].load();
        // this.route.params.subscribe(params => this.get_data());
        this.socketService = ss;
    }

    get_data() {

    }

    setUserSelection(){
        let obj_this = this;
        if (obj_this.selectedUser)
        {
            let sign = $('.active_signature');
            sign.attr("user", obj_this.selectedUser['id']);
            sign.find('.user_name').remove();
            sign.append(`: <span class='user_name'>${obj_this.selectedUser['name']}</span>`);            
        }
        $('#select_user_modal').modal('hide');
    }

    isAdmin = false;

    add_new_users()
    {
        let obj_this = this;
        obj_this.add_users = true;
        $('#select_user_modal').on('hidden.bs.modal', function (e) {
            if (obj_this.add_users)
            {
                let input_data = {
                    doc_id: obj_this.doc_id,
                    new_respondents: obj_this.selected_respondents
                }
                let args = {
                    app: 'esign',
                    model: 'SignatureDoc',
                    method: 'add_new_respondents'
                }
                let final_input = {
                    params: input_data,
                    args: args
                }
                obj_this.httpService.get(final_input, (data:any) =>{
                    obj_this.all_users_list = obj_this.users_list = obj_this.selected_respondents;
                }, null)
            }
            obj_this.add_users = false;
        });
        $('#select_user_modal').modal('show');
        
    }

    close_users_modal()
    {
        $('#select_user_modal').modal('hide');
    }

    toggle_admin_mode(bool){
        this.isAdmin = bool;
    }
    meetings = [];
    signature_started = true;
    selectedMeeting: any;
    ngOnInit() {
        var obj_this = this;
        var
            canvas,
            pdf_url,
            users,
            doc_data,
            send_to_all,
            meeting_id,
            req_url,

            ctx,
            pdfDoc,
            scale,
            pageNum,
            ajax_options,
            token = $('.sign_token').val() || ""

        if (!obj_this.doc_id) {
            var route_token = obj_this.route.snapshot.params.token;
            obj_this.doc_id = obj_this.route.snapshot.params.id;
            if (route_token)
            {
                token = obj_this.route.snapshot.params.token;
                obj_this.is_public = true;
            }
        }
        // console.log(doc_id, doc_data, 833, token);

        obj_this.doc = {
            "id": obj_this.doc_id,
            "doc_name": ''
        };
        // console.log(obj_this.socketService.user_data, 444);

        var page_zoom = 1;
        $(function(){
            $('#dropdown_meeting').val(meeting_id);
            // Go to previous page
            $("#prev").on('click', function goPrevious() {
                if (pageNum <= 1)
                    return;
                pageNum--;
                renderPage(pageNum);
            });

            // Go to next page
            $("#next").on('click', function goNext() {
                if (pageNum >= pdfDoc.numPages)
                    return;
                pageNum++;
                renderPage(pageNum);
            });        



            $("#zoomIn").on('click', function zoomIn() {
                var scaleSelect = document.getElementById("scaleSelect") as HTMLSelectElement;
                var last = scaleSelect.options.length - 1;
                if (scaleSelect.selectedIndex < last) {
                    scale = scaleSelect.options[scaleSelect.selectedIndex + 1].value;
                    scaleSelect.selectedIndex += 1;
                    zoom_changed(scale);
                }
            });

            $("#zoomOut").on('click', function zoomOut() {
                var scaleSelect = document.getElementById("scaleSelect") as HTMLSelectElement;
                var last = scaleSelect.options.length - 1;
                if (scaleSelect.selectedIndex > 0) {
                    scale = scaleSelect.options[scaleSelect.selectedIndex - 1].value;
                    scaleSelect.selectedIndex -= 1;
                    zoom_changed(scale);
                }
            });

            $("#scaleSelect").on('click', function zoomSelect() {
                var scaleSelect = document.getElementById("scaleSelect") as HTMLSelectElement;
                scale = scaleSelect.options[scaleSelect.selectedIndex].value;
                zoom_changed(scale);
            });

            $('#check_box_send_all').change(function() {
                if ($("#check_box_send_all").is(':checked')) {
                    var signs_exist = false;
                    if($('#viewer_container .sign_container').length || $('#viewer_container .new_sign').length)
                    {
                        signs_exist = true;
                    }
                    if(signs_exist)
                    {
                        window['bootbox'].confirm('All assigned signatures will be removed', function(res){
                            if(res)
                            {
                                if($('.sign_container[signed="true"]').length > 0)
                                {
                                    console.log('Invalid activity');
                                    return;
                                }
                                $('.dragabl-fields').hide();
                                $('.new_sign,.sign_container').remove();
                                $('#nxxt_sign').hide();
                                $('#save-doc-data').click();
                                $('#viewer_container .sign_container').remove();
                                $('#viewer_container .new_sign').remove();
                                save_attachemnt_to_meeting();                                
                            }
                            else{
                                $("#check_box_send_all").prop('checked', false);
                            }
                        })
                    }
                    else{
                        save_attachemnt_to_meeting();
                        $('.dragabl-fields').hide();
                    }
                } else {
                    save_attachemnt_to_meeting();
                    $('.dragabl-fields').show();
                }                
            })
            $('#dropdown_meeting').change(function() {
                if (!$('#dropdown_meeting').val()) {
                    obj_this.users_list = obj_this.all_users_list;
                    $('#check_box_send_all').removeAttr('checked');
                    // $('.check_box_send_all').hide();
                    $('.dragabl-fields').show();
                }
                save_attachemnt_to_meeting();
            });
            $('#select_user_modal').on('shown.bs.modal', function () {
                var sign = $('.active_signature:first');
                var selected = sign.attr("user");
                // console.log(selected, 333);
                if(!selected)
                {
                    obj_this.selectedUser = undefined;
                    $('.ng-select-user-list .ng-input input').focus();
                    return;
                }
                let user_index = 0;
                let offSet = 0;
                if (selected)
                {
                    let user_name = sign.find('.user_name').text();
                    obj_this.selectedUser = {id: parseInt(selected), name: user_name}
                    user_index = obj_this.users_list.findIndex(x => x.id ===parseInt(selected));
                    var num = obj_this.users_list.length;
                    var totalHeight = $('.ng-select-user-list .scroll-host')[0].scrollHeight;
                    offSet = user_index * totalHeight/num;
                    $('.scroll-host').animate({
                        scrollTop: offSet
                    }, 100);
                    $('.ng-select-user-list .ng-input input').focus();
                }
            });
            //Pick and drag a new field to page


            function handleDropEvent(event, ui) {
                var new_signature = $(ui.helper).clone().removeClass('drag').addClass("new_sign");
                new_signature.draggable({
                    containment: "#the-canvas",
                    scroll: true,                    
                    cursor: 'move'
                });
    
    
                if (parseFloat(new_signature[0].style.top) - $(this).parent().position().top < 0) {
                    return;
                }
                var field_left = parseFloat(new_signature[0].style.left);
                var field_top = parseFloat(new_signature[0].style.top) - $(this).parent().parent().position().top + $(this).parent().scrollTop();            
                
                field_left -= 210;

                new_signature.css({
                    position: 'absolute',
                    left: field_left,
                    top: field_top,
                });                


                if (new_signature.hasClass("text_psition")) {
                    new_signature.html('<input style="display:inline;width:90%" type="text" placeholder="Field Name"/>');
                }
    
                new_signature.prepend('<i class="fa fa-times  fa-lg del_sign doc-time-del" aria-hidden="true"/>');
    
                new_signature.attr({
                    "page": pageNum
                }).resizable();

                
                var after_resized;                
                new_signature[0].onresize = function(){
                    var el_this = this;
                    clearTimeout(after_resized);
                    after_resized = setTimeout(function(){
                        on_dropped(el_this);
                    }, 100);                    
                }
    
                $('.active_signature').removeClass('active_signature');
                new_signature.addClass('active_signature');            
                $(this).append(new_signature);
                var field_type = new_signature.find('.field_type');
                if(field_type.html().trim() == 'Text')
                {
                    field_type.replaceWith('<input class="field_type" />');
                    var field_type_input = new_signature.find('.field_type');
                    field_type_input.focus();                
                    field_type_input.blur(function(){
                        on_field_type_given(field_type_input);
                    });
                    field_type_input.keyup(function(e){
                        if(e.keyCode == 13)
                        {
                            on_field_type_given(field_type_input);
                        }
                    });
                }
                else{
                    $('#select_user_modal').modal('show');
                }
                on_dropped(new_signature[0]);
            }

            $('.drag').draggable({
                helper: "clone",
                scroll: true,
                cursor: 'move'
            });
            $("#page_container").droppable({
                drop: handleDropEvent,
                accept: ".drag",
                tolerance: "touch",                
            });
            

            //Drag already existing field within page
            $("#page_container1").droppable({
                drop: function(event, ui) {
                    var sign_left = ui.position.left;
                    var sign_top = ui.position.top;
                    $(ui.helper[0]).css({
                        left: sign_left,
                        top: sign_top
                    });
                    on_dropped(ui.helper[0]);
                },
                accept: ".new_sign",
                tolerance: "touch",
            });
            //End Dragable

            $(document).off("click", ".save_doc_data")
            $(document).on("click", ".save_doc_data", function(e) {
                var new_divs = $('.new_sign');
                var snd_to_all = $("#check_box_send_all").is(':checked');
                if (new_divs.length == 0 && !snd_to_all) {
                    return;
                }
                var body = $('<div/>');
                var input_email = $('<h3>Send by Email:</h3><input id="email" placeholder="Email" style="width:50%"/>');
                var input_name = $('<input id="email" placeholder="Name" class="modal-input-wrap" />');
                var input_subject = $('<input id="subject" placeholder="Subject" class="modal-input-wrap rounded" />');
                var email_body = $('<textarea class="o_sign_message_textarea o_input modal-input-wrap rounded"  "rows="4"></textarea>');
                input_subject.val("Signature Request");

                var meeting_id = $('#dropdown_meeting').val();
                body.append("<h3 class='border-bottom text-dark pb-2 font-weight-bold'>Sign and Return</h3>");
                body.append("<h3>Subject</h3>").append(input_subject);
                body.append("<h3>Message</h3>").append(email_body);

                var label_show = {
                    on_load: function(){
                        $('#signModal .modal-body').html(body);
                    },
                    on_save: function(){
                        assign_signatures();
                    },
                    hide_on_save:1
                };
                window['init_popup'](label_show);
                
                function assign_signatures() {
                    var sign_fields = [];
                    // console.log(3232);
                    var isEmpty = false;
                    var subject = input_subject[0].value;
                    var message = email_body[0].value;
                    var email = input_email[1].value;
                    var name = input_name[0].value;

                    if (!snd_to_all) {
                        $.each(new_divs, function() {
                            var sign = $(this);
                            
                            var pg = sign.attr("page");
                            var user = sign.attr("user");
                            if (user == 0 || !user) {
                                isEmpty = true;
                                return;
                            }
                            var field_name = "";
                            var field_type = sign.attr('signtype');                        
                            field_name = field_type.charAt(0).toUpperCase() + field_type.slice(1);
                            var db_position = sign.attr('position');                            
                            if(db_position)
                            {
                                db_position = JSON.parse(db_position);                                
                                var obj = {
                                    document_id: obj_this.doc_id,
                                    token: token,
                                    user_id: user,
                                    field_name: field_name,
                                    email: email,
                                    name: name,
                                    page: pg,
                                    left: db_position.left,
                                    top: db_position.top,
                                    height: db_position.height,
                                    width: db_position.width,
                                    zoom: canvas.width,
                                    type: field_type
                                };
                                sign_fields.push(obj);
                            }
                            else{
                                console.log('No position ', db_position);
                            }
                        });
                        if (isEmpty) {
                            alert("Select user for all fields!!!");
                            return;
                        }
                    }
                    let url = '';
                    if (sign_fields.length != 0 || snd_to_all) {
                        ajax_options = {
                            data: {
                                args: {
                                    app: "esign",
                                    model: "SignatureDoc",
                                    method: "ws_assign_signature",
                                },
                                params: {
                                    document_id: obj_this.doc_id,
                                    token: token,
                                    data: JSON.stringify(sign_fields),
                                    url: url,
                                    meeting_id: meeting_id,
                                    subject: subject,
                                    message: message,
                                    send_to_all: snd_to_all
                                }
                            },
                            onSuccess: function(data) {
                                loadData();
                                new_divs.hide().removeClass("new_sign");
                                $('.youtubeVideoModal').modal('hide');
                                $("#nxxt_sign").click();
                            }
                        }
                        window['dn_rpc_object'](ajax_options);
                    }
                }
            });

            $(document).off("click", ".sign_container")
            $(document).on("click", ".sign_container", function() {
                // console.log(4234343);
                var sign_container = $(this);
                var my_record = sign_container.attr("my_record");
                if (my_record == "false" && !obj_this.isAdmin) {
                    return;
                }
                var is_signed = sign_container.attr('signed').toString();
                // if(is_signed == "true")
                // {
                //     return;
                // }

                var login = sign_container.attr("login");
                var signature_id = sign_container.attr("id");
                var signature_dom = sign_container;

                var signature_data;

                function remove_sign(){
                    ajax_options = {
                        data: {
                            args: {
                                app: "esign",
                                model: "Signature",
                                method:"del_sign"
                            },
                            params: {
                                signature_id: signature_id,
                            }
                        },
                        onSuccess: function(data) {
                            sign_container.remove();
                        }
                    }
                    $('#signModal').modal('hide');
                    window['dn_rpc_object'](ajax_options);
                }
                if(obj_this.isAdmin && (is_signed == "false" || my_record == "true"))
                {
                    let popup_config = {
                        on_load: function(){
                            $('#signModal .modal-body').html(`
                                <button class="remove">Remove</button>
                            `);
                            $('#signModal button.remove').click(remove_sign);
                        },
                        hide_on_save: true,
                        on_shown: function(){
                            $('#signModal button.remove').click(remove_sign);
                        }
                    }
                    window['init_popup'](popup_config);
                    return;
                }

                function get_signature_data()
                {
                    ajax_options = {
                        data: {
                            args: {
                                app: "esign",
                                model: "Signature",
                                method:"load_signature"
                            },
                            params: {
                                signature_id: signature_id,
                                document_id: obj_this.doc_id,
                                token: token,
                                sign_type: sign_container.attr('signtype')
                            }
                        },
                        onSuccess: function(data) {
                            on_sign_got(data);
                        }
                    }
                    if(token){
                        ajax_options.url = '/rest/public';
                    }
                    console.log(ajax_options.data.params);
                    window['dn_rpc_object'](ajax_options);
                }

                get_signature_data();



                function on_sign_got(sign_data)
                {
                    if(sign_container.attr('signtype') == 'initials' || sign_container.attr('signtype') == 'signature')
                    {
                        let sign_config = {
                            signature_data: sign_data.image,
                            on_signed: function(new_sign){
                                // console.log(1154, new_sign);
                                signature_data = new_sign;
                                submit_response(new_sign, sign_data.text);
                            },
                            on_auto_sign: function(){
                                get_auto_sign();
                            }
                        };
                        window['app_libs']['signature'].load(()=>{
                            window['init_sign'](sign_config);
                        });
                    }
                    else
                    {
                        let popup_config = {
                            on_load: function(){
                                // console.log(117);
                                var read_only = sign_container.attr('signtype') == 'date' ? 'disabled' : '';
                                $('#signModal .modal-body').html(`
                                    <input id="sign_data" value="`+sign_data.text+`" `+read_only+` />
                                `);
                            },
                            on_save:function(){
                                var sign_text = $('#signModal #sign_data').val();
                                submit_response(sign_data.image, sign_text);
                            },
                            hide_on_save: true,
                        }
                        window['init_popup'](popup_config);
                    }

                    function get_auto_sign()
                    {
                        ajax_options = {
                            data: {
                                args: {
                                    app: "esign",
                                    model: "Signature",
                                    method:"get_auto_sign"
                                },
                                params: {
                                    sign_type: sign_container.attr('signtype'),
                                    token: token,
                                }
                            },
                            onSuccess: function(data) {
                                let sign_config = {
                                    signature_data: data.image,
                                    on_signed: function(new_sign){
                                        // console.log(1154, new_sign);
                                        signature_data = new_sign;
                                        submit_response(new_sign, sign_data.text);
                                    }
                                };
                                window['app_libs']['signature'].load(()=>{
                                    window['init_sign'](sign_config);
                                });
                            }
                        }
                        if(token){
                            ajax_options.url = '/rest/public';
                        }
                        window['dn_rpc_object'](ajax_options);
                    }
                }

                function submit_response(response_data, sign_data_text)
                {
                    // console.log(response_data, sign_data_text);
                    ajax_options = {
                        data: {
                            args: {
                                app: "esign",
                                model: "Signature",
                                method:"save_signature"
                            },
                            params: {
                                signature_id: signature_id,
                                document_id: obj_this.doc_id,
                                token: token,
                                text: sign_data_text,
                                sign_type: sign_container.attr('signtype'),
                                binary_signature: response_data,
                            }
                        },
                        type:"POST",
                        onSuccess: function(data) {
                            obj_this.signature_started = true;                        
                            for(var i =0;i<doc_data.length;i++)
                            {
                                // console.log(signature_dom.attr('id'), doc_data[i].id);
                                if(doc_data[i].id == signature_dom.attr('id'))
                                {
                                    doc_data[i].image = 'data:image/png;base64,' + data.image;
                                    break;
                                }
                            }
                            on_sign_saved(signature_dom, data);
                            // console.log(data.status.signature_status)
                            if($('.sign_container[signed="false"]').length == 0)                        
                            {
                                $("#nxxt_sign").hide(); 
                            }
                            // $("#nxxt_sign").click();
                        }
                    }
                    if(token){
                        ajax_options.url = '/rest/public';
                    }
                    ajax_options.data.params.type = sign_container.attr('signtype');
                    window['dn_rpc_object'](ajax_options);
                }
            });

            $(document).off("click", ".new_sign .del_sign")
            $(document).on("click", ".new_sign .del_sign", function(e) {
                var sign = $($(this)[0].parentElement);
                sign.fadeOut();
                sign.removeClass("new_sign");
            });


            $(document).off("mousedown", ".new_sign")
            $(document).on("mousedown", ".new_sign", function(e) {
                var sign = $(this);
                $('.active_signature').removeClass('active_signature');
                sign.addClass('active_signature');
            });

            $(document).off("click", ".new_sign")
            $(document).on("click", ".new_sign", function(e) {
                if($(e.target).hasClass('del_sign') || $(e.target).is('input'))
                {
                    return;
                }
                $('#select_user_modal').modal('show');
            });


            $("#nxxt_sign").click(function() {
                var d = $.grep(doc_data, function(v) {
                    return !v.signed && v.my_record;
                });
                if (d.length == 0) {
                    $(this).hide();
                    return;
                }
                var sign = d[0];
                var next_top = canvas.height * (sign.top / 100);

                var next_left = canvas.width * (sign.left / 100);
                renderPage(sign.page);
                $('html, #page_container1').animate({
                    scrollTop: next_top - 150,
                    scrollLeft: next_left - 150,
                }, 500);

                $(this).html("NEXT>").animate({
                    top: ($('#page_container1').height() / 2) + "px"
                }, 500);

                setTimeout(function() {
                    $('#nxxt_sign').html("NEXT>").animate({

                        top: next_top - $('#page_container1').scrollTop() + "px"
                    }, 1000);

                    $(`.sign_container[id=${sign.id}]:visible`).css({
                        border: "solid 3px yellow"
                    })
                }, 600);
            });            


            $('#select_user_modal').on('hidden.bs.modal', function () {
                obj_this.selectedUser = undefined;
                $('.ng-select-user-list .ng-input input').focus();
            });
            
            if ($('#save-doc-data').hasClass("o_invisible_modifier")) {
                $('#page_container1')[0].style.height = "calc(100vh - 165px)";
            }
        });


        function save_attachemnt_to_meeting(){
            ajax_options = {
                data: {
                    args: {
                        app: "esign",
                        model: "SignatureDoc",
                        method: "set_meeting_attachment",
                    },
                    params: {
                        document_id: obj_this.doc_id,
                        meeting_id: $('#dropdown_meeting').val(),
                        send_to_all: $("#check_box_send_all").is(':checked')
                    }
                },
                onSuccess:function(data){
                    if(data != 'done')
                    {
                        obj_this.users_list = data;
                    }
                }
            };
            if(token){
                ajax_options.url = '/rest/public';
            }
            window['dn_rpc_object'](ajax_options);
        }
        
        function get_url(url)
        {
            if (token)
            {
                return url + '_public';
            }
            return url;
        }
        function loadData() {
            console.log('Loading doc data', Date());
            window['functions'].showLoader('esign-doc');
            let url = '';
            ajax_options = {
                data: {
                    args:{
                        app: 'esign',
                        model: 'SignatureDoc',
                        method: 'ws_get_detail'
                    },

                    params: {
                        document_id: obj_this.doc_id,
                        token: token,
                    }
                },
                onSuccess: function(data) {
                    page_zoom = $('#scaleSelect').val();
                    if(obj_this.is_public && data == 'done')
                    {
                        $('#holder').hide();
                        $('body').prepend('<h1>You have Completed You Signatures</h1>');
                    }
                    if(obj_this.doc_id == 'new')
                    {
                        obj_this.doc_id = data.doc_id;
                        obj_this.doc = {
                            name: data.doc_name,
                            id: data.doc_id
                        }
                    }
                    doc_data = data.doc_data;
                    obj_this.doc.doc_name = data.doc_name || 'Unnamed';
                    obj_this.selected_respondents = data.users;
                    obj_this.all_profile_users = data.all_profile_users;
                    obj_this.signature_started = data.signature_started;
                    obj_this.all_users_list = obj_this.users_list = users = data.users;
                    meeting_id = data.meeting_id;
                    // console.log(data);
                    send_to_all = data.send_to_all;
                    pdf_url = window['site_config'].server_base_url + data.file_url;
                    window['app_libs']['pdf'].load(function(){
                        renderPDF(pdf_url);
                    });

                    obj_this.meetings = data.meetings;
                    for(var k=0; k< data.meetings.length; k++)
                    {
                        if(data.meetings[k].id == meeting_id)
                        {
                            obj_this.selectedMeeting = data.meetings[k];
                        }
                    }
                    var ddm = $('#dropdown_meeting');
                    var selected = '';
                    if(!meeting_id)
                    {
                        selected = ' selected';
                    }
                    ddm.html('<option'+selected+' value="">Select Meeting</option>');
                    var option_html = '';
                    data.meetings.forEach(element => {
                        if(meeting_id == element.id)
                        {
                            selected = ' selected';
                        }
                        else
                        {
                            selected = '';
                        }
                        option_html = '<option'+selected+' value='+element.id+'>'+element.name+'</option>';
                        ddm.append(option_html);
                    });
                    if (send_to_all) {
                        $('#check_box_send_all').prop('checked', true);
                        $('.dragabl-fields').hide();
                    }
                    else
                    {
                        $('#check_box_send_all').prop('checked', false);
                        $('.dragabl-fields').show();
                    }
                }
            };
            if(token){
                ajax_options.url = '/rest/public';
            }
            window['dn_rpc_object'](ajax_options);
        }
        loadData();

        function on_sign_saved(signature_dom, data){
            var sign_img = signature_dom.find('img:first');
            var sign_img_src = 'data:image/png;base64,' + data.image;
            signature_dom.attr('signed','true').css('background','white');
            if(sign_img.length > 0)
            {
                sign_img[0].src = sign_img_src;
            }
            else{
                if(signature_dom && signature_dom.length > 0)
                {
                    signature_dom.html('<img src="'+sign_img_src+'" style="width:calc(100% - 10px)" />');
                }
                else{
                    console.log('Invalid signature dom');
                }
            }
        }

        function toggleNextButton() {
            var d = $.grep(doc_data, function(v) {
                return !v.signed && v.my_record;
            });
            if (d.length > 0) {
                // $("#nxxt_sign").show();
            }
        }

        function renderPDF(pdf_url) {
            pdfDoc = null;
            var doc_page_url = window.location.toString().replace(window.location.hostname, '');
            scale = localStorage.getItem(doc_page_url);
            if(scale)
            {
                page_zoom = scale = parseFloat(scale);
            }
            else{
                scale = page_zoom = 1.5;
            }
            $('#scaleSelect').val(page_zoom);
            canvas = document.getElementById('the-canvas')
            ctx = canvas.getContext('2d');
            console.log('Dcownloading doc', Date());
            window["PDFJS"].getDocument(pdf_url).then(function getPdf(_pdfDoc) {
                console.log('Got doc to render', Date());
                pdfDoc = _pdfDoc;
                if (!pageNum) {
                    pageNum = 1;
                }
                renderPage(pageNum);
                $('#holder').show();
                $('.docWrapperContainer').show();
                toggleNextButton();
            });
        }


        function base64ToUint8Array(base64) { //base64 is an encoded byte Array sent from server-side
            var raw = atob(base64); //This is a native function that decodes a base64-encoded string.
            var uint8Array = new Uint8Array(new ArrayBuffer(raw.length));
            for (var i = 0; i < raw.length; i++) {
                uint8Array[i] = raw.charCodeAt(i);
            }
            return uint8Array;
        }

        function renderPage(num) {
            pdfDoc.getPage(num).then(function(page) {
                var viewport = page.getViewport(scale);
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                page.render(renderContext).promise.catch(function (reason) {
                    console.log('stopped ' + reason);
                });
                console.log('Page rendered', Date());


                pageNum = num;
                document.getElementById('page_num').textContent = pageNum;
                document.getElementById('page_count').textContent = pdfDoc.numPages;
                $('.sign_container').hide();
                $('.new_sign').hide();
                var selector = '.new_sign[page=' + pageNum + ']';
                $(selector).show();

                //  $("#nxxt_sign").css({top:$('#page_container1').scrollTop()});
                setTimeout(function() {
                    loadSignatures({
                        "doc_data": doc_data,                    
                    });
                }, 200);
                window['functions'].hideLoader('esign-doc');
            });
            // Update page counters            
        }

        function on_field_type_given(el){            
            var val = el.val();
            // console.log(el[0], val);
            if(val)
            {
                // console.log(val,123);
                el.next().before('<span class="field_type"> : '+val+'</span>');
                el.closest('.active_signature').attr('signtype', val);
                el.remove();
            }
        }

        function on_dropped(el){
            var position = $(el).position();
            if(!$(el).css('width'))
            {                
                $(el).css('width', $(el).width());
                $(el).css('height', $(el).height());
                console.log($(el).width(), 59990);
            }

            // var vertical_padding = 0;
            // var vertical_padding1 = $(el).css('padding-top');
            // var vertical_padding2 = $(el).css('padding-bottom');
            // if(vertical_padding1)
            // {
            //     vertical_padding1 = parseFloat(vertical_padding1);
            //     vertical_padding2 = parseFloat(vertical_padding2);
            //     vertical_padding = vertical_padding1 + vertical_padding2;
            // }

            position = {
                top: parseFloat(position.top),
                left: parseFloat(position.left),
                width: $(el).width() + 25,
                height: $(el).height(),
            };
            if(position.left < 5)
            {
                position.left = 5;
                $(el).css('left', '5px');
            }
            var the_canvas = $('#the-canvas');
            if( position.width > the_canvas.width())
            {
                position.width = the_canvas.width()
                $(el).width(position.width)
            }
            if( position.height > the_canvas.height())
            {
                position.height = the_canvas.height()
                $(el).height(position.height);
            }
            if(page_zoom < 1)
            {
                if(position.left < the_canvas.position().left)
                {
                    position.left = the_canvas.position().left + 5;
                    $(el).css('left', position.left+'px');
                    position.left = 5;
                }
                else if(position.left + position.width > the_canvas.position().left + the_canvas.width())
                {
                    position.left = the_canvas.position().left + the_canvas.width() - position.width - 30;
                    $(el).css('left', position.left+'px');
                    position.left = position.left - the_canvas.position().left;
                }

                if(position.top + position.height > the_canvas.position().top + the_canvas.height())
                {
                    position.top = the_canvas.height() - position.height - 30;
                    $(el).css('top', position.top+'px');
                }
            }
            var db_pos = {
                top: position.top / page_zoom,
                left: position.left / page_zoom,
                width: position.width / page_zoom,
                height: position.height / page_zoom,
            };
            // console.log(position, page_zoom, db_pos);
            var db_pos_str = JSON.stringify(db_pos);
            $(el).attr('position',db_pos_str);
        }

        function set_position_on_page(el, position=null){            
            try{
                if(!position)
                {
                    position = $(el).attr('position');
                    position = JSON.parse(position);
                }
                if(position.left != 0 && !position.left)
                {
                    console.log('Invalid position', position);
                    return;
                }
                position = { 
                    top: position.top,
                    left: position.left,
                    width: position.width,
                    height: position.height,
                };
                var rect = {
                    top: position.top * page_zoom, 
                    left: position.left * page_zoom, 
                    width: position.width * page_zoom, 
                    height: position.height * page_zoom,
                    position: 'absolute',
                }
                if($('#this-canvas').width() < $('#page_container').width())
                {
                    rect.left += $('#the-canvas').position().left;
                }
                console.log(position, page_zoom, rect);
                $(el).attr('position', JSON.stringify(position));
                $(el).css(rect);
            }
            catch(er){
                console.log('Position attribute not correct', el);
            }
        }

        function zoom_changed(newScale) {
            // Using promise to fetch the page
            page_zoom = newScale;
            var doc_page_url = window.location.toString().replace(window.location.hostname, '');
            localStorage.setItem(doc_page_url, newScale);
            
            pdfDoc.getPage(pageNum).then(function(page) {
                var viewport = page.getViewport(newScale);
                canvas.height = viewport.height;
                canvas.width = viewport.width;                
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                page.render(renderContext);
                var saved_new_signs = $('.sign_container:visible,.new_sign');                
                $.each(saved_new_signs, function() {
                    set_position_on_page(this);
                });
            });            
        }

        function loadSignatures(data) {            
            var signature_fields = data.doc_data;
            $.each(signature_fields, function() {
                var field = this;
                var div = $('<div></div>', {
                    id: field.id,
                    signed: field.signed,
                    name: field.name,
                    my_record: field.my_record,
                    page: field.page,
                    field_name: field.field_name,                    
                    class: "sign_container",
                });
                // console.log(field);
                var show_text = field.type.charAt(0).toUpperCase() + field.type.slice(1);
                div.html(show_text + ":" + field.name);
                div.attr('signtype', field.type);

                set_position_on_page(div, field);

                if (!field.signed && field.my_record) {
                    div.css({
                        background: "rgba(230, 81, 81, 0.9)"
                    });
                }
                if (obj_this.isAdmin)
                {
                    if(field.signed)
                    {
                        div.html('<img src="'+window['site_config'].server_base_url+field.image+'" style="height:calc(100% - 10px)"/>');
                    }
                }
                else
                {
                    if(field.signed && field.my_record)
                    {
                        div.html('<img src="'+window['site_config'].server_base_url+field.image+'" style="height:calc(100% - 10px)"/>');
                    }
                }

                if (field.page == pageNum) {
                    $('#page_container').append(div);
                }
            });
            var my_records = $('.sign_container[my_record="true"]');
            // console.log(my_records.length, 1233);
            if(my_records.length == 0)
            {
                obj_this.isAdmin = obj_this.socketService.is_admin && !obj_this.signature_started;
            }
            else
            {
                obj_this.isAdmin = false;
            }
        }


        

    }
    prev_height = '';
    ngOnDestroy(){
        $('.router-outlet').css('height', this.prev_height);
    }
}