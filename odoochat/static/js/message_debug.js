(function(){
    var libs = '';
    libs += '<link rel="stylesheet" href="/odoochat/static/css/meetvue.css" />';
    libs += '<link rel="stylesheet" href="/odoochat/static/css/chat.css"/>';
    $('#messenger_libs').append(libs);
    load_angular(function(){
        window["loadComponent"]("messenger","app-messenger");
    })
})()
