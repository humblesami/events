odoo.define('dn_base.Abstract', function(require) {
    var abstract_wc = require('web.AbstractWebClient');
    var core = require('web.core');
    var session = require('web.session');
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
        laser_pointer: function change_cursor(){
            if (document.documentElement.style.cursor == '') {
                var myCanvas = document.getElementById("laser_canvas");
                var ctx = myCanvas.getContext("2d");
                ctx.beginPath();
                ctx.arc(10, 10, 10, 0, 2 * Math.PI);
                ctx.fillStyle = "red";
                ctx.fill();

                var url = myCanvas.toDataURL();
                url = 'url(' + url + ') , auto';
                document.documentElement.style.cursor = url;
                $('*').css('cursor', url);
            } else {
                $('*').css('cursor', '');

            }
        }
    });
    SystrayMenu.Items.push(IconMenu);
});

document.writeln('<script src="/dn_base/static/js/ready.js"></script>');