import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpService } from "../../app/http.service";
import { SocketService } from "../../app/socket.service";
import { Router } from "@angular/router";
declare var $:any;


@Component({
    styleUrls: ['./esigndocdetails.css'],
    templateUrl: 'esigndocdetails.component.html'
})
export class EsignDocDetailsComponent implements OnInit {
    doc: any;
    doc_name: any;
    is_public = false;
    users_list = [];
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



    ngOnInit() {
        var obj_this = this;
        var
            canvas,
            pdf_binary,
            users,
            doc_data,
            send_to_all,
            meeting_id,
            meetings,
            req_url,
            
            ctx,
            pdfDoc,
            scale,
            pageNum,
            ajax_options,
            token = $('.sign_token').val() || "",
            doc_id = $('.e_sign_doc_id').first().html(),
            isAdmin = obj_this.socketService.is_admin;

        if (!doc_id) {
            var route_token = obj_this.route.snapshot.params.token;
            doc_id = obj_this.route.snapshot.params.id;
            if (route_token)
            {
                token = obj_this.route.snapshot.params.token;
                obj_this.is_public = true;
            }
        }
        obj_this.doc = {
            "id": doc_id,
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

        function loadData() {
            $('#loaderContainerajax').show();
            $(".o_loading").show();
            console.log('Loading doc data', Date());
            let url = '';
            ajax_options = {
                data: {
                    args:{
                        app: 'meetings',
                        model: 'SignDocument',
                        method: 'get_detail'
                    },

                    params: {
                        document_id: doc_id,
                        token: token,
                    }
                },
                onSuccess: function(data) {
                    if(obj_this.is_public && data == 'done')
                    {
                        $('#holder').hide();
                        $('body').prepend('<h1>You have Completed You Signatures</h1>');
                    }
                    doc_data = data.doc_data;
                    // console.log(doc_data, 11);
                    obj_this.users_list = users = data.users;
                    meetings = data.meetings;
                    meeting_id = data.meeting_id;
                    send_to_all = data.send_to_all;
                    pdf_binary = data.pdf_binary;
                    obj_this.doc.doc_name = data.doc_name;
                    //setTimeout(function(){ showPDF(pdf_binary); }, 3000);
                    console.log('Starting render doc data', Date());
                    renderPDF(pdf_binary);

                    if (meetings) {
                        $('#dropdown_meeting .meeting_options').remove();
                        $.each(meetings, function() {
                            $('#dropdown_meeting').append($("<option class='meeting_options'/>").val(this.id).text(this.name));
                        });
                    }
                    if (meeting_id) {
                        $('#dropdown_meeting').val(meeting_id);
                        $('.check_box_send_all').show();

                    }
                    if (send_to_all) {
                        $('#check_box_send_all').prop('checked', true);
                    }
                }
            };
            if(token)
            {
                ajax_options.url = '/rest/public';
            }
            window['dn_rpc_object'](ajax_options)
        }
        loadData();

        function toggleNextButton() {
            var d = $.grep(doc_data, function(v) {
                return !v.signed && v.my_record;
            });
            if (d.length > 0) {
                $("#nxxt_sign").show();
            }
        }


        $('#scaleSelect')[0].selectedIndex = 4;
        //$('.modal-footer:last').hide();

        function renderPDF(s) {
            $('#loaderContainerajax').show();
            $(".o_loading").show();


            var pdfData = atob(s);
            //     PDFJS.workerSrc = '/e_sign/static/js/pdf.worker.js';
            pdfDoc = null;
            scale = 1.5;
            canvas = document.getElementById('the-canvas')
            ctx = canvas.getContext('2d');
            window["PDFJS"].getDocument({
                data: pdfData
            }).then(function getPdf(_pdfDoc) {
                console.log('Got doc to render', Date());
                pdfDoc = _pdfDoc;
                if (!pageNum) {
                    pageNum = 1;
                }
                renderPage(pageNum);
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
                page.render(renderContext);
                console.log('Page rendered', Date());
            });
            // Update page counters
            pageNum = num;
            document.getElementById('page_num').textContent = pageNum;
            document.getElementById('page_count').textContent = pdfDoc.numPages;
            $('.saved_sign').hide();
            $('.new_sign').hide();
            var selector = '.new_sign[page=' + pageNum + ']';
            $(selector).show();
            
            //  $("#nxxt_sign").css({top:$('#page_container1').scrollTop()});
            setTimeout(function() {                
                loadSignatures({
                    "doc_data": doc_data
                });
            }, 200);
            $('#loaderContainerajax').hide();
            $(".o_loading").hide();
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
                //  $('.saved_sign').hide();
                //  $("#nxxt_sign").css({top:$('#page_container1').scrollTop()});
                var saved_new_signs = $('.saved_sign:visible,.new_sign');
                $.each(saved_new_signs, function() {
                    var h, w, perc;
                    if (pre_width > canvas.width) {
                        perc = (canvas.width / pre_width);
                        w = parseFloat($(this)[0].style.width) * perc;
                        h = parseFloat($(this)[0].style.height) * perc;
                    }

                    if (pre_width < canvas.width) {
                        perc = (canvas.width / pre_width);
                        w = parseFloat($(this)[0].style.width) * perc;
                        h = parseFloat($(this)[0].style.height) * perc;
                    }

                    if (pre_width == canvas.width) {
                        w = parseFloat($(this)[0].style.width);
                        h = parseFloat($(this)[0].style.height);
                    }

                    $(this).css({
                        width: w,
                        height: h
                    });
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
                    //zoom:this.zoom,
                    page: this.page,
                    field_name: this.field_name,
                    //w:this.width,
                    //h:this.height,
                    class: "saved_sign",
                    //text: this.name
                });
                if (this.type == 'sign' && !this.signed) {
                    div.html("Signature:" + this.name)
                }
                if (this.type == 'initial' && !this.signed) {
                    div.html("Initials:" + this.name)
                }
                if (this.type == 'date' && !this.signed) {
                    div.html("Date:" + this.name)
                }
                if (this.type == 'text' && !this.signed) {
                    div.html(this.field_name + ":" + this.name)
                }


                if (this.type == 'sign') {
                    div.addClass("is_sign");
                }
                if (this.type == 'initial') {
                    div.addClass("is_initial");
                }
                if (this.type == 'date') {
                    div.addClass("is_date");
                }
                if (this.type == 'text') {
                    div.addClass("is_text");
                }


                var h, w, perc, diff;
                if (this.zoom > canvas.width) {
                    perc = (canvas.width / this.zoom);
                    w = this.width * perc;
                    h = this.height * perc;
                }

                if (this.zoom < canvas.width) {
                    perc = (canvas.width / this.zoom);
                    w = this.width * perc;
                    h = this.height * perc;
                }

                if (this.zoom == canvas.width) {
                    w = this.width;
                    h = this.height;
                }

                div.css({
                    top: this.top + "%",
                    left: this.left + "%",
                    position: 'absolute',
                    width: w,
                    height: h
                });
                if (!this.signed && this.my_record) {
                    div.css({
                        background: "rgba(230, 81, 81, 0.9)"
                    });
                }
                if (isAdmin)
                {
                    if(this.signed)
                    {
                        div.html('<img src="'+window['site_config'].server_base_url+this.image+'" height="100%"/>');
                    }
                }
                else
                {
                    if(this.signed && this.my_record)
                    {
                        div.html('<img src="'+window['site_config'].server_base_url+this.image+'" height="100%"/>');
                    }
                }

                if (this.page == pageNum) {
                    $('#page_container').append(div);
                }
            });
            console.log('Signatures loaded', Date());
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
                    height: '50px',
                    width: '150px',
                    padding: 0,
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
                    var percent_left = (positionX / canvas.width) * 100;
                    var percent_top = (positionY / canvas.height) * 100;
                    // $('.sign-position').html('Sign Here - Positions:' + positionX + "X" + ($(this).position().top-$(this).parent().parent().scrollTop())+"-----"+thresh);
                },
                cursor: 'move'
            });


            if (parseFloat(new_signature[0].style.top) - $(this).parent().position().top < 0) {
                return;
            }
            var left = parseFloat(new_signature[0].style.left) - $(this).offset().left + 65;
            var top = parseFloat(new_signature[0].style.top) - $(this).parent().parent().position().top + $(this).parent().scrollTop();
            var percent_left = (left / canvas.width) * 100;
            var percent_top = (top / canvas.height) * 100;
            new_signature.css({
                position: 'absolute',
                left: percent_left + "%",
                top: percent_top + "%",
                overflow: 'hidden'
            });
            // console.log(percent_left, percent_top);
            //new_signature.append('<i class="fa fa-pen  fa-lg  edit_sign" style="color:black;float:right;margin-right:10px;" aria-hidden="true"/>');
            if (new_signature.hasClass("text_psition")) {

                new_signature.html('<input style="display:inline;width:90%" type="text" placeholder="Field Name"/>');

            }

            new_signature.prepend('<i class="fa fa-pen  edit_sign" style="color:black;float:left" aria-hidden="true"/>');
            new_signature.prepend('<i class="fa fa-times  fa-lg del_sign" style="color:black;float:left" aria-hidden="true"/>');

            new_signature.attr({
                "page": pageNum
            }).resizable();

            new_signature.addClass('active_signature');
            $(this).append(new_signature);            
            $('#select_user_modal').modal('show');
            $(".save_doc_data").removeAttr('disabled');
        }

        $("#page_container1").droppable({
            drop: function(event, ui) {
                var left = ui.position.left;
                var top = ui.position.top;
                var percent_left = (left / canvas.width) * 100;
                var percent_top = (top / canvas.height) * 100;
                $(ui.helper[0]).css({
                    left: percent_left + "%",
                    top: percent_top + "%"
                });
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
            var input_name = $('<input id="email" placeholder="Name" style="width:50%"/>');
            var input_subject = $('<input id="subject" placeholder="Subject" style="width:50%"/>');
            var email_body = $('<textarea class="o_sign_message_textarea o_input" style="border-style: solid;width: 100%;"rows="4"></textarea>');
            var save_btn = $('<br><span class="btn btn-primary btn-sm DocsBtn">Send</span>');
            var cancel_btn = $('<span class="btn btn-primary btn-sm cancelBtn">cancel</span>');
            var _users = false;
            input_subject.val("Signature Request")

            var meeting_id = $('#dropdown_meeting').val();
            if (!meeting_id || meeting_id == 0) {
                meeting_id = false
                snd_to_all = false
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
                var isEmpty = false;
                var subject = input_subject[0].value;
                var message = email_body[0].value;
                var email = input_email[1].value;
                var name = input_name[0].value;

                if (!snd_to_all) {
                    $.each(new_divs, function() {
                        var sign = $(this);
                        var left = sign.position().left;
                        var top = sign.position().top + sign.parent().scrollTop();
                        var percent_left = parseFloat(sign[0].style.left) //(left/canvas.width)*100;
                        var percent_top = parseFloat(sign[0].style.top) //(top/canvas.height)*100;
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
                        if (sign.hasClass("sign_psition")) {
                            type = "sign"
                        }
                        if (sign.hasClass("initial_psition")) {
                            type = "initial"
                        }
                        if (sign.hasClass("date_psition")) {
                            type = "date"
                        }
                        if (sign.hasClass("name_psition")) {
                            type = "text"
                            field_name = "Name"
                        }
                        if (sign.hasClass("email_psition")) {
                            type = "text"
                            field_name = "Email"
                        }
                        if (sign.hasClass("phone_psition")) {
                            type = "text"
                            field_name = "Phone"
                        }
                        if (sign.hasClass("company_psition")) {
                            type = "text"
                            field_name = "Company"
                        }
                        if (sign.hasClass("text_psition")) {
                            type = "text";
                            field_name = sign.find('input').val();
                            if (field_name == "") {
                                isEmpty = true;

                                return;
                            }
                        }

                        var obj = {
                            document_id: doc_id,
                            token: token,
                            user_id: user,
                            field_name: field_name,
                            email: email,
                            name: name,
                            left: percent_left,
                            top: percent_top,
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
                url = get_url('/esign/save_sign_data');
                if (arr.length != 0 || snd_to_all) {
                    window['dn_rpc_object']({
                        url: url,
                        data: {
                            args: {
                                app: "meetings",
                                model: "SignDocument"
                            },
                            params: {
                                document_id: doc_id,
                                token: token,
                                'data': JSON.stringify(arr),
                                url: url,
                                meeting_id: meeting_id,
                                subject: subject,
                                message: message,
                                send_to_all: snd_to_all
                            }
                        },
                        onSuccess: function(data) {
                            loadData();
                            $(".save_doc_data").attr('disabled', 'disabled');
                            new_divs.hide().removeClass("new_sign");
                            $('.youtubeVideoModal').modal('hide');
                            $("#nxxt_sign").click();
                        }
                    })
                }
            });
        });
        $(document).off("click", ".saved_sign.is_sign,.saved_sign.is_initial")
        $(document).on("click", ".saved_sign.is_sign,.saved_sign.is_initial", function() {
            var login = $(this).attr("login");
            var my_record = $(this).attr("my_record");

            if (my_record == "false" && !isAdmin) {
                return;
            }
            var signature_id = $(this).attr("id");
            var usr_name = $(this).attr("name");
            window["doc_preview"].image("uuuu");
            var body = $('.youtubeVideoModal .modal-body:last');
            var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Save</span>');
            var cancel_btn = $('<span class="btn btn-primary btn-sm cancelBtn">Cancel</span>');
            var del_btn = $('<span style="float:right" class="btn btn-primary btn-sm DocsBtn">Remove</span>');

            var signature_editor = $('<div id="signature_editor_esign"></div>');

            var clear_btn = $('<span class="btn btn-danger btn-sm DocsBtn">Clear</span>');
            var draw_sign_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Draw</span>');
            var upload_btn = $('<input accept=".jpg,.png,.jpeg" style="display:none" type="file"></input>');

            var auto_sign = $('<span class="btn btn-primary btn-sm DocsBtn">Auto</span>');
            var top_div = $('<div class="DocsButtonWrapper" style="font-size:14px; height:auto" />');
            var upload_clicker = $('<button class="btn btn-sm btn-primary o_select_file_button DocsBtn"title="Select" type="button">Upload</button>');
            upload_clicker = $(upload_clicker);
            upload_clicker.click(function() {
                upload_btn.click();
            });

            top_div.append(draw_sign_btn).append(upload_clicker).append(auto_sign).append(upload_btn);
            if (my_record == "true") {
                body.append(signature_editor);
                signature_editor.before(top_div);
                signature_editor.after(clear_btn);
                signature_editor.signature();
                body.append(save_btn);
                if (isAdmin) {
                    body.append(del_btn);
                }

                var myCanvas = signature_editor.find('canvas')[0];
                var canvas_context = myCanvas.getContext('2d');
                var img = new Image();
                img.onload = function() {
                    //                diffy = diffy/2;
                    //                var hidden_image_height = hidden_image.height();
                    //                var hidden_image_width = hidden_image.width();
                    //                var diffx = signature_editor.width() - hidden_image_width;
                    //                var diffy = signature_editor.height() - hidden_image_height;
                    //                diffx = diffx/2;
                    //                diffy = diffy/2;
                    //                canvas_context.drawImage(img, diffx, diffy,hidden_image_width,hidden_image_height);

                    //                myCanvas.height=hidden_image_height;
                    //                myCanvas.width=hidden_image_width;
                    canvas_context.drawImage(img, 0, 0, signature_editor.width(), signature_editor.height());

                };

                //            var hidden_image_container = '<div id="hidden_img_cont" ';
                //            var hic_style =' style="visibility:hidden;height:'+signature_editor.height()+'px;width:'+signature_editor.width()+'px"';
                //            hidden_image_container = $(hidden_image_container + hic_style + '/>');
                //            var hidden_image = $('<img style="max-height:100%;max-width:100%" />');
                //            body.append(hidden_image_container);
                //            hidden_image_container.html(hidden_image);
                ajax_options = {
                    data: {
                        args: {
                            app: "esign",
                            model: "SignatureDoc",
                            method: "get_signature"
                        },
                        params: {
                            signature_id: signature_id,
                            document_id: doc_id,
                            token: token
                        }
                    },
                    onSuccess: function(data) {
                        setTimeout(function() {
                            load_signature(data);
                        }, 200);
                    }
                };
                if(token){
                    ajax_options.url = '/rest/public';
                }
                window['dn_rpc_object'](ajax_options)


                var dataURL = '';


                var auto_clicked = false;
                auto_sign.click(function(e) {
                    $('#loaderContainerajax').show();
                    auto_clicked = true;
                    let url = '';
                    url = get_url('/esign/save_signature');
                    window['dn_rpc_object']({
                        url: url,
                        data: {
                            args: {
                                app: "meetings",
                                model: "SignDocument"
                            },
                            params: {
                                signature_id: signature_id,
                                document_id: doc_id,
                                token: token,
                                binary_signature: "",
                                type: "auto",
                                url: url
                            }
                        },
                        onSuccess: function(data) {
                            load_signature(data);
                            $("#nxxt_sign").click();
                        }
                    })
                });

                signature_editor.mousedown(function() {
                    auto_clicked = false;

                });

                upload_btn.change(function() {
                    if (!this.files)
                        return;
                    if (this.files.length < 1)
                        return;
                    var reader = new FileReader();
                    auto_clicked = false;

                    var upload_file = this.files[0];
                    reader.readAsDataURL(upload_file);
                    reader.onload = function() {
                        var dataURL = reader.result;
                        //                    hidden_image.attr('src',dataURL);
                        canvas_context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                        img.src = dataURL + "";
                    }
                });

                save_btn.click(function(e) {
                    $('#loaderContainerajax').show();
                    var type = "draw";
                    dataURL = myCanvas.toDataURL();
                    var empty_url = "data:image/png;base64,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"
                    if (dataURL == empty_url) {
                        alert('Draw signature');
                        return;
                    }
                    dataURL = dataURL.replace('data:image/png;base64,', '');
                    if(auto_clicked){
                        type="auto";
                    }
                    let url = '';
                    url = get_url('/esign/save_signature');
                    window['dn_rpc_object']({
                        url: url,
                        data: {
                            args: {
                                app: "meetings",
                                model: "SignDocument"
                            },
                            params: {
                                signature_id: signature_id,
                                document_id: doc_id,
                                token: token,
                                binary_signature: dataURL,
                                type: type,
                                url: url
                            }
                        },
                        onSuccess: function(data) {
                            doc_data = data.doc_data;
                            // renderPDF(data.pdf_binary);
                            loadData();
                            $('.youtubeVideoModal').modal('hide');
                            $('#loaderContainerajax').hide();
                            $("#nxxt_sign").click();
                            // web_client.do_notify(_("Success"), "Signature saved");
                        }
                    })

                });

                cancel_btn.click(function(evt) {
                    evt.preventDefault();
                    $('.youtubeVideoModal').modal('hide');
                });

                clear_btn.click(function() {
                    signature_editor.signature('clear');
                });

                draw_sign_btn.click(function() {
                    signature_editor.signature('clear');
                });

            } else {
                body.append('<h3>Name:</h3>' + usr_name);
                if (isAdmin) {
                    body.append(del_btn);
                }
            }

            function load_signature(data) {
                signature_editor.signature();
                signature_editor.signature('clear');
                var signature_value = data.signature;
                if (signature_value && signature_value.length > 0) {
                    dataURL = 'data:image/png;base64,' + data.signature;
                    //                    hidden_image.attr('src',dataURL);
                    img.src = dataURL;
                }
                $('#loaderContainerajax').hide();
            }



            del_btn.click(function(e) {
                if (confirm('Delete it permanently?')) {
                    let url = '';
                    url = get_url('/esign/delete_signature');
                    window['dn_rpc_object']({
                        url: url,
                        data: {
                            args: {
                                app: "meetings",
                                model: "SignDocument"
                            },
                            params: {
                                signature_id: signature_id,
                                document_id: doc_id,
                                token: token,
                                url: url
                            }
                        },
                        onSuccess: function(data) {
                            loadData();
                            $("#nxxt_sign").click();

                            // web_client.do_notify(_("Success"), "Signature saved");
                        }
                    })

                    $('.youtubeVideoModal').modal('hide');
                }
            });
        });
        $(document).off("click", ".saved_sign.is_date")
        $(document).on("click", ".saved_sign.is_date", function(e) {
            var my_record = $(this).attr("my_record");
            if (my_record == "false" && !isAdmin) {
                return;
            }
            var signature_id = $(this).attr("id");
            var usr_name = $(this).attr("name");
            window["doc_preview"].image("uuuu");
            var body = $('.youtubeVideoModal .modal-body:last');
            var content = $('.youtubeVideoModal .modal-content:last');
            var footer = $('<div class="modal-footer" style="text-align: left;"></div>');
            var input_date = $('<input id="date" disabled placeholder="Date" style="width:50%"/>');
            var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Save</span>');
            var del_btn = $('<span style="float:right" class="btn btn-primary btn-sm DocsBtn">Remove</span>');
            var cancel_btn = $('<span class="btn btn-primary btn-sm cancelBtn">Cancel</span>');
            input_date.val($.datepicker.formatDate('dd/mm/yy', new Date()));
            body.html("<h3>Name:</h3>" + usr_name + "<h3>Date:</h3>").append(input_date);


            if (my_record == "true") {
                body.append(save_btn);
            }

            if (isAdmin) {
                body.append(del_btn);

            }

            save_btn.click(function(e) {
                var date = input_date.val();
                let url = '';
                url = get_url('/esign/save_signature');
                window['dn_rpc_object']({
                    url: url,
                    data: {
                        args: {
                            app: "meetings",
                            model: "SignDocument"
                        },
                        params: {
                            signature_id: signature_id,
                            document_id: doc_id,
                            token: token,
                            date: date,
                            type: "date",
                            url: url
                        }
                    },
                    onSuccess: function(data) {
                        // doc_data = data.doc_data;
                        // renderPDF(data.pdf_binary);
                        loadData();
                        $("#nxxt_sign").click();
                    }
                })
                $('.youtubeVideoModal').modal('hide');
            });

            cancel_btn.click(function(evt) {
                evt.preventDefault();
                $('.youtubeVideoModal').modal('hide');
            });

            del_btn.click(function(e) {
                if (confirm('Delete it permanently?')) {
                    let url = '';
                    url = get_url('/esign/delete_signature');
                    window['dn_rpc_object']({
                        url: url,
                        data: {
                            args: {
                                app: "meetings",
                                model: "SignDocument"
                            },
                            params: {
                                signature_id: signature_id,
                                document_id: doc_id,
                                token: token,
                                url: url
                            }
                        },
                        onSuccess: function(data) {
                            // doc_data = data.doc_data;
                            // renderPDF(data.pdf_binary);
                            loadData();
                            $("#nxxt_sign").click();
                        }
                    })
                    $('.youtubeVideoModal').modal('hide');
                }
            });
        });
        $(document).off("click", ".saved_sign.is_text")
        $(document).on("click", ".saved_sign.is_text", function(e) {
            var my_record = $(this).attr("my_record");
            if (my_record == "false" && !isAdmin) {
                return;
            }
            var signature_id = $(this).attr("id");
            var usr_name = $(this).attr("name");
            var field_name = $(this).attr("field_name");
            window["doc_preview"].image("uuuu");
            var body = $('.youtubeVideoModal .modal-body:last');
            var content = $('.youtubeVideoModal .modal-content:last');
            var input_text = $(`<input id="text"  placeholder=${field_name} style="width:50%"/>`);
            var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Save</span>');
            var del_btn = $('<span style="float:right" class="btn btn-primary btn-sm DocsBtn">Remove</span>');
            var cancel_btn = $('<span class="btn btn-primary btn-sm cancelBtn">Cancel</span>');
            body.html(`<h3>Name:</h3>${usr_name}`);


            if (my_record == "true") {

                body.append(`<h3>${field_name}:</h3>`).append(input_text);
                body.append(save_btn);
            }

            if (isAdmin) {
                body.append(del_btn);

            }

            save_btn.click(function(e) {
                var text = input_text.val();
                if (text == "") {
                    alert("Enter text")
                    return;
                }
                let url = '';
                url = get_url('/esign/save_signature');
                window['dn_rpc_object']({
                    url: url,
                    data: {
                        args: {
                            app: "meetings",
                            model: "SignDocument"
                        },
                        params: {
                            signature_id: signature_id,
                            document_id: doc_id,
                            token: token,
                            text: text,
                            type: "text",
                            url: url
                        }
                    },
                    onSuccess: function(data) {
                        // doc_data = data.doc_data;
                        // renderPDF(data.pdf_binary);
                        loadData();
                        $("#nxxt_sign").click();
                    }
                })
                $('.youtubeVideoModal').modal('hide');
            });

            cancel_btn.click(function(evt) {
                evt.preventDefault();
                $('.youtubeVideoModal').modal('hide');
            });

            del_btn.click(function(e) {
                if (confirm('Delete it permanently?')) {
                    let url = '';
                    url = get_url('/esign/delete_signature');
                    window['dn_rpc_object']({
                        url: url,
                        data: {
                            args: {
                                app: "meetings",
                                model: "SignDocument"
                            },
                            params: {
                                signature_id: signature_id,
                                document_id: doc_id,
                                token: token,
                                url: url
                            }
                        },
                        onSuccess: function(data) {
                            // doc_data = data.doc_data;
                            // renderPDF(data.pdf_binary);
                            loadData();
                            $("#nxxt_sign").click();
                        }
                    })
                    $('.youtubeVideoModal').modal('hide');
                }
            });
        });
        $(document).off("click", ".new_sign .del_sign")
        $(document).on("click", ".new_sign .del_sign", function(e) {            
            var sign = $($(this)[0].parentElement);
            var new_divs = $('.new_sign:visible');
            if (new_divs.length == 1) {
                $(".save_doc_data").attr('disabled', 'disabled');
            }
            sign.fadeOut();
            sign.removeClass("new_sign");
        });

        $(document).off("click", ".new_sign")
        $(document).on("click", ".new_sign", function(e) {
            if($(e.target).hasClass('del_sign'))
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

                $(`.saved_sign[id=${sign.id}]:visible`).css({
                    border: "solid 3px yellow"
                })
            }, 600);
        });

        $('#check_box_send_all').change(function() {

            if ($("#check_box_send_all").is(':checked')) {
                $('.top_btns .position_btns').removeClass("drag").attr("disabled", true)
                $(".save_doc_data").attr("disabled", false);
                $('.new_sign').remove();
            } else {
                $('.top_btns .position_btns').addClass("drag").attr("disabled", false)
                $(".save_doc_data").attr("disabled", true);
                //$('.new_sign').show();
            }
        })

        $('#dropdown_meeting').change(function() {
            if ($('#dropdown_meeting').val() == 0) {
                $('.check_box_send_all').hide();
            } else {
                $('.check_box_send_all').show();
            }
        });

        if ($('#save-doc-data').hasClass("o_invisible_modifier")) {
            $('#page_container1')[0].style.height = "calc(100vh - 165px)";
        }
        // });
        // console.log(document.getElementById('the-canvas'))
        // document.writeln('<script src="static/assets/js/viewer.js"></script>');
        this.prev_height = $('.router-outlet').css('height');
        var new_height = parseFloat(this.prev_height) + 20;        
        $('.router-outlet').css('height', new_height);        
        // console.log(this.prev_height, new_height);
        
        function get_url(url)
        {
            if (obj_this.is_public)
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