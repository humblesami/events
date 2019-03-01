(function(){
    var dnow = Date();
    console.log(dnow, 833);
    document.writeln('<script src="/odoochat/static/js/socket.io.js?v='+dnow+'"></script>');
    document.writeln('<script src="/odoochat/static/js/web_debug.js?v='+dnow+'"></script>');
})()