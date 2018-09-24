$(function(){
   var input=$('input.mp_doc_name');
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

});