var dn_base_web_url = window.location.origin + '';
//console.log(odoo, 1968);
function load_dn_assets()
{
    try
    {
        //Libraries
        document.writeln('<script src="/dn_base/static/js/libs/datetime.js"></script>');
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

        document.writeln('<script src="/dn_base/static/js/doc_preview.js"></script>');
        $(function(){
            //var rs = new Date().getMilliSeconds();
            $('body').append('<link rel="stylesheet" href="/dn_base/static/css/web.css" /><link rel="stylesheet" href="/dn_base/static/css/kanban.css" />');
            doc_preview.init();
            $(document).on('click', 'button.fa-5x', function(){
                dn_json_rpc_object.showHideLoader(true);
            });
        });

    }
    catch(er)
    {
        console.log(er);
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