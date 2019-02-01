odoo.define('dn_base.Abstract', function (require) {
    var abstract_wc = require('web.AbstractWebClient');
    var core = require('web.core');
    var session = require('web.session');
    var crash_manager = require('web.crash_manager');
    var _t = core._t;
    abstract_wc.include({
        init: function (parent) {
            this._super(parent);
            this.set('title_part', {"zopenerp": "OdooHQ"});
        },
        bind_events: function () {
            this._super.apply(this, arguments);
            window.onerror = function (message, file, line, col, error) {
                try
                {
                    var traceback = error ? error.stack : '';
                    console.log(message);
                    console.log(file + ':' + line);
                    //if(odoo.dev_mode)
                        console.log("\n\n", traceback);
                    bootbox.confirm("There is a dev issue "+message+". Please click ok to report it", function(dr){
                        if(dr)
                        {
                            console.log("Reported");
                        }
                    });
                }
                catch(er)
                {
                    console.log(er);
                }
                return true;
            };
        }

    });
    return abstract_wc;
});

odoo.define('dn_base.icons', function (require) {
    var SystrayMenu = require('web.SystrayMenu');
    var Widget = require('web.Widget');

    // Appends Icon template in system tray (navbar)
    var IconMenu = Widget.extend({
        template:'Icon',
          events: {
        'click': 'laser_pointer',
             },
        laser_pointer:function change_cursor(){
                        if(document.documentElement.style.cursor == '')
                        {
                        var myCanvas = document.getElementById("myCanvas");
                        var ctx = myCanvas.getContext("2d");
                        ctx.beginPath();
                        ctx.arc(5, 5, 5, 0, 2 * Math.PI);
                        ctx.fillStyle = "red";
                        ctx.fill();

                        var url = myCanvas.toDataURL();
                        url = 'url(' +url + ') 64 64, auto';
                        document.documentElement.style.cursor = url;
                        }
                        else
                        document.documentElement.style.cursor = '';
}



    });
SystrayMenu.Items.push(IconMenu);
});

document.writeln('<script src="/dn_base/static/js/ready.js"></script>');
