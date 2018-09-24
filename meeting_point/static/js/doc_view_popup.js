$(function(){
	
	
    function loadDocumentInPopup()
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

		var view_link = $('<a style="cursor:pointer">View Document</a>');
		doc_path.before(view_link);        
		view_link.click(
		function(){doc_preview.doc(doc_url)}
		);
    }
    loadDocumentInPopup();
});

