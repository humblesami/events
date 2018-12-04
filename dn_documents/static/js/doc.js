


if(!odoo.pdf_libs)
{
    var libs = '';
    libs += '<link href="/dn_documents/static/annotator/shared/toolbar.css" rel="stylesheet" type="text/css" />';
    libs += '<link href="/dn_documents/static/annotator/shared/custom.css" rel="stylesheet" type="text/css" />';
    libs += '<link href="/dn_documents/static/annotator/shared/pdf.viewer.css" rel="stylesheet" type="text/css" />';
//    libs += '<script src="/dn_documents/static/js/pdf.js"></script>';
//    libs += '<script src="/dn_documents/static/js/pdf.worker.js"></script>';
    libs += '<script src="/dn_documents/static/annotator/shared/pdf.viewer.js"></script>';
//    libs += '<script src="/dn_documents/static/annotator/libs.js"></script>';
    $('#ui-timepicker-div').after(libs);
    odoo.pdf_libs = 1;
}

$(function(){
   var input=$('input.doc_name');
   if(input){
        var page_loaded = false;
        $(document).on('focus', '.note-editable.panel-body',function(){
            if(!page_loaded)
            {
                input.focus();
                page_loaded = true;
            }
        });
        input.blur(function(){
            input.change();
        });
   }

   var req_url = '/dn_documents/get_pdf';
   var doc_id = $('.doc_meta > .doc_id').html();
   var doc_model = $('.doc_meta > .doc_model').html();
   var input_data = {
       "model":doc_model,
       "document_id": doc_id,
       "token": odoo.session_info.token
   }

   var doc_types = {
        'meeting_point.files':'',
        'meeting_point.doc':'meeting'
//        'meeting_point.files':'',
//        'meeting_point.files':'',
//        'meeting_point.files':'',
//        'meeting_point.files':'',
   }

   dn_json_rpc(req_url,input_data, function(data)
   {
       var pdf_binary=data.pdf_binary;
       $('.o_technical_modal.in').append('<script src="/dn_documents/static/annotator/annotator.js"></script>');
       var doc_type = doc_types[doc_model];
       //console.log(doc_types,456,  doc_model);
       pdf_js_module.render({doc:pdf_binary, id: doc_id, first_time: 1, type : doc_type});
   });

});