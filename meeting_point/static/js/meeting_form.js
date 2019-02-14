(function(){
    var dnow = Date.now();
    //document.writeln('<script src="/meeting_point/static/js/meeting_form_debug.js"></script>');
    var pathname = window.location+'';
    arr = pathname.split('#');
    arr = arr[1].split('&');
    arr = arr[0].split('=');
    var id = arr[1];

    window.addEventListener('DOMContentLoaded', function(e) {
        var iFrame = $('iframe.comments-container:first')[0];
        resizeIFrameToFitContent( iFrame );
        function resizeIFrameToFitContent( iFrame ) {
            iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
        }
    });

    var iframe_src = 'http://localhost:4200/iframe/comments/calendar.event/'+id+'/'+odoo.session_info.token;
    console.log(iframe_src);
    $('iframe.comments-container').attr('src', iframe_src);
})()