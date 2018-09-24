$(function(){
    var last_activity = new Date();
    $('body').keyup(function(){
        update_activity();
    });

    $('body').mouseup(function(){
        update_activity();
    });

    function update_activity()
    {
        if(odoo.session_info && odoo.session_info.is_superuser)
            return;
        var time_now = new Date();
        var diff = time_now - last_activity;
        diff = diff / 1000;
        if(diff >= 7)
        {
            last_activity = time_now;
            $.ajax({url:dn_base_web_url+'/dn_auth/update_activity'});
        }
    }
});