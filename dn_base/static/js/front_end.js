odoo.define('custom.front_end', function(require){
    if(!odoo.custom_front_end)
    {
        odoo.custom_front_end = 1;
        require('web.dom_ready');
        $('body').append('<script src="/dn_base/static/js/front_end_debug.js"/>');
    }
    else
    {

    }
});