(function(){
    var dev_mode = false;
    var site_base_url = window.location.origin;
    if(site_base_url.indexOf('localhost') > -1 || site_base_url.indexOf('172.16'))
    {
        odoo.dev_mode = false;
    }
    odoo.site_base_url = site_base_url;
})()
