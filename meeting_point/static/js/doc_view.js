$(function(){
    function loadDocumentForView()
    {
        var doc_path = $('.meeting_doc_path');
        var doc_url = doc_path.html();
        doc_url = doc_url.replace('&amp;','&');
        doc_url = doc_url.replace('&amp;','&');

        if(!doc_url.startsWith('http'))
        {
            if(!doc_url.startsWith('/'))
                doc_url = dn_base_web_url +'/'+ doc_url;
            else
                doc_url = dn_base_web_url + doc_url;
        }

        setTimeout(function(){
          $('.modal-footer:last button').hide();

        }, 50);

        doc_container = doc_path.closest('.o_view_manager_content');

		doc_path.closest('.o_form_view').parent().hide();
//        $('.o_form_buttons_view').hide();
//
//
//		var back_btn = $('<span style="margin:10px" class="btn btn-primary btn-sm">Back</span>');
//		doc_container.prepend(back_btn);
//		back_btn.click(function(){
//			$('.breadcrumb .active').prev().click();
//		});

		var embedHtml = '<div style="height:auto;  padding: 20px;border: 1px solid lightgray;">';
        embedHtml += '<div class="embed-responsive embed-responsive-16by9">';
        embedHtml += '<embed src="'+doc_url+'" />' ;
        embedHtml += '</div></div>';
		doc_container.append(embedHtml);
    }
    loadDocumentForView();

    $('.doc_view_form').closest('.modal-body').css('overflow-y','hidden');
});

