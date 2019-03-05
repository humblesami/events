var dn_base_web_url = window.location.origin + '';
window['server_events'] = {};
var is_mobile_device = undefined;
(function(){
    try
    {
        document.createEvent("TouchEvent");
        is_mobile_device = true;
    }
    catch(e)
    {
         return false;
    }
})()

var dn_current_site_user = {
    cookie : {
        name: odoo.session_info.name,
        id: odoo.session_info.uid,
        token : odoo.session_info.token,
    }
}
//console.log(dn_current_site_user);
var site_config = {
    server_db : 'demo'
}

function get_param_value(name, url)
{
    try{
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        results = results[1];
        return results;
    }
    catch(er){
        return '';
    }
}

function load_dn_assets()
{
    try
    {
        var dnow = Date.now();
        document.writeln('<script src="/dn_base/static/js/libs/bootbox.js?v='+dnow+'"></script>');
        document.writeln('<script src="/dn_base/static/config.js?v='+dnow+'"></script>');
        //Libraries
        document.writeln('<script src="/dn_base/static/js/libs/datetime.js?v='+dnow+'"></script>');
        document.writeln('<script src="/dn_base/static/js/libs/masked_input.js"></script>');
        document.writeln('<script src="/dn_base/static/js/libs/time_picker.js"></script>');
        document.writeln('<script src="/dn_base/static/js/libs/signature.js"></script>');
        document.writeln('<script src="/dn_base/static/js/libs/pdf.js"></script>');
        document.writeln('<script src="/dn_base/static/js/libs/fullcalendar.js"/>');

        //Custom plugins
        document.writeln('<script src="/dn_base/static/js/toast.js"></script>');

        //Editing in Core
        document.writeln('<script src="/dn_base/static/js/view.js"></script>');
        document.writeln('<script src="/dn_base/static/js/form_view.js"></script>');

        //document.writeln('<script src="/dn_base/static/js/utils.js"></script>');
        //document.writeln('<script src="/dn_base/static/js/odoo10.js"></script>');
        //document.writeln('<script src="/dn_base/static/js/kanban_view.js"></script>');
        document.writeln('<script src="/dn_base/static/js/list_view.js"></script>');
        document.writeln('<script src="/dn_base/static/js/control_panel.js"></script>');
        document.writeln('<script src="/dn_base/static/js/dialog.js"></script>');

        document.writeln('<script src="/dn_base/static/js/doc_preview.js?v='+dnow+'"></script>');
        document.writeln('<script src="/dn_base/static/js/libs/jquery.ui.touch.min.js"></script>');



        document.writeln('<link rel="stylesheet" type="text/css" href="assets/css/emoji.css" />');
        document.writeln('<link rel="stylesheet" type="text/css" href="assets/css/emoji.css.map" />');
        document.writeln('<script src="/dn_base/static/js/libs/emoji/config.js"></script>');
        document.writeln('<script src="/dn_base/static/js/libs/emoji/emoji-picker.js"></script>');
        document.writeln('<script src="/dn_base/static/js/libs/emoji/jquery.emojiarea.js"></script>');
        document.writeln('<script src="/dn_base/static/js/libs/emoji/util.js"></script>');
        document.writeln('<script src="/dn_base/static/js/libs/emoji/jQueryEmoji.js"></script>');

        document.writeln('<script src="/dn_base/static/js/libs/annotator/jquery.ui.touch-punch.min.js"></script>');
        document.writeln('<script src="/dn_base/static/js/libs/annotator/jquery.mark.min.js"></script>');
        document.writeln('<script src="/dn_base/static/js/libs/annotator/mark.min.js"></script>');






        $(function(){
            doc_preview.init();
            $(document).on('click', 'button.fa-5x', function(){
                dn_json_rpc_object.showHideLoader(true);
            });
            $('head').append('<link rel="stylesheet" href="/dn_base/static/css/web.css?v='+dnow+'" />');
             // $('head').prepend('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">');
            setTimeout(function(){
                $('.o_mobile_menu_toggle').mousedown(function(){
                    if(!$('.o_in_appswitcher:first').hasClass('o_hidden'))
                    {
                        setTimeout(function(){
                            $('.o_in_appswitcher:first').addClass('o_hidden');
                        },500);
                    }
                    else
                    {
                        setTimeout(function(){
                            $('.o_in_appswitcher:first').removeClass('o_hidden');
                        },10);
                    }
                })
            },1500);
            $('head').append('<link rel="stylesheet" href="/dn_base/static/css/meetvue.css?v='+dnow+'" />');
        });
    }
    catch(er)
    {
        console.log(er);
    }
}

var site_functions = {
    showLoader :function(ref)
    {
        dn_json_rpc_object.loaderContainer.show();
    },
    hideLoader :function(ref)
    {
        dn_json_rpc_object.loaderContainer.hide();
    },
    update_notification_list:function()
    {
    }
}

function timeToDecimal(t)
{
    var time = 0;
    try
    {
        if(t)
        {
            if(t.indexOf(':')!=-1)
            {
                t = t.split(':');
                if(t.length == 2)
                {

                    var hour = parseInt(t[0]);
                    var min = parseFloat(t[1]) / 60;
                    min = min.toFixed(2);
                    time = parseFloat(hour) + parseFloat(min);
                }
           }
           else
            hour = parseFloat(t);
        }
    } catch (er) {
        time = 0;
    }
    if(isNaN(time) || time == '')
        time=0;
    return time;
}

function decimal2time(decimalTime) {
    var clockTime = '0:00';
    try
    {
        var hrs = parseInt(decimalTime);
        var min = Math.round((decimalTime - hrs) * 60);
        hrs = addZeroToUnder10( parseFloat( hrs));
        min = addZeroToUnder10( parseFloat( min));
        clockTime = hrs + ':' +min;
    }
    catch(er)
    {

    }
    return clockTime;
}


function addZeroToUnder10(d)
{
    if(d<10)
        d = "0"+d;
    return d;
}

load_dn_assets();