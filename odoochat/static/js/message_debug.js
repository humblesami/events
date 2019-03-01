(function(){
    var dnow = Date();
    console.log(12, dnow);
    var libs = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css?v='+dnow+'"/>';
    libs += '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css?v='+dnow+'"/>';
    libs += '<link rel="stylesheet" href="/meeting_point/static/css/chat.css?v='+dnow+'"/>';
    libs += '<script type="text/javascript" src="/meeting_point/static/meetvue/runtime.js?v='+dnow+'"></script>';
    $('#messenger_libs').append(libs);
})()
