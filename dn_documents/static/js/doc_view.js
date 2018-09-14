$(function(){
    var canvas=document.getElementById('the-canvas'),
	pdf_binary,
	req_url,
	doc_id=$('.dn_doc_id').first().html().trim(),
	model=$('.dn_documents_doc_path').first().html().trim(),
	input_data = {document_id:doc_id },
	pdfDoc,
	pageNum,
	ctx=canvas.getContext('2d');
	var doc_container = $('.dn_documents_doc_path').first().closest('.o_form_view');


     function loadData(){
                req_url = '/dn_documents/get_pdf';
                input_data = {document_id:doc_id,model:model};
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
    {
        $('#holder').hide();
        doc_container.append($('.meeting_doc_html').text());
        dn_json_rpc_object.showHideLoader();
    }
 else
    {
     if(!s){return}
     var pdfData = atob(s);
     PDFJS.workerSrc = '/dn_documents/static/js/pdf.worker.js';
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
 pdfDoc.getPage(num).then(function (page)
{
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


//$('.doc_view_form').closest('.modal-body').css('overflow-y','hidden');
if($('.meeting_doc_html').text() == "")
    {
        $('.modal-header:last').append($('.top_btns'));

    }
    else{
        $('#holder').hide();
    }
});