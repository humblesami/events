$(function(){
    $('div[name="country"] .o_input').focus(function(){
        this.select();
    });

    setTimeout(function(){
        var form_sheet = $('.o_form_sheet:first');
        console.log(form_sheet.width(), 111);
        var width = form_sheet.width() + parseFloat(form_sheet.css('padding-left')) + parseFloat(form_sheet.css('padding-left'));
        $('.comments.oe_read_only').width(width);
    }, 15);
})

//(function(){
//    var dnow = Date.now();
//    //document.writeln('<script src="/meeting_point/static/js/meeting_form_debug.js"></script>');
//    var pathname = window.location+'';
//    arr = pathname.split('#');
//    arr = arr[1].split('&');
//    arr = arr[0].split('=');
//    var id = arr[1];
//
//    var page_url = 'iframe/comments/calendar.event/'+id+'/'+odoo.session_info.token;
//    var iframe_base_path = window.location.origin+'/meetvue/';
//    var iframe_src = iframe_base_path+page_url;
//    if(iframe_base_path == 'http://localhost:8000/meetvue/')
//    {
//        iframe_src = 'http://localhost:4200/'+page_url;
//    }
//    console.log(iframe_src);
//    $('iframe.comments-container').attr('src', iframe_src);
//})()