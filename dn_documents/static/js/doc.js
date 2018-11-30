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
   setTimeout(function(){
    console.log(1111, pdf_js_module)
   }, 1000)

   var str = window.location.href;

    var model = str.split('&');
    var id = model[0].split('#');
    id = id[id.length -1];
    model = model[2].split('=');
    model = model[model.length-1];
    id = id.split('=');
    id = id[id.length-1];

    req_url = '/dn_documents/get_pdf';
    input_data = {
        "document_id":id,
        "model":model
    };
    dn_json_rpc(req_url,input_data, function(data)
    {
        pdf_binary=data.pdf_binary;
        console.log(data);
//        renderDoc(pdf_binary);
    });

});