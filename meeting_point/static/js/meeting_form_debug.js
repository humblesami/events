$(function(){
    console.log(2211);
    var pathname = window.location+'';
    arr = pathname.split('#');
    arr = arr[1].split('&');
    arr = arr[0].split('=');
    var id = arr[1];
    console.log('comments ifram url', id, iframe_src);
    var iframe_src = 'http://localhost:4200/comments/calendar.event/'+id;
    $('iframe.comments-container').attr('src', iframe_src);
})