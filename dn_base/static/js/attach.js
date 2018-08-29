$(function(){
    var input;
    attatch_btn=$('.dn_attatchment_btn .o-kanban-button-new');
    var style='<style class="doc_styyle">.o_technical_modal,.modal-backdrop{display:none!important}</style>';
    attatch_btn.click(function(){
//        var parent=$('.o_technical_modal:last,.modal-backdrop:last');
        $('body').append(style);

        setTimeout(function(){
//            $('.modal-dialog.modal-lg:last').hide().parent().hide();
//            $('.modal-backdrop').hide();
//            $(parent[0]).css({'display':'block!important'});
//            $(parent[0]).css({'display':'block!important'});
            $(".o_content").animate({ scrollTop: attatch_btn[0].offsetTop }, 1000);
            $('.o_technical_modal:last,.modal-backdrop:last').addClass("to_remove");
            input=$('.o_input_file:last');
            input.click();
            input.change(function()
            {
                if(!this.files)
                    return;
                var file_tag = this;
                var reader = new FileReader();
                var upload_file = this.files[0];
                $(this.closest('.o_form_view')).find('input[name="name"]:first').val(upload_file.name.split(".")[0]).change();
                if(!(upload_file.name.endsWith("pdf") || upload_file.name.endsWith("doc") ||
                upload_file.name.endsWith("docx") ||upload_file.name.endsWith("ppt") ||upload_file.name.endsWith("pptx")||upload_file.name.endsWith("xls")||upload_file.name.endsWith("xlsx")))
                {
                    cls=$(this.closest('.modal-dialog')).find('.close').click();
                    alert("Invalid format ,Supported file types:pdf ,word,ppt,excel");

                }
                else{

                setTimeout(function(){
//                    $(this.closest('.modal-dialog')).find('.modal-footer button:first').click();
                    $('.modal-footer:last button:first').click();

                },500);
                }

            });

        },800);

        console.log(input);
    });

    $('body').click(function(e){
      if ( !$(e.target).is('.dn_attatchment_btn button,.o_input_file') ) {
            $('.o_technical_modal.to_remove').remove();
            $('.modal-backdrop.to_remove').remove();
            $('.doc_styyle').remove();


      }
});



});