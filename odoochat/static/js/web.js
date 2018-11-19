console.log(12121)
//var node = document.createElement('link');
//node.setAttribute('href', '/odoochat/static/css/chat.css');
//node.setAttribute('href', '/odoochat/static/css/chat.css');
try{
if($ && !odoo.odoochat)
{
    odoo.odoochat = 1;
    $('body').append('<link rel="stylesheet" href="/odoochat/static/css/chat.css"/>');
    document.writeln('<script src="/odoochat/static/js/socket.io.js"></script>');
    document.writeln('<script src="/odoochat/static/js/chat.js"></script>');
}
else{
    console.log(33993)
}
}
catch(err){

}