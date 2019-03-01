(function(){
    var dnow = Date();    
    var libs = '<link rel="stylesheet" href="/odoochat/static/css/chat.css?v='+dnow+'"/>';
    $('#messenger_libs').append(libs);
    setTimeout(function(){
        libs = '<script type="text/javascript" src="/meeting_point/static/meetvue/runtime.js?v='+dnow+'"></script>';
        $('#messenger_libs').append(libs);
    },50);    
})()
