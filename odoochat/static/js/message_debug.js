(function(){
    var dnow = Date();    
    var libs = '';
    libs += '<link rel="stylesheet" href="/odoochat/static/css/meetvue.css?v='+dnow+'" />';
    libs += '<link rel="stylesheet" href="/odoochat/static/css/chat.css?v='+dnow+'"/>';
    $('#messenger_libs').append(libs);
    window["loadComponent"]("messenger","app-messenger");

})()
