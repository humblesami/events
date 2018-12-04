$(function(){
    $('body').append('<link href="dn_documents/static/annotator/shared/pdf.viewer.css" rel="stylesheet" type="text/css" />');
    $('body').append('<link href="dn_documents/static/annotator/shared/toolbar.css" rel="stylesheet" type="text/css" />');
    $('body').append('<link href="dn_documents/static/annotator/shared/custom.css" rel="stylesheet" type="text/css" />');

    //document.writeln('<script src="/dn_documents/static/js/pdf.js"/>');
    //document.writeln('<script src="/dn_documents/static/js/pdf.worker.js"/>');
    $('body').append('<script src="dn_documents/static/annotator/shared/pdf.viewer.js"></script>');
    $('body').append('<script src="dn_documents/static/annotator/dn_sign.js"></script>');
    $('body').append('<script src="dn_documents/static/annotator/color.js"></script>');
    $('body').append('<script src="dn_documents/static/annotator/jsonlib.js"></script>');
    $('body').append('<script src="dn_documents/static/annotator/main.js"></script>');
    $('body').append('<script src="dn_documents/static/annotator/modules/m0.js"></script>');
    $('body').append('<script src="dn_documents/static/annotator/modules/m1.js"></script>');
    $('body').append('<script src="dn_documents/static/annotator/modules/m2.js"></script>');
    $('body').append('<script src="dn_documents/static/annotator/modules/m3.js"></script>');
    $('body').append('<script src="dn_documents/static/annotator/modules/m4.js"></script>');
    $('body').append('<script src="dn_documents/static/annotator/annotator.js"></script>');


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

   var req_url = '/dn_documents/get_pdf_from_parent_model';
   var input_data = odoo.doc_to_open;
   input_data['token'] = odoo.session_info.token;
   console.log(input_data);

    dn_json_rpc(req_url,input_data, function(data)
    {
        console.log(data);
        pdf_binary=data.pdf_binary;
        console.log(data);
        if(!odoo.annotator){
            odoo.annotator = 1;
        }
//        pdf_js_module.render(data, '');
    });

});