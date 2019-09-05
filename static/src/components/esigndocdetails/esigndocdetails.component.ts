﻿import { Component, OnInit } from '@angular/core';
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
            sign.append(`<div class='user_name'>${obj_this.selectedUser['name']}</div>`);
            sign.removeClass('active_signature');
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
                var selected_option = $('.ng-select-user-list .ng-option').eq(user_index);
                var num = obj_this.users_list.length;
                var totalHeight = $('.ng-select-user-list .scroll-host')[0].scrollHeight;
                offSet = user_index * totalHeight/num;
                $('.scroll-host').animate({
                    scrollTop: offSet
                }, 100);
                $('.ng-select-user-list .ng-input input').focus();

            }
        });


        $('#select_user_modal').on('hidden.bs.modal', function () {
            obj_this.selectedUser = undefined;
            $('.ng-select-user-list .ng-input input').focus();
            $('.active_signature').removeClass('active_signature');
        });

        
        var page_zoom = 1;
        $(function(){
            page_zoom = $('#scaleSelect').val();
        });
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
                    // console.log(obj_this.doc);
                    obj_this.selected_respondents = data.users;
                    obj_this.all_profile_users = data.all_profile_users;
                    obj_this.signature_started = data.signature_started;
                    // console.log(doc_data, 11);
                    obj_this.all_users_list = obj_this.users_list = users = data.users;
                    meeting_id = data.meeting_id;
                    send_to_all = data.send_to_all;
                    pdf_url = window['site_config'].server_base_url + data.file_url;
                    console.log('Starting render doc data', Date());
                    renderPDF(pdf_url);

                    obj_this.meetings = data.meetings;
                    // console.log(meeting_id, $('#dropdown_meeting').length, 573);
                    for(var k=0; k< data.meetings.length; k++)
                    {
                        if(data.meetings[k].id == meeting_id)
                        {
                            // console.log(send_to_all, data.meetings[k], 855);
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
                    // if (meeting_id) {
                    //     $('.check_box_send_all').show();
                    // }
                    if (send_to_all) {
                        $('#check_box_send_all').prop('checked', true);
                        $('.dragabl-fields').hide();
                    }
                    else
                    {
                        $('#check_box_send_all').prop('checked', false);
                        $('.dragabl-fields').show();
                    }

                    // if(meeting_id)
                    // {
                    //     $('.form-row.field-send_to_all input[type="checkbox"]').show();
                    // }
                }
            };
            if(token){
                ajax_options.url = '/rest/public';
            }
            window['dn_rpc_object'](ajax_options);
        }
        loadData();

        function on_sign_saved(signature_dom, data){
            // console.log(signature_dom[0], data)
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


        $('#scaleSelect')[0].selectedIndex = 4;
        //$('.modal-footer:last').hide();

        function renderPDF(pdf_url) {
            pdfDoc = null;
            scale = 1.5;
            canvas = document.getElementById('the-canvas')
            ctx = canvas.getContext('2d');
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
            // Using promise to fetch the page
            pdfDoc.getPage(num).then(function(page) {
                console.log('Got page to render', Date());
                var viewport = page.getViewport(scale);
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                // Render PDF page into canvas context
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


        function zoom(newScale) {
            // Using promise to fetch the page
            page_zoom = newScale;
            pdfDoc.getPage(pageNum).then(function(page) {
                var viewport = page.getViewport(newScale);
                var pre_width = canvas.width;
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                var new_width = canvas.width;
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                page.render(renderContext);
                //  $('.sign_container').hide();
                //  $("#nxxt_sign").css({top:$('#page_container1').scrollTop()});
                var saved_new_signs = $('.sign_container:visible,.new_sign');                
                $.each(saved_new_signs, function() {
                    set_position_on_doc($(this))                    
                });
            });            
        }

        $("#zoomIn").on('click', function zoomIn() {
            var scaleSelect = document.getElementById("scaleSelect") as HTMLSelectElement;
            var last = scaleSelect.options.length - 1;
            if (scaleSelect.selectedIndex < last) {
                scale = scaleSelect.options[scaleSelect.selectedIndex + 1].value;
                scaleSelect.selectedIndex += 1;
                zoom(scale);
            }
        });

        $("#zoomOut").on('click', function zoomOut() {
            var scaleSelect = document.getElementById("scaleSelect") as HTMLSelectElement;
            var last = scaleSelect.options.length - 1;
            if (scaleSelect.selectedIndex > 0) {
                scale = scaleSelect.options[scaleSelect.selectedIndex - 1].value;
                scaleSelect.selectedIndex -= 1;
                zoom(scale);
            }
        });

        $("#scaleSelect").on('click', function zoomSelect() {
            var scaleSelect = document.getElementById("scaleSelect") as HTMLSelectElement;
            scale = scaleSelect.options[scaleSelect.selectedIndex].value;
            zoom(scale);
        });


        function loadSignatures(data) {
            doc_data = data.doc_data;
            var height = canvas.height;
            // console.log(doc_data);
            $.each(doc_data, function() {
                // console.log(this);
                var div = $('<div></div>', {
                    id: this.id,
                    signed: this.signed,
                    name: this.name,
                    my_record: this.my_record,
                    page: this.page,
                    field_name: this.field_name,                    
                    class: "sign_container",
                    //text: this.name
                });
                // console.log(this);
                var show_text = this.type.charAt(0).toUpperCase() + this.type.slice(1);
                div.html(show_text + ":" + this.name);
                div.attr('signtype', this.type);
                var h, w;                
                if(!page_zoom)
                {
                    page_zoom = 1;
                    // console.log(page_zoom, 133);
                }
                w = this.width * page_zoom;
                h = this.height *  page_zoom;
                if(!h)
                {                    
                    h = 20 * page_zoom;
                    if(this.type == 'initials' || this.type == 'signature')
                    {
                        h = 40 * page_zoom;
                    }
                }
                if(!w)
                {
                    w = 160 * page_zoom;
                }
                // console.log(h, w, 1233);
                
                var top = this.top * page_zoom;
                var left = this.left * page_zoom;

                div.css({
                    top: top,
                    left: left,
                    position: 'absolute',
                    height: h,
                    width: w,
                });

                if (!this.signed && this.my_record) {
                    div.css({
                        background: "rgba(230, 81, 81, 0.9)"
                    });
                }
                if (obj_this.isAdmin)
                {
                    if(this.signed)
                    {
                        div.html('<img src="'+window['site_config'].server_base_url+this.image+'" style="height:calc(100% - 10px)"/>');
                    }
                }
                else
                {
                    if(this.signed && this.my_record)
                    {
                        div.html('<img src="'+window['site_config'].server_base_url+this.image+'" style="height:calc(100% - 10px)"/>');
                    }
                }

                if (this.page == pageNum) {
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
            // console.log(obj_this.isAdmin,3545);
            // console.log('Signatures loaded',obj_this.isAdmin, Date());
        }

        ///////////////////////DRAG AND DROOP//////////////////////////

        //Dragable Start
        $('.drag').draggable({
            //containment: "#page_container",
            //revert: "invalid",
            helper: "clone",
            scroll: true,
            start: function(event, ui) {
                //$(this).data("startingScrollTop", $(this).parent().scrollTop());
                $(ui.helper).css({
                    background: 'rgba(255, 235, 235, 0.9)',
                    color: 'black'
                });
            },
            drag: function(event, ui) {
                //                var st = parseInt($(this).data("startingScrollTop"));
                //                ui.position.top -= $(this).parent().scrollTop() - st;

                var positionX = $("#signature-position").position().left;
                var positionY = $("#signature-position").position().top + $(this).parent().scrollTop();

                var percent_left = (positionX / canvas.width) * 100;
                var percent_top = (positionY / canvas.height) * 100;
                $('.pstion').html('Sign Here - Positions:' + percent_left + "X" + percent_top);
            },
            cursor: 'move'
        });
        $("#page_container").droppable({
            drop: handleDropEvent,
            accept: ".drag",
            tolerance: "touch",
        });

        function on_field_type_given(el){            
            var val = el.val();
            // console.log(el[0], val);
            if(val)
            {
                el.next().before('<span class="field_type">'+val+'</span>');
                el.closest('.active_signature').attr('signtype', val);
                el.remove();
            }
        }

        function handleDropEvent(event, ui) {
            var new_signature = $(ui.helper).clone().removeClass('drag').addClass("new_sign").css({
                background: 'rgba(255, 235, 235, 0.9)',
                color: 'black'
            });
            new_signature.draggable({
                containment: "#page_container",
                scroll: true,
                start: function() {
                    //$(this).data("startingScrollTop", $(this).parent().parent().scrollTop());
                    // $("#signature-position").css({ background: 'green', color: 'white', cursor: 'move' });
                },
                drag: function(event, ui) {
                    //var st = parseInt($(this).data("startingScrollTop"));
                    //ui.position.top -= $(this).parent().parent().scrollTop() - st;
                    var positionX = $(this).position().left;
                    var positionY = $(this).position().top //+$(this).parent().scrollTop();
                    var thresh = $(this).parent().parent().height() - 40;
                    if (positionY - $(this).parent().parent().scrollTop() > thresh) {
                        $('#page_container1').animate({
                            scrollTop: $(this).parent().parent().scrollTop() + 133
                        }, 7)
                    }
                    // var percent_left = (positionX / canvas.width) * 100;
                    // var percent_top = (positionY / canvas.height) * 100;
                    // $('.sign-position').html('Sign Here - Positions:' + positionX + "X" + ($(this).position().top-$(this).parent().parent().scrollTop())+"-----"+thresh);
                },
                cursor: 'move'
            });


            if (parseFloat(new_signature[0].style.top) - $(this).parent().position().top < 0) {
                return;
            }
            var left = parseFloat(new_signature[0].style.left);
            var top = parseFloat(new_signature[0].style.top) - $(this).parent().parent().position().top + $(this).parent().scrollTop();            
            new_signature.css({
                position: 'absolute',
                left: left - 210,
                top: top, // percent_top + "%",
                // overflow: 'hidden'
            });
            // console.log(new_signature[0] ,234);
            //new_signature.append('<i class="fa fa-pen  fa-lg  edit_sign" style="color:black;float:right;margin-right:10px;" aria-hidden="true"/>');
            if (new_signature.hasClass("text_psition")) {
                new_signature.html('<input style="display:inline;width:90%" type="text" placeholder="Field Name"/>');
            }

            // new_signature.prepend('<i class="fa fa-pen  edit_sign" style="color:black;float:left" aria-hidden="true"/>');
            new_signature.prepend('<i class="fa fa-times  fa-lg del_sign doc-time-del" aria-hidden="true"/>');

            new_signature.attr({
                "page": pageNum
            }).resizable();

            new_signature.addClass('active_signature');            
            $(this).append(new_signature);
            var field_type = new_signature.find('.field_type');
            // console.log(new_signature[0], field_type);
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
        }

        function on_dropped(rect){
            
        }

        function get_db_position(el){
            var db_rect = {
                top:el.offSet().top / page_zoom, 
                left:el.offSet().left / page_zoom, 
                width:el.width() * page_zoom, 
                height:el.height() * page_zoom, 
            }
            return db_rect;
        }

        function set_position_on_doc(el){
            return;
            var width = $(this).attr('width');
            var height = $(this).attr('height');
            var left = $(this).attr('left');
            var top = $(this).attr('top');
            var zoomed_rect = {
                top:top * page_zoom, 
                left:left * page_zoom, 
                width:width * page_zoom, 
                height:height * page_zoom, 
            }
            el.css(zoomed_rect);
        }

        $("#page_container1").droppable({
            drop: function(event, ui) {
                var left = ui.position.left;
                var top = ui.position.top;
                $(ui.helper[0]).css({
                    left: left,// percent_left + "%",
                    top: top // percent_top + "%"
                });
                // console.log(ui.helper[0], 1233);
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
            window["doc_preview"].image("uuuu");
            var body = $('.youtubeVideoModal .modal-body:last');
            var content = $('.youtubeVideoModal .modal-content:last');
            var footer = $('<div class="modal-footer" style="text-align: left;"></div>');
            var input_email = $('<h3>Send by Email:</h3><input id="email" placeholder="Email" style="width:50%"/>');
            var input_name = $('<input id="email" placeholder="Name" class="modal-input-wrap" />');
            var input_subject = $('<input id="subject" placeholder="Subject" class="modal-input-wrap" />');
            var email_body = $('<textarea class="o_sign_message_textarea o_input modal-input-wrap"  "rows="4"></textarea>');
            var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Send</span>');
            var cancel_btn = $('<span class="btn btn-primary btn-sm cancelBtn doc-cencel-btn">Cancel</span>');
            var _users = false;
            input_subject.val("Signature Request")

            var meeting_id = $('#dropdown_meeting').val();
            if (!meeting_id || meeting_id == 0) {
                meeting_id = false
                // snd_to_all = false
            }

            body.append("<h3>Subject</h3>").append(input_subject);
            body.append("<h3>Message</h3>").append(email_body);
            body.append(save_btn);
            body.append(cancel_btn);
            cancel_btn.click(function(evt) {
                evt.preventDefault()
                $('.youtubeVideoModal').modal('hide');
            })
            save_btn.click(function(e) {
                var arr = [];
                // console.log(3232);
                var isEmpty = false;
                var subject = input_subject[0].value;
                var message = email_body[0].value;
                var email = input_email[1].value;
                var name = input_name[0].value;

                if (!snd_to_all) {
                    $.each(new_divs, function() {
                        var sign = $(this);
                        var a = parseFloat(sign.position().left);
                        // console.log(a, 133);
                        var b =  parseFloat(page_zoom+"");
                        var left = a / b;
                        // console.log(left, 133);
                        a = parseFloat(sign.position().top);
                        // console.log(a, 133);
                        var top = a / b + sign.parent().scrollTop();
                        // console.log(a / b, 133);
                        var h = sign[0].style.height;
                        h = parseFloat(h);
                        var w = sign[0].style.width;
                        w = parseFloat(w);
                        var pg = sign.attr("page");
                        var user = sign.attr("user");
                        if (user == 0 || !user) {
                            isEmpty = true;
                            return;
                        }
                        var type;
                        var field_name = "";
                        type = sign.attr('signtype');                        
                        field_name = type.charAt(0).toUpperCase() + type.slice(1);

                        var obj = {
                            document_id: obj_this.doc_id,
                            token: token,
                            user_id: user,
                            field_name: field_name,
                            email: email,
                            name: name,
                            left: left,
                            top: top,
                            page: pg,
                            height: h,
                            width: w,
                            zoom: canvas.width,
                            type: type
                        };
                        arr.push(obj);
                    });
                    if (isEmpty) {
                        alert("Select user for all fields!!!");
                        return;
                    }
                }
                let url = '';
                if (arr.length != 0 || snd_to_all) {
                    ajax_options = {
                        data: {
                            args: {
                                app: "esign",
                                model: "SignatureDoc",
                                method:"ws_assign_signature",
                            },
                            params: {
                                document_id: obj_this.doc_id,
                                token: token,
                                data: JSON.stringify(arr),
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
            });
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
                    window['init_sign'](sign_config);
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

                        window['init_sign'](sign_config);
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

        $(document).off("click", ".new_sign")
        $(document).on("click", ".new_sign", function(e) {
            if($(e.target).hasClass('del_sign') || $(e.target).is('input'))
            {
                return;
            }
            var sign = $(this);
            $('.active_signature').removeClass('active_signature');
            sign.addClass('active_signature');
            $('#select_user_modal').modal('show');
        });


        $("#nxxt_sign").click(function() {
            var d = $.grep(doc_data, function(v) {
                return !v.signed && v.my_record;
            });
            if (d.length == 0) {
                $(this).hide();
                // if (obj_this.is_public)
                // {
                //     window.location.href = window['site_config'].server_base_url+'/response-sumbitted'
                // }
                return;
            }
            var sign = d[0];
            var top = canvas.height * (sign.top / 100);

            var left = canvas.width * (sign.left / 100);
            renderPage(sign.page);
            $('html, #page_container1').animate({
                scrollTop: top - 150,
                scrollLeft: left - 150,
            }, 500);

            $(this).html("NEXT>").animate({
                top: ($('#page_container1').height() / 2) + "px"
            }, 500);

            setTimeout(function() {
                $('#nxxt_sign').html("NEXT>").animate({

                    top: top - $('#page_container1').scrollTop() + "px"
                }, 1000);

                $(`.sign_container[id=${sign.id}]:visible`).css({
                    border: "solid 3px yellow"
                })
            }, 600);
        });

        $('#check_box_send_all').change(function() {
            // console.log($("#check_box_send_all").is(':checked'), 444);
            if ($("#check_box_send_all").is(':checked')) {
                if($('#viewer_container .sign_container').length == 0 && $('#viewer_container .new_sign').length == 0)
                {
                    return;
                }
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
                    }
                    else{
                        $("#check_box_send_all").prop('checked', true)
                    }
                })                
            } else {
                $('.dragabl-fields').show();
            }
            save_attachemnt_to_meeting();
        })

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

        $('#dropdown_meeting').change(function() {
            if (!$('#dropdown_meeting').val()) {
                obj_this.users_list = obj_this.all_users_list;
                $('#check_box_send_all').removeAttr('checked');
                // $('.check_box_send_all').hide();
                $('.dragabl-fields').show();
            }
            save_attachemnt_to_meeting();
        });

        if ($('#save-doc-data').hasClass("o_invisible_modifier")) {
            $('#page_container1')[0].style.height = "calc(100vh - 165px)";
        }
        // });
        // console.log(document.getElementById('the-canvas'))
        // document.writeln('<script src="static/assets/js/viewer.js"></script>');
        // this.prev_height = $('.router-outlet').css('height');
        // var new_height = parseFloat(this.prev_height) + 60;
        // $('.router-outlet').css('height', new_height);
        // console.log(this.prev_height, new_height);

        function get_url(url)
        {
            if (token)
            {
                return url + '_public';
            }
            return url;
        }

    }
    prev_height = '';
    ngOnDestroy(){
        $('.router-outlet').css('height', this.prev_height);
    }
}
