
$(function(){
console.log(777);
    var canvas=document.getElementById('the-canvas'),
	pdf_binary,
	users,
	doc_data,
	req_url,
	doc_id=$('.e_sign_doc_id').first().html().trim(),
	input_data = {document_id:doc_id },
	isAdmin,
	pdfDoc,
	pageNum,
	token=$('.sign_token').val(),
	ctx=canvas.getContext('2d'),
	url=window.location.href;



     function loadData(){
                req_url = '/e-sign/get_doc_data';
                input_data = {document_id:doc_id,token:token,url:url};
                dn_json_rpc(req_url,input_data, function(data)
                {
                doc_data=data.doc_data
                users=data.users;
                pdf_binary=data.pdf_binary;
                isAdmin=data.isAdmin;
                //setTimeout(function(){ showPDF(pdf_binary); }, 3000);
                renderPDF(pdf_binary);
                 var d = $.grep(doc_data, function(v)
                    {
                        return !v.signed && v.my_record;
                    });
                if(d.length==0){
                $("#nxxt_sign").hide();
                }
                //loadSignatures(data);
                });

            }
            loadData();

$('#scaleSelect')[0].selectedIndex = 4;
//$('.modal-footer:last').hide();

function renderPDF(s) {

     var pdfData = atob(s);
     PDFJS.workerSrc = '/e_sign/static/js/pdf.worker.js';
     pdfDoc = null;
     scale = 1.5;
     ctx = canvas.getContext('2d');
     PDFJS.getDocument({data: pdfData}).then(function getPdf(_pdfDoc)
     {
         pdfDoc = _pdfDoc;
         if(!pageNum)
            {
                pageNum = 1;
            }
         renderPage(pageNum);
     });
 }
 

 function base64ToUint8Array(base64) {//base64 is an encoded byte Array sent from server-side
 var raw = atob(base64); //This is a native function that decodes a base64-encoded string.
 var uint8Array = new Uint8Array(new ArrayBuffer(raw.length));
 for (var i = 0; i < raw.length; i++) {
 uint8Array[i] = raw.charCodeAt(i);
 }
 return uint8Array;
 }

 function renderPage(num) {
 // Using promise to fetch the page
 pdfDoc.getPage(num).then(function (page) {
 var viewport = page.getViewport(scale);
 canvas.height = viewport.height;
 canvas.width = viewport.width;
 // Render PDF page into canvas context
 var renderContext = {
 canvasContext: ctx,
 viewport: viewport
 };
 page.render(renderContext);
 });
 // Update page counters
 pageNum=num;
 document.getElementById('page_num').textContent = pageNum;
 document.getElementById('page_count').textContent = pdfDoc.numPages;
  $('.saved_sign').hide();
  $('.new_sign').hide();
  var selector='.new_sign[page='+pageNum+']';
  $(selector).show();

//  $("#nxxt_sign").css({top:$('#page_container1').scrollTop()});
  setTimeout(function(){ loadSignatures({"doc_data":doc_data}); }, 200);
   // loadSignatures({"doc_data":doc_data});
 }


 // Go to previous page
$("#prev").on('click',function goPrevious() {
 if (pageNum <= 1)
 return;
 pageNum -- ;
 renderPage(pageNum);
 });
 
 // Go to next page
$("#next").on('click',function goNext() {
 if (pageNum >= pdfDoc.numPages)
 return;
 pageNum++;
 renderPage(pageNum);
 });
 

 function zoom(newScale) {
 // Using promise to fetch the page

 pdfDoc.getPage(pageNum).then(function (page) {
 var viewport = page.getViewport(newScale);
 var pre_width=canvas.width;
 canvas.height = viewport.height;
 canvas.width = viewport.width;
 var new_width=canvas.width;
 // Render PDF page into canvas context
 var renderContext = {
 canvasContext: ctx,
 viewport: viewport
 };
 page.render(renderContext);
//  $('.saved_sign').hide();
  $("#nxxt_sign").css({top:$('#page_container1').scrollTop()});
  var saved_new_signs=$('.saved_sign:visible,.new_sign');
  $.each(saved_new_signs, function() {
    var h,w,perc;
             if (pre_width >canvas.width){
                perc = (canvas.width / pre_width);
                w=parseFloat($(this)[0].style.width)*perc;
                h = parseFloat($(this)[0].style.height)*perc;
                }

              if (pre_width <canvas.width){
                perc = (canvas.width / pre_width);
                w=parseFloat($(this)[0].style.width)*perc;
                h = parseFloat($(this)[0].style.height)*perc;
                }

               if (pre_width ==canvas.width){
                w=parseFloat($(this)[0].style.width);
                h = parseFloat($(this)[0].style.height);
                }

             $(this).css({width:w,height:h });


  });

  //setTimeout(function(){ loadSignatures({"doc_data":doc_data}); }, 500);
//    loadSignatures({"doc_data":doc_data});
 });
 }

$("#zoomIn").on('click',function zoomIn() {
 var scaleSelect = document.getElementById("scaleSelect");
 var last = scaleSelect.options.length -1;
 if (scaleSelect.selectedIndex < last) {
 scale = scaleSelect.options[scaleSelect.selectedIndex + 1].value;
 scaleSelect.selectedIndex += 1;
 zoom(scale);
 }
 });

$("#zoomOut").on('click',function zoomOut() {
 var scaleSelect = document.getElementById("scaleSelect");
 var last = scaleSelect.options.length - 1;
 if (scaleSelect.selectedIndex > 0) {
 scale = scaleSelect.options[scaleSelect.selectedIndex -1].value;
 scaleSelect.selectedIndex -= 1;
 zoom(scale);
 }});

$("#scaleSelect").on('click',function zoomSelect() {
 var scaleSelect = document.getElementById("scaleSelect");
 scale = scaleSelect.options[scaleSelect.selectedIndex].value;
 zoom(scale);
 });

function loadSignatures(data){

    doc_data=data.doc_data;

    var height=canvas.height;
    $.each(doc_data, function() {

             var div=$('<div></div>', {
                        id: this.id,
                        signed:this.signed,
                        name:this.name,
                        my_record:this.my_record,
                        //zoom:this.zoom,
                        page:this.page,
                        field_name:this.field_name,
                        //w:this.width,
                        //h:this.height,
                        class:"saved_sign",
                        style: "cursor:pointer;width:190px;height:40px;border:2px dotted gray;font-weight: bold;color:black;z-index:999;overflow:hidden",
                        //text: this.name
                    });
             if(this.type=='sign' && !this.signed)
             {
              div.html("Signature:"+this.name)
             }
             if(this.type=='initial' && !this.signed)
             {
              div.html("Initials:"+this.name)
             }
             if(this.type=='date' && !this.signed)
             {
              div.html("Date:"+this.name)
             }
             if(this.type=='text' && !this.signed)
             {
              div.html(this.field_name+":"+this.name)
             }


             if(this.type=='sign')
             {
              div.addClass("is_sign");
             }
             if(this.type=='initial')
             {
              div.addClass("is_initial");
             }
             if(this.type=='date')
             {
              div.addClass("is_date");
             }
             if(this.type=='text')
             {
              div.addClass("is_text");
             }


             var h,w,perc,diff;
             if (this.zoom >canvas.width){
                perc = (canvas.width / this.zoom);
                w=this.width *perc;
                h = this.height *perc;
                }

              if (this.zoom <canvas.width){
                perc = (canvas.width / this.zoom);
                w=this.width *perc;
                h = this.height *perc;
                }

               if (this.zoom ==canvas.width){
                w=this.width;
                h = this.height;
                }

             div.css({ top:this.top+"%", left: this.left+"%", position: 'absolute',width:w,height:h });
             if(!this.signed && this.my_record){
                div.css({ background:"rgba(230, 81, 81, 0.9)"});
             }

             if(this.page==pageNum)
               {
                    $('#page_container').append(div);
               }
            });

}

///////////////////////DRAG AND DROOP//////////////////////////

        //Dragable Start
        $('.drag').draggable({
            //containment: "#page_container",
            //revert: "invalid",
            helper: "clone",
            scroll: true,
            start: function () {
                //$(this).data("startingScrollTop", $(this).parent().scrollTop());
                //$("#signature-position").css({ background: 'green', color: 'white', cursor: 'move' });
            },
            drag: function (event, ui) {
//                var st = parseInt($(this).data("startingScrollTop"));
//                ui.position.top -= $(this).parent().scrollTop() - st;

                var positionX = $("#signature-position").position().left;
                var positionY = $("#signature-position").position().top+$(this).parent().scrollTop();

                var percent_left=(positionX/canvas.width)*100;
                var percent_top=(positionY/canvas.height)*100;
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
            var new_signature = $(ui.helper).clone().removeClass('drag').addClass("new_sign").css({background: 'rgba(255, 235, 235, 0.9)',color:'black'});
            new_signature.draggable({
            containment: "#page_container",
            scroll: true,
            start: function () {
                //$(this).data("startingScrollTop", $(this).parent().parent().scrollTop());
               // $("#signature-position").css({ background: 'green', color: 'white', cursor: 'move' });
            },
            drag: function (event, ui) {
            console.log(event,ui);
                //var st = parseInt($(this).data("startingScrollTop"));
                //ui.position.top -= $(this).parent().parent().scrollTop() - st;
                var positionX = $(this).position().left;
                var positionY = $(this).position().top//+$(this).parent().scrollTop();
                var thresh = $(this).parent().parent().height() - 40;
                if(positionY-$(this).parent().parent().scrollTop()>thresh){
                    console.log("yyyyyyyyyyyyyyyyyyy");
                    $( '#page_container1').animate({scrollTop: $(this).parent().parent().scrollTop()+133}, 7)
                }



                var percent_left=(positionX/canvas.width)*100;
                var percent_top=(positionY/canvas.height)*100;
//                $('.sign-position').html('Sign Here - Positions:' + positionX + "X" + ($(this).position().top-$(this).parent().parent().scrollTop())+"-----"+thresh);

            },
            cursor: 'move'
        });


            if(parseFloat(new_signature[0].style.top)-$(this).parent().position().top<0){
                return;
            }
            var left=parseFloat(new_signature[0].style.left)-$(this).position().left;
            var top=parseFloat(new_signature[0].style.top)-$(this).parent().position().top+$(this).parent().scrollTop();
            var percent_left=(left/canvas.width)*100;
            var percent_top=(top/canvas.height)*100;
           new_signature.css({position:'absolute',left:percent_left+"%",top:percent_top+"%",overflow:'hidden'});
//           new_signature.append('<i class="fa fa-pencil  fa-lg  edit_sign" style="color:black;float:right;margin-right:10px;" aria-hidden="true"/>');
           if (new_signature.hasClass("text_psition")){

                    new_signature.html('<input style="display:inline;width:90%" type="text" placeholder="Field Name"/>');

                }
           new_signature.prepend('<i class="fa fa-times  fa-lg del_sign" style="margin-top:-6px;color:black;float:left" aria-hidden="true"/>');
           new_signature.attr({"page":pageNum}).resizable();


            $(this).append(new_signature);
            $(".save_doc_data").removeAttr('disabled');
        }

        $("#page_container1").droppable({
            drop: function (event, ui) {
                var left=ui.position.left;
                var top=ui.position.top;
                var percent_left=(left/canvas.width)*100;
                var percent_top=(top/canvas.height)*100;
                $(ui.helper[0]).css({left:percent_left+"%",top:percent_top+"%"});
            },
            accept: ".new_sign",
            tolerance: "touch",
        });
        //End Dragable


$(document).on("click",".top_btns .save_doc_data", function(e){
        var new_divs =$('.new_sign');
        if(new_divs.length==0){
            return;
        }
		doc_preview.image("uuuu");
        var body=$('.youtubeVideoModal .modal-body:last');
        var content=$('.youtubeVideoModal .modal-content:last');
        var footer = $('<div class="modal-footer" style="text-align: left;"></div>');
		var dropdown = $('<select id="dropdown" style="width:50%"></select>');
		var input_email = $('<h2>Send by Email:</h2><input id="email" placeholder="Email" style="width:50%"/>');
		var input_name = $('<input id="email" placeholder="Name" style="width:50%"/>');
		var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Save</span>');
		var meeting_id=$('.esign_doc_meet_id').html()
            if(!meeting_id || meeting_id=="False"){
                meeting_id=false
            }
            else{
                var meet_users = JSON.parse($('.esign_doc_meet_users').html());
                users=meet_users;
            }

		body.html("<h2>Select User</h2>").append(dropdown) //.append(input_email).append(input_name);
		body.append(save_btn);

        dropdown.append($("<option />").val(0).text("Select User"));

		$.each(users, function() {
         dropdown.append($("<option />").val(this.id).text(this.name));
        });
        input_email.click(function(e)
        {
        dropdown[0].selectedIndex = 0;
        });
        save_btn.click(function(e){
            var arr=[];
            var isEmpty=false;
//            var work_flow_enabled=$('.e_sign_wrk_flow input')[0].checked;
            var user=dropdown.val();
            var email =input_email[1].value;
            var name =input_name[0].value;
            if(!(user!=0 || (email!='' && name!=''))){
                alert("Select user or Enter email and name.")
                return;
                }

            $.each(new_divs, function() {
                var sign=$(this);
                var left=sign.position().left;
                var top=sign.position().top+sign.parent().scrollTop();
                var percent_left=parseFloat(sign[0].style.left)//(left/canvas.width)*100;
                var percent_top=parseFloat(sign[0].style.top)//(top/canvas.height)*100;
                var h=sign[0].style.height;
                h=parseFloat(h);
                var w=sign[0].style.width;
                w=parseFloat(w);
                var pg=sign.attr("page");
                var type;
                var field_name="";
                if (sign.hasClass("sign_psition")){
                    type="sign"
                }
                if (sign.hasClass("initial_psition")){
                    type="initial"
                }
                if (sign.hasClass("date_psition")){
                    type="date"
                    }
                if (sign.hasClass("name_psition")){
                    type="text"
                    field_name="Name"
                }
                if (sign.hasClass("email_psition")){
                    type="text"
                    field_name="Email"
                }
                if (sign.hasClass("phone_psition")){
                    type="text"
                    field_name="Phone"
                }
                if (sign.hasClass("company_psition")){
                    type="text"
                    field_name="Company"
                }
                if (sign.hasClass("text_psition")){
                    type="text";
                    field_name=sign.find('input').val();
                    if(field_name==""){
                        isEmpty=true;

                        return;
                    }
                }

                var obj = {document_id:doc_id,token:token, user_id:user,field_name:field_name, email:email, name:name, left:percent_left,top:percent_top,page:pg,height:h,width:w,zoom:canvas.width,type:type };
                arr.push(obj);
                });
                if(isEmpty){
                    alert("Field name is empty!!!");
                    return;
                }
                if(arr.length!=0){
                    req_url = '/e-sign/save_sign_data';


                    var input_data={'data':JSON.stringify(arr),document_id:doc_id,url:url,work_flow_enabled:false,meeting_id:meeting_id};
                    dn_json_rpc(req_url,input_data,function(data){

//                        doc_data=data.doc_data;
//                        renderPage(pageNum);
//                        $(".save_doc_data").attr('disabled','disabled');
//                        new_divs.hide().removeClass("new_sign");
                        $('.youtubeVideoModal').modal('hide');
window.location="web"+window.location.hash+"&h"
                    });

                }
            });
	});



	$(document).on("click",".saved_sign.is_sign,.saved_sign.is_initial", function(){
    var login=$(this).attr("login");
    var my_record=$(this).attr("my_record");

    if(my_record=="false" && !isAdmin)
    {
        return;
    }
    var signature_id=$(this).attr("id");
    var usr_name=$(this).attr("name");
    doc_preview.image("uuuu");
    var body=$('.youtubeVideoModal .modal-body:last');
    var content=$('.youtubeVideoModal .modal-content:last');
    var footer = $('<div class="modal-footer" style="text-align: left;"></div>');
    var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Save</span>');
    var del_btn = $('<span style="float:right" class="btn btn-primary btn-sm DocsBtn">Remove</span>');








    var signature_editor = $('<div id="signature_editor"></div>');


            var clear_btn = $('<span class="btn btn-danger btn-sm DocsBtn">Clear</span>');
            var draw_sign_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Draw</span>');
            var upload_btn = $('<input accept=".jpg,.png,.jpeg" style="display:none" type="file"></input>');

            var auto_sign = $('<span class="btn btn-primary btn-sm DocsBtn">Auto</span>');
            var top_div = $('<div class="DocsButtonWrapper" style="font-size:14px; height:auto" />');
            var upload_clicker = '<button class="btn btn-sm btn-primary o_select_file_button"';
            upload_clicker += ' title="Select" type="button">Upload</button>';
            upload_clicker = $(upload_clicker);
            upload_clicker.click(function(){
                upload_btn.click();
            });

            top_div.append(draw_sign_btn).append(upload_clicker).append(auto_sign).append(upload_btn);
           if(my_record=="true"){
                body.append(signature_editor);
                signature_editor.before(top_div);
                signature_editor.after(clear_btn);

                if(isAdmin){
//                    signature_editor.before(del_btn);
                    body.append(del_btn);

                }
                if(my_record=="true"){
                body.append(save_btn);
            }
            }
            else{
                body.append('<h2>Username:</h2>'+usr_name);
                body.append(del_btn);
            }
            signature_editor.signature();


            var myCanvas = signature_editor.find('canvas')[0];
            var canvas_context = myCanvas.getContext('2d');
            var img = new Image();
            img.onload = function(){
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
                canvas_context.drawImage(img,0,0,signature_editor.width(),signature_editor.height());

            };

//            var hidden_image_container = '<div id="hidden_img_cont" ';
//            var hic_style =' style="visibility:hidden;height:'+signature_editor.height()+'px;width:'+signature_editor.width()+'px"';
//            hidden_image_container = $(hidden_image_container + hic_style + '/>');
//            var hidden_image = $('<img style="max-height:100%;max-width:100%" />');
//            body.append(hidden_image_container);
//            hidden_image_container.html(hidden_image);

            req_url = '/e-sign/get_signature';
            input_data = {signature_id:signature_id};

            dn_json_rpc(req_url,input_data, function(d){
            setTimeout(function(){ load_signature(d); }, 200);
            });

            var dataURL = '';
            function load_signature(data)
            {
                signature_editor.signature();
                signature_editor.signature('clear');
                var signature_value = data.signature;
                if(signature_value && signature_value.length > 0)
                {
                    dataURL = 'data:image/png;base64,'+ data.signature;
//                    hidden_image.attr('src',dataURL);
                    img.src = dataURL;
                }
                $('#loaderContainerajax').hide();
            }


            var auto_clicked=false;

            auto_sign.click(function(e){
                 $('#loaderContainerajax').show();
                auto_clicked=true;
                req_url = '/e-sign/save_signature';
                input_data = {signature_id:signature_id,document_id:doc_id,token:token, binary_signature :"", type:"auto",url:url};
                dn_json_rpc(req_url,input_data, load_signature);

            });



            signature_editor.mousedown(function(){
            auto_clicked=false;

            });

            upload_btn.change(function()
            {
                if(!this.files)
                    return;
                if(this.files.length<1)
                    return;
                var file_tag = this;
                var reader = new FileReader();
                auto_clicked=false;

                var upload_file = this.files[0];
                reader.readAsDataURL(upload_file);
                reader.onload = function ()
                {
                    var dataURL = reader.result;
//                    hidden_image.attr('src',dataURL);
                    canvas_context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                    img.src = dataURL;
                }
            });

            save_btn.click(function(e){
                 $('#loaderContainerajax').show();
                var type="draw";
                dataURL = myCanvas.toDataURL();
                var empty_url="data:image/png;base64,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"
                if(dataURL==empty_url){
                        alert('Draw signature');
                        return;
                }
                dataURL = dataURL.replace('data:image/png;base64,','');
//                if(auto_clicked){
//                type="auto";
//                }
                req_url = '/e-sign/save_signature';
                input_data = {signature_id:signature_id,document_id:doc_id,token:token, binary_signature :dataURL,type:type,url:url };
                dn_json_rpc(req_url,input_data, function(data){
                    doc_data=data.doc_data;
                    renderPDF(data.pdf_binary);
                    $('.youtubeVideoModal').modal('hide');
                     $('#loaderContainerajax').hide();
                });

            });

            clear_btn.click(function() {
                signature_editor.signature('clear');
               });

            draw_sign_btn.click(function() {
                signature_editor.signature('clear');
               });

            del_btn.click(function(e){
            if (confirm('Delete it permanently?')) {
                req_url = '/e-sign/delete_signature';
                input_data = {signature_id:signature_id,document_id:doc_id,url:url};
                dn_json_rpc(req_url,input_data, function(data){
                    doc_data=data.doc_data;
                    renderPDF(data.pdf_binary);
                });
                $('.youtubeVideoModal').modal('hide');
            }


            });


});

$(document).on("click",".saved_sign.is_date", function(e){
        var my_record=$(this).attr("my_record");
        if(my_record=="false" && !isAdmin){
            return;
        }
        var signature_id=$(this).attr("id");
        var usr_name=$(this).attr("name");
		doc_preview.image("uuuu");
        var body=$('.youtubeVideoModal .modal-body:last');
        var content=$('.youtubeVideoModal .modal-content:last');
        var footer = $('<div class="modal-footer" style="text-align: left;"></div>');
		var input_date = $('<input id="date" disabled placeholder="Date" style="width:50%"/>');
		var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Save</span>');
		var del_btn = $('<span style="float:right" class="btn btn-primary btn-sm DocsBtn">Remove</span>');

        input_date.val($.datepicker.formatDate('dd/mm/yy', new Date()));
		body.html("<h2>Username:</h2>"+usr_name+"<h2>Date:</h2>").append(input_date);


            if(my_record=="true"){
                body.append(save_btn);
            }

        if(isAdmin){
            body.append(del_btn);

        }

        save_btn.click(function(e){
                var date=input_date.val();
                req_url = '/e-sign/save_signature';
                input_data = {signature_id:signature_id,document_id:doc_id,token:token, date :date,type:"date",url:url };
                dn_json_rpc(req_url,input_data, function(data){
                    doc_data=data.doc_data;
                    renderPDF(data.pdf_binary);
                });
                $('.youtubeVideoModal').modal('hide');
            });

        del_btn.click(function(e){
            if (confirm('Delete it permanently?')) {
                req_url = '/e-sign/delete_signature';
                input_data = {signature_id:signature_id,document_id:doc_id,url:url};
                dn_json_rpc(req_url,input_data, function(data){
                    doc_data=data.doc_data;
                    renderPDF(data.pdf_binary);
                });
                $('.youtubeVideoModal').modal('hide');
            }


            });

});

$(document).on("click",".saved_sign.is_text", function(e){
        var my_record=$(this).attr("my_record");
        if(my_record=="false" && !isAdmin){
            return;
        }
        var signature_id=$(this).attr("id");
        var usr_name=$(this).attr("name");
        var field_name=$(this).attr("field_name");
		doc_preview.image("uuuu");
        var body=$('.youtubeVideoModal .modal-body:last');
        var content=$('.youtubeVideoModal .modal-content:last');
		var input_text = $(`<input id="text"  placeholder=${field_name} style="width:50%"/>`);
		var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Save</span>');
		var del_btn = $('<span style="float:right" class="btn btn-primary btn-sm DocsBtn">Remove</span>');

		body.html(`<h3>Username:</h3>${usr_name}`);


            if(my_record=="true"){

                body.append(`<h3>${field_name}:</h3>`).append(input_text);
                body.append(save_btn);
            }

        if(isAdmin){
            body.append(del_btn);

        }

        save_btn.click(function(e){
                var text=input_text.val();
                if(text==""){
                    alert("Enter text")
                    return;
                }
                req_url = '/e-sign/save_signature';
                input_data = {signature_id:signature_id,document_id:doc_id,token:token, text :text,type:"text",url:url };
                dn_json_rpc(req_url,input_data, function(data){
                    doc_data=data.doc_data;
                    renderPDF(data.pdf_binary);
                });
                $('.youtubeVideoModal').modal('hide');
            });

        del_btn.click(function(e){
            if (confirm('Delete it permanently?')) {
                req_url = '/e-sign/delete_signature';
                input_data = {signature_id:signature_id,document_id:doc_id,url:url};
                dn_json_rpc(req_url,input_data, function(data){
                    doc_data=data.doc_data;
                    renderPDF(data.pdf_binary);
                });
                $('.youtubeVideoModal').modal('hide');
            }


            });

});

$(document).on("click",".new_sign .del_sign", function(e){
        var sign =$($(this)[0].parentElement);


         var new_divs =$('.new_sign:visible');
        if(new_divs.length==1){
         $(".save_doc_data").attr('disabled','disabled');
        }
        sign.fadeOut();
        sign.removeClass("new_sign");
});


$("#nxxt_sign").click(function() {
    var d = $.grep(doc_data, function(v)
        {
            return !v.signed && v.my_record;
        });
    if(d.length==0){
    alert("No Pending Signatures")
    return;
    }
    var sign=d[0];
    var top=canvas.height*(sign.top/100);
    renderPage(sign.page);
    $('html, #page_container1').animate({
        scrollTop: top-150
    }, 1000);
//    $(this).css({top:top}).html("NEXT>");
    $(this).html("NEXT>").animate({
        top: top
    }, 1000);

});

});

