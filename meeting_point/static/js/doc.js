$(function() {

        try {
            var doc_id=$('.o_technical_modal.in').find('.dn_doc_id').html();
            var token=$('.sign_token').val();

            $('.strt_sign').click(function(e) {
                doc_preview.image("uuuu");
                var body = $('.youtubeVideoModal .modal-body:last');
                var content = $('.youtubeVideoModal .modal-content:last');
                var footer = $('<div class="modal-footer"></div>');
                var save_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Save</span>');

                $('.youtubeVideoModal .modal-footer').html("");
                $('.youtubeVideoModal .modal-dialog').removeClass('modal-lg');
                $('.youtubeVideoModal .modal-footer').hide();
                var signature_editor = $('<div id="signature_editor"></div>');


                var clear_btn = $('<span class="btn btn-danger btn-sm DocsBtn">Clear</span>');
                var draw_sign_btn = $('<span class="btn btn-primary btn-sm DocsBtn">Draw</span>');
                var upload_btn = $('<input accept=".jpg,.png,.jpeg" style="display:none" type="file"></input>');

                var auto_sign = $('<span class="btn btn-primary btn-sm DocsBtn">Auto</span>');
                var top_div = $('<div class="DocsButtonWrapper" />');
                var upload_clicker = '<button class="btn btn-sm btn-primary DocsBtn o_select_file_button"';
                upload_clicker += ' title="Select" type="button">Upload</button>';
                upload_clicker = $(upload_clicker);
                upload_clicker.click(function() {
                    upload_btn.click();
                });

                top_div.append(draw_sign_btn).append(upload_clicker).append(auto_sign).append(upload_btn);
                body.append(signature_editor);
                signature_editor.before(top_div);
                signature_editor.after(clear_btn);
                clear_btn.after(save_btn);

                //$('.youtubeVideoModal .modal-content').css({'width':'370px','margin-left': '19%'});

                signature_editor.signature();

                var myCanvas = signature_editor.find('canvas')[0];
                var canvas_context = myCanvas.getContext('2d');
                var img = new Image();
                img.onload = function() {

                    canvas_context.drawImage(img, 0, 0, signature_editor.width(), signature_editor.height());

                };


                req_url = '/meeting_point/get_signature';
                input_data = {
                    document_id: doc_id,token:token
                };

                dn_json_rpc(req_url, input_data, function(d) {
                    setTimeout(function() {
                        load_signature(d);
                    }, 200);
                });

                var dataURL = '';

                function load_signature(data) {
                    signature_editor.signature();
                    signature_editor.signature('clear');
                    var signature_value = data.signature;
                    if (signature_value && signature_value.length > 0) {
                        dataURL = 'data:image/png;base64,' + data.signature;
                        //                    hidden_image.attr('src',dataURL);
                        img.src = dataURL;
                    }
                }

                auto_sign.click(function(e) {
                    req_url = '/meeting_point/save_signature';
                    input_data = {
                        document_id: doc_id,
                        binary_signature: "",
                        type: "auto",token:token
                    };
                    dn_json_rpc(req_url, input_data, load_signature);
                });

                upload_btn.change(function() {
                    if (!this.files)
                        return;
                    if (this.files.length < 1)
                        return;
                    var file_tag = this;
                    var reader = new FileReader();
                    auto_clicked = false;

                    var upload_file = this.files[0];
                    reader.readAsDataURL(upload_file);
                    reader.onload = function() {
                        var dataURL = reader.result;
                        canvas_context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                        img.src = dataURL;
                    }
                });

                save_btn.click(function(e) {

                    var type = "draw";
                    dataURL = myCanvas.toDataURL();
                    var empty_url = "data:image/png;base64,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"
                    if (dataURL == empty_url) {
                        alert('Draw signature');
                        return;
                    }
                    dataURL = dataURL.replace('data:image/png;base64,', '');
                    req_url = '/meeting_point/save_signature';
                    input_data = {
                        document_id: doc_id,
                        binary_signature: dataURL,
                        type: type,token:token
                    };
                    dn_json_rpc(req_url, input_data, function(data) {

                        $('.youtubeVideoModal').modal('hide');
                        $('.my_signature_status').html("Completed");
                        $('.sign_embed').hide();
                        renderDoc(data.pdf_binary);

                        var pending_counter = $('.seen_not_seen');
                        if(pending_counter.length >0)
                        {
                            var to_do_count = pending_counter.html();
                            to_do_count -= 1;
                            pending_counter.html(to_do_count);
                            if(to_do_count == 0)
                            {
                                pending_counter.hide();
                            }
                        }
                    });

                });

                clear_btn.click(function() {
                    signature_editor.signature('clear');
                });

                draw_sign_btn.click(function() {
                    signature_editor.signature('clear');
                });
            });
        } catch (er) {
            console.log(er);
        }

        var canvas=document.getElementById('the-canvas'),
	pdf_binary,
	req_url,
	doc_id=$('.o_technical_modal.in').find('.dn_doc_id').html(),
	model=$('.dn_documents_doc_path').first().html().trim(),
	input_data = {document_id:doc_id },
	pdfDoc,
	pageNum,
	ctx=canvas.getContext('2d');
	var doc_container = $('.dn_documents_doc_path').first().closest('.o_form_view');


     function loadData(){
                req_url = '/dn_documents/get_pdf';
                input_data = {document_id:doc_id,model:model,token:token};
                dn_json_rpc(req_url,input_data, function(data)
                {
                    dn_json_rpc_object.showHideLoader(true);
                    pdf_binary=data.pdf_binary;
                    renderDoc(pdf_binary);
                });

            }
            loadData();


    $('#scaleSelect')[0].selectedIndex = 4;
    $('.modal-footer:last').hide();
     $('.pdf_download').html('<span class="fa fa-download fa-lg ml8 text-white"></span>');
     $('.pdf_download').attr('title','Download');


    function renderDoc(s) {

        if($('.meeting_doc_html').text()!="")
        {   $('#holder').hide();
            doc_container.append($('.meeting_doc_html').text());
        }
     else
        {

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

    dn_json_rpc_object.showHideLoader();

     });
     // Update page counters
     pageNum=num;
     document.getElementById('page_num').textContent = pageNum;
     document.getElementById('page_count').textContent = pdfDoc.numPages;



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
    $('.modal-header:last').append($('._signature_status'));
                        $('.modal-header:last').append($('#start_sign'));
    if($('.meeting_doc_html').text() == "")
    {
        $('.modal-header:last').append($('.top_btns'));

    }
    else{
        $('#holder').hide();
    }
    setTimeout(function(){
        var seen = $('.doc_seen.o_hidden:first').html();
        if(seen != 1)
        {
            var res_id = $('.dn_doc_id.o_hidden:first').html();
            if(res_id)
            {
                update_seen_by('meeting_point.document', res_id);
            }
        }
    },900);
//    $('.doc_view_form').closest('.modal-body').css('overflow-y','hidden');
});