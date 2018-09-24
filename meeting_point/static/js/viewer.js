$(function(){
console.log('rrrrrrrrrrrr');
    var canvas=document.getElementById('the-canvas'),
	pdf_binary,
	users,
	signatures,
	req_url,
	doc_id=$('.meeting_doc_id').first().html().trim(),
	input_data = {document_id:doc_id },
	isAdmin,
	pdfDoc,
	pageNum,
	token=$('.sign_token').val(),
	ctx=canvas.getContext('2d');



     function loadData(){
                req_url = '/meeting_point/get_doc_data';
                input_data = {document_id:doc_id,token:token};
                dn_json_rpc(req_url,input_data, function(data)
                {
                signatures=data.signatures
                users=data.users;
                pdf_binary=data.pdf_binary;
                isAdmin=data.isAdmin;
                //setTimeout(function(){ showPDF(pdf_binary); }, 3000);
                renderPDF(pdf_binary);
                //loadSignatures(data);
                });

            }
            loadData();

$('#scaleSelect')[0].selectedIndex = 4;
$('.modal-footer:last').hide();

function renderPDF(s) {

     var pdfData = atob(s);
     PDFJS.workerSrc = '/meeting_point/static/js/pdf.worker.js';
     pdfDoc = null;
     scale = 1.5;
     ctx = canvas.getContext('2d');
     //PDFJS.disableWorker = true;
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
 
 //PDFJS.disableWorker = true;

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
  $('.saved_signature').hide();
  setTimeout(function(){ loadSignatures({"signatures":signatures}); }, 500);
   // loadSignatures({"signatures":signatures});
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
 canvas.height = viewport.height;
 canvas.width = viewport.width;
 // Render PDF page into canvas context
 var renderContext = {
 canvasContext: ctx,
 viewport: viewport
 };
 page.render(renderContext);
  $('.saved_signature').hide();
  //setTimeout(function(){ loadSignatures({"signatures":signatures}); }, 500);
    loadSignatures({"signatures":signatures});
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

    signatures=data.signatures;

    var height=canvas.height;
    $.each(signatures, function() {

             var div=$('<div></div>', {
                        id: this.id,
                        signed:this.signed,
                        my_sign:this.my_sign,
                        class:"saved_signature",
                        style: "cursor:pointer;width:190px;height:40px;border:2px dotted gray",
                        //text: this.name
                    });
             div.html("<div style='position:absolute;bottom:-20px;'>"+this.name+"</div>")
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
             if(!this.signed && this.my_sign){
                div.css({ background:"red",opacity:0.7});
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
            var new_signature = $(ui.helper).clone().removeClass('drag').addClass("new_sign");
            new_signature.draggable({
            containment: "#page_container",
            scroll: true,
            start: function () {
                //$(this).data("startingScrollTop", $(this).parent().parent().scrollTop());
               // $("#signature-position").css({ background: 'green', color: 'white', cursor: 'move' });
            },
            drag: function (event, ui) {
                //var st = parseInt($(this).data("startingScrollTop"));
                //ui.position.top -= $(this).parent().parent().scrollTop() - st;
                var positionX = $(this).position().left;
                var positionY = $(this).position().top+$(this).parent().scrollTop();

                var percent_left=(positionX/canvas.width)*100;
                var percent_top=(positionY/canvas.height)*100;
                $('.pstion').html('Sign Here - Positions:' + percent_left + "X" + percent_top);
            },
            cursor: 'move'
        }).resizable();
            var left=parseFloat(new_signature[0].style.left)-$(this).position().left;
            var top=parseFloat(new_signature[0].style.top)-$(this).parent().position().top+$(this).parent().scrollTop();
           new_signature.css({position:'absolute',left:left,top:top});
           new_signature.append('<i class="fa fa-pencil  fa-lg  edit_sign" style="color:black;float:right;margin-right:10px;" aria-hidden="true"/>');
           new_signature.append('<i class="fa fa-times  fa-lg del_sign" style="color:black;float:right;margin-right:10px;" aria-hidden="true"/>');

            $(this).append(new_signature);
        }
        //End Dragable


$(document).on("click",".new_sign .edit_sign", function(e){
        var sign =$($(this)[0].parentElement);
		doc_preview.image("uuuu");
        var body=$('.youtubeVideoModal .modal-body:last');
        var content=$('.youtubeVideoModal .modal-content:last');
        var footer = $('<div class="modal-footer" style="text-align: left;"></div>');
		var dropdown = $('<select id="dropdown" style="width:50%"></select>');
		var input_email = $('<h2>Send by Email:</h2><input id="email" style="width:50%"/>');
		var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Save</span>');

		body.html("<h2>Select User</h2>").append(dropdown).append(input_email);
		if($('.youtubeVideoModal .modal-footer').length == 0){
            content.append(footer);
            footer.append(save_btn);
            }
            else{
                $('.youtubeVideoModal .modal-footer').html("");
                $('.youtubeVideoModal .modal-footer').append(save_btn);
            }

        dropdown.append($("<option />").val(0).text("Select User"));
		$.each(users, function() {
         dropdown.append($("<option />").val(this.id).text(this.name));
        });
        input_email.click(function(e)
        {
        dropdown[0].selectedIndex = 0;
        });
        save_btn.click(function(e){
                var left=sign.position().left;
                var top=sign.position().top+sign.parent().scrollTop();
                var percent_left=(left/canvas.width)*100;
                var percent_top=(top/canvas.height)*100;
                var user=dropdown.val();
                var email =input_email[1].value;
                var h=sign[0].style.height;
                h=parseFloat(h);
                var w=sign[0].style.width;
                w=parseFloat(w);
                if(user==0 && email==''){
                alert("Select user or Enter email.")
                return;
                }
                input_data = {document_id:doc_id,token:token, user_id :user, email :email, left:percent_left,top:percent_top,page:pageNum,height:h,width:w,zoom:canvas.width };
                req_url = '/meeting_point/save_sign_data';
                sign.hide();

                dn_json_rpc(req_url,input_data,function(data){
                    signatures=data.signatures;
                    renderPage(pageNum);
                });
                $('.youtubeVideoModal').modal('hide');
            });
	});



	$(document).on("click",".saved_signature", function(){
    var login=$(this).attr("login");
    var my_sign=$(this).attr("my_sign");
//    if(!(odoo.session_info.username==login || token==$(this).attr("token")))
//    {
//        return;
//    }
    if(my_sign=="false")
    {
        return;
    }
    var signature_id=$(this).attr("id");
    doc_preview.image("uuuu");
    var body=$('.youtubeVideoModal .modal-body:last');
    var content=$('.youtubeVideoModal .modal-content:last');
    var footer = $('<div class="modal-footer" style="text-align: left;"></div>');
    var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Save</span>');

    if($('.youtubeVideoModal .modal-footer').length == 0){
    content.append(footer);
    footer.append(save_btn);
    }
    else{
        $('.youtubeVideoModal .modal-footer').html("");
        $('.youtubeVideoModal .modal-footer').append(save_btn);
    }


    var signature_editor = $('<div id="signature_editor"></div>');
            body.append(signature_editor);

            var clear_btn = $('<span class="btn btn-danger btn-sm DocsBtn">Clear Signature</span>');
            var draw_sign_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Draw Signature</span>');
            var upload_btn = $('<input accept=".jpg,.png,.jpeg" style="display:none" type="file"></input>');

            var auto_sign = $('<span class="btn btn-primary btn-sm DocsBtn">Auto Signature</span>');

            var top_div = $('<div class="DocsButtonWrapper" style="font-size:14px; height:auto;display:flex" />');
             var upload_clicker = '<button class="btn btn-sm btn-primary o_select_file_button"';
            upload_clicker += ' title="Select" type="button">Upload Signature</button>';
            upload_clicker = $(upload_clicker);
            upload_clicker.click(function(){
                upload_btn.click();
            });

            top_div.append(draw_sign_btn).append(upload_clicker).append(auto_sign).append(upload_btn);
            signature_editor.before(top_div);
            signature_editor.after(clear_btn);
            signature_editor.signature();


             var myCanvas = signature_editor.find('canvas')[0];
            var canvas_context = myCanvas.getContext('2d');
            var img = new Image();
            img.onload = function(){
                diffy = diffy/2;
                var hidden_image_height = hidden_image.height();
                var hidden_image_width = hidden_image.width();
                var diffx = signature_editor.width() - hidden_image_width;
                var diffy = signature_editor.height() - hidden_image_height;
                diffx = diffx/2;
                diffy = diffy/2;
                canvas_context.drawImage(img, diffx, diffy,hidden_image_width,hidden_image_height);
            };

            var hidden_image_container = '<div id="hidden_img_cont" ';
            var hic_style =' style="visibility:hidden;height:'+signature_editor.height()+'px;width:'+signature_editor.width()+'px"';
            hidden_image_container = $(hidden_image_container + hic_style + '/>');
            var hidden_image = $('<img style="max-height:100%;max-width:100%" />');
            body.append(hidden_image_container);
            hidden_image_container.html(hidden_image);

            req_url = '/meeting_point/get_signature';
            input_data = {signature_id:signature_id };

            dn_json_rpc(req_url,input_data, function(d){
            setTimeout(function(){ load_signature(d); }, 500);
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
                    hidden_image.attr('src',dataURL);
                    img.src = dataURL;
                }
            }


            var auto_clicked=false;

            auto_sign.click(function(e){
                auto_clicked=true;
                req_url = '/meeting_point/save_signature';
                input_data = {signature_id:signature_id,token:token, binary_signature :"", type:"auto" };
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
                    hidden_image.attr('src',dataURL);
                    canvas_context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                    img.src = dataURL;
                }
            });

            save_btn.click(function(e){

                var type="draw";
                dataURL = myCanvas.toDataURL();
                var empty_url="data:image/png;base64,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"
                if(dataURL==empty_url){
                        alert('Draw signature');
                        return;
                }
                dataURL = dataURL.replace('data:image/png;base64,','');
                if(auto_clicked){
                type="auto";
                }
                req_url = '/meeting_point/save_signature';
                input_data = {signature_id:signature_id,token:token, binary_signature :dataURL,type:type };
                dn_json_rpc(req_url,input_data, function(data){
                    signatures=data.signatures;
                    renderPDF(data.pdf_binary);
                });
                $('.youtubeVideoModal').modal('hide');
            });

            clear_btn.click(function() {
                signature_editor.signature('clear');
               });

            draw_sign_btn.click(function() {
                signature_editor.signature('clear');
               });


});

$(document).on("click",".new_sign .del_sign", function(e){
        var sign =$($(this)[0].parentElement);
        sign.fadeOut();
});

});

