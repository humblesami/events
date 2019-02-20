odoo.define('dn_base.Abstract', function(require) {
    var abstract_wc = require('web.AbstractWebClient');
    var core = require('web.core');
    var session = require('web.session');
    var crash_manager = require('web.crash_manager');
    var _t = core._t;
    abstract_wc.include({
        init: function(parent) {
            this._super(parent);
            this.set('title_part', {
                "zopenerp": "OdooHQ"
            });
        },
//        bind_events: function() {
//            this._super.apply(this, arguments);
//            window.onerror = function (message, file, line, col, error) {}
//        }
    });
    return abstract_wc;
});

odoo.define('dn_base.icons', function(require) {
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
                      var myCanvas = document.getElementById("laser_canvas");
//                        myCanvas.style.zindex = 5000
//                        myCanvas.style.position = 'absolute';
                        var ctx = myCanvas.getContext("2d");
                        ctx.beginPath();
                        ctx.arc(5, 5, 5, 0, 2 * Math.PI);
                        ctx.fillStyle = "red";
                        ctx.fill();

                        var url = myCanvas.toDataURL();
                        url = 'url(' +url + ') 64 64, auto';
                        document.documentElement.style.cursor = url;
//                        data = document.querySelector('body')
//                        data.style.cursor = url;
                           console.log('100');
                          $('*').css('cursor',url);
                        }
                        else{
                         $('*').css('cursor','');

                        }

}


    });
    SystrayMenu.Items.push(IconMenu);
});

document.writeln('<script src="/dn_base/static/js/ready.js"></script>');