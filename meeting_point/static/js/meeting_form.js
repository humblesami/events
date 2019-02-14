(function(){
    var dnow = Date.now();
    //document.writeln('<script src="/meeting_point/static/js/meeting_form_debug.js"></script>');
    var pathname = window.location+'';
    arr = pathname.split('#');
    arr = arr[1].split('&');
    arr = arr[0].split('=');
    var id = arr[1];

    var iFrame = $('iframe.comments-container');
    function resizeIFame() {
        setTimeout(function(){
            var o_height = iFrame[0].scrollHeight + 20;
            iFrame.height(o_height);
            console.log(111, o_height, iFrame.height());
        }, 1000);
    }

    var iframe_src = 'http://localhost:4200/iframe/comments/calendar.event/'+id+'/'+odoo.session_info.token;
    console.log(iframe_src);
    iFrame.ready(resizeIFame).attr('src', iframe_src);
})()