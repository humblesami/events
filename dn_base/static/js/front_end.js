odoo.define('custom.front_end', function(require){
    var dnow = Date();
    if(!odoo.custom_front_end)
    {
        odoo.custom_front_end = 1;
        //console.log('front end', 1, dnow);
        require('web.dom_ready');
        $('body').append('<script src="/dn_base/static/js/front_end_debug.js?v="'+dnow+'/>');
    }
    else
    {
        //console.log('front end', 2, dnow);
    }
});