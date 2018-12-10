//var node = document.createElement('link');
//node.setAttribute('href', '/odoochat/static/css/chat.css');
//node.setAttribute('href', '/odoochat/static/css/chat.css');
try{
    if($ && !odoo.odoochat){
        odoo.odoochat = 1;
        if(odoo.session_info.uid!=1){
        if (window.location.search =="?debug" || window.location.search =="?debug=1" ){
        [1000, 3000, 5000].forEach(function(time){
    setTimeout(function(){
    $('.o_debug_manager').hide()
    }, time);
    });

            }
        }
        $('body').append('<link rel="stylesheet" href="/odoochat/static/css/chat.css"/>');
        document.writeln('<script src="/odoochat/static/js/socket.io.js"></script>');
        document.writeln('<script src="/odoochat/static/js/chat.js"></script>');
    }
    else{
        console.log(33993)
    }
}
catch(err){}