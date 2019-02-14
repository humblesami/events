(function(){
    var dnow = Date.now();
    var pathname = window.location+'';
    arr = pathname.split('#');
    arr = arr[1].split('&');
    arr = arr[0].split('=');
    var id = arr[1];
    console.log('comments ifram url', id, iframe_src);
    var iframe_src = 'http://localhost:4200/comments/calendar.event/'+id;
    $('iframe.comments-container').attr('src', iframe_src);
    //document.writeln('<script src="/meeting_point/static/js/meeting_form_debug.js?v='+dnow+'"/>');
    //$('meetingform').append('<link rel="stylesheet" href="/meeting_point/static/mphome.css?v='+dnow+'"/>')
})()