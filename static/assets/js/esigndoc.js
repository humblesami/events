(function (){ 
    var document_data = undefined;   
    function renderPDF(pdf_data) {        
        pdf_data = pdf_data.replace( new RegExp("&quot;","gm"),'"');
        pdf_data = JSON.parse(pdf_data);
        pdf_data.pdf_url = window['site_config'].server_base_url + pdf_data.pdf_url;
        console.log(pdf_data);
        document_data = pdf_data;        
        $('#loaderContainerajax').show();
        $(".o_loading").show();

        var pageNum = 1;
        pdfDoc = null;
        scale = 1.5;
        canvas = document.getElementById('the-canvas')
        ctx = canvas.getContext('2d');
        console.log(document_data.pdf_url, 444);
        window["PDFJS"].getDocument(document_data.pdf_url).then(function getPdf(_pdfDoc) {
            pdfDoc = _pdfDoc;
            if (!pageNum) {
                pageNum = 1;
            }
            renderPage(pageNum);
            $('.docWrapperContainer').show();
            toggleNextButton();
        });
    }
    window['renderPDF'] = renderPDF;

    function renderPage(num) {
        // Using promise to fetch the page
        pdfDoc.getPage(num).then(function(page) {
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
                "doc_data": document_data.doc_data
            });
        }, 200);
        $('#loaderContainerajax').hide();
        $(".o_loading").hide()
    }
    function toggleNextButton() {
        var d = $.grep(document_data.pdf_url, function(v) {
            return !v.signed && v.my_record;
        });
        if (d.length > 0) {
            $("#nxxt_sign").show();
        }
    }
    function loadSignatures(data) {
        var doc_data = data.doc_data;
        var height = canvas.height;

        $.each(doc_data, function() {
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
                style: "cursor:pointer;width:190px;height:40px;border:2px dotted gray;font-weight: bold;color:black;z-index:1;overflow:hidden",
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
            if(this.signed && this.my_record)
            {
                div.html('<img src="'+window['site_config'].server_base_url+this.image+'" height="100%"/>');
            }

            if (this.page == pageNum) {
                $('#page_container').append(div);
            }
        });

    }
})()
